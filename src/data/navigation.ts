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

export interface HeaderNavigationConfig {
  items?: readonly NavigationItem[];
  action?: NavigationAction | null;
  navigationLabel?: string;
  menuLabel?: string;
}

export interface FooterNavigationConfig {
  groups?: readonly FooterNavigationGroup[];
  legalLinks?: readonly NavigationItem[];
  showDescription?: boolean;
}

// Development-only navigation for the visual showcase. Replace it per project.
export const primaryNavigation = [
  { label: 'Inicio', href: '/' },
  {
    label: 'Composición',
    href: '/#heroes',
    children: [
      { label: 'Heroes', href: '/#heroes' },
      { label: 'ContentSplit', href: '/#split' },
      { label: 'Cards', href: '/#cards' },
      { label: 'Grid', href: '/#grid' },
    ],
  },
  { label: 'CTA', href: '/#cta' },
] as const satisfies readonly NavigationItem[];

export const navigationAction = {
  label: 'Ver showcase',
  href: '/#heroes',
} as const satisfies NavigationAction;

export const footerNavigation = [
  {
    label: 'Demostración',
    items: primaryNavigation,
  },
] as const satisfies readonly FooterNavigationGroup[];

export const legalNavigation = [] as const satisfies readonly NavigationItem[];
