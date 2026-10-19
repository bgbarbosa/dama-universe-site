"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Program } from "@/data/programs";
import styles from "./home.module.css";

type HomeProgram = Pick<Program, "slug" | "name" | "version" | "status" | "detailsUrl" | "downloadUrl" | "previewImage" | "iconUrl"> & {
  category: string;
  summary: string;
  details: string[];
};

export function HomeProgramCards({ programs }: { programs: HomeProgram[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  return <div className={styles.programGrid}>
    {programs.map((program, index) => {
      const open = openSlug === program.slug;
      const regionId = `home-details-${program.slug}`;
      const buttonId = `home-toggle-${program.slug}`;
      return <article key={program.slug} data-testid={`home-program-${program.slug}`} className={styles.programCard} data-open={open}>
        <div className={styles.programMedia}>
          <span className={styles.programIndex} aria-hidden="true">0{index + 1}</span>
          {program.previewImage ? <Image {...program.previewImage} alt={program.previewImage.alt} sizes="(min-width: 1024px) 340px, (min-width: 768px) 45vw, 90vw" className={styles.programScreenshot} />
            : program.iconUrl ? <Image src={program.iconUrl} alt={`Ícone do ${program.name}`} width={160} height={160} sizes="104px" className={styles.programIcon} /> : null}
        </div>
        <div className={styles.programBody}>
          <p className={styles.programCategory}>{program.category}</p>
          <h3>{program.name}</h3>
          <p className={styles.programVersion}>{program.status} <span aria-hidden="true">·</span> Versão {program.version}</p>
          <p className={styles.programSummary}>{program.summary}</p>
          <div className={styles.programActions}>
            <Link href={program.detailsUrl} className={`${styles.programPrimary} focus-ring`} aria-label={`Conhecer ${program.name}`}>Conhecer programa <span aria-hidden="true">↗︎</span></Link>
            {program.downloadUrl ? <a href={program.downloadUrl} target="_blank" rel="noopener noreferrer" className={`${styles.downloadLink} focus-ring`} aria-label={`Baixar ${program.name}`}>Download <span aria-hidden="true">↓</span></a> : null}
          </div>
          <button id={buttonId} type="button" aria-expanded={open} aria-controls={regionId} aria-label={`${open ? "Recolher" : "Mostrar"} detalhes de ${program.name}`} onClick={() => setOpenSlug(open ? null : program.slug)} className={`${styles.detailsToggle} focus-ring`}>
            {open ? "Recolher detalhes" : "Mostrar detalhes"}<span aria-hidden="true">{open ? "−" : "+"}</span>
          </button>
          <div id={regionId} role="region" aria-labelledby={buttonId} hidden={!open} className={styles.programDetails}>
            <ul>{program.details.map(detail => <li key={detail}>{detail}</li>)}</ul>
          </div>
        </div>
      </article>;
    })}
  </div>;
}
