# Kasuiro SAS · Difusión web

Sitio de difusión de **Kasuiro S.A.S.** — *Tu Departamento de Tecnología Externalizado*.
Ayudamos a pymes colombianas a digitalizar sus procesos sin contratar un equipo de TI completo.

Es una web estática hecha con Astro y servida por Cloudflare Workers. El repositorio está
conectado a Cloudflare; el despliegue queda a la espera de las credenciales de la cuenta
`kasuirogroup`. URL prevista: `https://kasuiro-sas.kasuirogroup.workers.dev` (dominio propio
pendiente).

**Stack:** [Astro 7](https://astro.build) · [Tailwind CSS 4](https://tailwindcss.com) ·
[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) ·
[Cloudflare Workers](https://developers.cloudflare.com/workers/) (solo assets, sin código de Worker).

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

Tras el build se generan 13 páginas: portada, servicios, recursos (con el artículo ancla
publicado), casos de éxito, Auditoría Express, Habeas Data, 404, `robots.txt` y `llms.txt`.

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
│   ├── index.astro         Portada: lema, fases y servicios
│   ├── servicios/          Listado y detalle por slug
│   ├── recursos/           Listado y detalle por slug
│   ├── casos-exito/        Estado pendiente
│   ├── auditoria-express/  Landing con formulario (desactivado hasta conectar Resend)
│   ├── habeas-data.astro   Aviso de política pendiente de revisión legal
│   ├── robots.txt.ts       Enlace al sitemap
│   ├── llms.txt.ts         Resumen en texto plano para asistentes de IA
│   └── 404.astro
├── layouts/Layout.astro    Metas, Open Graph, canonical, tema y navegación
├── components/
│   ├── Header.astro        Menú responsive y alternador claro/oscuro
│   └── Footer.astro        Lema, enlaces legales y copyright
├── styles/global.css       Paleta verificada, botones, tarjetas y fondo decorativo
public/
├── _headers                Caché de un año para los archivos con hash de /_astro/
└── site.webmanifest        Manifest de Kasuiro SAS
wrangler.jsonc              Worker `kasuiro-sas`, sirve `./dist` con página 404 propia
```

La plantilla original aportaba la base técnica (Astro, Tailwind, sitemap, Cloudflare), pero su
contenido de restaurante se retiró: vídeos, fotos, fuentes, componentes de scroll, datos y
prompts. No queda ninguna referencia a ese proyecto en el código ni en los archivos del repo.

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
- **No se crea un isotipo propio**: el Manual prohíbe presentar como oficial una versión
  redibujada. El logo real está pendiente.

## SEO

- `site` en `astro.config.mjs` es la URL canónica: de ella salen el canonical, `og:url`, el
  sitemap y `robots.txt`. Cambiarla ahí al contratar el dominio propio.
- Cada página define título y descripción; `Layout.astro` añade canonical, `hreflang`,
  Open Graph y Twitter Card. Las páginas legales y la 404 llevan `noindex`.
- La portada incluye un grafo JSON-LD `Organization` con el nombre, el lema y la descripción.
- `@astrojs/sitemap` genera el índice de sitemap automáticamente; `robots.txt` lo enlaza.

## Despliegue

`wrangler.jsonc` define el Worker `kasuiro-sas`, que sirve el contenido de `dist/` sin código
de Worker y usa la página 404 propia. El repo está conectado a Cloudflare, así que un push a
`main` debe disparar el despliegue.

```sh
pnpm build
pnpm dlx wrangler@4 deploy
```

El despliegue manual requiere un token con permisos sobre la cuenta de `kasuirogroup`. El token
disponible en este equipo pertenece a otra cuenta y devuelve `403`.

## Pendiente

- Dominio propio y SSL; `site` sigue apuntando al `*.workers.dev`.
- Token de Cloudflare con acceso a la cuenta `kasuirogroup`.
- Isotipo y tipografía oficiales (sin confirmar en el Manual).
- GA4 y registrar el sitio en Search Console (las keywords y el calendario ya están preparados
  en las notas del Vault; falta medir y ejecutar).
- Dominio y API de Resend; el formulario sigue desactivado.
- Conectar el formulario de Auditoría Express a **Resend** y verificar el dominio de envío
  (decisión de Julián, 22-nov-2026; Brevo queda descartado).
- Redactar la política de Habeas Data con revisión legal.
- Los únicos archivos genéricos que se conservan de la plantilla son `AGENTS.md`,
  `CLAUDE.md`, `.vscode/` y `.claude/skills/landing-page-design/SKILL.md` (skill de diseño,
  sin contenido de marca). Si no aporta valor, retirarla en una limpieza aprobada.

## Fuentes

- *Manual de Marca y Contexto — Kasuiro* (16 páginas, 21-nov-2026).
- Tablero [🚀 Difusión Web Kasuiro SAS](https://trello.com/b/Wghddvxv).
- Notas internas: `Vault/Projects/kasuirogroup-contexto.md` y
  `Vault/Projects/difusion-web-kasuiro-sas.md`.
