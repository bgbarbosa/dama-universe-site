import { createPageMetadata } from "@/lib/seo";
import { BlogCard } from "@/components/blog";
import { MetallicCard, PageHeader } from "@/components/ui";
import { posts } from "@/data";

export const metadata = createPageMetadata({
  title: "Blog — Dama Universe",
  description:
    "Artigos, registros de desenvolvimento e conteúdos sobre inteligência artificial, Python, automação, análise de dados, tecnologia e projetos Dama.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <main>
      <PageHeader
        title="Blog"
        subtitle="Conteúdos técnicos"
        description="O blog do Dama Universe reúne conteúdos sobre tecnologia, inteligência artificial, desenvolvimento de programas, automação, análise de dados, organização digital e registros de evolução dos projetos."
      />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <MetallicCard className="mb-10 border-electric/70 shadow-[0_0_35px_rgba(37,150,255,0.28)]">
          <h2 className="text-2xl font-semibold text-chromeLight">
            Artigos e registros de evolução
          </h2>
          <p className="mt-4 leading-8 text-muted">
            Os posts iniciais funcionam como base editorial para apresentar o projeto,
            documentar decisões e registrar aprendizados durante a evolução do Dama Universe.
            Os comentários permanecem desativados por enquanto.
          </p>
        </MetallicCard>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </main>
  );
}
