import Image from "next/image";

import { GlowButton, MetallicCard } from "@/components/ui";

type ProgramCardData = {
  title?: string;
  name?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  category?: string;
  status?: string;
  version?: string;
  href?: string;
  detailsUrl?: string;
  downloadHref?: string;
  downloadUrl?: string;
  downloadLabel?: string;
  compatibility?: string;
  updateBadge?: string;
  updateSummary?: string;
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
  slug,
  description,
  shortDescription,
  category,
  status,
  version,
  href,
  detailsUrl,
  downloadHref,
  downloadUrl,
  downloadLabel,
  compatibility,
  updateBadge,
  updateSummary,
  iconUrl,
  featured = false,
}: ProgramCardProps) {
  const programTitle = title ?? name ?? program?.title ?? program?.name ?? "Programa";
  const programSlug = slug ?? program?.slug;

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

  const downloadButtonLabel =
    downloadLabel ?? program?.downloadLabel ?? "Download";

  const programCompatibility =
    compatibility ?? program?.compatibility;
  const programUpdateBadge = updateBadge ?? program?.updateBadge;
  const programUpdateSummary = updateSummary ?? program?.updateSummary;

  const programIconUrl = iconUrl ?? program?.iconUrl;
  const isFeatured = featured || Boolean(program?.featured);

  const isDownloadExternal = Boolean(
    downloadLink && /^https?:\/\//.test(downloadLink)
  );

  return (
    <div
      id={programSlug ? `programa-${programSlug}` : undefined}
      className="h-full scroll-mt-24"
      data-testid={programSlug ? `program-card-${programSlug}` : undefined}
    >
      <MetallicCard
        variant={isFeatured ? "featured" : "default"}
        className={[
          "flex h-full flex-col",
          programUpdateBadge ? "release-glow" : "",
        ].join(" ")}
      >
      {programUpdateBadge ? (
        <div className="relative z-10 mb-4">
          <span className="release-glow-badge inline-flex rounded-full border px-3 py-1.5 text-[0.68rem] font-black uppercase tracking-[0.18em]">
            {programUpdateBadge}
          </span>
        </div>
      ) : null}

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

      {programCompatibility ? (
        <p className="mt-5 text-sm font-bold text-electricLight">
          Atualizado para o {programCompatibility}
        </p>
      ) : null}

      {programUpdateSummary ? (
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-goldSoft">
          {programUpdateSummary}
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
              {downloadButtonLabel}
            </GlowButton>
          ) : null}
        </div>
      </div>
      </MetallicCard>
    </div>
  );
}
