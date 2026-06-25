import Link from "next/link";
import type { ReactNode } from "react";

const quickLinks = [
  { label: "Início", href: "/" },
  { label: "Programas", href: "/programas" },
  { label: "GPTs Personalizados", href: "/gpts" },
  { label: "Blog", href: "/blog" },
  { label: "Referências", href: "/referencias" },
  { label: "Apoie", href: "/apoie" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Política de Comentários", href: "/politica-de-comentarios" },
];

const socialLinks = [
  { label: "GitHub", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "LinkedIn", href: "#" },
];

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const className =
    "rounded-md text-sm text-muted transition duration-200 hover:text-electricLight focus-ring";
  const linkLabel = typeof children === "string" ? children : "Link";
  const isExternal = href.startsWith("http");

  if (href === "#") {
    return (
      <a
        href={href}
        className={className}
        aria-label={`${linkLabel} — canal oficial em preparação`}
      >
        {children}
      </a>
    );
  }

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/80 bg-backgroundSoft/80 text-text">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:px-8 lg:grid-cols-[1.2fr_1.4fr_0.95fr]">
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-3 rounded-full focus-visible:dama-focus"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-chrome/35 bg-white/[0.04] text-lg font-black chrome-text shadow-chrome">
              D
            </span>

            <span>
              <span className="block text-lg font-semibold text-chromeLight">
                Dama Universe
              </span>
              <span className="block text-sm text-muted">
                Programas, IA, dados e ferramentas
              </span>
            </span>
          </Link>

          <p className="max-w-sm text-sm leading-7 text-muted">
            Programas, inteligência artificial, dados e ferramentas em evolução.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-chrome">
            Links rápidos
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {quickLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-electric/45 bg-electric/5 p-5 shadow-[0_0_32px_rgba(37,150,255,0.22)]">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-electricLight">
            Canais oficiais em preparação
          </h2>

          <div className="mt-5 flex flex-col gap-3">
            {socialLinks.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>

          <p className="mt-5 text-xs leading-6 text-mutedSoft">
            Os canais oficiais do Dama Universe serão ativados gradualmente
            conforme o projeto evoluir.
          </p>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8">
          <p className="max-w-3xl leading-7">
            As ferramentas disponibilizadas possuem finalidade de apoio,
            organização e automação, exigindo conferência e responsabilidade do
            usuário.
          </p>

          <p className="shrink-0 text-chrome">
            © 2026 Dama Universe. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}