"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GlowButton } from "@/components/ui";

const navItems = [
  { href: "/", label: "Início" },
  { href: "/programas", label: "Programas" },
  { href: "/gpts", label: "GPTs" },
  { href: "/blog", label: "Blog" },
  { href: "/referencias", label: "Referências" },
  { href: "/apoie", label: "Apoie" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

function getHeaderCta(pathname: string) {
  if (
    pathname === "/" ||
    pathname === "/programas" ||
    pathname === "/gpts"
  ) {
    return { href: "/sobre", label: "Conhecer criador" };
  }

  if (pathname.startsWith("/programas/") && pathname !== "/programas") {
    return { href: "/programas", label: "Ver Programas" };
  }

  return { href: "/programas", label: "Ver Programas" };
}

export function Header() {
  const pathname = usePathname();
  const cta = getHeaderCta(pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/82 backdrop-blur-xl">
      <div className="container-site flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-3 rounded-xl focus-ring">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-borderSoft bg-surface text-sm font-black text-text shadow-chrome">
            D
          </div>

          <div className="leading-tight">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-text">
              Dama
            </p>
            <p className="text-sm font-semibold text-muted">Universe</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-full px-4 py-2 text-sm font-bold transition-colors focus-ring",
                  isActive
                    ? "bg-white/8 text-text"
                    : "text-muted hover:bg-white/5 hover:text-text",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          {cta.label === "Conhecer criador" ? (
            <GlowButton
              href={cta.href}
              className="border-2 border-electric bg-electric/15 px-6 py-3 text-sm font-black text-electricLight shadow-[0_0_35px_rgba(37,150,255,0.55)] hover:bg-electric hover:text-white hover:shadow-[0_0_50px_rgba(37,150,255,0.75)]"
            >
              {cta.label}
            </GlowButton>
          ) : (
            <GlowButton href={cta.href} variant="secondary">
              {cta.label}
            </GlowButton>
          )}
        </div>
      </div>
    </header>
  );
}