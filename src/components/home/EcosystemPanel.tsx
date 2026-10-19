import type { ReactNode } from "react";
import styles from "./home.module.css";

const categories: { label: string; icon: ReactNode }[] = [
  { label: "Projetos", icon: <path d="M3 7a2 2 0 0 1 2-2h4l2 3h8a2 2 0 0 1 2 2v9H3Z" /> },
  { label: "Conteúdos", icon: <path d="M6 3h8l4 4v14H6Z M14 3v5h4 M9 12h6 M9 16h6" /> },
  { label: "Ferramentas", icon: <path d="m14 3 1 3 3 1 3-1-1 5-3 3-5-1-7 7-2-2 7-7-1-5 3-3Z" /> },
];

export function EcosystemPanel() {
  return (
    <aside className={styles.ecosystem} aria-label="Ecossistema Dama">
      <p className={styles.panelEyebrow}><span aria-hidden="true" />Ecossistema Dama</p>
      <h2>Inteligência <span>aplicada</span></h2>
      <p className={styles.panelDescription}>Projetos, conteúdos e ferramentas em um só lugar.</p>
      <div className={styles.categories}>
        {categories.map(({ label, icon }) => (
          <span key={label}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">{icon}</svg>
            {label}
          </span>
        ))}
      </div>
    </aside>
  );
}
