import { cache } from "react";
import type { Locale } from "@/lib/i18n";
import { supabasePublic } from "@/lib/supabase";

export type Post = {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  body_md: string;
  cover_url: string | null;
  cover_alt: string | null;
  published_at: string;
  updated_at: string | null;
  translation_slug: string | null;
};

const FIELDS =
  "slug,locale,title,description,body_md,cover_url,cover_alt,published_at,updated_at,translation_slug";

/** Solo artículos publicados (status = 'published' y fecha ya alcanzada). */
export const listPosts = cache(async (locale: Locale): Promise<Post[]> => {
  const sb = supabasePublic();
  if (!sb) return [];
  try {
    const { data, error } = await sb
      .from("posts")
      .select(FIELDS)
      .eq("locale", locale)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false })
      .limit(100);
    return error || !data ? [] : (data as Post[]);
  } catch {
    return [];
  }
});

export const getPost = cache(async (locale: Locale, slug: string): Promise<Post | null> => {
  const sb = supabasePublic();
  if (!sb) return null;
  try {
    const { data, error } = await sb
      .from("posts")
      .select(FIELDS)
      .eq("locale", locale)
      .eq("slug", slug)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .maybeSingle();
    return error || !data ? null : (data as Post);
  } catch {
    return null;
  }
});

export function readingMinutes(md: string): number {
  return Math.max(1, Math.round(md.split(/\s+/).filter(Boolean).length / 220));
}
