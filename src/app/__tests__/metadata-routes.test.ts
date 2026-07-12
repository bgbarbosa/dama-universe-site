import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import sitemap from "@/app/sitemap";
import { footerNavigation, posts, programs } from "@/data";
import { siteConfig } from "@/lib/seo";

describe("rotas de metadados", () => {
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
    const auditDate = new Date("2026-07-12T23:59:59.999Z");

    for (const entry of sitemap()) {
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect((entry.lastModified as Date).getTime()).toBeLessThanOrEqual(
        auditDate.getTime()
      );
    }
  });
});
