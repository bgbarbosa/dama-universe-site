import Image from "next/image";

import { GlowButton, MetallicCard } from "@/components/ui";

type ProgramCardData = {
  title?: string;
  name?: string;
  description?: string;
  shortDescription?: string;
  category?: string;
  status?: string;
  version?: string;
  href?: string;
  detailsUrl?: string;
  downloadHref?: string;
  downloadUrl?: string;
  iconUrl?: string;
  featured?: boolean;
};

type ProgramCardProps = ProgramCardData & {
  program?: ProgramCardData;
};

export function ProgramCard({
  program,
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
  const programTitle = title ?? name ?? program?.title ?? program?.name ?? "Programa";

  const programDescription =
    description ??
    shortDescription ??
    program?.description ??
    program?.shortDescription ??
    "";

  const programCategory = category ?? program?.category ?? "Programa";
  const programStatus = status ?? program?.status ?? "Em desenvolvimento";
  const programVersion = version ?? program?.version ?? "—";

  const detailsHref =
    href ??
    detailsUrl ??
    program?.href ??
    program?.detailsUrl ??
    "/programas";

  const downloadLink =
    downloadHref ??
    downloadUrl ??
    program?.downloadHref ??
    program?.downloadUrl;

  const programIconUrl = iconUrl ?? program?.iconUrl;
  const isFeatured = featured || Boolean(program?.featured);

  const isDownloadExternal = Boolean(
    downloadLink && /^https?:\/\//.test(downloadLink)
  );

  return (
    <MetallicCard
      variant={isFeatured ? "featured" : "default"}
      className="flex h-full flex-col"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full border border-electric/45 bg-electric/10 px-3 py-1 text-xs font-bold text-electricLight">
            {programCategory}
          </span>

          <span
            className={[
              "rounded-full border px-3 py-1 text-xs font-bold",
              isFeatured
                ? "border-gold/50 bg-gold/10 text-goldSoft"
                : "border-borderSoft bg-white/5 text-muted",
            ].join(" ")}
          >
            {programStatus}
          </span>
        </div>

        {programIconUrl ? (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-borderSoft bg-background/50 p-2 shadow-chrome">
            <Image
              src={programIconUrl}
              alt={`Ícone do ${programTitle}`}
              width={56}
              height={56}
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
          Versão: <span className="font-bold text-text">{programVersion}</span>
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