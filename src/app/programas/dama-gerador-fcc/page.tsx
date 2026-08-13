import { createPageMetadata } from "@/lib/seo";
import { ResponsibilityNotice, SecurityNotice } from "@/components/notices";
import { DamaFccTutorials } from "@/components/videos";
import { GlowButton, MetallicCard, SectionHeader, SectionTitle } from "@/components/ui";
import { getProgramDownloadUrl } from "@/data";

const downloadUrl = getProgramDownloadUrl("dama-gerador-fcc");

const features = [
  "Geração de FCC a partir de Boletim de Ocorrência em PDF.",
  "Geração de FCC do zero, por preenchimento manual.",
  "Cadastro local de usuários e responsáveis.",
  "Seleção de responsável como 1º Custodiante, Parte 2 ou ambos.",
  "Extração de dados gerais da ocorrência.",
  "Identificação de lacres, objetos e descrições.",
  "Regras automáticas para sugerir itens que podem gerar FCC.",
  "Conferência visual dos vestígios antes da geração.",
  "Geração de documentos DOCX com modelo padronizado.",
  "Histórico local de casos gerados.",
  "Log de geração por caso.",
  "Funcionamento local, sem depender de internet para as funções principais.",
];

const technicalItems = [
  "Python",
  "CustomTkinter",
  "PyMuPDF",
  "python-docx",
  "Pillow",
  "JSON para armazenamento local",
  "PyInstaller",
  "Inno Setup",
];

const workflow = [
  {
    title: "1. Entrada",
    text: "O usuário seleciona um Boletim de Ocorrência em PDF ou inicia uma FCC do zero por preenchimento manual.",
  },
  {
    title: "2. Extração e organização",
    text: "O sistema identifica dados gerais, responsáveis, lacres, objetos e descrições, aplicando regras de sugestão para apoiar a seleção dos vestígios.",
  },
  {
    title: "3. Conferência",
    text: "Antes da geração, o usuário revisa os dados, marca ou desmarca itens e corrige qualquer informação necessária.",
  },
  {
    title: "4. Geração",
    text: "Após confirmação, o sistema gera os documentos DOCX, organiza os arquivos em pasta própria e registra histórico e log do caso.",
  },
];

export const metadata = createPageMetadata({
  title: "Dama Gerador FCC 3.0 — Dama Universe",
  description:
    "Aplicativo desktop para Windows voltado à geração, organização e padronização de Formulários de Cadeia de Custódia — FCC.",
  path: "/programas/dama-gerador-fcc",
});

export default function DamaGeradorFccPage() {
  return (
    <main className="bg-dama-radial">
      <section className="page-section-tight">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <SectionHeader
              eyebrow="Programa disponível"
              title="Dama Gerador FCC 3.0"
              description="Inteligência a Serviço da Custódia. Aplicativo desktop para Windows criado para auxiliar na geração, organização e padronização de Formulários de Cadeia de Custódia — FCC."
            />

            <MetallicCard variant="featured">
              <p className="eyebrow mb-5 text-goldSoft">Resumo</p>
              <dl className="grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-[0.24em] text-mutedSoft">
                    Versão
                  </dt>
                  <dd className="mt-1 font-bold text-text">3.0</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.24em] text-mutedSoft">
                    Sistema
                  </dt>
                  <dd className="mt-1 font-bold text-text">Windows</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.24em] text-mutedSoft">
                    Tipo
                  </dt>
                  <dd className="mt-1 font-bold text-text">Aplicativo desktop</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.24em] text-mutedSoft">
                    Status
                  </dt>
                  <dd className="mt-1 font-bold text-goldSoft">Disponível</dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-wrap gap-3">
                <GlowButton href={downloadUrl} external variant="primary">
                  Baixar ZIP
                </GlowButton>
                <GlowButton
                  href="/changelog/dama-gerador-fcc/v3.0.0"
                  variant="secondary"
                >
                  Ver changelog
                </GlowButton>
              </div>

              <p className="mt-5 text-sm leading-7 text-mutedSoft">
                O download é feito pelo Google Drive. Após baixar, confira a versão
                e mantenha a conferência final dos documentos gerados.
              </p>
            </MetallicCard>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-site space-y-8">
          <MetallicCard>
            <SectionTitle
              title="O que é o Dama Gerador FCC 3.0"
              description="Ferramenta de apoio operacional para reduzir retrabalho, organizar informações e padronizar a geração de documentos de cadeia de custódia."
              className="mb-6"
            />

            <div className="space-y-5 text-sm leading-7 text-muted md:text-base md:leading-8">
              <p>
                O Dama Gerador FCC 3.0 é um aplicativo desktop desenvolvido em
                Python para auxiliar na geração de Formulários de Cadeia de
                Custódia — FCC, a partir de Boletins de Ocorrência em PDF ou
                por preenchimento manual.
              </p>

              <p>
                O sistema permite extrair informações, conferir dados,
                selecionar vestígios e gerar documentos DOCX de forma
                padronizada. A proposta é oferecer mais organização, agilidade
                e segurança operacional ao processo de preenchimento.
              </p>
            </div>
          </MetallicCard>

          <DamaFccTutorials className="rounded-[2rem] border border-borderSoft bg-backgroundSoft/40 p-6 md:p-8" />

          <ResponsibilityNotice>
            O Dama Gerador FCC 3.0 é uma ferramenta de apoio operacional. O
            sistema automatiza parte do preenchimento, mas não substitui a
            conferência humana, a responsabilidade funcional ou a validação
            final do usuário.
          </ResponsibilityNotice>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr]">
            <MetallicCard>
              <SectionTitle title="Principais funcionalidades" className="mb-6" />
              <div className="grid gap-3 sm:grid-cols-2">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-2xl border border-border bg-backgroundSoft/80 p-4 text-sm leading-6 text-chromeLight"
                  >
                    <span className="mr-2 text-electricLight">•</span>
                    {feature}
                  </div>
                ))}
              </div>
            </MetallicCard>

            <div className="space-y-8">
              <MetallicCard variant="notice">
                <p className="eyebrow mb-4 text-electricLight">Diferencial</p>
                <h2 className="text-2xl font-black text-text">
                  Funcionamento local
                </h2>
                <p className="body-text-sm mt-4">
                  As funções principais foram pensadas para uso local, sem
                  depender de internet. Os arquivos de trabalho ficam
                  organizados na pasta Documentos/Dama Gerador FCC 3.0.
                </p>
              </MetallicCard>

              <SecurityNotice>
                Antes de gerar qualquer documento, confira número da ocorrência,
                responsáveis, data, hora, local, lacres, descrição dos objetos e
                demais informações extraídas ou digitadas.
              </SecurityNotice>
            </div>
          </div>

          <MetallicCard>
            <SectionTitle
              title="Fluxo de uso"
              description="O sistema foi pensado para manter a automação sob controle do operador, com etapa de revisão antes da geração final."
              className="mb-6"
            />

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {workflow.map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-border bg-backgroundSoft/80 p-5"
                >
                  <h3 className="text-lg font-black text-text">{step.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted">{step.text}</p>
                </div>
              ))}
            </div>
          </MetallicCard>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <MetallicCard>
              <SectionTitle title="Tecnologias utilizadas" className="mb-6" />
              <div className="flex flex-wrap gap-3">
                {technicalItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-borderSoft bg-white/[0.04] px-4 py-2 text-sm font-semibold text-chromeLight"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </MetallicCard>

            <MetallicCard variant="featured">
              <p className="eyebrow mb-4 text-goldSoft">Download direto</p>
              <h2 className="text-2xl font-black text-text">
                Baixar Dama Gerador FCC 3.0
              </h2>
              <p className="body-text-sm mt-4">
                O pacote ZIP da versão 3.0 está disponível em link público no
                Google Drive. A página de downloads separada foi dispensada para
                simplificar o acesso do usuário.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <GlowButton href={downloadUrl} external variant="primary">
                  Baixar ZIP pelo Google Drive
                </GlowButton>
                <GlowButton href="/contato" variant="secondary">
                  Enviar sugestão
                </GlowButton>
              </div>
            </MetallicCard>
          </div>
        </div>
      </section>
    </main>
  );
}
