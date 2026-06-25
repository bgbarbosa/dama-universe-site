import { updates } from "@/data";
import { GlowButton, MetallicCard } from "@/components/ui";

const typeStyles: Record<string, string> = {
  Programa: "border-electric/40 bg-electric/10 text-electricLight",
  Download: "border-gold/50 bg-gold/10 text-goldSoft",
  GPT: "border-cyan-300/40 bg-cyan-300/10 text-cyan-100",
  Blog: "border-chrome/35 bg-white/[0.04] text-chromeLight",
  Referência: "border-purple-300/40 bg-purple-300/10 text-purple-100",
  Vídeo: "border-red-300/40 bg-red-300/10 text-red-100",
  Site: "border-borderSoft bg-white/[0.04] text-muted",
  Planejamento: "border-borderSoft bg-white/[0.04] text-muted",
};

export function SiteUpdatesPreview() {
  const latestUpdates = updates.slice(0, 8);

  return (
    <section className="page-section-tight">
      <div className="container-site">
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow mb-4">Novidades</p>

            <h2 className="title-chrome text-3xl font-black sm:text-4xl lg:text-5xl">
              Novidades recentes
            </h2>

            <p className="body-text mt-4">
              Acompanhe as últimas mudanças do Dama Universe: programas,
              downloads, vídeos, GPTs, blog, referências e melhorias do site.
            </p>
          </div>

          <GlowButton href="/blog" variant="secondary" className="w-fit">
            Ver conteúdos
          </GlowButton>
        </div>

        <div className="-mx-5 overflow-x-auto px-5 pb-4">
          <div className="flex min-w-full gap-5">
            {latestUpdates.map((update) => (
              <MetallicCard
                key={`${update.date}-${update.title}`}
                className="min-w-[290px] max-w-[340px] flex-1 border-electric/70 shadow-[0_0_35px_rgba(37,150,255,0.28)]"
              >
                <div className="flex flex-wrap gap-2">
                  <span
                    className={[
                      "rounded-full border px-3 py-1 text-xs font-bold",
                      typeStyles[update.type] ??
                        "border-borderSoft bg-white/[0.04] text-muted",
                    ].join(" ")}
                  >
                    {update.type}
                  </span>

                  <span className="rounded-full border border-borderSoft bg-white/[0.03] px-3 py-1 text-xs font-semibold text-muted">
                    {update.date}
                  </span>
                </div>

                <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-electricLight">
                  {update.area}
                </p>

                <h3 className="mt-3 text-xl font-black leading-tight text-text">
                  {update.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-muted">
                  {update.summary}
                </p>

                {update.url ? (
                  <div className="mt-6">
                    <GlowButton
                      href={update.url}
                      variant="ghost"
                      className="px-0 py-0 text-xs text-electricLight hover:bg-transparent"
                    >
                      Ver atualização →
                    </GlowButton>
                  </div>
                ) : null}
              </MetallicCard>
            ))}
          </div>
        </div>

        <p className="mt-2 text-xs leading-6 text-mutedSoft">
          Arraste para o lado para ver mais novidades recentes.
        </p>
      </div>
    </section>
  );
}