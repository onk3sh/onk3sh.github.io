// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://onk3sh.github.io',
  trailingSlash: 'always',
  integrations: [sitemap()]
});