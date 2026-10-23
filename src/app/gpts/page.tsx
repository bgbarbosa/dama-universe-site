import Link from "next/link";
import Image from "next/image";
import { EditorialIntro, EditorialShell } from "@/components/editorial/EditorialIntro";
import { AiDemo } from "@/components/editorial/AiDemo";
import { ProfessionalLearningLinks } from "@/components/editorial/ProfessionalEditorial";
import styles from "@/components/editorial/editorial.module.css";
import { customGpts } from "@/data/gpts";
import { assistantVisual } from "@/data/editorialVisuals";
import { contacts, mailto } from "@/data/contacts";
import { isPublicWebUrl } from "@/lib/editorial";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "IA aplicada — Dama Universe",
  description: "Ferramentas e exemplos de IA para escrita e organização, com demonstrações fictícias, requisitos de acesso e revisão humana.",
  path: "/gpts",
});

const concepts = [
  ["Inteligência Artificial", "Modelos que produzem respostas a partir de padrões e instruções. Servem de apoio à escrita e à organização, mas podem errar. Exemplo fictício: resumir uma reunião inventada em três tópicos."],
  ["Engenharia de prompts", "É a elaboração de instruções com objetivo, contexto e limites. Exemplo fictício: “Revise este convite de uma oficina imaginária, preserve as datas e destaque ambiguidades”. Ajuda a orientar os GPTs apresentados nesta página."],
  ["Análise de dados", "Organizar e comparar informações para entender padrões. Exemplo fictício: contar tarefas concluídas em uma planilha de demonstração. No Dama, a organização dos dados apoia ferramentas e conteúdos; resultados exigem conferência."],
  ["Automação documental", "Usar regras e modelos para reduzir preenchimentos repetitivos. Exemplo fictício: gerar um documento com dados de demonstração. O Dama Gerador FCC aplica esse tipo de recurso com revisão humana."],
];

export default function GptsPage() {
  return <EditorialShell>
    <EditorialIntro eyebrow="Ferramentas e exemplos de IA" title="IA aplicada" lead="Ferramentas e exemplos para transformar instruções em trabalho organizado." description="Conheça recursos do ecossistema Dama para apoiar escrita, organização e tarefas especializadas. Explore suas finalidades, veja exemplos de uso e confira os requisitos antes de acessar cada ferramenta." />
    <p className={`${styles.notice} ${styles.responsibleUse}`}><strong>Uso responsável.</strong> Utilize exemplos e materiais apropriados. Não envie dados sigilosos, credenciais, senhas, tokens, informações pessoais de terceiros ou conteúdo relacionado a procedimentos restritos. As respostas precisam de revisão humana e não substituem responsabilidade técnica ou avaliação jurídica aplicável.</p>
    <section className={styles.section} aria-labelledby="tools-title">
      <h2 id="tools-title">Ferramentas para tarefas específicas</h2>
      <p className={styles.description}>Os recursos abaixo são GPTs no ChatGPT. O acesso depende das condições e dos limites da plataforma externa; não há promessa de uso gratuito ou ilimitado.</p>
      <ul className={styles.resourceList}>{customGpts.map((gpt) => <li key={gpt.slug} id={gpt.slug} className={styles.resource} data-testid={`ai-tool-${gpt.slug}`}>
        <div className={styles.toolMedia} aria-hidden="true"><Image src={assistantVisual(gpt.slug).src} width={assistantVisual(gpt.slug).width} height={assistantVisual(gpt.slug).height} alt="" sizes="(min-width: 960px) 560px, 90vw" /></div>
        <div className={styles.toolCopy}><p className={styles.meta}>GPT · {gpt.status} · {gpt.category} · Autoria: {gpt.author}</p><h3>{gpt.name}</h3><p>{gpt.shortDescription}</p>{gpt.slug === "especialista-em-escrita-e-revisao" ? <p className={styles.small}>Revisão humana necessária. Preserve a intenção do autor e confira fatos, dados e referências. O acesso depende das condições e dos limites do ChatGPT.</p> : null}</div>
        <div className={styles.resourceActions}>{isPublicWebUrl(gpt.url) ? <a className={styles.primaryButton} href={gpt.url} target="_blank" rel="noopener noreferrer" aria-label={`Acessar ${gpt.name}`}>Acessar ferramenta <span aria-hidden="true">↗︎</span></a> : <p>Acesso não disponível.</p>}{gpt.slug === "especialista-em-escrita-e-revisao" ? <Link className={styles.inlineLink} href="#exemplo">Ver exemplo fictício</Link> : null}</div>
        <details><summary>Como começar<span className="sr-only">: {gpt.name}</span></summary><p>{gpt.purpose}</p><p>Acesse o recurso no ChatGPT, confira suas condições de acesso e formule instruções com objetivo e limites claros. Trabalhe somente com materiais apropriados e revise o resultado antes de qualquer uso formal.</p><div className={styles.detailColumns}><div><h4>Indicado para</h4><ul>{gpt.indicatedFor.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h4>Cuidados específicos</h4><ul>{gpt.precautions.map((item) => <li key={item}>{item}</li>)}</ul></div></div></details>
      </li>)}</ul>
    </section>
    <AiDemo />
    <ProfessionalLearningLinks />
    <section className={styles.section} aria-labelledby="concepts-title"><h2 id="concepts-title">Entenda antes de usar</h2><p className={styles.description}>Um GPT personalizado é um assistente no ChatGPT configurado com instruções para uma tarefa. Pode apoiar a organização ou a revisão de um texto; cada recurso tem indicação de uso e cuidados necessários.</p><dl className={styles.concepts}>{concepts.map(([title, text]) => <div key={title}><dt>{title}</dt><dd>{text}</dd></div>)}</dl><div className={styles.links}><Link href="/blog/inteligencia-artificial-como-ferramenta-de-apoio">Aprofundar nos conteúdos</Link><Link href="/programas/dama-gerador-fcc">Conhecer a automação FCC</Link></div><p className={styles.description}>Dúvidas sobre capacitação: <a className={styles.inlineLink} href={mailto(contacts.courses)}>{contacts.courses}</a>. Consulte possibilidades; não há anúncio de turmas nesta página.</p></section>
  </EditorialShell>;
}
