export type NavigationItem = {
  href: string;
  label: string;
};

export const primaryNavigation: NavigationItem[] = [
  { href: "/", label: "Início" },
  { href: "/programas", label: "Programas" },
  { href: "/gpts", label: "IA aplicada" },
  { href: "/blog", label: "Conteúdos" },
  { href: "/referencias", label: "Referências" },
  { href: "/apoie", label: "Participe" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export const legalNavigation: NavigationItem[] = [
  { href: "/termos-de-uso", label: "Termos de Uso" },
  { href: "/politica-de-privacidade", label: "Política de Privacidade" },
  { href: "/politica-de-cookies", label: "Política de Cookies" },
  { href: "/politica-de-comentarios", label: "Política de Comentários" },
];

export const footerNavigation: NavigationItem[] = [
  ...primaryNavigation,
  ...legalNavigation,
];
