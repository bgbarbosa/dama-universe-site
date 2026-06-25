export type UpdateType =
  | "Programa"
  | "Download"
  | "GPT"
  | "Blog"
  | "Referência"
  | "Vídeo"
  | "Site"
  | "Planejamento";

export type UpdateItem = {
  title: string;
  area: string;
  type: UpdateType;
  date: string;
  summary: string;
  url?: string;
};

export const updates: UpdateItem[] = [
  {
    title: "Tutoriais do Dama Gerador FCC 3.0 publicados",
    area: "Vídeos",
    type: "Vídeo",
    date: "2026-06-25",
    summary:
      "A Home e a página do Dama Gerador FCC 3.0 receberam uma seção com três vídeos tutoriais organizados em barra de rolagem horizontal.",
    url: "/programas/dama-gerador-fcc",
  },
  {
    title: "GPTs personalizados atualizados",
    area: "GPTs",
    type: "GPT",
    date: "2026-06-25",
    summary:
      "A página de GPTs foi atualizada para exibir, neste momento, apenas os dois assistentes oficiais: Boletim de Ocorrência 2.0 e Especialista em Escrita e Revisão.",
    url: "/gpts",
  },
  {
    title: "Dama Inteligência Investigativa adicionado",
    area: "Programas",
    type: "Programa",
    date: "2026-06-25",
    summary:
      "O projeto mais ambicioso do ecossistema Dama foi incluído no site em arquitetura reservada, com apresentação institucional e sem exposição de detalhes sensíveis do planejamento.",
    url: "/programas/dama-inteligencia-investigativa",
  },
  {
    title: "Dama Gerador FCC Universal adicionado",
    area: "Programas",
    type: "Programa",
    date: "2026-06-23",
    summary:
      "Novo programa incluído no Dama Universe. A versão Universal está em fase de testes finais, com ajustes de acabamento, validação operacional e preparação para lançamento oficial.",
    url: "/programas/dama-gerador-fcc-universal",
  },
  {
    title: "SDO incluído no catálogo de programas",
    area: "Programas",
    type: "Programa",
    date: "2026-06-23",
    summary:
      "O SDO foi adicionado como sistema em ajustes finais, voltado ao controle operacional de plantão, distribuição de ocorrências, relatórios, backup e acompanhamento de pendências.",
    url: "/programas/sdo",
  },
  {
    title: "Dama Gestor de Inquéritos incluído",
    area: "Programas",
    type: "Programa",
    date: "2026-06-23",
    summary:
      "O Dama Gestor de Inquéritos foi incluído como projeto em desenvolvimento, com foco em controle de inquéritos, prazos, documentos, objetos, relatórios e dados correcionais.",
    url: "/programas/dama-gestor-de-inqueritos",
  },
  {
    title: "Dama Gerador FCC atualizado para versão 3.0",
    area: "Programas",
    type: "Programa",
    date: "2026-06-23",
    summary:
      "A descrição do Dama Gerador FCC foi revisada para destacar a versão 3.0, geração de FCC a partir de B.O. em PDF, preenchimento manual, conferência visual e geração de DOCX.",
    url: "/programas/dama-gerador-fcc",
  },
  {
    title: "Página de referências reorganizada",
    area: "Referências",
    type: "Referência",
    date: "2026-06-23",
    summary:
      "A página de referências passou a usar cards por categoria, com pessoas, instituições, cursos, ferramentas, artigos e links oficiais organizados.",
    url: "/referencias",
  },
];
