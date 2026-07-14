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
    name: "Dama Cleaner - SIGO Desktop",
    slug: "dama-cleaner-sigo-desktop",
    category: "Utilitário desktop",
    shortDescription:
      "Utilitário Windows para limpeza local de cache, arquivos temporários, logs e dados de sessão do SIGO Desktop, com execução simples, resultado conferível e preservação de configurações sensíveis.",
    fullDescription:
      "O Dama Cleaner - SIGO Desktop é uma ferramenta auxiliar para Windows criada para limpar arquivos temporários, cache, logs e dados de sessão do SIGO Desktop quando houver lentidão, dificuldade no carregamento de arquivos ou comportamento instável relacionado ao armazenamento local. A versão 1.7.0 foi validada como estável, utiliza base em BAT puro, não força o encerramento do SIGO, preserva arquivos de configuração sensíveis e registra log local para conferência técnica posterior.",
    version: "1.7.0",
    status: "Disponível",
    updatedAt: "2026-07-04",
    detailsUrl: "/programas/dama-cleaner-sigo-desktop",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1cLprfcL_ZfLixQvXguYGuNo_tas6t_vI",
    iconUrl: "/images/programs/dama-cleaner-sigo.png",
    featured: true,
  },
  {
    name: "Dama Biometria SIGO Fix",
    slug: "dama-biometria-sigo-fix",
    category: "Correção de ambiente SIGO",
    shortDescription:
      "Ferramenta Windows independente para auxiliar na correção de falhas locais de biometria, assinatura, Java, bibliotecas Nitgen e componentes relacionados ao uso do SIGO Desktop.",
    fullDescription:
      "O Dama Biometria SIGO Fix é uma ferramenta Windows independente, criada para auxiliar usuários do SIGO Desktop quando ocorrem falhas locais ligadas à biometria, assinatura, Java, bibliotecas Nitgen e reconhecimento do leitor biométrico. O programa oferece uma correção automática recomendada, opções avançadas para casos específicos, painel de log e orientação para que o usuário abra o SIGO pelo atalho normal/original após a correção. A ferramenta não é oficial do SIGO, não substitui suporte institucional e atua apenas como apoio para problemas locais recorrentes.",
    version: "1.0.0",
    status: "Disponível",
    updatedAt: "2026-07-04",
    detailsUrl: "/programas/dama-biometria-sigo-fix",
    downloadUrl: "https://drive.usercontent.google.com/download?id=1y0pRu7YeazLrSYFq2Sf0rgtrgMkh48rh&export=download",
    iconUrl: "/images/programs/dama-biometria-sigo-fix.png",
    featured: true,
  },
  {
    name: "Dama Token SIGO Fix",
    slug: "dama-token-sigo-fix",
    category: "Correção de ambiente SIGO",
    shortDescription:
      "Ferramenta Windows independente para auxiliar na correção guiada de falhas locais relacionadas à assinatura por token no SIGO Desktop, Java, drivers e providers PKCS#11.",
    fullDescription:
      "O Dama Token SIGO Fix é uma ferramenta desktop Windows independente, criada para auxiliar usuários do SIGO Desktop quando ocorrem falhas locais ligadas à assinatura por token. O programa prepara o ambiente local, verifica Java, drivers, providers PKCS#11, SafeSign/StarSign, SafeNet/eToken/Aladdin, processos que podem prender o token e, quando o ambiente está aprovado, cria um atalho corrigido para abrir o SIGO de forma mais estável. A ferramenta não é oficial do SIGO, não salva PIN, não copia certificados, não exporta chaves privadas, não assina documentos por conta própria e não altera o token.",
    version: "1.0.0",
    status: "Disponível",
    updatedAt: "2026-07-10",
    detailsUrl: "/programas/dama-token-sigo-fix",
    downloadUrl: "https://drive.usercontent.google.com/download?id=15g2KC03fdVtbqtpsFBX-4RyEfRXgYAhK&export=download",
    iconUrl: "/images/programs/dama-token-sigo-fix.png",
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
      "Aplicação desktop Windows, local e offline, para cadastro e acompanhamento de inquéritos, prazos, documentos, objetos, relatórios e dados correcionais.",
    fullDescription:
      "O Dama Gestor de Inquéritos é uma aplicação desktop Windows voltada à organização cartorária. O sistema permite cadastrar e acompanhar inquéritos policiais, controlar prazos e dilações, organizar documentos e juntadas, registrar objetos e movimentações, importar dados de PDFs e planilhas, gerar relatórios e realizar backups locais.",
    version: "1.0.0",
    status: "Disponível",
    updatedAt: "2026-07-13",
    detailsUrl: "/programas/dama-gestor-de-inqueritos",
    downloadUrl:
      "https://drive.usercontent.google.com/download?id=1sIMAwBV8_actMKhuLj0hBHe91z-lsEos&export=download",
    iconUrl: "/images/programs/dama-gestor-de-inqueritos.png",
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

export function getProgramBySlug(slug: string) {
  return programs.find((program) => program.slug === slug);
}

export function getProgramDownloadUrl(slug: string) {
  const program = getProgramBySlug(slug);

  if (!program?.downloadUrl) {
    throw new Error(`Programa sem URL de download publicada: ${slug}`);
  }

  return program.downloadUrl;
}
