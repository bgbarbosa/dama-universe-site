import { ClientsSection } from "@/components/programs/ClientsSection";
import { ProgramsCatalog } from "@/components/programs/ProgramsCatalog";
import { catalogPrograms } from "@/data/programCatalog";
import styles from "@/components/programs/catalog.module.css";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Programas — Dama Universe",
  description:
    "Explore programas Dama para documentos, gestão e análise, além de utilitários independentes para SIGO Desktop. Consulte versões, estágios e recursos disponíveis.",
  path: "/programas",
});

export default function ProgramasPage() {
  return (
    <main id="conteudo" tabIndex={-1} className={styles.catalog}>
      <div className="container-site">
        <header className={styles.intro}>
          <p className={styles.eyebrow}>Projetos Dama</p>
          <h1>Programas</h1>
          <p>
            Explore os programas, ferramentas e sistemas do ecossistema Dama Universe,
            organizados por finalidade. Consulte o estágio de cada projeto, seus
            requisitos e os recursos disponíveis.
          </p>
        </header>
        <ProgramsCatalog programs={catalogPrograms} />
        <ClientsSection />
        <p className={styles.notice}>
          Os programas do Dama Universe são ferramentas autorais em evolução.
          Alguns estão disponíveis para uso, outros estão em ajustes finais,
          desenvolvimento ou planejamento técnico. Quando não houver download
          público, a página servirá como registro de finalidade, escopo e
          evolução do projeto.
        </p>
      </div>
    </main>
  );
}
