import Image from "next/image";

import { GlowButton, MetallicCard, PageHeader, SectionTitle } from "@/components/ui";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Dama Gestor de RH | Gestão Operacional de Recursos Humanos",
  description:
    "Conheça o Dama Gestor de RH, solução para organização de trabalhadores, contratos, alocações, ocorrências, afastamentos, substituições e acompanhamento operacional. Projetos sob consulta.",
  path: "/programas/dama-gestor-rh",
  image: "/images/og/dama-gestor-rh-og.png",
  imageAlt: "Dama Gestor de RH — Gestão operacional de pessoas, vínculos e ocorrências",
});

const structureItems = [
  "Contratante",
  "Contrato",
  "Local ou unidade",
  "Função ou posto",
  "Trabalhador",
];

const solutionImages = [
  {
    src: "/images/programs/dama-gestor-rh/estrutura-operacional.jpg",
    alt: "Representação conceitual da estrutura operacional conectando trabalhadores, contratos, funções e unidades",
    title: "Estrutura operacional conectada",
    description:
      "Organização visual dos vínculos entre pessoas, contratos, unidades e responsabilidades.",
  },
  {
    src: "/images/programs/dama-gestor-rh/ocorrencias-coberturas.jpg",
    alt: "Representação conceitual do acompanhamento de ocorrências, ausências e coberturas",
    title: "Ocorrências e coberturas",
    description:
      "Acompanhamento das situações registradas e das providências definidas pela operação.",
  },
  {
    src: "/images/programs/dama-gestor-rh/painel-rastreabilidade.jpg",
    alt: "Representação conceitual de painel operacional, alertas, documentos e histórico",
    title: "Painel e rastreabilidade",
    description:
      "Uma visão consolidada de registros, alertas, documentos, pendências e histórico.",
  },
];

const features = [
  {
    title: "Trabalhadores",
    description:
      "Cadastro e consulta de informações individuais, vínculos, situação, contrato, função e registros relacionados.",
  },
  {
    title: "Contratantes e contratos",
    description:
      "Organização das entidades atendidas, contratos, locais ou unidades de execução e trabalhadores relacionados.",
  },
  {
    title: "Funções, postos e alocações",
    description:
      "Associação entre trabalhador, contratante, contrato, local de atuação e função exercida na operação.",
  },
  {
    title: "Ocorrências e documentos",
    description:
      "Registro de faltas, atestados, afastamentos, férias programadas e documentos que precisem de comprovação.",
  },
  {
    title: "Análise, cobertura e substituições",
    description:
      "Acompanhamento da ocorrência, necessidade de cobertura e registro do substituto definido pela operação.",
  },
  {
    title: "Competências, painel e alertas",
    description:
      "Períodos operacionais configuráveis, visão consolidada da operação e sinalização de situações pendentes.",
  },
  {
    title: "Pesquisas e relatórios",
    description:
      "Filtros por critérios operacionais e consultas consolidadas das principais informações mantidas pelo sistema.",
  },
  {
    title: "Histórico, usuários e permissões",
    description:
      "Registro das principais ações, identificação do usuário responsável e organização do acesso por perfis autorizados.",
  },
];

const workflow = [
  "Cadastro",
  "Alocação",
  "Acompanhamento",
  "Ocorrência",
  "Análise",
  "Cobertura, quando necessária",
  "Histórico e consulta",
];

const occurrenceItems = [
  "Faltas",
  "Atestados",
  "Afastamentos",
  "Férias programadas",
  "Documentos relacionados",
  "Necessidade de cobertura",
  "Substituição registrada",
  "Situação do atendimento",
];

const traceabilityItems = [
  "Usuários individuais",
  "Permissões de acesso",
  "Histórico das principais operações",
  "Situação das ocorrências",
  "Identificação de responsáveis pelas ações",
  "Acompanhamento de pendências",
];

const importSteps = ["Receber", "Analisar", "Preparar", "Validar", "Importar"];

const currentScope = [
  "Trabalhadores",
  "Estrutura operacional",
  "Contratos e alocações",
  "Funções e postos",
  "Ocorrências",
  "Ausências e afastamentos",
  "Férias programadas",
  "Cobertura e substituições",
  "Competências",
  "Painel e alertas",
  "Consultas",
  "Relatórios operacionais",
  "Histórico",
  "Usuários e permissões",
  "Importação de cadastros",
];

function FlowSteps({ items }: { items: string[] }) {
  return (
    <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item, index) => (
        <li
          key={item}
          className="relative flex min-h-24 items-center gap-4 rounded-2xl border border-borderSoft bg-backgroundSoft/80 p-4 lg:min-h-32 lg:flex-col lg:justify-center lg:text-center"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-electric/50 bg-electric/10 text-xs font-black text-electricLight">
            {index + 1}
          </span>
          <span className="text-sm font-bold leading-6 text-chromeLight">{item}</span>
        </li>
      ))}
    </ol>
  );
}

export default function DamaGestorRhPage() {
  return (
    <main className="bg-dama-radial">
      <PageHeader
        title="Dama Gestor de RH"
        subtitle="Gestão operacional de recursos humanos"
        description="Gestão operacional de pessoas, vínculos e ocorrências em uma estrutura organizada e rastreável."
        className="pb-8"
      />

      <section className="container-site pb-16 sm:pb-20" aria-labelledby="hero-summary">
        <MetallicCard variant="featured" className="p-7 sm:p-9 lg:p-10">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <h2 id="hero-summary" className="sr-only">
                Apresentação da solução
              </h2>
              <p className="body-text max-w-3xl">
                Solução desenvolvida para apoiar organizações que precisam centralizar
                informações de trabalhadores, contratos, locais de atuação, funções,
                ausências e coberturas operacionais.
              </p>
              <p className="mt-5 text-base font-bold leading-8 text-chromeLight sm:text-lg">
                Base funcional existente, com implantação e adequações definidas
                conforme as necessidades de cada projeto.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <GlowButton href="#funcionalidades" variant="primary" className="w-full">
                Conheça as funcionalidades
              </GlowButton>
              <GlowButton href="/contato" variant="secondary" className="w-full">
                Consulte-nos sobre implantação
              </GlowButton>
            </div>
          </div>
        </MetallicCard>
      </section>

      <section className="container-site pb-16 sm:pb-20" aria-labelledby="solution-visuals">
        <SectionTitle
          eyebrow="Visão da solução"
          title="Uma operação organizada em um só contexto"
          description="Representações visuais dos principais núcleos da solução. As imagens são conceituais e não correspondem a capturas de tela do sistema."
        />

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {solutionImages.map((image) => (
            <figure key={image.src}>
              <MetallicCard className="h-full overflow-hidden">
                <div className="-mx-5 -mt-5 overflow-hidden border-b border-borderSoft sm:-mx-6 sm:-mt-6">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={1200}
                    height={800}
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="aspect-[3/2] h-auto w-full object-cover transition duration-300 hover:scale-[1.02]"
                  />
                </div>

                <figcaption className="pt-5">
                  <h3 className="text-lg font-black text-text">{image.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{image.description}</p>
                </figcaption>
              </MetallicCard>
            </figure>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-backgroundSoft/70 py-16 sm:py-20">
        <div className="container-site">
          <SectionTitle
            eyebrow="Visão geral"
            title="Uma estrutura central para a operação de RH"
            description="O Dama Gestor de RH relaciona os principais elementos da gestão para identificar onde cada pessoa está alocada, qual atividade exerce e a qual operação está vinculada."
          />

          <div className="mt-10 grid gap-3 md:grid-cols-5">
            {structureItems.map((item, index) => (
              <div key={item} className="flex items-center gap-3 md:block md:text-center">
                <div className="flex min-h-20 flex-1 items-center justify-center rounded-2xl border border-electric/35 bg-electric/10 px-4 py-5 text-sm font-black text-chromeLight">
                  {item}
                </div>
                {index < structureItems.length - 1 ? (
                  <span className="text-xl text-electricLight md:mt-3 md:inline-block" aria-hidden="true">
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>

          <p className="body-text-sm mt-8 max-w-4xl">
            Essa organização oferece uma base para consulta, acompanhamento e
            rastreabilidade das atividades administrativas relacionadas à operação de pessoas.
          </p>
        </div>
      </section>

      <section id="funcionalidades" className="page-section scroll-mt-24">
        <div className="container-site">
          <SectionTitle
            eyebrow="Núcleo funcional"
            title="Principais funcionalidades"
            description="Recursos organizados para acompanhar cadastros, vínculos e situações operacionais sem automatizar decisões de recursos humanos."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {features.map((feature) => (
              <MetallicCard key={feature.title} className="h-full">
                <h3 className="text-lg font-black text-text">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{feature.description}</p>
              </MetallicCard>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-backgroundSoft/70 py-16 sm:py-20">
        <div className="container-site">
          <SectionTitle
            eyebrow="Fluxo operacional"
            title="Do cadastro ao histórico"
            description="O sistema mantém as informações relacionadas à operação para facilitar o acompanhamento das situações registradas e preservar a rastreabilidade das principais ações."
          />

          <div className="mt-10">
            <FlowSteps items={workflow} />
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container-site grid gap-6 lg:grid-cols-2">
          <MetallicCard variant="featured" className="p-7 sm:p-8">
            <p className="eyebrow mb-4">Ocorrências e cobertura</p>
            <h2 className="title-chrome text-3xl font-black sm:text-4xl">
              Acompanhamento das ausências com contexto operacional
            </h2>
            <p className="body-text-sm mt-5">
              Cada ocorrência pode ser relacionada ao trabalhador, contrato, função e
              período correspondente.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {occurrenceItems.map((item) => (
                <span key={item} className="rounded-full border border-electric/30 bg-electric/10 px-3 py-2 text-xs font-bold text-electricLight">
                  {item}
                </span>
              ))}
            </div>
            <p className="mt-6 rounded-2xl border border-border bg-background/60 p-4 text-sm leading-7 text-muted">
              A necessidade de cobertura pode ser registrada, mas a definição do
              substituto permanece sob responsabilidade da operação.
            </p>
          </MetallicCard>

          <MetallicCard className="p-7 sm:p-8">
            <p className="eyebrow mb-4">Controle e rastreabilidade</p>
            <h2 className="title-chrome text-3xl font-black sm:text-4xl">
              Informação acompanhada desde o registro
            </h2>
            <p className="body-text-sm mt-5">
              A solução foi concebida para preservar informações relevantes sobre as
              operações realizadas pelos usuários.
            </p>
            <ul className="mt-6 grid gap-3">
              {traceabilityItems.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-border bg-backgroundSoft/80 p-4 text-sm leading-6 text-muted">
                  <span className="text-electricLight" aria-hidden="true">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </MetallicCard>
        </div>
      </section>

      <section className="border-y border-border bg-backgroundSoft/70 py-16 sm:py-20">
        <div className="container-site">
          <SectionTitle
            eyebrow="Dados existentes"
            title="Implantação baseada na realidade da organização"
            description="Planilhas e outros cadastros precisam ser avaliados antes da importação para verificar estrutura, consistência e compatibilidade técnica."
          />

          <div className="mt-10">
            <FlowSteps items={importSteps} />
          </div>

          <p className="body-text-sm mt-8 max-w-4xl">
            A viabilidade da importação depende da estrutura, consistência e qualidade
            da base existente. Históricos complexos e necessidades especiais de migração
            devem ser avaliados separadamente.
          </p>
        </div>
      </section>

      <section className="page-section">
        <div className="container-site">
          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <MetallicCard variant="featured" className="p-7 sm:p-9">
              <p className="eyebrow mb-4">Solução sob encomenda</p>
              <h2 className="title-chrome text-3xl font-black sm:text-4xl">
                Uma base funcional, adaptada ao contexto de cada projeto
              </h2>
              <div className="mt-6 space-y-4 text-sm leading-7 text-muted sm:text-base sm:leading-8">
                <p>
                  A implantação considera a estrutura operacional, os tipos de vínculo,
                  contratos, funções, perfis de acesso, dados existentes e necessidades
                  específicas de cada organização.
                </p>
                <p>
                  Outras funcionalidades, integrações e automações podem ser avaliadas
                  conforme o escopo de cada projeto.
                </p>
              </div>
              <GlowButton href="/contato" variant="primary" className="mt-8">
                Consulte-nos sobre seu cenário
              </GlowButton>
            </MetallicCard>

            <MetallicCard className="p-7 sm:p-8">
              <p className="eyebrow mb-4">Escopo apresentado atualmente</p>
              <div className="flex flex-wrap gap-2">
                {currentScope.map((item) => (
                  <span key={item} className="rounded-full border border-borderSoft bg-white/[0.035] px-3 py-2 text-xs font-semibold text-muted">
                    {item}
                  </span>
                ))}
              </div>
            </MetallicCard>
          </div>

          <MetallicCard variant="notice" className="mt-6 p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <h2 className="text-xl font-black text-text">Segurança e privacidade</h2>
                <p className="body-text-sm mt-3">
                  Os requisitos de acesso, permissões, armazenamento, proteção de dados,
                  backup e rastreabilidade são definidos de acordo com o ambiente e o
                  escopo de implantação.
                </p>
              </div>
              <div>
                <h2 className="text-xl font-black text-text">Condições do projeto</h2>
                <p className="body-text-sm mt-3">
                  Projeto sob consulta. Escopo, arquitetura, adequações e implantação são
                  avaliados conforme as características de cada cenário.
                </p>
              </div>
            </div>
          </MetallicCard>
        </div>
      </section>

      <section className="border-t border-border bg-backgroundSoft/80 py-16 sm:py-20">
        <div className="container-site text-center">
          <p className="eyebrow mb-4">Dama Gestor de RH</p>
          <h2 className="title-chrome mx-auto max-w-4xl text-3xl font-black sm:text-4xl lg:text-5xl">
            Uma base funcional para organizar a gestão operacional de pessoas
          </h2>
          <p className="body-text mx-auto mt-5 max-w-3xl">
            Preparada para projetos de implantação e adequação conforme cada contexto.
          </p>
          <GlowButton href="/contato" variant="primary" className="mt-8">
            Consulte-nos
          </GlowButton>
        </div>
      </section>
    </main>
  );
}
