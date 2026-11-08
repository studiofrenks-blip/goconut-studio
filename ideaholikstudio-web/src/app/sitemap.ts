import type { MetadataRoute } from "next";
import { href, locales, siteUrl, type PageKey } from "@/lib/i18n";
import { listPosts } from "@/lib/posts";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const pages: PageKey[] = ["home", "about", "work", "contact", "notice", "privacy", "cookies"];
  const out: MetadataRoute.Sitemap = [];
  for (const p of pages) {
    for (const l of locales) {
      out.push({
        url: base + href(l, p),
        changeFrequency: p === "home" ? "weekly" : "monthly",
        priority: p === "home" ? 1 : ["notice", "privacy", "cookies"].includes(p) ? 0.2 : 0.7,
        alternates: { languages: { es: base + href("es", p), en: base + href("en", p) } },
      });
    }
  }
  for (const l of locales) {
    const posts = await listPosts(l);
    if (posts.length) out.push({ url: base + href(l, "blog"), changeFrequency: "weekly", priority: 0.6 });
    for (const post of posts) {
      out.push({ url: base + href(l, "blog", post.slug), lastModified: post.updated_at || post.published_at, priority: 0.5 });
    }
  }
  return out;
}
