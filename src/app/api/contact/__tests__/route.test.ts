import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/contact/route";

const validPayload = {
  name: "João Teste",
  email: "joao@example.com",
  subject: "Mensagem de teste",
  contactType: "Dúvida",
  message: "Esta é uma mensagem válida para o formulário.",
};

let requestSequence = 0;

function createRequest(body: unknown, ip?: string) {
  requestSequence += 1;
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip ?? `203.0.113.${requestSequence}`,
    },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.stubEnv("CONTACT_FORM_ENDPOINT", "https://forms.example.test/submit");
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
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(null, { status: 500 })
    );
    const response = await POST(createRequest(validPayload));

    expect(response.status).toBe(502);
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
