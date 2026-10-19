"use client";

import { useRef, useState } from "react";
import { catalogCategories, filterCatalog } from "@/lib/programCatalog";
import type { CatalogFilter, CatalogProgram } from "@/lib/programCatalog";
import { CatalogProgramRow } from "./CatalogProgramRow";
import { SigoContext } from "./SigoContext";
import styles from "./catalog.module.css";

export function ProgramsCatalog({ programs }: { programs: readonly CatalogProgram[] }) {
  const [category, setCategory] = useState<CatalogFilter>("todos");
  const [query, setQuery] = useState("");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const results = filterCatalog(programs, category, query);
  const hasFilters = category !== "todos" || query.length > 0;
  function clearFilters() {
    setCategory("todos"); setQuery(""); setOpenSlug(null); searchRef.current?.focus();
  }
  return (
    <div>
      <div className={styles.controls}>
        <fieldset className={styles.filters}>
          <legend className="sr-only">Filtrar programas por categoria</legend>
          {[{ id: "todos", filterLabel: "Todos" }, ...catalogCategories].map((item) => <button type="button" key={item.id} aria-pressed={category === item.id} onClick={() => { setCategory(item.id as CatalogFilter); setOpenSlug(null); }}>{item.filterLabel}</button>)}
        </fieldset>
        <div className={styles.searchRow}>
          <div className={styles.search}>
            <label htmlFor="program-search">Buscar programa</label>
            <div className={styles.searchField}>
              <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
              <input ref={searchRef} id="program-search" type="search" placeholder="Nome ou finalidade" value={query} autoComplete="off" onChange={(event) => { setQuery(event.target.value); setOpenSlug(null); }} aria-describedby="catalog-count" />
            </div>
          </div>
          <div className={styles.resultTools}>
            <p id="catalog-count" role="status" aria-live="polite" aria-atomic="true">{results.length} {results.length === 1 ? "programa encontrado" : "programas encontrados"}</p>
            {hasFilters ? <button type="button" className={styles.clear} onClick={clearFilters}>Limpar filtros</button> : null}
          </div>
        </div>
      </div>
      {results.length === 0 ? <div className={styles.empty}>
        <h2>Nenhum programa encontrado</h2><p>Tente outro nome ou finalidade, ou limpe os filtros para explorar todo o catálogo.</p><button type="button" className={styles.primaryAction} onClick={clearFilters}>Mostrar todos os programas</button>
      </div> : catalogCategories.map((item) => {
        const entries = results.filter((program) => program.category === item.id);
        if (!entries.length) return null;
        return <section key={item.id} id={`categoria-${item.id}`} className={styles.category} aria-labelledby={`category-heading-${item.id}`}>
          <div className={styles.categoryHeading}><div><h2 id={`category-heading-${item.id}`}>{item.label}</h2><p>{item.description}</p></div><span className={styles.categoryCount}>{entries.length} {entries.length === 1 ? "programa" : "programas"}</span></div>
          {item.id === "sigo" ? <SigoContext compact={category === "todos"} /> : null}
          <ul className={styles.list}>{entries.map((program) => <CatalogProgramRow key={program.slug} program={program} open={openSlug === program.slug} onToggle={() => setOpenSlug((current) => current === program.slug ? null : program.slug)} />)}</ul>
        </section>;
      })}
    </div>
  );
}
