import type { MetadataRoute } from "next";
import { footerNavigation, posts, programs } from "@/data";
import { siteConfig } from "@/lib/seo";

const routeDates: Record<string, string> = {
  "/": "2026-07-10",
  "/programas": "2026-07-10",
  "/gpts": "2026-06-25",
  "/blog": "2026-06-25",
  "/referencias": "2026-06-23",
  "/apoie": "2026-06-25",
  "/sobre": "2026-06-25",
  "/contato": "2026-07-12",
  "/termos-de-uso": "2026-06-25",
  "/politica-de-privacidade": "2026-07-12",
  "/politica-de-cookies": "2026-07-12",
  "/politica-de-comentarios": "2026-06-25",
};

function createEntry(
  path: string,
  lastModified: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "monthly",
  priority = 0.7
) {
  return {
    url: new URL(path, siteConfig.url).toString(),
    lastModified: new Date(`${lastModified}T00:00:00.000Z`),
    changeFrequency,
    priority,
  } satisfies MetadataRoute.Sitemap[number];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = footerNavigation.map(({ href }) =>
    createEntry(
      href,
      routeDates[href] ?? "2026-06-25",
      href === "/" ? "weekly" : "monthly",
      href === "/" ? 1 : 0.7
    )
  );

  const programEntries = programs.map((program) =>
    createEntry(
      program.detailsUrl,
      program.updatedAt ?? "2026-06-25",
      "monthly",
      program.status === "Disponível" ? 0.9 : 0.7
    )
  );

  const postEntries = posts.map((post) =>
    createEntry(`/blog/${post.slug}`, post.date, "yearly", 0.6)
  );

  return [
    ...staticEntries,
    ...programEntries,
    ...postEntries,
    createEntry("/changelog/dama-gerador-fcc/v3.0.0", "2026-06-23", "yearly", 0.5),
  ];
}
