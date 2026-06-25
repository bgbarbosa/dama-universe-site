import { createPageMetadata } from "@/lib/seo";
import { MetallicCard, PageHeader, SectionTitle } from "@/components/ui";
import { ResponsibilityNotice } from "@/components/notices";

const sections = [
  {
    title: "Finalidade do site",
    paragraphs: [
      "O Dama Universe é um espaço destinado à divulgação de programas, ferramentas digitais, conteúdos técnicos, referências, downloads e registros de desenvolvimento.",
      "O site organiza informações públicas sobre projetos em evolução, versões, materiais de apoio e conteúdos relacionados à tecnologia, automação, inteligência artificial e análise de dados."
    ]
  },
  {
    title: "Uso das ferramentas",
    paragraphs: [
      "As ferramentas disponibilizadas possuem finalidade de apoio, organização e automação. O usuário é responsável pela conferência final de todas as informações, documentos e resultados gerados.",
      "Nenhuma ferramenta substitui análise técnica, profissional, institucional ou jurídica."
    ]
  },
  {
    title: "Autoria e materiais publicados",
    paragraphs: [
      "Os programas, textos, imagens, manuais, documentos e materiais publicados no site pertencem aos seus respectivos autores, salvo indicação em contrário.",
      "É proibida a redistribuição, venda, modificação, engenharia reversa ou uso indevido dos programas disponibilizados sem autorização expressa, quando aplicável."
    ]
  },
  {
    title: "Links e serviços externos",
    paragraphs: [
      "O site pode conter links para serviços externos, como Google Drive, GitHub, YouTube, Instagram e outros. O acesso a esses serviços está sujeito às regras de cada plataforma."
    ]
  },
  {
    title: "Atualizações dos termos",
    paragraphs: [
      "Os termos poderão ser atualizados conforme a evolução do projeto."
    ]
  }
];

export const metadata = createPageMetadata({
  title: "Termos de Uso — Dama Universe",
  description: "Termos de uso do Dama Universe, com orientações sobre finalidade, responsabilidade, materiais publicados e serviços externos.",
  path: "/termos-de-uso",
});

export default function TermosDeUsoPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 pb-20">
      <PageHeader
        title="Termos de Uso"
        subtitle="Segurança, responsabilidade e uso adequado"
        description="Condições iniciais de uso do Dama Universe, de seus conteúdos públicos, páginas, downloads, referências e ferramentas disponibilizadas."
      />

      <div className="space-y-8">
        <ResponsibilityNotice>
          As ferramentas disponibilizadas possuem finalidade de apoio, organização e automação. O usuário é responsável pela conferência final de todas as informações, documentos e resultados gerados.
        </ResponsibilityNotice>

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
