import { posts } from "@/data";
import { BlogCard } from "@/components/blog";
import { GlowButton, SectionTitle } from "@/components/ui";

export function RecentPosts() {
  const recentPosts = posts.slice(0, 3);

  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionTitle
            eyebrow="Blog"
            title="Blog e conteúdos"
            description="Registros de desenvolvimento, tecnologia, documentação, automação e uso responsável de inteligência artificial."
          />
          <GlowButton href="/blog" variant="secondary" className="w-fit">
            Ver todos
          </GlowButton>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <div
              key={post.slug}
              className="rounded-3xl border border-electric/70 shadow-[0_0_35px_rgba(37,150,255,0.28)]"
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
