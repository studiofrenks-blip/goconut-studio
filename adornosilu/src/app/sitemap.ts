import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { categories, products } from "@/lib/products";
import { posts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = ["", "/nosotros", "/tienda", "/blog", "/contacto"].map((p) => ({ url: `${site.url}${p}` }));
  return [
    ...base,
    ...categories.map((c) => ({ url: `${site.url}/tienda/${c.slug}` })),
    ...products.map((p) => ({ url: `${site.url}/producto/${p.slug}` })),
    ...posts.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date })),
  ];
}
