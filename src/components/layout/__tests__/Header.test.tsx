import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Header } from "@/components/layout/Header";

const route = vi.hoisted(() => ({ pathname: "/" }));
vi.mock("next/navigation", () => ({
  usePathname: () => route.pathname,
}));

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    onClick,
    ...props
  }: AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
    children: ReactNode;
  }) => (
    <a
      href={href}
      {...props}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        onClick?.(event);
      }}
    >
      {children}
    </a>
  ),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    route.pathname = "/";
  });

  it("mantém Referências e os nove destinos no menu principal e no menu móvel", async () => {
    route.pathname = "/referencias";
    const user = userEvent.setup(); render(<Header />);
    const desktop = screen.getByRole("navigation", {name:"Navegação principal"});
    expect(within(desktop).getAllByRole("link")).toHaveLength(9);
    expect(within(desktop).getByRole("link", {name:"Utilidade Pública"})).toHaveAttribute("href", "/utilidade-publica");
    expect(within(desktop).getByRole("link",{name:"Referências"})).toHaveAttribute("aria-current","page");
    await user.click(screen.getByRole("button",{name:"Abrir menu"}));
    const mobile = screen.getByRole("navigation",{name:"Navegação móvel"});
    expect(within(mobile).getAllByRole("link").map(link=>link.getAttribute("href"))).toEqual(within(desktop).getAllByRole("link").map(link=>link.getAttribute("href")));
    expect(within(mobile).getByRole("link",{name:"Referências"})).toHaveAttribute("aria-current","page");
  });

  it("marca a rota de IA sem trocar a URL e evita CTA redundante na Home", () => {
    route.pathname = "/gpts";
    render(<Header />);
    expect(screen.getByRole("link", { name: "IA aplicada" })).toHaveAttribute("href", "/gpts");
    expect(screen.getByRole("link", { name: "IA aplicada" })).toHaveAttribute("aria-current", "page");
    expect(screen.queryByRole("link", { name: "Conhecer criador" })).toBeNull();
  });

  it("destaca Utilidade Pública também na página detalhada e no menu móvel", async () => {
    route.pathname = "/utilidade-publica/cabs";
    const user = userEvent.setup();
    render(<Header />);
    const desktop = screen.getByRole("navigation", {name: "Navegação principal"});
    expect(within(desktop).getByRole("link", {name: "Utilidade Pública"})).toHaveAttribute("aria-current", "page");
    await user.click(screen.getByRole("button", {name: "Abrir menu"}));
    const mobile = screen.getByRole("navigation", {name: "Navegação móvel"});
    expect(within(mobile).getByRole("link", {name: "Utilidade Pública"})).toHaveAttribute("aria-current", "page");
  });

  it("preserva o retorno ao catálogo nas páginas dos programas", () => {
    route.pathname = "/programas/dama-termos";
    render(<Header />);
    expect(screen.getByRole("link", { name: "Ver Programas" })).toHaveAttribute("href", "/programas");
  });

  it("abre e fecha o menu móvel por botão", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    expect(screen.getByRole("navigation", { name: "Navegação móvel" })).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Fechar menu" }));
    expect(screen.queryByRole("navigation", { name: "Navegação móvel" })).toBeNull();
  });

  it("fecha por Escape e devolve foco ao botão", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("navigation", { name: "Navegação móvel" })).toBeNull();
    expect(screen.getByRole("button", { name: "Abrir menu" })).toHaveFocus();
  });

  it("fecha por clique externo", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <Header />
        <main data-testid="outside" />
      </div>
    );

    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    fireEvent.pointerDown(screen.getByTestId("outside"));

    expect(screen.queryByRole("navigation", { name: "Navegação móvel" })).toBeNull();
  });

  it("fecha quando um item é selecionado", async () => {
    const user = userEvent.setup();
    render(<Header />);

    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    const mobileNavigation = screen.getByRole("navigation", {
      name: "Navegação móvel",
    });
    await user.click(
      mobileNavigation.querySelector('a[href="/programas"]') as HTMLAnchorElement
    );

    expect(screen.queryByRole("navigation", { name: "Navegação móvel" })).toBeNull();
  });
});
