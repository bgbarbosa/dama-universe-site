import type { ReactNode } from "react";
import styles from "./editorial.module.css";

export function EditorialShell({ children }: { children: ReactNode }) {
  return <main id="conteudo" tabIndex={-1} className={styles.page}><div className="container-site">{children}</div></main>;
}

export function EditorialIntro({ eyebrow, title, lead, description }: { eyebrow: string; title: string; lead?: string; description: string }) {
  return (
    <header className={styles.intro}>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h1>{title}</h1>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
      <p className={styles.description}>{description}</p>
    </header>
  );
}
