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
    <main>
      <PageHeader
        title="Contato"
        subtitle="Dúvidas, sugestões e parcerias"
        description="Utilize esta página para enviar dúvidas, sugestões, propostas de parceria, informações sobre erros encontrados ou mensagens relacionadas ao Dama Universe."
      />

      <section className="mx-auto max-w-7xl px-6 pb-20">
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
