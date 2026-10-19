import Link from "next/link";
import { EditorialIntro, EditorialShell } from "@/components/editorial/EditorialIntro";
import { ContentLibrary } from "@/components/editorial/ContentLibrary";
import styles from "@/components/editorial/editorial.module.css";
import { posts } from "@/data/posts";
import { damaFccTutorials } from "@/data/tutorials";
import { formatDate, sortPostsByDate } from "@/lib/blog";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({title: "Conteúdos e guias — Dama Universe", description: "Artigos, experiências de desenvolvimento, tutoriais e registros de evolução sobre IA, automação, dados e projetos Dama.", path: "/blog"});

export default function BlogPage() {
  const sorted = sortPostsByDate(posts);
  const [featured] = sorted;
  return <EditorialShell>
    <EditorialIntro eyebrow="Conhecimento e experiências" title="Conteúdos e guias" lead="Conhecimento aplicado, experiências de desenvolvimento e orientações para usar melhor a tecnologia." description="Explore artigos sobre inteligência artificial, dados, automação e projetos Dama, além de tutoriais e registros de evolução." />
    <section aria-label="Seleção editorial" className={styles.featured}>
      <article className={styles.featureCopy}><p className={styles.eyebrow}>Destaque editorial · Artigo</p><h2>{featured.title}</h2><p>{featured.summary}</p><p className={styles.meta}>{featured.category} · <time dateTime={featured.date}>{formatDate(featured.date)}</time></p><div className={styles.links}><Link href={`/blog/${featured.slug}`}>Ler conteúdo <span aria-hidden="true">↗︎</span></Link></div></article>
      <ul className={styles.complementary}>{sorted.slice(1,3).map((post) => <li key={post.slug}><p className={styles.meta}>{post.category} · <time dateTime={post.date}>{formatDate(post.date)}</time></p><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.summary}</p><Link className={styles.inlineLink} href={`/blog/${post.slug}`} aria-label={`Ler ${post.title}`}>Ler conteúdo</Link></li>)}</ul>
    </section>
    <ContentLibrary posts={sorted} />
    <nav className={styles.readingPath} aria-labelledby="reading-path-title"><h2 id="reading-path-title">Comece por aqui</h2><p className={styles.description}>Da motivação à aplicação: um percurso sobre automação documental com conferência humana.</p><ol><li><Link className={styles.inlineLink} href="/blog/por-que-criei-o-dama-gerador-fcc">Entenda a necessidade</Link><p>Leia a motivação do Gerador FCC.</p></li><li><Link className={styles.inlineLink} href="/programas/dama-gerador-fcc">Conheça o programa</Link><p>Consulte finalidade, requisitos e recursos.</p></li><li><a className={styles.inlineLink} href={damaFccTutorials[0].watchUrl} target="_blank" rel="noopener noreferrer">Veja o primeiro tutorial</a><p>Abra no YouTube o vídeo já cadastrado sobre os primeiros passos.</p></li></ol></nav>
    <p className={`${styles.notice} ${styles.section}`}>Os conteúdos documentam decisões e aprendizados do projeto. Os comentários permanecem desativados por enquanto.</p>
  </EditorialShell>;
}
