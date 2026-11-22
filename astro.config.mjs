// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // URL canónica del despliegue. PENDIENTE: cambiarla por el dominio propio
  // cuando esté configurado (tarjeta «Montar deploy automático...»).
  site: 'https://kasuiro-sas.kasuiro-sas.workers.dev',
  integrations: [
    sitemap({
      // La página de agradecimiento es noindex: no debe entrar en el sitemap.
      filter: (page) => !page.endsWith('/auditoria-express/gracias/'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
