// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

const site = process.env.SITE_URL?.trim() || undefined;

export default defineConfig({
  site,
  trailingSlash: 'always',
  integrations: site ? [sitemap()] : [],
});
