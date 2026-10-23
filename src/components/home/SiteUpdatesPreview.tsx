import Link from "next/link";
import Image from "next/image";
import { updates } from "@/data/updates";
import { updateVisual } from "@/data/editorialVisuals";
import { formatDate } from "@/lib/blog";
import styles from "./home.module.css";

export function SiteUpdatesPreview() {
  return <section id="novidades-recentes" className={`container-site ${styles.section}`} aria-labelledby="novidades-title">
    <div className={styles.sectionHeading}>
      <div><p className={styles.eyebrow}>Registro de evolução</p><h2 id="novidades-title" className={styles.sectionTitle}>Evolução e novidades</h2></div>
      <Link href="/programas" className={`${styles.textLink} focus-ring`}>Consultar programas e versões <span aria-hidden="true">↗︎</span></Link>
    </div>
    <ol className={styles.updates}>{updates.slice(0, 3).map(update => <li key={`${update.date}-${update.title}`}>
      <div className={styles.updateThumbnail} data-kind={updateVisual(update.url).kind} aria-hidden="true"><Image src={updateVisual(update.url).src} width={updateVisual(update.url).width} height={updateVisual(update.url).height} alt="" sizes="(min-width: 768px) 160px, 88px" /></div>
      <div className={styles.updateCopy}>
      <div className={styles.updateMeta}><time dateTime={update.date}>{formatDate(update.date)}</time><span>{update.type}</span></div>
      <div><h3>{update.url ? <Link href={update.url} className="focus-ring">{update.title} <span aria-hidden="true">↗︎</span></Link> : update.title}</h3><p>{update.summary}</p></div>
      </div>
    </li>)}</ol>
  </section>;
}
