# Blog automático — contrato con el sistema de IA

Objetivo: **2 artículos por semana** sobre marketing y diseño, escritos por un equipo de IA,
con un QA que **no publica si duda**.

## Cómo publica el sistema

Escribe en la tabla `posts` de Supabase con la `service_role key` (nunca en el navegador).

1. Redactor → inserta con `status = 'draft'`.
2. Editor → pasa a `in_review`.
3. QA → revisa y fija `qa_score` (0–100), `qa_notes` y `qa_checked_at`:
   - Si todo está bien y `qa_score >= 85` → `status = 'approved'`.
   - **Si duda en cualquier punto → `status = 'rejected'`** con el motivo en `qa_notes`. Nunca publica.
4. Publicador → solo artículos `approved`: `status = 'published'` y `published_at` (puede ser futura: sale sola ese día).

La base de datos impide publicar sin QA (`constraint publicar_requiere_qa`).
La web refresca el blog cada 10 minutos (ISR); no hace falta desplegar.

## Checklist mínima del QA

- Español de España, tuteo, tono Revolyiu (cercano, directo, sin relleno). Tildes y ortografía perfectas.
- Título 10–70 caracteres, extracto 50–170, slug en minúsculas con guiones.
- Datos y cifras con fuente verificable; nada inventado. Sin promesas de resultados.
- Sin plagio. Sin marcas de terceros usadas de forma engañosa.
- Imagen de portada con licencia y `alt` descriptivo.
- Al menos un enlace interno a un servicio y cierre con llamada a la acción a `/contacto/`.
- Markdown admitido: `##`/`###`, párrafos, listas, `> cita`, `**negrita**`, `*cursiva*`, `[enlace](url)`, `---`.

## Formato de una fila

```json
{
  "slug": "como-elegir-colores-de-marca",
  "title": "Cómo elegir los colores de tu marca sin equivocarte",
  "excerpt": "Guía práctica para definir una paleta que transmita lo que eres y funcione en web, redes e impresión.",
  "category": "Branding",
  "body_md": "## …",
  "cover": { "src": "https://…/portada.webp", "w": 1200, "h": 675, "alt": "Muestras de color sobre una mesa de diseño" },
  "status": "draft"
}
```
