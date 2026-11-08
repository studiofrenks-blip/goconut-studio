# ideaholikstudio.com — web nueva

Next.js (App Router) + Supabase. Español e inglés. Sin WordPress.

## Rutas
| ES | EN |
|---|---|
| `/es` | `/en` |
| `/es/nosotros` | `/en/about` |
| `/es/proyectos` | `/en/work` |
| `/es/blog` | `/en/blog` |
| `/es/contacto` | `/en/contact` |
| `/es/legal/aviso-legal` · `/privacidad` · `/cookies` | `/en/legal/legal-notice` · `/privacy` · `/cookies` |

`/` manda a `/es` o `/en` según el idioma del navegador. Las URLs de la web WordPress antigua redirigen (301) a su equivalente.

## Kit Frenks usado
- Paleta 5 «Morado de noche» + degradado del logo + acento lima.
- Animación 5 · foto que se abre al bajar (portada).
- Animación 2 · órbita con fichas (quiénes somos).
- Animación 1 · tarjetas que se encienden (servicios).
Todas respetan «reducir movimiento» del sistema.

## Variables (Vercel → Settings → Environment Variables)
Ver `.env.example`. Mientras `SITE_INDEXABLE` no sea `1`, la web lleva `noindex` y `robots.txt` bloquea todo: la dirección de prueba no sale en Google.

## Supabase
Ejecutar `supabase/schema.sql` una vez. Tablas:
- `site_texts` — cambia cualquier texto (clave de `src/content/texts.ts` + idioma) sin tocar código.
- `posts` — el blog. El sistema automático escribe con `status='draft'`; solo `published` se ve.
- `contact_messages` — mensajes del formulario (solo servidor).

## QA
```
npm run build && npm start   # en otra terminal:
npm run qa                   # BASE=https://… para probar la dirección de Vercel
GO_LIVE=1 npm run qa         # antes de apuntar el dominio: además exige datos legales y indexación
```
Revisa en móvil y ordenador: carga, scroll horizontal, H1, logo 60–80 px, imágenes rotas y sin alt, títulos y descripciones, canonical/hreflang, JSON-LD, accesibilidad y contraste (axe, WCAG AA), enlaces rotos, redirecciones antiguas, idioma de entrada, banner de cookies (Rechazar idéntico a Aceptar, sin cookies antes de decidir), formulario, textos prohibidos de la web vieja y tildes.

## Antes de apuntar el dominio
1. Rellenar los datos del titular en `src/content/legal.ts` (salen en amarillo «PENDIENTE»).
2. `SITE_INDEXABLE=1` y `NEXT_PUBLIC_SITE_URL=https://www.ideaholikstudio.com` en producción.
3. `GO_LIVE=1 npm run qa` en verde.
4. DNS en GoDaddy: copiar **tal cual** todos los registros MX (y TXT de correo: SPF, DKIM, DMARC) antes de cambiar nada. Vuelta atrás: restaurar los NS de DreamHost.
