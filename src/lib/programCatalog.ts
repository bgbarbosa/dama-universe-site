export const catalogCategories = [
  { id: "documentos", label: "Documentos e automação", filterLabel: "Documentos e automação", description: "Ferramentas para preparar, organizar e padronizar documentos e fluxos de trabalho." },
  { id: "gestao", label: "Gestão, organização e análise", filterLabel: "Gestão, organização e análise", description: "Projetos voltados a organizar atividades, informações, processos e dados." },
  { id: "sigo", label: "Utilitários para SIGO Desktop", filterLabel: "Utilitários SIGO", description: "Ferramentas Dama de apoio ao ambiente local." },
] as const;

export type CatalogCategory = (typeof catalogCategories)[number]["id"];
export type CatalogFilter = "todos" | CatalogCategory;
export type CatalogProgram = {
  slug: string;
  name: string;
  category: CatalogCategory;
  summary: string;
  details: string;
  version?: string;
  stage?: string;
  access: "Download público" | "Sob consulta" | "Sem download público";
  platform?: string;
  iconUrl?: string;
  pageUrl: string;
  downloadUrl?: string;
  downloadLabel?: string;
  alternativeDownload?: { url: string; label: string };
  manualUrl?: string;
  changelogUrl?: string;
  compatibility?: string;
  previewImage?: { src: string; alt: string; width: number; height: number };
};

export function normalizeCatalogSearch(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR").trim();
}

export function filterCatalog(programs: readonly CatalogProgram[], category: CatalogFilter, query: string, onlyAvailable = false) {
  const terms = normalizeCatalogSearch(query).split(/\s+/).filter(Boolean);
  return programs.filter((program) => {
    if (onlyAvailable && !program.downloadUrl) return false;
    if (category !== "todos" && program.category !== category) return false;
    const categoryLabel = catalogCategories.find((item) => item.id === program.category)!.label;
    const text = normalizeCatalogSearch(`${program.name} ${program.summary} ${categoryLabel}`);
    return terms.every((term) => text.includes(term));
  });
}
