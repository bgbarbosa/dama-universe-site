import { contacts, mailto } from "@/data/contacts";
import { createPageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/forms";
import { SecurityNotice } from "@/components/notices";
import { MetallicCard, PageHeader } from "@/components/ui";

export const metadata = createPageMetadata({
  title: "Contato — Dama Universe",
  description:
    "Entre em contato com o Dama Universe para dúvidas, sugestões, relatos de erro, parcerias, patrocínios ou mensagens relacionadas ao projeto.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <PageHeader
        title="Contato"
        subtitle="Dúvidas, sugestões e parcerias"
        description="Utilize esta página para enviar dúvidas, sugestões, propostas de parceria, informações sobre erros encontrados ou mensagens relacionadas ao Dama Universe."
      />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <MetallicCard>
            <h2 className="text-2xl font-bold text-text">Fale com o Dama Universe</h2>
            <div className="mt-4 flex flex-col gap-2">
              <a className="contact-link" href={mailto(contacts.general)}>{contacts.general}</a>
              <a className="contact-link" href={contacts.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp Business: {contacts.whatsappLabel}</a>
            </div>
          </MetallicCard>
          <MetallicCard>
            <h2 id="contato-suporte" className="scroll-mt-24 text-2xl font-bold text-text">Contato por assunto</h2>
            <dl className="mt-4 space-y-4 text-sm text-muted">
              {[
                ["Suporte aos programas", contacts.support],
                ["Propostas, parcerias e projetos sob consulta", contacts.commercial],
                ["Cursos e capacitação — consulte possibilidades", contacts.courses],
              ].map(([label, email]) => <div key={email}><dt>{label}</dt><dd><a className="contact-link" href={mailto(email)}>{email}</a></dd></div>)}
            </dl>
            <p className="mt-3 text-xs leading-6 text-muted">O contato sobre capacitação não indica turmas abertas ou inscrições disponíveis.</p>
          </MetallicCard>
        </div>
        <details className="mb-8 rounded-2xl border border-border p-5 text-sm text-muted">
          <summary className="min-h-11 cursor-pointer font-bold text-text focus-ring">Contato direto com Marco Barbosa</summary>
          <a className="contact-link" href={mailto(contacts.creator)}>{contacts.creator}</a>
          <p className="mt-3">Para assuntos de perícia ligados à atuação profissional individual de Marco:</p>
          <a className="contact-link" href={mailto(contacts.professional)}>{contacts.professional}</a>
          <p><a className="contact-link" href={contacts.professionalSite} target="_blank" rel="noopener noreferrer">Conheça o site profissional de Marco Barbosa</a></p>
        </details>
        <div className="mb-10 grid items-start gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <MetallicCard className="border-electric/70 p-5 shadow-[0_0_35px_rgba(37,150,255,0.28)]">
            <h2 className="text-xl font-bold text-chromeLight">
              Tipos de contato
            </h2>

            <p className="mt-3 text-sm leading-6 text-muted">
              Escolha o tipo mais próximo da sua mensagem no formulário.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                "Dúvida",
                "Sugestão",
                "Erro em programa",
                "Parceria",
                "Patrocínio",
                "Contato profissional",
                "Outro",
              ].map((type) => (
                <span
                  key={type}
                  className="rounded-full border border-electric/25 bg-electric/10 px-3 py-1 text-xs font-semibold text-electricLight"
                >
                  {type}
                </span>
              ))}
            </div>
          </MetallicCard>

          <SecurityNotice className="p-5">
            Não envie dados sensíveis, documentos sigilosos, senhas, informações
            pessoais de terceiros ou conteúdo relacionado a procedimentos restritos.
          </SecurityNotice>
        </div>

        <ContactForm />
      </section>
    </main>
  );
}
