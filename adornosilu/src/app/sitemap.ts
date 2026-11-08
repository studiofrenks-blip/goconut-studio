import type { MetadataRoute } from "next";
import { path } from "@/lib/i18n";
import { categories, products } from "@/lib/products";
import { posts } from "@/lib/posts";
import { site } from "@/lib/site";

type K = Parameters<typeof path>[0];
const entry = (k: K, p?: string): MetadataRoute.Sitemap[number] => ({
  url: site.url + path(k, "es", p),
  alternates: { languages: { "es-VE": site.url + path(k, "es", p), en: site.url + path(k, "en", p) } },
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...(["home", "about", "catalog", "blog", "contact", "legal", "privacy", "cookies", "terms", "withdrawal"] as K[]).map((k) => entry(k)),
    ...categories.map((c) => entry("category", c.slug)),
    ...products.map((p) => entry("product", p.slug)),
    ...posts.map((p) => entry("post", p.slug)),
  ];
}
