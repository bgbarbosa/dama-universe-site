import { fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SiteMetrics } from "@/components/metrics/SiteMetrics";
import { createConsentPreferences, type ConsentPreferences } from "@/lib/consent";

const state = vi.hoisted(() => ({
  pathname: "/",
  preferences: null as ConsentPreferences | null,
}));

vi.mock("next/navigation", () => ({ usePathname: () => state.pathname }));
vi.mock("@/components/privacy/ConsentProvider", () => ({ useConsentPreferences: () => state.preferences }));
vi.mock("@/lib/seo", () => ({ siteConfig: { url: window.location.origin } }));

const resource = "https://chatgpt.com/g/exemplo-teste";
const paths = ["/", "/blog", "/gpts", "/sobre", "/contato", "/referencias"];
const resources = [resource];

function Screen() {
  return (
    <>
      <SiteMetrics paths={paths} resources={resources} />
      <a href={resource} onClick={(event) => event.preventDefault()}>Abrir GPT</a>
    </>
  );
}

describe("coleta do navegador do DAMA", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    state.pathname = "/";
    state.preferences = null;
    fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(document, "visibilityState", "get").mockReturnValue("visible");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    Reflect.deleteProperty(navigator, "globalPrivacyControl");
  });

  it("aguarda permissão, mede a rota uma vez e para depois de revogada", () => {
    const { rerender, getByRole } = render(<Screen />);
    const link = getByRole("link", { name: "Abrir GPT" });
    fireEvent.click(link);
    expect(fetchMock).not.toHaveBeenCalled();

    state.preferences = createConsentPreferences({ analytics: true, externalMedia: false });
    rerender(<Screen />);
    fireEvent(document, new Event("visibilitychange"));
    expect(fetchMock).toHaveBeenCalledExactlyOnceWith("/api/medicao", expect.objectContaining({
      headers: { "Content-Type": "application/json", "X-Dama-Analytics-Consent": "1" },
      body: JSON.stringify({ event: "view", path: "/", source: "direct" }),
      credentials: "omit",
    }));
    fireEvent.click(link);
    expect(fetchMock).toHaveBeenNthCalledWith(2, "/api/medicao", expect.objectContaining({
      body: JSON.stringify({ event: "resource_click", path: "/", source: "internal" }),
    }));

    state.pathname = "/blog";
    rerender(<Screen />);
    expect(fetchMock).toHaveBeenNthCalledWith(3, "/api/medicao", expect.objectContaining({
      body: JSON.stringify({ event: "view", path: "/blog", source: "internal" }),
    }));

    state.preferences = createConsentPreferences({ analytics: false, externalMedia: false });
    rerender(<Screen />);
    fireEvent.click(link);
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("respeita GPC mesmo quando análises opcionais foram aceitas", () => {
    Object.defineProperty(navigator, "globalPrivacyControl", { value: true, configurable: true });
    state.preferences = createConsentPreferences({ analytics: true, externalMedia: true });
    const { getByRole } = render(<Screen />);
    fireEvent.click(getByRole("link", { name: "Abrir GPT" }));
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
