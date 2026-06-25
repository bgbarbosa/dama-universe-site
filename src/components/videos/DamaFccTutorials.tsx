import { GlowButton, MetallicCard, SectionTitle } from "@/components/ui";

const tutorials = [
  {
    title: "Parte 01 — Primeiros passos",
    description:
      "Introdução ao Dama Gerador FCC 3.0 e visão geral do fluxo inicial de uso.",
    watchUrl: "https://youtu.be/CL-Q2iOYAJU",
    embedUrl: "https://www.youtube.com/embed/CL-Q2iOYAJU",
  },
  {
    title: "Parte 02 — Geração e conferência",
    description:
      "Continuação do tutorial com foco no uso operacional e na conferência dos dados.",
    watchUrl: "https://youtu.be/4vmzh-SOBEw",
    embedUrl: "https://www.youtube.com/embed/4vmzh-SOBEw",
  },
  {
    title: "Parte 03 — Finalização do fluxo",
    description:
      "Etapa final do tutorial, com orientações complementares sobre o uso do programa.",
    watchUrl: "https://youtu.be/mkdPTsE6-KM",
    embedUrl: "https://www.youtube.com/embed/mkdPTsE6-KM",
  },
];

type DamaFccTutorialsProps = {
  className?: string;
  showIntro?: boolean;
};

export function DamaFccTutorials({
  className = "",
  showIntro = true,
}: DamaFccTutorialsProps) {
  return (
    <section className={className}>
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <SectionTitle
          eyebrow="Tutoriais em vídeo"
          title="Como usar o Dama Gerador FCC 3.0"
          description={
            showIntro
              ? "Assista aos tutoriais oficiais em três partes. Os vídeos ficam em rolagem horizontal para manter a página limpa e evitar que um fique abaixo do outro."
              : undefined
          }
        />

        <GlowButton
          href="https://www.youtube.com/playlist?list=PL"
          external
          variant="secondary"
          className="hidden"
        >
          Ver playlist
        </GlowButton>
      </div>

      <div className="-mx-5 overflow-x-auto px-5 pb-4">
        <div className="flex min-w-full gap-5">
          {tutorials.map((video) => (
            <MetallicCard
              key={video.embedUrl}
              className="min-w-[320px] max-w-[420px] flex-1 border-electric/70 p-4 shadow-[0_0_35px_rgba(37,150,255,0.28)]"
            >
              <div className="aspect-video overflow-hidden rounded-2xl border border-borderSoft bg-background">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  className="h-full w-full"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              <h3 className="mt-5 text-xl font-black leading-tight text-text">
                {video.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted">
                {video.description}
              </p>

              <div className="mt-5">
                <GlowButton href={video.watchUrl} external variant="secondary">
                  Abrir no YouTube
                </GlowButton>
              </div>
            </MetallicCard>
          ))}
        </div>
      </div>

      <p className="mt-2 text-xs leading-6 text-mutedSoft">
        Arraste para o lado para ver as três partes do tutorial.
      </p>
    </section>
  );
}
