import { GlowButton, MetallicCard, SectionTitle } from "@/components/ui";

export function SupportPreview() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <MetallicCard className="grid gap-8 border-electric/70 p-8 shadow-[0_0_35px_rgba(37,150,255,0.28)] md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <SectionTitle
            eyebrow="Apoie"
            title="Apoie o projeto"
            description="Contribua com sugestões, relatos de problemas e compartilhamento de páginas úteis. Propostas de parceria podem ser conversadas diretamente, sob consulta."
          />

          <GlowButton href="/apoie" className="w-fit">
            Conhecer formas de apoio
          </GlowButton>
        </MetallicCard>
      </div>
    </section>
  );
}
