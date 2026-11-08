import Link from "next/link";
import { MetallicCard, PageHeader, SectionTitle } from "@/components/ui";
import { SecurityNotice } from "@/components/notices";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "DAMA Registro de Ocorrência — Dama Universe",
  description: "Conheça a demonstração de elaboração e revisão de minutas com dados inteiramente sintéticos.",
  path: "/gpts/dama-registro-de-ocorrencia",
});

export default function DamaRegistroDeOcorrenciaPage() {
  return (
    <main id="conteudo" tabIndex={-1} className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-6">
      <PageHeader
        title="DAMA Registro de Ocorrência"
        subtitle="Demonstração com dados sintéticos"
        description="Apoio à elaboração e à revisão de minutas simuladas para profissionais policiais brasileiros."
      />
      <div className="space-y-8">
        <SecurityNotice>
          Use exclusivamente informações integralmente sintéticas, criadas para demonstração e não derivadas de ocorrências reais. Não envie dados reais, pessoais ou sigilosos, documentos de terceiros, credenciais ou conteúdo de procedimentos restritos.
        </SecurityNotice>
        <MetallicCard>
          <SectionTitle title="Finalidade e limites" className="mb-5" />
          <div className="space-y-4 text-sm leading-7 text-muted md:text-base md:leading-8">
            <p>O DAMA auxilia na organização e revisão de minutas fictícias, com conferências de identificadores, cronologia, estados e consistência. Seus resultados podem conter erros e precisam de conferência humana.</p>
            <p>Esta demonstração não possui vínculo institucional e não realiza registro oficial automático de boletins, consultas a sistemas policiais ou atos policiais. Não substitui avaliação profissional, institucional ou jurídica.</p>
            <p>O servidor de apoio é público e acessível sem autenticação. As validações de formato não comprovam que uma informação seja sintética; cabe ao usuário respeitar essa restrição.</p>
          </div>
        </MetallicCard>
        <MetallicCard>
          <SectionTitle title="Acesso e suporte" className="mb-5" />
          <div className="space-y-4 text-sm leading-7 text-muted md:text-base md:leading-8">
            <p>Desenvolvedor: Marco Aurélio Pereira Barbosa. A distribuição pretendida é gratuita para usuários elegíveis do ChatGPT no Brasil, sujeita à aprovação e às condições e limites da OpenAI. A disponibilidade pública do plugin depende da conclusão da revisão.</p>
            <p>Para dúvidas, consulte a <Link href="/contato" className="underline">página de contato</Link>. Conheça também a <Link href="/politica-de-privacidade" className="underline">política de privacidade</Link> e os <Link href="/termos-de-uso" className="underline">termos de uso</Link>.</p>
          </div>
        </MetallicCard>
      </div>
    </main>
  );
}
