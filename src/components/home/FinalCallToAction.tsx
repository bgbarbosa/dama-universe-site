import Image from "next/image";
import { GlowButton } from "@/components/ui";
import styles from "./home.module.css";

export function FinalCallToAction() {
  return <section className={`container-site ${styles.creator}`} aria-labelledby="criador-title">
    <Image src="/images/creator/marco-barbosa.webp" alt="Marco Barbosa, criador do Dama Universe" width={640} height={800} sizes="(min-width: 768px) 180px, 120px" className={styles.creatorPhoto} />
    <div><p className={styles.eyebrow}>Autoria e participação</p><h2 id="criador-title" className={styles.sectionTitle}>Quem está por trás do Dama Universe</h2>
      <p className={styles.description}>Marco Barbosa é o criador e responsável pela iniciativa. Reúne tecnologia, inteligência artificial, dados e projetos autorais em um espaço para compartilhar soluções e o aprendizado que acompanha cada uma delas.</p>
      <p className={styles.complement}>Encontrou uma dificuldade ou tem uma sugestão? Compartilhe sua experiência e suas ideias pelos canais do projeto.</p>
      <div className={styles.actions}><GlowButton href="/sobre" variant="secondary">Sobre Marco Barbosa</GlowButton><GlowButton href="/contato" variant="ghost">Conversar sobre o projeto</GlowButton></div>
    </div>
  </section>;
}
