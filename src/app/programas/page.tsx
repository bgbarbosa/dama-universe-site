import { ProgramCard } from "@/components/programs";
import { MetallicCard, SectionHeader } from "@/components/ui";
import { programs } from "@/data";

export default function ProgramasPage() {
  return (
    <main className="bg-dama-radial">
      <section className="page-section-tight">
        <div className="container-site">
          <SectionHeader
            eyebrow="Projetos Dama"
            title="Programas"
            description="Conheça os programas, ferramentas e sistemas do ecossistema Dama Universe. Cada projeto possui finalidade própria, status, versão e página de detalhes quando disponível."
            align="center"
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {programs.map((program) => (
              <ProgramCard key={program.slug} {...program} />
            ))}
          </div>

          <MetallicCard className="mt-10" variant="notice">
            <p className="text-sm leading-7 text-muted md:text-base md:leading-8">
              Os programas do Dama Universe são ferramentas autorais em evolução.
              Alguns estão disponíveis para uso, outros estão em ajustes finais,
              desenvolvimento ou planejamento técnico. Quando não houver download
              público, a página servirá como registro de finalidade, escopo e
              evolução do projeto.
            </p>
          </MetallicCard>
        </div>
      </section>
    </main>
  );
}
