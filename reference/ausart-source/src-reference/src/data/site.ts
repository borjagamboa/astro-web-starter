const logoCompleto = '/images/brand/logo-completo.svg';
const logoHorizontal = '/images/brand/logo-horizontal.svg';
const logoVertical = '/images/brand/logo-vertical.svg';
const logoMark = '/images/brand/logo-mark.svg';
const socialImage = '/images/brand/og-default.jpg';

export const site = {
  brandName: '[PROJECT_NAME]',
  shortName: '[PROJECT_SHORT_NAME]',
  tagline: '[PROJECT_TAGLINE]',
  description: '[PROJECT_DESCRIPTION]',
  location: '[SERVICE_AREA]',
  mainCTA: '[PRIMARY_ACTION_LABEL]',
  contactEmail: '[EMAIL]',
  contactPhone: '[PHONE]',
  logo: logoCompleto,
  logoHorizontal,
  logoVertical,
  logoMark,
  favicon: logoMark,
  socialImage,
  brandAlt: '[PROJECT_NAME]',
  logos: {
    default: logoCompleto,
    complete: logoCompleto,
    horizontal: logoHorizontal,
    vertical: logoVertical,
    mark: logoMark,
  },
  socialLinks: {
    instagram: 'https://www.instagram.com/example/',
    googleBusiness: undefined,
  },
  legalNotice: '[LEGAL_NOTICE]',
  url: 'https://example.com',
  defaultTitle: '[PROJECT_NAME]',
  defaultDescription: '[DEFAULT_META_DESCRIPTION]',
  name: '[PROJECT_NAME]',
  shortDescription: '[PROJECT_SHORT_DESCRIPTION]',
  area: '[SERVICE_AREA]',
  primaryCta: '[PRIMARY_ACTION_LABEL]',
};

export const legacySiteAliases = {
  name: site.brandName,
  shortDescription: site.description,
  area: site.location,
  primaryCta: site.mainCTA,
};
