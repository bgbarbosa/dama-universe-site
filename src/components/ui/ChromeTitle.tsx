type ChromeTitleProps = {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function ChromeTitle({
  children,
  as = "h2",
  className = ""
}: ChromeTitleProps) {
  const Component = as;

  return (
    <Component
      className={[
        "title-chrome font-black tracking-tight",
        className || "text-3xl sm:text-4xl lg:text-5xl"
      ].join(" ")}
    >
      {children}
    </Component>
  );
}