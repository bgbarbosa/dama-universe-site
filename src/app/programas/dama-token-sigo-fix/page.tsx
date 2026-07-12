import Image from "next/image";

import { createPageMetadata } from "@/lib/seo";
import { ResponsibilityNotice, SecurityNotice } from "@/components/notices";
import {
  GlowButton,
  MetallicCard,
  SectionHeader,
  SectionTitle,
} from "@/components/ui";
import { getProgramDownloadUrl } from "@/data";

const downloadUrl = getProgramDownloadUrl("dama-token-sigo-fix");

const mainBenefits = [
  "Correção guiada de falhas de assinatura por token no SIGO Desktop.",
  "Auxílio quando o SIGO fica travado aguardando token.",
  "Apoio quando o Windows reconhece o token, mas o SIGO não valida ou não assina.",
  "Preparação do ambiente local para novos modelos de token e providers PKCS#11.",
  "Verificação de Java, drivers, docsigner-cli e processos que podem prender o token.",
  "Criação de atalho corrigido para abrir o SIGO com ambiente adequado, somente quando aprovado.",
];

const situations = [
  "SIGO fica em 'Aguardando token'.",
  "O botão de validar token não reconhece o certificado.",
  "O token aparece no Windows, mas não é reconhecido pelo SIGO.",
  "O docsigner-cli retorna TOKEN_NOT_FOUND.",
  "Provider PKCS#11 não carrega corretamente.",
  "Há conflito entre SafeSign, StarSign, SafeNet, eToken ou ePass.",
];

const workflow = [
  {
    title: "1. Conectar o token correto",
    text: "Conecte apenas o token que será usado na assinatura para evitar confusão na identificação do certificado.",
  },
  {
    title: "2. Executar a correção",
    text: "Abra o Dama Token SIGO Fix e use primeiro o botão Corrigir Assinatura por Token.",
  },
  {
    title: "3. Seguir a orientação",
    text: "O programa verifica SIGO, docsigner-cli, Java, drivers, providers e processos que podem prender o token.",
  },
  {
    title: "4. Usar o atalho corrigido",
    text: "Quando o ambiente estiver aprovado, use o atalho criado para abrir o SIGO em modo adequado para assinatura.",
  },
];

const technicalItems = [
  "SIGO Desktop",
  "docsigner-cli",
  "Java 8 x64",
  "PKCS#11",
  "SafeSign/StarSign",
  "SafeNet/eToken",
  "ePass/Feitian",
  "Atalho corrigido",
  "Relatório de suporte",
];

const safetyRules = [
  "Não salva PIN.",
  "Não copia certificados.",
  "Não exporta chaves privadas.",
  "Não assina documentos por conta própria.",
  "Não altera o token.",
  "Não substitui suporte oficial, equipe de TI ou contrato de manutenção.",
];

export const metadata = createPageMetadata({
  title: "Dama Token SIGO Fix — Dama Universe",
  description:
    "Ferramenta Windows independente para correção guiada de falhas locais de assinatura por token no SIGO Desktop.",
  path: "/programas/dama-token-sigo-fix",
});

export default function DamaTokenSigoFixPage() {
  return (
    <main className="bg-dama-radial">
      <section className="page-section-tight">
        <div className="container-site">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <SectionHeader
              eyebrow="Programa disponível"
              title="Dama Token SIGO Fix"
              description="Ferramenta independente para correção guiada de falhas locais relacionadas à assinatura por token no SIGO Desktop, com foco em Java, drivers, providers PKCS#11 e abertura corrigida do sistema."
            />

            <MetallicCard variant="featured">
              <div className="mb-7 flex items-center gap-5">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-3xl border border-gold/45 bg-background/60 p-2 shadow-[0_0_42px_rgba(214,167,47,0.35)]">
                  <Image
                    src="/images/programs/dama-token-sigo-fix.png"
                    alt="Ícone do Dama Token SIGO Fix"
                    width={96}
                    height={96}
                    className="h-full w-full rounded-2xl object-contain"
                    priority
                  />
                </div>

                <div>
                  <p className="eyebrow mb-2 text-goldSoft">Resumo</p>
                  <h2 className="text-2xl font-black text-text">
                    Assinatura por token com ambiente corrigido
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
                O download é feito pelo Google Drive. Após a instalação, conecte
                apenas o token que será usado e siga as orientações exibidas na tela.
              </p>
            </MetallicCard>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-site space-y-8">
          <MetallicCard variant="featured" className="border-gold/60 shadow-[0_0_55px_rgba(214,167,47,0.22)]">
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
              <div className="mx-auto flex max-w-[320px] items-center justify-center overflow-hidden rounded-[2rem] border border-gold/40 bg-background/70 p-3 shadow-[0_0_45px_rgba(36,255,122,0.18)]">
                <Image
                  src="/images/programs/dama-token-sigo-fix-original.png"
                  alt="Emblema do Dama Token SIGO Fix"
                  width={360}
                  height={360}
                  className="h-auto w-full rounded-[1.5rem] object-contain"
                />
              </div>

              <div>
                <p className="eyebrow mb-4 text-goldSoft">Lançamento</p>
                <h2 className="text-3xl font-black text-text md:text-4xl">
                  Correção guiada para assinatura por token no SIGO Desktop
                </h2>
                <div className="mt-5 space-y-5 text-sm leading-7 text-muted md:text-base md:leading-8">
                  <p>
                    O Dama Token SIGO Fix foi desenvolvido para auxiliar em uma
                    falha recorrente: o SIGO funciona normalmente, mas no momento
                    de validar ou assinar com token ocorre travamento, demora
                    excessiva, falha de reconhecimento ou mensagem de token não
                    encontrado.
                  </p>
                  <p>
                    Essa instabilidade aparece principalmente com novos modelos de
                    token, que podem usar drivers e providers diferentes dos modelos
                    antigos. Em alguns computadores, o Windows reconhece o token,
                    mas o assinador do SIGO não consegue carregar corretamente os
                    componentes necessários para concluir a assinatura.
                  </p>
                  <p>
                    A ferramenta prepara o ambiente local, verifica Java, drivers,
                    componentes de assinatura, processos que podem prender o token e,
                    quando o ambiente está correto, cria um atalho corrigido para
                    abrir o SIGO de forma mais estável.
                  </p>
                </div>
              </div>
            </div>
          </MetallicCard>

          <ResponsibilityNotice>
            <strong>Ferramenta independente e não oficial.</strong> O Dama Token
            SIGO Fix não é ferramenta oficial do SIGO, não é produto institucional
            do SIGO e não substitui suporte oficial, equipe de TI, mantenedores do
            sistema ou qualquer contrato de manutenção. Trata-se de uma ferramenta
            independente, criada para ajudar o usuário a corrigir problemas locais
            recorrentes de Java, assinatura por token, providers PKCS#11,
            SafeSign/StarSign, SafeNet/eToken/Aladdin e componentes relacionados ao
            uso do SIGO Desktop.
          </ResponsibilityNotice>

          <SecurityNotice>
            O programa não salva PIN, não copia certificados, não exporta chaves
            privadas, não assina documentos por conta própria e não altera o token.
            Ele apenas prepara o ambiente local para que o próprio assinador do
            SIGO consiga carregar o provider correto.
          </SecurityNotice>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.82fr]">
            <MetallicCard>
              <SectionTitle title="Em resumo, o programa serve para" className="mb-6" />
              <div className="grid gap-3 sm:grid-cols-2">
                {mainBenefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="rounded-2xl border border-border bg-backgroundSoft/80 p-4 text-sm leading-6 text-chromeLight"
                  >
                    <span className="mr-2 text-goldSoft">•</span>
                    {benefit}
                  </div>
                ))}
              </div>
            </MetallicCard>

            <MetallicCard variant="notice">
              <p className="eyebrow mb-4 text-electricLight">Quando usar</p>
              <h2 className="text-2xl font-black text-text">
                Se o SIGO travar ou não reconhecer o token
              </h2>
              <p className="body-text-sm mt-4">
                Execute o Dama Token SIGO Fix, siga as orientações exibidas e,
                após aprovação, abra o SIGO pelo atalho corrigido criado pelo
                programa.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <GlowButton href={downloadUrl} external variant="primary">
                  Baixar Dama Token SIGO Fix
                </GlowButton>
              </div>
            </MetallicCard>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <MetallicCard>
              <SectionTitle title="Situações em que pode ajudar" className="mb-6" />
              <div className="space-y-3">
                {situations.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-electric/30 bg-electric/10 px-4 py-3 text-sm font-semibold text-electricLight"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </MetallicCard>

            <MetallicCard>
              <SectionTitle title="Limites de segurança" className="mb-6" />
              <p className="body-text-sm mb-5">
                A ferramenta foi pensada para apoiar o ambiente local, mantendo
                limites claros sobre token, certificados e assinatura.
              </p>
              <div className="space-y-3">
                {safetyRules.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-gold/35 bg-gold/10 px-4 py-3 text-sm font-semibold text-goldSoft"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </MetallicCard>
          </div>

          <MetallicCard>
            <SectionTitle
              title="Fluxo recomendado de uso"
              description="O usuário comum deve começar sempre pelo botão principal do programa. As opções avançadas ficam para diagnóstico e suporte."
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
              <SectionTitle title="Componentes observados" className="mb-6" />
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
                Baixar Dama Token SIGO Fix 1.0.0
              </h2>
              <p className="body-text-sm mt-4">
                Ferramenta desktop Windows para auxiliar na preparação local da
                assinatura por token no SIGO Desktop, com diagnóstico guiado,
                orientação de drivers, Java interno e criação de atalho corrigido
                quando o ambiente estiver aprovado.
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
