import { programs } from "@/data/programs";
import type { CatalogCategory, CatalogProgram } from "@/lib/programCatalog";

type CatalogEditorial = { category: CatalogCategory; summary: string; details: string; platform?: string; stage?: string; versionIsStage?: boolean; manualAnchor?: string };

// Somente apresentação: identidade, versões e destinos vêm da fonte compartilhada.
const editorial: Record<string, CatalogEditorial> = {
  "dama-termos": {
    category: "documentos",
    summary: "Preencha o Termo de Adesão ao Programa MS Acolhe e Protege, confira até cinco plantões e gere PDF.",
    details: "Preenchimento com pré-visualização e assinatura visual opcional. A assinatura visual não constitui assinatura digital certificada. A captura foi produzida em uma versão de desenvolvimento, com os valores de preenchimento ocultados; não comprova testes dos instaladores.",
    platform: "Windows", manualAnchor: "#como-usar",
  },
  "dama-gerador-fcc": {
    category: "documentos",
    summary: "Gere Formulários de Cadeia de Custódia a partir de B.O. em PDF ou preenchimento manual.",
    details: "Organização de lacres, objetos e vestígios, conferência visual e geração de documentos DOCX padronizados. A conferência final das informações permanece sob responsabilidade do usuário.",
    platform: "Windows",
  },
  "dama-gerador-fcc-universal": {
    category: "documentos",
    summary: "Evolução do Gerador FCC, com biblioteca de modelos, cabeçalhos e documentos personalizados.",
    details: "Biblioteca de modelos de FCC, prévia visual e importação de modelos DOCX personalizados. Projeto em testes finais, sem download público nem data de lançamento informada neste catálogo.",
    platform: "Windows",
  },
  "dama-gestor-rh": {
    category: "gestao",
    summary: "Organize trabalhadores, contratos, alocações, afastamentos, substituições e acompanhamento operacional.",
    details: "Solução com base funcional existente. Implantação e adequações são definidas conforme a estrutura, os vínculos, os contratos, os perfis de acesso e as necessidades de cada organização.",
    versionIsStage: true, stage: "Base funcional",
  },
  "dama-gestor-de-inqueritos": {
    category: "gestao",
    summary: "Acompanhe inquéritos, prazos, documentos, objetos, relatórios e dados correcionais em ambiente local e offline.",
    details: "Organização cartorária com controle de prazos e dilações, documentos e juntadas, objetos e movimentações. Inclui importação de PDFs e planilhas, relatórios e backups locais, conforme a página do programa.",
    platform: "Windows",
  },
  sdo: {
    category: "gestao",
    summary: "Controle operacional de plantão, distribuição de ocorrências, pendências, relatórios e backup local.",
    details: "Sistema desktop local e offline para organizar equipes, distribuição de ocorrências e acompanhamento do plantão. Está em ajustes finais, sem download público disponível neste catálogo.",
    platform: "Windows",
  },
  "dama-inteligencia-investigativa": {
    category: "gestao",
    summary: "Projeto conceitual de apoio à organização, correlação e análise de informações investigativas.",
    details: "Apresentação pública em nível institucional. A arquitetura permanece reservada nesta fase, sem download público ou previsão de disponibilização informada neste catálogo.",
    versionIsStage: true, stage: "Conceitual · arquitetura reservada",
  },
  "dama-cleaner-sigo-desktop": {
    category: "sigo",
    summary: "Limpeza orientada de cache, arquivos temporários, logs e dados de sessão do ambiente local do SIGO Desktop.",
    details: "Finalize completamente a sessão do SIGO Desktop antes da limpeza. O utilitário não força o encerramento do SIGO, preserva arquivos de configuração sensíveis e registra log local para conferência técnica.",
    platform: "Windows",
  },
  "dama-biometria-sigo-fix": {
    category: "sigo",
    summary: "Apoio à correção de falhas locais de biometria, Java, bibliotecas Nitgen e componentes do SIGO Desktop.",
    details: "Ferramenta independente com correção automática, opções avançadas, painel de log e orientação de abertura do SIGO com Java compatível. Consulte os requisitos e as limitações documentados na página do programa antes de usar.",
    platform: "Windows",
  },
  "dama-token-sigo-fix": {
    category: "sigo",
    summary: "Apoio à preparação do ambiente local para assinatura por token, com verificação de Java, drivers e componentes de assinatura.",
    details: "Não salva PIN, não copia certificados, não exporta chaves privadas, não assina documentos por conta própria e não altera o token. Atua no ambiente local, conforme os requisitos descritos na página do programa.",
    platform: "Windows",
  },
};

export const catalogPrograms: CatalogProgram[] = programs.map((program) => {
  const item = editorial[program.slug];
  if (!item) throw new Error(`Programa sem classificação no catálogo: ${program.slug}`);
  return {
    slug: program.slug, name: program.name, category: item.category,
    summary: item.summary, details: item.details,
    version: item.versionIsStage ? undefined : program.version,
    stage: item.stage ?? (program.status === "Disponível" ? undefined : program.status),
    access: program.downloadUrl ? "Download público" : program.status === "Projeto sob consulta" ? "Sob consulta" : "Sem download público",
    platform: item.platform, iconUrl: program.iconUrl, pageUrl: program.detailsUrl,
    downloadUrl: program.downloadUrl, downloadLabel: program.downloadLabel,
    alternativeDownload: program.alternativeDownload,
    manualUrl: program.manualUrl ?? (item.manualAnchor ? `${program.detailsUrl}${item.manualAnchor}` : undefined),
    changelogUrl: program.changelogUrl, compatibility: program.compatibility, previewImage: program.previewImage,
  };
});
