import { EditorialIntro, EditorialShell } from "@/components/editorial/EditorialIntro";
import styles from "@/components/editorial/editorial.module.css";
import { ContactForm } from "@/components/forms/ContactForm";
import { contacts, mailto } from "@/data/contacts";
import { programs } from "@/data/programs";
import { parseContactContext, type ContactSearchParams } from "@/lib/contactContext";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({title: "Contato — Dama Universe", description: "Escolha o assunto e envie dúvidas, sugestões ou propostas sobre o Dama Universe. Formulário e canais diretos de contato.", path: "/contato"});

export default async function ContatoPage({ searchParams }: { searchParams?: Promise<ContactSearchParams> }) {
  const options = programs.map(({slug, name}) => ({slug, name}));
  const context = parseContactContext(await searchParams ?? {}, options);
  return <EditorialShell>
    <EditorialIntro eyebrow="Dúvidas, sugestões e parcerias" title="Contato" lead="Como podemos ajudar?" description="Escolha o assunto para encontrar o canal adequado ou enviar uma mensagem sobre o Dama Universe." />
    <div className={styles.contactLayout}>
      <section aria-labelledby="form-title"><h2 id="form-title">Envie sua mensagem</h2><p className={styles.description}>Nome, e-mail, tipo de contato, assunto e mensagem são obrigatórios. Os campos de programa e versão são opcionais.</p><p className={styles.notice}>Não envie dados sensíveis, documentos sigilosos, senhas, tokens, informações pessoais de terceiros ou conteúdo relacionado a procedimentos restritos.</p><ContactForm initialContactType={context.contactType} initialProgram={context.program} programOptions={options} /></section>
      <aside className={styles.contactChannels} aria-labelledby="channels-title"><h2 id="channels-title">Canais diretos</h2><div className={styles.links}><a href={mailto(contacts.general)}>{contacts.general}</a><a href={contacts.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp Business: {contacts.whatsappLabel}</a></div>
        <h3 id="contato-suporte">Contato por assunto</h3><dl>{[["Suporte aos programas", contacts.support], ["Propostas, parcerias e projetos sob consulta", contacts.commercial], ["Cursos e capacitação — consulte possibilidades", contacts.courses]].map(([label, email]) => <div key={email}><dt>{label}</dt><dd><a className={styles.inlineLink} href={mailto(email)}>{email}</a></dd></div>)}</dl><p>O contato sobre capacitação não indica turmas abertas ou inscrições disponíveis. O seletor do formulário classifica a mensagem; não altera automaticamente seu destinatário para esses aliases.</p>
        <h3>Contato direto com Marco Barbosa</h3><div className={styles.links}><a href={mailto(contacts.creator)}>{contacts.creator}</a><a href={contacts.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn de Marco Barbosa</a></div><p>Para assuntos de perícia ligados à atuação profissional individual de Marco:</p><div className={styles.links}><a href={mailto(contacts.professional)}>{contacts.professional}</a><a href={contacts.professionalSite} target="_blank" rel="noopener noreferrer">Conheça o site profissional de Marco Barbosa</a></div>
      </aside>
    </div>
  </EditorialShell>;
}
