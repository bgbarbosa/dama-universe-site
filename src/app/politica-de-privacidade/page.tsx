import { createPageMetadata } from "@/lib/seo";
import { MetallicCard, PageHeader, SectionTitle } from "@/components/ui";
import { SecurityNotice } from "@/components/notices";

const sections = [
  {
    title: "Responsável e escopo",
    paragraphs: [
      "Esta política descreve o tratamento de dados realizado no site Dama Universe. Para dúvidas ou solicitações sobre informações enviadas ao projeto, utilize a página de contato.",
      "Última atualização: 12 de julho de 2026.",
    ],
  },
  {
    title: "Dados enviados pelo formulário de contato",
    paragraphs: [
      "O formulário de contato pode receber nome, e-mail, assunto, tipo de contato e mensagem. Esses dados são usados para responder ao contato e tratar a solicitação apresentada.",
      "O envio é uma ação iniciada pelo visitante. Os dados são validados novamente pelo servidor do Dama Universe e então encaminhados ao serviço de formulário definido em configuração privada. O provedor e os prazos de retenção dessa operação devem permanecer documentados e revisados pelo responsável pelo site.",
      "Não envie documentos sigilosos, senhas, dados de terceiros ou informações relacionadas a procedimentos restritos.",
    ],
  },
  {
    title: "Ferramentas de análise utilizadas",
    paragraphs: [
      "O Dama Universe mantém Vercel Analytics, Google Analytics e Microsoft Clarity para produzir métricas de audiência, desempenho, navegação e interação. Dependendo da ferramenta, podem ser tratados tipo de dispositivo e navegador, páginas visitadas, horários, referência de origem, localização aproximada, eventos de interação e identificadores técnicos.",
      "Essas ferramentas são classificadas neste site como análises opcionais. Elas somente são carregadas depois que o visitante aceita essa categoria no painel de privacidade. A recusa não impede o uso das páginas e pode ser alterada posteriormente pelo botão Privacidade.",
      "O Vercel Analytics informa operar com dados agregados, sem cookies de terceiros e sem armazenar endereço IP. Google Analytics e Microsoft Clarity podem usar cookies próprios e tecnologias semelhantes quando carregados. Os dados seguem para os respectivos provedores, sujeitos às configurações do projeto, às políticas e aos períodos de retenção de cada serviço.",
      "Ao retirar a permissão, o site informa a revogação às ferramentas compatíveis e recarrega a página para remover os coletores já injetados. Cookies já mantidos por serviços ou pelo navegador também podem ser apagados nas configurações do navegador.",
    ],
  },
  {
    title: "Vídeos, comentários e links externos",
    paragraphs: [
      "Vídeos incorporados utilizam o modo de privacidade aprimorada no domínio youtube-nocookie.com. O iframe não é criado antes da permissão para conteúdo externo. Depois de permitido, o YouTube recebe a conexão e pode tratar dados quando o player é carregado ou utilizado.",
      "Quando configurados, comentários usam Giscus e GitHub Discussions. O script e o quadro externo também só são criados depois da mesma permissão. Para publicar, o visitante pode precisar autenticar-se no GitHub e passa a se submeter às políticas dessa plataforma.",
      "Downloads, GPTs, redes sociais e outros links apenas direcionam para Google Drive, ChatGPT, YouTube, GitHub ou outros serviços quando o visitante decide abri-los. A partir desse acesso, o tratamento de dados segue também as políticas do destino.",
    ],
  },
  {
    title: "Preferência de privacidade",
    paragraphs: [
      "A escolha sobre análises e conteúdo externo é registrada no armazenamento local deste navegador. O registro contém somente a versão da preferência, as categorias aceitas e datas técnicas de atualização e expiração; não contém nome, e-mail nem conteúdo do formulário.",
      "A preferência expira após 180 dias, quando o site volta a solicitar uma escolha. Ela também pode ser revista a qualquer momento pelo botão Privacidade ou apagada manualmente nas configurações do navegador.",
    ],
  },
  {
    title: "Controle e solicitações",
    paragraphs: [
      "O visitante pode recusar categorias opcionais sem perder as funções essenciais do site. Vídeos incorporados e comentários externos permanecem bloqueados, mas links diretos podem ser abertos por decisão do visitante.",
      "Para solicitar acesso, correção ou exclusão relacionada a um contato enviado, quando aplicável, utilize a página de contato e descreva a solicitação sem incluir novos dados sensíveis. Bases legais, prazos de retenção e procedimentos de atendimento devem ser confirmados por avaliação jurídica e operacional especializada.",
    ],
  },
];

export const metadata = createPageMetadata({
  title: "Política de Privacidade — Dama Universe",
  description:
    "Política de privacidade sobre contato, análises opcionais, vídeos externos e controle das preferências no Dama Universe.",
  path: "/politica-de-privacidade",
});

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-6">
      <PageHeader
        title="Política de Privacidade"
        subtitle="Transparência e controle"
        description="Como o Dama Universe trata informações de contato, métricas opcionais, conteúdo externo e preferências registradas no navegador."
      />

      <div className="space-y-8">
        <SecurityNotice>
          Não envie dados sensíveis, documentos sigilosos, senhas, informações
          pessoais de terceiros ou conteúdo relacionado a procedimentos restritos.
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
