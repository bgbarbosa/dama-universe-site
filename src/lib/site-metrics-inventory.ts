import sitemap from "@/app/sitemap";
import { customGpts } from "@/data/gpts";
import { programs } from "@/data/programs";

export const publicMetricPaths = sitemap().map(({ url }) => new URL(url).pathname);

export const resourceMetricLinks = [
  ...programs.flatMap(({ downloadUrl, alternativeDownload }) => [downloadUrl, alternativeDownload?.url]),
  ...customGpts.map(({ url }) => url),
].filter((url): url is string => Boolean(url)).map((url) => new URL(url).href);
