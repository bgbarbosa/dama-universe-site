import type { ReferenceItem } from "@/data";
import { GlowButton, MetallicCard } from "@/components/ui";

export type ReferenceCardProps = ReferenceItem;

type ReferenceCardInput = ReferenceCardProps | { reference: ReferenceItem };

const typeClasses: Record<string, string> = {
  Pessoa: "border-electric/35 bg-electric/10 text-electricLight",
  Instituição: "border-gold/45 bg-gold/10 text-goldSoft",
  Curso: "border-cyan-300/35 bg-cyan-300/10 text-cyan-100",
  Ferramenta: "border-purple-300/35 bg-purple-300/10 text-purple-100",
  Artigo: "border-gold/60 bg-gold/10 text-goldSoft",
  Site: "border-borderSoft bg-white/[0.04] text-muted",
};

function normalizeReferenceCardProps(props: ReferenceCardInput): ReferenceCardProps {
  if ("reference" in props) {
    return props.reference;
  }

  return props;
}

function isExternalUrl(url?: string) {
  return Boolean(url && /^https?:\/\//i.test(url));
}

export function ReferenceCard(props: ReferenceCardInput) {
  const {
    name,
    type,
    area,
    description,
    reason,
    links,
    tags = [],
    imageUrl,
    authorizedImage = false,
    featured = false,
  } = normalizeReferenceCardProps(props);

  const canShowImage = Boolean(imageUrl && authorizedImage);
  const cardHighlightClass = featured
    ? "border-gold/80 shadow-[0_0_45px_rgba(255,204,77,0.30)] hover:border-gold hover:shadow-[0_0_55px_rgba(255,204,77,0.42)]"
    : "border-electric/70 shadow-[0_0_35px_rgba(37,150,255,0.28)] hover:border-electric hover:shadow-[0_0_45px_rgba(37,150,255,0.40)]";

  return (
    <MetallicCard className={`group flex h-full flex-col gap-5 ${cardHighlightClass}`}>
      {canShowImage ? (
        <div className="overflow-hidden rounded-2xl border border-border bg-backgroundSoft">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={`Imagem relacionada a ${name}`}
            className="h-40 w-full object-cover opacity-90"
          />
        </div>
      ) : null}

      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span
            className={[
              "rounded-full border px-3 py-1 font-bold",
              typeClasses[type] ?? "border-borderSoft bg-white/[0.04] text-muted",
            ].join(" ")}
          >
            {featured ? "Destaque" : type}
          </span>

          <span className="rounded-full border border-chrome/20 bg-white/[0.03] px-3 py-1 font-semibold text-muted">
            {area}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-black leading-tight text-chromeLight transition group-hover:text-text">
            {name}
          </h3>

          <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
        </div>

        <div className="rounded-2xl border border-borderSoft bg-white/[0.025] p-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-electricLight">
            Por que está aqui
          </p>
          <p className="mt-3 text-sm leading-7 text-muted">{reason}</p>
        </div>

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={`${name}-${tag}`}
                className="rounded-full border border-borderSoft bg-white/[0.03] px-3 py-1 text-xs font-semibold text-mutedSoft"
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {links.length > 0 ? (
        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          {links.map((link, index) => (
            <GlowButton
              key={`${name}-${link.label}`}
              href={link.url}
              external={isExternalUrl(link.url)}
              variant={index === 0 ? "secondary" : "ghost"}
              className="px-4 py-2 text-xs"
            >
              {link.label}
            </GlowButton>
          ))}
        </div>
      ) : null}
    </MetallicCard>
  );
}
