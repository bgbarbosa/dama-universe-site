import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import GptsPage from "@/app/gpts/page";
import BlogPage from "@/app/blog/page";
import SobrePage from "@/app/sobre/page";
import { professionalEditorial } from "@/data/professionalEditorial";
import { customGpts } from "@/data/gpts";

describe("integração editorial com o site de Marco Barbosa", () => {
  it("oferece âncora estável e cuidados visíveis antes do acesso externo ao GPT", () => {
    render(<GptsPage />);
    const row = document.getElementById("especialista-em-escrita-e-revisao")!;
    expect(row).toBeVisible();
    expect(row).toHaveTextContent(customGpts.find(gpt => gpt.slug === row.id)!.shortDescription);
    expect(within(row).getByText(/Revisão humana necessária/)).toBeVisible();
    expect(within(row).getByText(/O acesso depende das condições e dos limites do ChatGPT/)).toBeVisible();
    expect(within(row).getByRole("link", { name: "Acessar Especialista em Escrita e Revisão" })).toHaveAttribute("target", "_blank");
  });

  it("distingue capacitação sob consulta de formação complementar e preserva cursos", () => {
    render(<GptsPage />);
    expect(screen.getByRole("link", { name: "Conhecer capacitações" })).toHaveAttribute("href", professionalEditorial.training);
    const formation = screen.getByRole("link", { name: "Conhecer a formação e os exemplos" });
    expect(formation).toHaveAttribute("href", professionalEditorial.visualFormation);
    expect(formation).toHaveTextContent("não é um curso ministrado por Marco");
    expect(formation).toHaveTextContent("Não há identificação infalível");
    expect(screen.getByRole("link", { name: "cursos@damauniverse.com.br" })).toHaveAttribute("href", "mailto:cursos@damauniverse.com.br");
    expect(screen.getAllByTestId(/^ai-tool-/)).toHaveLength(customGpts.length);
  });

  it("mantém quatro artigos externos separados dos oito conteúdos internos", () => {
    const { container } = render(<BlogPage />);
    expect(screen.getAllByTestId(/^archive-/)).toHaveLength(8);
    const related = screen.getByRole("list", { name: "Artigos de Marco Barbosa no site profissional" });
    expect(within(related).getAllByRole("link")).toHaveLength(4);
    for (const article of professionalEditorial.articles) {
      expect(within(related).getByRole("link", { name: article.title })).toHaveAttribute("href", article.href);
    }
    const collection = screen.getByRole("link", { name: "Explorar a coleção" });
    expect(collection).toHaveAttribute("href", professionalEditorial.practice);
    expect(collection).toHaveTextContent("não representa casos atendidos");
    expect(container.querySelector("a a, a button")).toBeNull();
    for (const link of [collection, ...within(related).getAllByRole("link")]) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("apresenta autoria breve e acessos ao site, trajetória e cartão sem mudar fatos curriculares", () => {
    render(<SobrePage />);
    for (const [name, href] of [["Conhecer Marco Barbosa", professionalEditorial.home], ["Formação e trajetória", professionalEditorial.trajectory], ["Cartão profissional", professionalEditorial.card]]) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    }
    expect(screen.getByText(/O site profissional de Marco Barbosa apresenta sua atuação em Inteligência Artificial/)).toBeVisible();
    expect(screen.getByText(/A autoria pessoal não representa endosso/)).toBeVisible();
  });
});
