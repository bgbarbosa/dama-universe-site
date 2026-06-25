import { GlowButton } from "@/components/ui";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-dama-radial">
      <div className="container-site grid min-h-[690px] items-center gap-12 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div>
          <div className="mb-8 inline-flex rounded-full border border-electric/50 bg-electric/10 px-4 py-2 text-sm font-bold text-electricLight">
            Site, blog e vitrine de projetos Dama
          </div>

          <h1 className="title-chrome max-w-3xl text-6xl font-black leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
            Dama
            <br />
            Universe
          </h1>

          <p className="mt-8 max-w-2xl text-2xl font-semibold leading-snug text-text">
            Programas, downloads, atualizações e conteúdos técnicos reunidos em
            um só lugar.
          </p>

          <p className="body-text mt-6 max-w-2xl">
            Um espaço dedicado ao desenvolvimento e compartilhamento de soluções
            digitais, projetos em Python, automação documental, análise de
            dados, inteligência artificial e referências de estudo.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <GlowButton href="/programas" variant="primary" className="px-8">
              Conhecer Programas
            </GlowButton>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="rounded-3xl border border-electric/55 bg-surface/75 p-8 shadow-card">
            <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-3xl border border-border bg-background/70">
              <div className="absolute text-[220px] font-black leading-none text-chrome/10">
                D
              </div>

              <div className="relative max-w-sm rounded-2xl border border-electric/45 bg-background/85 p-6 shadow-electric">
                <p className="text-sm font-bold text-electricLight">
                  Inteligência aplicada
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Projetos, versões, conteúdos e ferramentas reunidos em uma
                  base pública organizada.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}