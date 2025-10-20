// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://edicionaular.com',
  integrations: [
    sitemap({
      // Generar un solo sitemap en /sitemap-0.xml
      customPages: [],
      serialize(item) {
        // Prioridades por tipo de página
        if (item.url.includes('/blog/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        } else if (item.url.endsWith('/')) {
          item.priority = 1.0;
          item.changefreq = 'monthly';
        } else {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        return item;
      }
    })
  ]
});