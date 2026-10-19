import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import HomePage, { metadata } from "@/app/page";
import { FeaturedPrograms } from "@/components/home/FeaturedPrograms";
import { ConsentProvider } from "@/components/privacy/ConsentProvider";
import { footerNavigation, primaryNavigation } from "@/data/navigation";
import { damaFccTutorials } from "@/data/tutorials";
import { updates } from "@/data/updates";

function renderHome() {
  return render(<ConsentProvider><HomePage /></ConsentProvider>);
}

describe("DU-TSK-HOME-001", () => {
  beforeEach(() => localStorage.clear());

  it("explica a autoria em uma hero sem controles falsos e com dois CTAs reais", () => {
    renderHome();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Dama Universe");
    const hero = screen.getByRole("region", { name: "Dama Universe" });
    expect(hero).toHaveTextContent("projeto, marca e ecossistema autoral");
    expect(within(hero).getAllByRole("link")).toHaveLength(2);
    expect(within(hero).getByRole("link", { name: /Explorar programas/ })).toHaveAttribute("href", "/programas");
    expect(within(hero).getByRole("link", { name: "Conhecer o projeto" })).toHaveAttribute("href", "/sobre");
    const panel = screen.getByRole("complementary", { name: "Ecossistema Dama" });
    expect(panel.querySelector("img")).toBeNull();
    expect(within(panel).queryByRole("button")).toBeNull();
    expect(within(panel).queryByRole("link")).toBeNull();
  });

  it("expande por Enter/Espaço e mantém uma única região aberta e a ação principal", async () => {
    const user = userEvent.setup();
    render(<FeaturedPrograms />);
    const first = screen.getByRole("button", { name: "Mostrar detalhes de Dama Termos" });
    const second = screen.getByRole("button", { name: "Mostrar detalhes de Dama Biometria SIGO Fix" });
    first.focus();
    await user.keyboard("{Enter}");
    expect(first).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById(first.getAttribute("aria-controls")!)).toBeVisible();
    expect(screen.getByRole("link", { name: "Conhecer Dama Termos" })).toBeVisible();
    expect(first).toHaveFocus();
    second.focus();
    await user.keyboard(" ");
    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("region").filter(region => region.id.startsWith("home-details-"))).toHaveLength(1);
    await user.keyboard("{Enter}");
    expect(second).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveFocus();
    expect(screen.getByRole("link", { name: "Conhecer Dama Biometria SIGO Fix" })).toBeVisible();
  });

  it("separa o download da navegação e dos controles internos", () => {
    const { container } = render(<FeaturedPrograms />);
    expect(screen.getAllByTestId(/^home-program-/)).toHaveLength(3);
    expect(container.querySelector("a a, a button, button a")).toBeNull();
    for (const card of screen.getAllByTestId(/^home-program-/)) {
      expect(within(card).getAllByRole("link")).toHaveLength(2);
      const download = within(card).getByRole("link", { name: /^Baixar / });
      expect(download).toHaveAttribute("target", "_blank");
      expect(download).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("mostra três novidades com datas originais e conserva as demais fontes", () => {
    renderHome();
    const news = screen.getByRole("region", { name: "Evolução e novidades" });
    expect(within(news).getAllByRole("listitem")).toHaveLength(3);
    expect([...news.querySelectorAll("time")].map(time => time.dateTime)).toEqual(updates.slice(0, 3).map(item => item.date));
    expect(news.querySelector('[role="region"]')).toBeNull();
    expect(updates.length).toBeGreaterThan(3);
  });

  it("reúne conteúdos e mantém o vídeo bloqueado até consentimento", async () => {
    const user = userEvent.setup();
    renderHome();
    const contents = screen.getByRole("region", { name: "Conteúdos e primeiros passos" });
    expect(within(contents).getAllByRole("listitem")).toHaveLength(3);
    expect(contents.querySelector("iframe")).toBeNull();
    expect(damaFccTutorials).toHaveLength(3);
    await user.click(within(contents).getByRole("button", { name: "Permitir vídeos do YouTube" }));
    const iframe = contents.querySelector("iframe");
    expect(iframe).toHaveAttribute("src", `https://www.youtube-nocookie.com/embed/${damaFccTutorials[0].videoId}`);
    expect(iframe?.src).not.toContain("autoplay=1");
  });

  it("preserva a rota de IA e os destinos complementares no rodapé", () => {
    expect(primaryNavigation).toHaveLength(8);
    expect(primaryNavigation.find(item => item.href === "/referencias")?.label).toBe("Referências");
    expect(primaryNavigation.find(item => item.href === "/apoie")?.label).toBe("Participe");
    expect(primaryNavigation.find(item => item.href === "/gpts")?.label).toBe("IA aplicada");
    for (const href of ["/referencias", "/apoie", "/termos-de-uso", "/politica-de-privacidade", "/politica-de-cookies", "/politica-de-comentarios"]) {
      expect(footerNavigation.some(item => item.href === href)).toBe(true);
    }
  });

  it("mantém canonical e compartilhamento coerentes sem alterar o helper global", () => {
    expect(metadata.title).toBe("Dama Universe — Programas, IA aplicada e automação");
    expect(metadata.alternates?.canonical).toBe("https://damauniverse.com.br/");
    expect(metadata.openGraph).toMatchObject({ url: "https://damauniverse.com.br/" });
  });
});
