// Copys para las secciones de la portada. Todas las frases proceden de
// src/content/servicios/*.md y de src/content/recursos/*.md; no se inventan datos.

export type LinkItem = {
  title: string;
  text: string;
  href: string;
};

export const benefits: LinkItem[] = [
  {
    title: 'Orden operativo',
    text: 'Ordenamos tu comunicación interna y gestión de proyectos en un solo lugar.',
    href: '/servicios/fase-1-centralizacion-operativa-y-comunicacion',
  },
  {
    title: 'Ventas centralizadas',
    text: 'Implementamos un CRM para centralizar tus clientes, oportunidades y ventas.',
    href: '/servicios/fase-2-automatizacion-comercial-e-inteligencia-de-clientes',
  },
  {
    title: 'Decisiones en tiempo real',
    text: 'Conectamos tus dispositivos y datos para tomar decisiones en tiempo real.',
    href: '/servicios/fase-3-conectividad-industrial-e-inteligencia-de-datos',
  },
];

export const steps: LinkItem[] = [
  {
    title: 'Centralización operativa y comunicación',
    text: 'Ordenamos tu comunicación interna y gestión de proyectos en un solo lugar.',
    href: '/servicios/fase-1-centralizacion-operativa-y-comunicacion',
  },
  {
    title: 'Automatización comercial e inteligencia de clientes',
    text: 'Implementamos un CRM para centralizar tus clientes, oportunidades y ventas.',
    href: '/servicios/fase-2-automatizacion-comercial-e-inteligencia-de-clientes',
  },
  {
    title: 'Conectividad industrial e inteligencia de datos',
    text: 'Conectamos tus dispositivos y datos para tomar decisiones en tiempo real.',
    href: '/servicios/fase-3-conectividad-industrial-e-inteligencia-de-datos',
  },
];

/** Declaración de valor que se revela palabra por palabra al hacer scroll. */
export const tagline = [
  'Un solo socio para estrategia, tecnología y operación,',
  'con soberanía de datos.',
];

export type Question = { question: string; answer: string };

export const faqs: Question[] = [
  {
    question: '¿A quién ayuda Kasuiro SAS?',
    answer:
      'Ayudamos a pymes colombianas a digitalizar sus procesos sin contratar un equipo de TI completo.',
  },
  {
    question: '¿Qué es la Auditoría Express?',
    answer:
      'Un diagnóstico de 3 días hábiles para ordenar la operación y decidir el siguiente paso.',
  },
  {
    question: '¿Cuánto cuesta la Auditoría Express?',
    answer:
      'Desde $400.000 COP. Pago 100 % anticipado. Por ser un diagnóstico, no incluye garantía.',
  },
  {
    question: '¿Qué es la Ruta de Madurez Digital?',
    answer:
      'Tres fases para centralizar la operación, automatizar la venta y conectar los datos en tiempo real.',
  },
  {
    question: '¿Puedo contratar una fase por separado?',
    answer: 'Sí. Las tres fases se pueden contratar por separado.',
  },
  {
    question: '¿Cómo se ejecutan los proyectos?',
    answer: 'Con Scrum, sprints de 2 semanas.',
  },
];
