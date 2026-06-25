import { createPageMetadata } from "@/lib/seo";
import { InfoNotice, ResponsibilityNotice } from "@/components/notices";
import { GlowButton, MetallicCard, PageHeader } from "@/components/ui";

export const metadata = createPageMetadata({
  title: "Dama Gerador FCC Universal — Dama Universe",
  description:
    "Evolução do Dama Gerador FCC com biblioteca de modelos, órgãos, cabeçalhos, modelos personalizados, marcadores e suporte a evidências digitais por vestígio.",
  path: "/programas/dama-gerador-fcc-universal",
});

const mainFeatures = [
  "Biblioteca de Modelos de FCC com modelos prontos, neutros e personalizados.",
  "Escolha do modelo antes da geração do documento.",
  "Prévia visual do modelo e do cabeçalho institucional.",
  "Cadastro de órgãos, instituições, unidades, laboratórios e marcas profissionais.",
  "Uso opcional de brasão, logomarca ou marca profissional, conforme autorização do usuário.",
  "Importação de modelos DOCX personalizados com marcadores.",
  "Validação dos marcadores existentes no modelo importado.",
  "Criação e salvamento de modelos próprios para uso futuro.",
  "Fluxo de geração do zero e fluxo a partir de B.O. em PDF.",
  "Geração de uma FCC por lacre ou por vestígio selecionado.",
  "Campos especializados para evidência eletrônica, mídia digital e vestígios especiais.",
  "Histórico, logs, rastreabilidade e funcionamento local/offline.",
];

const modelTypes = [
  "FCC Operacional Padrão",
  "FCC Geral Neutro / Universal",
  "FCC Simples",
  "FCC Digital / Celular",
  "FCC Pericial Completa",
  "Modelo Personalizado do Usuário",
];

const workflow = [
  "Usuário escolhe o fluxo: Novo FCC do zero ou Novo FCC a partir de B.O.",
  "Sistema permite selecionar o modelo de FCC mais adequado ao caso.",
  "Usuário define órgão, cabeçalho, brasão/logomarca ou modelo neutro, quando aplicável.",
  "Dados da ocorrência, responsáveis, lacres e vestígios são preenchidos ou extraídos.",
  "Vestígios físicos, digitais e especiais podem receber campos complementares.",
  "Usuário revisa todos os dados antes da geração.",
  "Sistema gera documentos DOCX padronizados conforme o modelo escolhido.",
];

const statusItems = [
  { label: "Status", value: "Testes finais" },
  { label: "Versão", value: "4.0 Universal" },
  { label: "Plataforma", value: "Desktop Windows" },
  { label: "Funcionamento", value: "Local/offline" },
  { label: "Base", value: "Dama Gerador FCC 3.0" },
  { label: "Lançamento", value: "Em breve" },
];

const manuals = [
  "Manual Completo do Dama Universal",
  "Manual de Operação Diária",
  "Manual de Modelos, Órgãos e Cabeçalho",
  "Manual de Modelos Personalizados e Marcadores",
  "Manual de Evidências Digitais e Vestígios Especiais",
];

export default function DamaGeradorFccUniversalPage() {
  return (
    <main>
      <PageHeader
        title="Dama Gerador FCC Universal"
        subtitle="Biblioteca de modelos, identidade institucional e geração personalizada de FCC"
        description="Evolução do Dama Gerador FCC voltada à geração de Formulários de Cadeia de Custódia com múltiplos modelos, cabeçalhos configuráveis, órgãos cadastrados, modelos personalizados e suporte a evidências digitais."
      />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <MetallicCard variant="featured" className="p-8">
            <p className="eyebrow mb-4 text-goldSoft">Testes finais</p>

            <h2 className="title-chrome text-3xl font-black sm:text-4xl">
              A evolução universal do Dama Gerador FCC
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-muted md:text-base md:leading-8">
              <p>
                O Dama Gerador FCC Universal preserva o fluxo operacional do
                Dama Gerador FCC 3.0 e acrescenta uma camada de personalização
                baseada em modelos, órgãos, cabeçalhos, brasão/logomarca,
                importação de DOCX e marcadores.
              </p>

              <p>
                A versão Universal já se encontra em fase de testes finais, com
                ajustes de acabamento, validação operacional e preparação para
                lançamento oficial em breve.
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
              Ampliar a geração de FCC para diferentes contextos, permitindo
              modelos prontos, modelos neutros, cabeçalhos personalizados e
              modelos próprios do usuário.
            </p>
          </MetallicCard>

          <MetallicCard>
            <p className="eyebrow mb-4">Conceito central</p>
            <p className="text-sm leading-7 text-muted">
              O sistema deixa de depender de um modelo fixo e passa a funcionar
              como biblioteca local de modelos de FCC com motor universal de
              preenchimento.
            </p>
          </MetallicCard>

          <MetallicCard>
            <p className="eyebrow mb-4">Lançamento</p>
            <p className="text-sm leading-7 text-muted">
              O programa está em testes finais. O download público será liberado
              após a conclusão dos ajustes finais, validação operacional e revisão
              dos materiais de apoio.
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
              Como o Universal organiza a geração
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
            <p className="eyebrow mb-4">Modelos previstos</p>
            <h2 className="text-2xl font-black text-text">Biblioteca de modelos</h2>

            <div className="mt-6 flex flex-wrap gap-3">
              {modelTypes.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-electric/25 bg-electric/10 px-4 py-2 text-sm font-semibold text-electricLight"
                >
                  {item}
                </span>
              ))}
            </div>
          </MetallicCard>

          <MetallicCard>
            <p className="eyebrow mb-4">Manuais preparados</p>
            <h2 className="text-2xl font-black text-text">Material de apoio</h2>

            <div className="mt-6 grid gap-3">
              {manuals.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-borderSoft bg-white/[0.035] p-4 text-sm leading-6 text-muted"
                >
                  {item}
                </div>
              ))}
            </div>
          </MetallicCard>
        </div>

        <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <InfoNotice>
            A versão Universal é uma ferramenta autoral em fase de testes finais.
            A página pública registra finalidade, escopo, estágio de evolução e
            recursos gerais do projeto, sem disponibilizar código-fonte privado,
            dados reais, documentos sensíveis, senhas, tokens ou informações
            restritas.
          </InfoNotice>

          <ResponsibilityNotice>
            O Dama Gerador FCC Universal automatiza e organiza o preenchimento,
            mas não substitui a conferência humana. Antes de gerar, assinar,
            imprimir, encaminhar ou juntar qualquer FCC, o usuário deve revisar
            dados extraídos, campos preenchidos, lacres, responsáveis, órgão,
            modelo e pasta de saída.
          </ResponsibilityNotice>
        </div>
      </section>
    </main>
  );
}
