-- Revolyiu · esquema de Supabase (ejecutar una vez en SQL Editor)
-- Plan gratuito. Región recomendada: eu-west (Irlanda) o eu-central (Fráncfort), por RGPD.

-- 1) Textos de la web --------------------------------------------------------
-- Cada fila sobrescribe una parte de lib/content.ts. Claves: 'home', 'about',
-- 'service:<slug>' (p. ej. 'service:desarrollo-web'). El valor es un JSON parcial.
create table if not exists public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
drop policy if exists "lectura publica de textos" on public.site_content;
create policy "lectura publica de textos" on public.site_content for select using (true);

-- 2) Blog ---------------------------------------------------------------------
-- Flujo del equipo de IA: draft → in_review → (QA) → approved → published
-- El QA nunca pasa a 'approved' si duda: usa 'rejected' y deja el motivo en qa_notes.
-- La web solo muestra status = 'published' con published_at <= ahora.
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null check (char_length(title) between 10 and 70),
  excerpt text not null check (char_length(excerpt) between 50 and 170),
  category text not null default 'Marketing' check (category in ('Marketing', 'Diseño', 'Branding', 'Web', 'Redes sociales')),
  body_md text not null,
  cover jsonb, -- {"src": "https://…", "w": 1200, "h": 675, "alt": "…"}
  author text default 'Equipo Revolyiu',
  status text not null default 'draft' check (status in ('draft', 'in_review', 'approved', 'rejected', 'published')),
  qa_score numeric check (qa_score between 0 and 100),
  qa_notes text,
  qa_checked_at timestamptz,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  -- No se puede publicar sin QA aprobado
  constraint publicar_requiere_qa check (status <> 'published' or (qa_checked_at is not null and qa_score >= 85 and published_at is not null))
);
create index if not exists posts_published_idx on public.posts (status, published_at desc);
alter table public.posts enable row level security;
drop policy if exists "lectura publica de posts publicados" on public.posts;
create policy "lectura publica de posts publicados" on public.posts for select using (status = 'published' and published_at <= now());
-- La escritura solo la hace el sistema automático con la service_role key (salta RLS).

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;
drop trigger if exists posts_touch on public.posts;
create trigger posts_touch before update on public.posts for each row execute function public.touch_updated_at();
drop trigger if exists content_touch on public.site_content;
create trigger content_touch before update on public.site_content for each row execute function public.touch_updated_at();

-- 3) Mensajes del formulario de contacto ----------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) <= 120),
  email text not null check (char_length(email) <= 200),
  phone text check (char_length(phone) <= 40),
  company text check (char_length(company) <= 120),
  services text[] default '{}',
  message text not null check (char_length(message) between 10 and 5000),
  privacy_accepted_at timestamptz not null,
  created_at timestamptz not null default now()
);
alter table public.contact_messages enable row level security;
drop policy if exists "cualquiera puede enviar" on public.contact_messages;
create policy "cualquiera puede enviar" on public.contact_messages for insert with check (privacy_accepted_at is not null);
-- Nadie puede leerlos con la clave pública: solo desde el panel de Supabase.

-- Borrado automático a los 12 meses (política de privacidad). Requiere pg_cron (gratis).
-- create extension if not exists pg_cron;
-- select cron.schedule('purge-contact', '0 3 * * *', $$delete from public.contact_messages where created_at < now() - interval '12 months'$$);

-- 4) Artículo inicial (migrado de la web antigua) -----------------------------
insert into public.posts (slug, title, excerpt, category, body_md, cover, status, qa_score, qa_notes, qa_checked_at, published_at)
values (
  'likes-no-pagan-las-cuentas',
  'Los likes no pagan las cuentas: la estrategia, sí',
  '¿Publicas todos los días y aun así nadie compra? Quizá no te falta contenido, sino una estrategia creativa que convierta tus redes en una máquina de resultados.',
  'Marketing',
  $md$¿Publicas todos los días y aun así nadie compra? Quizá no te falta contenido, sino una **estrategia creativa** que convierta tus redes en una máquina de resultados.

## 1. Creatividad sin dirección es solo ruido

La clave es tener una estrategia de contenido que conecte con tu audiencia, con objetivos claros y formatos bien pensados: reels, stories, carruseles, TikToks, campañas integradas… Todo con un propósito.

## 2. La fórmula: contenido útil + emoción + constancia

No se trata de vender en cada publicación, sino de **aportar valor, entretener y enseñar**. Una comunidad se gana, no se compra. Con contenido creativo y auténtico construyes una relación duradera con tu público.

## 3. Datos + creatividad = resultados

Medimos, analizamos y ajustamos. La creatividad sin métricas es arte; nosotros hacemos marketing: **campañas que se ven bien y funcionan mejor**.

## 4. Humaniza tu marca (y disfruta del proceso)

No le hables a tu audiencia como un robot corporativo. Las marcas que más conectan hoy se atreven a ser humanas: cuentan historias reales y muestran errores, logros, procesos y personas.

---

En Revolyiu no solo diseñamos campañas bonitas. Creamos estrategias pensadas para conectar, generar resultados y hacer crecer tu marca de verdad.

**¿Tu marca está lista para sonar fuerte en redes?** [Hablemos](/contacto/).$md$,
  '{"src": "/img/blog-likes-estrategia.webp", "w": 1100, "h": 299, "alt": "Estrategia de marketing en redes sociales"}',
  'published', 100, 'Migrado de la web anterior y revisado a mano.', now(), '2021-09-12'
) on conflict (slug) do nothing;
