import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('Falta site en astro.config.mjs');
  const home = new URL('/', site).href;
  const body = `# Kasuiro SAS

> Tu Departamento de Tecnología Externalizado

Ayuda a pymes colombianas a digitalizar sus procesos sin contratar un equipo de TI completo.
Auditoría, implementación y soporte continuo, con herramientas que ya usan las empresas más ágiles del mundo.

## Datos verificados

- Razón social: Kasuiro S.A.S.
- Fundador: Julián Fajardo, CTO y desarrollador full-stack.
- Cliente objetivo: pymes colombianas sin área de TI propia.
- Diferencial: un solo socio para estrategia, tecnología y operación, con soberanía de datos.
- Página: ${home}

## Servicios

- Auditoría Express: diagnóstico de 3 días hábiles. Desde $400.000 COP.
- Ruta de Madurez Digital: tres fases (centralización operativa, automatización comercial, conectividad industrial).
- Soporte continuo: SLA con niveles Básico, Estándar y Prioritario.

## Fuentes

Contenido basado en el Manual de Marca y Contexto — Kasuiro (21 nov 2026). Los precios son
estimaciones de mercado 2026 y requieren revalidación periódica. Las condiciones legales y
tributarias requieren revisión de abogado y contador.

Pendiente: logotipo vectorial, tipografía oficial, dominio propio y política de Habeas Data.
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
