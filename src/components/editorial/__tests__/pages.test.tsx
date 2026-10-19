import { readFileSync } from "node:fs";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { AiDemo, aiExamples } from "@/components/editorial/AiDemo";
import { CopyButton } from "@/components/editorial/CopyButton";
import { ContentLibrary } from "@/components/editorial/ContentLibrary";
import { ReferenceDirectory } from "@/components/editorial/ReferenceDirectory";
import GptsPage, { metadata as aiMetadata } from "@/app/gpts/page";
import BlogPage, { metadata as blogMetadata } from "@/app/blog/page";
import ApoiePage, { metadata as participationMetadata } from "@/app/apoie/page";
import SobrePage, { metadata as aboutMetadata } from "@/app/sobre/page";
import ContatoPage, { metadata as contactMetadata } from "@/app/contato/page";
import ReferenciasPage, { metadata as referencesMetadata } from "@/app/referencias/page";
import BlogPostPage from "@/app/blog/[slug]/page";
import { ConsentProvider } from "@/components/privacy/ConsentProvider";
import { customGpts } from "@/data/gpts";
import { posts } from "@/data/posts";
import { references } from "@/data/references";
import { getPostContentBySlug } from "@/data/postContents";
import { damaFccTutorials } from "@/data/tutorials";
import { filterPosts, sectionAnchor } from "@/lib/editorial";
import { contactHref, parseContactContext } from "@/lib/contactContext";
import { programs } from "@/data/programs";

afterEach(() => vi.restoreAllMocks());

describe("DU-TSK-PAGINAS-003 — interação e preservação", () => {
  it("altera os três campos da demonstração fictícia, por teclado, sem rede nem entrada livre", async () => {
    const user = userEvent.setup(); const fetchMock = vi.spyOn(globalThis, "fetch");
    const { container } = render(<AiDemo />);
    expect(screen.getByText("EXEMPLO FICTÍCIO — RESULTADO ILUSTRATIVO, NÃO GERADO AO VIVO")).toBeVisible();
    expect(screen.getByTestId("demo-instruction")).toHaveTextContent(aiExamples[0].instruction);
    const select = screen.getByRole("button", { name: "Organização de tarefas" });
    select.focus(); await user.keyboard("{Enter}");
    expect(select).toHaveFocus(); expect(select).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByTestId("demo-before")).toHaveTextContent(aiExamples[1].input);
    expect(screen.getByTestId("demo-instruction")).toHaveTextContent(aiExamples[1].instruction);
    expect(screen.getByTestId("demo-after")).toHaveTextContent("1. Reunir as anotações.");
    expect(container.querySelector("input, textarea, iframe")).toBeNull(); expect(fetchMock).not.toHaveBeenCalled();
  });

  it("copia somente a instrução escolhida e só confirma após resolver a cópia", async () => {
    const user = userEvent.setup();
    let resolve!: () => void;
    const write = vi.spyOn(navigator.clipboard, "writeText").mockImplementation(() => new Promise<void>((r) => { resolve = r; }));
    render(<AiDemo />);
    await user.click(screen.getByRole("button", { name: "Copiar instrução" }));
    expect(write).toHaveBeenCalledWith(aiExamples[0].instruction);
    expect(screen.queryByText("Instrução copiada.")).toBeNull();
    resolve(); expect(await screen.findByText("Instrução copiada.")).toBeVisible();
  });

  it("trata recusa de clipboard e oferece fallback sem sucesso fictício", async () => {
    const user = userEvent.setup(); vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new Error("Negado"));
    render(<CopyButton text="https://damauniverse.com.br/" label="Copiar" />);
    await user.click(screen.getByRole("button", { name: "Copiar" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Não foi possível copiar");
    expect(screen.getByRole("button", { name: "Copiar" })).toBeEnabled();
  });

  it("mantém todos os GPTs, links, formatos e cuidados cadastrados", () => {
    render(<GptsPage />);
    for (const gpt of customGpts) {
      const row = screen.getByTestId(`ai-tool-${gpt.slug}`);
      expect(within(row).getByRole("link", { name: `Acessar ${gpt.name}` })).toHaveAttribute("href", gpt.url);
      expect(row).toHaveTextContent(`GPT · ${gpt.status}`);
      for (const caution of gpt.precautions) expect(row).toHaveTextContent(caution);
      for (const use of gpt.indicatedFor) expect(row).toHaveTextContent(use);
    }
    for (const concept of ["Inteligência Artificial", "Engenharia de prompts", "Análise de dados", "Automação documental"]) expect(screen.getByText(concept)).toBeInTheDocument();
    expect(screen.getByText(/Não envie dados sigilosos/)).toBeVisible();
  });

  it("preserva oito artigos, busca sem acento e combina filtros com saída do estado vazio", async () => {
    const user = userEvent.setup(); render(<ContentLibrary posts={posts} />);
    expect(screen.getAllByTestId(/^archive-/)).toHaveLength(8);
    const search = screen.getByRole("searchbox", { name: "Buscar conteúdo" });
    await user.type(search, "inteligencia artificial");
    expect(screen.getAllByTestId(/^archive-/)).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: "Automação documental" }));
    expect(screen.getByText("Nenhum conteúdo encontrado")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Mostrar todos os conteúdos" }));
    expect(screen.getAllByTestId(/^archive-/)).toHaveLength(8); expect(search).toHaveFocus();
    for (const post of posts) expect(screen.getByRole("link", { name: `Ler ${post.title}` })).toHaveAttribute("href", `/blog/${post.slug}`);
    expect(filterPosts(posts, "Automação documental", "")).toHaveLength(2);
  });

  it("usa destaque e percurso existentes, com todos os artigos mantidos no acervo", () => {
    render(<BlogPage />);
    expect(screen.getByRole("region", { name: "Seleção editorial" })).toHaveTextContent("Dama Gerador FCC 3.0");
    const path = screen.getByRole("navigation", { name: "Comece por aqui" });
    expect(within(path).getAllByRole("listitem")).toHaveLength(3);
    expect(within(path).getByRole("link", { name: "Veja o primeiro tutorial" })).toHaveAttribute("href", damaFccTutorials[0].watchUrl);
    expect(screen.getAllByTestId(/^archive-/)).toHaveLength(posts.length);
  });

  it("preserva os parágrafos do artigo e cria âncoras para suas seções reais", async () => {
    const post = getPostContentBySlug(posts[0].slug)!;
    render(<ConsentProvider>{await BlogPostPage({ params: Promise.resolve({ slug: post.slug }) })}</ConsentProvider>);
    const toc = screen.getByRole("navigation", { name: "Neste conteúdo" });
    for (const [index, section] of post.content.entries()) {
      expect(within(toc).getByRole("link", { name: section.heading })).toHaveAttribute("href", `#${sectionAnchor(section.heading,index)}`);
      for (const paragraph of section.paragraphs) expect(screen.getByText(paragraph, { exact: true })).toBeInTheDocument();
    }
  });

  it("preserva nomes, descrições, motivos, tags e todos os links das onze referências", () => {
    render(<ReferenceDirectory references={references} />);
    expect(screen.getAllByTestId("reference-item")).toHaveLength(11);
    for (const reference of references) {
      const entry = screen.getByRole("article", { name: reference.name });
      expect(entry).toHaveTextContent(reference.area); expect(entry).toHaveTextContent(reference.description); expect(entry).toHaveTextContent(reference.reason);
      for (const tag of reference.tags ?? []) expect(entry).toHaveTextContent(tag);
      for (const link of reference.links) {
        const anchor = within(entry).getByRole("link", { name: link.label });
        expect(anchor).toHaveAttribute("href", link.url); expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
      }
    }
  });

  it("filtra todas as categorias, busca nomes sem acento e limpa resultados vazios", async () => {
    const user = userEvent.setup(); render(<ReferenceDirectory references={references} />);
    for (const [label,count] of [["Pessoas",7],["Artigos",1],["Ferramentas",1],["Instituições",1],["Cursos",1]] as const) {
      await user.click(screen.getByRole("button", { name: label }));
      expect(screen.getAllByTestId("reference-item")).toHaveLength(count);
    }
    const search = screen.getByRole("searchbox", { name: "Buscar referência" });
    await user.type(search,"Romullo"); expect(screen.getByText("Nenhuma referência encontrada")).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Mostrar todas as referências" }));
    expect(search).toHaveFocus(); await user.type(search,"EMERSON");
    expect(screen.getAllByTestId("reference-item")).toHaveLength(1);
  });

  it("preserva a homenagem e a independência, com a grafia real Daniel Avilla", () => {
    render(<ReferenciasPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Mestres & Referências");
    expect(screen.getByRole("heading", { name: "Aos mestres que ajudaram a formar este caminho" })).toBeVisible();
    expect(screen.getByText(/Cada nome aqui representa conhecimento compartilhado/)).toBeVisible();
    expect(screen.getByText(/é registrar gratidão, respeito e admiração/)).toBeVisible();
    expect(screen.getByText(/A inclusão não indica vínculo/)).toBeVisible();
    expect(screen.getByRole("article", { name: "Daniel Avilla" })).toBeInTheDocument();
  });

  it("não torna protocolos inseguros executáveis e mantém o registro da referência", () => {
    const fixture = { ...references[0], name: "Referência fictícia de teste", links: [{label:"Link inválido",url:"javascript:alert(1)"}] };
    const {container} = render(<ReferenceDirectory references={[fixture]} />);
    expect(screen.getByRole("article",{name:fixture.name})).toBeInTheDocument();
    expect(container.querySelector('a[href^="javascript:"]')).toBeNull();
    expect(screen.getByText(/Link inválido · endereço indisponível/)).toBeInTheDocument();
  });

  it("oferece três caminhos de participação e transporta somente contexto público válido", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");
    render(await ApoiePage({ searchParams: Promise.resolve({ programa: "dama-termos" }) }));
    expect(screen.getByRole("list", {name:"Caminhos de participação"}).children).toHaveLength(3);
    expect(screen.getByRole("link", {name:/Enviar uma sugestão/})).toHaveAttribute("href", "/contato?tipo=sugestao&programa=dama-termos");
    expect(screen.getByRole("link", {name:/Descrever uma dificuldade/})).toHaveAttribute("href", "/contato?tipo=suporte&programa=dama-termos");
    expect(screen.getByText("https://damauniverse.com.br/")).toBeVisible();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("valida query strings por whitelist e não inclui valores estranhos na URL de contato", () => {
    expect(parseContactContext({tipo:"SUGESTÃO",programa:"DAMA-TERMOS"},programs)).toEqual({contactType:"Sugestão",program:"dama-termos"});
    expect(parseContactContext({tipo:"<script>",programa:"javascript:alert(1)"},programs)).toEqual({contactType:"",program:""});
    expect(parseContactContext({tipo:["suporte"],programa:["dama-termos"]},programs)).toEqual({contactType:"",program:""});
    expect(parseContactContext({tipo:"capacitacao"},programs).contactType).toBe("Outro");
    expect(contactHref("suporte","<script>")).toBe("/contato?tipo=suporte");
  });

  it("mantém o formulário sempre visível, com pré-seleção e canais originais", async () => {
    render(await ContatoPage({searchParams:Promise.resolve({tipo:"suporte",programa:"dama-termos"})}));
    expect(screen.getByLabelText("Tipo de contato")).toHaveValue("Erro em programa");
    expect(screen.getByLabelText("Programa relacionado (opcional)")).toHaveValue("dama-termos");
    expect(screen.getByRole("button",{name:"Enviar mensagem"})).toBeVisible();
    expect(screen.getByRole("button",{name:"Enviar mensagem"}).closest("details")).toBeNull();
    expect(screen.getByText(/não altera automaticamente seu destinatário/)).toBeVisible();
  });

  it("mantém as seis canonicals e H1s únicas sem alterações no backend", async () => {
    const pages = [<GptsPage key="gpts" />, <BlogPage key="blog" />, await ApoiePage({}), <SobrePage key="sobre" />, await ContatoPage({}), <ReferenciasPage key="referencias" />];
    const metadata = [aiMetadata,blogMetadata,participationMetadata,aboutMetadata,contactMetadata,referencesMetadata];
    const routes = ["gpts","blog","apoie","sobre","contato","referencias"];
    for (const [index,page] of pages.entries()) {
      const {unmount} = render(page); expect(screen.getAllByRole("heading",{level:1})).toHaveLength(1); unmount();
      expect(metadata[index].alternates?.canonical).toBe(`https://damauniverse.com.br/${routes[index]}`);
      expect(metadata[index].openGraph).toMatchObject({url:`https://damauniverse.com.br/${routes[index]}`});
    }
    const route = readFileSync("src/app/api/contact/route.ts","utf8");
    expect(route).toContain("CONTACT_FORM_ENDPOINT"); expect(route).toContain("if (payload.website)");
  });
});
