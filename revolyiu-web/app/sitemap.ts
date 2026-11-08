import type { MetadataRoute } from "next";
import { services, site } from "@/lib/content";
import { getPosts } from "@/lib/data";

export const revalidate = 3600;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const u = (p: string) => `${site.url}${p}`;
  const posts = await getPosts();
  return [
    { url: u("/"), changeFrequency: "monthly", priority: 1 },
    { url: u("/servicios/"), changeFrequency: "monthly", priority: 0.9 },
    ...services.map((s) => ({ url: u(`/${s.slug}/`), changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: u("/nosotros/"), changeFrequency: "yearly", priority: 0.6 },
    { url: u("/contacto/"), changeFrequency: "yearly", priority: 0.7 },
    { url: u("/blog/"), changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({ url: u(`/blog/${p.slug}/`), lastModified: new Date(p.updated_at || p.published_at), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...["/aviso-legal/", "/politica-de-privacidad/", "/politica-de-cookies/"].map((p) => ({ url: u(p), changeFrequency: "yearly" as const, priority: 0.2 })),
  ];
}
