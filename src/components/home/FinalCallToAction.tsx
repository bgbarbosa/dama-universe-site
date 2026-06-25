import { ChromeTitle, GlowButton, MetallicCard } from "@/components/ui";

export function FinalCallToAction() {
  return (
    <section className="px-6 py-16 md:pb-24">
      <div className="mx-auto max-w-6xl">
        <MetallicCard className="relative overflow-hidden border-electric/70 p-8 text-center shadow-[0_0_35px_rgba(37,150,255,0.28)] md:p-12">
          <div className="absolute inset-0 -z-0 bg-[radial-gradient(circle_at_top,rgba(30,140,255,0.18),transparent_40%)]" />
          <div className="relative z-10 mx-auto max-w-3xl space-y-6">
            <ChromeTitle as="h2" className="text-3xl md:text-5xl">
              Explore o universo de projetos Dama
            </ChromeTitle>
            <p className="text-base leading-8 text-muted md:text-lg">
              Conheça os programas, acompanhe as atualizações, leia os conteúdos e participe da evolução do Dama Universe.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <GlowButton href="/sobre">Sobre</GlowButton>
              <GlowButton href="/contato" variant="secondary">
                Entrar em Contato
              </GlowButton>
            </div>
          </div>
        </MetallicCard>
      </div>
    </section>
  );
}
