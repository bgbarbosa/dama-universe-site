type SectionTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  subtitle,
  align = "left",
  className = "",
}: SectionTitleProps) {
  const isCenter = align === "center";
  const finalDescription = description ?? subtitle;

  return (
    <div
      className={[
        isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl",
        className,
      ].join(" ")}
    >
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}

      <h2 className="title-chrome text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {finalDescription ? <p className="body-text mt-4">{finalDescription}</p> : null}
    </div>
  );
}
