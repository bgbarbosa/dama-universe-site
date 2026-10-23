export type EditorialVisual = {
  src: string;
  width: number;
  height: number;
  kind: "concept" | "identity" | "interface";
};

const concept = (name: string): EditorialVisual => ({
  src: `/images/editorial/${name}.svg`, width: 800, height: 360, kind: "concept",
});

const identity = (name: string, size: number): EditorialVisual => ({
  src: `/images/programs/${name}.png`, width: size, height: size, kind: "identity",
});

export const writingSupportVisual = concept("apoio-escrita-organizacao");

const harmonized = (name: string, miniature = false): EditorialVisual => ({
  src: `/images/editorial/v3/${name}-v3.webp`,
  width: miniature ? 1254 : 1860,
  height: miniature ? 1254 : 845,
  kind: "concept",
});

export const homeAiVisual = harmonized("dama-ia-inteligencia-conexao");

const assistantVisuals: Record<string, EditorialVisual> = {
  "boletim-de-ocorrencia-2": harmonized("dama-redacao-ocorrencias"),
  "especialista-em-escrita-e-revisao": harmonized("dama-escrita-revisao"),
};

const assistantThumbnails: Record<string, EditorialVisual> = {
  "boletim-de-ocorrencia-2": harmonized("dama-redacao-ocorrencias-mini", true),
  "especialista-em-escrita-e-revisao": harmonized("dama-escrita-revisao-mini", true),
};

const programVisuals: Record<string, EditorialVisual> = {
  "/programas/dama-termos": { src: "/images/programs/dama-termos-interface.webp", width: 1443, height: 1090, kind: "interface" },
  "/programas/dama-biometria-sigo-fix": identity("dama-biometria-sigo-fix", 1254),
  "/programas/dama-gestor-rh": identity("dama-gestor-rh", 512),
};

const articleVisuals: Record<string, EditorialVisual> = {
  "apresentando-o-dama-universe": harmonized("dama-ia-inteligencia-conexao"),
  "por-que-criei-o-dama-gerador-fcc": identity("dama-gerador-fcc-3", 1254),
  "dama-gerador-fcc-3-nova-etapa-operacional": identity("dama-gerador-fcc-3", 1254),
  "dama-universe-por-que-documentar-cada-avanco": harmonized("dama-informacao-organizada"),
  "sdo-e-a-organizacao-operacional-do-plantao": harmonized("dama-organizacao-operacional"),
  "dama-inteligencia-investigativa-arquitetura-reservada": harmonized("dama-analise-informacoes"),
  "como-organizo-versoes-dos-meus-programas": harmonized("dama-informacao-organizada"),
  "inteligencia-artificial-como-ferramenta-de-apoio": harmonized("dama-ia-inteligencia-conexao"),
};

export function assistantVisual(slug: string) {
  return assistantVisuals[slug] ?? writingSupportVisual;
}

export function assistantThumbnail(slug: string) {
  return assistantThumbnails[slug] ?? writingSupportVisual;
}

export function updateVisual(url?: string) {
  return programVisuals[url ?? ""] ?? concept("desenvolvimento-versoes");
}

export function articleVisual(slug: string) {
  return articleVisuals[slug] ?? concept("documentacao-registros");
}
