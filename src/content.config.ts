import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Convención del proyecto (Manual de Marca, §6): campos y código en inglés,
// contenido y URLs visibles en español.
// Correspondencia con la tarjeta «Definir el esquema de frontmatter»:
//   título -> title | resumen -> summary | orden_ruta_madurez -> maturityOrder
//   herramientas relacionadas -> tools
const base = {
  title: z.string(),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  summary: z.string(),
  order: z.number().int().default(0),
  tools: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
};

const servicios = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/servicios' }),
  schema: z.object({
    ...base,
    // 0 = servicio transversal; 1..3 = fase de la Ruta de Madurez Digital.
    maturityOrder: z.number().int().min(0).max(3).default(0),
  }),
});

const casosExito = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/casos-exito' }),
  schema: z.object({
    ...base,
    // Sin casos verificados todavía: el contenido se marca pendiente en la página.
    cliente: z.string().default('pendiente'),
    resultado: z.string().default('pendiente'),
  }),
});

const recursos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/recursos' }),
  schema: z.object({
    ...base,
    kind: z.enum(['articulo', 'guia', 'nota']).default('articulo'),
    keywords: z.array(z.string()).default([]),
  }),
});

export const collections = { servicios, casosExito, recursos };
