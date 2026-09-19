import { fireEvent, render, screen, waitFor } from "@testing-library/react";
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

describe("acessibilidade e falhas do formulário", () => {
  afterEach(() => { vi.restoreAllMocks(); });
  const valid = { name: "Pessoa de teste", email: "teste@example.com", subject: "Assunto teste", contactType: "Dúvida", message: "Mensagem fictícia para teste local." };
  function fill(values = valid) {
    for (const [name,value] of Object.entries(values)) fireEvent.change(document.querySelector(`[name="${name}"]`)!, {target:{value}});
  }
  it.each([
    ["name", "Nome"], ["email", "E-mail"], ["subject", "Assunto"], ["contactType", "Tipo de contato"], ["message", "Mensagem"],
  ])("associa erro e foca %s sem enviar", (field,label) => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    render(<ContactForm />); fill({...valid,[field]:""});
    fireEvent.submit(screen.getByRole("button", {name:"Enviar mensagem"}).closest("form")!);
    const input = screen.getByLabelText(label, {exact:false});
    expect(input).toHaveFocus();
    expect(input).toHaveAttribute("aria-invalid","true");
    expect(input).toHaveAttribute("aria-describedby",`error-${field}`);
    expect(document.getElementById(`error-${field}`)).toHaveTextContent(/.+/);
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it.each([502,503,429])("preserva texto em falha HTTP %s", async (status) => {
    vi.spyOn(globalThis,"fetch").mockResolvedValue(new Response(JSON.stringify({message:"Falha simulada"}),{status}));
    render(<ContactForm />); fill();
    fireEvent.click(screen.getByRole("button",{name:"Enviar mensagem"}));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Falha simulada"));
    expect(screen.getByLabelText("Mensagem")).toHaveValue(valid.message);
    expect(screen.getByRole("button",{name:"Enviar mensagem"})).toBeEnabled();
  });
  it("trata rede, permite nova tentativa e anuncia envio", async () => {
    const mock = vi.spyOn(globalThis,"fetch").mockRejectedValueOnce(new Error("offline"));
    render(<ContactForm />); fill();
    fireEvent.click(screen.getByRole("button",{name:"Enviar mensagem"}));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Seu texto foi mantido"));
    let resolve!: (response: Response) => void;
    mock.mockImplementationOnce(() => new Promise((r) => {resolve=r;}));
    fireEvent.click(screen.getByRole("button",{name:"Enviar mensagem"}));
    expect(screen.getByRole("button",{name:"Enviando..."})).toBeDisabled();
    expect(screen.getByRole("status")).toHaveTextContent("Aguarde a confirmação");
    fireEvent.submit(screen.getByRole("button",{name:"Enviando..."}).closest("form")!);
    expect(mock).toHaveBeenCalledTimes(2);
    resolve(new Response("{}",{status:200}));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Mensagem enviada com sucesso"));
  });
  it("trata resposta não JSON sem fabricar sucesso", async () => {
    vi.spyOn(globalThis,"fetch").mockResolvedValue(new Response("não JSON",{status:502}));
    render(<ContactForm />); fill();
    fireEvent.click(screen.getByRole("button",{name:"Enviar mensagem"}));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Não foi possível enviar"));
  });
});
