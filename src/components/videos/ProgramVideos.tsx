import { getVideosByProgramSlug } from "@/data";
import { SectionTitle } from "@/components/ui";
import { VideoCard } from "./VideoCard";

type ProgramVideosProps = {
  programSlug: string;
  title?: string;
  description?: string;
};

export function ProgramVideos({
  programSlug,
  title = "Vídeos sobre esta ferramenta",
  description = "Tutoriais, demonstrações e novidades publicados no YouTube ficarão reunidos aqui.",
}: ProgramVideosProps) {
  const videos = getVideosByProgramSlug(programSlug);

  if (!videos.length) {
    return null;
  }

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-8">
        <SectionTitle eyebrow="YouTube" title={title} description={description} />
        <div className="grid gap-6">
          {videos.map((video, index) => (
            <VideoCard key={video.slug} video={video} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}
