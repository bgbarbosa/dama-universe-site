import { createPageMetadata } from "@/lib/seo";

import { ReferenceCard } from "@/components/references";
import { MetallicCard, PageHeader } from "@/components/ui";
import { references, type ReferenceType } from "@/data";

const categories: ReferenceType[] = [
  "Pessoa",
  "Artigo",
  "Ferramenta",
  "Instituição",
  "Curso",
  "Site",
];

const categoryDescriptions: Record<ReferenceType, string> = {
  Pessoa:
    "Profissionais, professores, autores e especialistas acompanhados como fonte de estudo técnico.",
  Artigo:
    "Leituras técnicas, publicações autorais e materiais específicos para aprofundamento.",
  Ferramenta:
    "Ferramentas úteis para estudo, investigação, perícia digital, automação e análise.",
  Instituição:
    "Associações, entidades e espaços institucionais ligados aos temas do Dama Universe.",
  Curso:
    "Plataformas e formações que ajudam no desenvolvimento técnico e profissional.",
  Site: "Sites de consulta, documentação, estudo ou acompanhamento técnico.",
};

const referencesByType = categories
  .map((category) => ({
    category,
    items: references.filter((reference) => reference.type === category),
  }))
  .filter((group) => group.items.length > 0);

export const metadata = createPageMetadata({
  title: "Mestres e Referências — Dama Universe",
  description:
    "Pessoas, instituições, cursos, ferramentas, artigos e sites usados como fontes de estudo, aprendizado e inspiração técnica no Dama Universe.",
  path: "/referencias",
});

export default function ReferenciasPage() {
  return (
    <main>
      <PageHeader
        title="Mestres & Referências"
        subtitle="Fontes de estudo, inspiração e gratidão"
        description="Pessoas, instituições, cursos, ferramentas, artigos e sites que ajudam a formar a base técnica, profissional e intelectual dos projetos do Dama Universe."
      />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <MetallicCard className="mb-10 border-2 border-electric bg-electric/5 p-7 shadow-[0_0_60px_rgba(37,150,255,0.45)] md:p-10">
          <div className="mx-auto max-w-5xl text-center">
            <p className="eyebrow mb-4 text-electricLight">
              Homenagem
            </p>

            <h2 className="title-chrome text-3xl font-black sm:text-4xl lg:text-5xl">
              Aos mestres que ajudaram a formar este caminho
            </h2>

            <p className="mt-6 text-base leading-8 text-muted md:text-lg md:leading-9">
              Esta página é também uma forma simples e sincera de reconhecimento
              aos professores, mestres e referências que contribuíram para minha
              formação técnica e profissional. Cada nome aqui representa
              conhecimento compartilhado, ensinamento, paciência, humildade e
              disponibilidade para orientar, esclarecer dúvidas e apoiar o
              crescimento de quem busca aprender com seriedade.
            </p>

            <p className="mt-5 text-base leading-8 text-muted md:text-lg md:leading-9">
              O Dama Universe carrega um pouco de cada aprendizado recebido ao
              longo dessa jornada. Por isso, reunir essas referências é mais do
              que organizar links: é registrar gratidão, respeito e admiração
              por quem ensina, inspira e contribui para que novas ideias saiam
              do papel.
            </p>
          </div>
        </MetallicCard>

        <div className="mb-12 grid items-start gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <MetallicCard className="border-electric/70 p-5 shadow-[0_0_35px_rgba(37,150,255,0.28)]">
            <h2 className="text-xl font-semibold text-chromeLight">
              Categorias de referência
            </h2>

            <div className="mt-5 flex flex-wrap gap-2">
              {referencesByType.map(({ category, items }) => (
                <a
                  key={category}
                  href={`#${category.toLowerCase()}`}
                  className="rounded-full border border-electric/25 bg-electric/10 px-3 py-1 text-xs font-semibold text-electricLight transition hover:border-electricLight hover:bg-electric/15"
                >
                  {category} ({items.length})
                </a>
              ))}
            </div>
          </MetallicCard>

          <MetallicCard className="border-electric/70 bg-electric/5 p-5 shadow-[0_0_35px_rgba(37,150,255,0.28)]">
            <p className="eyebrow mb-3 text-electricLight">Informação</p>

            <p className="text-sm leading-6 text-muted">
              As referências listadas são fontes de estudo, aprendizado,
              consulta e inspiração técnica. A inclusão não indica vínculo,
              parceria, patrocínio, autorização de uso de imagem ou endosso
              formal, salvo quando informado.
            </p>
          </MetallicCard>
        </div>

        <div className="space-y-16">
          {referencesByType.map(({ category, items }) => (
            <section
              key={category}
              id={category.toLowerCase()}
              className="scroll-mt-28"
            >
              <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <p className="eyebrow mb-3">{category}</p>

                  <h2 className="title-chrome text-3xl font-black sm:text-4xl">
                    {category === "Pessoa" ? "Pessoas" : category}
                  </h2>

                  <p className="body-text mt-3 max-w-3xl">
                    {categoryDescriptions[category]}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {items.map((reference) => (
                  <ReferenceCard
                    key={`${reference.type}-${reference.name}`}
                    reference={reference}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}