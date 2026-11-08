import { createPageMetadata } from "@/lib/seo";
import { MetallicCard, PageHeader, SectionTitle } from "@/components/ui";
import { SecurityNotice } from "@/components/notices";

const sections = [
  {
    title: "Responsável e escopo",
    paragraphs: [
      "Esta política descreve o tratamento de dados no site Dama Universe e apresenta informações específicas sobre a demonstração do plugin DAMA Registro de Ocorrência. Para dúvidas ou solicitações sobre informações enviadas ao projeto, utilize a página de contato.",
      "Última atualização: 7 de novembro de 2026.",
    ],
  },
  {
    title: "DAMA Registro de Ocorrência — demonstração",
    paragraphs: [
      "A versão pública demonstrativa destina-se exclusivamente a dados integralmente sintéticos, criados para teste e não derivados de ocorrências reais. Não envie dados reais, pessoais ou sigilosos, documentos de terceiros, senhas, credenciais ou informações de procedimentos restritos. Os filtros de formato não comprovam a origem sintética dos dados.",
      "Quando uma ferramenta é acionada, a integração pode transmitir ao servidor MCP os campos necessários à conferência, conforme as instruções do plugin. O servidor é público, opera sem autenticação e recebe e processa os dados que lhe forem enviados; por isso, qualquer cliente que conheça o endereço pode acessá-lo dentro dos limites disponíveis.",
      "O código demonstrativo não inclui armazenamento de ocorrências, e os registros de execução e rastreamento do Worker estão desativados na configuração atual. Isso não garante ausência de coleta ou retenção por provedores: Cloudflare e OpenAI podem processar dados e metadados técnicos conforme suas próprias configurações e políticas. O prazo de retenção e a existência de outros registros dos provedores não foram estabelecidos nesta página.",
      "As conversas no ChatGPT e as solicitações ao servidor estão sujeitas também às políticas da OpenAI e da Cloudflare. Para dúvidas ou solicitações relacionadas ao projeto, utilize a página de contato sem incluir dados sensíveis.",
    ],
  },
  {
    title: "Dados enviados pelo formulário de contato",
    paragraphs: [
      "O formulário de contato pode receber nome, e-mail, assunto, tipo de contato e mensagem. Esses dados são usados para responder ao contato e tratar a solicitação apresentada.",
      "O envio é uma ação iniciada pelo visitante. Os dados são validados novamente pelo servidor do Dama Universe e então encaminhados ao Formspree, serviço utilizado para encaminhar a mensagem ao responsável pelo projeto.",
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
      "Para solicitar acesso, correção ou exclusão relacionada a um contato enviado, quando aplicável, utilize a página de contato e descreva a solicitação sem incluir novos dados sensíveis. Para esclarecer o tratamento da sua mensagem e os prazos aplicáveis, fale com o responsável pela página de contato.",
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
    <main id="conteudo" tabIndex={-1} className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-6">
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
