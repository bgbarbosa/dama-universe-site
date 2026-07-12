import { describe, expect, it } from "vitest";

import { validateContactPayload } from "@/lib/contact";

const validPayload = {
  name: "Maria Silva",
  email: "MARIA@example.com",
  subject: "Dúvida sobre o projeto",
  contactType: "Dúvida",
  message: "Gostaria de obter mais informações sobre o projeto.",
};

describe("validateContactPayload", () => {
  it("normaliza e aceita um payload válido", () => {
    const result = validateContactPayload(validPayload);

    expect(result).toEqual({
      success: true,
      data: { ...validPayload, email: "maria@example.com", website: "" },
    });
  });

  it.each([
    [null, "Dados do formulário inválidos."],
    [{ ...validPayload, name: "" }, "Informe um nome válido."],
    [{ ...validPayload, email: "invalido" }, "Informe um e-mail válido."],
    [{ ...validPayload, subject: "x" }, "Informe um assunto válido."],
    [{ ...validPayload, contactType: "Inventado" }, "Selecione um tipo de contato válido."],
    [{ ...validPayload, message: "curta" }, "A mensagem deve ter entre 10 e 4000 caracteres."],
    [{ ...validPayload, message: "x".repeat(4001) }, "A mensagem deve ter entre 10 e 4000 caracteres."],
  ])("rejeita dados inválidos", (payload, message) => {
    expect(validateContactPayload(payload)).toEqual({ success: false, message });
  });
});
