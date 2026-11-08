# revolyiu.com — web nueva

Next.js 16 (App Router) en Vercel · textos y blog en Supabase · sin WordPress.
La web en vivo (DreamHost + WordPress) **no se toca** hasta que Frank apruebe esta.

## Páginas

| URL | Contenido |
|---|---|
| `/` | Inicio |
| `/nosotros/` | Nosotros (la antigua `/about/` redirige aquí) |
| `/servicios/` | Índice de servicios |
| `/diseno-grafico-branding/` `/desarrollo-web/` `/marketing-creativo/` `/soluciones-crm/` `/gestion-de-talentos/` `/arquitectura-interiorismo/` | Servicios (mismas URL que hoy → no se pierde SEO) |
| `/contacto/` | Formulario (guarda en Supabase) + teléfono, correo, WhatsApp |
| `/blog/` `/blog/<slug>/` | Blog (lee de Supabase; solo `status = published`) |
| `/aviso-legal/` `/politica-de-privacidad/` `/politica-de-cookies/` | Legal |

Las URL antiguas de WordPress (`/about/`, `/portfolio/*`, posts de plantilla, `/category/*`…) redirigen con 301 (`next.config.ts`).

## Desarrollo

```bash
npm install
npm run build && npx next start -p 3100
BASE=http://localhost:3100 npm run qa     # QA completo → qa-report/qa.md
```

Sin variables de entorno la web funciona igual con los textos de `lib/content.ts` (el formulario avisa de que no está conectado).

## Variables de entorno (Vercel → Settings → Environment Variables)

Ver `.env.example`. **`SITE_ENV=production` solo el día que el dominio apunte a Vercel**: mientras no lo esté, todas las páginas llevan `noindex` y `robots.txt` bloquea a Google, para que la web de pruebas no compita con la real.

## Supabase

1. Proyecto gratuito, región UE.
2. SQL Editor → pegar `supabase/schema.sql` → Run.
3. Copiar `Project URL` y `anon key` a Vercel.

Tablas: `site_content` (textos), `posts` (blog, con estados y QA), `contact_messages` (formulario; solo legible desde el panel).

## QA (antes de enseñar nada)

`npm run qa` recorre todas las páginas del sitemap en móvil (iPhone 13) y escritorio y falla si encuentra:
estado HTTP ≠ 200, enlaces internos rotos, imágenes rotas o sin `alt`, desbordes horizontales, contraste < WCAG AA,
palabras sin tilde (`diseno`, `-cion`…), falta de title/description/canonical/h1/og:image/JSON-LD, falta de `noindex` en pruebas,
URL antiguas que no redirigen, 404 que no es 404, cookies o peticiones a terceros antes de consentir,
botones Rechazar y Aceptar distintos en tamaño o estilo, y validaciones del formulario.
Además se pasa Lighthouse (móvil) a mano.

## Paso a producción (cuando Frank apruebe)

Hoy: dominio en GoDaddy, **nameservers en DreamHost** (ns1/ns2.dreamhost.com) → todos los registros DNS (incluidos los MX del correo) viven en DreamHost.

1. **Antes de tocar nada**: en DreamHost → *Manage Websites → DNS* de revolyiu.com, exportar/copiar **todos** los registros (A, AAAA, CNAME, **MX**, TXT —SPF, DKIM, DMARC, verificaciones—, SRV). Guardarlos en `dns-backup-AAAA-MM-DD.txt`.
2. En GoDaddy → DNS de revolyiu.com: recrear **todos** esos registros tal cual, **los MX exactamente iguales aunque parezcan muertos**, y los TXT.
3. Sustituir solo los de la web por los de Vercel: `A @ 76.76.21.21` y `CNAME www cname.vercel-dns.com` (confirmar los valores que muestre Vercel → Domains).
4. Bajar el TTL a 600 s un día antes.
5. En GoDaddy cambiar los nameservers de DreamHost a los de GoDaddy (*Nameservers → Default*).
6. En Vercel: añadir `revolyiu.com` y `www.revolyiu.com`, poner `SITE_ENV=production`, `NEXT_PUBLIC_SITE_URL=https://revolyiu.com` y volver a desplegar.
7. Comprobar: web, `https://` (certificado), `/sitemap.xml`, y que el correo sigue entrando (enviar un email de prueba).
8. Google Search Console: enviar `https://revolyiu.com/sitemap.xml`.

**Vuelta atrás (minutos):** en GoDaddy volver a poner los nameservers `ns1.dreamhost.com` / `ns2.dreamhost.com`. DreamHost sigue con la web y el DNS intactos mientras no se cierre la cuenta.

## Blog automático

Ver `BLOG-AUTOMATICO.md`.

## Animaciones

Ver `ANIMACIONES.md`.
