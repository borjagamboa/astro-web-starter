// Sanitized reference copy. Project-specific redirects were intentionally omitted.
// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://example.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => page !== 'https://example.com/form-success/',
    }),
  ],
  redirects: {},
});
