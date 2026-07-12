import { createPageMetadata } from "@/lib/seo";
import { MetallicCard, PageHeader, SectionTitle } from "@/components/ui";
import { SecurityNotice } from "@/components/notices";

const sections = [
  {
    title: "Informações fornecidas voluntariamente",
    paragraphs: [
      "O formulário de contato pode receber nome, e-mail, assunto, tipo de contato e mensagem. Esses dados são usados para responder ao contato e tratar a solicitação apresentada.",
      "Não envie documentos sigilosos, senhas, dados de terceiros ou informações relacionadas a procedimentos restritos. Os campos possuem limites técnicos e passam por validação no servidor antes do encaminhamento ao serviço de formulário configurado pelo site.",
    ],
  },
  {
    title: "Ferramentas de análise utilizadas",
    paragraphs: [
      "O Dama Universe utiliza Vercel Analytics, Google Analytics e Microsoft Clarity para produzir métricas de audiência, desempenho, navegação e interação. Dependendo da ferramenta e da configuração do navegador, podem ser tratados endereço IP, tipo de dispositivo e navegador, páginas visitadas, horários, origem aproximada do acesso, eventos de interação e identificadores técnicos.",
      "Essas ferramentas são classificadas neste site como análises opcionais. Elas somente são carregadas depois que o visitante aceita essa categoria no painel de privacidade. A recusa não impede o uso das páginas e pode ser alterada posteriormente pelo botão Privacidade.",
      "Os dados são enviados aos respectivos provedores, que possuem políticas e períodos de retenção próprios. A configuração e a base jurídica aplicável devem ser revisadas periodicamente e estão sujeitas a validação jurídica especializada.",
    ],
  },
  {
    title: "Vídeos e serviços externos",
    paragraphs: [
      "Vídeos incorporados utilizam o domínio de privacidade aprimorada youtube-nocookie.com. O iframe não é criado antes da permissão para conteúdo externo, evitando conexão antecipada desnecessária com o YouTube.",
      "Downloads, GPTs e outros links podem direcionar a Google Drive, ChatGPT, YouTube ou outros serviços. Ao abrir esses endereços, o tratamento de dados passa a seguir também as políticas do serviço acessado.",
    ],
  },
  {
    title: "Preferência de privacidade",
    paragraphs: [
      "A escolha sobre análises e conteúdo externo é registrada somente no armazenamento local deste navegador. O registro contém a versão da preferência, as categorias aceitas e datas técnicas de atualização e expiração; não contém nome, e-mail ou conteúdo do formulário.",
      "A preferência expira após 180 dias, quando o site volta a solicitar uma escolha. Ela também pode ser revista a qualquer momento pelo botão Privacidade ou apagada manualmente nas configurações do navegador.",
    ],
  },
  {
    title: "Controle e solicitações",
    paragraphs: [
      "O visitante pode recusar categorias opcionais sem perder as funções essenciais do site. Para solicitar informações, correção ou exclusão relacionada a um contato enviado, quando aplicável, utilize a página de contato e descreva a solicitação sem incluir novos dados sensíveis.",
      "A definição de prazos de retenção, bases legais e procedimentos de atendimento deve ser confirmada por avaliação jurídica e operacional especializada.",
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
