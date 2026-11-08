// Blog: hoy vacío. Se conectará al sistema automático (2 artículos/semana) vía Supabase.
export type Post = { slug: string; title: string; excerpt: string; date: string; body: string };
export const posts: Post[] = [];
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
