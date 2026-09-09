import { getCollection } from 'astro:content';
import { site } from '../data/site';

export const prerender = true;

const staticRoutes = [
  '/',
  '/blog/',
  '/example-page/',
];

const escapeXml = (value: string) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');

export async function GET() {
  const [posts, pathologies, services] = await Promise.all([
    getCollection('blog', ({ data }) => !data.draft),
    getCollection('patologias', ({ data }) => !data.draft),
    getCollection('servicios', ({ data }) => !data.draft),
  ]);

  const collectionRoutes = [
    ...posts.map(({ data }) => `/blog/${data.slug}/`),
    ...pathologies.map(({ data }) => `/patologias/${data.slug}/`),
    ...services.map(({ data }) => `/servicios/${data.slug}/`),
  ];

  const routes = [...new Set([...staticRoutes, ...collectionRoutes])];
  const urls = routes
    .map((route) => `  <url><loc>${escapeXml(new URL(route, site.url).toString())}</loc></url>`)
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
      },
    }
  );
}
