import Link from "next/link";
import { customGpts } from "@/data/gpts";
import styles from "./home.module.css";

export function GptsPreview() {
  const featured = customGpts.filter(gpt => gpt.featured).slice(0, 2);
  return <section id="ia-aplicada" className={`container-site ${styles.section} ${styles.aiSection}`} aria-labelledby="ia-title">
    <div>
      <p className={styles.eyebrow}>IA aplicada</p>
      <h2 id="ia-title" className={styles.sectionTitle}>Assistentes e ferramentas de IA</h2>
      <p className={styles.description}>Recursos desenvolvidos para apoiar escrita, organização, análise e tarefas especializadas, com informações claras sobre uso, acesso e limitações.</p>
      <Link href="/gpts" className={`${styles.textLink} focus-ring`}>Conhecer as fichas e os cuidados <span aria-hidden="true">↗︎</span></Link>
    </div>
    <div className={styles.aiResources}>
      {featured.map(gpt => <article key={gpt.slug}>
        <p className={styles.programCategory}>GPT no ChatGPT <span aria-hidden="true">·</span> {gpt.category}</p>
        <h3><a href={gpt.url} target="_blank" rel="noopener noreferrer" className="focus-ring">{gpt.slug === "boletim-de-ocorrencia-2" ? "Boletim de Ocorrência" : gpt.name}<span aria-hidden="true"> ↗︎</span></a></h3>
        <p>{gpt.shortDescription}</p>
      </article>)}
      <p className={styles.accessNote}>O acesso depende das condições e dos limites do ChatGPT. Confira a ficha e revise os resultados; não envie informações sensíveis.</p>
    </div>
  </section>;
}
