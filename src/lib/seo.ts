export type OpenGraphType = 'website' | 'article';

export interface SeoInput {
  title: string;
  description: string;
  pathname?: string;
  siteUrl?: URL;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: OpenGraphType;
  robots?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export interface ResolvedSeo {
  title: string;
  description: string;
  canonical?: string;
  ogTitle: string;
  ogDescription: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType: OpenGraphType;
  robots: string;
}

const requireText = (value: string, field: string) => {
  const normalized = value.trim();
  if (!normalized) throw new Error(`SEO ${field} cannot be empty.`);
  return normalized;
};

const resolveHttpUrl = (value: string | undefined, siteUrl?: URL) => {
  if (!value?.trim()) return undefined;

  if (!siteUrl && !/^https?:\/\//i.test(value)) {
    return undefined;
  }

  try {
    const resolved = new URL(value, siteUrl);
    if (!['http:', 'https:'].includes(resolved.protocol)) {
      throw new Error('Only HTTP(S) URLs are supported.');
    }
    return resolved.href;
  } catch (error) {
    throw new Error(`Invalid SEO URL: ${value}`, { cause: error });
  }
};

const resolveRobots = (robots?: string, noindex = false, nofollow = false) => {
  const directives = new Set(
    (robots ?? 'index, follow')
      .split(',')
      .map((directive) => directive.trim().toLowerCase())
      .filter(Boolean),
  );

  if (noindex) {
    directives.delete('index');
    directives.add('noindex');
  }

  if (nofollow) {
    directives.delete('follow');
    directives.add('nofollow');
  }

  return [...directives].join(', ');
};

export const buildSeo = (input: SeoInput): ResolvedSeo => {
  const title = requireText(input.title, 'title');
  const description = requireText(input.description, 'description');
  const ogImage = resolveHttpUrl(input.ogImage, input.siteUrl);
  const ogImageAlt = input.ogImageAlt?.trim();

  if (ogImage && !ogImageAlt) {
    throw new Error('SEO Open Graph image requires non-empty alternative text.');
  }

  return {
    title,
    description,
    canonical: input.siteUrl
      ? resolveHttpUrl(input.canonical ?? input.pathname ?? '/', input.siteUrl)
      : undefined,
    ogTitle: requireText(input.ogTitle ?? title, 'Open Graph title'),
    ogDescription: requireText(input.ogDescription ?? description, 'Open Graph description'),
    ogImage,
    ogImageAlt: ogImage ? ogImageAlt : undefined,
    ogType: input.ogType ?? 'website',
    robots: resolveRobots(input.robots, input.noindex, input.nofollow),
  };
};
