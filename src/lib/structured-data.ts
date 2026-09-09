export type StructuredData = Record<string, unknown>;

export interface BreadcrumbSchemaItem {
  label: string;
  href?: string;
}

interface ArticleSchemaInput {
  headline: string;
  description: string;
  url: string;
  language: string;
  publishDate: Date;
  updatedDate?: Date;
  image?: string;
}

const requireValue = (value: string, field: string) => {
  const normalized = value.trim();
  if (!normalized) throw new Error(`Structured data ${field} cannot be empty.`);
  return normalized;
};

const absoluteUrl = (value: string, siteUrl: URL) => new URL(value, siteUrl).href;

export const buildWebsiteSchema = (name: string, url: URL, language: string): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: requireValue(name, 'website name'),
  url: url.href,
  inLanguage: requireValue(language, 'language'),
});

export const buildOrganizationSchema = (
  name: string,
  url: URL,
  logo?: string,
): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: requireValue(name, 'organization name'),
  url: url.href,
  ...(logo ? { logo: absoluteUrl(logo, url) } : {}),
});

export const buildBreadcrumbSchema = (
  items: readonly BreadcrumbSchemaItem[],
  siteUrl: URL,
  currentPath: string,
): StructuredData | undefined => {
  if (items.length < 2) return undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: requireValue(item.label, `breadcrumb label ${index + 1}`),
      item: absoluteUrl(item.href ?? currentPath, siteUrl),
    })),
  };
};

export const buildArticleSchema = (input: ArticleSchemaInput): StructuredData => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: requireValue(input.headline, 'article headline'),
  description: requireValue(input.description, 'article description'),
  mainEntityOfPage: input.url,
  url: input.url,
  inLanguage: requireValue(input.language, 'article language'),
  datePublished: input.publishDate.toISOString(),
  ...(input.updatedDate ? { dateModified: input.updatedDate.toISOString() } : {}),
  ...(input.image ? { image: input.image } : {}),
});
