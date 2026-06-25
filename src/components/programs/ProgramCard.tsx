import { GlowButton, MetallicCard } from "@/components/ui";

type ProgramCardProps = {
  title?: string;
  name?: string;
  description?: string;
  shortDescription?: string;
  category: string;
  status: string;
  version: string;
  href?: string;
  detailsUrl?: string;
  downloadHref?: string;
  downloadUrl?: string;
  iconUrl?: string;
  featured?: boolean;
};

export function ProgramCard({
  title,
  name,
  description,
  shortDescription,
  category,
  status,
  version,
  href,
  detailsUrl,
  downloadHref,
  downloadUrl,
  iconUrl,
  featured = false,
}: ProgramCardProps) {
  const programTitle = title ?? name ?? "Programa";
  const programDescription = description ?? shortDescription ?? "";
  const detailsHref = href ?? detailsUrl ?? "/programas";
  const downloadLink = downloadHref ?? downloadUrl;
  const isDownloadExternal = Boolean(
    downloadLink && /^https?:\/\//.test(downloadLink)
  );

  return (
    <MetallicCard
      variant={featured ? "featured" : "default"}
      className="flex h-full flex-col"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-electric/45 bg-electric/10 px-3 py-1 text-xs font-bold text-electricLight">
            {category}
          </span>

          <span
            className={[
              "rounded-full border px-3 py-1 text-xs font-bold",
              featured
                ? "border-gold/50 bg-gold/10 text-goldSoft"
                : "border-borderSoft bg-white/5 text-muted",
            ].join(" ")}
          >
            {status}
          </span>
        </div>

        {iconUrl ? (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-borderSoft bg-background/50 p-2 shadow-chrome">
            <img
              src={iconUrl}
              alt={`Ícone do ${programTitle}`}
              className="h-full w-full rounded-xl object-contain"
            />
          </div>
        ) : null}
      </div>

      <h3 className="mt-6 text-2xl font-black leading-tight text-text">
        {programTitle}
      </h3>

      {programDescription ? (
        <p className="mt-4 text-sm leading-7 text-muted">
          {programDescription}
        </p>
      ) : null}

      <div className="mt-auto pt-8">
        <p className="mb-5 text-sm text-muted">
          Versão: <span className="font-bold text-text">{version}</span>
        </p>

        <div className="flex flex-wrap gap-3">
          <GlowButton href={detailsHref} variant="secondary">
            Ver detalhes
          </GlowButton>

          {downloadLink ? (
            <GlowButton
              href={downloadLink}
              external={isDownloadExternal}
              variant="primary"
            >
              Download
            </GlowButton>
          ) : null}
        </div>
      </div>
    </MetallicCard>
  );
}
