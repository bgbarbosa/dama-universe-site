import { createPageMetadata } from "@/lib/seo";
import { InfoNotice, ResponsibilityNotice } from "@/components/notices";
import { GlowButton, MetallicCard, PageHeader, SectionTitle } from "@/components/ui";

export const metadata = createPageMetadata({
  title: "Dama Gestor de Inquéritos — Dama Universe",
  description:
    "Sistema desktop em desenvolvimento para gestão de inquéritos policiais, prazos, documentos, objetos em cartório, dados correcionais e relatórios.",
  path: "/programas/dama-gestor-de-inqueritos",
});

const mainFeatures = [
  "Controle de inquéritos policiais por delegacia, cartório e procedimento.",
  "Painel principal com vencidos, vencem hoje, vencem em até 5 dias, em andamento, relatados e remetidos.",
  "Cadastro manual de IP e importação inteligente de documentos.",
  "Tela de conferência antes de salvar dados extraídos automaticamente.",
  "Controle de prazos, dilações e vencimentos calculados.",
  "Alertas locais para IPs vencidos, a vencer e sem prazo definido.",
  "Gestão documental com cópia segura dos arquivos para pasta própria do Dama.",
  "Controle de objetos em cartório, lacres, localização física e situação do objeto.",
  "Linha do tempo, movimentações, logs de ações e histórico do IP.",
  "Relatórios mensais, relatórios de objetos e relatório correcional do Ministério Público.",
];

const modules = [
  "Login, usuários, delegacias e cartórios",
  "Painel principal de IPs",
  "Cadastro manual de IP",
  "Dados correcionais / Ministério Público",
  "Importação inteligente da capa do IP",
  "Classificação documental",
  "Prazos e dilações",
  "Alertas do Windows",
  "Juntadas e sincronização de pasta",
  "Controle de objetos em cartório",
  "Linha do tempo e movimentações",
  "Relatórios, backup, segurança e logs",
];

const correctionalFields = [
  "IP/Ano",
  "Delegado responsável",
  "Escrivão responsável",
  "Data de instauração",
  "BO/Unidade",
  "Infração penal",
  "Vítima",
  "Indiciado",
  "Situação correcional",
  "Recebimento",
  "Prazo em dias",
  "Vencimento",
  "Mês do vencimento",
  "Observações",
  "Objeto",
  "Autos judiciais / Processo / CPE",
];

const technicalStack = [
  "Python",
  "CustomTkinter",
  "SQLite",
  "PyMuPDF",
  "openpyxl",
  "ReportLab ou solução simples equivalente",
  "winotify ou plyer",
  "PyInstaller",
  "Funcionamento local/offline no MVP",
];

export default function DamaGestorDeInqueritosPage() {
  return (
    <main>
      <PageHeader
        title="Dama Gestor de Inquéritos"
        subtitle="Gestão documental, prazos, objetos e dados correcionais"
        description="Sistema desktop em desenvolvimento para centralizar o controle de inquéritos policiais, prazos, documentos, objetos em cartório, movimentações, relatórios e dados correcionais exigidos em controle do Ministério Público."
      />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <MetallicCard variant="featured" className="p-8">
            <p className="eyebrow mb-4">Em desenvolvimento</p>

            <h2 className="title-chrome text-3xl font-black sm:text-4xl">
              Controle inteligente de inquéritos policiais
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-muted md:text-base md:leading-8">
              <p>
                O Dama Gestor de Inquéritos está sendo planejado como um aplicativo desktop local para Windows, voltado ao uso prático em rotina cartorária e policial.
              </p>

              <p>
                A proposta é substituir ou reduzir controles dispersos em planilhas, pastas de arquivos, anotações manuais e consultas isoladas, reunindo em uma única base o acompanhamento de IPs, prazos, documentos, objetos, movimentações e relatórios.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <GlowButton href="/programas" variant="secondary">
                Voltar aos programas
              </GlowButton>

              <GlowButton href="/contato" variant="primary">
                Enviar sugestão
              </GlowButton>
            </div>
          </MetallicCard>

          <MetallicCard className="p-8">
            <h3 className="text-2xl font-black text-text">Resumo do projeto</h3>

            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-bold uppercase tracking-[0.18em] text-electricLight">Status</dt>
                <dd className="mt-1 text-muted">Em desenvolvimento</dd>
              </div>

              <div>
                <dt className="font-bold uppercase tracking-[0.18em] text-electricLight">Plataforma</dt>
                <dd className="mt-1 text-muted">Desktop Windows</dd>
              </div>

              <div>
                <dt className="font-bold uppercase tracking-[0.18em] text-electricLight">Funcionamento</dt>
                <dd className="mt-1 text-muted">Local/offline no MVP</dd>
              </div>

              <div>
                <dt className="font-bold uppercase tracking-[0.18em] text-electricLight">Identidade visual</dt>
                <dd className="mt-1 text-muted">Verde e preto</dd>
              </div>

              <div>
                <dt className="font-bold uppercase tracking-[0.18em] text-electricLight">Finalidade</dt>
                <dd className="mt-1 text-muted">Gestão de IPs, prazos, documentos, objetos e relatórios</dd>
              </div>
            </dl>
          </MetallicCard>
        </div>

        <div className="mb-10 grid gap-6 lg:grid-cols-3">
          <MetallicCard>
            <p className="eyebrow mb-4">Problema</p>
            <p className="text-sm leading-7 text-muted">
              O controle de inquéritos costuma ficar espalhado entre planilhas, pastas, PDFs, anotações manuais e alertas informais.
            </p>
          </MetallicCard>

          <MetallicCard>
            <p className="eyebrow mb-4">Solução proposta</p>
            <p className="text-sm leading-7 text-muted">
              Centralizar IPs, prazos, documentos, objetos, movimentações, logs e relatórios em sistema local organizado por delegacia e cartório.
            </p>
          </MetallicCard>

          <MetallicCard>
            <p className="eyebrow mb-4">Regra central</p>
            <p className="text-sm leading-7 text-muted">
              O IP pertence ao cartório. O usuário logado define o cartório padrão, mas a consulta geral pode continuar disponível.
            </p>
          </MetallicCard>
        </div>

        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <MetallicCard>
            <SectionTitle
              eyebrow="Recursos previstos"
              title="O que o sistema deverá fazer"
              description="Principais funções planejadas para o Dama Gestor de Inquéritos."
              className="mb-6"
            />

            <div className="grid gap-3">
              {mainFeatures.map((feature) => (
                <div key={feature} className="rounded-2xl border border-border bg-backgroundSoft/80 p-4 text-sm leading-6 text-chromeLight">
                  <span className="mr-2 text-electricLight">•</span>
                  {feature}
                </div>
              ))}
            </div>
          </MetallicCard>

          <MetallicCard>
            <SectionTitle
              eyebrow="Módulos"
              title="Arquitetura funcional prevista"
              description="O desenvolvimento deve ser modular, com cada etapa funcional antes de avançar para a próxima."
              className="mb-6"
            />

            <div className="grid gap-3 sm:grid-cols-2">
              {modules.map((module) => (
                <div key={module} className="rounded-2xl border border-borderSoft bg-white/[0.035] p-4 text-sm font-medium leading-6 text-muted">
                  {module}
                </div>
              ))}
            </div>
          </MetallicCard>
        </div>

        <MetallicCard variant="notice" className="mb-10">
          <SectionTitle
            eyebrow="Dados Correcionais / MP"
            title="Módulo correcional incorporado ao núcleo do sistema"
            description="O projeto prevê um bloco específico para registrar, conferir, filtrar, alertar e exportar dados correcionais em padrão compatível com controle do Ministério Público."
            className="mb-6"
          />

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {correctionalFields.map((field) => (
              <div key={field} className="rounded-2xl border border-borderSoft bg-backgroundSoft/75 p-4 text-sm font-semibold text-chromeLight">
                {field}
              </div>
            ))}
          </div>
        </MetallicCard>

        <div className="mb-10 grid gap-6 lg:grid-cols-2">
          <MetallicCard>
            <SectionTitle
              eyebrow="Tecnologia"
              title="Stack técnica planejada"
              description="Base técnica sugerida para o desenvolvimento do aplicativo desktop local."
              className="mb-6"
            />

            <div className="flex flex-wrap gap-3">
              {technicalStack.map((item) => (
                <span key={item} className="rounded-full border border-electric/35 bg-electric/10 px-4 py-2 text-sm font-bold text-electricLight">
                  {item}
                </span>
              ))}
            </div>
          </MetallicCard>

          <MetallicCard>
            <SectionTitle
              eyebrow="Segurança documental"
              title="Preservação dos arquivos importados"
              description="O sistema deverá copiar documentos para pasta própria, calcular hash, registrar no banco, manter histórico e evitar substituições automáticas."
              className="mb-6"
            />

            <p className="text-sm leading-7 text-muted">
              A regra de ouro do projeto é que o Dama nunca apague nem substitua documentos automaticamente. Arquivos importados devem ser preservados, versionados ou complementados somente com ação confirmada pelo usuário.
            </p>
          </MetallicCard>
        </div>

        <InfoNotice title="Projeto em desenvolvimento" className="mb-6">
          Esta página apresenta o escopo planejado do Dama Gestor de Inquéritos. As funcionalidades descritas podem ser implementadas por etapas, ajustadas durante o desenvolvimento e liberadas progressivamente.
        </InfoNotice>

        <ResponsibilityNotice>
          O Dama Gestor de Inquéritos será uma ferramenta de apoio à organização e ao controle interno. Ele não substitui a responsabilidade funcional, a conferência humana, os sistemas oficiais, as normas institucionais ou a validação final dos dados pelo usuário responsável.
        </ResponsibilityNotice>
      </section>
    </main>
  );
}
