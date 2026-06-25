export type ReferenceType =
  | "Pessoa"
  | "Instituição"
  | "Ferramenta"
  | "Artigo"
  | "Curso"
  | "Site";

export type ReferenceLink = {
  label: string;
  url: string;
};

export type ReferenceItem = {
  name: string;
  type: ReferenceType;
  area: string;
  description: string;
  reason: string;
  links: ReferenceLink[];
  tags?: string[];
  imageUrl?: string;
  authorizedImage?: boolean;
  featured?: boolean;
};

export const references: ReferenceItem[] = [
  {
    name: "Jonas Tomazi",
    type: "Pessoa",
    area: "Investigação, análise de dados e investigação financeira",
    description:
      "Referência de estudo em investigação, análise de dados, investigação financeira, combate à corrupção e aplicação de tecnologia à atividade investigativa.",
    reason:
      "Incluído pela atuação relacionada à integração entre investigação, dados, inteligência artificial e formação técnica de agentes públicos.",
    links: [
      {
        label: "Matéria ADEPOL-MG",
        url: "https://adepolmg.org/jonas-tomazi-entra-na-lista-dos-melhores-delegados-de-policia-do-brasil/",
      },
      {
        label: "Escavador",
        url: "https://www.escavador.com/sobre/1661087728/jonas-tomazi",
      },
      {
        label: "DataVirtus",
        url: "https://datavirtus.com.br/",
      },
    ],
    tags: ["Dados", "IA", "Investigação financeira"],
    authorizedImage: false,
  },
  {
    name: "Daniel Avilla",
    type: "Pessoa",
    area: "Computação forense e forense mobile",
    description:
      "Referência de estudo em computação forense, perícia digital móvel e desenvolvimento de ferramenta aplicada à análise de dispositivos móveis.",
    reason:
      "Incluído pela contribuição prática ao ecossistema de perícia digital móvel e pelo conteúdo técnico compartilhado na área de forense mobile.",
    links: [
      {
        label: "LinkedIn",
        url: "https://br.linkedin.com/in/daniel-a-avilla-0987",
      },
      {
        label: "Instagram",
        url: "https://www.instagram.com/prof_daniel_avilla/",
      },
    ],
    tags: ["Mobile", "Forense", "Forense mobile"],
    authorizedImage: false,
  },
  {
    name: "Romullo Carvalho",
    type: "Pessoa",
    area: "OSINT, perícia digital e provas digitais",
    description:
      "Referência de estudo em OSINT, computação forense, inteligência de ameaças, prova digital e produção de conteúdo técnico na área de perícia digital.",
    reason:
      "Incluído pela produção técnica, atuação educacional e contribuição para o estudo de OSINT, provas digitais e computação forense.",
    links: [
      {
        label: "Site oficial",
        url: "https://www.romullocarvalho.com.br/",
      },
      {
        label: "LinkedIn",
        url: "https://br.linkedin.com/in/romullo-carvalho",
      },
    ],
    tags: ["OSINT", "Provas digitais", "Forense"],
    authorizedImage: false,
  },
  {
    name: "Marcos Pitanga",
    type: "Pessoa",
    area: "Computação forense e segurança da informação",
    description:
      "Referência de estudo em computação forense, investigação digital, crimes cibernéticos e segurança da informação.",
    reason:
      "Incluído pela trajetória técnica e educacional relacionada à perícia digital, investigação de crimes cibernéticos e segurança da informação.",
    links: [
      {
        label: "LinkedIn",
        url: "https://br.linkedin.com/in/mpitanga",
      },
      {
        label: "MP Forense",
        url: "https://mpforense.com.br/",
      },
      {
        label: "Instagram",
        url: "https://www.instagram.com/pitanga.marcos/",
      },
    ],
    tags: ["Forense", "Crimes cibernéticos", "Segurança"],
    authorizedImage: false,
  },
  {
    name: "Marcos Monteiro",
    type: "Pessoa",
    area: "Perícia digital, evidências digitais e assistência técnica",
    description:
      "Referência de estudo em computação forense, evidências digitais, prova pericial, assistência técnica e formação profissional na área forense.",
    reason:
      "Incluído pela contribuição à formação técnica em computação forense, perícia digital, prova pericial e evidências digitais.",
    links: [
      {
        label: "Site oficial",
        url: "https://marcosmonteiro.com.br/",
      },
      {
        label: "LinkedIn",
        url: "https://br.linkedin.com/in/marcosjmonteiro",
      },
    ],
    tags: ["Evidências digitais", "Assistência técnica", "Forense"],
    authorizedImage: false,
  },
  {
    name: "Emerson Carlos Gadelha dos Santos",
    type: "Pessoa",
    area: "Computação forense, perícia digital e segurança da informação",
    description:
      "Referência de estudo em computação forense, perícia digital, tecnologia, segurança da informação e análise de evidências digitais.",
    reason:
      "Incluído pela atuação técnica relacionada à computação forense, perícia digital e formação profissional na área.",
    links: [
      {
        label: "Site oficial",
        url: "https://carlosgadelha.com.br/",
      },
      {
        label: "Escavador",
        url: "https://carlosgadelha.escavador.com/",
      },
      {
        label: "Cadastro Nacional de Peritos",
        url: "https://app.manualdepericias.com.br/cadastro-nacional-de-peritos/145132,,perito-emerson-carlos-gadelha-dos-santos.html",
      },
    ],
    tags: ["Perícia digital", "Segurança", "Computação forense"],
    authorizedImage: false,
  },
  {
    name: "Cristiano Ritta",
    type: "Pessoa",
    area: "Investigação criminal, inteligência e tecnologia",
    description:
      "Referência de estudo ligada à investigação criminal, inteligência, docência, palestras e desenvolvimento de soluções aplicadas à atividade investigativa.",
    reason:
      "Incluído pela atuação na interface entre investigação, tecnologia, inteligência e ferramentas aplicadas à rotina policial.",
    links: [
      {
        label: "Site oficial",
        url: "https://www.cristianoritta.com.br/",
      },
    ],
    tags: ["Investigação", "Inteligência", "Tecnologia"],
    authorizedImage: false,
  },
  {
    name: "Artigo autoral — Avilla Forensics em dispositivos Xiaomi/MIUI",
    type: "Artigo",
    area: "Forense mobile, Android e métodos de instalação",
    description:
      "Artigo técnico de autoria de Marco Aurélio Pereira Barbosa, publicado na APECOF, sobre a ferramenta Avilla Forensics e métodos alternativos de instalação de aplicativos em dispositivos Xiaomi com MIUI.",
    reason:
      "Incluído como produção técnica autoral vinculada ao estudo de ferramentas brasileiras, perícia digital móvel e procedimentos de apoio à análise de dispositivos Android.",
    links: [
      {
        label: "Ler artigo",
        url: "https://www.apecof.org.br/index.php/artigos/27-ferramenta-avilla-forensics-explorando-metodos-alternativos-de-instalacao-de-aplicativos-em-dispositivos-xiaomi-com-miui",
      },
    ],
    tags: ["Artigo autoral", "Marco Barbosa", "Xiaomi", "MIUI"],
    authorizedImage: false,
    featured: true,
  },
  {
    name: "Avilla Forensics",
    type: "Ferramenta",
    area: "Forense mobile e análise de smartphones",
    description:
      "Ferramenta gratuita voltada ao apoio técnico em perícia digital móvel, análise de smartphones Android e procedimentos relacionados à extração e instalação controlada de aplicativos.",
    reason:
      "Incluída como ferramenta de interesse técnico para estudo, acompanhamento e aplicação prática no campo da perícia digital móvel.",
    links: [
      {
        label: "Academia de Forense Digital",
        url: "https://academiadeforensedigital.com.br/avilla-forensics-ferramenta-gratuita-de-analise-de-smartphones/",
      },
      {
        label: "GitHub",
        url: "https://github.com/AvillaDaniel/AvillaForensics",
      },
      {
        label: "Artigo APECOF",
        url: "https://www.apecof.org.br/index.php/artigos/27-ferramenta-avilla-forensics-explorando-metodos-alternativos-de-instalacao-de-aplicativos-em-dispositivos-xiaomi-com-miui",
      },
    ],
    tags: ["Ferramenta", "Mobile", "Android", "GitHub"],
    authorizedImage: false,
  },
  {
    name: "APECOF",
    type: "Instituição",
    area: "Computação forense e direito eletrônico",
    description:
      "Associação relacionada à computação forense, perícia digital, direito eletrônico, produção técnica, artigos e fortalecimento profissional da área.",
    reason:
      "Incluída como instituição de referência para acompanhamento técnico, artigos, cursos, documentos e temas ligados à computação forense.",
    links: [
      {
        label: "Site oficial",
        url: "https://www.apecof.org.br/",
      },
    ],
    tags: ["Instituição", "Forense", "Artigos"],
    authorizedImage: false,
  },
  {
    name: "DataVirtus",
    type: "Curso",
    area: "IA, análise de dados e investigação financeira",
    description:
      "Plataforma educacional com cursos e pós-graduações voltados à inteligência artificial, análise de dados, investigação financeira e ferramentas aplicadas à atividade investigativa.",
    reason:
      "Incluída pela atuação em formação técnica voltada a agentes da lei, análise de dados, IA, investigação financeira e tecnologias aplicadas.",
    links: [
      {
        label: "Site oficial",
        url: "https://datavirtus.com.br/",
      },
    ],
    tags: ["Cursos", "IA", "Dados"],
    authorizedImage: false,
  },
];
