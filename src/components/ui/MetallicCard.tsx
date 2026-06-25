import type { ReactNode } from "react";

type MetallicCardVariant = "default" | "featured" | "notice" | "warning" | "future";

type MetallicCardProps = {
  children: ReactNode;
  variant?: MetallicCardVariant;
  className?: string;
};

const variantClasses: Record<MetallicCardVariant, string> = {
  default:
    "border-borderSoft bg-surface/88 hover:border-electric/55",
  featured:
    "border-electric/70 bg-surface/95 shadow-electric hover:border-electricLight",
  notice:
    "border-borderSoft bg-surfaceMuted/80",
  warning:
    "border-dangerBorder/80 bg-dangerSoft/70",
  future:
    "border-border bg-surface/65 opacity-95"
};

export function MetallicCard({
  children,
  variant = "default",
  className = ""
}: MetallicCardProps) {
  return (
    <div
      className={[
        "rounded-2xl border bg-metallic-card p-6 transition-all duration-200",
        variantClasses[variant],
        className
      ].join(" ")}
    >
      {children}
    </div>
  );
}