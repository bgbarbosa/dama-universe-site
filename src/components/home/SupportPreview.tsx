import { GlowButton, MetallicCard, SectionTitle } from "@/components/ui";

export function SupportPreview() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <MetallicCard className="grid gap-8 border-electric/70 p-8 shadow-[0_0_35px_rgba(37,150,255,0.28)] md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <SectionTitle
            eyebrow="Apoie"
            title="Apoie o projeto"
            description="O Dama Universe é um projeto em evolução. Futuramente, este espaço poderá receber apoiadores, parceiros e patrocinadores interessados em contribuir com o desenvolvimento dos programas, manutenção do site, criação de conteúdos e evolução das ferramentas."
          />

          <GlowButton href="/apoie" className="w-fit">
            Conhecer formas de apoio
          </GlowButton>
        </MetallicCard>
      </div>
    </section>
  );
}
