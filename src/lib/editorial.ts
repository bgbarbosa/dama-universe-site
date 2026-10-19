import type { PostItem } from "@/data/posts";
import { normalizeCatalogSearch } from "@/lib/programCatalog";

export const postSubjects = ["Todos", "Inteligência artificial", "Automação documental", "Projetos e desenvolvimento"] as const;
export type PostSubject = (typeof postSubjects)[number];

export function postSubject(post: PostItem): PostSubject {
  if (post.category === "Inteligência Artificial") return "Inteligência artificial";
  if (["Automação documental", "Programas Dama"].includes(post.category)) return "Automação documental";
  return "Projetos e desenvolvimento";
}

export function filterPosts(posts: readonly PostItem[], subject: PostSubject, query: string) {
  const terms = normalizeCatalogSearch(query).split(/\s+/).filter(Boolean);
  return posts.filter((post) => (subject === "Todos" || postSubject(post) === subject) && terms.every((term) => normalizeCatalogSearch(`${post.title} ${post.summary} ${post.category}`).includes(term)));
}

export function sectionAnchor(heading: string, index: number) {
  return `secao-${index + 1}-${normalizeCatalogSearch(heading).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
}

export function isPublicWebUrl(value: string) {
  try { return ["https:", "http:"].includes(new URL(value).protocol); } catch { return false; }
}
