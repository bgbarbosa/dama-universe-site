import { HorizontalScroller } from "@/components/ui/HorizontalScroller";
import { GlowButton, MetallicCard, SectionTitle } from "@/components/ui";
import { YouTubeEmbed } from "@/components/privacy";

const tutorials = [
  {
    title: "Parte 01 — Primeiros passos",
    description:
      "Introdução ao Dama Gerador FCC 3.0 e visão geral do fluxo inicial de uso.",
    watchUrl: "https://youtu.be/CL-Q2iOYAJU",
    videoId: "CL-Q2iOYAJU",
  },
  {
    title: "Parte 02 — Geração e conferência",
    description:
      "Continuação do tutorial com foco no uso operacional e na conferência dos dados.",
    watchUrl: "https://youtu.be/4vmzh-SOBEw",
    videoId: "4vmzh-SOBEw",
  },
  {
    title: "Parte 03 — Finalização do fluxo",
    description:
      "Etapa final do tutorial, com orientações complementares sobre o uso do programa.",
    watchUrl: "https://youtu.be/mkdPTsE6-KM",
    videoId: "mkdPTsE6-KM",
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
              ? "Acompanhe os primeiros passos, a geração e a conferência dos documentos. Os vídeos só carregam após sua permissão para conteúdo externo."
              : undefined
          }
        />


      </div>

      <HorizontalScroller label="Tutoriais FCC">
          {tutorials.map((video) => (
            <MetallicCard
              key={video.videoId}
              className="w-[min(320px,80vw)] shrink-0 border-electric/70 p-4 shadow-[0_0_35px_rgba(37,150,255,0.28)]"
            >
              <div className="aspect-video overflow-hidden rounded-2xl border border-borderSoft bg-background">
                <YouTubeEmbed
                  videoId={video.videoId}
                  title={video.title}
                  className="h-full w-full"
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
        </HorizontalScroller>

      <p className="mt-2 text-xs leading-6 text-mutedSoft">
        Arraste para o lado para ver as três partes do tutorial.
      </p>
    </section>
  );
}
