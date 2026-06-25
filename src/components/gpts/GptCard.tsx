import type { CustomGpt } from "@/data";
import { GlowButton, MetallicCard } from "@/components/ui";

type GptCardProps = {
  gpt: CustomGpt;
};

export function GptCard({ gpt }: GptCardProps) {
  const isExternal = gpt.url.startsWith("http");
  const isUnavailable = gpt.url === "#";

  return (
    <MetallicCard variant={gpt.featured ? "featured" : "default"} className="flex h-full flex-col">
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full border border-electric/45 bg-electric/10 px-3 py-1 text-xs font-bold text-electricLight">
          {gpt.category}
        </span>
        <span
          className={[
            "rounded-full border px-3 py-1 text-xs font-bold",
            gpt.status === "Público"
              ? "border-gold/50 bg-gold/10 text-goldSoft"
              : "border-borderSoft bg-white/5 text-muted",
          ].join(" ")}
        >
          {gpt.status}
        </span>
      </div>

      <h3 className="mt-6 text-2xl font-black leading-tight text-text">{gpt.name}</h3>
      <p className="body-text-sm mt-4">{gpt.shortDescription}</p>

      <div className="mt-6 rounded-2xl border border-border bg-background/35 p-4">
        <p className="text-sm font-bold text-text">Finalidade</p>
        <p className="mt-2 text-sm leading-7 text-muted">{gpt.purpose}</p>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <p className="text-sm font-bold text-text">Indicado para</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
            {gpt.indicatedFor.slice(0, 4).map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-bold text-text">Cuidados</p>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
            {gpt.precautions.slice(0, 4).map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <GlowButton href={isUnavailable ? undefined : gpt.url} external={isExternal} variant={isUnavailable ? "secondary" : "primary"} disabled={isUnavailable}>
          {isUnavailable ? "Em breve" : "Acessar GPT"}
        </GlowButton>
      </div>
    </MetallicCard>
  );
}
