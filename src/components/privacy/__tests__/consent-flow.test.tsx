import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ConsentProvider } from "@/components/privacy/ConsentProvider";
import { YouTubeEmbed } from "@/components/privacy/YouTubeEmbed";
import { CONSENT_STORAGE_KEY } from "@/lib/consent";

vi.mock("@vercel/analytics/next", () => ({ Analytics: () => <span data-testid="analytics-test" /> }));
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
describe("consentimento preservado na TSK-DU-002", () => {
  afterEach(() => localStorage.clear());
  it("bloqueia mídia e analytics, permite recusa e revoga mídia", async () => {
    const user = userEvent.setup();
    const { container } = render(<ConsentProvider><YouTubeEmbed videoId="teste-ficticio" title="Vídeo de teste" /></ConsentProvider>);
    expect(container.querySelector("iframe")).toBeNull();
    expect(screen.queryByTestId("analytics-test")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button",{name:"Recusar opcionais"}));
    const saved = JSON.parse(localStorage.getItem(CONSENT_STORAGE_KEY)!);
    expect(saved).toMatchObject({analytics:false,externalMedia:false});
    await user.click(screen.getByRole("button",{name:"Permitir vídeos do YouTube"}));
    expect(container.querySelector("iframe")).toHaveAttribute("src","https://www.youtube-nocookie.com/embed/teste-ficticio");
    expect(screen.queryByTestId("analytics-test")).not.toBeInTheDocument();
    await user.click(screen.getByRole("button",{name:"Privacidade"}));
    await user.click(screen.getByRole("button",{name:"Recusar opcionais"}));
    expect(container.querySelector("iframe")).toBeNull();
  });
});
