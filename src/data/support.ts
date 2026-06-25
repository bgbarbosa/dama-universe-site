export type SupportStatus = "Futuro" | "Previsto" | "Em avaliação" | "Ativo";

export type SupportOption = {
  name: string;
  description: string;
  status: SupportStatus;
  url?: string;
};

export const supportOptions: SupportOption[] = [
  {
    name: "GitHub Sponsors",
    description: "Canal futuro para apoiar projetos e manutenção de ferramentas publicadas.",
    status: "Previsto",
    url: "#",
  },
  {
    name: "Ko-fi",
    description: "Opção futura para contribuições simples e apoio ao desenvolvimento contínuo.",
    status: "Previsto",
    url: "#",
  },
  {
    name: "Buy Me a Coffee",
    description: "Alternativa futura para apoio financeiro direto e transparente.",
    status: "Previsto",
    url: "#",
  },
  {
    name: "YouTube",
    description: "Canal futuro para vídeos, demonstrações, tutoriais e registros de evolução.",
    status: "Previsto",
    url: "#",
  },
  {
    name: "Parcerias",
    description: "Possibilidade futura de parcerias técnicas, educacionais ou institucionais.",
    status: "Em avaliação",
    url: "#",
  },
  {
    name: "Patrocínio direto",
    description: "Formato futuro para patrocinadores interessados em apoiar o ecossistema Dama.",
    status: "Em avaliação",
    url: "#",
  },
  {
    name: "Apoio institucional",
    description: "Possibilidade futura de apoio por instituições, grupos de estudo ou iniciativas educacionais.",
    status: "Em avaliação",
    url: "#",
  },
  {
    name: "Indicação de ferramentas",
    description: "Espaço futuro para indicação transparente de ferramentas úteis ao desenvolvimento e estudo.",
    status: "Futuro",
    url: "#",
  },
];
