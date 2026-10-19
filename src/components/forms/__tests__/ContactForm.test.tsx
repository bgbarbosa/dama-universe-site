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

describe("contato contextual — PAGINAS-003", () => {
  afterEach(() => vi.restoreAllMocks());
  const options = [{slug:"dama-termos",name:"Dama Termos"}];
  function fillBase(message = "Mensagem inteiramente fictícia para teste local.") {
    for (const [name,value] of Object.entries({name:"Pessoa de teste",email:"teste@example.com",subject:"Teste de contexto",message})) fireEvent.change(document.querySelector(`[name="${name}"]`)!,{target:{value}});
  }

  it("preserva mensagem e contexto ao alternar tipo, sem campo obrigatório oculto", () => {
    render(<ContactForm programOptions={options} initialContactType="Erro em programa" initialProgram="dama-termos" />);
    expect(screen.getByRole("combobox",{name:"Programa relacionado (opcional)"})).toHaveValue("dama-termos");
    fillBase(); fireEvent.change(screen.getByLabelText("Versão informada (opcional)"),{target:{value:"versão fictícia"}});
    fireEvent.change(screen.getByLabelText("Tipo de contato"),{target:{value:"Parceria"}});
    expect(screen.queryByLabelText("Programa relacionado (opcional)")).toBeNull();
    expect(screen.queryByLabelText("Versão informada (opcional)")).toBeNull();
    expect(screen.getByLabelText("Mensagem")).toHaveValue("Mensagem inteiramente fictícia para teste local.");
    fireEvent.change(screen.getByLabelText("Tipo de contato"),{target:{value:"Dúvida"}});
    expect(screen.getByLabelText("Programa relacionado (opcional)")).toHaveValue("dama-termos");
    expect(screen.getByLabelText("Versão informada (opcional)")).not.toBeRequired();
  });

  it("inclui contexto explicitamente na mensagem, sem alterar o contrato da API", async () => {
    const fetchMock = vi.spyOn(globalThis,"fetch").mockResolvedValue(new Response('{}',{status:200}));
    render(<ContactForm programOptions={options} initialContactType="Erro em programa" initialProgram="dama-termos" />);
    fillBase(); fireEvent.change(screen.getByLabelText("Versão informada (opcional)"),{target:{value:"1.0.0 informada no teste"}});
    fireEvent.click(screen.getByRole("button",{name:"Enviar mensagem"}));
    await waitFor(()=>expect(fetchMock).toHaveBeenCalledOnce());
    const [url,request] = fetchMock.mock.calls[0];
    const payload = JSON.parse(request!.body as string);
    expect(url).toBe("/api/contact");
    expect(Object.keys(payload).sort()).toEqual(["contactType","email","message","name","subject","website"]);
    expect(payload.contactType).toBe("Erro em programa");
    expect(payload.message).toContain("Programa relacionado: Dama Termos (dama-termos)");
    expect(payload.message).toContain("Versão informada pelo visitante: 1.0.0 informada no teste");
    expect(payload.message).toContain("Mensagem inteiramente fictícia");
  });

  it("não deixa o prefixo de programa validar uma mensagem vazia", () => {
    const fetchMock=vi.spyOn(globalThis,"fetch");
    render(<ContactForm programOptions={options} initialContactType="Dúvida" initialProgram="dama-termos" />);
    fillBase(""); fireEvent.click(screen.getByRole("button",{name:"Enviar mensagem"}));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByLabelText("Mensagem")).toHaveAttribute("aria-invalid","true");
  });

  it("valida também o limite da mensagem com contexto sem truncar o texto", () => {
    const fetchMock=vi.spyOn(globalThis,"fetch");
    render(<ContactForm programOptions={options} initialContactType="Dúvida" initialProgram="dama-termos" />);
    fillBase("x".repeat(4000)); fireEvent.click(screen.getByRole("button",{name:"Enviar mensagem"}));
    expect(fetchMock).not.toHaveBeenCalled(); expect(screen.getByLabelText("Mensagem")).toHaveValue("x".repeat(4000));
    expect(screen.getByRole("status")).toHaveTextContent("4000");
  });

  it("não envia contexto oculto e preserva o honeypot", async () => {
    const fetchMock=vi.spyOn(globalThis,"fetch").mockResolvedValue(new Response('{}',{status:200}));
    render(<ContactForm programOptions={options} initialContactType="Sugestão" initialProgram="dama-termos" />);
    fillBase(); fireEvent.change(screen.getByLabelText("Tipo de contato"),{target:{value:"Outro"}});
    fireEvent.click(screen.getByRole("button",{name:"Enviar mensagem"}));
    await waitFor(()=>expect(fetchMock).toHaveBeenCalledOnce());
    const payload=JSON.parse(fetchMock.mock.calls[0][1]!.body as string);
    expect(payload.message).toBe("Mensagem inteiramente fictícia para teste local."); expect(payload.website).toBe("");
    expect(document.querySelector('[name="website"]')).toHaveAttribute("tabindex","-1");
  });

  it("mantém programa, versão e mensagem em erro HTTP, sem anunciar sucesso", async () => {
    vi.spyOn(globalThis,"fetch").mockResolvedValue(new Response(JSON.stringify({message:"Erro simulado, sem envio."}),{status:503}));
    render(<ContactForm programOptions={options} initialContactType="Dúvida" initialProgram="dama-termos" />);
    fillBase(); fireEvent.change(screen.getByLabelText("Versão informada (opcional)"),{target:{value:"Versão fictícia"}});
    fireEvent.click(screen.getByRole("button",{name:"Enviar mensagem"}));
    await waitFor(()=>expect(screen.getByRole("status")).toHaveTextContent("Erro simulado"));
    expect(screen.getByLabelText("Programa relacionado (opcional)")).toHaveValue("dama-termos");
    expect(screen.getByLabelText("Versão informada (opcional)")).toHaveValue("Versão fictícia");
    expect(screen.getByLabelText("Mensagem")).toHaveValue("Mensagem inteiramente fictícia para teste local.");
    expect(screen.getByRole("button",{name:"Enviar mensagem"})).toBeEnabled();
  });
});
