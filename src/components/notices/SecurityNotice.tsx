import type { ReactNode } from "react";
import { NoticeBase } from "./NoticeBase";

type SecurityNoticeProps = {
  title?: string;
  children?: ReactNode;
  className?: string;
};

export function SecurityNotice({ title = "Segurança", children, className }: SecurityNoticeProps) {
  return (
    <NoticeBase title={title} tone="security" className={className}>
      {children ??
        "Não publique nem envie dados sensíveis, senhas, tokens, documentos sigilosos, dados pessoais de terceiros ou informações restritas."}
    </NoticeBase>
  );
}
