import type { SupportOption } from "@/data";
import { GlowButton, MetallicCard } from "@/components/ui";

export type SupportCardProps = {
  name: string;
  description: string;
  status: string;
  url?: string;
};

type SupportCardInput = SupportCardProps | { support: SupportOption };

function normalizeSupportCardProps(props: SupportCardInput): SupportCardProps {
  if ("support" in props) {
    return props.support;
  }

  return props;
}

function isExternalUrl(url?: string) {
  return Boolean(url && /^https?:\/\//i.test(url));
}

export function SupportCard(props: SupportCardInput) {
  const { name, description, status, url } = normalizeSupportCardProps(props);

  return (
    <MetallicCard className="group flex h-full flex-col gap-5 hover:border-electric/40">
      <div className="space-y-3">
        <span className="inline-flex rounded-full border border-electric/25 bg-electric/10 px-3 py-1 text-xs font-semibold text-electricLight">
          {status}
        </span>

        <div>
          <h3 className="text-xl font-semibold text-chromeLight transition group-hover:text-text">
            {name}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">{description}</p>
        </div>
      </div>

      {url ? (
        <div className="mt-auto">
          <GlowButton
            href={url}
            external={isExternalUrl(url)}
            variant="secondary"
            className="px-4 py-2 text-xs"
          >
            Ver opção
          </GlowButton>
        </div>
      ) : null}
    </MetallicCard>
  );
}
