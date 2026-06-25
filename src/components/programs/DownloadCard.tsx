import type { DownloadItem } from "@/data";
import { ExternalLinkNotice } from "@/components/notices";
import { GlowButton, MetallicCard } from "@/components/ui";

export type DownloadCardProps = {
  program: string;
  version: string;
  format: string;
  system: string;
  status: string;
  downloadUrl: string;
  manualUrl?: string;
  changelogUrl?: string;
  notes?: string;
};

type DownloadCardInput = DownloadCardProps | { download: DownloadItem };

function normalizeDownloadCardProps(props: DownloadCardInput): DownloadCardProps {
  if ("download" in props) {
    return {
      program: props.download.program,
      version: props.download.version,
      format: props.download.format,
      system: props.download.system,
      status: props.download.status,
      downloadUrl: props.download.downloadUrl,
      manualUrl: props.download.manualUrl,
      changelogUrl: props.download.changelogUrl,
      notes: props.download.notes,
    };
  }

  return props;
}

function isExternalUrl(url?: string) {
  return Boolean(url && /^https?:\/\//i.test(url));
}

function isRealUrl(url?: string) {
  return Boolean(url && url !== "#");
}

export function DownloadCard(props: DownloadCardInput) {
  const { program, version, format, system, status, downloadUrl, manualUrl, changelogUrl, notes } =
    normalizeDownloadCardProps(props);

  const canDownload = isRealUrl(downloadUrl);
  const downloadIsExternal = isExternalUrl(downloadUrl);

  return (
    <MetallicCard className="group flex h-full flex-col gap-5 hover:border-electric/40">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-electric/30 bg-electric/10 px-3 py-1 text-xs font-semibold text-electricLight">
            {version}
          </span>
          <span className="rounded-full border border-chrome/20 bg-white/[0.03] px-3 py-1 text-xs text-muted">
            {status}
          </span>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-chromeLight transition group-hover:text-text">
            {program}
          </h3>
          <dl className="mt-4 grid gap-3 text-sm text-muted sm:grid-cols-2">
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-chromeDark">Formato</dt>
              <dd className="mt-1 font-medium text-text">{format}</dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.18em] text-chromeDark">Sistema</dt>
              <dd className="mt-1 font-medium text-text">{system}</dd>
            </div>
          </dl>
        </div>

        {notes ? <p className="body-text-sm">{notes}</p> : null}
      </div>

      <div className="mt-auto space-y-4">
        <div className="flex flex-wrap gap-3">
          <GlowButton
            href={canDownload ? downloadUrl : undefined}
            external={downloadIsExternal}
            className="px-4 py-2 text-xs"
            disabled={!canDownload}
            title={!canDownload ? "Link de download ainda não publicado" : undefined}
          >
            {canDownload ? "Baixar versão" : "Em breve"}
          </GlowButton>
          {manualUrl ? (
            <GlowButton
              href={manualUrl !== "#" ? manualUrl : undefined}
              external={isExternalUrl(manualUrl)}
              variant="secondary"
              className="px-4 py-2 text-xs"
              disabled={manualUrl === "#"}
            >
              Manual
            </GlowButton>
          ) : null}
          {changelogUrl ? (
            <GlowButton
              href={changelogUrl}
              external={isExternalUrl(changelogUrl)}
              variant="ghost"
              className="px-4 py-2 text-xs"
            >
              Changelog
            </GlowButton>
          ) : null}
        </div>

        {downloadIsExternal ? (
          <ExternalLinkNotice>
            O download será aberto em serviço externo. Confira a versão e revise as orientações antes de utilizar.
          </ExternalLinkNotice>
        ) : null}
      </div>
    </MetallicCard>
  );
}
