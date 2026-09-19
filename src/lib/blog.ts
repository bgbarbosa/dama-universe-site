import { posts, type PostItem } from "@/data/posts";
import { getPostContentBySlug } from "@/data/postContents";

export function sortPostsByDate(items: readonly PostItem[]) {
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}
export function getRecentPosts(limit = 3) { return sortPostsByDate(posts).slice(0, limit); }
export function formatDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
export function getReadingTime(slug: string) {
  const post = getPostContentBySlug(slug);
  if (!post) return undefined;
  const text = post.content.flatMap((section) => [section.heading, ...section.paragraphs]).join(" ");
  const words = text.trim().split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min de leitura`;
}
export const relatedPrograms: Record<string, { href: string; name: string }[]> = {
  "por-que-criei-o-dama-gerador-fcc": [{ href: "/programas/dama-gerador-fcc", name: "Dama Gerador FCC" }],
  "dama-gerador-fcc-3-nova-etapa-operacional": [{ href: "/programas/dama-gerador-fcc", name: "Dama Gerador FCC" }],
  "sdo-e-a-organizacao-operacional-do-plantao": [{ href: "/programas/sdo", name: "SDO" }],
  "dama-inteligencia-investigativa-arquitetura-reservada": [{ href: "/programas/dama-inteligencia-investigativa", name: "Dama Inteligência Investigativa" }],
};
