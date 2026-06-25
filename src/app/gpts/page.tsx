import { GptCard } from "@/components/gpts";

import { MetallicCard, PageHeader } from "@/components/ui";
import { createPageMetadata } from "@/lib/seo";
import { customGpts } from "@/data";

export const metadata = createPageMetadata({
  title: "GPTs Personalizados — Dama Universe",
  description:
    "Assistentes de IA personalizados criados para apoiar documentação, estudo, organização, análise e produção técnica.",
  path: "/gpts",
});

export default function GptsPage() {
  return (
    <main>
      <PageHeader
        title="GPTs Personalizados"
        subtitle="Assistentes de IA"
        description="Assistentes criados para apoiar tarefas específicas de documentação, estudo, organização, análise e produção técnica dentro do ecossistema Dama."
      />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8">
          <MetallicCard variant="notice">
            <h2 className="text-2xl font-black text-text">
              Assistentes com finalidade definida
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              Cada GPT personalizado possui uma função específica, indicação de uso
              e cuidados necessários. Eles funcionam como ferramentas de apoio, não
              como substitutos da conferência humana, responsabilidade técnica ou
              validação final.
            </p>
          </MetallicCard>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {customGpts.map((gpt) => (
            <GptCard key={gpt.slug} gpt={gpt} />
          ))}
        </div>
      </section>
    </main>
  );
}
