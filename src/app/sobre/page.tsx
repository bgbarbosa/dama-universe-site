import Image from "next/image";
import { EditorialIntro, EditorialShell } from "@/components/editorial/EditorialIntro";
import styles from "@/components/editorial/editorial.module.css";
import { contacts, mailto } from "@/data/contacts";
import { createPageMetadata } from "@/lib/seo";

const areas = ["Programas e ferramentas digitais", "IA aplicada (inclui GPTs personalizados)", "Inteligência artificial", "Python e automação", "Análise de dados", "Organização documental", "Computação forense", "Produtividade digital", "Referências de estudo"];
const process = [
  ["Compreender a necessidade", "Identificar a tarefa, o contexto e os limites do que se pretende organizar."],
  ["Estruturar a solução", "Organizar requisitos e definir uma abordagem proporcional à necessidade."],
  ["Desenvolver e testar", "Implementar e conferir o comportamento no escopo e nos ambientes disponíveis."],
  ["Documentar", "Registrar finalidade, orientações, requisitos e limitações conhecidas."],
  ["Acompanhar a evolução", "Rever melhorias e manter registros das mudanças de cada projeto."],
];
export const metadata = createPageMetadata({title: "Sobre o Dama Universe", description: "Conheça o Dama Universe, projeto, marca e ecossistema autoral criado por Marco Barbosa para reunir tecnologia aplicada, ferramentas e conhecimento compartilhado.", path: "/sobre"});

export default function SobrePage() {
  return <EditorialShell>
    <EditorialIntro eyebrow="O projeto e sua autoria" title="Sobre o Dama Universe" lead="Tecnologia aplicada, desenvolvimento autoral e conhecimento compartilhado." description="O Dama Universe reúne projetos digitais, ferramentas e conteúdos desenvolvidos para organizar informações, apoiar tarefas e documentar a evolução de soluções práticas." />
    <section aria-labelledby="project-title"><h2 id="project-title">Um ecossistema autoral em evolução</h2><p className={styles.description}>O Dama Universe é um projeto, marca e ecossistema autoral criado por Marco Aurélio Pereira Barbosa para reunir, documentar e compartilhar projetos digitais com foco em organização, tecnologia, inteligência artificial, análise de dados e automação.</p><p className={styles.description}>O espaço funciona como uma central de programas, GPTs personalizados, conteúdos técnicos, referências, downloads e registros de evolução, permitindo acompanhar versões, melhorias, ideias futuras e materiais de apoio.</p></section>
    <section className={styles.creator} aria-labelledby="creator-title"><Image className={styles.portrait} src="/images/creator/marco-barbosa.webp" alt="Marco Barbosa, criador do Dama Universe" width={640} height={800} sizes="(max-width: 559px) 200px, 280px" priority /><div><p className={styles.eyebrow}>Quem está por trás do projeto</p><h2 id="creator-title">Criado por Marco Barbosa</h2><p><strong>Marco Aurélio Pereira Barbosa</strong></p><p>Atuação voltada à Inteligência Artificial, ChatGPT, engenharia de prompts, análise de dados, capacitação, produtividade e automação. Investigação digital, perícia e computação forense compõem seu repertório técnico complementar.</p><p>Além dos programas e conteúdos publicados no Dama Universe, há também um site profissional voltado à apresentação de trajetória, perícia digital, computação forense e evidências digitais.</p><div className={styles.links}><a href={mailto(contacts.creator)}>{contacts.creator}</a><a href={contacts.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn de Marco Barbosa</a><a href={contacts.professionalSite} target="_blank" rel="noopener noreferrer">Acessar site profissional</a><a href="https://lattes.cnpq.br/1970561249212557" target="_blank" rel="noopener noreferrer">Currículo Lattes</a></div></div></section>
    <section className={styles.section} aria-labelledby="process-title"><h2 id="process-title">Da necessidade à ferramenta</h2><p className={styles.description}>Um método orientador de trabalho. Estas etapas não constituem afirmação de que todos os aplicativos foram homologados, auditados ou testados integralmente.</p><ol className={styles.process}>{process.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ol></section>
    <section className={styles.section} aria-labelledby="areas-title"><h2 id="areas-title">Áreas abordadas</h2><p className={styles.description}>Temas que orientam a construção dos projetos, programas, GPTs e conteúdos publicados.</p><ul className={styles.themes}>{areas.map((area) => <li key={area}>{area}</li>)}</ul></section>
    <section className={styles.section} aria-labelledby="responsibility-title"><h2 id="responsibility-title">Segurança e responsabilidade</h2><p className={styles.notice}>O site foi planejado para divulgar projetos e conteúdos técnicos sem publicar dados sensíveis, documentos restritos, códigos privados, senhas, tokens ou informações pessoais de terceiros. A autoria pessoal não representa endosso da Polícia Civil, do SIGO, da APECOF ou de outras instituições.</p></section>
  </EditorialShell>;
}
