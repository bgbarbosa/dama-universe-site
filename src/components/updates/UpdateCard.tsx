import type { UpdateItem } from "@/data";
import { GlowButton, MetallicCard } from "@/components/ui";

export type UpdateCardProps = {
  title: string;
  project?: string;
  area?: string;
  version?: string;
  type: string;
  date: string;
  summary: string;
  url?: string;
};

type UpdateCardInput = UpdateCardProps | { update: UpdateItem };

function normalizeUpdateCardProps(props: UpdateCardInput): UpdateCardProps {
  if ("update" in props) {
    return {
      title: props.update.title,
      area: props.update.area,
      type: props.update.type,
      date: props.update.date,
      summary: props.update.summary,
      url: props.update.url,
    };
  }

  return props;
}

function isExternalUrl(url?: string) {
  return Boolean(url && /^https?:\/\//i.test(url));
}

export function UpdateCard(props: UpdateCardInput) {
  const { title, project, area, version, type, date, summary, url } =
    normalizeUpdateCardProps(props);

  const updateArea = project ?? area ?? "Dama Universe";

  return (
    <MetallicCard className="group relative overflow-hidden hover:border-electric/40">
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-electric via-chrome to-transparent" />

      <div className="space-y-4 pl-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-electric/25 bg-electric/10 px-3 py-1 font-semibold text-electricLight">
            {type}
          </span>

          <span className="rounded-full border border-chrome/20 bg-white/[0.03] px-3 py-1 text-muted">
            {date}
          </span>

          {version ? (
            <span className="rounded-full border border-chrome/20 bg-white/[0.03] px-3 py-1 text-chrome">
              {version}
            </span>
          ) : null}
        </div>

        <div>
          <p className="text-sm font-medium text-electricLight">{updateArea}</p>

          <h3 className="mt-1 text-lg font-semibold text-chromeLight transition group-hover:text-text">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-7 text-muted">{summary}</p>
        </div>

        {url ? (
          <GlowButton
            href={url}
            external={isExternalUrl(url)}
            variant="ghost"
            className="px-0 py-0 text-xs text-electricLight hover:bg-transparent"
          >
            Ver detalhes →
          </GlowButton>
        ) : null}
      </div>
    </MetallicCard>
  );
}