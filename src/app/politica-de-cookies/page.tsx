import { createPageMetadata } from "@/lib/seo";
import { InfoNotice } from "@/components/notices";
import { MetallicCard, PageHeader, SectionTitle } from "@/components/ui";

const categories = [
  {
    title: "Preferência essencial",
    description:
      "O site grava no armazenamento local a escolha de privacidade, sua versão e as datas de atualização e expiração. Esse registro é necessário para respeitar a decisão do visitante e expira tecnicamente após 180 dias.",
  },
  {
    title: "Análises opcionais",
    description:
      "Vercel Analytics, Google Analytics e Microsoft Clarity são carregados apenas quando esta categoria é aceita. O Vercel Analytics informa não usar cookies; Google Analytics e Microsoft Clarity podem gravar cookies próprios e usar identificadores técnicos conforme suas configurações e políticas.",
  },
  {
    title: "Conteúdo externo opcional",
    description:
      "Vídeos em youtube-nocookie.com e comentários via Giscus/GitHub Discussions só são incorporados após permissão. Quando o conteúdo é liberado, esses provedores recebem a conexão e podem tratar dados conforme suas políticas.",
  },
];

export const metadata = createPageMetadata({
  title: "Política de Cookies — Dama Universe",
  description:
    "Categorias de armazenamento, análises e conteúdo externo usadas no Dama Universe e como controlar cada preferência.",
  path: "/politica-de-cookies",
});

export default function PoliticaDeCookiesPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-6">
      <PageHeader
        title="Política de Cookies"
        subtitle="Escolhas armazenadas no navegador"
        description="Entenda quais categorias técnicas podem ser usadas, suas finalidades e como aceitar, recusar ou alterar sua escolha."
      />

      <InfoNotice>
        O termo cookies é usado aqui também para tecnologias semelhantes, como
        armazenamento local e identificadores técnicos. Última atualização: 12
        de julho de 2026. A classificação e a base jurídica aplicável devem passar
        por validação jurídica especializada.
      </InfoNotice>

      <div className="mt-8 grid gap-6">
        {categories.map((category) => (
          <MetallicCard key={category.title}>
            <SectionTitle title={category.title} className="mb-4" />
            <p className="text-sm leading-7 text-muted md:text-base md:leading-8">
              {category.description}
            </p>
          </MetallicCard>
        ))}
      </div>

      <MetallicCard variant="notice" className="mt-8">
        <h2 className="text-xl font-black text-text">Como alterar a escolha</h2>
        <p className="mt-4 text-sm leading-7 text-muted">
          Use o botão Privacidade, exibido no canto inferior da página depois da
          primeira escolha. Também é possível apagar o armazenamento local do
          domínio nas configurações do navegador; nesse caso, o painel será
          apresentado novamente. Ao revogar análises, a página é recarregada para
          interromper os coletores já ativos na sessão.
        </p>
      </MetallicCard>

      <MetallicCard className="mt-8">
        <h2 className="text-xl font-black text-text">Conexões que não dependem do painel</h2>
        <p className="mt-4 text-sm leading-7 text-muted">
          Páginas e recursos do próprio domínio são essenciais para o funcionamento.
          O formulário só envia dados ao servidor do Dama Universe quando o
          visitante o submete; o servidor faz o encaminhamento ao serviço configurado.
          Links para downloads, GPTs, redes sociais e outros sites externos somente
          abrem o serviço de destino quando são acionados pelo visitante.
        </p>
      </MetallicCard>
    </main>
  );
}
