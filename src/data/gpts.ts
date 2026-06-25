export type GptStatus = "Público" | "Em teste" | "Restrito" | "Em planejamento";

export type CustomGpt = {
  name: string;
  slug: string;
  author: string;
  category: string;
  status: GptStatus;
  shortDescription: string;
  purpose: string;
  indicatedFor: string[];
  precautions: string[];
  url: string;
  featured?: boolean;
};

export const customGpts: CustomGpt[] = [
  {
    name: "Boletim de Ocorrência 2.0",
    slug: "boletim-de-ocorrencia-2",
    author: "MARCO BARBOSA",
    category: "Redação policial",
    status: "Público",
    shortDescription:
      "Auxilia agentes de segurança pública, escrivães e operadores jurídicos na redação de históricos de ocorrências policiais com precisão, clareza e conformidade legal.",
    purpose:
      "Atuar como apoio especializado na redação de históricos de ocorrência e análise jurídica preliminar, sempre com linguagem formal, objetiva e fiel aos fatos informados pelo usuário.",
    indicatedFor: [
      "relatos apresentados diretamente na delegacia",
      "históricos oriundos de BO/PM",
      "ocorrências de violência doméstica",
      "tipificação penal preliminar",
      "organização de fatos narrados em linguagem policial",
      "padronização de históricos em texto claro e impessoal",
    ],
    precautions: [
      "não inventar fatos, nomes, datas, locais ou providências",
      "usar somente as informações fornecidas pelo usuário",
      "marcar dados ausentes como NÃO INFORMADO quando necessário",
      "não substituir análise da autoridade policial ou avaliação jurídica oficial",
      "exigir conferência final do usuário antes de qualquer uso formal",
    ],
    url: "https://chatgpt.com/g/g-6969cb4f21888191bdee194e7b860958-boletim-de-ocorrencia-2-0",
    featured: true,
  },
  {
    name: "Especialista em Escrita e Revisão",
    slug: "especialista-em-escrita-e-revisao",
    author: "MARCO BARBOSA",
    category: "Escrita e revisão",
    status: "Público",
    shortDescription:
      "Aprimora textos com base na norma culta do português, corrigindo erros, melhorando fluidez e adequando o conteúdo para publicações acadêmicas, técnicas e digitais.",
    purpose:
      "Apoiar a produção, correção e aprimoramento de textos com clareza, correção gramatical, naturalidade, coesão, impacto comunicativo e adequação ao público-alvo.",
    indicatedFor: [
      "correção gramatical e ortográfica",
      "revisão de estilo e fluidez textual",
      "artigos acadêmicos, técnicos e científicos",
      "textos para web, redes sociais e publicações digitais",
      "melhoria de títulos, introduções e conclusões",
      "adequação de linguagem para público leigo, técnico, acadêmico ou executivo",
    ],
    precautions: [
      "preservar a intenção original do autor",
      "não alterar fatos sensíveis sem autorização",
      "ajustar o tom conforme o contexto de publicação",
      "evitar linguagem artificial ou excessivamente genérica",
      "revisar dados, citações e referências antes de publicação formal",
    ],
    url: "https://chatgpt.com/g/g-686d2e7158408191b889078e2bf522e6-especialista-em-escrita-e-revisao",
    featured: true,
  },
];
