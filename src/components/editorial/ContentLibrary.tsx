"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { PostItem } from "@/data/posts";
import { articleVisual } from "@/data/editorialVisuals";
import { formatDate } from "@/lib/blog";
import { filterPosts, postSubjects, type PostSubject } from "@/lib/editorial";
import styles from "./editorial.module.css";

export function ContentLibrary({ posts }: { posts: readonly PostItem[] }) {
  const [subject, setSubject] = useState<PostSubject>("Todos");
  const [query, setQuery] = useState("");
  const search = useRef<HTMLInputElement>(null);
  const results = filterPosts(posts, subject, query);
  function clear() { setSubject("Todos"); setQuery(""); search.current?.focus(); }
  return (
    <section className={styles.section} aria-labelledby="archive-title">
      <div className={styles.sectionHeading}><h2 id="archive-title">Acervo completo</h2><p role="status" aria-live="polite">{results.length} {results.length === 1 ? "conteúdo encontrado" : "conteúdos encontrados"}</p></div>
      <fieldset className={styles.filters}><legend className="sr-only">Filtrar conteúdos por assunto</legend>{postSubjects.map((item) => <button key={item} type="button" aria-pressed={subject === item} onClick={() => setSubject(item)}>{item}</button>)}</fieldset>
      <div className={styles.searchRow}>
        <label>Buscar conteúdo<input ref={search} type="search" placeholder="Título, assunto ou resumo" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
        {query || subject !== "Todos" ? <button type="button" className={styles.textButton} onClick={clear}>Limpar filtros</button> : null}
      </div>
      {results.length ? <ul className={styles.archiveList}>{results.map((post) => <li key={post.slug} data-testid={`archive-${post.slug}`}>
        <Link href={`/blog/${post.slug}`} className={styles.archiveCard} aria-label={`Ler ${post.title}`}>
        <div className={styles.archiveCover} data-kind={articleVisual(post.slug).kind} aria-hidden="true"><Image src={articleVisual(post.slug).src} width={articleVisual(post.slug).width} height={articleVisual(post.slug).height} alt="" sizes="(min-width: 768px) 560px, 90vw" /></div>
        <div className={styles.archiveBody}>
        <div className={styles.meta}>Artigo · {post.category}{" "}<time dateTime={post.date}>{formatDate(post.date)}</time></div>
        <div><h3>{post.title}</h3><p>{post.summary}</p>{post.updatedAt ? <p className={styles.small}>Revisão registrada em <time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></p> : null}</div>
        <span className={styles.inlineLink}>Ler conteúdo <span aria-hidden="true">↗︎</span></span>
        </div>
        </Link>
      </li>)}</ul> : <div className={styles.empty}><h3>Nenhum conteúdo encontrado</h3><p>Tente outro assunto ou limpe os filtros.</p><button type="button" className={styles.secondaryButton} onClick={clear}>Mostrar todos os conteúdos</button></div>}
    </section>
  );
}
