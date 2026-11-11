import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static site: every page is plain HTML at build time.
export default defineConfig({
  site: 'https://archallenge.org',
  output: 'static',
  trailingSlash: 'always',
  build: {
    // The stylesheets are a few kilobytes, so they ship inside the page and save a request.
    inlineStylesheets: 'always',
  },
  integrations: [sitemap()],
});
