// Seis paradas para el fondo scrolleable de la portada.
// Todos los textos proceden de src/pages/index.astro y de src/content/servicios/*.md; no se inventa nada.
// Los clips son prototipos con la paleta verificada (tinta #14213d, magenta #c2298a, violeta #6b3fa0),
// no arte oficial de marca.

export type Parada = {
  id: string;
  lugar: string;
  eyebrow: string;
  titulo: string;
  texto: string;
  clip: string;
  poster: string;
  cta: { texto: string; href: string; outline?: boolean };
};

export const paradas: Parada[] = [
  {
    id: 'inicio',
    lugar: 'Inicio',
    eyebrow: 'Kasuiro SAS',
    titulo: 'Tu Departamento de Tecnología Externalizado',
    texto:
      'Ayudamos a pymes a digitalizar sus procesos sin contratar un equipo de TI completo. Auditoría, implementación y soporte continuo, con herramientas que ya usan las empresas más ágiles del mundo.',
    clip: '/video/kasuiro-loop-1.mp4',
    poster: '/video/posters/kasuiro-1.webp',
    cta: { texto: 'Solicitar Auditoría Express', href: '/auditoria-express' },
  },
  {
    id: 'auditoria',
    lugar: 'Auditoría',
    eyebrow: 'Auditoría Express',
    titulo: 'Un diagnóstico de 3 días hábiles',
    texto:
      'Identificamos dónde está el desorden operativo y te entregamos un plan concreto para el siguiente paso. Es el punto de entrada a la Ruta de Madurez Digital. Desde $400.000 COP · Pago 100 % anticipado · Sin garantía por ser un diagnóstico.',
    clip: '/video/kasuiro-loop-2.mp4',
    poster: '/video/posters/kasuiro-2.webp',
    cta: { texto: 'Solicitar Auditoría Express', href: '/auditoria-express', outline: true },
  },
  {
    id: 'fase-1',
    lugar: 'Fase 1',
    eyebrow: 'Ruta de Madurez Digital',
    titulo: 'Fase 1 · Centralización Operativa y Comunicación',
    texto: 'Ordenamos tu comunicación interna y gestión de proyectos en un solo lugar.',
    clip: '/video/kasuiro-loop-3.mp4',
    poster: '/video/posters/kasuiro-3.webp',
    cta: {
      texto: 'Ver detalle',
      href: '/servicios/fase-1-centralizacion-operativa-y-comunicacion',
      outline: true,
    },
  },
  {
    id: 'fase-2',
    lugar: 'Fase 2',
    eyebrow: 'Ruta de Madurez Digital',
    titulo: 'Fase 2 · Automatización Comercial e Inteligencia de Clientes',
    texto: 'Implementamos un CRM para centralizar tus clientes, oportunidades y ventas.',
    clip: '/video/kasuiro-loop-4.mp4',
    poster: '/video/posters/kasuiro-4.webp',
    cta: {
      texto: 'Ver detalle',
      href: '/servicios/fase-2-automatizacion-comercial-e-inteligencia-de-clientes',
      outline: true,
    },
  },
  {
    id: 'fase-3',
    lugar: 'Fase 3',
    eyebrow: 'Ruta de Madurez Digital',
    titulo: 'Fase 3 · Conectividad Industrial e Inteligencia de Datos',
    texto: 'Conectamos tus dispositivos y datos para tomar decisiones en tiempo real.',
    clip: '/video/kasuiro-loop-5.mp4',
    poster: '/video/posters/kasuiro-5.webp',
    cta: {
      texto: 'Ver detalle',
      href: '/servicios/fase-3-conectividad-industrial-e-inteligencia-de-datos',
      outline: true,
    },
  },
  {
    id: 'cierre',
    lugar: 'Cierre',
    eyebrow: 'Cómo trabajamos',
    titulo: 'Un solo socio para estrategia, tecnología y operación',
    texto: 'Un solo socio para estrategia, tecnología y operación, con soberanía de datos.',
    clip: '/video/kasuiro-loop-6.mp4',
    poster: '/video/posters/kasuiro-6.webp',
    cta: { texto: 'Ver Ruta de Madurez Digital', href: '/servicios/ruta-de-madurez-digital' },
  },
];
