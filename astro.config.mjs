// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // URL canónica del despliegue. PENDIENTE: cambiarla por el dominio propio
  // cuando esté configurado (tarjeta «Montar deploy automático...»).
  site: 'https://kasuiro-sas.kasuirogroup.workers.dev',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
