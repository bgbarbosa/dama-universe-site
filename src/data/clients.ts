export type PublicClient = {
  name: string;
  program: string;
  description: string;
  period?: string;
  logo?: { src: string; alt: string; width: number; height: number };
  publication: "approved" | "pending";
};

// Somente textos e ativos públicos aprovados; não armazenar comprovantes aqui.
export const clients: PublicClient[] = [];

export function getPublishedClients(items: readonly PublicClient[]) {
  return items.filter((item) => item.publication === "approved" && item.name.trim() && item.program.trim() && item.description.trim());
}
