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
    label: 'Componentes',
    href: '#componentes',
    children: [
      { label: 'Botones', href: '#botones' },
      { label: 'Imagen', href: '#imagen' },
    ],
  },
  { label: 'Sistema visual', href: '#sistema-visual' },
] as const satisfies readonly NavigationItem[];

export const navigationAction = {
  label: 'Revisar el CORE',
  href: '#componentes',
} as const satisfies NavigationAction;

export const footerNavigation = [
  {
    label: 'Demostración',
    items: primaryNavigation,
  },
] as const satisfies readonly FooterNavigationGroup[];

export const legalNavigation = [] as const satisfies readonly NavigationItem[];
