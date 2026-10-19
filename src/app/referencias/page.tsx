import { EditorialIntro, EditorialShell } from "@/components/editorial/EditorialIntro";
import { ReferenceDirectory } from "@/components/editorial/ReferenceDirectory";
import styles from "@/components/editorial/editorial.module.css";
import { references } from "@/data/references";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({title: "Mestres & Referências — Dama Universe", description: "Pessoas, instituições, cursos, ferramentas, artigos e sites usados como fontes de estudo, aprendizado e inspiração técnica no Dama Universe.", path: "/referencias"});

export default function ReferenciasPage() {
  return <EditorialShell>
    <EditorialIntro eyebrow="Fontes de estudo, inspiração e gratidão" title="Mestres & Referências" description="Pessoas, instituições, cursos, ferramentas, artigos e sites que ajudam a formar a base técnica, profissional e intelectual dos projetos do Dama Universe." />
    <section className={styles.tribute} aria-labelledby="tribute-title"><p className={styles.eyebrow}>Homenagem</p><h2 id="tribute-title">Aos mestres que ajudaram a formar este caminho</h2>
      <p>Esta página é também uma forma simples e sincera de reconhecimento aos professores, mestres e referências que contribuíram para minha formação técnica e profissional. Cada nome aqui representa conhecimento compartilhado, ensinamento, paciência, humildade e disponibilidade para orientar, esclarecer dúvidas e apoiar o crescimento de quem busca aprender com seriedade.</p>
      <p>O Dama Universe carrega um pouco de cada aprendizado recebido ao longo dessa jornada. Por isso, reunir essas referências é mais do que organizar links: é registrar gratidão, respeito e admiração por quem ensina, inspira e contribui para que novas ideias saiam do papel.</p>
    </section>
    <p className={styles.notice}>As referências listadas são fontes de estudo, aprendizado, consulta e inspiração técnica. A inclusão não indica vínculo, parceria, patrocínio, autorização de uso de imagem ou endosso formal, salvo quando informado.</p>
    <ReferenceDirectory references={references} />
  </EditorialShell>;
}
