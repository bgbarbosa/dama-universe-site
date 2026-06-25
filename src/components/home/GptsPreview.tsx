import { customGpts } from "@/data";
import { GlowButton, MetallicCard } from "@/components/ui";

export function GptsPreview() {
  const featuredGpts = customGpts.filter((gpt) => gpt.featured).slice(0, 2);

  return (
    <section className="page-section-tight">
      <div className="container-site">
        <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Assistentes de IA</p>
            <h2 className="title-chrome text-3xl font-black sm:text-4xl lg:text-5xl">
              GPTs personalizados
            </h2>
            <p className="body-text mt-4">
              Assistentes criados para apoiar tarefas específicas de
              documentação, estudo, organização, análise e produção técnica.
            </p>
          </div>

          <GlowButton href="/gpts" variant="secondary">
            Ver todos os GPTs
          </GlowButton>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {featuredGpts.map((gpt) => (
            <MetallicCard key={gpt.slug} variant="featured">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-electric/45 bg-electric/10 px-3 py-1 text-xs font-bold text-electricLight">
                  {gpt.category}
                </span>
                <span className="rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-xs font-bold text-goldSoft">
                  {gpt.status}
                </span>
              </div>

              <h3 className="mt-6 text-2xl font-black text-text">
                {gpt.name}
              </h3>

              <p className="body-text-sm mt-4">{gpt.shortDescription}</p>

              <div className="mt-7">
                <GlowButton
                  href={gpt.url}
                  external={gpt.url.startsWith("http")}
                  variant="primary"
                >
                  Acessar GPT
                </GlowButton>
              </div>
            </MetallicCard>
          ))}
        </div>
      </div>
    </section>
  );
}