"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { useConsentPreferences } from "@/components/privacy/ConsentProvider";
import { canMeasure, classifyMetricLink, metricReferrer, metricsConsentHeader, type SiteMetric } from "@/lib/site-metrics";

function submitMetric(metric: SiteMetric) {
  void fetch("/api/medicao", {
    method: "POST",
    headers: { "Content-Type": "application/json", [metricsConsentHeader]: "1" },
    body: JSON.stringify(metric),
    keepalive: true,
    credentials: "omit",
    referrerPolicy: "origin",
  }).catch(() => {});
}

export function SiteMetrics({
  paths,
  resources,
}: {
  paths: readonly string[];
  resources: readonly string[];
}) {
  const pathname = usePathname();
  const preferences = useConsentPreferences();
  const previous = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || !paths.includes(pathname) || !canMeasure(preferences)) return;

    function recordView() {
      if (document.visibilityState !== "visible" || !canMeasure(preferences) || pathname === previous.current) return;
      const source = previous.current ? "internal" : metricReferrer(document.referrer);
      previous.current = pathname;
      submitMetric({ event: "view", path: pathname, source });
    }

    function recordClick(click: MouseEvent) {
      if (!canMeasure(preferences) || !(click.target instanceof Element)) return;
      const link = click.target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement) || !URL.canParse(link.href)) return;
      const event = classifyMetricLink(new URL(link.href), pathname, paths, resources);
      if (event) submitMetric({ event, path: pathname, source: "internal" });
    }

    recordView();
    document.addEventListener("visibilitychange", recordView);
    document.addEventListener("click", recordClick, true);
    return () => {
      document.removeEventListener("visibilitychange", recordView);
      document.removeEventListener("click", recordClick, true);
    };
  }, [pathname, paths, preferences, resources]);

  return null;
}
