import type { ReactNode } from "react";
import { NoticeBase } from "./NoticeBase";

type ResponsibilityNoticeProps = {
  title?: string;
  children?: ReactNode;
  className?: string;
};

export function ResponsibilityNotice({
  title = "Aviso de responsabilidade",
  children,
  className
}: ResponsibilityNoticeProps) {
  return (
    <NoticeBase title={title} tone="responsibility" className={className}>
      {children ??
        "As ferramentas e conteúdos do Dama Universe possuem finalidade de apoio, organização e estudo. A conferência final das informações e resultados é responsabilidade do usuário."}
    </NoticeBase>
  );
}
