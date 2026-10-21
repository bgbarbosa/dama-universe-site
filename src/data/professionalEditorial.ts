import { contacts } from "@/data/contacts";

const professionalUrl = (path: string) => new URL(path, contacts.professionalSite).toString();

export const professionalEditorial = {
  home: contacts.professionalSite,
  training: professionalUrl("/#capacitacoes"),
  trajectory: professionalUrl("/#sobre"),
  card: professionalUrl("/cartao"),
  visualFormation: professionalUrl("/formacao/deteccao-imagens-ia"),
  practice: professionalUrl("/pericia-na-pratica"),
  articles: [
    { title: "Mensagens de WhatsApp em disputa", href: professionalUrl("/pericia-na-pratica/mensagens-whatsapp-alem-do-print") },
    { title: "Contratação eletrônica contestada", href: professionalUrl("/pericia-na-pratica/contratacao-eletronica-contestada-analise-tecnica") },
    { title: "Horários de câmeras e cronologia dos fatos", href: professionalUrl("/pericia-na-pratica/horario-cameras-cftv-cronologia-fatos") },
    { title: "NF-e e DANFE na análise de divergências", href: professionalUrl("/pericia-na-pratica/nfe-danfe-analise-tecnica-divergencias") },
  ],
} as const;
