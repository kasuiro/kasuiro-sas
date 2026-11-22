// Seis paradas para el fondo scrolleable de la portada.
// Todos los textos proceden de src/pages/index.astro y de src/content/servicios/*.md; no se inventa nada.
// Los clips son prototipos con la paleta verificada (tinta #14213d, magenta #c2298a, violeta #6b3fa0),
// no arte oficial de marca.

export type Stop = {
  id: string;
  place: string;
  eyebrow: string;
  title: string;
  /** Solo para el hero: permite cortar el titular en un punto con sentido. */
  titleLines?: string[];
  text: string;
  /** Señal de prueba colocada junto a la CTA principal, arriba del todo. */
  proof?: string;
  clip: string;
  poster: string;
  cta: { text: string; href: string; outline?: boolean };
};

export const stops: Stop[] = [
  {
    id: 'inicio',
    place: 'Inicio',
    eyebrow: 'Kasuiro SAS',
    title: 'Tu Departamento de Tecnología Externalizado',
    titleLines: ['Tu Departamento de Tecnología', 'Externalizado'],
    text:
      'Ayudamos a pymes a digitalizar sus procesos sin contratar un equipo de TI completo. Auditoría, implementación y soporte continuo, con herramientas open source y soberanía de datos.',
    proof: 'Desde $400.000 COP · Pago 100 % anticipado · Sin garantía por ser un diagnóstico.',
    clip: '/video/kasuiro-loop-1.mp4',
    poster: '/video/posters/kasuiro-1.webp',
    cta: { text: 'Solicitar Auditoría Express', href: '/auditoria-express' },
  },
  {
    id: 'auditoria',
    place: 'Auditoría',
    eyebrow: 'Auditoría Express',
    title: 'Un diagnóstico de 3 días hábiles',
    text:
      'Identificamos dónde está el desorden operativo y te entregamos un plan concreto para el siguiente paso. Es el punto de entrada a la Ruta de Madurez Digital. Desde $400.000 COP · Pago 100 % anticipado · Sin garantía por ser un diagnóstico.',
    clip: '/video/kasuiro-loop-2.mp4',
    poster: '/video/posters/kasuiro-2.webp',
    cta: { text: 'Solicitar Auditoría Express', href: '/auditoria-express', outline: true },
  },
  {
    id: 'fase-1',
    place: 'Fase 1',
    eyebrow: 'Ruta de Madurez Digital',
    title: 'Fase 1 · Centralización Operativa y Comunicación',
    text: 'Ordenamos tu comunicación interna y gestión de proyectos en un solo lugar.',
    clip: '/video/kasuiro-loop-3.mp4',
    poster: '/video/posters/kasuiro-3.webp',
    cta: {
      text: 'Ver detalle',
      href: '/servicios/fase-1-centralizacion-operativa-y-comunicacion',
      outline: true,
    },
  },
  {
    id: 'fase-2',
    place: 'Fase 2',
    eyebrow: 'Ruta de Madurez Digital',
    title: 'Fase 2 · Automatización Comercial e Inteligencia de Clientes',
    text: 'Implementamos un CRM para centralizar tus clientes, oportunidades y ventas.',
    clip: '/video/kasuiro-loop-4.mp4',
    poster: '/video/posters/kasuiro-4.webp',
    cta: {
      text: 'Ver detalle',
      href: '/servicios/fase-2-automatizacion-comercial-e-inteligencia-de-clientes',
      outline: true,
    },
  },
  {
    id: 'fase-3',
    place: 'Fase 3',
    eyebrow: 'Ruta de Madurez Digital',
    title: 'Fase 3 · Conectividad Industrial e Inteligencia de Datos',
    text: 'Conectamos tus dispositivos y datos para tomar decisiones en tiempo real.',
    clip: '/video/kasuiro-loop-5.mp4',
    poster: '/video/posters/kasuiro-5.webp',
    cta: {
      text: 'Ver detalle',
      href: '/servicios/fase-3-conectividad-industrial-e-inteligencia-de-datos',
      outline: true,
    },
  },
  {
    id: 'cierre',
    place: 'Cierre',
    eyebrow: 'Cómo trabajamos',
    title: 'Un solo socio para estrategia, tecnología y operación',
    text: 'Un solo socio para estrategia, tecnología y operación, con soberanía de datos.',
    clip: '/video/kasuiro-loop-6.mp4',
    poster: '/video/posters/kasuiro-6.webp',
    cta: { text: 'Ver Ruta de Madurez Digital', href: '/servicios/ruta-de-madurez-digital' },
  },
];
