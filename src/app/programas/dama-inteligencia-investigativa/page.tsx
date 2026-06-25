import { createPageMetadata } from "@/lib/seo";
import { GlowButton, MetallicCard, PageHeader } from "@/components/ui";

const modules = [
  "Dama Indexador Investigativo",
  "Dama Base Investigativa",
  "Dama Núcleo de Inteligência",
  "Dama Memória Investigativa",
  "Dama Story Investigativo",
  "Dama OSINT Investigativo",
];

const pillars = [
  {
    title: "Dados dispersos em inteligência organizada",
    description:
      "A proposta é transformar documentos, registros, extrações, planilhas e informações fragmentadas em dados pesquisáveis, estruturados e úteis para análise investigativa.",
  },
  {
    title: "Núcleo autoral baseado em MCP",
    description:
      "O coração do projeto é uma arquitetura própria para orquestrar ferramentas, agentes especializados, bases de dados, memória validada e consultas inteligentes.",
  },
  {
    title: "Memória investigativa validada",
    description:
      "O sistema foi pensado para registrar achados confirmados, hipóteses descartadas, vínculos relevantes e padrões que possam auxiliar novas análises no futuro.",
  },
  {
    title: "Visualização narrativa",
    description:
      "Em fases futuras, dados validados poderão alimentar linhas do tempo, grafos, mapas, painéis e representações visuais voltadas a briefing, estudo e apresentação interna.",
  },
];

const safeguards = [
  "Não substitui o trabalho humano, a autoridade policial, a análise jurídica, a perícia ou sistemas oficiais.",
  "Toda hipótese, vínculo ou achado deverá manter fonte, rastreabilidade e revisão humana.",
  "Os detalhes técnicos permanecem reservados nesta fase para proteger a concepção do projeto.",
  "Novas informações serão reveladas gradualmente, conforme os módulos se tornarem funcionais.",
];

export const metadata = createPageMetadata({
  title: "Dama Inteligência Investigativa — Dama Universe",
  description:
    "Projeto estratégico do ecossistema Dama, em arquitetura reservada, voltado à organização, correlação e análise inteligente de dados investigativos.",
  path: "/programas/dama-inteligencia-investigativa",
});

export default function DamaInteligenciaInvestigativaPage() {
  return (
    <main>
      <PageHeader
        title="Dama Inteligência Investigativa"
        subtitle="O projeto mais ambicioso do ecossistema Dama"
        description="Uma arquitetura autoral em desenvolvimento reservado, planejada para transformar dados investigativos dispersos em conhecimento estruturado, rastreável e útil ao trabalho policial."
      />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <MetallicCard className="border-electric/35 bg-electric/5">
            <p className="eyebrow mb-4 text-electricLight">Em arquitetura reservada</p>

            <h2 className="title-chrome text-3xl font-black sm:text-4xl">
              Um projeto planejado em silêncio, módulo por módulo.
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-muted">
              <p>
                O Dama Inteligência Investigativa é o projeto mais ambicioso do
                ecossistema Dama. Planejado ao longo de anos, ele nasce da ideia
                de transformar dados investigativos dispersos em informação
                organizada, pesquisável, correlacionável e útil ao trabalho
                policial.
              </p>

              <p>
                A construção foi dividida em módulos. Na teoria, parte da
                arquitetura já se encontra desenhada; algumas abordagens foram
                testadas na prática e apresentaram resultados promissores.
              </p>

              <p>
                No centro da proposta está um núcleo autoral baseado em MCP,
                concebido para integrar ferramentas, agentes especializados,
                bases de dados, memória investigativa e consultas inteligentes de
                forma controlada, rastreável e segura.
              </p>
            </div>
          </MetallicCard>

          <MetallicCard>
            <p className="eyebrow mb-4 text-goldSoft">Status do projeto</p>

            <div className="space-y-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-mutedSoft">
                  Fase
                </p>
                <p className="mt-2 text-xl font-black text-text">
                  Arquitetura reservada
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-mutedSoft">
                  Natureza
                </p>
                <p className="mt-2 text-xl font-black text-text">
                  Ecossistema investigativo modular
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-mutedSoft">
                  Núcleo
                </p>
                <p className="mt-2 text-xl font-black text-text">
                  MCP autoral
                </p>
              </div>

              <div className="rounded-2xl border border-gold/30 bg-gold/10 p-4 text-sm leading-7 text-muted">
                Se o projeto sair do papel em sua forma plena, poderá representar
                uma nova camada de apoio à análise investigativa dentro das
                delegacias.
              </div>
            </div>
          </MetallicCard>
        </div>

        <div className="mb-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => (
            <MetallicCard key={pillar.title} className="h-full">
              <h3 className="text-xl font-black leading-tight text-text">
                {pillar.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted">
                {pillar.description}
              </p>
            </MetallicCard>
          ))}
        </div>

        <div className="mb-14 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <MetallicCard>
            <p className="eyebrow mb-4">Módulos previstos</p>

            <div className="flex flex-wrap gap-3">
              {modules.map((module) => (
                <span
                  key={module}
                  className="rounded-full border border-electric/25 bg-electric/10 px-4 py-2 text-sm font-semibold text-electricLight"
                >
                  {module}
                </span>
              ))}
            </div>
          </MetallicCard>

          <MetallicCard className="border-borderSoft bg-white/[0.03]">
            <p className="eyebrow mb-4 text-mutedSoft">Nota de confidencialidade</p>

            <p className="text-sm leading-7 text-muted">
              Por sua complexidade e pelo caráter estratégico do projeto, os
              detalhes técnicos permanecerão reservados nesta fase. A página
              apresenta apenas uma visão conceitual, sem expor planejamento
              interno, lógica de implementação, arquitetura sensível ou
              especificações que possam comprometer a originalidade do sistema.
            </p>
          </MetallicCard>
        </div>

        <MetallicCard className="mb-14 border-electric/35 bg-electric/5">
          <p className="eyebrow mb-4 text-electricLight">Princípios de uso</p>

          <div className="grid gap-4 md:grid-cols-2">
            {safeguards.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-borderSoft bg-background/40 p-4 text-sm leading-7 text-muted"
              >
                {item}
              </div>
            ))}
          </div>
        </MetallicCard>

        <MetallicCard className="text-center">
          <p className="eyebrow mb-4 text-goldSoft">Novas informações em breve</p>

          <h2 className="title-chrome mx-auto max-w-4xl text-3xl font-black sm:text-4xl">
            O projeto será revelado conforme seus módulos se tornarem funcionais.
          </h2>

          <p className="body-text mx-auto mt-5 max-w-3xl">
            O Dama Inteligência Investigativa ainda não possui versão pública,
            download ou demonstração aberta. As próximas atualizações serão
            publicadas no Dama Universe quando houver avanço funcional seguro
            para divulgação.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <GlowButton href="/programas" variant="secondary">
              Ver outros programas
            </GlowButton>
            <GlowButton href="/contato">Acompanhar evolução</GlowButton>
          </div>
        </MetallicCard>
      </section>
    </main>
  );
}
