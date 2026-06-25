import { createPageMetadata } from "@/lib/seo";
import { GlowButton, MetallicCard, PageHeader, SectionTitle } from "@/components/ui";

const SITE_PROFISSIONAL_URL = "https://pericia-digital-marco-site.vercel.app/";
const LATTES_URL = "https://lattes.cnpq.br/1970561249212557";

const areas = [
  "Programas e ferramentas digitais",
  "GPTs personalizados",
  "Inteligência artificial",
  "Python e automação",
  "Análise de dados",
  "Organização documental",
  "Computação forense",
  "Produtividade digital",
  "Referências de estudo",
];

export const metadata = createPageMetadata({
  title: "Sobre — Dama Universe",
  description:
    "Conheça a proposta do Dama Universe, um espaço para reunir programas, ferramentas digitais, GPTs personalizados, conteúdos, referências e registros de desenvolvimento.",
  path: "/sobre",
});

export default function SobrePage() {
  return (
    <main>
      <PageHeader
        title="Sobre o Dama Universe"
        subtitle="Projeto, documentação e evolução"
        description="Um espaço para reunir, documentar e compartilhar projetos digitais desenvolvidos com foco em organização, tecnologia, inteligência artificial, análise de dados e automação."
      />

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <MetallicCard className="space-y-6">
            <p className="leading-8 text-muted">
              O Dama Universe nasceu com o objetivo de reunir, documentar e
              compartilhar projetos digitais desenvolvidos com foco em
              organização, tecnologia, inteligência artificial, análise de dados
              e automação.
            </p>

            <p className="leading-8 text-muted">
              O espaço funciona como uma central de programas, GPTs
              personalizados, conteúdos técnicos, referências, downloads e
              registros de evolução, permitindo acompanhar versões, melhorias,
              ideias futuras e materiais de apoio.
            </p>
          </MetallicCard>

          <MetallicCard variant="notice">
            <p className="eyebrow mb-4 text-goldSoft">Diretriz</p>

            <h2 className="text-2xl font-black text-text">
              Segurança e responsabilidade
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              O site foi planejado para divulgar projetos e conteúdos técnicos
              sem publicar dados sensíveis, documentos restritos, códigos
              privados, senhas, tokens ou informações pessoais de terceiros.
            </p>
          </MetallicCard>
        </div>

        <div className="mt-14">
          <SectionTitle
            title="Áreas abordadas"
            description="Temas que orientam a construção dos projetos, programas, GPTs e conteúdos publicados."
          />

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <MetallicCard key={area} className="p-5">
                <p className="font-medium text-chromeLight">{area}</p>
              </MetallicCard>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <MetallicCard variant="featured" className="overflow-hidden p-0">
            <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:p-10">
              <div className="rounded-3xl border border-border bg-background/40 p-6">
                <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-electric/50 bg-surface text-4xl font-black text-text shadow-electric">
                  M
                </div>

                <h2 className="mt-6 text-2xl font-black text-text">
                  Marco Aurélio Pereira Barbosa
                </h2>

                <p className="mt-2 text-sm font-semibold text-electricLight">
                  Criador do Dama Universe
                </p>

                <p className="mt-5 text-sm leading-7 text-muted">
                  Atuação voltada à tecnologia, inteligência artificial, análise
                  de dados, automação documental, investigação digital,
                  computação forense e organização técnica de informações.
                </p>
              </div>

              <div>
                <p className="eyebrow mb-5 text-goldSoft">
                  Quem está por trás do Dama Universe
                </p>

                <h2 className="title-chrome text-3xl font-black sm:text-4xl">
                  Projeto autoral, técnico e em evolução
                </h2>

                <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
                  O Dama Universe é um projeto autoral desenvolvido por Marco
                  Aurélio Pereira Barbosa, com foco em inteligência artificial,
                  análise de dados, automação documental, organização de
                  informações e desenvolvimento de ferramentas digitais.
                </p>

                <p className="mt-5 text-base leading-8 text-muted sm:text-lg">
                  Além dos programas e conteúdos publicados no Dama Universe,
                  há também um site profissional voltado à apresentação de
                  trajetória, perícia digital, computação forense e evidências
                  digitais.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <GlowButton
                    href={SITE_PROFISSIONAL_URL}
                    external
                    variant="primary"
                  >
                    Acessar site profissional
                  </GlowButton>

                  <GlowButton href={LATTES_URL} external variant="secondary">
                    Currículo Lattes
                  </GlowButton>
                </div>
              </div>
            </div>
          </MetallicCard>
        </div>
      </section>
    </main>
  );
}