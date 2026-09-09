export interface NavigationItem {
  label: string;
  href: string;
  children?: readonly NavigationItem[];
}

export interface NavigationAction {
  label: string;
  href: string;
}

export interface FooterNavigationGroup {
  label: string;
  items: readonly NavigationItem[];
}

// Development-only navigation for the CORE showcase. Replace it per project.
export const primaryNavigation = [
  { label: 'Inicio', href: '/' },
  {
    label: 'Catálogo',
    href: '/#catalogo',
    children: [
      { label: 'Features', href: '/#features' },
      { label: 'Evidencia', href: '/#evidencia' },
      { label: 'Contenido', href: '/#contenido' },
    ],
  },
  { label: 'Contacto', href: '/#contacto' },
] as const satisfies readonly NavigationItem[];

export const navigationAction = {
  label: 'Revisar FAQ',
  href: '/#faq',
} as const satisfies NavigationAction;

export const footerNavigation = [
  {
    label: 'Demostración',
    items: primaryNavigation,
  },
] as const satisfies readonly FooterNavigationGroup[];

export const legalNavigation = [] as const satisfies readonly NavigationItem[];
