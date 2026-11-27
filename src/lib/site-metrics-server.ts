import "server-only";

import { publicMetricPaths } from "@/lib/site-metrics-inventory";
import { clickEvents, metricSources, metricsConsentHeader, metricsOrigin, type SiteMetric } from "@/lib/site-metrics";

const panelEndpoint = "https://painel-autoridade-digital-mb.marcobarbosa.chatgpt.site/api/collect?site=dama";
const pagePaths = new Set(publicMetricPaths);
const expectedHost = new URL(metricsOrigin).host;

export function metricsRequestAllowed(request: Request) {
  const host = request.headers.get("host") || new URL(request.url).host;
  const fetchSite = request.headers.get("sec-fetch-site");
  return process.env.VERCEL_ENV === "production" &&
    host === expectedHost &&
    request.headers.get("origin") === metricsOrigin &&
    (!fetchSite || fetchSite === "same-origin");
}

export function metricsRequestOptOut(request: Request) {
  return request.headers.get(metricsConsentHeader) !== "1" ||
    request.headers.get("dnt") === "1" ||
    request.headers.get("sec-gpc") === "1";
}

export function validateBrowserMetric(input: unknown): input is SiteMetric {
  if (!input || typeof input !== "object" || Object.keys(input).length !== 3) return false;
  const { event, path, source } = input as Partial<SiteMetric>;
  if (typeof path !== "string" || path.length > 200 || !pagePaths.has(path)) return false;
  if (event === "view") return metricSources.some((item) => item === source);
  return source === "internal" && clickEvents.some((item) => item === event);
}

export async function sendSiteMetric(metric: SiteMetric) {
  const token = process.env.MB_METRICS_PANEL_TOKEN?.trim();
  const writeKey = process.env.MB_METRICS_WRITE_KEY?.trim();
  if (!token || !writeKey) return false;
  try {
    const response = await fetch(panelEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "OAI-Sites-Authorization": "Bearer " + token,
        "X-MB-Metrics-Key": writeKey,
      },
      body: JSON.stringify(metric),
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(2_000),
    });
    return response.status === 204;
  } catch {
    return false;
  }
}
