import { getHomeFeaturedVideo } from "@/data";
import { SectionTitle } from "@/components/ui";
import { VideoCard } from "@/components/videos";

export function FeaturedVideo() {
  const video = getHomeFeaturedVideo();

  if (!video) {
    return null;
  }

  return (
    <section className="page-section-tight">
      <div className="container-site space-y-8">
        <SectionTitle
          eyebrow="Novidade em vídeo"
          title="Demonstrações e tutoriais"
          description="Quando houver vídeo novo de uma ferramenta, ele poderá aparecer em destaque na página inicial e também na página específica do programa."
        />
        <VideoCard video={video} featured />
      </div>
    </section>
  );
}
