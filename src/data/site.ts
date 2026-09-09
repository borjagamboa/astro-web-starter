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

export interface BrandImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface BrandAssets {
  logo?: BrandImage;
  logoInverse?: BrandImage;
  socialImage?: BrandImage;
  favicon?: string;
}

export interface OrganizationConfig {
  name: string;
  logo?: string;
}

export interface SiteConfig {
  name: string;
  shortName?: string;
  description: string;
  language: string;
  locale: string;
  contact?: SiteContact;
  socialLinks: readonly SocialLink[];
  location?: string;
  primaryAction?: PrimaryAction;
  brand: BrandAssets;
  organization?: OrganizationConfig;
}

export const site: SiteConfig = {
  // Neutral development defaults. Replace these values for every real project.
  name: 'Astro Web Starter',
  shortName: 'Astro Starter',
  description: 'Base de desarrollo. Sustituye la configuración del proyecto antes de publicar.',
  language: 'es',
  locale: 'es-ES',
  contact: undefined,
  socialLinks: [],
  location: undefined,
  primaryAction: undefined,
  brand: {},
  organization: undefined,
} satisfies SiteConfig;
