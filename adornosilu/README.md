# adornosilu.com — web nueva (Next.js)

Reemplazo de la web WordPress de DreamHost. **No toca la web en vivo**: se despliega en una dirección de prueba y solo se le apunta el dominio cuando se apruebe.

- `npm run dev` / `npm run build`
- `NEXT_PUBLIC_INDEXABLE=true` solo en producción aprobada. Sin esa variable, la web lleva `noindex` y `robots.txt` bloquea todo.
- `NEXT_PUBLIC_SITE_URL`: URL canónica (por defecto `https://adornosilu.com`).

Pendiente: contenido y fotos del respaldo, Kit Frenks, Supabase (productos, fotos, blog), checkout y textos legales revisados por un abogado.
