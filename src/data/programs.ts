export type ProgramStatus =
  | "Disponível"
  | "Em desenvolvimento"
  | "Ajustes finais"
  | "Testes finais"
  | "Em arquitetura reservada"
  | "Em planejamento"
  | "Futuro"
  | "Indisponível";

export type Program = {
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  fullDescription?: string;
  version: string;
  status: ProgramStatus;
  updatedAt?: string;
  detailsUrl: string;
  downloadUrl?: string;
  manualUrl?: string;
  changelogUrl?: string;
  repositoryUrl?: string;
  iconUrl?: string;
  featured: boolean;
};

export const programs: Program[] = [
  {
    name: "Dama Gerador FCC",
    slug: "dama-gerador-fcc",
    category: "Automação documental",
    shortDescription:
      "Aplicativo desktop para geração, organização e padronização de Formulários de Cadeia de Custódia — FCC, a partir de B.O. em PDF ou preenchimento manual.",
    fullDescription:
      "O Dama Gerador FCC 3.0 é um aplicativo desktop para Windows, desenvolvido em Python, criado para auxiliar na geração de Formulários de Cadeia de Custódia — FCC. A ferramenta permite gerar FCCs a partir de Boletins de Ocorrência em PDF ou por preenchimento manual, com recursos para extração de dados, identificação de lacres e objetos, seleção de vestígios, conferência visual e geração de documentos DOCX padronizados. O sistema reduz retrabalho e riscos de erro de digitação, mas mantém a conferência final das informações sob responsabilidade do usuário.",
    version: "3.0",
    status: "Disponível",
    updatedAt: "2026-06-23",
    detailsUrl: "/programas/dama-gerador-fcc",
    downloadUrl: "https://drive.google.com/file/d/1P4DmjPet9GsmoOWROxmKKb6Zt-F6fIC_/view?usp=drive_link",
    changelogUrl: "/changelog/dama-gerador-fcc/v3.0.0",
    iconUrl: "/images/programs/dama-gerador-fcc-3.png",
    featured: true,
  },
  {
    name: "Dama Gerador FCC Universal",
    slug: "dama-gerador-fcc-universal",
    category: "Automação documental avançada",
    shortDescription:
      "Evolução do Dama Gerador FCC, com biblioteca de modelos, cabeçalhos institucionais, órgãos, modelos personalizados e recursos avançados para geração de FCC.",
    fullDescription:
      "O Dama Gerador FCC Universal é a evolução do Dama Gerador FCC 3.0. A nova versão amplia o sistema com biblioteca de modelos de FCC, escolha de modelos antes da geração, prévia visual, cadastro de órgãos e instituições, cabeçalhos institucionais, brasão ou logomarca, importação de modelos DOCX personalizados e suporte a campos específicos para evidências digitais. A versão Universal encontra-se em fase de testes finais, com ajustes de acabamento, validação operacional e preparação para lançamento oficial em breve.",
    version: "Universal",
    status: "Testes finais",
    updatedAt: "2026-06-23",
    detailsUrl: "/programas/dama-gerador-fcc-universal",
    featured: true,
  },
  {
    name: "SDO",
    slug: "sdo",
    category: "Gestão operacional de plantão",
    shortDescription:
      "Sistema local/offline para controle operacional de plantão, distribuição de ocorrências, acompanhamento de pendências, presos, relatórios e backup.",
    fullDescription:
      "O SDO é um sistema desktop local/offline voltado ao controle operacional de plantão de delegacia. Ele organiza ativação de plantão, cadastro de equipes, distribuição automática de ocorrências, rodízio por categoria, painel de acompanhamento, controle de presos/custodiados/adolescentes, relatórios, backup, histórico e encerramento assistido. A versão atual já passou pela etapa de testes finais e encontra-se em fase de ajustes operacionais, revisão visual e preparação antes da liberação para uso.",
    version: "2.0",
    status: "Ajustes finais",
    updatedAt: "2026-06-23",
    detailsUrl: "/programas/sdo",
    featured: true,
  },
  {
    name: "Dama Gestor de Inquéritos",
    slug: "dama-gestor-de-inqueritos",
    category: "Gestão cartorária e prazos",
    shortDescription:
      "Sistema em desenvolvimento para controle de inquéritos, prazos, documentos, objetos, relatórios e dados correcionais.",
    fullDescription:
      "O Dama Gestor de Inquéritos é um sistema desktop em desenvolvimento, planejado para centralizar o controle de inquéritos policiais, prazos, dilações, documentos, objetos em cartório, movimentações, relatórios mensais e dados correcionais exigidos em rotinas de conferência. O projeto foi concebido para funcionar de forma local/offline, com banco SQLite, organização por cartório, alertas de vencimento e relatórios estruturados.",
    version: "Planejamento técnico",
    status: "Em desenvolvimento",
    updatedAt: "2026-06-23",
    detailsUrl: "/programas/dama-gestor-de-inqueritos",
    featured: true,
  },
  {
    name: "Dama Inteligência Investigativa",
    slug: "dama-inteligencia-investigativa",
    category: "Inteligência investigativa",
    shortDescription:
      "Projeto estratégico em arquitetura reservada, voltado à organização, correlação e análise inteligente de dados investigativos, com núcleo autoral baseado em MCP.",
    fullDescription:
      "O Dama Inteligência Investigativa é o projeto mais ambicioso do ecossistema Dama. Planejado ao longo de anos, foi concebido como uma plataforma modular de apoio à investigação, com foco em organização de dados, indexação documental, correlação de vínculos, memória investigativa, agentes especializados e consultas inteligentes. No centro da proposta está um núcleo autoral baseado em MCP, projetado para integrar ferramentas, agentes, bases de dados e memória investigativa de forma controlada, rastreável e segura. Por seu caráter estratégico, os detalhes técnicos permanecem reservados nesta fase, com novas informações sendo reveladas conforme os módulos evoluírem para versões funcionais.",
    version: "Conceitual",
    status: "Em arquitetura reservada",
    updatedAt: "2026-06-23",
    detailsUrl: "/programas/dama-inteligencia-investigativa",
    featured: true,
  },
];

export const featuredPrograms = programs.filter((program) => program.featured);
