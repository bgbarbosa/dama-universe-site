import type { Metadata } from "next";

export const siteConfig = {
  name: "Dama Universe",
  url: "https://damauniverse.com.br",
  locale: "pt_BR",
  ogImage: "/images/og/dama-universe-og.svg",
  defaultTitle: "Dama Universe — Programas, IA, dados e ferramentas em evolução",
  defaultDescription:
    "Dama Universe é um espaço dedicado a programas, ferramentas digitais, inteligência artificial, análise de dados, automação, downloads, versões e conteúdos técnicos.",
};

type CreatePageMetadataParams = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  type = "website",
}: CreatePageMetadataParams): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(canonicalPath, siteConfig.url).toString();
  const imageUrl = new URL(siteConfig.ogImage, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Dama Universe — Programas, IA, dados e ferramentas em evolução",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
