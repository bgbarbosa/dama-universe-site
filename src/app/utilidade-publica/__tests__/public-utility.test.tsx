import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import PublicUtilityPage, { metadata as listingMetadata } from "@/app/utilidade-publica/page";
import CabsPage, { metadata as cabsMetadata } from "@/app/utilidade-publica/cabs/page";
import { PublicUtilityPreview } from "@/components/home/PublicUtilityPreview";
import { cabs, publicServices, publicUtilityDisclaimer, publicUtilityIntroduction } from "@/data/publicServices";
import { footerNavigation, primaryNavigation } from "@/data/navigation";
import { programs } from "@/data/programs";

describe("Utilidade Pública / CABS", () => {
  it("mantém um único serviço real, separado do catálogo de programas", () => {
    expect(publicServices.map(service => service.slug)).toEqual(["cabs"]);
    expect(programs.some(program => program.slug === "cabs")).toBe(false);
    for (const navigation of [primaryNavigation, footerNavigation]) {
      expect(navigation.filter(item => item.href === "/utilidade-publica")).toEqual([{ href: "/utilidade-publica", label: "Utilidade Pública" }]);
    }
  });

  it.each([PublicUtilityPreview, PublicUtilityPage])("oferece o mesmo card acessível na Home e na listagem", Component => {
    const { container } = render(<Component />);
    expect(screen.getByText(publicUtilityIntroduction)).toBeVisible();
    expect(screen.getByRole("link", { name: "Conhecer o CABS" })).toHaveAttribute("href", "/utilidade-publica/cabs");
    const image = screen.getByRole("img", { name: cabs.image.alt });
    expect(image).toHaveAttribute("width", "1536");
    expect(image).toHaveAttribute("height", "1024");
    expect(screen.getByRole("article")).toHaveTextContent("servidores da segurança pública de Mato Grosso do Sul");
    const card = screen.getByRole("article");
    const link = within(card).getByRole("link", { name: "Conhecer o CABS" });
    expect(within(card).getAllByRole("link")).toHaveLength(1);
    expect(within(card).queryByRole("button")).toBeNull();
    for (const element of [image, within(card).getByRole("heading", { name: "CABS" }), within(card).getByText(cabs.summary), within(card).getByText("Conhecer o CABS")]) {
      expect(element.closest("a")).toBe(link);
    }
    expect(container.querySelector("a a, a button, button a, form")).toBeNull();
  });

  it.each([PublicUtilityPreview, PublicUtilityPage])("oferece uma única parada por card e ativação nativa por Enter", async Component => {
    const user = userEvent.setup();
    render(<Component />);
    const card = screen.getByRole("article");
    const link = within(card).getByRole("link", { name: "Conhecer o CABS" });
    let activated = 0;
    link.addEventListener("click", event => { event.preventDefault(); activated++; });
    if (Component === PublicUtilityPreview) await user.tab();
    await user.tab();
    expect(link).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(activated).toBe(1);
    await user.tab();
    expect(card.contains(document.activeElement)).toBe(false);
    await user.tab({ shift: true });
    expect(link).toHaveFocus();
  });

  it("apresenta público, serviços e limites com atribuição independente", () => {
    const { container } = render(<CabsPage />);
    expect(screen.getByText(publicUtilityDisclaimer)).toBeVisible();
    expect(screen.getByText("O CABS é uma unidade da Sejusp/MS dedicada à saúde mental, ao bem-estar e ao apoio biopsicossocial dos servidores da segurança pública de Mato Grosso do Sul. Esta página apresenta uma síntese das informações publicadas pela Sejusp/MS e indica os canais oficiais para contato direto com o CABS.")).toBeVisible();
    expect(container).not.toHaveTextContent("Reunimos aqui");
    const audience = screen.getByRole("region", { name: "Quem pode ser atendido" });
    expect(within(audience).getAllByRole("listitem")).toHaveLength(4);
    expect(audience).toHaveTextContent("Polícia Científica");
    expect(audience).toHaveTextContent("Agentes socioeducadores");
    expect(within(screen.getByRole("region", { name: "Serviços divulgados" })).getAllByRole("listitem")).toHaveLength(4);
    expect(screen.getByRole("region", { name: "Carreta da Saúde" })).toHaveTextContent("não há garantia de atendimento imediato ou entrega de equipamentos");
    expect(screen.getByRole("region", { name: "Contatos e localização" })).toHaveTextContent("horários antes do deslocamento");
    expect(container).not.toHaveTextContent("7h30");
    expect(container.querySelector("form, iframe")).toBeNull();
    expect(screen.getByText(cabs.image.caption)).toBeVisible();
    expect(container.querySelector("time")).toHaveAttribute("dateTime", "2026-10-21");
  });

  it("mantém destinos oficiais exatos, sem mensagem automática ou intermediador", () => {
    render(<CabsPage />);
    for (const [name, href] of [
      ["Consultar página oficial", cabs.sourceUrl],
      ["Ligar para o CABS", "tel:+5567999470022"],
      ["WhatsApp do CABS", "https://wa.me/5567999470022"],
      ["Enviar e-mail ao CABS", "mailto:cabs@sejusp.ms.gov.br"],
    ]) {
      const link = screen.getByRole("link", { name });
      expect(link).toHaveAttribute("href", href);
      if (href.startsWith("https:")) {
        expect(link).toHaveAttribute("target", "_blank");
        expect(link).toHaveAttribute("rel", "noopener noreferrer");
      }
    }
    expect(screen.getByText(cabs.address)).toBeVisible();
    expect(screen.getByText(`Telefone / WhatsApp: ${cabs.phone}`)).toBeVisible();
  });

  it.each([[listingMetadata, "/utilidade-publica"], [cabsMetadata, "/utilidade-publica/cabs"]] as const)("identifica a divulgação independente nos metadados e mantém canonical", (metadata, path) => {
    expect(metadata.description).toContain("Divulgação independente na Dama Universe");
    expect(metadata.alternates?.canonical).toBe(`https://damauniverse.com.br${path}`);
    expect(metadata.openGraph).toMatchObject({ url: `https://damauniverse.com.br${path}` });
    expect(metadata.twitter).toMatchObject({ card: "summary_large_image" });
  });
});
