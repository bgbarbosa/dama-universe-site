import { GlowButton, MetallicCard } from "@/components/ui";
import { YouTubeEmbed } from "@/components/privacy";

type VideoCardData = {
  slug?: string;
  title?: string;
  description?: string;
  youtubeId?: string;
  videoId?: string;
  youtubeUrl?: string;
  url?: string;
  status?: string;
  programName?: string;
  programTitle?: string;
};

type VideoCardProps = VideoCardData & {
  video?: VideoCardData;
  featured?: boolean;
};

function extractYoutubeId(url?: string) {
  if (!url) {
    return "";
  }

  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch?.[1]) {
    return watchMatch[1];
  }

  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  if (shortMatch?.[1]) {
    return shortMatch[1];
  }

  return "";
}

function isExternalUrl(url?: string) {
  return Boolean(url && /^https?:\/\//i.test(url));
}

export function VideoCard({
  video,
  title,
  description,
  youtubeId,
  videoId,
  youtubeUrl,
  url,
  status,
  programName,
  programTitle,
  featured = false,
}: VideoCardProps) {
  const videoTitle = title ?? video?.title ?? "Vídeo";
  const videoDescription = description ?? video?.description ?? "";

  const currentYoutubeUrl =
    youtubeUrl ?? url ?? video?.youtubeUrl ?? video?.url ?? "";

  const currentYoutubeId =
    youtubeId ??
    videoId ??
    video?.youtubeId ??
    video?.videoId ??
    extractYoutubeId(currentYoutubeUrl);

  const currentStatus = status ?? video?.status ?? "Previsto";

  const currentProgramName =
    programName ?? programTitle ?? video?.programName ?? video?.programTitle ?? "";

  const isPublished =
    currentStatus.toLowerCase() === "publicado" &&
    isExternalUrl(currentYoutubeUrl) &&
    currentYoutubeId.length > 0;

  return (
    <MetallicCard
      variant={featured ? "featured" : "default"}
      className="flex h-full flex-col overflow-hidden"
    >
      <div className="overflow-hidden rounded-2xl border border-borderSoft bg-background/70">
        {isPublished ? (
          <YouTubeEmbed
            videoId={currentYoutubeId}
            className="aspect-video w-full"
            title={videoTitle}
          />
        ) : (
          <div className="flex aspect-video items-center justify-center bg-white/[0.03] px-6 text-center">
            <p className="text-sm font-semibold text-muted">
              Vídeo em preparação
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <div className="mb-4 flex flex-wrap gap-2">
          <span className="rounded-full border border-electric/45 bg-electric/10 px-3 py-1 text-xs font-bold text-electricLight">
            {currentStatus}
          </span>

          {currentProgramName ? (
            <span className="rounded-full border border-borderSoft bg-white/5 px-3 py-1 text-xs font-bold text-muted">
              {currentProgramName}
            </span>
          ) : null}
        </div>

        <h3 className="text-xl font-black leading-tight text-text">
          {videoTitle}
        </h3>

        {videoDescription ? (
          <p className="mt-3 text-sm leading-7 text-muted">
            {videoDescription}
          </p>
        ) : null}

        <div className="mt-auto pt-6">
          <GlowButton
            href={isPublished ? currentYoutubeUrl : undefined}
            external={isExternalUrl(currentYoutubeUrl)}
            variant={isPublished ? "primary" : "secondary"}
            disabled={!isPublished}
          >
            {isPublished ? "Assistir no YouTube" : "Vídeo em preparação"}
          </GlowButton>
        </div>
      </div>
    </MetallicCard>
  );
}

export default VideoCard;
