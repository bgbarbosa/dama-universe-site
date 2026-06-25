import { createPageMetadata } from "@/lib/seo";
import { MetallicCard, PageHeader, SectionTitle } from "@/components/ui";
import { SecurityNotice } from "@/components/notices";

const sections = [
  {
    title: "Informações fornecidas voluntariamente",
    paragraphs: [
      "O Dama Universe poderá coletar informações fornecidas voluntariamente pelo usuário por meio de formulário de contato, como nome, e-mail, assunto, tipo de contato e mensagem.",
      "Essas informações serão utilizadas apenas para responder contatos, analisar sugestões, verificar relatos de erro, avaliar propostas de parceria ou tratar assuntos relacionados ao projeto."
    ]
  },
  {
    title: "Dados que não devem ser enviados",
    paragraphs: [
      "O usuário não deve enviar dados sensíveis, documentos sigilosos, senhas, informações pessoais de terceiros ou conteúdo relacionado a procedimentos restritos.",
      "O formulário de contato foi pensado para mensagens gerais, sugestões, dúvidas, relatos de erro e propostas relacionadas ao Dama Universe."
    ]
  },
  {
    title: "Comentários públicos",
    paragraphs: [
      "Comentários públicos poderão ser realizados por meio de ferramentas externas, como Giscus e GitHub Discussions, sujeitas às políticas das respectivas plataformas.",
      "Ao utilizar ferramentas externas, o usuário também se submete às regras, termos e políticas de privacidade desses serviços."
    ]
  },
  {
    title: "Serviços externos",
    paragraphs: [
      "O site pode conter links para serviços externos, como Google Drive, GitHub, YouTube, Instagram e outros. Cada serviço possui suas próprias políticas de privacidade."
    ]
  },
  {
    title: "Ferramentas de análise",
    paragraphs: [
      "Caso sejam utilizadas ferramentas de análise de acesso no futuro, essa informação deverá ser acrescentada nesta política."
    ]
  }
];

export const metadata = createPageMetadata({
  title: "Política de Privacidade — Dama Universe",
  description: "Política de privacidade do Dama Universe sobre formulário de contato, comentários públicos, serviços externos e dados que não devem ser enviados.",
  path: "/politica-de-privacidade",
});

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-20">
      <PageHeader
        title="Política de Privacidade"
        subtitle="Tratamento responsável de informações"
        description="Informações iniciais sobre o uso de dados fornecidos voluntariamente em contatos, comentários e interações com serviços externos."
      />

      <div className="space-y-8">
        <SecurityNotice>
          Não envie dados sensíveis, documentos sigilosos, senhas, informações pessoais de terceiros ou conteúdo relacionado a procedimentos restritos.
        </SecurityNotice>

        {sections.map((section) => (
          <MetallicCard key={section.title}>
            <SectionTitle title={section.title} className="mb-5" />
            <div className="space-y-4 text-sm leading-7 text-muted md:text-base md:leading-8">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </MetallicCard>
        ))}
      </div>
    </main>
  );
}
