import { GlowButton } from "@/components/ui";
import { contacts, mailto } from "@/data/contacts";
import { GptCard } from "@/components/gpts";

import { MetallicCard, PageHeader } from "@/components/ui";
import { createPageMetadata } from "@/lib/seo";
import { customGpts } from "@/data";

export const metadata = createPageMetadata({
  title: "GPTs Personalizados — Dama Universe",
  description:
    "Assistentes de IA personalizados criados para apoiar documentação, estudo, organização, análise e produção técnica.",
  path: "/gpts",
});

export default function GptsPage() {
  return (
    <main id="conteudo" tabIndex={-1}>
      <PageHeader
        title="GPTs Personalizados"
        subtitle="Assistentes de IA"
        description="Assistentes criados para apoiar tarefas específicas de documentação, estudo, organização, análise e produção técnica dentro do ecossistema Dama."
      />

      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <MetallicCard variant="notice">
            <h2 className="text-2xl font-black text-text">
              O que é um GPT personalizado?
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted">
              É um assistente no ChatGPT configurado com instruções para uma tarefa.
              Pode ajudar a organizar um texto ou revisar sua clareza. Cada GPT tem indicação de uso
              e cuidados necessários. Eles funcionam como ferramentas de apoio, não
              como substitutos da conferência humana, responsabilidade técnica ou
              validação final.
            </p>
          </MetallicCard>

          <MetallicCard variant="warning">
            <p className="eyebrow mb-4 text-goldSoft">Uso responsável</p>
            <p className="text-sm leading-7 text-muted">
              Não envie dados sensíveis, documentos sigilosos, informações
              pessoais de terceiros, senhas, tokens ou conteúdo relacionado a
              procedimentos restritos.
            </p>
          </MetallicCard>
        </div>

        <MetallicCard className="mb-8">
          <h2 className="text-2xl font-bold text-text">Entenda antes de usar</h2>
          <dl className="mt-5 space-y-5 text-sm leading-7 text-muted">
            <div><dt className="font-bold text-text">Inteligência Artificial</dt><dd>Modelos que produzem respostas a partir de padrões e instruções. Servem de apoio à escrita e à organização, mas podem errar. Exemplo fictício: resumir uma reunião inventada em três tópicos.</dd></div>
            <div><dt className="font-bold text-text">Engenharia de prompts</dt><dd>É a elaboração de instruções com objetivo, contexto e limites. Exemplo fictício: “Revise este convite de uma oficina imaginária, preserve as datas e destaque ambiguidades”. Ajuda a orientar os GPTs apresentados abaixo.</dd></div>
            <div><dt className="font-bold text-text">Análise de dados</dt><dd>Organizar e comparar informações para entender padrões. Exemplo fictício: contar tarefas concluídas em uma planilha de demonstração. No Dama, a organização dos dados apoia ferramentas e conteúdos; resultados exigem conferência.</dd></div>
            <div><dt className="font-bold text-text">Automação documental</dt><dd>Usar regras e modelos para reduzir preenchimentos repetitivos. Exemplo fictício: gerar um documento com dados de demonstração. O Dama Gerador FCC aplica esse tipo de recurso com revisão humana.</dd></div>
          </dl>
          <p className="mt-5 text-sm leading-7 text-muted">Os exemplos são fictícios. Não envie informações sensíveis. O acesso aos GPTs depende das condições e dos limites da plataforma externa; não há promessa de uso gratuito ou ilimitado.</p>
          <div className="mt-5 flex flex-wrap gap-3"><GlowButton href="/blog/inteligencia-artificial-como-ferramenta-de-apoio">Aprofundar no Blog</GlowButton><GlowButton href="/programas/dama-gerador-fcc">Conhecer a automação FCC</GlowButton></div>
          <p className="mt-5 text-sm text-muted">Dúvidas sobre capacitação: <a className="contact-link" href={mailto(contacts.courses)}>{contacts.courses}</a>. Consulte possibilidades; não há anúncio de turmas nesta página.</p>
        </MetallicCard>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {customGpts.map((gpt) => (
            <GptCard key={gpt.slug} gpt={gpt} />
          ))}
        </div>
      </section>
    </main>
  );
}
