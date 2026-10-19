import Link from "next/link";
import { EditorialIntro, EditorialShell } from "@/components/editorial/EditorialIntro";
import { CopyButton } from "@/components/editorial/CopyButton";
import styles from "@/components/editorial/editorial.module.css";
import { programs } from "@/data/programs";
import { supportOptions } from "@/data/support";
import { updates } from "@/data/updates";
import { contacts, mailto } from "@/data/contacts";
import { contactHref, parseContactContext, type ContactSearchParams } from "@/lib/contactContext";
import { formatDate } from "@/lib/blog";
import { createPageMetadata, siteConfig } from "@/lib/seo";

export const metadata = createPageMetadata({title: "Participe — Dama Universe", description: "Compartilhe sugestões, relate dificuldades e indique conteúdos do Dama Universe. Participação sem pagamentos ou envio automático de mensagens.", path: "/apoie"});

export default async function ApoiePage({ searchParams }: { searchParams?: Promise<ContactSearchParams> }) {
  const context = parseContactContext(await searchParams ?? {}, programs);
  const program = programs.find((item) => item.slug === context.program);
  return <EditorialShell>
    <EditorialIntro eyebrow="Sugestões e colaboração" title="Participe da evolução do Dama Universe" lead="Sua experiência pode ajudar a melhorar as ferramentas e os conteúdos." description="Compartilhe uma sugestão, relate uma dificuldade de uso ou indique uma página que possa ser útil para outras pessoas." />
    {program ? <p className={styles.notice}>Participação relacionada a <strong>{program.name}</strong>. O programa será preselecionado no formulário de contato.</p> : null}
    <ul className={styles.participate} aria-label="Caminhos de participação">
      <li><h2>Sugerir melhoria</h2><p>Explique a melhoria desejada e sua utilidade. Se houver um programa relacionado, indique-o no formulário.</p><Link className={styles.inlineLink} href={contactHref("sugestao", context.program)}>Enviar uma sugestão <span aria-hidden="true">↗︎</span></Link></li>
      <li><h2>Relatar dificuldade</h2><p>Conte o que tentou fazer, o resultado esperado e o que aconteceu. Não inclua dados sensíveis ou documentos restritos.</p><Link className={styles.inlineLink} href={contactHref("suporte", context.program)}>Descrever uma dificuldade <span aria-hidden="true">↗︎</span></Link></li>
      <li><h2>Compartilhar o projeto</h2><p>Copie o endereço e escolha onde compartilhá-lo. Nenhuma mensagem é enviada automaticamente.</p><code className={styles.shareUrl}>{siteConfig.url}/</code><CopyButton text={`${siteConfig.url}/`} label="Copiar endereço do site" successLabel="Endereço copiado." /></li>
    </ul>
    <p className={`${styles.notice} ${styles.section}`}>Sugestões e possibilidades de parceria estão sujeitas a avaliação e contato, sem compromisso de resposta ou prazo. Parcerias sob consulta: <a className={styles.inlineLink} href={mailto(contacts.commercial)}>{contacts.commercial}</a>. Quando houver apoio, parceria, patrocínio ou indicação remunerada, essa informação será comunicada de forma clara ao visitante.</p>
    <section className={styles.section} aria-labelledby="improvements-title"><h2 id="improvements-title">Melhorias recentes</h2><p className={styles.description}>Registros reais de evolução do site e dos programas, sem atribuição presumida a sugestões de visitantes.</p><ul className={styles.updates}>{updates.slice(0,3).map((item) => <li key={item.title}><p className={styles.meta}><time dateTime={item.date}>{formatDate(item.date)}</time></p><h3>{item.title}</h3><p>{item.summary}</p>{item.url ? <Link className={styles.inlineLink} href={item.url}>Consultar atualização</Link> : null}</li>)}</ul></section>
    <details className={styles.section}><summary>Possibilidades futuras de apoio — sem pagamentos ativos</summary><dl className={styles.futureList}>{supportOptions.map((item) => <div key={item.name}><dt>{item.name} · {item.status}</dt><dd>{item.description}</dd></div>)}</dl></details>
  </EditorialShell>;
}
