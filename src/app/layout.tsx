import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
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

        <Analytics />

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

        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xk22l19n2j");
          `}
        </Script>
      </body>
    </html>
  );
}