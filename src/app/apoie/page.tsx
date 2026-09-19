import { contacts, mailto } from "@/data/contacts";
import { createPageMetadata } from "@/lib/seo";
import { InfoNotice } from "@/components/notices";
import { SupportCard } from "@/components/support";
import { GlowButton, MetallicCard, PageHeader } from "@/components/ui";
import { supportOptions } from "@/data";

export const metadata = createPageMetadata({
  title: "Apoie — Dama Universe",
  description: "Conheça formas de colaborar com o desenvolvimento dos programas, conteúdos e ferramentas do Dama Universe.",
  path: "/apoie",
});

export default function ApoiePage() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <PageHeader
        title="Apoie o Dama Universe"
        subtitle="Sugestões, relatos e colaboração"
        description="O Dama Universe é um projeto em evolução, criado para reunir programas, ferramentas, conteúdos, estudos e soluções digitais."
      />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <MetallicCard>
            <h2 className="text-2xl font-semibold text-chromeLight">Como colaborar agora</h2>
            <p className="mt-4 leading-8 text-muted">
              Envie sugestões, relate problemas com o nome e a versão do programa, compartilhe páginas úteis e converse sobre possibilidades de parceria. Não inclua dados sensíveis nos relatos.
            </p>
            <div className="mt-6">
              <GlowButton href="/contato" variant="secondary">Enviar sugestão ou relato</GlowButton>
              <p className="mt-4 text-sm text-muted">Parcerias sob consulta: <a className="contact-link" href={mailto(contacts.commercial)}>{contacts.commercial}</a></p>
            </div>
          </MetallicCard>
          <InfoNotice>
            Quando houver apoio, parceria, patrocínio ou indicação remunerada, essa informação será comunicada de forma clara ao visitante.
          </InfoNotice>
        </div>

        <details className="rounded-2xl border border-border p-5">
          <summary className="min-h-11 cursor-pointer text-sm font-bold text-muted focus-ring">Possibilidades futuras de apoio — sem pagamentos ativos</summary>
          <div className="mt-5 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {supportOptions.map((support) => (
            <SupportCard key={support.name} support={support} />
          ))}
        </div>
        </details>
      </section>
    </main>
  );
}
