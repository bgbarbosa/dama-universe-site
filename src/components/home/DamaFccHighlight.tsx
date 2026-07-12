import { ResponsibilityNotice } from "@/components/notices";
import { DamaFccTutorials } from "@/components/videos";
import { GlowButton, MetallicCard, SectionTitle } from "@/components/ui";
import { getProgramDownloadUrl } from "@/data";

const downloadUrl = getProgramDownloadUrl("dama-gerador-fcc");

const resources = [
  "Geração de FCC a partir de B.O. em PDF",
  "Geração de FCC do zero",
  "Cadastro local de usuários",
  "Identificação de lacres e objetos",
  "Regras automáticas de sugestão",
  "Conferência visual dos vestígios",
  "Geração de documentos DOCX",
  "Histórico local de casos",
  "Log de geração por caso",
  "Funcionamento local no Windows",
];

export function DamaFccHighlight() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-12">
        <MetallicCard className="grid gap-10 border-2 border-electric p-8 shadow-[0_0_70px_rgba(37,150,255,0.60)] md:p-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-7">
            <SectionTitle
              eyebrow="Programa em foco"
              title="Dama Gerador FCC 3.0"
              description="Aplicativo desktop para geração, organização e padronização de Formulários de Cadeia de Custódia."
            />

            <p className="text-base leading-8 text-muted">
              O Dama Gerador FCC 3.0 auxilia na geração de FCCs a partir de
              Boletins de Ocorrência em PDF ou por preenchimento manual,
              permitindo extrair informações, identificar lacres e objetos,
              conferir vestígios e gerar documentos DOCX padronizados.
            </p>

            <div className="flex flex-wrap gap-3">
              <GlowButton href="/programas/dama-gerador-fcc">
                Ver página do programa
              </GlowButton>
              <GlowButton href={downloadUrl} external variant="secondary">
                Baixar ZIP
              </GlowButton>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2">
              {resources.map((resource) => (
                <div
                  key={resource}
                  className="rounded-2xl border border-border bg-backgroundSoft/80 p-4 text-sm font-medium text-chromeLight"
                >
                  <span className="mr-2 text-electricLight">•</span>
                  {resource}
                </div>
              ))}
            </div>

            <ResponsibilityNotice>
              O sistema automatiza parte do preenchimento, mas não substitui a
              conferência humana, a responsabilidade funcional ou a validação
              final do usuário.
            </ResponsibilityNotice>
          </div>
        </MetallicCard>

        <DamaFccTutorials />
      </div>
    </section>
  );
}
