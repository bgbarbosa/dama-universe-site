import { MetallicCard } from "@/components/ui";

const items = [
  {
    title: "Programas",
    description:
      "Projetos desenvolvidos no ecossistema Dama, com finalidade, status, versões e documentação."
  },
  {
    title: "Downloads",
    description:
      "Arquivos públicos disponíveis, manuais, changelogs e orientações de uso responsável."
  },
  {
    title: "Conteúdos",
    description:
      "Registros sobre tecnologia, inteligência artificial, análise de dados e organização documental."
  },
  {
    title: "Referências",
    description:
      "Espaço para reunir fontes de estudo, autores, cursos, ferramentas e inspirações técnicas."
  }
];

export function WhatYouFind() {
  return (
    <section className="page-section-tight">
      <div className="container-site">
        <div className="mb-10 max-w-3xl">
          <p className="eyebrow mb-4">Guia rápido</p>
          <h2 className="title-chrome text-3xl font-black sm:text-4xl">
            O que você encontra aqui
          </h2>
          <p className="body-text mt-4">
            O Dama Universe foi organizado para facilitar o acesso aos projetos,
            versões, materiais de apoio e conteúdos técnicos em um só lugar.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <MetallicCard key={item.title} variant="default" className="h-full">
              <h3 className="text-lg font-bold text-text">{item.title}</h3>
              <p className="body-text-sm mt-3">{item.description}</p>
            </MetallicCard>
          ))}
        </div>
      </div>
    </section>
  );
}