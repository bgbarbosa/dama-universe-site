type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  subtitle,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const finalDescription = description ?? subtitle;

  return (
    <div
      className={[
        isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      ].join(" ")}
    >
      {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}

      <h1 className="title-chrome text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
        {title}
      </h1>

      {finalDescription ? <p className="body-text mt-6">{finalDescription}</p> : null}
    </div>
  );
}
