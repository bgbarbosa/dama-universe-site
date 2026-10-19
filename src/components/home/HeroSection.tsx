import { GlowButton } from "@/components/ui";
import { EcosystemPanel } from "./EcosystemPanel";
import styles from "./home.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={`container-site ${styles.heroGrid}`}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Tecnologia, conhecimento e projetos autorais</p>
          <h1 id="home-title" className={styles.heroTitle}>Dama Universe</h1>
          <p className={styles.heroLead}>Soluções digitais para organizar informações, automatizar tarefas e apoiar o trabalho com dados e inteligência artificial.</p>
          <p className={styles.description}>Criado por Marco Barbosa, o Dama Universe é um projeto, marca e ecossistema autoral que reúne programas, ferramentas de IA, conteúdos técnicos e referências para documentar, compartilhar e acompanhar a evolução de soluções digitais.</p>
          <p className={styles.complement}>Conheça ferramentas disponíveis, versões, downloads, tutoriais e iniciativas em desenvolvimento, com informações claras sobre a finalidade e o estágio de cada projeto.</p>
          <div className={styles.actions}>
            <GlowButton href="/programas" variant="primary">Explorar programas <span aria-hidden="true">↗︎</span></GlowButton>
            <GlowButton href="/sobre" variant="secondary">Conhecer o projeto</GlowButton>
          </div>
        </div>
        <EcosystemPanel />
      </div>
    </section>
  );
}
