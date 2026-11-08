-- Ideaholiks Studio · esquema de Supabase (plan gratis).
-- Ejecutar una vez en el SQL Editor del proyecto.

-- 1) Textos editables de la web (clave + idioma). Si una clave no está aquí,
--    la web usa el texto por defecto del código.
create table if not exists public.site_texts (
  key text not null,
  locale text not null check (locale in ('es','en')),
  value text not null,
  updated_at timestamptz not null default now(),
  primary key (key, locale)
);

-- 2) Blog. El sistema automático escribe aquí con status = 'draft';
--    solo pasa a 'published' cuando el QA lo aprueba.
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  locale text not null check (locale in ('es','en')),
  title text not null check (char_length(title) between 10 and 110),
  description text not null check (char_length(description) between 50 and 170),
  body_md text not null,
  cover_url text,
  cover_alt text,
  status text not null default 'draft' check (status in ('draft','in_review','published','rejected')),
  qa_notes text,
  translation_slug text,
  published_at timestamptz not null default now(),
  updated_at timestamptz,
  created_at timestamptz not null default now(),
  unique (locale, slug),
  -- Una imagen de portada siempre lleva texto alternativo.
  check (cover_url is null or (cover_alt is not null and char_length(cover_alt) > 5))
);
create index if not exists posts_pub_idx on public.posts (locale, status, published_at desc);

-- 3) Mensajes del formulario de contacto (solo escritura desde el servidor).
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  locale text,
  created_at timestamptz not null default now()
);

-- Seguridad: el público solo puede LEER textos y artículos publicados.
alter table public.site_texts enable row level security;
alter table public.posts enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "textos publicos" on public.site_texts;
create policy "textos publicos" on public.site_texts for select using (true);

drop policy if exists "posts publicados" on public.posts;
create policy "posts publicados" on public.posts for select
  using (status = 'published' and published_at <= now());
-- contact_messages: sin políticas públicas -> solo la service role key escribe y lee.
