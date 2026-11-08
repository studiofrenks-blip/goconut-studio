# Animaciones

Están numeradas para poder pedirlas por número y cambiarlas sin tocar las páginas.
**Pendiente:** mapear cada número con el Kit Frenks (no estaba disponible al montar la web).
Todas respetan `prefers-reduced-motion`: si el visitante pide menos movimiento, se desactivan.

| Nº | Nombre | Cómo se usa | Dónde |
|---|---|---|---|
| 01 | Subida con fundido | `data-fx="01"` | Párrafos, botones |
| 02 | Cortina hacia arriba | `data-fx="02"` (anima los hijos) | Libre |
| 03 | Palabras que emergen | `data-fx="03"` + `<Split text="…" />` | Títulos |
| 04 | Zoom con desenfoque | `data-fx="04"` | Libre |
| 05 | Apertura circular de imagen | `data-fx="05"` (anima los hijos) | Fotos de servicios y portada |
| 06 | Cascada de elementos | `data-fx="06"` en el contenedor | Listas, tarjetas, galerías |
| 07 | Botón magnético | `data-magnetic` | Botones principales (solo con ratón) |
| 08 | Parallax | `data-parallax="0.04"` | Fotos dobles (solo escritorio) |
| 09 | Brillo que sigue al cursor | automático | Fondo de toda la web |
| 10 | Vista previa flotante | componente `ServiceList` | Lista de servicios (escritorio) |
| 11 | Entrada de portada solo CSS | clases `intro intro--*` | Portada (no espera al JS: mejor LCP) |
| 12 | Órbitas | `.orbit` | Imagen de la portada |
| 13 | Cinta de servicios | `.marquee` | Inicio |
| 14 | Ondas expansivas | `.bigcta__rings` | Bloque «Hablemos» |

Código: `components/Motion.tsx` (01–10) y `app/globals.css` (sección «Animaciones»).
