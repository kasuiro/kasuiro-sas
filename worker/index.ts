// Worker del sitio Kasuiro SAS.
// Sirve los assets estáticos generados por Astro y expone un único endpoint para
// la solicitud de Auditoría Express. Sin credenciales el endpoint responde 503 y
// el formulario público permanece desactivado (PUBLIC_RESEND_ENABLED != 'true').

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  RESEND_API_KEY?: string;
  RESEND_FROM?: string;
  RESEND_TO?: string;
  RESEND_REPLY_TO?: string;
  RESEND_AUDIENCE_ID?: string;
  RESEND_CONTACT_SYNC?: string;
}

const RUTA = '/api/auditoria-express';
const LIMITE = { nombre: 120, email: 254, empresa: 160, companySize: 80, industry: 80 };

function json(body: unknown, status = 200, headers: Record<string, string> = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...headers,
    },
  });
}

function campo(valor: unknown, max: number): string | null {
  if (typeof valor !== 'string') return null;
  const limpio = valor.trim();
  return limpio.length > 0 && limpio.length <= max ? limpio : null;
}

function opcional(valor: unknown, max: number): string {
  if (typeof valor !== 'string') return '';
  return valor.trim().slice(0, max);
}

function correoValido(valor: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
}

async function enviarSolicitud(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ ok: false, error: 'Método no permitido.' }, 405, { Allow: 'POST' });
  }

  if (!env.RESEND_API_KEY || !env.RESEND_FROM || !env.RESEND_TO) {
    return json({ ok: false, error: 'El formulario aún no está configurado.' }, 503);
  }

  let datos: Record<string, unknown>;
  try {
    datos = await request.json();
  } catch {
    return json({ ok: false, error: 'Datos no válidos.' }, 400);
  }
  if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
    return json({ ok: false, error: 'Datos no válidos.' }, 400);
  }

  // Honeypot: si el campo oculto se rellena, se descarta sin informar al visitante.
  if (opcional(datos.website, 200)) return json({ ok: true });

  const nombre = campo(datos.nombre, LIMITE.nombre);
  const email = campo(datos.email, LIMITE.email);
  const empresa = campo(datos.empresa, LIMITE.empresa);

  if (!nombre || !email || !empresa || !correoValido(email) || datos.consentimiento !== true) {
    return json({ ok: false, error: 'Revisa los campos obligatorios y el consentimiento.' }, 400);
  }

  const companySize = opcional(datos.companySize, LIMITE.companySize);
  const industry = opcional(datos.industry, LIMITE.industry);

  const texto = [
    'Nueva solicitud de Auditoría Express',
    '',
    `Nombre: ${nombre}`,
    `Empresa: ${empresa}`,
    `Correo: ${email}`,
    ...(companySize ? [`Tamaño de la empresa: ${companySize}`] : []),
    ...(industry ? [`Sector: ${industry}`] : []),
    '',
    'Consentimiento: aceptado para ser contactado.',
    'Condiciones publicadas (estimación de mercado 2026): desde $400.000 COP, pago 100 % anticipado y sin garantía por ser un diagnóstico.',
  ].join('\n');

  const respuesta = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.RESEND_FROM,
      to: [env.RESEND_TO],
      reply_to: env.RESEND_REPLY_TO || email,
      subject: `Solicitud de Auditoría Express — ${empresa}`,
      text: texto,
    }),
  });

  if (!respuesta.ok) {
    return json(
      { ok: false, error: 'No pudimos registrar tu solicitud. Inténtalo de nuevo.' },
      502,
    );
  }

  // Opcional: añadir el contacto a una audiencia de Resend. Solo activar cuando
  // el consentimiento y el doble opt-in estén aprobados por el abogado.
  if (env.RESEND_CONTACT_SYNC === '1' && env.RESEND_AUDIENCE_ID) {
    await fetch(
      `https://api.resend.com/audiences/${encodeURIComponent(env.RESEND_AUDIENCE_ID)}/contacts`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, first_name: nombre, unsubscribed: false }),
      },
    ).catch(() => {});
  }

  return json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === RUTA) return enviarSolicitud(request, env);
    return env.ASSETS.fetch(request);
  },
};
