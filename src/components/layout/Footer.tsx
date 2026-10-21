import Link from "next/link";
import type { ReactNode } from "react";
import { footerNavigation, socialLinks } from "@/data";
import { BrandLogo } from "@/components/brand/BrandLogo";

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  const className =
    "inline-flex min-h-11 min-w-0 items-center rounded-md text-sm text-muted [overflow-wrap:anywhere] transition duration-200 hover:text-electricLight focus-ring";
  const isExternal = href.startsWith("http");

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
  const activeSocialLinks = socialLinks.filter(
    (link): link is typeof link & { url: string } =>
      link.status === "Ativo" && Boolean(link.url)
  );

  return (
    <footer className="border-t border-border/80 bg-backgroundSoft/80 text-text">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-5 py-12 md:px-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1.4fr)_minmax(0,0.95fr)]">
        <div className="min-w-0 space-y-4">
          <BrandLogo placement="footer" />

          <p className="max-w-sm text-sm leading-7 text-muted">
            Programas, inteligência artificial, dados e ferramentas em evolução.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-chrome">
            Links rápidos
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {footerNavigation.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-borderSoft bg-electric/5 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-electricLight [overflow-wrap:anywhere]">
            Canais e contato
          </h2>

          {activeSocialLinks.length ? (
            <div className="mt-5 flex flex-col gap-3">
              {activeSocialLinks.map((link) => (
                <FooterLink key={link.name} href={link.url}>
                  {link.name}
                </FooterLink>
              ))}
            </div>
          ) : null}

          <p className="mt-5 text-xs leading-6 text-mutedSoft">
            Dúvidas sobre o projeto? Use o e-mail geral ou o WhatsApp.
            Os perfis de Marco Barbosa identificam a atuação pessoal do criador.
          </p>
        </div>
      </div>

      <div className="border-t border-border/70">
        <div className="mx-auto flex max-w-7xl flex-col flex-wrap gap-4 px-5 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8">
          <p className="max-w-3xl leading-7">
            As ferramentas disponibilizadas possuem finalidade de apoio,
            organização e automação, exigindo conferência e responsabilidade do
            usuário.
          </p>

          <p className="min-w-0 text-chrome">
            © 2026 Dama Universe. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
