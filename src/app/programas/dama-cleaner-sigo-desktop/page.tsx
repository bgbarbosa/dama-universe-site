import Image from "next/image";

import { createPageMetadata } from "@/lib/seo";
import { ResponsibilityNotice, SecurityNotice } from "@/components/notices";
import {
  GlowButton,
  MetallicCard,
  SectionHeader,
  SectionTitle,
} from "@/components/ui";

const downloadUrl =
  "https://drive.google.com/file/d/1cLprfcL_ZfLixQvXguYGuNo_tas6t_vI/view?usp=sharing";

const features = [
  "Limpeza local de cache e arquivos temporários do SIGO Desktop.",
  "Atuação focada na pasta local do usuário em %APPDATA%\SIGO Desktop.",
  "Preservação de Preferences, Local State e Local Storage.",
  "Remoção de pastas temporárias como Cache, Code Cache, GPUCache, logs, Crashpad, Network, Session Storage e Storage.",
  "Remoção dos arquivos .updaterId e lockfile quando possível.",
  "Execução simples pelo usuário, com confirmação por ENTER.",
  "Resultado individual por item, com indicação OK ou PARCIAL.",
  "Janela mantida aberta ao final para conferência do resultado.",
  "Geração de log local para conferência técnica posterior.",
  "Distribuição por instalador Windows via Inno Setup, com ícone personalizado e atalhos.",
];

const preservedItems = [
  "Preferences",
  "Local State",
  "Local Storage",
];

const cleanedItems = [
  "blob_storage",
  "Cache",
  "Code Cache",
  "Crashpad",
  "GPUCache",
  "logs",
  "Network",
  "sentry",
  "Session Storage",
  "Storage",
  ".updaterId",
  "lockfile",
];

const workflow = [
  {
    title: "1. Finalizar SIGO",
    text: "Antes da limpeza, o usuário deve finalizar completamente a sessão do SIGO Desktop, preferencialmente pela barra do Windows.",
  },
  {
    title: "2. Abrir Cleaner",
    text: "O usuário executa o atalho Dama Cleaner - SIGO Desktop criado na Área de Trabalho ou no Menu Iniciar.",
  },
  {
    title: "3. Confirmar execução",
    text: "A ferramenta exibe a pasta alvo, os avisos de segurança e inicia a limpeza somente após o usuário pressionar ENTER.",
  },
  {
    title: "4. Conferir resultado",
    text: "Ao final, o usuário verifica os status OK ou PARCIAL e pode consultar o log local em Documentos\Dama Cleaner SIGO.",
  },
];

const technicalItems = [
  "BAT puro",
  "Inno Setup",
  "Windows 10/11",
  "AppData/Roaming",
  "Log local",
  "Execução offline",
];

export const metadata = createPageMetadata({
  title: "Dama Cleaner - SIGO Desktop — Dama Universe",
  description:
    "Utilitário Windows para limpeza local de cache, arquivos temporários, logs e dados de sessão do SIGO Desktop.",
  path: "/programas/dama-cleaner-sigo-desktop",
});

export default function DamaCleanerSigoDesktopPage() {
  return (
    <main className="bg-dama-radial">
      <section className="page-section-tight">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <SectionHeader
              eyebrow="Programa disponível"
              title="Dama Cleaner - SIGO Desktop"
              description="Utilitário desktop para limpeza local de cache, arquivos temporários, logs e dados de sessão do SIGO Desktop, com execução simples, conferência visual do resultado e preservação de arquivos sensíveis de configuração."
            />

            <MetallicCard variant="featured">
              <div className="mb-7 flex items-center gap-5">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-gold/45 bg-background/60 p-2 shadow-[0_0_40px_rgba(214,167,47,0.28)]">
                  <Image
                    src="/images/programs/dama-cleaner-sigo.png"
                    alt="Ícone do Dama Cleaner - SIGO Desktop"
                    width={96}
                    height={96}
                    className="h-full w-full rounded-2xl object-contain"
                    priority
                  />
                </div>

                <div>
                  <p className="eyebrow mb-2 text-goldSoft">Resumo</p>
                  <h2 className="text-2xl font-black text-text">
                    Limpeza local segura e rastreável
                  </h2>
                </div>
              </div>

              <dl className="grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-[0.24em] text-mutedSoft">
                    Versão
                  </dt>
                  <dd className="mt-1 font-bold text-text">1.7.0</dd>
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
                  <dd className="mt-1 font-bold text-text">Utilitário desktop</dd>
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
                  Baixar instalador
                </GlowButton>
                <GlowButton href="/contato" variant="secondary">
                  Enviar sugestão
                </GlowButton>
              </div>

              <p className="mt-5 text-sm leading-7 text-mutedSoft">
                O download é feito pelo Google Drive. Antes de executar, finalize
                completamente a sessão do SIGO Desktop e confira o resultado ao final.
              </p>
            </MetallicCard>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-site space-y-8">
          <MetallicCard>
            <SectionTitle
              title="O que é o Dama Cleaner - SIGO Desktop"
              description="Ferramenta auxiliar para reduzir uma rotina manual, repetitiva e sujeita a erro, transformando a limpeza local do SIGO Desktop em uma execução orientada, padronizada e rastreável."
              className="mb-6"
            />

            <div className="space-y-5 text-sm leading-7 text-muted md:text-base md:leading-8">
              <p>
                O Dama Cleaner - SIGO Desktop foi criado para apoiar a limpeza
                de arquivos temporários, cache, logs e dados de sessão do SIGO
                Desktop quando houver lentidão, dificuldade para carregar arquivos
                ou comportamento instável relacionado ao armazenamento local.
              </p>

              <p>
                A ferramenta atua somente no perfil local do usuário do Windows,
                normalmente em <strong className="text-chromeLight">%APPDATA%\SIGO Desktop</strong>,
                preservando arquivos de configuração e preferência considerados sensíveis.
              </p>
            </div>
          </MetallicCard>

          <ResponsibilityNotice>
            O Dama Cleaner - SIGO Desktop é uma ferramenta auxiliar. Ele não
            substitui o SIGO Desktop, não altera sua lógica interna, não acessa
            banco de dados externo, não coleta credenciais e não substitui suporte
            técnico institucional.
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
                    <span className="mr-2 text-goldSoft">•</span>
                    {feature}
                  </div>
                ))}
              </div>
            </MetallicCard>

            <div className="space-y-8">
              <MetallicCard variant="notice">
                <p className="eyebrow mb-4 text-electricLight">Resultado</p>
                <h2 className="text-2xl font-black text-text">OK ou PARCIAL</h2>
                <p className="body-text-sm mt-4">
                  Ao final da execução, a ferramenta exibe o resultado de cada
                  item. OK indica limpeza confirmada. PARCIAL indica que algum
                  arquivo ainda pode estar em uso e que a limpeza deve ser repetida
                  após finalizar completamente o SIGO Desktop.
                </p>
              </MetallicCard>

              <SecurityNotice>
                Antes da limpeza, finalize completamente a sessão do SIGO Desktop.
                A ferramenta não força encerramento automático do sistema para
                preservar a segurança operacional do usuário.
              </SecurityNotice>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <MetallicCard>
              <SectionTitle title="Itens limpos" className="mb-6" />
              <div className="flex flex-wrap gap-3">
                {cleanedItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-electric/30 bg-electric/10 px-4 py-2 text-sm font-semibold text-electricLight"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </MetallicCard>

            <MetallicCard>
              <SectionTitle title="Itens preservados" className="mb-6" />
              <p className="body-text-sm mb-5">
                A versão estável preserva arquivos e pastas sensíveis para reduzir
                risco de perda de configuração local.
              </p>
              <div className="flex flex-wrap gap-3">
                {preservedItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-gold/35 bg-gold/10 px-4 py-2 text-sm font-semibold text-goldSoft"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </MetallicCard>
          </div>

          <MetallicCard>
            <SectionTitle
              title="Fluxo correto de uso"
              description="A ferramenta foi pensada para ser simples, mas com uma sequência segura de execução."
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
              <SectionTitle title="Arquitetura técnica" className="mb-6" />
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
                Baixar Dama Cleaner - SIGO Desktop 1.7.0
              </h2>
              <p className="body-text-sm mt-4">
                A versão 1.7.0 foi consolidada como base estável, com execução em
                BAT puro, instalador Windows, ícone personalizado, resultado
                conferível e log local.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <GlowButton href={downloadUrl} external variant="primary">
                  Baixar pelo Google Drive
                </GlowButton>
                <GlowButton href="/programas" variant="secondary">
                  Ver outros programas
                </GlowButton>
              </div>
            </MetallicCard>
          </div>
        </div>
      </section>
    </main>
  );
}
