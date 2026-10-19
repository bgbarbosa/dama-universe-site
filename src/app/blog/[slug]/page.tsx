import { formatDate, getReadingTime, relatedPrograms } from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { ResponsibilityNotice } from "@/components/notices";
import { GiscusComments } from "@/components/comments";
import Link from "next/link";
import { EditorialIntro, EditorialShell } from "@/components/editorial/EditorialIntro";
import { CopyButton } from "@/components/editorial/CopyButton";
import styles from "@/components/editorial/editorial.module.css";
import { sectionAnchor } from "@/lib/editorial";
import { siteConfig } from "@/lib/seo";
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
    <EditorialShell>
      <EditorialIntro title={post.title} eyebrow={post.category} description={post.summary} />

      <article className={styles.article}>
        <div>
          <div className="flex flex-wrap gap-2 text-xs">
            <span className="rounded-full border border-electric/30 bg-electric/10 px-3 py-1 font-semibold text-electricLight">
              {post.category}
            </span>
            <span className="rounded-full border border-chrome/20 bg-white/[0.03] px-3 py-1 text-muted">
              Publicado em <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            {post.updatedAt ? <span className="rounded-full border border-chrome/20 px-3 py-1 text-muted">Atualizado em <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></span> : null}
            {getReadingTime(post.slug) ? (
              <span className="rounded-full border border-chrome/20 bg-white/[0.03] px-3 py-1 text-muted">
                {getReadingTime(post.slug)}
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
        </div>

        {post.content.length >= 3 ? <nav className={styles.tableOfContents} aria-label="Neste conteúdo"><h2>Neste conteúdo</h2><ol>{post.content.map((section, index) => <li key={section.heading}><Link className={styles.inlineLink} href={`#${sectionAnchor(section.heading, index)}`}>{section.heading}</Link></li>)}</ol></nav> : null}

        <div className="space-y-8">
          {post.content.map((section, index) => (
            <section
              key={section.heading}
              id={sectionAnchor(section.heading, index)}
              className={styles.prose}
            >
              <h2 className="text-2xl font-semibold text-chromeLight">{section.heading}</h2>
              <div className="mt-4 space-y-4 break-words text-base leading-8 text-muted [overflow-wrap:anywhere]">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <CopyButton text={`${siteConfig.url}/blog/${post.slug}#${sectionAnchor(section.heading, index)}`} label={`Copiar link: ${section.heading}`} successLabel="Link da seção copiado." />
            </section>
          ))}
        </div>

        <div className="mt-10 space-y-6">
          {relatedPrograms[post.slug]?.length ? <nav aria-label="Programas relacionados" className="flex flex-wrap gap-3">
            {relatedPrograms[post.slug].map((program) => <Link className={styles.primaryButton} key={program.href} href={program.href}>Conhecer {program.name}</Link>)}
          </nav> : null}
          <ResponsibilityNotice>
            Conteúdos técnicos publicados no Dama Universe possuem finalidade informativa e de apoio. A aplicação prática exige análise, validação e responsabilidade do usuário.
          </ResponsibilityNotice>

          <GiscusComments
            title={`Comentários sobre “${post.title}”`}
            description="Use este espaço para dúvidas gerais e contribuições construtivas relacionadas ao conteúdo."
          />

          <div className="flex flex-wrap gap-3">
            <Link className={styles.secondaryButton} href="/blog">
              Voltar aos conteúdos
            </Link>
            <Link className={styles.inlineLink} href="/contato?tipo=sugestao">
              Enviar sugestão
            </Link>
          </div>
        </div>
      </article>
    </EditorialShell>
  );
}
