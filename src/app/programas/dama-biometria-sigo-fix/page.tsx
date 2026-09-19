import { ProgramContact } from "@/components/programs/ProgramContact";
import Image from "next/image";

import { createPageMetadata } from "@/lib/seo";
import { ResponsibilityNotice, SecurityNotice } from "@/components/notices";
import { BiometriaUpdateBanner } from "@/components/updates";
import {
  GlowButton,
  MetallicCard,
  SectionHeader,
  SectionTitle,
} from "@/components/ui";
import { getProgramBySlug, getProgramDownloadUrl } from "@/data";

const downloadUrl = getProgramDownloadUrl("dama-biometria-sigo-fix");
const program =
  getProgramBySlug("dama-biometria-sigo-fix") ??
  (() => {
    throw new Error("Dados do Dama Biometria SIGO Fix não encontrados.");
  })();

const features = [
  "Correção Automática Recomendada para diagnóstico e tratamento dos problemas mais comuns.",
  "Identificação automática da versão e do perfil homologado do SIGO Desktop.",
  "Identificação da versão e do app.asar.",
  "Diagnóstico de Java e identificação de arquiteturas 32 e 64 bits.",
  "Identificação da arquitetura da NBioBSPJNI.dll.",
  "Seleção segura do Java compatível com a biblioteca Nitgen utilizada pelo SIGO.",
  "Validação nativa da biblioteca biométrica.",
  "Validação Java/JNI para confirmar a integração com a biblioteca Nitgen.",
  "Launcher isolado para abertura do SIGO com o Java compatível.",
  "Preservação do PATH e do JAVA_HOME globais do Windows.",
  "Reparo transacional da pilha Nitgen, com backup e rollback em caso de falha.",
  "Verificação e preservação do leitor HFDU06 quando já estiver funcional.",
  "Identificação do hardware por VID/PID.",
  "Logs técnicos ampliados em C:\\ProgramData\\DamaBiometriaSigoFix\\logs.",
];

const changedItems = [
  "Compatibilidade homologada com o SIGO Desktop 1.0.48.",
  "Identificação automática da versão e do perfil do SIGO.",
  "Identificação da versão e do app.asar.",
  "Detecção da arquitetura das bibliotecas Nitgen.",
  "Seleção segura do Java compatível.",
  "Validação nativa da biblioteca biométrica.",
  "Validação Java/JNI/Nitgen.",
  "Launcher isolado para abertura do SIGO.",
  "Preservação do PATH e do JAVA_HOME globais.",
  "Reparo transacional da pilha Nitgen.",
  "Backup e rollback em caso de falha.",
  "Identificação de hardware por VID/PID.",
  "Preservação do HFDU06 quando já estiver funcional.",
  "Logs técnicos ampliados.",
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
    title: "4. Abrir o SIGO",
    text: "Se o programa criar o atalho “SIGO Desktop - Biometria Corrigida”, utilize esse atalho. Ele inicia o SIGO com o Java compatível somente naquele processo, sem alterar permanentemente o PATH ou o JAVA_HOME do Windows. Caso o launcher não seja necessário, siga a orientação apresentada pela ferramenta.",
  },
  {
    title: "5. Testar a biometria",
    text: "Realize uma operação real de assinatura via PAD/Biometria e confirme a captura da impressão digital.",
  },
];

const technicalItems = [
  "Windows",
  "Python",
  "PyInstaller",
  "Inno Setup",
  "Java 8 x86/x64",
  "Java/JNI Probe",
  "Nitgen JNI",
  "HFDU06",
  "VID/PID",
  "Backup transacional",
  "Rollback",
  "Logs em ProgramData",
  "Launcher isolado",
];

const problemItems = [
  "Erro ao carregar biblioteca",
  "Biometria não inicia",
  "Falha de assinatura",
  "Java incompatível",
  "Java 32/64 bits incompatível com JNI",
  "Biblioteca Nitgen não carregada",
  "Falha na integração Java/JNI/Nitgen",
  "Leitor biométrico não reconhecido",
  "Driver biométrico inconsistente",
  "Componentes auxiliares ausentes ou incompatíveis",
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
  title: "Dama Biometria SIGO Fix 2.0.0 — Dama Universe",
  description:
    "Versão 2.0.0 para Windows, preparada para o ambiente homologado do SIGO Desktop 1.0.48, com correção guiada de biometria, assinatura, Java e Nitgen.",
  path: "/programas/dama-biometria-sigo-fix",
});

export default function DamaBiometriaSigoFixPage() {
  return (
    <main id="conteudo" tabIndex={-1} className="bg-dama-radial [overflow-wrap:anywhere]">
      <section className="page-section-tight">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <SectionHeader
              eyebrow="Programa disponível"
              title="Dama Biometria SIGO Fix 2.0.0"
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

              <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-[0.24em] text-mutedSoft">
                    Versão
                  </dt>
                  <dd className="mt-1 font-bold text-text">{program.version}</dd>
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
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-[0.24em] text-mutedSoft">
                    Compatibilidade homologada
                  </dt>
                  <dd className="mt-1 font-bold text-electricLight">
                    {program.compatibility}
                  </dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-wrap gap-3">
                <GlowButton href={downloadUrl} external variant="primary">
                  {program.downloadLabel}
                </GlowButton>
                <GlowButton href="/contato#contato-suporte" variant="secondary">
                  Solicitar suporte
                </GlowButton>
              </div>

              <p className="mt-5 text-sm leading-7 text-mutedSoft">
                Após instalar, execute o programa como administrador e utilize
                primeiro a Correção Automática Recomendada.
              </p>
            </MetallicCard>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-site space-y-8">
          <BiometriaUpdateBanner variant="program" />

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

          <section
            id="o-que-mudou-na-versao-2"
            className="scroll-mt-28"
            aria-labelledby="titulo-o-que-mudou-na-versao-2"
          >
            <MetallicCard variant="featured">
              <p className="eyebrow mb-4">Atualização importante</p>
              <h2
                id="titulo-o-que-mudou-na-versao-2"
                className="text-2xl font-black text-text sm:text-3xl"
              >
                O que mudou na versão 2.0.0
              </h2>
              <p className="body-text-sm mt-4 max-w-4xl">
                A versão 2.0.0 aprimora a integração entre o perfil do SIGO,
                Java, JNI, bibliotecas Nitgen, launcher e leitor biométrico,
                adotando validações e reparos mais conservadores.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {changedItems.map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-electric/25 bg-backgroundSoft/80 p-4 text-sm leading-6 text-chromeLight"
                  >
                    <span className="mr-2 text-electricLight">•</span>
                    {item}
                  </div>
                ))}
              </div>
            </MetallicCard>
          </section>

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
                diagnósticos complexos. Na versão 2.0.0, o programa também
                verifica a compatibilidade entre o Java e as bibliotecas JNI
                utilizadas pelo SIGO, reduzindo falhas causadas por arquiteturas
                incompatíveis.
              </p>

              <p>
                Após a correção, siga a orientação apresentada pelo programa.
                Quando o atalho “SIGO Desktop - Biometria Corrigida” for criado,
                utilize-o para abrir o SIGO com o Java compatível.
              </p>
            </div>
          </MetallicCard>

          <ResponsibilityNotice>
            O Dama Biometria SIGO Fix é uma ferramenta auxiliar e independente.
            Ele não reinstala o SIGO Desktop, não acessa banco de dados do SIGO,
            não altera regras de negócio e não garante funcionamento em versões
            futuras caso a arquitetura interna do sistema seja alterada.
          </ResponsibilityNotice>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.8fr]">
            <MetallicCard>
              <SectionTitle title="Principais funcionalidades" className="mb-6" />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                <p className="mt-4 text-sm font-semibold leading-7 text-chromeLight">
                  Perfil do SIGO → Java → Nitgen/JNI → validação das bibliotecas
                  → launcher → componentes de assinatura → driver biométrico →
                  teste funcional
                </p>
                <p className="body-text-sm mt-4">
                  O programa procura evitar alterações desnecessárias. Se uma
                  biblioteca ou driver já estiver funcionando corretamente, a
                  ferramenta poderá apenas validar o componente e preservá-lo.
                </p>
              </MetallicCard>

              <SecurityNotice>
                <div>
                  <p className="font-bold text-text">Antes da correção:</p>
                  <ol className="mt-3 list-decimal space-y-2 pl-5">
                    <li>Feche completamente o SIGO Desktop.</li>
                    <li>Mantenha conectado somente o leitor que será utilizado.</li>
                    <li>
                      Execute o Dama Biometria SIGO Fix como administrador.
                    </li>
                    <li>Utilize primeiro a Correção Automática Recomendada.</li>
                    <li>Aguarde a conclusão completa.</li>
                    <li>Não desconecte o leitor durante a execução.</li>
                  </ol>
                </div>
              </SecurityNotice>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
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
              <div className="grid grid-cols-1 gap-3">
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

          <section id="fluxo-recomendado" className="scroll-mt-24">
            <MetallicCard>
              <SectionTitle
                title="Fluxo recomendado de uso"
                description="Feche o SIGO, execute a ferramenta como administrador, use a correção recomendada, siga a orientação de abertura e teste a biometria em uma operação real."
                className="mb-6"
              />

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-5">
                {workflow.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-border bg-backgroundSoft/80 p-5"
                  >
                    <h3 className="text-lg font-black text-text">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      {step.text}
                    </p>
                  </div>
                ))}
              </div>
            </MetallicCard>
          </section>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr]">
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
                Baixar Dama Biometria SIGO Fix 2.0.0
              </h2>
              <p className="body-text-sm mt-4">
                Versão atual preparada para o ambiente homologado do SIGO Desktop
                1.0.48.
              </p>

              <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-mutedSoft">Versão</dt>
                  <dd className="mt-1 font-bold text-text">{program.version}</dd>
                </div>
                <div>
                  <dt className="text-mutedSoft">Sistema</dt>
                  <dd className="mt-1 font-bold text-text">Windows</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-mutedSoft">Instalador</dt>
                  <dd className="mt-1 break-all font-mono text-xs font-bold text-text sm:text-sm">
                    {program.installerName}
                  </dd>
                </div>
                <div>
                  <dt className="text-mutedSoft">Tamanho aproximado</dt>
                  <dd className="mt-1 font-bold text-text">{program.downloadSize}</dd>
                </div>
                <div>
                  <dt className="text-mutedSoft">Compatibilidade homologada</dt>
                  <dd className="mt-1 font-bold text-text">{program.compatibility}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-mutedSoft">SHA-256</dt>
                  <dd className="mt-1 break-all font-mono text-xs font-bold leading-6 text-text">
                    {program.sha256}
                  </dd>
                </div>
              </dl>

              <div className="mt-7 flex flex-wrap gap-3">
                <GlowButton href={downloadUrl} external variant="primary">
                  {program.downloadLabel}
                </GlowButton>
                <GlowButton href="/programas" variant="secondary">
                  Ver outros programas
                </GlowButton>
              </div>

              <p className="mt-5 text-sm leading-7 text-mutedSoft">
                Após instalar, execute o programa como administrador e utilize
                primeiro a Correção Automática Recomendada.
              </p>
            </MetallicCard>
          </div>
        </div>
      </section>
      <ProgramContact />
    </main>
  );
}
