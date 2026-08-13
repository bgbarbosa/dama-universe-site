import type { Metadata } from "next";

export const siteConfig = {
  name: "Dama Universe",
  url: "https://damauniverse.com.br",
  locale: "pt_BR",
  ogImage: "/images/og/dama-universe-og.png",
  defaultTitle: "Dama Universe — Programas, IA, dados e ferramentas em evolução",
  defaultDescription:
    "Dama Universe é um espaço dedicado a programas, ferramentas digitais, inteligência artificial, análise de dados, automação, downloads, versões e conteúdos técnicos.",
};

type CreatePageMetadataParams = {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  image?: string;
  imageAlt?: string;
};

export function createPageMetadata({
  title,
  description,
  path = "/",
  type = "website",
  image = siteConfig.ogImage,
  imageAlt = "Dama Universe — Programas, IA, dados e ferramentas em evolução",
}: CreatePageMetadataParams): Metadata {
  const canonicalPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(canonicalPath, siteConfig.url).toString();
  const imageUrl = new URL(image, siteConfig.url).toString();

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
          alt: imageAlt,
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
