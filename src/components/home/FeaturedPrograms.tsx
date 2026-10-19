import Link from "next/link";
import { getProgramBySlug } from "@/data/programs";
import { HomeProgramCards } from "./HomeProgramCards";
import styles from "./home.module.css";

const selection = [
  {
    slug: "dama-termos",
    category: "Documentos",
    summary: "Preencha o termo do MS Acolhe e Protege e gere o PDF para conferência e encaminhamento.",
    details: ["Até cinco plantões por termo, com datas e locais.", "Assinatura visual opcional, sem equivalência automática a assinatura digital certificada.", "Manual rápido e instalador alternativo em ZIP na página do programa."],
  },
  {
    slug: "dama-biometria-sigo-fix",
    category: "Ambiente de trabalho",
    summary: "Apoio à correção de falhas locais de biometria, Java e componentes do SIGO Desktop.",
    details: ["Preparado para o SIGO Desktop 1.0.48, conforme a ficha publicada.", "Ferramenta independente; não substitui o suporte institucional."],
  },
  {
    slug: "dama-gerador-fcc",
    category: "Automação documental",
    summary: "Gere e organize Formulários de Cadeia de Custódia a partir de PDF ou preenchimento manual.",
    details: ["Geração de documentos DOCX com conferência final pelo usuário.", "Série de tutoriais e registro de evolução disponíveis na página do programa."],
  },
];

export function FeaturedPrograms() {
  const featured = selection.flatMap(({ slug, ...editorial }) => {
    const program = getProgramBySlug(slug);
    if (!program || program.status !== "Disponível" || !program.downloadUrl) return [];
    return [{ ...editorial, slug: program.slug, name: program.name, version: program.version,
      status: program.status, detailsUrl: program.detailsUrl, downloadUrl: program.downloadUrl,
      previewImage: program.previewImage, iconUrl: program.iconUrl }];
  });
  return <section id="programas-destaque" className={`container-site ${styles.section}`} aria-labelledby="programas-title">
    <div className={styles.sectionHeading}>
      <div><p className={styles.eyebrow}>Da ideia ao uso</p><h2 id="programas-title" className={styles.sectionTitle}>Programas em destaque</h2><p className={styles.description}>Três caminhos para conhecer o trabalho na prática. Consulte a finalidade, os requisitos e os cuidados de cada ferramenta.</p></div>
      <Link href="/programas" className={`${styles.textLink} focus-ring`}>Todos os programas <span aria-hidden="true">↗︎</span></Link>
    </div>
    <HomeProgramCards programs={featured} />
  </section>;
}
