import { describe, expect, it } from "vitest";

import {
  footerNavigation,
  postContents,
  posts,
  primaryNavigation,
  programs,
  socialLinks,
  supportOptions,
} from "@/data";

describe("integridade das fontes de dados", () => {
  it("mantém slugs de posts e conteúdos sincronizados", () => {
    expect(posts.map((post) => post.slug).sort()).toEqual(
      postContents.map((post) => post.slug).sort()
    );
  });

  it("não possui slugs nem rotas duplicadas", () => {
    expect(new Set(programs.map((program) => program.slug)).size).toBe(programs.length);
    expect(new Set(posts.map((post) => post.slug)).size).toBe(posts.length);
    expect(new Set(footerNavigation.map((item) => item.href)).size).toBe(
      footerNavigation.length
    );
  });

  it("mantém links internos válidos e sem placeholders", () => {
    for (const item of [...primaryNavigation, ...footerNavigation]) {
      expect(item.href).toMatch(/^\//);
      expect(item.href).not.toBe("#");
    }

    for (const link of socialLinks) {
      expect(link.url).not.toBe("#");
    }

    for (const option of supportOptions) {
      expect(option.url).not.toBe("#");
    }
  });

  it("mantém rotas de detalhes coerentes com os slugs dos programas", () => {
    for (const program of programs) {
      expect(program.detailsUrl).toBe(`/programas/${program.slug}`);
    }
  });
});
