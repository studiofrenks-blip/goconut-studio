import { unstable_cache } from "next/cache";
import { about, fallbackPosts, home, services, type Post, type Service } from "./content";
import { supabase } from "./supabase";

/**
 * Textos de la web. Si existe la tabla `site_content` en Supabase, sus valores
 * sustituyen a los de lib/content.ts (clave → objeto parcial).
 */
const loadOverrides = unstable_cache(
  async (): Promise<Record<string, unknown>> => {
    if (!supabase) return {};
    const { data, error } = await supabase.from("site_content").select("key, value");
    if (error || !data) return {};
    return Object.fromEntries(data.map((r: { key: string; value: unknown }) => [r.key, r.value]));
  },
  ["site_content"],
  { revalidate: 3600, tags: ["content"] }
);

const getOverrides = async () => (supabase ? loadOverrides() : {});
export async function getHome() {
  const o: Record<string, unknown> = await getOverrides();
  return { ...home, ...((o.home as object) || {}) } as typeof home;
}
export async function getAbout() {
  const o: Record<string, unknown> = await getOverrides();
  return { ...about, ...((o.about as object) || {}) } as typeof about;
}
export async function getServices(): Promise<Service[]> {
  const o: Record<string, unknown> = await getOverrides();
  return services.map((s) => ({ ...s, ...((o[`service:${s.slug}`] as object) || {}) }));
}
export async function getService(slug: string) {
  return (await getServices()).find((s) => s.slug === slug) || null;
}

/** Blog: solo artículos con status = 'published' y fecha ya alcanzada. */
const loadPosts = unstable_cache(
  async (): Promise<Post[]> => {
    if (!supabase) return fallbackPosts;
    const { data, error } = await supabase
      .from("posts")
      .select("slug, title, excerpt, category, published_at, updated_at, cover, body_md, author")
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });
    if (error || !data) return fallbackPosts;
    return data as Post[];
  },
  ["posts"],
  { revalidate: 600, tags: ["posts"] }
);
export const getPosts = async (): Promise<Post[]> => (supabase ? loadPosts() : fallbackPosts);
export async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug) || null;
}
