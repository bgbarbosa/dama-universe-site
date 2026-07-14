import { getProgramDownloadUrl } from "@/data";
import { createPageMetadata } from "@/lib/seo";
import { InfoNotice, ResponsibilityNotice } from "@/components/notices";
import { GlowButton, MetallicCard, PageHeader, SectionTitle } from "@/components/ui";

export const metadata = createPageMetadata({
  title: "Dama Gestor de Inquéritos 1.0.0 — Dama Universe",
  description:
    "Aplicação desktop Windows, local e offline, para cadastro e acompanhamento de inquéritos, prazos, documentos, objetos, relatórios e dados correcionais.",
  path: "/programas/dama-gestor-de-inqueritos",
});

const downloadUrl = getProgramDownloadUrl("dama-gestor-de-inqueritos");

const mainFeatures = [
  "Cadastro manual de inquéritos policiais e importação assistida de PDFs com conferência humana.",
  "Painel por cartório, delegacia, status, prazo e completude dos dados correcionais.",
  "Controle de prazos, pedidos, dilações, vencimentos e alertas locais.",
  "Gestão de documentos e juntadas com cópia segura, hash SHA-256 e controle de versões.",
  "Cadastro, movimentação e baixa lógica de objetos em cartório.",
  "Importação de planilhas correcionais nos formatos XLSX e XLSM.",
  "Relatórios operacionais e correcionais em Excel e PDF.",
  "Logs de ações, backups locais e restauração validada do banco SQLite.",
];

const modules = [
  "Configuração inicial, login e usuários",
  "Painel principal e filtros",
  "Cadastro e edição de inquéritos",
  "Importação assistida de PDF",
  "Importação de planilha correcional",
  "Prazos, pedidos e dilações",
  "Documentos, juntadas e sincronização",
  "Objetos e movimentações",
  "Relatórios Excel e PDF",
  "Backup, restauração e logs",
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
  "ReportLab",
  "Pillow",
  "plyer",
  "PyInstaller",
  "Inno Setup",
];

export default function DamaGestorDeInqueritosPage() {
  return (
    <main>
      <PageHeader
        title="Dama Gestor de Inquéritos"
        subtitle="Gestão documental, prazos, objetos e dados correcionais"
        description="Aplicação desktop Windows, local e offline, para organizar inquéritos policiais, prazos, documentos, objetos, relatórios e rotinas correcionais em uma única base."
      />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <MetallicCard variant="featured" className="p-8">
            <p className="eyebrow mb-4">Versão 1.0.0 disponível</p>

            <h2 className="title-chrome text-3xl font-black sm:text-4xl">
              Controle local de inquéritos policiais
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-muted md:text-base md:leading-8">
              <p>
                O Dama Gestor de Inquéritos centraliza o cadastro e o acompanhamento de inquéritos, prazos, documentos, juntadas, objetos, movimentações e relatórios em uma aplicação desktop para Windows.
              </p>

              <p>
                O sistema funciona localmente, utiliza banco SQLite e organiza os dados por delegacia e cartório. A importação de PDFs e planilhas é assistida e exige conferência humana antes da gravação definitiva.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <GlowButton href={downloadUrl} external variant="primary">
                Baixar versão 1.0.0
              </GlowButton>

              <GlowButton href="/programas" variant="secondary">
                Voltar aos programas
              </GlowButton>
            </div>
          </MetallicCard>

          <MetallicCard className="p-8">
            <h3 className="text-2xl font-black text-text">Resumo do programa</h3>

            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="font-bold uppercase tracking-[0.18em] text-electricLight">Status</dt>
                <dd className="mt-1 text-muted">Disponível</dd>
              </div>

              <div>
                <dt className="font-bold uppercase tracking-[0.18em] text-electricLight">Versão</dt>
                <dd className="mt-1 text-muted">1.0.0</dd>
              </div>

              <div>
                <dt className="font-bold uppercase tracking-[0.18em] text-electricLight">Plataforma</dt>
                <dd className="mt-1 text-muted">Windows 10 ou posterior</dd>
              </div>

              <div>
                <dt className="font-bold uppercase tracking-[0.18em] text-electricLight">Funcionamento</dt>
                <dd className="mt-1 text-muted">Local e offline</dd>
              </div>

              <div>
                <dt className="font-bold uppercase tracking-[0.18em] text-electricLight">Armazenamento</dt>
                <dd className="mt-1 text-muted">Banco SQLite e arquivos na pasta Documentos do usuário</dd>
              </div>
            </dl>
          </MetallicCard>
        </div>

        <div className="mb-10 grid gap-6 lg:grid-cols-3">
          <MetallicCard>
            <p className="eyebrow mb-4">Problema</p>
            <p className="text-sm leading-7 text-muted">
              O controle de inquéritos pode ficar espalhado entre planilhas, pastas, PDFs, anotações manuais e alertas informais.
            </p>
          </MetallicCard>

          <MetallicCard>
            <p className="eyebrow mb-4">Solução</p>
            <p className="text-sm leading-7 text-muted">
              Centralizar IPs, prazos, documentos, objetos, movimentações, logs e relatórios em uma aplicação local organizada por delegacia e cartório.
            </p>
          </MetallicCard>

          <MetallicCard>
            <p className="eyebrow mb-4">Regra central</p>
            <p className="text-sm leading-7 text-muted">
              O IP pertence ao cartório. Os dados e documentos permanecem preservados, e encerramentos são registrados de forma lógica e auditável.
            </p>
          </MetallicCard>
        </div>

        <div className="mb-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <MetallicCard>
            <SectionTitle
              eyebrow="Recursos"
              title="O que o sistema oferece"
              description="Principais funções disponíveis na versão 1.0.0."
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
              title="Áreas funcionais"
              description="Organização das capacidades disponíveis no aplicativo."
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
            title="Dados correcionais integrados aos fluxos do sistema"
            description="Os campos podem ser mantidos na edição dos dados principais, importados de planilhas e utilizados nos relatórios. A versão atual não apresenta uma aba correcional dedicada totalmente integrada."
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
              title="Base técnica"
              description="Tecnologias utilizadas na aplicação e na distribuição para Windows."
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
              description="Documentos são copiados para a estrutura do programa, recebem hash e não são sobrescritos automaticamente."
              className="mb-6"
            />

            <p className="text-sm leading-7 text-muted">
              O sistema mantém histórico e auditoria das operações relevantes. Arquivos duplicados ou possíveis novas versões recebem alertas para conferência antes da ação do usuário.
            </p>
          </MetallicCard>
        </div>

        <InfoNotice title="Antes de instalar" className="mb-6">
          A extração automática depende de PDFs com camada de texto e não executa OCR em documentos somente escaneados. O backup interno protege o banco SQLite, mas não substitui uma cópia segura de toda a árvore de documentos dos inquéritos.
        </InfoNotice>

        <ResponsibilityNotice>
          O Dama Gestor de Inquéritos é uma ferramenta de apoio à organização e ao controle interno. Ele não substitui a responsabilidade funcional, a conferência humana, os sistemas oficiais, as normas institucionais ou a validação final dos dados pelo usuário responsável.
        </ResponsibilityNotice>
      </section>
    </main>
  );
}
