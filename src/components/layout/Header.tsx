"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNavigation } from "@/data";
import { GlowButton } from "@/components/ui";
import { contacts } from "@/data/contacts";
import { BrandLogo } from "@/components/brand/BrandLogo";

function getHeaderCta(pathname: string) {
  if (pathname.startsWith("/programas/") && pathname !== "/programas") {
    return { href: "/programas", label: "Ver Programas" };
  }
  return null;
}

export function Header() {
  const pathname = usePathname();
  const cta = getHeaderCta(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstMobileLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    firstMobileLinkRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    function closeOnOutsidePointer(event: PointerEvent) {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePointer);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
    };
  }, [menuOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl"
    >
      <div className="container-site flex min-h-20 flex-wrap items-center justify-between gap-3 py-3 xl:max-w-[1440px]">
        <BrandLogo />

        <nav aria-label="Navegação principal" className="hidden min-w-0 flex-wrap items-center gap-0.5 xl:flex">
          {primaryNavigation.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "min-h-11 rounded-full px-3 py-3 text-sm font-bold transition-colors focus-ring",
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

        <div className="hidden shrink-0 flex-col items-end gap-1 xl:flex" aria-label="Outros caminhos">
          {cta ?
            <GlowButton href={cta.href} variant="secondary">
              {cta.label}
            </GlowButton>
          : null}
          <a href={contacts.professionalSite} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-electricLight hover:bg-white/5 focus-ring">Marco Barbosa <span aria-hidden="true">↗︎</span></a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-xl border border-borderSoft text-2xl text-text transition hover:border-electric hover:bg-electric/10 focus-ring xl:hidden"
        >
          <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
        </button>
      </div>

      {menuOpen ? (
        <div
          id="mobile-navigation"
          className="max-h-[70dvh] overflow-y-auto border-t border-border bg-backgroundSoft px-5 py-5 shadow-card xl:hidden"
        >
          <nav aria-label="Navegação móvel" className="mx-auto grid max-w-site gap-2 sm:grid-cols-2">
            {primaryNavigation.map((item, index) => (
              <Link
                key={item.href}
                ref={index === 0 ? firstMobileLinkRef : undefined}
                href={item.href}
                aria-current={(item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center rounded-xl px-4 py-2 text-sm font-bold text-muted transition hover:bg-white/5 hover:text-text focus-ring"
              >
                {item.label}
              </Link>
            ))}
            {cta ? <GlowButton
              href={cta.href}
              onClick={() => setMenuOpen(false)}
              className="mt-2 min-h-11 w-full"
            >
              {cta.label}
            </GlowButton> : null}
          </nav>
          <div className="mx-auto mt-4 max-w-site border-t border-border pt-3">
            <a href={contacts.professionalSite} target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)} className="flex min-h-11 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-electricLight hover:bg-white/5 focus-ring">Marco Barbosa <span aria-hidden="true">↗︎</span></a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
