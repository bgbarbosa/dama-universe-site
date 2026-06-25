import { createPageMetadata } from "@/lib/seo";
import { InfoNotice, ResponsibilityNotice } from "@/components/notices";
import { GlowButton, MetallicCard, PageHeader } from "@/components/ui";

export const metadata = createPageMetadata({
  title: "SDO — Dama Universe",
  description:
    "Sistema desktop local para controle, distribuição e acompanhamento de ocorrências plantonistas, com rodízio por categoria, relatórios, backup e encerramento assistido.",
  path: "/programas/sdo",
});

const mainFeatures = [
  "Ativação e encerramento assistido do plantão.",
  "Cadastro das equipes Alfa e Bravo, com delegado e escrivães.",
  "Três modos de plantão: equipe única, duas equipes com simultâneo e duas equipes sem simultâneo.",
  "Distribuição automática de ocorrências conforme período ativo.",
  "Rodízio independente por categoria no período simultâneo.",
  "Categorias operacionais como APF, MP/Evasão, Local e DEPCA.",
  "Painel de acompanhamento do plantão em estilo operacional.",
  "Edição, cancelamento, retificação e finalização com histórico.",
  "Controle de presos, custodiados, adolescentes infratores, advogados e visitas.",
  "Relatórios em PDF, Excel e DOCX, gráficos e hash de integridade.",
  "Backups locais com metadados e preservação dos dados do plantão.",
  "Instalação local no Windows, com funcionamento offline.",
];

const workflow = [
  "Operador ativa o plantão e informa as equipes.",
  "Sistema registra os horários e identifica o modo de plantão.",
  "Ocorrência é lançada com número da força, categoria e fato principal.",
  "Sistema identifica o período ativo e define a equipe responsável.",
  "Ocorrência entra no painel para acompanhamento.",
  "Ações sensíveis são registradas em histórico.",
  "Ao final, o sistema auxilia o encerramento e gera relatórios e backup.",
];

const technicalStack = [
  "Python",
  "Interface desktop Qt/PySide6",
  "SQLite local",
  "openpyxl para Excel",
  "ReportLab para PDF",
  "Matplotlib para gráficos",
  "PyInstaller",
  "Inno Setup",
  "Funcionamento local/offline",
];

const statusItems = [
  { label: "Status", value: "Ajustes finais" },
  { label: "Versão", value: "2.0" },
  { label: "Plataforma", value: "Desktop Windows" },
  { label: "Funcionamento", value: "Local/offline" },
  { label: "Banco", value: "SQLite local" },
  { label: "Liberação", value: "Em preparação" },
];

export default function SdoPage() {
  return (
    <main>
      <PageHeader
        title="SDO"
        subtitle="Sistema de Deliberação, Distribuição e Controle de Ocorrências Plantonistas"
        description="Sistema desktop local para controle operacional de plantão de delegacia, com distribuição automática de ocorrências, rodízio por categoria, painel de acompanhamento, relatórios, histórico e backup."
      />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <MetallicCard variant="featured" className="p-8">
            <p className="eyebrow mb-4 text-goldSoft">Ajustes finais</p>

            <h2 className="title-chrome text-3xl font-black sm:text-4xl">
              Controle operacional do plantão
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-muted md:text-base md:leading-8">
              <p>
                O SDO é um sistema desktop local/offline desenvolvido para
                auxiliar a rotina de plantão, centralizando a ativação do
                plantão, a distribuição de ocorrências entre equipes, o painel
                de acompanhamento, os relatórios, o histórico de ações e os
                backups operacionais.
              </p>

              <p>
                A versão atual já passou pela etapa de testes finais e encontra-se
                em fase de ajustes operacionais, revisão visual e preparação antes
                da liberação para uso.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <GlowButton href="/programas" variant="secondary">
                Voltar aos programas
              </GlowButton>

              <GlowButton href="/contato" variant="primary">
                Enviar observação
              </GlowButton>
            </div>
          </MetallicCard>

          <MetallicCard className="p-8">
            <h3 className="text-2xl font-black text-text">Resumo</h3>

            <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-1">
              {statusItems.map((item) => (
                <div key={item.label}>
                  <dt className="font-bold uppercase tracking-[0.18em] text-electricLight">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-muted">{item.value}</dd>
                </div>
              ))}
            </dl>
          </MetallicCard>
        </div>

        <div className="mb-10 grid gap-6 lg:grid-cols-3">
          <MetallicCard>
            <p className="eyebrow mb-4">Finalidade</p>
            <p className="text-sm leading-7 text-muted">
              Controlar, automatizar e registrar a distribuição de ocorrências
              durante o plantão, reduzindo erros manuais e organizando a rotina
              operacional.
            </p>
          </MetallicCard>

          <MetallicCard>
            <p className="eyebrow mb-4">Regra central</p>
            <p className="text-sm leading-7 text-muted">
              Durante o período simultâneo, cada categoria possui rodízio próprio.
              Em período individual, a ocorrência é atribuída à equipe ativa, sem
              alterar o rodízio simultâneo.
            </p>
          </MetallicCard>

          <MetallicCard>
            <p className="eyebrow mb-4">Segurança operacional</p>
            <p className="text-sm leading-7 text-muted">
              Ações sensíveis, como edição, cancelamento, retificação e finalização,
              exigem identificação do responsável e ficam registradas no histórico.
            </p>
          </MetallicCard>
        </div>

        <div className="mb-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <MetallicCard>
            <p className="eyebrow mb-4">Recursos</p>
            <h2 className="title-chrome text-3xl font-black sm:text-4xl">
              Principais funções
            </h2>

            <div className="mt-7 grid gap-3">
              {mainFeatures.map((feature) => (
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

          <MetallicCard>
            <p className="eyebrow mb-4">Fluxo operacional</p>
            <h2 className="title-chrome text-3xl font-black sm:text-4xl">
              Como o SDO organiza o plantão
            </h2>

            <div className="mt-7 space-y-3">
              {workflow.map((step, index) => (
                <div
                  key={step}
                  className="flex gap-4 rounded-2xl border border-borderSoft bg-white/[0.035] p-4 text-sm leading-6 text-muted"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-electric/45 bg-electric/10 text-xs font-black text-electricLight">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </MetallicCard>
        </div>

        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <MetallicCard>
            <p className="eyebrow mb-4">Tecnologia</p>
            <h2 className="text-2xl font-black text-text">Base técnica prevista</h2>

            <div className="mt-6 flex flex-wrap gap-3">
              {technicalStack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-electric/25 bg-electric/10 px-4 py-2 text-sm font-semibold text-electricLight"
                >
                  {item}
                </span>
              ))}
            </div>
          </MetallicCard>

          <InfoNotice>
            O SDO é uma ferramenta autoral de apoio operacional. A página pública
            registra a finalidade, o estágio de evolução e os recursos gerais do
            projeto, sem disponibilizar código-fonte privado, dados reais de
            ocorrência, documentos sensíveis, senhas ou informações restritas.
          </InfoNotice>
        </div>

        <ResponsibilityNotice>
          O SDO organiza informações e apoia o controle do plantão, mas não
          substitui a responsabilidade do operador, a conferência humana, a
          validação institucional ou os procedimentos oficiais da unidade.
        </ResponsibilityNotice>
      </section>
    </main>
  );
}
