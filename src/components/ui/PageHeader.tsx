import { cn } from "@/lib/cn";
import { ChromeTitle } from "./ChromeTitle";

type PageHeaderProps = {
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
};

export function PageHeader({ title, subtitle, description, className }: PageHeaderProps) {
  return (
    <header className={cn("mx-auto max-w-5xl px-6 py-14 text-center md:py-20", className)}>
      {subtitle ? (
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-electricLight">
          {subtitle}
        </p>
      ) : null}
      <ChromeTitle as="h1" className="break-words text-3xl sm:text-4xl md:text-7xl">
        {title}
      </ChromeTitle>
      {description ? (
        <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-muted md:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
