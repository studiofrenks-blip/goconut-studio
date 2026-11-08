# Contexto de diseño — método Ideaholiks (nov 2026)

Pega esto en el chat de otra web. Adapta fotos, textos, paleta y animaciones del Kit Frenks a esa marca; el método es el mismo.

## Objetivo
Que la web sea un "show", no una plantilla: una idea visual fuerte ligada a la marca, tipografía grande con carácter y movimiento con intención. Nada de relleno de plantilla ni datos inventados.

## Base técnica
- Next.js (App Router) en Vercel, textos en Supabase con valores por defecto en el código. ES + EN con URLs propias (/es/nosotros, /en/about), hreflang, canonical, sitemap, JSON-LD y 301 desde las URLs antiguas.
- La dirección de prueba siempre va con noindex hasta que el dominio apunte a Vercel.
- Fuentes autoalojadas (sin Google Fonts). Una fuente display variable con eje de anchura (Bricolage Grotesque wdth) para los titulares y Inter para el texto.

## Dirección visual
1. **Una metáfora de marca en la portada.** Aquí: escenario a oscuras con un foco que sigue al dedo o al ratón sobre la foto real del show. Sin ratón, el foco se pasea solo. Busca la equivalente en cada marca.
2. **Titular gigante en mayúsculas condensadas** con una palabra que rota (marcas → shows → movimientos). Para Google, el H1 completo va en texto oculto.
3. **Paleta del Kit Frenks con la regla de las tres:** fondo oscuro, apoyo claro y un acento que sorprende (lima). El acento solo va en botones y palabras clave.
4. **Escala moderada:** los titulares de sección no pasan de ~80 px (clamp(34px, 5vw, 80px)), la portada de ~136 px, y el cierre ("¿Hablamos?") de ~168 px. Si algo se ve sobrecargado, baja el tamaño antes de quitar cosas.
5. **Aire:** 100–200 px entre secciones. Como mucho 3 pegatinas en la portada, y ninguna en el móvil.

## Recursos que funcionan (de las webs premiadas de 2026)
- Tipografía cinética nativa: los titulares se estiran al entrar en pantalla con `animation-timeline: view()` y `font-stretch`. Se mueven una vez y se quedan quietos.
- Texto que se enciende palabra a palabra al bajar (párrafo clave de "quiénes somos").
- Tarjetas de servicios apiladas con `position: sticky`, cada una de un color de la paleta y con el brillo que sigue al dedo (Kit 1). Contenido arriba, para que no lo tape la siguiente.
- Dos cintas cruzadas con texto en movimiento entre secciones (finas y poco inclinadas).
- Cierre con una frase gigante y un botón redondo magnético.
- En ordenador, cursor propio que crece sobre enlaces.
- Fotos que entran recortadas y se abren (clip-path) en la página de proyectos.

## Kit Frenks usado aquí
Paleta 5 + acento lima · 1 (brillo en tarjetas y foco de portada) · 2 (órbita en "quiénes somos") · 5 (foto que se abre al bajar en "Sabemos llenar una sala") · 7 (hilos de luz en "cómo trabajamos") · 8 (globo en "clientes en todo el mundo").

## Reglas que no se saltan
- Todo respeta `prefers-reduced-motion`: sin animación, la página se lee igual.
- Ningún elemento se sale del ancho en el móvil (390 px). Botones de al menos 44–48 px, y en el móvil van a ancho completo y en columna.
- Contraste WCAG AA, alt descriptivo en todas las fotos y un solo H1 por página.
- Banner de cookies con Rechazar idéntico a Aceptar (tamaño, color, peso), sin cookies antes de decidir, enlace "Configurar cookies" en el pie, más aviso legal, privacidad y cookies.
- Nada de datos inventados: sin contadores falsos, testimonios de relleno ni teléfonos de ejemplo.

## QA antes de enseñarlo
Un script de Playwright (qa/run-qa.mjs) pasa por todas las páginas en móvil y ordenador y revisa: HTTP 200, scroll horizontal, H1, tamaño del logo, imágenes rotas o sin alt, título ≤60 y descripción 110–160 caracteres, canonical/hreflang/og:image/JSON-LD, axe (WCAG AA), enlaces rotos, redirecciones antiguas, idioma de entrada, banner de cookies, formulario, textos de plantilla prohibidos y tildes. Luego Lighthouse, y además una revisión con capturas a ojo (móvil y ordenador, bajando por la página). Se corre también sobre la URL de Vercel. Si el cliente encuentra un fallo, el proceso falló.
