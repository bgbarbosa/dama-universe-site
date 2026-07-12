"use client";

import { useEffect, useMemo, useRef } from "react";
import { SecurityNotice } from "@/components/notices";
import { useConsent } from "@/components/privacy";
import { MetallicCard } from "@/components/ui";

type GiscusConfig = {
  repo?: string;
  repoId?: string;
  category?: string;
  categoryId?: string;
};

export type GiscusCommentsProps = {
  title?: string;
  description?: string;
  mapping?: "pathname" | "url" | "title" | "og:title" | "specific" | "number";
  term?: string;
  theme?: string;
  className?: string;
};

const commentsWarning =
  "Comentários são bem-vindos para dúvidas gerais, sugestões e contribuições construtivas. Não publique dados pessoais, documentos, informações sigilosas, senhas ou conteúdo sensível.";

function getGiscusConfig(): GiscusConfig {
  return {
    repo: process.env.NEXT_PUBLIC_GISCUS_REPO,
    repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID,
    category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
    categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,
  };
}

function isConfigured(config: GiscusConfig) {
  return Boolean(config.repo && config.repoId && config.category && config.categoryId);
}

export function GiscusComments({
  title = "Comentários",
  description = "Espaço preparado para comentários via Giscus e GitHub Discussions.",
  mapping = "pathname",
  term,
  theme = "dark_dimmed",
  className,
}: GiscusCommentsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = useMemo(() => getGiscusConfig(), []);
  const configured = isConfigured(config);
  const { preferences, ready, savePreferences } = useConsent();
  const externalContentAllowed = preferences?.externalMedia === true;

  useEffect(() => {
    const container = containerRef.current;

    if (!container || !configured || !externalContentAllowed) {
      return;
    }

    container.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", config.repo ?? "");
    script.setAttribute("data-repo-id", config.repoId ?? "");
    script.setAttribute("data-category", config.category ?? "");
    script.setAttribute("data-category-id", config.categoryId ?? "");
    script.setAttribute("data-mapping", mapping);
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", theme);
    script.setAttribute("data-lang", "pt");
    script.setAttribute("data-loading", "lazy");

    if (term) {
      script.setAttribute("data-term", term);
    }

    container.appendChild(script);

    return () => {
      container.innerHTML = "";
    };
  }, [config.category, config.categoryId, config.repo, config.repoId, configured, externalContentAllowed, mapping, term, theme]);

  if (!configured) {
    return null;
  }

  return (
    <section className={className} aria-label="Comentários">
      <div className="space-y-5">
        <SecurityNotice title="Antes de comentar">{commentsWarning}</SecurityNotice>

        <MetallicCard className="border-dashed border-chrome/25 bg-surface/70">
          <div className="mb-5">
            <h3 className="text-xl font-semibold text-chromeLight">{title}</h3>
            <p className="mt-3 leading-7 text-muted">{description}</p>
          </div>

          {externalContentAllowed ? (
            <div ref={containerRef} className="min-h-32" />
          ) : ready ? (
            <div className="rounded-2xl border border-chrome/20 bg-backgroundSoft/80 p-5 text-sm leading-7 text-muted">
              <p>
                Os comentários usam Giscus e GitHub Discussions. A conexão só é
                aberta quando você permite conteúdo externo.
              </p>
              <button
                type="button"
                onClick={() =>
                  savePreferences({
                    analytics: preferences?.analytics ?? false,
                    externalMedia: true,
                  })
                }
                className="mt-4 min-h-11 rounded-full border border-electric/70 px-5 py-2 font-bold text-electricLight transition hover:bg-electric/10 focus-ring"
              >
                Permitir comentários externos
              </button>
            </div>
          ) : null}
        </MetallicCard>
      </div>
    </section>
  );
}
