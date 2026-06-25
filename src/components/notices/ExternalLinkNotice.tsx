import type { ReactNode } from "react";
import { NoticeBase } from "./NoticeBase";

type ExternalLinkNoticeProps = {
  title?: string;
  children?: ReactNode;
  className?: string;
};

export function ExternalLinkNotice({
  title = "Links externos",
  children,
  className
}: ExternalLinkNoticeProps) {
  return (
    <NoticeBase title={title} tone="external" className={className}>
      {children ??
        "Alguns botões poderão direcionar para serviços externos, como Google Drive, GitHub ou formulários. Verifique o destino antes de acessar ou baixar arquivos."}
    </NoticeBase>
  );
}
