import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

const routes = [
  "/",
  "/programas",
  "/programas/dama-gerador-fcc",
  "/programas/dama-gerador-fcc-universal",
  "/programas/sdo",
  "/programas/dama-gestor-de-inqueritos",
  "/programas/dama-inteligencia-investigativa",
  "/gpts",
  "/blog",
  "/referencias",
  "/apoie",
  "/sobre",
  "/contato",
  "/termos-de-uso",
  "/politica-de-privacidade",
  "/politica-de-comentarios",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    lastModified: new Date("2026-06-25"),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
