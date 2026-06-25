import { GlowButton, MetallicCard, SectionTitle } from "@/components/ui";

export function ReferencesPreview() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <MetallicCard className="grid gap-8 p-8 md:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <SectionTitle
            eyebrow="Mestres & Referências"
            title="Conhecimento também se reconhece"
            description="Uma área dedicada ao reconhecimento de professores, autores, cursos, ferramentas e fontes de estudo que contribuíram para a construção deste caminho em tecnologia, inteligência artificial, análise de dados e desenvolvimento."
          />

          <GlowButton href="/referencias" variant="secondary" className="w-fit">
            Ver referências
          </GlowButton>
        </MetallicCard>
      </div>
    </section>
  );
}
