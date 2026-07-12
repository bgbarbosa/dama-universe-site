"use client";

import { useConsent } from "./ConsentProvider";

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  className?: string;
};

export function YouTubeEmbed({ videoId, title, className = "" }: YouTubeEmbedProps) {
  const { preferences, ready, savePreferences } = useConsent();

  if (ready && preferences?.externalMedia) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`}
        title={title}
        className={className}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center gap-4 bg-white/[0.03] p-5 text-center ${className}`}>
      <p className="text-sm font-semibold text-muted">
        Este vídeo não é conectado ao YouTube sem sua permissão.
      </p>
      {ready ? (
        <button
          type="button"
          onClick={() =>
            savePreferences({
              analytics: preferences?.analytics ?? false,
              externalMedia: true,
            })
          }
          className="min-h-11 rounded-full border border-electric/70 px-5 py-2 text-sm font-bold text-electricLight transition hover:bg-electric/10 focus-ring"
        >
          Permitir vídeos do YouTube
        </button>
      ) : null}
    </div>
  );
}
