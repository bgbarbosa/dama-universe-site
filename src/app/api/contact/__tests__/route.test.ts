import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/contact/route";

const scheduledMetric = vi.hoisted(() => vi.fn());
vi.mock("next/server", async (loadOriginal) => ({
  ...(await loadOriginal<typeof import("next/server")>()),
  after: scheduledMetric,
}));

const validPayload = {
  name: "João Teste",
  email: "joao@example.com",
  subject: "Mensagem de teste",
  contactType: "Dúvida",
  message: "Esta é uma mensagem válida para o formulário.",
};

let requestSequence = 0;

function createRequest(body: unknown, ip?: string, metrics = false) {
  requestSequence += 1;
  return new Request(metrics ? "https://damauniverse.com.br/api/contact" : "http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip ?? `203.0.113.${requestSequence}`,
      ...(metrics ? { Origin: "https://damauniverse.com.br", "X-Dama-Analytics-Consent": "1" } : {}),
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.stubEnv("CONTACT_FORM_ENDPOINT", "https://forms.example.test/submit");
    scheduledMetric.mockReset();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("encaminha um envio válido", async () => {
    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(new Response(null, { status: 200 }));

    const response = await POST(createRequest(validPayload));

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0]?.[0]).toBe("https://forms.example.test/submit");
    expect(scheduledMetric).not.toHaveBeenCalled();
  });

  it("mede somente a confirmação do provedor e usa um evento sem mensagem ou identificadores", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.stubEnv("MB_METRICS_PANEL_TOKEN", "token-de-teste");
    vi.stubEnv("MB_METRICS_WRITE_KEY", "chave-de-teste");
    const fetchMock = vi.spyOn(globalThis, "fetch")
      .mockResolvedValueOnce(new Response(null, { status: 200 }))
      .mockResolvedValueOnce(new Response(null, { status: 204 }));

    expect((await POST(createRequest(validPayload, undefined, true))).status).toBe(200);
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(scheduledMetric).toHaveBeenCalledOnce();
    await scheduledMetric.mock.calls[0][0]();
    expect(fetchMock).toHaveBeenNthCalledWith(2,
      "https://painel-autoridade-digital-mb.marcobarbosa.chatgpt.site/api/collect?site=dama",
      expect.objectContaining({
        body: JSON.stringify({ event: "contact_success", path: "/contato", source: "internal" }),
      })
    );
  });

  it("rejeita payload inválido sem chamar o provedor", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    const response = await POST(createRequest({ ...validPayload, email: "x" }));

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("absorve honeypot sem chamar o provedor", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    const response = await POST(
      createRequest({ ...validPayload, website: "spam.example" })
    );

    expect(response.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(scheduledMetric).not.toHaveBeenCalled();
  });

  it("bloqueia envio duplicado", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 200 })
    );
    const ip = "198.51.100.42";

    expect((await POST(createRequest(validPayload, ip))).status).toBe(200);
    expect((await POST(createRequest(validPayload, ip))).status).toBe(429);
  });

  it("trata serviço não configurado", async () => {
    vi.stubEnv("CONTACT_FORM_ENDPOINT", "");
    const response = await POST(createRequest(validPayload));

    expect(response.status).toBe(503);
  });

  it("trata recusa do serviço externo", async () => {
    vi.stubEnv("VERCEL_ENV", "production");
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 500 })
    );
    const response = await POST(createRequest(validPayload, undefined, true));

    expect(response.status).toBe(502);
    expect(scheduledMetric).not.toHaveBeenCalled();
  });

  it("trata timeout", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new DOMException("Timeout", "AbortError")
    );
    const response = await POST(createRequest(validPayload));

    expect(response.status).toBe(504);
  });

  it("trata JSON malformado", async () => {
    const request = new Request("http://localhost/api/contact", {
      method: "POST",
      body: "{",
    });

    expect((await POST(request)).status).toBe(400);
  });
});
