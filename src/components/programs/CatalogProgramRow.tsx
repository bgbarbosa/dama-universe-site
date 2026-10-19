import Image from "next/image";
import Link from "next/link";
import type { CatalogProgram } from "@/lib/programCatalog";
import styles from "./catalog.module.css";

type Props = { program: CatalogProgram; open: boolean; onToggle: () => void };

export function CatalogProgramRow({ program, open, onToggle }: Props) {
  const titleId = `catalog-title-${program.slug}`;
  const toggleId = `catalog-toggle-${program.slug}`;
  const detailsId = `catalog-details-${program.slug}`;
  return (
    <li>
      <article className={styles.row} aria-labelledby={titleId} data-testid={`program-card-${program.slug}`} data-open={open}>
        <div className={styles.rowMain}>
          <div className={styles.icon} aria-hidden="true">
            {program.iconUrl ? <Image src={program.iconUrl} alt="" width={64} height={64} sizes="64px" /> : <span className={styles.monogram}>D</span>}
          </div>
          <div className={styles.rowCopy}>
            <h3 id={titleId}>{program.name}</h3>
            <p className={styles.summary}>{program.summary}</p>
            <dl className={styles.metadata}>
              {program.platform ? <div><dt className="sr-only">Plataforma</dt><dd>{program.platform}</dd></div> : null}
              {program.version ? <div><dt>Versão</dt><dd>{program.version}</dd></div> : null}
              {program.stage ? <div><dt>Estágio</dt><dd>{program.stage}</dd></div> : null}
              <div className={program.access === "Download público" ? styles.available : undefined}><dt className="sr-only">Acesso</dt><dd>{program.access}</dd></div>
            </dl>
          </div>
          <div className={styles.actions}>
            <Link href={program.pageUrl} prefetch={false} className={styles.primaryAction} aria-label={`Conhecer ${program.name}`}>Conhecer programa <span aria-hidden="true">↗︎</span></Link>
            <button type="button" id={toggleId} onClick={onToggle} aria-expanded={open} aria-controls={detailsId} aria-label={`${open ? "Recolher" : "Mostrar"} detalhes de ${program.name}`} className={styles.detailsToggle}>{open ? "Recolher detalhes" : "Mostrar detalhes"}<span aria-hidden="true" className={styles.chevron}>{open ? "−" : "+"}</span></button>
          </div>
        </div>
        <div id={detailsId} role="region" aria-labelledby={toggleId} hidden={!open} className={styles.details}>
          {open ? <>
            <p>{program.details}</p>
            {program.compatibility ? <p><strong>Compatibilidade informada:</strong> {program.compatibility}.</p> : null}
            {program.category === "sigo" ? <p className={styles.usageNote}>Em computadores institucionais, observe as autorizações e recomendações da equipe de TI responsável.</p> : null}
            {program.previewImage ? <figure className={styles.preview}><Image {...program.previewImage} alt={program.previewImage.alt} sizes="(max-width: 767px) 90vw, 720px" loading="lazy" /><figcaption>Captura de desenvolvimento com valores de preenchimento ocultados.</figcaption></figure> : null}
            <div className={styles.detailLinks}>
              {program.manualUrl ? <Link href={program.manualUrl} prefetch={false}>Manual rápido</Link> : null}
              {program.changelogUrl ? <Link href={program.changelogUrl} prefetch={false}>Histórico de versões</Link> : null}
              {program.downloadUrl ? <a href={program.downloadUrl} target="_blank" rel="noopener noreferrer">{program.downloadLabel ?? `Baixar ${program.name}`} <span aria-hidden="true">↗︎</span></a> : null}
              {program.alternativeDownload ? <a href={program.alternativeDownload.url} target="_blank" rel="noopener noreferrer">{program.alternativeDownload.label} <span aria-hidden="true">↗︎</span></a> : null}
            </div>
          </> : null}
        </div>
      </article>
    </li>
  );
}
