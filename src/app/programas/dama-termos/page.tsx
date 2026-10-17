import Image from "next/image";
import type { ReactNode } from "react";

import { InfoNotice, ResponsibilityNotice, SecurityNotice } from "@/components/notices";
import { ProgramContact } from "@/components/programs/ProgramContact";
import { GlowButton, MetallicCard, SectionHeader, SectionTitle } from "@/components/ui";
import { getProgramBySlug } from "@/data/programs";
import { createPageMetadata } from "@/lib/seo";

const program = getProgramBySlug("dama-termos");

if (!program?.downloadUrl || !program.alternativeDownload || !program.previewImage) {
  throw new Error("Dados de apresentação e downloads do Dama Termos não encontrados.");
}

const { downloadUrl, downloadLabel, alternativeDownload, previewImage, installerName, downloadSize } = program;

export const metadata = createPageMetadata({
  title: "Dama Termos 1.0.0 para Windows — Dama Universe",
  description:
    "Conheça o Dama Termos 1.0.0: preencha o Termo de Adesão ao Programa MS Acolhe e Protege, confira até cinco plantões e gere PDF com assinatura visual opcional. Downloads e manual rápido.",
  path: "/programas/dama-termos",
});

const features = [
  { title: "Preenchimento organizado", text: "Nome, matrícula, cargo, lotação e até cinco plantões reunidos em uma única tela." },
  { title: "Cadastro local opcional", text: "Reutilize os dados básicos do servidor com sua autorização, sem conta online ou login." },
  { title: "Datas com formatação automática", text: "A digitação numérica é convertida para DD/MM/AAAA: 10102026 torna-se 10/10/2026." },
  { title: "Facilidades nos plantões", text: "Aplique um local comum e insira várias datas de uma só vez, uma por linha." },
  { title: "Assinatura visual opcional", text: "Digite um nome em estilo manuscrito, desenhe, importe uma imagem ou gere sem assinatura. Quando aplicada, a representação recebe data e hora locais." },
  { title: "Pré-visualização e geração de PDF", text: "Confira os dados antes de salvar e escolha a pasta e o nome do arquivo." },
  { title: "Apoio ao encaminhamento", text: "Consulte os destinatários previstos no modelo, copie os endereços e prepare a mensagem. O programa não envia e-mails automaticamente." },
  { title: "Funcionamento local", text: "Preenchimento, PDFs e cadastro opcional funcionam sem internet. E-mail e serviços externos de assinatura eletrônica dependem de conexão quando utilizados." },
];

const information = [
  ["Programa", "Dama Termos"],
  ["Versão", "1.0.0"],
  ["Plataforma", "Windows"],
  ["Instalador", installerName],
  ["Tamanho do instalador", downloadSize],
  ["Internet para preenchimento e geração de PDF", "Não necessária"],
  ["Cadastro online", "Não necessário"],
  ["Assinatura visual", "Opcional"],
  ["Desenvolvedor", "Marco Aurélio Pereira Barbosa"],
  ["Identidade", "Dama Universe"],
];

const listClass = "list-decimal space-y-3 pl-5";
const bulletClass = "list-disc space-y-3 pl-5";

const manual: { id: string; title: string; content: ReactNode }[] = [
  {
    id: "instalacao",
    title: "Instalação",
    content: <>
      <ol className={listClass}>
        <li>Baixe o instalador ou o ZIP pelos botões desta página.</li>
        <li>Se utilizar o ZIP, extraia seu conteúdo.</li>
        <li>Localize <code className="break-all text-chromeLight">DamaTermos_Setup_1.0.0.exe</code>.</li>
        <li>Confira a procedência do arquivo e eventuais avisos de segurança do Windows.</li>
        <li>Execute o instalador e siga suas instruções.</li>
        <li>Abra o Dama Termos pelo atalho criado.</li>
      </ol>
      <p className="mt-5">Não é necessário instalar Python ou ferramentas de programação. Mantenha as proteções do Windows ativadas.</p>
    </>,
  },
  {
    id: "dados-do-servidor",
    title: "Dados do servidor",
    content: <>
      <p>Preencha nome completo, matrícula, cargo e lotação.</p>
      <p className="mt-4">Para reutilizar os dados, abra <strong>Meu cadastro</strong>, autorize o armazenamento local e selecione <strong>Salvar meus dados</strong>. O cadastro é opcional e fica no perfil do usuário do Windows.</p>
    </>,
  },
  {
    id: "plantoes",
    title: "Plantões",
    content: <>
      <p className="mb-4">É possível registrar até cinco plantões por termo.</p>
      <ul className={bulletClass}>
        <li><strong>Aplicar local:</strong> preenche o local comum nos cinco campos correspondentes.</li>
        <li><strong>Inserir várias datas:</strong> permite informar várias datas, uma por linha.</li>
        <li><strong>Formatação automática:</strong> <code>10102026</code> torna-se <code>10/10/2026</code>.</li>
      </ul>
      <p className="mt-5">Uma linha sem data não será considerada plantão realizado somente por ter recebido um local automaticamente.</p>
    </>,
  },
  {
    id: "fechamento",
    title: "Fechamento do termo",
    content: <p>Confira município, UF e data do termo. A data atual do computador é sugerida e pode ser modificada.</p>,
  },
  {
    id: "assinatura",
    title: "Assinatura opcional",
    content: <>
      <p className="mb-4">Em <strong>Assinatura (opcional)</strong>, escolha:</p>
      <ul className={bulletClass}>
        <li>Sem assinatura.</li>
        <li>Digitar um nome em estilo manuscrito.</li>
        <li>Desenhar.</li>
        <li>Importar imagem PNG ou JPG.</li>
      </ul>
      <p className="mt-5">A representação visual é incorporada ao PDF com data e hora locais, sem equivaler, por si só, a assinatura digital certificada.</p>
      <p className="mt-4">Se necessário, o PDF poderá ser posteriormente assinado por serviço eletrônico apropriado, conforme as exigências do destinatário. A aceitação depende das exigências aplicáveis.</p>
    </>,
  },
  {
    id: "conferencia-e-pdf",
    title: "Conferência e PDF",
    content: <>
      <ol className={listClass}>
        <li>Selecione <strong>Validar preenchimento</strong>.</li>
        <li>Use <strong>Pré-visualizar PDF</strong> para conferir o resultado.</li>
        <li>Selecione <strong>Gerar PDF</strong>.</li>
        <li>Escolha a pasta e o nome do arquivo.</li>
        <li>Confirme o salvamento.</li>
      </ol>
      <p className="mt-5">Segundo o modelo informado pelo desenvolvedor, o documento gerado tem duas páginas. Alterações posteriores no formulário não modificam um PDF já salvo.</p>
    </>,
  },
  {
    id: "encaminhamento",
    title: "Encaminhamento",
    content: <>
      <p>Após salvar, o aplicativo oferece recursos para abrir o PDF, localizar sua pasta, copiar os endereços e preparar uma mensagem de e-mail, com alternativa de cópia das informações para webmail.</p>
      <p className="mt-4">Destinatários cadastrados no modelo informado:</p>
      <ul className={`${bulletClass} mt-4 break-all font-mono text-chromeLight`}>
        <li>plantao180@pc.ms.gov.br</li>
        <li>depac@pc.ms.gov.br</li>
      </ul>
      <p className="mt-5 font-semibold text-goldSoft">São destinatários do termo, não canais de suporte da Dama Universe.</p>
      <p className="mt-4">Confira os destinatários e as orientações aplicáveis, conclua eventual assinatura, anexe o PDF final e realize o envio pelo serviço de e-mail utilizado. O aplicativo não envia e-mails automaticamente.</p>
    </>,
  },
  {
    id: "cadastro-e-privacidade",
    title: "Cadastro e privacidade",
    content: <ul className={bulletClass}>
      <li>Não exige login ou cadastro online.</li>
      <li>O armazenamento dos dados básicos depende de autorização.</li>
      <li>O cadastro pode ser recuperado, atualizado ou apagado em <strong>Meu cadastro</strong>.</li>
      <li>Datas e locais dos plantões não são armazenados nesse cadastro.</li>
      <li>A assinatura visual não é armazenada permanentemente por padrão.</li>
      <li>Em computadores compartilhados, recomenda-se utilizar o programa sem salvar dados pessoais.</li>
    </ul>,
  },
];

function DownloadButtons() {
  return <div className="flex flex-wrap gap-3">
    <GlowButton href={downloadUrl} external variant="primary">{downloadLabel}</GlowButton>
    <GlowButton href={alternativeDownload.url} external variant="secondary">{alternativeDownload.label}</GlowButton>
  </div>;
}

export default function DamaTermosPage() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <section className="page-section-tight">
        <div className="container-site space-y-10">
          <SectionHeader
            eyebrow="Lançamento · Dama Universe · Windows"
            title="Conheça o Dama Termos 1.0"
            description="Preenchimento inteligente. Documentos organizados. Mais praticidade no seu dia a dia."
          />

          <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <MetallicCard className="space-y-5">
              <p className="body-text">O Dama Universe apresenta o Dama Termos, um aplicativo para Windows desenvolvido para tornar o preenchimento e a geração de documentos mais simples, rápidos e organizados.</p>
              <p className="body-text-sm">Com uma interface moderna e intuitiva, reúne em um único ambiente o preenchimento de informações, a conferência dos dados, a assinatura visual opcional e a geração de documentos em PDF.</p>
              <p className="text-sm text-electricLight">Versão 1.0.0 · Criado e desenvolvido por Marco Aurélio Pereira Barbosa.</p>
              <GlowButton href="#como-usar" variant="ghost">Consultar o manual rápido</GlowButton>
            </MetallicCard>
            <MetallicCard variant="featured" className="space-y-5">
              <h2 className="text-2xl font-black text-text">Baixe para Windows</h2>
              <DownloadButtons />
              <p className="text-sm leading-7 text-muted">Downloads pelo Google Drive. O ZIP contém o instalador e deve ser extraído antes da instalação; não é uma versão portátil.</p>
              <p className="break-all font-mono text-xs leading-6 text-chromeLight">{installerName}</p>
              <p className="text-xs leading-6 text-muted">{downloadSize}, conforme informação fornecida pelo desenvolvedor.</p>
              <p className="text-xs leading-6 text-muted">O Google Drive pode apresentar um aviso de verificação do instalador. Confira a procedência do arquivo.</p>
            </MetallicCard>
          </div>

          <figure className="overflow-hidden rounded-2xl border border-borderSoft bg-surface">
            <a href={previewImage.src} target="_blank" rel="noopener noreferrer" aria-label="Ampliar captura da interface do Dama Termos" className="block focus-ring">
              <Image {...previewImage} alt={previewImage.alt} sizes="(max-width: 1180px) 100vw, 1180px" priority className="h-auto w-full object-contain" />
            </a>
            <figcaption className="space-y-2 p-5 text-sm leading-7 text-muted">
              <p>Captura da interface fornecida pelo desenvolvedor, com valores de preenchimento ocultados. Abra a imagem para ampliar os controles no celular.</p>
              <p className="text-xs text-mutedSoft">A captura fornecida registra uma versão de desenvolvimento no rodapé; a versão de lançamento apresentada nesta página é a 1.0.0.</p>
            </figcaption>
          </figure>

          <section aria-labelledby="modelo-title" className="space-y-6">
            <h2 id="modelo-title" className="text-2xl font-black text-text sm:text-3xl">Primeiro modelo disponível: MS Acolhe e Protege</h2>
            <p className="body-text-sm">Esta primeira versão é dedicada ao preenchimento do <strong>Termo de Adesão ao Programa MS Acolhe e Protege</strong>. Permite informar os dados do servidor e registrar até cinco plantões, com datas e locais. O PDF preserva o modelo institucional utilizado pelo aplicativo, incluindo cabeçalho, estrutura, tabela e rodapé.</p>
            <InfoNotice>O aplicativo foi planejado para receber novos modelos em versões futuras. Essa possibilidade não indica modelos adicionais já disponíveis ou prazo de lançamento.</InfoNotice>
            <ResponsibilityNotice>O Dama Termos é uma ferramenta independente de apoio ao preenchimento e à geração de documentos. Não constitui software oficial da Polícia Civil ou do Governo do Estado de Mato Grosso do Sul.</ResponsibilityNotice>
          </section>

          <section aria-label="Funcionalidades" className="space-y-7">
            <SectionTitle title="O que você pode fazer" description="Do preenchimento à conferência, com apoio à preparação do documento final." />
            <div className="grid gap-5 md:grid-cols-2">{features.map((feature) => (
              <MetallicCard key={feature.title}>
                <h3 className="text-xl font-bold text-text">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted">{feature.text}</p>
              </MetallicCard>
            ))}</div>
          </section>

          <section aria-label="Informações do programa" className="space-y-7">
            <SectionTitle title="Dama Termos em resumo" />
            <MetallicCard>
              <dl className="grid gap-x-8 gap-y-5 md:grid-cols-2">{information.map(([label, value]) => (
                <div key={label} className="min-w-0 border-b border-border pb-4">
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="mt-2 break-words font-semibold text-chromeLight [overflow-wrap:anywhere]">{value}</dd>
                </div>
              ))}</dl>
              <p className="mt-5 text-xs leading-6 text-muted">O tamanho aproximado foi informado pelo desenvolvedor. Serviços externos de e-mail e assinatura eletrônica precisam de conexão quando utilizados.</p>
            </MetallicCard>
          </section>

          <section id="como-usar" className="scroll-mt-24 space-y-7" aria-label="Manual rápido">
            <SectionTitle title="Como usar o Dama Termos" description="Abra cada etapa para consultar as orientações. Confira os dados e as exigências do destinatário antes de encaminhar o PDF." />
            <div className="space-y-4">{manual.map((step, index) => (
              <details key={step.id} id={`manual-${step.id}`} open={index === 0} className="rounded-2xl border border-borderSoft bg-surface">
                <summary className="min-h-11 cursor-pointer rounded-2xl px-5 py-5 text-lg font-bold text-chromeLight focus-ring sm:px-6">
                  <span className="mr-3 text-sm text-electricLight">{String(index + 1).padStart(2, "0")}</span>{step.title}
                </summary>
                <div className="border-t border-border px-5 py-6 text-sm leading-7 text-muted sm:px-6">{step.content}</div>
              </details>
            ))}</div>
          </section>

          <SecurityNotice>As assinaturas visuais inseridas pelo aplicativo não equivalem, por si só, a assinaturas digitais certificadas. O documento poderá ser posteriormente assinado por meio de serviço eletrônico apropriado, conforme as exigências aplicáveis.</SecurityNotice>

          <MetallicCard variant="featured" className="space-y-5">
            <h2 className="text-2xl font-black text-text">Prepare seu termo com o Dama Termos</h2>
            <DownloadButtons />
            <p className="text-sm leading-7 text-muted">O ZIP contém o mesmo instalador para Windows. Para dúvidas sobre o aplicativo, utilize o suporte da Dama Universe abaixo.</p>
          </MetallicCard>

          <div className="space-y-3 text-sm leading-7 text-muted">
            <p className="font-semibold text-text">Dama Termos — Dama Universe</p>
            <p>Criado e desenvolvido por Marco Aurélio Pereira Barbosa.</p>
            <p>© 2026 Marco Aurélio Pereira Barbosa. Todos os direitos reservados.</p>
          </div>
        </div>
      </section>
      <ProgramContact />
    </main>
  );
}
