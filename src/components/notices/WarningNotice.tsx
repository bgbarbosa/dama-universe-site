import type { ReactNode } from "react";
import { NoticeBase } from "./NoticeBase";

type WarningNoticeProps = {
  title?: string;
  children: ReactNode;
  className?: string;
};

export function WarningNotice({ title = "Atenção", children, className }: WarningNoticeProps) {
  return (
    <NoticeBase title={title} tone="warning" className={className}>
      {children}
    </NoticeBase>
  );
}
