export type PostItem = {
  title: string;
  slug: string;
  category: string;
  summary: string;
  date: string;
  readingTime?: string;
  tags?: string[];
};

export const posts: PostItem[] = [
  {
    title: "Apresentando o Dama Universe",
    slug: "apresentando-o-dama-universe",
    category: "Projetos Dama",
    summary: "Conheça a proposta do Dama Universe: uma base pública para organizar programas autorais, registros de evolução, referências, tutoriais e conteúdos técnicos.",
    date: "2026-06-16",
    readingTime: "5 min",
    tags: ["Dama Universe", "projetos", "tecnologia"],
  },
  {
    title: "Por que criei o Dama Gerador FCC",
    slug: "por-que-criei-o-dama-gerador-fcc",
    category: "Automação documental",
    summary: "Reflexão sobre como a automação documental pode reduzir retrabalho, organizar informações e apoiar a geração de documentos com conferência humana.",
    date: "2026-06-16",
    readingTime: "6 min",
    tags: ["Dama Gerador FCC", "documentação", "automação"],
  },
  {
    title: "Dama Gerador FCC 3.0: uma nova etapa operacional",
    slug: "dama-gerador-fcc-3-nova-etapa-operacional",
    category: "Programas Dama",
    summary: "Registro da evolução do Dama Gerador FCC 3.0, com página própria, download direto, tutoriais em vídeo e foco em uso local no Windows.",
    date: "2026-06-25",
    readingTime: "5 min",
    tags: ["Dama Gerador FCC 3.0", "tutorial", "download"],
  },
  {
    title: "Dama Universe: por que documentar cada avanço",
    slug: "dama-universe-por-que-documentar-cada-avanco",
    category: "Documentação",
    summary: "Como o registro de atualizações, páginas, tutoriais e status dos programas fortalece a identidade e a continuidade do ecossistema Dama.",
    date: "2026-06-25",
    readingTime: "5 min",
    tags: ["documentação", "changelog", "projetos"],
  },
  {
    title: "SDO e a organização operacional do plantão",
    slug: "sdo-e-a-organizacao-operacional-do-plantao",
    category: "Sistemas operacionais",
    summary: "Uma visão pública e objetiva sobre o SDO como ferramenta em ajustes finais para apoiar controle de plantão, ocorrências, relatórios e backup local.",
    date: "2026-06-25",
    readingTime: "5 min",
    tags: ["SDO", "plantão", "organização"],
  },
  {
    title: "Dama Inteligência Investigativa: arquitetura reservada",
    slug: "dama-inteligencia-investigativa-arquitetura-reservada",
    category: "Inteligência investigativa",
    summary: "Um registro institucional, sem exposição técnica sensível, sobre o projeto mais ambicioso do ecossistema Dama.",
    date: "2026-06-25",
    readingTime: "6 min",
    tags: ["inteligência investigativa", "MCP", "arquitetura"],
  },
  {
    title: "Como organizo versões dos meus programas",
    slug: "como-organizo-versoes-dos-meus-programas",
    category: "Desenvolvimento",
    summary: "Notas sobre versionamento, changelog, organização de arquivos, status dos projetos e publicação responsável de programas.",
    date: "2026-06-16",
    readingTime: "6 min",
    tags: ["versionamento", "changelog", "organização"],
  },
  {
    title: "Inteligência artificial como ferramenta de apoio",
    slug: "inteligencia-artificial-como-ferramenta-de-apoio",
    category: "Inteligência Artificial",
    summary: "Uma abordagem responsável sobre o uso da IA como apoio à organização, estudo, análise, escrita e desenvolvimento de ferramentas.",
    date: "2026-06-16",
    readingTime: "5 min",
    tags: ["IA", "apoio", "responsabilidade"],
  },
];
