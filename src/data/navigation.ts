export type NavigationItem = {
  href: string;
  label: string;
};

export const primaryNavigation: NavigationItem[] = [
  { href: "/", label: "Início" },
  { href: "/programas", label: "Programas" },
  { href: "/gpts", label: "GPTs" },
  { href: "/blog", label: "Blog" },
  { href: "/referencias", label: "Referências" },
  { href: "/apoie", label: "Apoie" },
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
  ...primaryNavigation.map((item) =>
    item.href === "/gpts" ? { ...item, label: "GPTs Personalizados" } : item
  ),
  ...legalNavigation,
];
