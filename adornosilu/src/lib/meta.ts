import type { Metadata } from "next";
import { alternates, type Lang } from "./i18n";
import { site } from "./site";

type Key = Parameters<typeof alternates>[0];

// Metadatos de cada página: título ≤ 60, descripción 110–160, canonical + hreflang, Open Graph.
export function pageMeta(o: { key: Key; lang: Lang; p?: string; title: string; description: string; image?: string; type?: "website" | "article" }): Metadata {
  const alt = alternates(o.key, o.lang, o.p);
  return {
    title: o.title,
    description: o.description,
    alternates: alt,
    openGraph: {
      type: o.type ?? "website",
      title: `${o.title} | ${site.name}`,
      description: o.description,
      url: alt.canonical,
      siteName: site.name,
      locale: o.lang === "es" ? "es_VE" : "en_US",
      images: [{ url: o.image ?? "/og.jpg", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image" },
  };
}
