import Link from "next/link";
import type { ReactNode } from "react";

type GlowButtonVariant = "primary" | "secondary" | "ghost" | "gold";

type GlowButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: GlowButtonVariant;
  className?: string;
  external?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  title?: string;
};

const variantClasses: Record<GlowButtonVariant, string> = {
  primary:
    "border border-electric/70 bg-electric text-white shadow-electricStrong hover:bg-electricLight hover:shadow-electricStrong",
  secondary:
    "border border-borderSoft bg-white/0 text-text hover:border-electricLight hover:bg-electric/10",
  ghost:
    "border border-border bg-transparent text-muted hover:border-borderSoft hover:bg-white/5 hover:text-text",
  gold:
    "border border-gold/60 bg-gold/10 text-goldSoft shadow-gold hover:border-goldSoft hover:bg-gold/15",
};

export function GlowButton({
  href,
  children,
  variant = "secondary",
  className = "",
  external = false,
  type = "button",
  onClick,
  disabled = false,
  title,
}: GlowButtonProps) {
  const classes = [
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition-all duration-200 focus-ring",
    disabled ? "cursor-not-allowed opacity-55 hover:border-borderSoft hover:bg-transparent hover:shadow-none" : variantClasses[variant],
    className,
  ].join(" ");

  if (href && !disabled) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={onClick}
          title={title}
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={classes} onClick={onClick} title={title}>
        {children}
      </Link>
    );
  }

  if (href && disabled) {
    return (
      <span className={classes} aria-disabled="true" title={title}>
        {children}
      </span>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled} title={title}>
      {children}
    </button>
  );
}
