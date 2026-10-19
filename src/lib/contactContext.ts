import type { ContactType } from "@/lib/contact";
import { normalizeCatalogSearch } from "@/lib/programCatalog";

export const contactQueryTypes = {
  duvida: "Dúvida", sugestao: "Sugestão", suporte: "Erro em programa", parceria: "Parceria",
  patrocinio: "Patrocínio", profissional: "Contato profissional", capacitacao: "Outro", outro: "Outro",
} as const satisfies Record<string, ContactType>;

export type ContactQueryType = keyof typeof contactQueryTypes;
export type PublicProgramOption = { slug: string; name: string };
export type ContactSearchParams = Record<string, string | string[] | undefined>;

export function parseContactContext(params: ContactSearchParams, programs: readonly PublicProgramOption[]) {
  const type = typeof params.tipo === "string" ? normalizeCatalogSearch(params.tipo) : "";
  const slug = typeof params.programa === "string" ? params.programa.trim().toLowerCase() : "";
  return {
    contactType: Object.hasOwn(contactQueryTypes, type) ? contactQueryTypes[type as ContactQueryType] : "" as const,
    program: programs.some((item) => item.slug === slug) ? slug : "",
  };
}

export function contactHref(type: ContactQueryType, program?: string) {
  const query = new URLSearchParams({ tipo: type });
  if (program && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(program)) query.set("programa", program);
  return `/contato?${query.toString()}`;
}

export function supportsProgramContext(type: string) {
  return type === "Dúvida" || type === "Erro em programa" || type === "Sugestão";
}

export function contextualContactMessage(message: string, type: string, program?: PublicProgramOption, version = "") {
  if (!program || !supportsProgramContext(type)) return message;
  const versionText = version.trim().replace(/[\u0000-\u001f\u007f]/g, " ").slice(0, 60);
  const versionLine = type !== "Sugestão" && versionText ? `\nVersão informada pelo visitante: ${versionText}` : "";
  return `Programa relacionado: ${program.name} (${program.slug})${versionLine}\n\n${message}`;
}
