export type SocialStatus = "Ativo" | "Previsto" | "Temporário" | "Indisponível";

export type SocialLink = {
  name: string;
  url: string | null;
  icon?: string;
  status: SocialStatus;
};

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: null,
    icon: "github",
    status: "Previsto",
  },
  {
    name: "Instagram",
    url: null,
    icon: "instagram",
    status: "Previsto",
  },
  {
    name: "YouTube",
    url: null,
    icon: "youtube",
    status: "Previsto",
  },
  {
    name: "LinkedIn",
    url: null,
    icon: "linkedin",
    status: "Previsto",
  },
  {
    name: "E-mail",
    url: null,
    icon: "mail",
    status: "Temporário",
  },
];
