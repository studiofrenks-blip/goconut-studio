import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { isProd } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!isProd) return { rules: { userAgent: "*", disallow: "/" } }; // web de pruebas: fuera de Google
  return { rules: { userAgent: "*", allow: "/", disallow: "/api/" }, sitemap: `${site.url}/sitemap.xml`, host: site.url };
}
