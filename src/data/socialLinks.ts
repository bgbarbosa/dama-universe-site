export type SocialStatus = "Ativo" | "Previsto" | "Temporário" | "Indisponível";

export type SocialLink = {
  name: string;
  url: string;
  icon?: string;
  status: SocialStatus;
};

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "#",
    icon: "github",
    status: "Previsto",
  },
  {
    name: "Instagram",
    url: "#",
    icon: "instagram",
    status: "Previsto",
  },
  {
    name: "YouTube",
    url: "#",
    icon: "youtube",
    status: "Previsto",
  },
  {
    name: "LinkedIn",
    url: "#",
    icon: "linkedin",
    status: "Previsto",
  },
  {
    name: "E-mail",
    url: "#",
    icon: "mail",
    status: "Temporário",
  },
];
