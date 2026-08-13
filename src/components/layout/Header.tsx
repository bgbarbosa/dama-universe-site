"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNavigation } from "@/data";
import { GlowButton } from "@/components/ui";

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
          {primaryNavigation.map((item) => {
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

        <button
          ref={menuButtonRef}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-borderSoft text-2xl text-text transition hover:border-electric hover:bg-electric/10 focus-ring lg:hidden"
        >
          <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
        </button>
      </div>

      {menuOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-border bg-backgroundSoft px-5 py-5 shadow-card lg:hidden"
        >
          <nav aria-label="Navegação móvel" className="mx-auto grid max-w-site gap-2">
            {primaryNavigation.map((item, index) => (
              <Link
                key={item.href}
                ref={index === 0 ? firstMobileLinkRef : undefined}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center rounded-xl px-4 py-2 text-sm font-bold text-muted transition hover:bg-white/5 hover:text-text focus-ring"
              >
                {item.label}
              </Link>
            ))}
            <GlowButton
              href={cta.href}
              onClick={() => setMenuOpen(false)}
              className="mt-2 min-h-11 w-full"
            >
              {cta.label}
            </GlowButton>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
