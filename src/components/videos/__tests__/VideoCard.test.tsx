import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { VideoCard } from "@/components/videos/VideoCard";

vi.mock("@/components/privacy", () => ({
  YouTubeEmbed: ({ videoId, title }: { videoId: string; title: string }) => (
    <div data-testid="youtube-embed" data-video-id={videoId} aria-label={title} />
  ),
}));

describe("VideoCard", () => {
  it("encaminha o identificador publicado ao embed protegido", () => {
    render(
      <VideoCard
        title="Demonstração"
        status="Publicado"
        youtubeId="abc123"
        youtubeUrl="https://youtu.be/abc123"
        description="Vídeo publicado para teste."
      />
    );

    expect(screen.getByTestId("youtube-embed")).toHaveAttribute(
      "data-video-id",
      "abc123"
    );
  });

  it("não cria embed para vídeo ainda não publicado", () => {
    render(
      <VideoCard
        title="Demonstração futura"
        status="Previsto"
        youtubeId="abc123"
        description="Vídeo ainda em preparação."
      />
    );

    expect(screen.queryByTestId("youtube-embed")).toBeNull();
    expect(
      screen.getByRole("button", { name: "Vídeo em preparação" })
    ).toBeDisabled();
  });
});
