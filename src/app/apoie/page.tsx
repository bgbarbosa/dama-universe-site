import { createPageMetadata } from "@/lib/seo";
import { InfoNotice } from "@/components/notices";
import { SupportCard } from "@/components/support";
import { GlowButton, MetallicCard, PageHeader } from "@/components/ui";
import { supportOptions } from "@/data";

export const metadata = createPageMetadata({
  title: "Apoie — Dama Universe",
  description: "Conheça formas futuras de apoiar, patrocinar ou colaborar com o desenvolvimento dos programas, conteúdos e ferramentas do Dama Universe.",
  path: "/apoie",
});

export default function ApoiePage() {
  return (
    <main>
      <PageHeader
        title="Apoie o Dama Universe"
        subtitle="Apoio e parcerias futuras"
        description="O Dama Universe é um projeto em evolução, criado para reunir programas, ferramentas, conteúdos, estudos e soluções digitais."
      />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <MetallicCard>
            <h2 className="text-2xl font-semibold text-chromeLight">Formas futuras de apoio</h2>
            <p className="mt-4 leading-8 text-muted">
              Este espaço poderá receber, futuramente, apoiadores, parceiros e patrocinadores interessados em contribuir com desenvolvimento, manutenção, conteúdos e evolução das ferramentas.
            </p>
            <div className="mt-6">
              <GlowButton href="/contato" variant="secondary">Entrar em contato</GlowButton>
            </div>
          </MetallicCard>
          <InfoNotice>
            Quando houver apoio, parceria, patrocínio ou indicação remunerada, essa informação será comunicada de forma clara ao visitante.
          </InfoNotice>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {supportOptions.map((support) => (
            <SupportCard key={support.name} support={support} />
          ))}
        </div>
      </section>
    </main>
  );
}
