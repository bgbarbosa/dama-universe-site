import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Footer, Header } from "@/components/layout";
import { createPageMetadata, siteConfig } from "@/lib/seo";
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
  robots: {
    index: true,
    follow: true,
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
        <div className="flex min-h-screen flex-col">
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TJRDW9KBYX"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TJRDW9KBYX');
          `}
        </Script>
      </body>
    </html>
  );
}