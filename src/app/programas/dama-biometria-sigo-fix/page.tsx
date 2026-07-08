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
  "https://drive.usercontent.google.com/download?id=1y0pRu7YeazLrSYFq2Sf0rgtrgMkh48rh&export=download";

const features = [
  "Correção automática recomendada para problemas comuns de biometria e assinatura.",
  "Diagnóstico de Java/Nitgen com identificação de arquitetura 32/64 bits.",
  "Verificação da DLL NBioBSPJNI.dll usada pelo ambiente biométrico.",
  "Instalação local de Java quando os instaladores autorizados estiverem no pacote.",
  "Reaplicação de bibliotecas de assinatura e biometria a partir do pacote validado.",
  "Reparo seguro do driver HFDU06/Nitgen, sem remover dispositivo que já esteja OK.",
  "Backup antes da substituição de arquivos relevantes.",
  "Painel de log para acompanhar o andamento da execução.",
  "Log salvo para apoio em suporte e análise posterior.",
  "Orientação para abrir o SIGO pelo atalho normal/original após a correção.",
];

const workflow = [
  {
    title: "1. Fechar o SIGO",
    text: "Antes da correção, feche completamente o SIGO Desktop para evitar bloqueios durante os reparos.",
  },
  {
    title: "2. Abrir como administrador",
    text: "Execute o Dama Biometria SIGO Fix com permissão de administrador quando o Windows solicitar confirmação.",
  },
  {
    title: "3. Correção automática",
    text: "Use primeiro a opção Correção Automática Recomendada e acompanhe o painel de log até a conclusão.",
  },
  {
    title: "4. Testar assinatura",
    text: "Abra o SIGO pelo atalho normal/original e faça um teste real de assinatura biométrica.",
  },
];

const technicalItems = [
  "Windows",
  "Python",
  "PyInstaller",
  "Inno Setup",
  "Java 8 x86/x64",
  "Nitgen JNI",
  "HFDU06",
  "Logs em ProgramData",
  "Backup prévio",
  "Execução guiada",
];

const problemItems = [
  "Erro ao carregar biblioteca",
  "Biometria não inicia",
  "Falha de assinatura",
  "Java incompatível",
  "DLL Nitgen 32/64 bits",
  "Driver biométrico inconsistente",
];

const outOfScopeItems = [
  "Não reinstala o SIGO Desktop.",
  "Não altera regras de negócio do SIGO.",
  "Não acessa banco de dados do SIGO.",
  "Não corrige servidor, rede, autenticação ou permissões internas.",
  "Não modifica peças, documentos, ocorrências, usuários ou conteúdo operacional.",
  "Não substitui suporte oficial, equipe de TI ou contrato de manutenção.",
];

export const metadata = createPageMetadata({
  title: "Dama Biometria SIGO Fix — Dama Universe",
  description:
    "Ferramenta Windows independente para auxiliar na correção de falhas locais de biometria, assinatura, Java e componentes relacionados ao uso do SIGO Desktop.",
  path: "/programas/dama-biometria-sigo-fix",
});

export default function DamaBiometriaSigoFixPage() {
  return (
    <main className="bg-dama-radial">
      <section className="page-section-tight">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <SectionHeader
              eyebrow="Programa disponível"
              title="Dama Biometria SIGO Fix"
              description="Ferramenta Windows independente de apoio ao usuário para corrigir problemas locais recorrentes de Java, biometria, assinatura e componentes relacionados ao uso do SIGO Desktop."
            />

            <MetallicCard variant="featured">
              <div className="mb-7 flex items-center gap-5">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-gold/45 bg-background/60 p-2 shadow-[0_0_40px_rgba(214,167,47,0.28)]">
                  <Image
                    src="/images/programs/dama-biometria-sigo-fix.png"
                    alt="Ícone do Dama Biometria SIGO Fix"
                    width={96}
                    height={96}
                    className="h-full w-full rounded-2xl object-contain"
                    priority
                  />
                </div>

                <div>
                  <p className="eyebrow mb-2 text-goldSoft">Resumo</p>
                  <h2 className="text-2xl font-black text-text">
                    Correção guiada de biometria e assinatura
                  </h2>
                </div>
              </div>

              <dl className="grid gap-5 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-[0.24em] text-mutedSoft">
                    Versão
                  </dt>
                  <dd className="mt-1 font-bold text-text">1.0.0</dd>
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
                  <dd className="mt-1 font-bold text-text">
                    Utilitário desktop
                  </dd>
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
                  Solicitar suporte
                </GlowButton>
              </div>

              <p className="mt-5 text-sm leading-7 text-mutedSoft">
                O download é feito pelo Google Drive. Execute o instalador e o
                programa com permissão de administrador e use primeiro a Correção
                Automática Recomendada.
              </p>
            </MetallicCard>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-site space-y-8">
          <MetallicCard className="border-2 border-red-500/70 bg-red-950/20 shadow-[0_0_55px_rgba(239,68,68,0.28)]">
            <p className="eyebrow mb-4 text-red-300">
              Declaração essencial de independência
            </p>
            <h2 className="text-2xl font-black text-text">
              Ferramenta independente e não oficial
            </h2>
            <p className="mt-5 text-sm leading-7 text-chromeLight md:text-base md:leading-8">
              O Dama Biometria SIGO Fix não é ferramenta oficial do SIGO, não é
              produto institucional do SIGO e não substitui suporte oficial,
              equipe de TI, mantenedores do sistema ou qualquer contrato de
              manutenção. Trata-se de uma ferramenta independente, criada para
              ajudar o usuário a corrigir problemas locais recorrentes de Java,
              biometria, assinatura e componentes relacionados ao uso do SIGO
              Desktop.
            </p>
          </MetallicCard>

          <MetallicCard>
            <SectionTitle
              title="O que é o Dama Biometria SIGO Fix"
              description="Uma ferramenta de apoio para transformar correções técnicas complexas em um fluxo guiado, simples e mais seguro para o usuário final."
              className="mb-6"
            />

            <div className="space-y-5 text-sm leading-7 text-muted md:text-base md:leading-8">
              <p>
                O Dama Biometria SIGO Fix foi criado para auxiliar usuários do
                SIGO Desktop quando ocorrem falhas locais ligadas à biometria, à
                assinatura, ao Java, às bibliotecas Nitgen e ao reconhecimento do
                leitor biométrico.
              </p>

              <p>
                A proposta é reduzir tentativas manuais, comandos técnicos e
                diagnósticos complexos. O usuário executa a ferramenta, acompanha
                o log, aguarda a conclusão e depois abre o SIGO pelo atalho
                normal/original para testar a assinatura biométrica.
              </p>
            </div>
          </MetallicCard>

          <ResponsibilityNotice>
            O Dama Biometria SIGO Fix é uma ferramenta auxiliar e independente.
            Ele não reinstala o SIGO Desktop, não acessa banco de dados do SIGO,
            não altera regras de negócio e não garante funcionamento em versões
            futuras caso a arquitetura interna do sistema seja alterada.
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
                <p className="eyebrow mb-4 text-electricLight">
                  Opção principal
                </p>
                <h2 className="text-2xl font-black text-text">
                  Correção Automática Recomendada
                </h2>
                <p className="body-text-sm mt-4">
                  Essa é a primeira opção a ser usada. Ela concentra o fluxo
                  normal de correção e deve ser tentada antes da correção
                  avançada ou de opções específicas de assinatura.
                </p>
              </MetallicCard>

              <SecurityNotice>
                Antes de executar, feche o SIGO Desktop, conecte o leitor
                biométrico em uma porta USB estável e aguarde o término da
                correção. Não interrompa a execução no meio do processo.
              </SecurityNotice>
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <MetallicCard>
              <SectionTitle title="Problemas que busca auxiliar" className="mb-6" />
              <div className="flex flex-wrap gap-3">
                {problemItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-red-400/35 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </MetallicCard>

            <MetallicCard>
              <SectionTitle title="Fora do escopo" className="mb-6" />
              <div className="grid gap-3">
                {outOfScopeItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-border bg-backgroundSoft/80 p-4 text-sm leading-6 text-muted"
                  >
                    <span className="mr-2 text-red-300">•</span>
                    {item}
                  </div>
                ))}
              </div>
            </MetallicCard>
          </div>

          <MetallicCard>
            <SectionTitle
              title="Fluxo recomendado de uso"
              description="O uso normal foi pensado para ser objetivo: fechar o SIGO, executar a ferramenta, acompanhar o log e testar a assinatura."
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
              <SectionTitle title="Arquitetura e componentes" className="mb-6" />
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
                Baixar Dama Biometria SIGO Fix 1.0.0
              </h2>
              <p className="body-text-sm mt-4">
                A versão de lançamento foi preparada para distribuição ao usuário
                final por instalador/EXE, com interface guiada, painel de log,
                correção automática recomendada e orientação de teste pelo SIGO
                original.
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
