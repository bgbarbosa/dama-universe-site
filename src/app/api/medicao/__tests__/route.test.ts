import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/medicao/route";

const origin = "https://damauniverse.com.br";
const dashboard = "https://painel-autoridade-digital-mb.marcobarbosa.chatgpt.site/api/collect?site=dama";
const view = { event: "view", path: "/gpts/dama-registro-de-ocorrencia", source: "google" };

function request(body: string, headers: Record<string, string> = {}, host = origin) {
  return new Request(host + "/api/medicao", {
    method: "POST",
    headers: {
      Origin: origin,
      "Sec-Fetch-Site": "same-origin",
      "Content-Type": "application/json",
      "X-Dama-Analytics-Consent": "1",
      ...headers,
    },
    body,
  });
}

describe("POST /api/medicao do DAMA", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("MB_METRICS_PANEL_TOKEN", "token-de-teste");
    vi.stubEnv("MB_METRICS_WRITE_KEY", "chave-de-teste");
    fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it.each([
    view,
    { event: "resource_click", path: "/programas", source: "internal" },
    { event: "guide_click", path: "/blog", source: "internal" },
  ])("envia somente os três campos de um evento válido para o coletor DAMA", async (metric) => {
    const result = await POST(request(JSON.stringify(metric)));
    expect(result.status).toBe(204);
    expect(result.headers.get("Cache-Control")).toBe("no-store");
    expect(fetchMock).toHaveBeenCalledExactlyOnceWith(dashboard, expect.objectContaining({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "OAI-Sites-Authorization": "Bearer token-de-teste",
        "X-MB-Metrics-Key": "chave-de-teste",
      },
      body: JSON.stringify(metric),
      redirect: "error",
    }));
  });

  it.each([
    ["X-Dama-Analytics-Consent", "0"],
    ["Sec-GPC", "1"],
    ["DNT", "1"],
  ])("ignora eventos quando %s indica falta de permissão", async (header, value) => {
    expect((await POST(request(JSON.stringify(view), { [header]: value }))).status).toBe(204);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("recusa prévia, aliases e origens de terceiros", async () => {
    const body = JSON.stringify(view);
    vi.stubEnv("VERCEL_ENV", "preview");
    expect((await POST(request(body))).status).toBe(403);
    vi.stubEnv("VERCEL_ENV", "production");
    expect((await POST(request(body, {}, "https://www.damauniverse.com.br"))).status).toBe(403);
    expect((await POST(request(body, { Origin: "https://outro.example" }))).status).toBe(403);
    expect((await POST(request(body, { "Sec-Fetch-Site": "cross-site" }))).status).toBe(403);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    { ...view, path: "/downloads" },
    { ...view, path: "/blog?email=teste@example.com" },
    { ...view, path: "/blog#privado" },
    { ...view, extra: "identificador" },
    { ...view, event: "contact_success" },
    { ...view, event: "resource_click", source: "google" },
  ])("recusa caminhos e eventos que não pertencem ao contrato", async (metric) => {
    expect((await POST(request(JSON.stringify(metric)))).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("limita o corpo recebido e exige JSON", async () => {
    expect((await POST(request(".".repeat(513)))).status).toBe(413);
    expect((await POST(request("{}", { "Content-Type": "text/plain" }))).status).toBe(415);
    expect((await POST(request("{"))).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("responde indisponível se faltar configuração ou falhar o encaminhamento", async () => {
    vi.stubEnv("MB_METRICS_WRITE_KEY", "");
    expect((await POST(request(JSON.stringify(view)))).status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
    vi.stubEnv("MB_METRICS_WRITE_KEY", "chave-de-teste");
    fetchMock.mockRejectedValue(new Error("offline"));
    expect((await POST(request(JSON.stringify(view)))).status).toBe(503);
  });
});
