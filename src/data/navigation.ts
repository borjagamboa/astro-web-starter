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
    label: 'Composición',
    href: '#composicion',
    children: [
      { label: 'Texto e imagen', href: '#texto-media' },
      { label: 'Cards', href: '#cards' },
    ],
  },
  { label: 'CTA', href: '#cta' },
] as const satisfies readonly NavigationItem[];

export const navigationAction = {
  label: 'Ver patterns',
  href: '#composicion',
} as const satisfies NavigationAction;

export const footerNavigation = [
  {
    label: 'Demostración',
    items: primaryNavigation,
  },
] as const satisfies readonly FooterNavigationGroup[];

export const legalNavigation = [] as const satisfies readonly NavigationItem[];
