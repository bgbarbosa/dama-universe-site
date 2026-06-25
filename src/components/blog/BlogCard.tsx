import type { PostItem } from "@/data";
import { GlowButton, MetallicCard } from "@/components/ui";

export type BlogCardProps = {
  title: string;
  category: string;
  summary: string;
  date: string;
  slug: string;
  readingTime?: string;
};

type BlogCardInput = BlogCardProps | { post: PostItem };

function normalizeBlogCardProps(props: BlogCardInput): BlogCardProps {
  if ("post" in props) {
    return {
      title: props.post.title,
      category: props.post.category,
      summary: props.post.summary,
      date: props.post.date,
      slug: props.post.slug,
      readingTime: props.post.readingTime,
    };
  }

  return props;
}

export function BlogCard(props: BlogCardInput) {
  const { title, category, summary, date, slug, readingTime } = normalizeBlogCardProps(props);

  return (
    <MetallicCard className="group flex h-full flex-col gap-5 border-electric/70 shadow-[0_0_35px_rgba(37,150,255,0.28)] hover:border-electric">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full border border-electric/25 bg-electric/10 px-3 py-1 font-semibold text-electricLight">
            {category}
          </span>
          <span className="rounded-full border border-chrome/20 bg-white/[0.03] px-3 py-1 text-muted">
            {date}
          </span>
          {readingTime ? (
            <span className="rounded-full border border-chrome/20 bg-white/[0.03] px-3 py-1 text-muted">
              {readingTime}
            </span>
          ) : null}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-chromeLight transition group-hover:text-text">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">{summary}</p>
        </div>
      </div>

      <div className="mt-auto">
        <GlowButton
          href={`/blog/${slug}`}
          variant="ghost"
          className="px-0 py-0 text-xs text-electricLight hover:bg-transparent"
        >
          Ler conteúdo →
        </GlowButton>
      </div>
    </MetallicCard>
  );
}
