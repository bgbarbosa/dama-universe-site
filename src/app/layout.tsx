import type { Metadata, Viewport } from "next";
import { Footer, Header } from "@/components/layout";
import { SiteMetrics } from "@/components/metrics/SiteMetrics";
import { ConsentProvider } from "@/components/privacy";
import { createPageMetadata, siteConfig } from "@/lib/seo";
import { publicMetricPaths, resourceMetricLinks } from "@/lib/site-metrics-inventory";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  ...createPageMetadata({
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    path: "/",
  }),
  applicationName: siteConfig.name,
  authors: [{ name: "Dama Universe" }],
  creator: "Dama Universe",
  publisher: "Dama Universe",
  verification: { other: { "msvalidate.01": "49A6DAE93186FEC17D4BEB690DDF7B14" } },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
};

export const viewport: Viewport = {
  themeColor: "#05070A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <ConsentProvider>
          <SiteMetrics paths={publicMetricPaths} resources={resourceMetricLinks} />
          <div className="flex min-h-screen flex-col">
            <a href="#conteudo" className="sr-only fixed left-4 top-4 z-[100] rounded-xl bg-background px-5 py-3 text-text focus:not-sr-only focus-ring">Pular para o conteúdo</a>
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </ConsentProvider>
      </body>
    </html>
  );
}
