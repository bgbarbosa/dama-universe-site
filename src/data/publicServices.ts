export type PublicService = {
  slug: string;
  name: string;
  fullName: string;
  responsible: string;
  detailsUrl: `/utilidade-publica/${string}`;
  summary: string;
  introduction: string;
  audience: readonly string[];
  services: readonly string[];
  mobileUnit: string;
  phone: string;
  phoneUrl: `tel:${string}`;
  whatsappUrl: `https://wa.me/${string}`;
  email: string;
  address: string;
  sourceUrl: string;
  verifiedAt: string;
  image: { src: string; alt: string; width: number; height: number; caption: string };
};

export const publicUtilityIntroduction = "Informações e canais oficiais de serviços de interesse público, reunidos para facilitar sua consulta.";

export const publicUtilityDisclaimer = "Divulgação independente de utilidade pública. O atendimento é realizado pelo CABS/Sejusp-MS. A Dama Universe não realiza agendamentos nem representa a instituição.";

export const cabs: PublicService = {
  slug: "cabs",
  name: "CABS",
  fullName: "Centro de Atenção Biopsicossocial",
  responsible: "Sejusp/MS",
  detailsUrl: "/utilidade-publica/cabs",
  summary: "Cuidado e apoio biopsicossocial aos servidores da segurança pública de Mato Grosso do Sul.",
  introduction: "O CABS é uma unidade da Sejusp/MS dedicada à saúde mental, ao bem-estar e ao apoio biopsicossocial dos servidores da segurança pública de Mato Grosso do Sul. Esta página apresenta uma síntese das informações publicadas pela Sejusp/MS e indica os canais oficiais para contato direto com o CABS.",
  audience: [
    "Policiais civis, militares e penais.",
    "Bombeiros militares.",
    "Servidores da Polícia Científica: peritos criminais, médicos legistas e agentes.",
    "Agentes socioeducadores.",
  ],
  services: [
    "Acolhimento psicológico em encontros individuais e em grupo.",
    "Orientação social e apoio psicossocial.",
    "Atendimento médico especializado.",
    "Atividades educativas sobre saúde mental, bem-estar e qualidade de vida.",
  ],
  mobileUnit: "A Carreta da Saúde leva ações itinerantes aos servidores que atuam no interior do estado. A fonte oficial descreve consultas médicas e psicológicas, exames oftalmológicos e audiométricos, além do fornecimento de óculos e aparelhos auditivos nas ações realizadas. As condições, a programação e a disponibilidade devem ser consultadas com o CABS; não há garantia de atendimento imediato ou entrega de equipamentos.",
  phone: "(67) 99947-0022",
  phoneUrl: "tel:+5567999470022",
  whatsappUrl: "https://wa.me/5567999470022",
  email: "cabs@sejusp.ms.gov.br",
  address: "Rua Uberlândia, 409, Itanhangá Park, Campo Grande/MS, CEP 79004-500.",
  sourceUrl: "https://www.sejusp.ms.gov.br/programas-e-projetos/centro-de-atencao-biopsicossocial/",
  verifiedAt: "2026-10-21",
  image: {
    src: "/images/public-utility/cabs-editorial.webp",
    alt: "Identificação do Centro de Atenção Biopsicossocial da Sejusp, CABS.",
    width: 1536,
    height: 1024,
    caption: "Composição editorial derivada de fotografia de um banner, com tratamento por IA. Não é um arquivo oficial do logotipo.",
  },
};

export const publicServices: readonly PublicService[] = [cabs];
