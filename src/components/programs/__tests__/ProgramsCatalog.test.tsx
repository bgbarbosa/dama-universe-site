import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ProgramasPage, { metadata } from "@/app/programas/page";
import { ProgramsCatalog } from "@/components/programs/ProgramsCatalog";
import { catalogPrograms } from "@/data/programCatalog";
import { programs } from "@/data/programs";
import { catalogCategories, filterCatalog } from "@/lib/programCatalog";

const rows = () => screen.getAllByTestId(/^program-card-/);
const catalog = () => render(<ProgramsCatalog programs={catalogPrograms} />);

describe("DU-TSK-PROGRAMAS-002", () => {
  it("preserva as dez identidades, versões reais, destinos e assets da fonte compartilhada", () => {
    expect(catalogPrograms).toHaveLength(10);
    expect(catalogPrograms.map((item) => item.slug)).toEqual(programs.map((item) => item.slug));
    for (const original of programs) {
      const item = catalogPrograms.find((entry) => entry.slug === original.slug)!;
      expect(item).toMatchObject({ name: original.name, pageUrl: original.detailsUrl });
      expect(item.downloadUrl).toBe(original.downloadUrl);
      expect(item.alternativeDownload).toEqual(original.alternativeDownload);
      expect(item.iconUrl).toBe(original.iconUrl);
      expect(item.previewImage).toEqual(original.previewImage);
      expect(item.compatibility).toBe(original.compatibility);
      expect(item.changelogUrl).toBe(original.changelogUrl);
      if (!["Base funcional", "Conceitual"].includes(original.version)) expect(item.version).toBe(original.version);
    }
  });

  it("separa estágio, acesso e versão sem inventar versões numéricas ou plataformas", () => {
    const rh = catalogPrograms.find((item) => item.slug === "dama-gestor-rh")!;
    const intel = catalogPrograms.find((item) => item.slug === "dama-inteligencia-investigativa")!;
    const universal = catalogPrograms.find((item) => item.slug === "dama-gerador-fcc-universal")!;
    expect(rh).toMatchObject({ stage: "Base funcional", access: "Sob consulta" });
    expect(rh.version).toBeUndefined(); expect(rh.platform).toBeUndefined();
    expect(intel.stage).toMatch(/Conceitual.*arquitetura reservada/);
    expect(intel.version).toBeUndefined(); expect(intel.platform).toBeUndefined();
    expect(`${intel.summary} ${intel.details}`).not.toMatch(/MCP|agentes|indexação|núcleo/i);
    expect(universal).toMatchObject({ version: "Universal", stage: "Testes finais", access: "Sem download público" });
    expect(catalogPrograms.find((item) => item.slug === "sdo")).toMatchObject({ version: "2.0", stage: "Ajustes finais", access: "Sem download público" });
    expect(catalogPrograms.filter((item) => item.access === "Download público")).toHaveLength(6);
  });

  it("agrupa todos os programas por finalidade, com apenas os três utilitários na categoria SIGO", () => {
    catalog();
    expect(rows()).toHaveLength(10);
    expect(screen.getByRole("button", { name: "Todos" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("status")).toHaveTextContent("10 programas encontrados");
    for (const [index, category] of catalogCategories.entries()) {
      const section = screen.getByRole("region", { name: category.label });
      expect(within(section).getAllByRole("article")).toHaveLength([3, 4, 3][index]);
    }
    expect(catalogPrograms.filter((item) => item.category === "sigo").map((item) => item.slug)).toEqual(["dama-cleaner-sigo-desktop", "dama-biometria-sigo-fix", "dama-token-sigo-fix"]);
  });

  it("filtra por cada categoria com estado acessível exclusivo e volta a Todos", async () => {
    const user = userEvent.setup(); catalog();
    for (const [index, category] of catalogCategories.entries()) {
      const button = screen.getByRole("button", { name: category.filterLabel });
      await user.click(button);
      expect(rows()).toHaveLength([3, 4, 3][index]);
      expect(screen.getAllByRole("button", { pressed: true })).toHaveLength(1);
      expect(button).toHaveAttribute("aria-pressed", "true");
    }
    await user.click(screen.getByRole("button", { name: "Todos" }));
    expect(rows()).toHaveLength(10);
  });

  it("busca sem diferenciar acentos e caixa, por nome e finalidade, sem mutar os dados", () => {
    const before = JSON.stringify(catalogPrograms);
    expect(filterCatalog(catalogPrograms, "todos", "INQUERITOS").map((item) => item.slug)).toEqual(["dama-gestor-de-inqueritos"]);
    expect(filterCatalog(catalogPrograms, "todos", "  biOMETRÍA ").map((item) => item.slug)).toEqual(["dama-biometria-sigo-fix"]);
    expect(filterCatalog(catalogPrograms, "todos", "cabecalhos").map((item) => item.slug)).toEqual(["dama-gerador-fcc-universal"]);
    expect(filterCatalog(catalogPrograms, "sigo", "inqueritos")).toHaveLength(0);
    expect(JSON.stringify(catalogPrograms)).toBe(before);
  });

  it("combina busca e categoria, informa vazio e limpa devolvendo foco à busca", async () => {
    const user = userEvent.setup(); catalog();
    const input = screen.getByRole("searchbox", { name: "Buscar programa" });
    await user.click(screen.getByRole("button", { name: "Utilitários SIGO" }));
    await user.type(input, "inqueritos");
    expect(screen.queryAllByRole("article")).toHaveLength(0);
    expect(screen.getByRole("status")).toHaveTextContent("0 programas encontrados");
    expect(screen.getByRole("heading", { name: "Nenhum programa encontrado" })).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Mostrar todos os programas" }));
    expect(rows()).toHaveLength(10); expect(input).toHaveValue(""); expect(input).toHaveFocus();
    await user.type(input, "token");
    expect(rows()).toHaveLength(1);
    await user.click(screen.getByRole("button", { name: "Limpar filtros" }));
    expect(rows()).toHaveLength(10); expect(input).toHaveFocus();
  });

  it("expande com Enter e Espaço, mantém foco e apenas uma região aberta", async () => {
    const user = userEvent.setup(); catalog();
    const first = screen.getByRole("button", { name: "Mostrar detalhes de Dama Termos" });
    const second = screen.getByRole("button", { name: "Mostrar detalhes de Dama Gerador FCC" });
    first.focus(); await user.keyboard("{Enter}");
    expect(first).toHaveAttribute("aria-expanded", "true"); expect(first).toHaveFocus();
    expect(document.getElementById(first.getAttribute("aria-controls")!)).toBeVisible();
    second.focus(); await user.keyboard(" ");
    expect(first).toHaveAttribute("aria-expanded", "false"); expect(second).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("region").filter((region) => region.id.startsWith("catalog-details-"))).toHaveLength(1);
    await user.keyboard("{Enter}");
    expect(second).toHaveAttribute("aria-expanded", "false"); expect(second).toHaveFocus();
  });

  it("fecha detalhes ao buscar ou mudar categoria, sem referências ARIA quebradas", async () => {
    const user = userEvent.setup(); catalog();
    const button = screen.getByRole("button", { name: "Mostrar detalhes de Dama Termos" });
    await user.click(button);
    const input = screen.getByRole("searchbox"); await user.type(input, "termos");
    expect(button).toHaveAttribute("aria-expanded", "false"); expect(input).toHaveFocus();
    await user.click(button);
    await user.click(screen.getByRole("button", { name: "Documentos e automação" }));
    expect(button).toHaveAttribute("aria-expanded", "false");
    for (const control of screen.getAllByRole("button", { expanded: false })) expect(document.getElementById(control.getAttribute("aria-controls")!)).not.toBeNull();
  });

  it("mantém as páginas sempre acessíveis e separa navegação, expansão e downloads", async () => {
    const user = userEvent.setup(); const { container } = catalog();
    expect(container.querySelector("a a, a button, button a")).toBeNull();
    for (const program of catalogPrograms) expect(screen.getByRole("link", { name: `Conhecer ${program.name}` })).toHaveAttribute("href", program.pageUrl);
    expect(screen.queryByRole("link", { name: /^Baixar / })).toBeNull();
    await user.click(screen.getByRole("button", { name: "Mostrar detalhes de Dama Termos" }));
    const row = screen.getByTestId("program-card-dama-termos");
    const downloads = within(row).getAllByRole("link", { name: /^Baixar / });
    expect(downloads).toHaveLength(2);
    for (const link of downloads) { expect(link).toHaveAttribute("target", "_blank"); expect(link).toHaveAttribute("rel", "noopener noreferrer"); }
    expect(within(row).getByRole("link", { name: "Manual rápido" })).toHaveAttribute("href", "/programas/dama-termos#como-usar");
    const navigation = within(row).getByRole("link", { name: "Conhecer Dama Termos" });
    navigation.addEventListener("click", (event) => event.preventDefault()); await user.click(navigation);
    expect(within(row).getByRole("button")).toHaveAttribute("aria-expanded", "true");
  });

  it("carrega a captura real do Termos somente nos detalhes, com ressalva de desenvolvimento", async () => {
    const user = userEvent.setup(); catalog();
    expect(screen.queryByRole("img", { name: /Interface do Dama Termos/ })).toBeNull();
    await user.click(screen.getByRole("button", { name: "Mostrar detalhes de Dama Termos" }));
    expect(screen.getByRole("img", { name: /Interface do Dama Termos/ })).toHaveAttribute("loading", "lazy");
    expect(screen.getByText(/não comprova testes dos instaladores/)).toBeVisible();
  });

  it("contextualiza SIGO somente na sua categoria com aviso visível mesmo recolhido", async () => {
    const user = userEvent.setup(); catalog();
    expect(screen.getByText("Ferramentas independentes e não oficiais.")).toBeVisible();
    expect(screen.getByText(/Sistema Integrado de Gestão Operacional/)).toBeVisible();
    expect(screen.getByText(/Não substituem o suporte institucional/)).toBeVisible();
    expect(screen.queryByText(/Seus recursos auxiliam/)).toBeNull();
    await user.click(screen.getByRole("button", { name: "Utilitários SIGO" }));
    expect(screen.getByText(/Seus recursos auxiliam/)).toBeVisible();
    expect(screen.getByRole("link", { name: /Saiba mais sobre o SIGO/ })).toHaveAttribute("href", "https://www.pc.ms.gov.br/informativo/servidor/");
    await user.click(screen.getByRole("button", { name: "Gestão, organização e análise" }));
    expect(screen.queryByText("O que é o SIGO?")).toBeNull();
  });

  it("preserva limites dos utilitários, compatibilidade informada e orientação de TI", async () => {
    const user = userEvent.setup(); catalog();
    await user.click(screen.getByRole("button", { name: "Mostrar detalhes de Dama Cleaner - SIGO Desktop" }));
    expect(screen.getByText(/Finalize completamente a sessão/)).toBeVisible();
    expect(screen.getByText(/não força o encerramento/)).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Mostrar detalhes de Dama Biometria SIGO Fix" }));
    expect(screen.getByText("Compatibilidade informada:")).toBeVisible();
    expect(screen.getByText(/SIGO Desktop 1.0.48/)).toBeVisible();
    await user.click(screen.getByRole("button", { name: "Mostrar detalhes de Dama Token SIGO Fix" }));
    expect(screen.getByText(/Não salva PIN/)).toBeVisible();
    expect(screen.getByText(/Em computadores institucionais/)).toBeVisible();
  });

  it("mantém uma H1, categorias H2, SEO da rota e clientes atendidos ocultos", async () => {
    render(await ProgramasPage({}));
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Programas");
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(3);
    expect(screen.queryByText("Clientes atendidos")).toBeNull();
    expect(metadata.alternates?.canonical).toBe("https://damauniverse.com.br/programas");
    expect(metadata.openGraph).toMatchObject({ url: "https://damauniverse.com.br/programas" });
  });
});

describe("DU-TSK-HOME-005 — disponibilidade no catálogo compartilhado", () => {
  it("abre a URL aprovada com filtro selecionado e somente os seis downloads reais", async () => {
    render(await ProgramasPage({ searchParams: Promise.resolve({ disponiveis: "1" }) }));
    expect(screen.getByRole("checkbox", { name: "Somente disponíveis para download" })).toBeChecked();
    expect(rows().map(row => row.getAttribute("data-testid"))).toEqual(catalogPrograms.filter(item => Boolean(item.downloadUrl)).sort((a,b) => catalogCategories.findIndex(c => c.id === a.category) - catalogCategories.findIndex(c => c.id === b.category)).map(item => `program-card-${item.slug}`));
    expect(rows()).toHaveLength(6);
    expect(screen.getByRole("status")).toHaveTextContent("6 programas encontrados");
    expect(screen.queryByTestId("program-card-dama-gestor-rh")).toBeNull();
    expect(screen.getByText("Ferramentas independentes e não oficiais.")).toBeVisible();
  });

  it.each([undefined, "0", "true", "01", "<script>", ["1", "1"]])("ignora disponibilidade inválida ou ausente: %s", async (value) => {
    render(await ProgramasPage({ searchParams: Promise.resolve({ disponiveis: value, desconhecido: "1" }) }));
    expect(rows()).toHaveLength(10);
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("deriva disponibilidade do download e não da etiqueta ou estágio", () => {
    const original = catalogPrograms[0];
    const fixtures = [
      { ...original, slug: "sem-arquivo", access: "Download público" as const, downloadUrl: undefined },
      { ...original, slug: "com-arquivo", access: "Sob consulta" as const, stage: "Base funcional", downloadUrl: "https://example.org/download-de-teste" },
    ];
    expect(filterCatalog(fixtures, "todos", "", true).map(item => item.slug)).toEqual(["com-arquivo"]);
  });

  it("combina disponibilidade, categoria e busca; desativa, limpa e fecha detalhes", async () => {
    const user = userEvent.setup();
    render(<ProgramsCatalog programs={catalogPrograms} initialOnlyAvailable />);
    const checkbox = screen.getByRole("checkbox", { name: "Somente disponíveis para download" });
    const input = screen.getByRole("searchbox", { name: "Buscar programa" });
    await user.click(screen.getByRole("button", { name: "Documentos e automação" }));
    expect(rows()).toHaveLength(2);
    await user.type(input, "universal");
    expect(screen.getByRole("heading", { name: "Nenhum programa encontrado" })).toBeVisible();
    await user.click(checkbox);
    expect(rows()).toHaveLength(1); expect(input).toHaveValue("universal");
    await user.click(screen.getByRole("button", { name: "Limpar filtros" }));
    expect(rows()).toHaveLength(10); expect(checkbox).not.toBeChecked(); expect(input).toHaveFocus();
    const toggle = screen.getByRole("button", { name: "Mostrar detalhes de Dama Termos" });
    await user.click(toggle); expect(toggle).toHaveAttribute("aria-expanded", "true");
    await user.click(checkbox); expect(toggle).toHaveAttribute("aria-expanded", "false");
    await user.click(screen.getByRole("button", { name: "Utilitários SIGO" }));
    expect(rows()).toHaveLength(3);
    await user.type(input, "BIOMETRÍA"); expect(rows()).toHaveLength(1);
    await user.clear(input); await user.type(input, "inqueritos");
    expect(screen.getByRole("status")).toHaveTextContent("0 programas encontrados");
    await user.click(screen.getByRole("button", { name: "Mostrar todos os programas" }));
    expect(rows()).toHaveLength(10); expect(checkbox).not.toBeChecked(); expect(input).toHaveValue(""); expect(input).toHaveFocus();
  });
});
