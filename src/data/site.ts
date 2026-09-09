export interface SiteContact {
  email?: string;
  phone?: string;
}

export interface SocialLink {
  label: string;
  href: string;
}

export interface PrimaryAction {
  label: string;
  href: string;
}

export interface BrandAssets {
  logo?: string;
  logoAlt?: string;
  favicon?: string;
}

export interface SiteConfig {
  name: string;
  shortName?: string;
  description: string;
  language: string;
  locale: string;
  baseUrl?: string;
  contact?: SiteContact;
  socialLinks: readonly SocialLink[];
  location?: string;
  primaryAction?: PrimaryAction;
  brand: BrandAssets;
}

export const site = {
  name: 'Astro Web Starter',
  description: 'Base de desarrollo. Sustituye la configuración del proyecto antes de publicar.',
  language: 'es',
  locale: 'es-ES',
  baseUrl: undefined,
  contact: undefined,
  socialLinks: [],
  location: undefined,
  primaryAction: undefined,
  brand: {},
} satisfies SiteConfig;
