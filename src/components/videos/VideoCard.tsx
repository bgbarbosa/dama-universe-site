import { GlowButton, MetallicCard } from "@/components/ui";

type VideoCardProps = {
  title: string;
  description?: string;
  videoId?: string;
  embedUrl?: string;
  watchUrl?: string;
  url?: string;
  youtubeUrl?: string;
  className?: string;
};

function resolveVideoId(value?: string) {
  if (!value) return "";

  if (!value.includes("http") && !value.includes("/")) {
    return value;
  }

  try {
    const parsed = new URL(value);

    if (parsed.hostname.includes("youtu.be")) {
      return parsed.pathname.replace("/", "");
    }

    if (parsed.hostname.includes("youtube.com")) {
      return parsed.searchParams.get("v") ?? parsed.pathname.split("/").pop() ?? "";
    }
  } catch {
    return value;
  }

  return value;
}

export function VideoCard({
  title,
  description,
  videoId,
  embedUrl,
  watchUrl,
  url,
  youtubeUrl,
  className = "",
}: VideoCardProps) {
  const sourceUrl = watchUrl ?? youtubeUrl ?? url;
  const resolvedVideoId = videoId ?? resolveVideoId(embedUrl ?? sourceUrl);
  const finalEmbedUrl = embedUrl ?? `https://www.youtube.com/embed/${resolvedVideoId}`;
  const finalWatchUrl = sourceUrl ?? `https://youtu.be/${resolvedVideoId}`;

  return (
    <MetallicCard
      className={[
        "min-w-[320px] max-w-[420px] flex-1 border-electric/70 p-4 shadow-[0_0_35px_rgba(37,150,255,0.28)]",
        className,
      ].join(" ")}
    >
      <div className="aspect-video overflow-hidden rounded-2xl border border-borderSoft bg-background">
        <iframe
          src={finalEmbedUrl}
          title={title}
          className="h-full w-full"
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      <h3 className="mt-5 text-xl font-black leading-tight text-text">{title}</h3>

      {description ? (
        <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
      ) : null}

      <div className="mt-5">
        <GlowButton href={finalWatchUrl} external variant="secondary">
          Abrir no YouTube
        </GlowButton>
      </div>
    </MetallicCard>
  );
}
