import { createPageMetadata } from "@/lib/seo";
import { MetallicCard, SectionHeader, SectionTitle } from "@/components/ui";

const changes = [
  "Atualização da descrição oficial do Dama Gerador FCC para a versão 3.0.",
  "Reforço da finalidade do sistema como ferramenta de apoio operacional para geração de FCC.",
  "Registro dos principais recursos: geração por PDF, geração manual, cadastro de usuários, identificação de lacres, regras de sugestão, conferência visual e geração DOCX.",
  "Atualização das informações de download para versão 3.0.",
  "Inclusão de aviso de responsabilidade sobre conferência humana obrigatória.",
];

export const metadata = createPageMetadata({
  title: "Changelog Dama Gerador FCC 3.0 — Dama Universe",
  description:
    "Registro de atualização da página e materiais públicos do Dama Gerador FCC 3.0.",
  path: "/changelog/dama-gerador-fcc/v3.0.0",
});

export default function DamaGeradorFccChangelogPage() {
  return (
    <main className="bg-dama-radial">
      <section className="page-section-tight">
        <div className="container-site">
          <SectionHeader
            eyebrow="Changelog"
            title="Dama Gerador FCC 3.0"
            description="Registro das principais informações e ajustes públicos relacionados à versão 3.0 do Dama Gerador FCC."
            align="center"
          />
        </div>
      </section>

      <section className="pb-20">
        <div className="container-site grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <MetallicCard variant="featured">
            <p className="eyebrow mb-4 text-goldSoft">Versão</p>
            <h2 className="text-3xl font-black text-text">3.0</h2>
            <p className="body-text-sm mt-4">
              Aplicativo desktop Windows para geração, organização e
              padronização de Formulários de Cadeia de Custódia — FCC.
            </p>
          </MetallicCard>

          <MetallicCard>
            <SectionTitle title="Atualizações registradas" className="mb-6" />
            <ul className="space-y-4 text-sm leading-7 text-muted md:text-base md:leading-8">
              {changes.map((change) => (
                <li key={change}>
                  <span className="mr-2 text-electricLight">•</span>
                  {change}
                </li>
              ))}
            </ul>
          </MetallicCard>
        </div>
      </section>
    </main>
  );
}
