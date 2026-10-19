import Link from "next/link";
import { updates } from "@/data/updates";
import { formatDate } from "@/lib/blog";
import styles from "./home.module.css";

export function SiteUpdatesPreview() {
  return <section id="novidades-recentes" className={`container-site ${styles.section}`} aria-labelledby="novidades-title">
    <div className={styles.sectionHeading}>
      <div><p className={styles.eyebrow}>Registro de evolução</p><h2 id="novidades-title" className={styles.sectionTitle}>Evolução e novidades</h2></div>
      <Link href="/programas" className={`${styles.textLink} focus-ring`}>Consultar programas e versões <span aria-hidden="true">↗︎</span></Link>
    </div>
    <ol className={styles.updates}>{updates.slice(0, 3).map(update => <li key={`${update.date}-${update.title}`}>
      <div className={styles.updateMeta}><time dateTime={update.date}>{formatDate(update.date)}</time><span>{update.type}</span></div>
      <div><h3>{update.url ? <Link href={update.url} className="focus-ring">{update.title} <span aria-hidden="true">↗︎</span></Link> : update.title}</h3><p>{update.summary}</p></div>
    </li>)}</ol>
  </section>;
}
