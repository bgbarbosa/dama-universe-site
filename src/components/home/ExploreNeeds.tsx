import Link from "next/link";
import styles from "./home.module.css";

const needs = [
  { label: "Gerar documentos", href: "/programas/dama-termos", context: "Termos e PDFs" },
  { label: "Organizar informações", href: "/programas/dama-gestor-de-inqueritos", context: "Registros e acompanhamento" },
  { label: "Explorar IA", href: "/gpts", context: "Assistentes e condições de uso" },
  { label: "Aprender", href: "#conteudos", context: "Tutoriais e artigos" },
];

export function ExploreNeeds() {
  return <section className={`container-site ${styles.explore}`} aria-labelledby="explore-title">
    <h2 id="explore-title" className={styles.eyebrow}>Explore por necessidade</h2>
    <ul>{needs.map(({ label, href, context }) => <li key={href}>
      <Link href={href} className="focus-ring"><span>{label} <span aria-hidden="true">↗︎</span></span><small>{context}</small></Link>
    </li>)}</ul>
  </section>;
}
