import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { footerNavigation, posts, programs } from "@/data";
import { siteConfig } from "@/lib/seo";
import { publicServices } from "@/data/publicServices";

describe("rotas de metadados", () => {
  const demoPath = "/gpts/dama-registro-de-ocorrencia";

  it("gera robots coerente com o domínio", () => {
    expect(robots()).toEqual({
      rules: { userAgent: "*", allow: "/" },
      sitemap: `${siteConfig.url}/sitemap.xml`,
    });
  });

  it("inclui todas as rotas indexáveis e nenhuma duplicada", () => {
    const entries = sitemap();
    const urls = entries.map((entry) => entry.url);
    const expectedPaths = [
      ...footerNavigation.map((item) => item.href),
      ...programs.map((program) => program.detailsUrl),
      ...posts.map((post) => `/blog/${post.slug}`),
      ...publicServices.map(service => service.detailsUrl),
      demoPath,
      "/changelog/dama-gerador-fcc/v3.0.0",
    ];

    expect(new Set(urls).size).toBe(urls.length);
    expect(urls).toHaveLength(expectedPaths.length);

    for (const path of expectedPaths) {
      expect(urls).toContain(new URL(path, siteConfig.url).toString());
    }
  });

  it("não indexa a rota de redirecionamento de downloads", () => {
    expect(sitemap().map((entry) => entry.url)).not.toContain(
      `${siteConfig.url}/downloads`
    );
  });

  it("usa datas válidas e não futuras", () => {
    const entries = sitemap();
    const auditTimestamp = Date.now();

    for (const entry of entries) {
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect((entry.lastModified as Date).getTime()).toBeLessThanOrEqual(
        auditTimestamp
      );
    }

    const demo = entries.find(
      (entry) => entry.url === new URL(demoPath, siteConfig.url).toString()
    );
    expect(demo?.lastModified).toEqual(new Date("2026-11-07T00:00:00.000Z"));
  });
});
