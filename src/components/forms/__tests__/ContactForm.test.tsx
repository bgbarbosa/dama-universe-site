import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ContactForm } from "@/components/forms/ContactForm";

describe("ContactForm", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("mostra erro para campos ausentes", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(screen.getByRole("status")).toHaveTextContent("Informe um nome válido.");
  });

  it("envia dados válidos pela rota interna", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ message: "Mensagem enviada com sucesso." }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      })
    );
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Nome"), "Maria Silva");
    await user.type(screen.getByLabelText("E-mail"), "maria@example.com");
    await user.type(screen.getByLabelText("Assunto"), "Sugestão para o site");
    await user.selectOptions(screen.getByLabelText("Tipo de contato"), "Sugestão");
    await user.type(
      screen.getByLabelText("Mensagem"),
      "Esta é uma mensagem válida para o formulário."
    );
    await user.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" })
    );
    expect(await screen.findByRole("status")).toHaveTextContent(
      "Mensagem enviada com sucesso."
    );
  });
});
