// Canais confirmados para atendimento. Aliases não representam equipes distintas.
export const contacts = {
  general: "contato@damauniverse.com.br",
  support: "suporte@damauniverse.com.br",
  commercial: "comercial@damauniverse.com.br",
  courses: "cursos@damauniverse.com.br",
  creator: "marcobarbosa@damauniverse.com.br",
  professional: "pericia@damauniverse.com.br",
  whatsapp: "https://wa.me/5567992368049",
  whatsappLabel: "(67) 99236-8049",
  linkedin: "https://www.linkedin.com/in/marco-aur%C3%A9lio-barbosa-79850926a/",
  professionalSite: "https://pericia-digital-marco-site.vercel.app/",
} as const;

export function mailto(address: string, subject?: string) {
  return `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}
