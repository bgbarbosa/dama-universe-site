import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Header } from "@/components/layout/Header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
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
