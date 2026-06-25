import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type NoticeTone = "info" | "warning" | "responsibility" | "security" | "external";

type NoticeBaseProps = {
  title: string;
  children: ReactNode;
  tone?: NoticeTone;
  className?: string;
};

const toneClasses: Record<NoticeTone, string> = {
  info: "border-electric/35 bg-electric/10 text-electricLight",
  warning: "border-amber-300/35 bg-amber-300/10 text-amber-100",
  responsibility: "border-chrome/35 bg-chrome/10 text-chromeLight",
  security: "border-red-300/35 bg-red-400/10 text-red-100",
  external: "border-cyan-300/35 bg-cyan-300/10 text-cyan-100"
};

export function NoticeBase({ title, children, tone = "info", className }: NoticeBaseProps) {
  return (
    <aside
      className={cn(
        "rounded-2xl border p-5 shadow-card backdrop-blur-sm",
        toneClasses[tone],
        className
      )}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.18em]">{title}</p>
      <div className="mt-3 text-sm leading-7 text-text/85">{children}</div>
    </aside>
  );
}
