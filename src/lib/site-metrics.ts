import type { ConsentPreferences } from "@/lib/consent";
import { siteConfig } from "@/lib/seo";

export const metricsOrigin = siteConfig.url;
export const metricsConsentHeader = "X-Dama-Analytics-Consent";

export const metricSources = [
  "direct", "google", "bing", "search_other", "ai", "dama", "social", "external", "internal",
] as const;

export const clickEvents = ["guide_click", "profile_click", "contact_click", "resource_click"] as const;

export type MetricSource = (typeof metricSources)[number];
export type ClickMetric = (typeof clickEvents)[number];
export type SiteMetric = {
  event: "view" | ClickMetric | "contact_success";
  path: string;
  source: MetricSource;
};

const professionalOrigin = "https://pericia-digital-marco-site.vercel.app";

export function canMeasure(preferences: ConsentPreferences | null) {
  const privacy = navigator as Navigator & { globalPrivacyControl?: boolean };
  const browser = window as Window & { doNotTrack?: string };
  return window.location.origin === metricsOrigin &&
    preferences?.analytics === true &&
    Date.parse(preferences.expiresAt) > Date.now() &&
    privacy.globalPrivacyControl !== true &&
    privacy.doNotTrack !== "1" &&
    browser.doNotTrack !== "1";
}

function domainMatches(host: string, domains: string[]) {
  return domains.some((domain) => host === domain || host.endsWith("." + domain));
}

export function metricReferrer(referrer: string): MetricSource {
  let url: URL;
  try {
    url = new URL(referrer);
  } catch {
    return "direct";
  }

  const host = url.hostname;
  if (domainMatches(host, ["damauniverse.com.br", "dama-universe-site.vercel.app"])) return "internal";
  if (domainMatches(host, [
    "chatgpt.com", "openai.com", "gemini.google.com", "perplexity.ai", "copilot.microsoft.com", "claude.ai", "grok.com",
  ])) return "ai";
  if (domainMatches(host, ["google.com", "google.com.br", "google.co.uk"])) return "google";
  if (domainMatches(host, ["bing.com"])) return "bing";
  if (domainMatches(host, ["duckduckgo.com", "search.yahoo.com", "search.brave.com", "ecosia.org"])) return "search_other";
  if (domainMatches(host, [
    "facebook.com", "instagram.com", "linkedin.com", "lnkd.in", "x.com", "twitter.com", "t.co",
    "whatsapp.com", "wa.me", "reddit.com", "youtube.com",
  ])) return "social";
  return "external";
}

export function classifyMetricLink(
  destination: URL,
  path: string,
  publicPaths: readonly string[],
  resourceLinks: readonly string[],
): ClickMetric | null {
  if (destination.protocol === "mailto:" || destination.hostname === "wa.me") return "contact_click";
  const target = destination.pathname;
  if (destination.origin === professionalOrigin && ["/", "/perfil", "/cartao"].includes(target)) {
    return "profile_click";
  }
  if (resourceLinks.includes(destination.href)) return "resource_click";
  if (destination.origin !== metricsOrigin || target === path || !publicPaths.includes(target)) return null;
  if (target === "/contato") return "contact_click";
  if (target === "/sobre") return "profile_click";
  if (target === "/referencias") return "guide_click";
  if (/^\/(?:programas|gpts|utilidade-publica)(?:\/|$)/.test(target)) return "resource_click";
  return null;
}
