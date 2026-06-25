import { GlowButton, MetallicCard } from "@/components/ui";

export function AvailableNow() {
  return (
    <section className="page-section-tight">
      <div className="container-site">
        <MetallicCard variant="featured" className="overflow-hidden p-0">
          <div className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[1.05fr_0.95fr] lg:p-10">
            <div>
              <div className="mb-5 inline-flex rounded-full border border-gold/50 bg-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.26em] text-goldSoft">
                Disponível para download
              </div>

              <h2 className="title-chrome text-3xl font-black sm:text-4xl lg:text-5xl">
                Dama Gerador FCC
              </h2>

              <p className="body-text mt-5">
                Ferramenta para geração, organização e padronização de
                Formulários de Cadeia de Custódia em formato editável.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <GlowButton
                  href="/downloads"
                  variant="primary"
                  className="px-8"
                >
                  Baixar agora
                </GlowButton>

                <GlowButton
                  href="/programas/dama-gerador-fcc"
                  variant="secondary"
                >
                  Ver página do programa
                </GlowButton>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background/45 p-6">
              <p className="eyebrow mb-5 text-goldSoft">Resumo</p>

              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-mutedSoft">
                    Versão
                  </dt>
                  <dd className="mt-1 font-bold text-text">v1.0.0</dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-mutedSoft">
                    Sistema
                  </dt>
                  <dd className="mt-1 font-bold text-text">Windows</dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-mutedSoft">
                    Formato
                  </dt>
                  <dd className="mt-1 font-bold text-text">ZIP</dd>
                </div>

                <div>
                  <dt className="text-xs uppercase tracking-[0.2em] text-mutedSoft">
                    Status
                  </dt>
                  <dd className="mt-1 font-bold text-goldSoft">Preparado</dd>
                </div>
              </dl>

              <div className="mt-6 rounded-xl border border-borderSoft bg-surfaceMuted/70 p-4">
                <p className="text-sm leading-7 text-muted">
                  Antes de utilizar, leia o manual e confira a versão baixada.
                  A ferramenta auxilia a organização documental, mas não
                  substitui a conferência final do usuário responsável.
                </p>
              </div>
            </div>
          </div>
        </MetallicCard>
      </div>
    </section>
  );
}