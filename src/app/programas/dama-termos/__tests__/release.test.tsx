import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import DamaTermosPage, { metadata } from "@/app/programas/dama-termos/page";
import sitemap from "@/app/sitemap";
import { FeaturedPrograms } from "@/components/home/FeaturedPrograms";
import { SiteUpdatesPreview } from "@/components/home/SiteUpdatesPreview";
import { ProgramCard } from "@/components/programs/ProgramCard";
import { contacts } from "@/data/contacts";
import { getProgramBySlug, programs } from "@/data/programs";
import { updates } from "@/data/updates";

const EXE = "https://drive.google.com/file/d/1Rk16smRE6dbuyTzG8LXluEHAQjIfvgty/view?usp=sharing";
const ZIP = "https://drive.google.com/file/d/1IRa8Sfg-_XtNiZQuAfYpHPld3M-_q9nY/view?usp=sharing";

describe("lançamento do Dama Termos 1.0.0", () => {
  it("centraliza os dois destinos e preserva a distinção entre captura e ícone", () => {
    expect(getProgramBySlug("dama-termos")).toMatchObject({
      name: "Dama Termos",
      version: "1.0.0",
      status: "Disponível",
      updatedAt: "2026-10-16",
      detailsUrl: "/programas/dama-termos",
      downloadUrl: EXE,
      alternativeDownload: { url: ZIP, label: "Baixar instalador em ZIP" },
      previewImage: { width: 1443, height: 1090 },
    });
    expect(getProgramBySlug("dama-termos")?.iconUrl).toBeUndefined();
    expect(programs).toHaveLength(10);
    expect(programs.filter((program) => program.slug !== "dama-termos")).toHaveLength(9);
  });

  it("separa navegação, EXE e ZIP no cartão, inclusive por teclado", async () => {
    const program = getProgramBySlug("dama-termos");
    if (!program) throw new Error("Programa não encontrado.");
    const user = userEvent.setup();
    const { container } = render(<ProgramCard program={program} />);
    const details = screen.getByRole("link", { name: "Conhecer Dama Termos" });
    const exe = screen.getByRole("link", { name: "Baixar Dama Termos para Windows" });
    const zip = screen.getByRole("link", { name: "Baixar instalador em ZIP" });
    expect(details).toHaveAttribute("href", "/programas/dama-termos");
    expect(exe).toHaveAttribute("href", EXE);
    expect(zip).toHaveAttribute("href", ZIP);
    expect(container.querySelector("a a")).toBeNull();
    for (const link of [exe, zip]) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      expect(details.contains(link)).toBe(false);
    }
    await user.tab();
    expect(details).toHaveFocus();
    await user.tab();
    expect(exe).toHaveFocus();
    await user.tab();
    expect(zip).toHaveFocus();
  });

  it("acrescenta o lançamento aos destaques preservando os três programas anteriores", () => {
    render(<FeaturedPrograms />);
    for (const name of ["Dama Termos", "Dama Gestor de RH", "Dama Gerador FCC", "Dama Biometria SIGO Fix"]) {
      expect(screen.getByRole("link", { name: `Conhecer ${name}` })).toBeInTheDocument();
    }
    expect(screen.getByText("LANÇAMENTO • VERSÃO 1.0.0")).toBeInTheDocument();
  });

  it("registra o lançamento em primeiro lugar nas novidades com a data de preparação", () => {
    expect(updates[0]).toMatchObject({ date: "2026-10-16", url: "/programas/dama-termos" });
    render(<SiteUpdatesPreview />);
    expect(screen.getByRole("heading", { name: "Dama Termos 1.0.0 disponível" })).toBeInTheDocument();
    expect(screen.getAllByRole("link").some((link) => link.getAttribute("href") === "/programas/dama-termos")).toBe(true);
  });

  it("apresenta a página, captura ampliável e links exatos nos dois blocos de download", () => {
    render(<DamaTermosPage />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Conheça o Dama Termos 1.0");
    const imageLink = screen.getByRole("link", { name: "Ampliar captura da interface do Dama Termos" });
    expect(within(imageLink).getByRole("img")).toHaveAttribute("width", "1443");
    expect(within(imageLink).getByRole("img")).toHaveAttribute("height", "1090");
    expect(screen.getByText(/captura fornecida registra uma versão de desenvolvimento/i)).toBeInTheDocument();
    for (const [label, url] of [["Baixar Dama Termos para Windows", EXE], ["Baixar instalador em ZIP", ZIP]]) {
      const links = screen.getAllByRole("link", { name: label });
      expect(links).toHaveLength(2);
      for (const link of links) {
        expect(link).toHaveAttribute("href", url);
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      }
    }
  });

  it("inclui o manual completo e distingue destinatários, suporte e limites da assinatura", () => {
    const { container } = render(<DamaTermosPage />);
    const manual = screen.getByRole("region", { name: "Manual rápido" });
    expect(manual.querySelectorAll("details")).toHaveLength(8);
    expect(manual.querySelector("details")).toHaveAttribute("open");
    expect(container).toHaveTextContent("Uma linha sem data não será considerada plantão realizado");
    expect(container).toHaveTextContent("plantao180@pc.ms.gov.br");
    expect(container).toHaveTextContent("depac@pc.ms.gov.br");
    expect(container).toHaveTextContent("São destinatários do termo, não canais de suporte");
    expect(container).toHaveTextContent("não envia e-mails automaticamente");
    expect(container).toHaveTextContent("não equivalem, por si só, a assinaturas digitais certificadas");
    expect(container).toHaveTextContent("Não constitui software oficial da Polícia Civil");
    expect(container).toHaveTextContent("Aproximadamente 19,14 MiB");
    expect(container).toHaveTextContent("conforme informação fornecida pelo desenvolvedor");
    expect(screen.getByRole("link", { name: contacts.support })).toHaveAttribute("href", `mailto:${contacts.support}`);
    expect(container.querySelector("form")).toBeNull();
  });

  it("integra canonical, compartilhamento e sitemap pelo helper existente", () => {
    expect(metadata.title).toBe("Dama Termos 1.0.0 para Windows — Dama Universe");
    expect(metadata.alternates?.canonical).toBe("https://damauniverse.com.br/programas/dama-termos");
    expect(metadata.openGraph).toMatchObject({ url: "https://damauniverse.com.br/programas/dama-termos" });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
    expect(sitemap().find((entry) => entry.url === "https://damauniverse.com.br/programas/dama-termos")).toMatchObject({
      lastModified: new Date("2026-10-16T00:00:00Z"),
      priority: 0.9,
    });
  });
});
