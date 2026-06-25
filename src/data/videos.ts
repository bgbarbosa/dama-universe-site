export type VideoStatus = "Publicado" | "Previsto" | "Em edição";
export type VideoType = "Demonstração" | "Tutorial" | "Novidade" | "Atualização" | "Apresentação";

export type VideoItem = {
  title: string;
  slug: string;
  type: VideoType;
  status: VideoStatus;
  description: string;
  date: string;
  youtubeId?: string;
  youtubeUrl?: string;
  programSlug?: string;
  programName?: string;
  featured?: boolean;
  homeFeatured?: boolean;
};

export const videos: VideoItem[] = [
  {
    title: "Dama Gerador FCC — demonstração inicial",
    slug: "dama-gerador-fcc-demonstracao-inicial",
    type: "Demonstração",
    status: "Previsto",
    description:
      "Espaço preparado para o vídeo demonstrativo do Dama Gerador FCC. Quando o vídeo for publicado no YouTube, basta preencher o youtubeId e o youtubeUrl neste arquivo.",
    date: "2026-06-22",
    youtubeId: "",
    youtubeUrl: "#",
    programSlug: "dama-gerador-fcc",
    programName: "Dama Gerador FCC",
    featured: true,
    homeFeatured: true,
  },
];

export const featuredVideos = videos.filter((video) => video.featured);

export function getHomeFeaturedVideo() {
  return videos.find((video) => video.homeFeatured) ?? videos[0];
}

export function getVideosByProgramSlug(programSlug: string) {
  return videos.filter((video) => video.programSlug === programSlug);
}
