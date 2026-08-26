import { readFileSync } from "node:fs";

import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import HomePage from "@/app/page";
import DamaBiometriaSigoFixPage from "@/app/programas/dama-biometria-sigo-fix/page";
import { ConsentProvider } from "@/components/privacy";
import { ProgramCard } from "@/components/programs";
import { getProgramBySlug, updates } from "@/data";

describe("divulgação do Dama Biometria SIGO Fix 2.0.0", () => {
  const biometriaProgram = getProgramBySlug("dama-biometria-sigo-fix");

  if (!biometriaProgram) {
    throw new Error("Programa de biometria não encontrado.");
  }

  function renderHomePage() {
    return render(
      <ConsentProvider>
        <HomePage />
      </ConsentProvider>
    );
  }

  it("exibe o banner entre o hero e Novidades recentes na página principal", () => {
    renderHomePage();

    const banner = screen.getByTestId("biometria-update-banner-home");
    const updatesHeading = screen.getByRole("heading", {
      name: "Novidades recentes",
    });

    expect(banner).toHaveTextContent("ATUALIZAÇÃO IMPORTANTE");
    expect(banner).toHaveTextContent(
      "Dama Biometria SIGO Fix 2.0.0 disponível"
    );
    expect(
      screen.getByRole("link", { name: "Conhecer a versão 2.0.0" })
    ).toHaveAttribute("href", "/programas/dama-biometria-sigo-fix");
    expect(
      banner.compareDocumentPosition(updatesHeading) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });

  it("publica a novidade 2.0.0 antes do histórico 1.0.0", () => {
    const currentIndex = updates.findIndex(
      (update) => update.title === "Dama Biometria SIGO Fix 2.0.0 disponível"
    );
    const historyIndex = updates.findIndex(
      (update) => update.title === "Dama Biometria SIGO Fix 1.0.0 publicado"
    );

    expect(currentIndex).toBeGreaterThanOrEqual(0);
    expect(historyIndex).toBeGreaterThan(currentIndex);

    renderHomePage();
    expect(
      screen.getByRole("heading", {
        name: "Dama Biometria SIGO Fix 2.0.0 disponível",
        level: 3,
      })
    ).toBeInTheDocument();
  });

  it("associa selo e linhas de atualização somente ao card configurado", () => {
    const cleanerProgram = getProgramBySlug("dama-cleaner-sigo-desktop");

    if (!cleanerProgram) {
      throw new Error("Programa de comparação não encontrado.");
    }

    const { rerender } = render(<ProgramCard program={biometriaProgram} />);

    expect(screen.getByText("NOVO • ATUALIZAÇÃO 2.0.0")).toBeInTheDocument();
    expect(
      screen.getByText("Atualizado para o SIGO Desktop 1.0.48")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Correções de Java • Nitgen • JNI • Biometria")
    ).toBeInTheDocument();

    rerender(<ProgramCard program={cleanerProgram} />);
    expect(
      screen.queryByText("NOVO • ATUALIZAÇÃO 2.0.0")
    ).not.toBeInTheDocument();
  });

  it("exibe banner, download, âncora e conteúdo técnico na página específica", () => {
    const { container } = render(<DamaBiometriaSigoFixPage />);
    const banner = screen.getByTestId("biometria-update-banner-program");
    const changesSection = container.querySelector(
      "#o-que-mudou-na-versao-2"
    );
    const pageText = container.textContent ?? "";

    expect(banner).toHaveTextContent("ATUALIZAÇÃO 2.0.0 DISPONÍVEL");
    expect(banner).toHaveTextContent(
      "Compatibilidade homologada com o SIGO Desktop 1.0.48"
    );
    expect(
      screen.getByRole("link", { name: "Ver o que mudou" })
    ).toHaveAttribute("href", "#o-que-mudou-na-versao-2");
    expect(changesSection).toBeInTheDocument();
    expect(changesSection).toHaveClass("scroll-mt-28");
    expect(
      screen.getAllByRole("link", { name: "Baixar versão 2.0.0" })
    ).toHaveLength(3);
    expect(pageText).toContain("SIGO Desktop - Biometria Corrigida");
    expect(pageText).toContain("Java/JNI");
    expect(pageText).toContain("rollback");
    expect(pageText).toContain("VID/PID");
    expect(pageText).not.toMatch(
      /atalho normal|atalho original|normal\/original/i
    );
  });

  it("define animação de 2,8 segundos e alternativa para movimento reduzido", () => {
    const css = readFileSync("src/app/globals.css", "utf8");

    expect(css).toContain("release-glow-cycle");
    expect(css).toContain("release-accent-cycle");
    expect(css).toContain("release-stripe-cycle");
    expect(css).toMatch(/2\.8s ease-in-out infinite/g);
    expect(css).toContain("@media (prefers-reduced-motion: reduce)");
    expect(css).toMatch(
      /\.release-glow,[\s\S]*\.release-glow::before,[\s\S]*\.release-glow-badge[\s\S]*animation: none;/
    );
  });
});
