import { createPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { ResponsibilityNotice } from "@/components/notices";
import { GiscusComments } from "@/components/comments";
import { GlowButton, MetallicCard, PageHeader } from "@/components/ui";
import { getPostContentBySlug, postContents } from "@/data";

export function generateStaticParams() {
  return postContents.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostContentBySlug(slug);

  if (!post) {
    return createPageMetadata({
      title: "Post não encontrado — Dama Universe",
      description: "O post solicitado não foi encontrado no Blog do Dama Universe.",
      path: `/blog/${slug}`,
    });
  }

  return createPageMetadata({
    title: `${post.title} — Blog Dama Universe`,
    description: post.summary,
    path: `/blog/${slug}`,
    type: "article",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostContentBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <PageHeader title={post.title} subtitle={post.category} description={post.summary} />

      <article className="mx-auto max-w-4xl px-6 pb-20">
        <MetallicCard className="mb-8 border-electric/70 shadow-[0_0_35px_rgba(37,150,255,0.28)]">
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-electric/30 bg-electric/10 px-3 py-1 font-semibold text-electricLight">
              {post.category}
            </span>
            <span className="rounded-full border border-chrome/20 bg-white/[0.03] px-3 py-1 text-muted">
              {post.date}
            </span>
            {post.readingTime ? (
              <span className="rounded-full border border-chrome/20 bg-white/[0.03] px-3 py-1 text-muted">
                {post.readingTime}
              </span>
            ) : null}
          </div>

          {post.tags?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-muted">
                  #{tag}
                </span>
              ))}
            </div>
          ) : null}
        </MetallicCard>

        <div className="space-y-8">
          {post.content.map((section) => (
            <MetallicCard
              key={section.heading}
              className="border-electric/60 shadow-[0_0_28px_rgba(37,150,255,0.20)]"
            >
              <h2 className="text-2xl font-semibold text-chromeLight">{section.heading}</h2>
              <div className="mt-4 space-y-4 break-words text-base leading-8 text-muted [overflow-wrap:anywhere]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </MetallicCard>
          ))}
        </div>

        <div className="mt-10 space-y-6">
          <ResponsibilityNotice>
            Conteúdos técnicos publicados no Dama Universe possuem finalidade informativa e de apoio. A aplicação prática exige análise, validação e responsabilidade do usuário.
          </ResponsibilityNotice>

          <GiscusComments
            title={`Comentários sobre “${post.title}”`}
            description="Use este espaço para dúvidas gerais e contribuições construtivas relacionadas ao conteúdo."
          />

          <div className="flex flex-wrap gap-3">
            <GlowButton href="/blog" variant="secondary">
              Voltar ao Blog
            </GlowButton>
            <GlowButton href="/contato" variant="ghost">
              Enviar sugestão
            </GlowButton>
          </div>
        </div>
      </article>
    </main>
  );
}
