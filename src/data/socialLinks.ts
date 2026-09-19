import { contacts, mailto } from "./contacts";

export type SocialStatus = "Ativo" | "Previsto" | "Temporário" | "Indisponível";

export type SocialLink = {
  name: string;
  url: string | null;
  icon?: string;
  status: SocialStatus;
};

export const socialLinks: SocialLink[] = [
  { name: contacts.general, url: mailto(contacts.general), icon: "mail", status: "Ativo" },
  { name: `WhatsApp: ${contacts.whatsappLabel}`, url: contacts.whatsapp, status: "Ativo" },
  { name: "LinkedIn de Marco Barbosa", url: contacts.linkedin, status: "Ativo" },
  { name: "Site profissional de Marco Barbosa", url: contacts.professionalSite, status: "Ativo" },
];
