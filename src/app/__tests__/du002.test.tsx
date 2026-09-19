import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import ContatoPage from "@/app/contato/page";
import SobrePage from "@/app/sobre/page";
import { Footer } from "@/components/layout/Footer";
import { ProgramCard } from "@/components/programs/ProgramCard";
import { ClientsSection } from "@/components/programs/ClientsSection";
import { contacts, mailto } from "@/data/contacts";
import { programs } from "@/data/programs";
import { clients, type PublicClient } from "@/data/clients";
import { getRecentPosts, getReadingTime, formatDate, sortPostsByDate } from "@/lib/blog";
import { posts } from "@/data/posts";

describe("TSK-DU-002", () => {
  it("distribui aliases e contatos confirmados sem canal técnico", () => {
    const { container } = render(<><ContatoPage /><Footer /></>);
    for (const email of [contacts.general, contacts.support, contacts.commercial, contacts.courses, contacts.creator, contacts.professional]) {
      expect(container.querySelector(`a[href="mailto:${email}"]`)).toBeInTheDocument();
    }
    expect(container.querySelector(`a[href="${contacts.whatsapp}"]`)).toBeInTheDocument();
    expect(container.querySelector(`a[href="${contacts.linkedin}"]`)).toBeInTheDocument();
    expect(container.innerHTML).not.toMatch(/dmarc@|Canais oficiais em preparação/);
    expect(mailto(contacts.support, "Dúvida sobre versão")).toBe(`mailto:${contacts.support}?subject=D%C3%BAvida%20sobre%20vers%C3%A3o`);
  });
  it.each(programs)("preserva detalhes e download independente: $name", async (program) => {
    const user = userEvent.setup();
    const { container } = render(<ProgramCard program={program} />);
    const details = screen.getByRole("link", { name: `Conhecer ${program.name}` });
    expect(details).toHaveAttribute("href", program.detailsUrl);
    expect(details).not.toHaveAttribute("target");
    expect(container.querySelector("a a")).toBeNull();
    expect(screen.queryByText("Ver detalhes")).not.toBeInTheDocument();
    await user.tab();
    expect(details).toHaveFocus();
    if (program.downloadUrl) {
      const download = screen.getByRole("link", { name: program.downloadLabel ?? "Download" });
      expect(download).toHaveAttribute("href", program.downloadUrl);
      expect(download).toHaveAttribute("target", "_blank");
      expect(details.contains(download)).toBe(false);
      await user.tab();
      expect(download).toHaveFocus();
      let detailClicks = 0;
      details.addEventListener("click", (event) => { event.preventDefault(); detailClicks++; });
      download.addEventListener("click", (event) => event.preventDefault());
      await user.click(download);
      expect(detailClicks).toBe(0);
      await user.click(details);
      expect(detailClicks).toBe(1);
    } else expect(screen.getAllByRole("link")).toHaveLength(1);
  });
  it("omite clientes vazios, pendentes e incompletos, sem serializar condição", () => {
    expect(clients).toEqual([]);
    const item: PublicClient = { name: "Exemplo exclusivamente de teste", program: "Programa teste", description: "Texto fictício apenas do teste", publication: "pending" };
    const { container, rerender } = render(<ClientsSection />);
    expect(container).toBeEmptyDOMElement();
    rerender(<ClientsSection items={[item]} />);
    expect(container).toBeEmptyDOMElement();
    rerender(<ClientsSection items={[{...item, publication: "approved", name: ""}]} />);
    expect(container).toBeEmptyDOMElement();
    rerender(<ClientsSection items={[{...item, publication: "approved"}]} />);
    expect(screen.getByRole("heading", {name: "Clientes atendidos"})).toBeInTheDocument();
    expect(container.innerHTML).not.toContain("publication");
    expect(container.innerHTML).not.toContain("approved");
  });
  it("ordena artigos sem alterar datas e calcula leitura do texto", () => {
    const original = posts.map((p) => p.date);
    const sorted = sortPostsByDate(posts);
    expect(sorted.map((p) => p.date)).toEqual([...original].sort().reverse());
    expect(posts.map((p) => p.date)).toEqual(original);
    expect(getRecentPosts()).toEqual(sorted.slice(0,3));
    expect(formatDate("2026-06-25")).toBe("25 de junho de 2026");
    expect(getReadingTime(posts[0].slug)).toMatch(/^\d+ min de leitura$/);
    expect(getReadingTime("inexistente")).toBeUndefined();
  });
  it("apresenta criador primeiro, foto, Lattes e contato individual", () => {
    render(<SobrePage />);
    expect(screen.getByRole("heading", {level: 1})).toHaveTextContent("Marco Barbosa");
    expect(screen.getByRole("img", {name: "Marco Barbosa, criador do Dama Universe"})).toHaveAttribute("width", "640");
    expect(screen.getByRole("link", {name: "Currículo Lattes"})).toHaveAttribute("href", "https://lattes.cnpq.br/1970561249212557");
    expect(within(screen.getByRole("main")).getByRole("link", {name: contacts.creator})).toHaveAttribute("href", mailto(contacts.creator));
  });
  it("mantém separadores nos caminhos Windows do Cleaner", async () => {
    const { default: Cleaner } = await import("@/app/programas/dama-cleaner-sigo-desktop/page");
    const { container } = render(<Cleaner />);
    expect(container.textContent).toContain(String.raw`%APPDATA%\SIGO Desktop`);
    expect(container.textContent).toContain(String.raw`Documentos\Dama Cleaner SIGO`);
  });
  it("mantém API e dependências fora das alterações da tarefa", () => {
    const route = readFileSync("src/app/api/contact/route.ts", "utf8");
    expect(route).toContain("CONTACT_FORM_ENDPOINT");
    expect(route).not.toContain("comercial@");
    expect(route).not.toContain("suporte@");
  });
});
