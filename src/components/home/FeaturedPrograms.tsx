import { featuredPrograms } from "@/data";
import { ProgramCard } from "@/components/programs";
import { SectionTitle } from "@/components/ui";

export function FeaturedPrograms() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-8">
        <SectionTitle
          eyebrow="Programas"
          title="Programas em destaque"
          description="Conheça os principais projetos desenvolvidos no Dama Universe, suas versões, funcionalidades, manuais e atualizações."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featuredPrograms.map((program) => (
            <ProgramCard key={program.slug} program={program} />
          ))}
        </div>
      </div>
    </section>
  );
}
