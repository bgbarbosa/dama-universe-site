import Link from "next/link";
import { YouTubeEmbed } from "@/components/privacy/YouTubeEmbed";
import { posts } from "@/data/posts";
import { damaFccTutorials } from "@/data/tutorials";
import { formatDate } from "@/lib/blog";
import styles from "./home.module.css";

const articleSlugs = ["por-que-criei-o-dama-gerador-fcc", "como-organizo-versoes-dos-meus-programas", "inteligencia-artificial-como-ferramenta-de-apoio"];

export function ContentPreview() {
  const tutorial = damaFccTutorials[0];
  const articles = articleSlugs.flatMap(slug => posts.find(post => post.slug === slug) ?? []);
  return <section id="conteudos" className={`container-site ${styles.section}`} aria-labelledby="conteudos-title">
    <div className={styles.sectionHeading}><div><p className={styles.eyebrow}>Conhecimento compartilhado</p><h2 id="conteudos-title" className={styles.sectionTitle}>Conteúdos e primeiros passos</h2><p className={styles.description}>Aprenda a usar as ferramentas e conheça as ideias por trás dos projetos.</p></div></div>
    <div className={styles.contentGrid}>
      <article className={styles.tutorial}>
        <div className={styles.videoFrame}><YouTubeEmbed videoId={tutorial.videoId} title={tutorial.title} className="h-full w-full" /></div>
        <p className={styles.programCategory}>Tutorial <span aria-hidden="true">·</span> Dama Gerador FCC 3.0</p>
        <h3>{tutorial.title}</h3>
        <p>{tutorial.description}</p>
        <Link href="/programas/dama-gerador-fcc" className={`${styles.textLink} focus-ring`}>Ver o programa e a série completa <span aria-hidden="true">↗︎</span></Link>
      </article>
      <div>
        <ul className={styles.articles}>{articles.map(post => <li key={post.slug}><p className={styles.programCategory}>{post.category} <span aria-hidden="true">·</span> <time dateTime={post.date}>{formatDate(post.date)}</time></p><h3><Link href={`/blog/${post.slug}`} className="focus-ring">{post.title}<span aria-hidden="true"> ↗︎</span></Link></h3><p>{post.summary}</p></li>)}</ul>
        <Link href="/blog" className={`${styles.textLink} focus-ring`}>Explorar artigos no Blog <span aria-hidden="true">↗︎</span></Link>
      </div>
    </div>
  </section>;
}
