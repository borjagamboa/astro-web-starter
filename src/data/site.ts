import type { ContactFormFeatureConfig } from '../lib/forms';

export type PublicationMode = 'starter' | 'development' | 'production';

export interface PublicationConfig {
  mode: PublicationMode;
  demoContent: boolean;
}

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
  publication: PublicationConfig;
  name: string;
  shortName?: string;
  homeHref?: string;
  description: string;
  language: string;
  locale: string;
  contact?: SiteContact;
  socialLinks: readonly SocialLink[];
  location?: string;
  primaryAction?: PrimaryAction;
  contactForm?: ContactFormFeatureConfig;
  brand: BrandAssets;
  organization?: OrganizationConfig;
}

export const site: SiteConfig = {
  publication: {
    mode: 'starter',
    demoContent: true,
  },
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
  contactForm: {
    enabled: false,
  },
  brand: {},
  organization: undefined,
} satisfies SiteConfig;
