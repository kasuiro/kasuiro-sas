# Kasuiro SAS · Difusión web

Sitio de difusión de **Kasuiro S.A.S.** — *Tu Departamento de Tecnología Externalizado*.
Ayudamos a pymes colombianas a digitalizar sus procesos sin contratar un equipo de TI completo.

Es una web estática hecha con Astro y servida por Cloudflare Workers. Desplegada el
22-nov-2026 en la cuenta `8be33c…` (`julianfajardoc2002-@hotmail.com`) como Worker `kasuiro-sas`.
URL pública: `https://kasuiro-sas.kasuiro-sas.workers.dev` (dominio propio pendiente).

**Stack:** [Astro 7](https://astro.build) · [Tailwind CSS 4](https://tailwindcss.com) ·
[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) ·
[Lenis](https://lenis.dev/) + [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) (fondo scrolleable de la portada) ·
[Cloudflare Workers](https://developers.cloudflare.com/workers/) (assets estáticos + un Worker mínimo para el formulario).

## Puesta en marcha

Necesitas Node.js 22.12 o superior y pnpm.

```sh
pnpm install
pnpm dev
```

La web queda en `http://localhost:4321`.

| Comando | Qué hace |
| :-- | :-- |
| `pnpm dev` | Servidor de desarrollo |
| `pnpm astro dev --background` | Servidor en segundo plano; se gestiona con `astro dev status`, `logs` y `stop` |
| `pnpm build` | Genera la web estática en `dist/` |
| `pnpm preview` | Sirve el build en local para revisarlo antes de publicar |

Tras el build se generan 14 páginas: portada, servicios, recursos (con el artículo ancla
publicado), casos de éxito, Auditoría Express, su página de agradecimiento, Habeas Data, 404,
`robots.txt` y `llms.txt`.

## Contenido

El contenido vive en Markdown dentro de `src/content/`, con tres colecciones definidas en
`src/content.config.ts`:

| Colección | Carpeta | Para qué | Campos propios |
| :-- | :-- | :-- | :-- |
| `servicios` | `servicios/` | Auditoría Express, Ruta de Madurez y sus fases | `maturityOrder` (0 = transversal, 1–3 = fases) |
| `casosExito` | `casos-exito/` | Casos de clientes verificados | `cliente`, `resultado` |
| `recursos` | `recursos/` | Artículos y guías de SEO | `kind`, `keywords` |

Campos comunes: `title`, `slug`, `summary`, `order`, `tools`, `draft`.

Correspondencia con la tarjeta de Trello «Definir el esquema de frontmatter»: `título → title`,
`resumen → summary`, `orden_ruta_madurez → maturityOrder` y `herramientas relacionadas → tools`.
Se usan nombres en inglés por la convención del Manual de Marca (§6): código y campos en inglés,
contenido y URLs visibles en español (`/servicios`, `/recursos`).

`tools` se conserva en el frontmatter pero no se renderiza: el sitio publicado evita nombrar
herramientas concretas para seguir compatible con el cambio de stack del 18-nov-2026.

### Regla de contenido

**No inventar.** Los textos, precios y condiciones proceden del *Manual de Marca y Contexto —
Kasuiro* (21-nov-2026) y del tablero de Trello. Lo que no está verificado se marca como
`pendiente` o con `draft: true` y no se publica. Hay un artículo ancla publicado («Qué es la
Ruta de Madurez Digital»); el de CRM sigue en borrador por falta de fuente para la comparativa
y la colección de casos de éxito está vacía a la espera de casos reales.

Las condiciones legales y tributarias requieren revisión de abogado y contador antes de ejecutarse.

## Estructura

```text
src/
├── content.config.ts       Esquemas de las tres colecciones (astro:content + glob loader)
├── content/
│   ├── servicios/          Auditoría Express, Ruta de Madurez y fases 1–3
│   ├── recursos/           1 artículo publicado + 1 borrador de CRM
│   └── casos-exito/        Vacío; marcador pendiente
├── pages/
│   ├── index.astro         Portada: fondo scrolleable con seis paradas
│   ├── servicios/          Listado y detalle por slug
│   ├── recursos/           Listado y detalle por slug
│   ├── casos-exito/        Estado pendiente
│   ├── auditoria-express/  Landing con formulario y página `gracias` (noindex)
│   ├── habeas-data.astro   Aviso de política pendiente de revisión legal
│   ├── robots.txt.ts       Enlace al sitemap
│   ├── llms.txt.ts         Resumen en texto plano para asistentes de IA
│   └── 404.astro
├── layouts/Layout.astro    Metas, canonical, tema, GA4 y verificación de GSC
├── components/
│   ├── Header.astro        Menú responsive y alternador claro/oscuro
│   ├── Footer.astro        Enlaces legales y control de consentimiento de medición
│   └── ScrollStage.astro   Escenario fijo, clips en loop, raíl y textos de las paradas
├── data/scroll.ts          Seis paradas: textos, clips, pósteres y CTA (sin inventar copys)
├── scripts/
│   ├── motion.ts           Lenis + ScrollTrigger + entradas con IntersectionObserver
│   └── world.ts            Selección del clip activo, foco, raíl y pausa al ocultar la pestaña
├── styles/global.css       Paleta verificada, botones, tarjetas y fondo decorativo
public/
├── brand/
│   └── kasuiro-icon-tight.png  Ícono oficial, sin redibujar: favicon, cabecera y pie
├── video/
│   ├── kasuiro-loop-{1..6}.mp4       Loops de 2 s con la paleta (prototipo, no arte oficial)
│   └── posters/kasuiro-{1..6}.webp   Pósteres para fallback y carga
├── _headers                Caché de un año para los archivos con hash de /_astro/
└── site.webmanifest        Manifest de Kasuiro SAS
worker/index.ts             Worker mínimo: sirve assets y atiende POST /api/auditoria-express
wrangler.jsonc              Worker `kasuiro-sas`, sirve `./dist` con página 404 propia
.dev.vars.example           Plantilla de secretos de Resend para Wrangler (sin valores reales)
.env.example                Plantilla de variables públicas de compilación (GA4 y GSC)
```

La plantilla original aportaba la base técnica (Astro, Tailwind, sitemap, Cloudflare), pero su
contenido de restaurante se retiró: vídeos, fotos, fuentes, datos y prompts. El componente de
scroll se reescribió desde cero con textos y clips propios (ver `src/data/scroll.ts`). No queda
ninguna referencia a ese proyecto en el código ni en los archivos del repo.

## Identidad visual

- Paleta leída del CSS publicado: tinta `#14213D`, papel `#FAFAF8`, bruma `#DCD9D2`,
  noche `#0F1522`, magenta `#C2298A`, violeta `#6B3FA0` y cian-texto `#10768B`.
- Botones: degradado reducido magenta → violeta, el único que pasa 4.5:1 con texto blanco.
- Modo claro/oscuro con persistencia en `localStorage`, aplicado antes de pintar para evitar
  parpadeo.
- Navegación con menú hamburguesa, `aria-expanded` / `aria-controls`, foco visible y enlace
  «Saltar al contenido».
- Widget flotante de accesibilidad: tamaño de texto, contraste alto y pausa de animaciones, con
  preferencias persistidas en `localStorage` y aplicadas antes de pintar.
- Se respeta `prefers-reduced-motion`.
- **Ícono original** `kasuiro-icon-tight.png` (copia byte a byte del entregable de marca) en el
  favicon, la cabecera y el pie. No se redibuja, se recolora ni se presenta una versión propia como
  oficial. El archivo vectorial y la tipografía oficial siguen pendientes de confirmación; el
  logotipo completo y los mockups quedan reservados para piezas de branding fuera de la web.

## Fondo scrolleable de la portada

La portada es un recorrido de seis paradas: inicio, auditoría y las tres fases de la Ruta de
Madurez Digital, más un cierre. Los textos y los enlaces viven en `src/data/scroll.ts` y proceden
de las páginas y colecciones ya publicadas; no se inventaron copys.

Los seis clips son **prototipos con la paleta verificada**, no arte oficial: 2 s, 1280×720,
12 fps, H.264/yuv420p, sin audio y `+faststart`, con un movimiento periódico en `T=2` para que el
bucle no salte. Ocupan ~447 KB en total. Cada clip se carga solo cuando su parada se activa
(`preload="none"`), se reproduce en bucle y se pausa al ocultar la pestaña; el scroll elige qué
clip se ve, nunca congela `currentTime`. Con `prefers-reduced-motion` o ahorro de datos no se
descarga vídeo: se muestran los pósteres WebP de `public/video/posters/`.

Para sustituir un clip, regenera el MP4 con la misma duración y exporta su primer fotograma a
`public/video/posters/kasuiro-N.webp`; las rutas están en `src/data/scroll.ts`.

## SEO

- `site` en `astro.config.mjs` es la URL canónica: de ella salen el canonical, `og:url`, el
  sitemap y `robots.txt`. Cambiarla ahí al contratar el dominio propio.
- Cada página define título y descripción; `Layout.astro` añade canonical, `hreflang`,
  Open Graph y Twitter Card. Las páginas legales y la 404 llevan `noindex`.
- La portada incluye un grafo JSON-LD `Organization` con el nombre, el lema y la descripción.
- `@astrojs/sitemap` genera el índice de sitemap automáticamente; `robots.txt` lo enlaza. La página
  de agradecimiento se excluye del sitemap porque lleva `noindex`.
- La verificación de Search Console se añade al `<head>` solo si se define `PUBLIC_GSC_VERIFICATION`.
  El token es público por diseño (método de etiqueta HTML de Google).

## Formulario de Auditoría Express

El formulario y la página `/auditoria-express/gracias` están preparados, pero **el envío está
desactivado por defecto**. No se activa hasta que el dominio de envío esté verificado en Resend y
existan las credenciales.

- El Worker (`worker/index.ts`) solo intercepta `POST /api/auditoria-express`; el resto de las
  peticiones se sirven desde `dist/`. Valida campos, exige consentimiento, aplica un honeypot y
  envía el correo con la API de Resend. Si faltan variables, responde `503` y no revela secretos.
- El botón del formulario se habilita en el build solo si `PUBLIC_RESEND_ENABLED=true`. Esa variable
  **no es un secreto**; las claves de Resend se leen únicamente en el Worker.
- La sincronización con una audiencia de Resend existe pero está desactivada
  (`RESEND_CONTACT_SYNC=0`). Solo activarla cuando el consentimiento y el doble *opt-in* estén
  aprobados por abogado.
- El texto de consentimiento y `/habeas-data` siguen pendientes de revisión legal; la página de
  agradecimiento lleva `noindex`.

Variables del Worker (copiar `.dev.vars.example` a `.dev.vars` solo en local):

| Variable | Uso |
| :-- | :-- |
| `RESEND_API_KEY` | Clave de API de Resend (secreto; nunca en el repo) |
| `RESEND_FROM` | Remitente en el dominio verificado |
| `RESEND_TO` | Destinatario interno de la solicitud |
| `RESEND_REPLY_TO` | Respuesta; por defecto, el correo del solicitante |
| `RESEND_AUDIENCE_ID` | Opcional; audiencia de Resend |
| `RESEND_CONTACT_SYNC` | `1` para sincronizar contactos; por defecto desactivado |

Para probar el endpoint en local:

```sh
pnpm build
cp .dev.vars.example .dev.vars   # rellenar con valores de prueba
pnpm dlx wrangler@4 dev
```

## Analítica y Search Console

Ambas integraciones están **preparadas pero sin configurar**: si las variables están vacías no se
inyecta ningún script ni etiqueta en el HTML. Las dos son variables públicas de compilación (Astro
sustituye `PUBLIC_*` en el build); copiar `.env.example` a `.env` para probarlas en local. `.env`
está ignorado por git.

| Variable | Uso |
| :-- | :-- |
| `PUBLIC_GA4_MEASUREMENT_ID` | ID de medición de GA4 (`G-…`). Sin valor, no hay analítica. |
| `PUBLIC_GSC_VERIFICATION` | Token del método «Etiqueta HTML» de Search Console. Sin valor, no hay meta tag. |

- GA4 usa `gtag.js` cargado de forma diferida. **No se envían datos sin consentimiento**: el script
  solo se descarga si la persona marcó «Permitir medición de uso del sitio» (guardado en
  `localStorage` como `kasuiro-analitica=si`). El control aparece en el pie solo cuando GA4 está
  configurado y el cambio se aplica al recargar.
- Se solicitan `analytics_storage: granted` y `ad_storage`, `ad_user_data` y `ad_personalization`
  en `denied`. Este mecanismo es una medida de privacidad **pendiente de revisión legal**: no
  sustituye un banner de consentimiento ni la política de Habeas Data.
- Como alternativa a la variable de GSC, se puede descargar el archivo de verificación que entrega
  Google y colocarlo en `public/` con el nombre exacto indicado; no requiere tocar el código.

Pasos pendientes de ejecutar (fuera del repo): crear la propiedad de GA4 y el flujo web, verificar
el sitio en Search Console con la URL canónica vigente, enviar `sitemap-index.xml` y revisar las
keywords definidas en `Vault/Projects/difusion-web-keywords.md`.

## Despliegue

`wrangler.jsonc` define el Worker `kasuiro-sas`, que sirve el contenido de `dist/`, usa la página
404 propia y solo ejecuta código en `/api/*`. El repo está conectado a Cloudflare, así que un push
a `main` debe disparar el despliegue. Las variables de Resend se configuran como secretos del
Worker en el panel de Cloudflare, nunca en el repositorio.

```sh
pnpm build
pnpm dlx wrangler@4 deploy
```

Despliegue manual (con OAuth de Wrangler; el token `CLOUDFLARE_API_TOKEN` del entorno apunta a otra
cuenta y hay que quitarlo con `unset CLOUDFLARE_API_TOKEN` antes de `wrangler login`):

```sh
unset CLOUDFLARE_API_TOKEN
export CLOUDFLARE_ACCOUNT_ID=8be33c205df71003417623e57d91e5a6
export WRANGLER_SEND_METRICS=false
PUBLIC_RESEND_ENABLED=true pnpm build
pnpm dlx wrangler@4 deploy
```

El Worker sirve `dist/` y solo intercepta `POST /api/auditoria-express`. Los secretos de Resend se
configuran con `wrangler secret put` en la misma sesión autenticada.

## Pendiente

- Dominio propio y SSL; `site` apunta al `*.workers.dev` real de la cuenta.
- Secretos de Resend (`RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO`) y revisión legal del
  consentimiento antes de abrir el formulario a visitantes.
- Archivo vectorial del logotipo y tipografía oficiales. El ícono PNG original ya está integrado;
  el logotipo completo y los mockups de marca se guardan fuera del repo para otras piezas.
- Sustituir los clips y pósteres de prueba del fondo por material oficial de marca cuando Julián
  confirme logo vectorial y tipografía.
- Configurar GA4 y Search Console: crear la propiedad, obtener los valores para `.env`, verificar
  la propiedad con la URL canónica vigente y enviar el sitemap. El código ya está preparado y no
  inyecta nada mientras las variables estén vacías; el consentimiento requiere revisión legal.
- Verificar el dominio de envío en **Resend**, configurar los secretos del Worker y publicar con
  `PUBLIC_RESEND_ENABLED=true` para habilitar el formulario (decisión de Julián, 22-nov-2026;
  Brevo queda descartado). La integración ya está preparada pero sigue desactivada.
- Redactar la política de Habeas Data con revisión legal.
- Los únicos archivos genéricos que se conservan de la plantilla son `AGENTS.md`,
  `CLAUDE.md`, `.vscode/` y `.claude/skills/landing-page-design/SKILL.md` (skill de diseño,
  sin contenido de marca). Si no aporta valor, retirarla en una limpieza aprobada.

## Fuentes

- *Manual de Marca y Contexto — Kasuiro* (16 páginas, 21-nov-2026).
- Tablero [🚀 Difusión Web Kasuiro SAS](https://trello.com/b/Wghddvxv).
- Notas internas: `Vault/Projects/kasuirogroup-contexto.md` y
  `Vault/Projects/difusion-web-kasuiro-sas.md`.
