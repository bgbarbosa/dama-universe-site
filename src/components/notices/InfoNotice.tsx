import type { ReactNode } from "react";
import { NoticeBase } from "./NoticeBase";

type InfoNoticeProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function InfoNotice({ title = "Informação", children, className }: InfoNoticeProps) {
  return (
    <NoticeBase title={title} tone="info" className={className}>
      {children}
    </NoticeBase>
  );
}
