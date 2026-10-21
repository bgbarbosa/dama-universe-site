import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { BrandLogo } from "@/components/brand/BrandLogo";
import SobrePage, { metadata } from "@/app/sobre/page";
import { siteConfig } from "@/lib/seo";

describe("identidade Dama Universe aprovada pelo titular", () => {
  it("oferece uma única ação semântica para conhecer o ecossistema", () => {
    const { container } = render(<BrandLogo />);
    const link = screen.getByRole("link", { name: "Dama Universe — conhecer o ecossistema" });
    expect(link).toHaveAttribute("href", "/sobre");
    expect(link).not.toHaveAttribute("target");
    expect(within(link).getByRole("img")).toHaveAttribute("alt", "Dama Universe, símbolo D em azul e prata");
    expect(container.querySelector("a a, a button")).toBeNull();
  });

  it("amplia a apresentação preservando autoria, finalidade e limites", () => {
    const { container } = render(<SobrePage />);
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByText("Criado e desenvolvido por Marco Aurélio Pereira Barbosa.")).toBeVisible();
    expect(screen.getByRole("link", { name: /Perfil profissional completo/ })).toHaveAttribute("href", "https://pericia-digital-marco-site.vercel.app/perfil");
    const utility = screen.getByRole("link", { name: "Consultar Utilidade Pública" });
    expect(utility).toHaveAttribute("href", "/utilidade-publica");
    expect(utility).toHaveTextContent("a Dama Universe não presta esse atendimento");
    expect(screen.getByRole("link", { name: "Explorar programas" })).toHaveTextContent("estágios distintos");
    expect(screen.getByText(/A autoria pessoal não representa endosso/)).toBeVisible();
    expect(container.querySelector("a a, a button")).toBeNull();
  });

  it("usa a imagem social atual e preserva canonical e imagem explícita", () => {
    expect(metadata.alternates?.canonical).toBe("https://damauniverse.com.br/sobre");
    expect(JSON.stringify(metadata.openGraph)).toContain(siteConfig.ogImage);
    expect(siteConfig.ogImage).toBe("/images/og/dama-universe-marca-2026.png");
  });
});
