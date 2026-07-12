import { describe, expect, it } from "vitest";

import { createPageMetadata, siteConfig } from "@/lib/seo";

describe("createPageMetadata", () => {
  it("gera canonical e imagens absolutas", () => {
    const metadata = createPageMetadata({
      title: "Página de teste",
      description: "Descrição de teste",
      path: "/teste",
    });

    expect(metadata.alternates?.canonical).toBe(`${siteConfig.url}/teste`);
    expect(metadata.openGraph?.url).toBe(`${siteConfig.url}/teste`);
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    expect(metadata.openGraph?.images).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ width: 1200, height: 630 }),
      ])
    );
  });
});
