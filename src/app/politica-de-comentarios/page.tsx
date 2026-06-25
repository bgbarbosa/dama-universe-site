import { createPageMetadata } from "@/lib/seo";
import { MetallicCard, PageHeader, SectionTitle } from "@/components/ui";
import { SecurityNotice } from "@/components/notices";

const sections = [
  {
    title: "Finalidade dos comentários",
    paragraphs: [
      "Os comentários do Dama Universe têm como finalidade permitir dúvidas gerais, sugestões, contribuições construtivas e interações relacionadas aos programas, artigos e conteúdos publicados."
    ]
  },
  {
    title: "Conteúdos não permitidos",
    paragraphs: [
      "Não é permitido publicar dados pessoais, documentos, senhas, informações sigilosas, dados de ocorrências, conteúdo sensível, ofensas, spam, links suspeitos, ataques pessoais ou publicidade não autorizada."
    ]
  },
  {
    title: "Moderação",
    paragraphs: [
      "Comentários que violem essas regras poderão ser removidos.",
      "O usuário é responsável pelo conteúdo que publicar."
    ]
  },
  {
    title: "Ferramentas externas",
    paragraphs: [
      "Quando os comentários forem realizados por meio de ferramentas externas, como GitHub Discussions ou Giscus, também serão aplicáveis as regras dessas plataformas."
    ]
  }
];

export const metadata = createPageMetadata({
  title: "Política de Comentários — Dama Universe",
  description: "Política de comentários do Dama Universe, com regras para dúvidas, sugestões, contribuições construtivas e segurança das interações.",
  path: "/politica-de-comentarios",
});

export default function PoliticaDeComentariosPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-20">
      <PageHeader
        title="Política de Comentários"
        subtitle="Participação segura e construtiva"
        description="Regras iniciais para comentários em posts, páginas de programas e futuras áreas de interação do Dama Universe."
      />

      <div className="space-y-8">
        <SecurityNotice>
          Comentários são bem-vindos para dúvidas gerais, sugestões e contribuições construtivas. Não publique dados pessoais, documentos, informações sigilosas, senhas ou conteúdo sensível.
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
