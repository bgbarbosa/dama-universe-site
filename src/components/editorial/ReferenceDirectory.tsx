"use client";

import { useRef, useState } from "react";
import type { ReferenceItem, ReferenceType } from "@/data/references";
import { isPublicWebUrl } from "@/lib/editorial";
import { normalizeCatalogSearch } from "@/lib/programCatalog";
import styles from "./editorial.module.css";

export const referenceCategories: { type: ReferenceType; label: string; description: string }[] = [
  { type: "Pessoa", label: "Pessoas", description: "Profissionais, professores, autores e especialistas acompanhados como fonte de estudo técnico." },
  { type: "Artigo", label: "Artigos", description: "Leituras técnicas, publicações autorais e materiais específicos para aprofundamento." },
  { type: "Ferramenta", label: "Ferramentas", description: "Ferramentas úteis para estudo, investigação, perícia digital, automação e análise." },
  { type: "Instituição", label: "Instituições", description: "Associações, entidades e espaços institucionais ligados aos temas do Dama Universe." },
  { type: "Curso", label: "Cursos", description: "Plataformas e formações que ajudam no desenvolvimento técnico e profissional." },
  { type: "Site", label: "Sites", description: "Sites de consulta, documentação, estudo ou acompanhamento técnico." },
];

export function ReferenceDirectory({ references }: { references: readonly ReferenceItem[] }) {
  const [category, setCategory] = useState<ReferenceType | "Todos">("Todos");
  const [query, setQuery] = useState("");
  const search = useRef<HTMLInputElement>(null);
  const terms = normalizeCatalogSearch(query).split(/\s+/).filter(Boolean);
  const results = references.filter((item) => (category === "Todos" || category === item.type) && terms.every((term) => normalizeCatalogSearch(`${item.name} ${item.area} ${item.description} ${item.reason} ${item.tags?.join(" ") ?? ""}`).includes(term)));
  const categories = referenceCategories.filter((item) => references.some((entry) => entry.type === item.type));
  function clear() { setCategory("Todos"); setQuery(""); search.current?.focus(); }
  return (
    <div className={styles.section}>
      <div className={styles.sectionHeading}><h2>Fontes para continuar aprendendo</h2><p role="status" aria-live="polite">{results.length} {results.length === 1 ? "referência encontrada" : "referências encontradas"}</p></div>
      <fieldset className={styles.filters}><legend className="sr-only">Filtrar referências por categoria</legend>
        <button type="button" aria-pressed={category === "Todos"} onClick={() => setCategory("Todos")}>Todos</button>
        {categories.map((item) => <button type="button" key={item.type} aria-pressed={category === item.type} onClick={() => setCategory(item.type)}>{item.label}</button>)}
      </fieldset>
      <div className={styles.searchRow}><label>Buscar referência<input ref={search} type="search" placeholder="Nome ou área de estudo" value={query} onChange={(event) => setQuery(event.target.value)} /></label>{query || category !== "Todos" ? <button type="button" className={styles.textButton} onClick={clear}>Limpar filtros</button> : null}</div>
      {!results.length ? <div className={styles.empty}><h3>Nenhuma referência encontrada</h3><p>Experimente outro nome ou área de estudo.</p><button type="button" className={styles.secondaryButton} onClick={clear}>Mostrar todas as referências</button></div> : categories.map((item) => {
        const entries = results.filter((reference) => reference.type === item.type);
        if (!entries.length) return null;
        return <section key={item.type} id={item.type.toLowerCase()} className={styles.section} aria-labelledby={`references-${item.type}`}>
          <h2 id={`references-${item.type}`}>{item.label}</h2><p className={styles.description}>{item.description}</p>
          <ul className={item.type === "Pessoa" ? styles.people : styles.referenceRows}>
            {entries.map((reference) => <li key={reference.name} data-testid="reference-item"><article aria-label={reference.name}>
              <div><h3>{reference.name}</h3><p className={styles.referenceArea}>{reference.area}</p><p>{reference.description}</p></div>
              {item.type === "Pessoa" ? <details><summary>Por que está aqui<span className="sr-only">: {reference.name}</span></summary><p>{reference.reason}</p></details> : <div><h4>Por que está aqui</h4><p>{reference.reason}</p></div>}
              {reference.tags?.length ? <ul aria-label={`Temas de ${reference.name}`} className={styles.tags}>{reference.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul> : null}
              <div className={styles.links}>{reference.links.map((link) => isPublicWebUrl(link.url) ? <a key={`${link.label}-${link.url}`} href={link.url} target="_blank" rel="noopener noreferrer">{link.label} <span aria-hidden="true">↗︎</span></a> : <span key={link.label}>{link.label} · endereço indisponível</span>)}</div>
            </article></li>)}
          </ul>
        </section>;
      })}
    </div>
  );
}
