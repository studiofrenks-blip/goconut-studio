import type { MetadataRoute } from "next";
import { isIndexable, siteUrl } from "@/lib/i18n";

export default function robots(): MetadataRoute.Robots {
  // En la dirección de prueba no se indexa nada. Solo con SITE_INDEXABLE=1.
  if (!isIndexable()) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${siteUrl()}/sitemap.xml`, host: siteUrl() };
}
