import type { Metadata } from "next";
import { site } from "./content";

export const isProd = process.env.SITE_ENV === "production";

export function pageMeta({ title, description, path, image, type = "website" }: {
  title: string; description: string; path: string; image?: string; type?: "website" | "article";
}): Metadata {
  const url = `${site.url}${path}`;
  const og = image || "/og.png";
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title: `${title} | Revolyiu`, description, url, siteName: "Revolyiu", locale: "es_ES", type, images: [{ url: og, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: `${title} | Revolyiu`, description, images: [og] },
  };
}

export const orgLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#org`,
  name: "Revolyiu",
  description: site.description,
  url: site.url,
  logo: `${site.url}/img/logo-revolyiu.png`,
  image: `${site.url}/og.png`,
  email: site.email,
  telephone: site.phone.replace(/\s/g, ""),
  areaServed: [{ "@type": "Country", name: "España" }, { "@type": "Country", name: "Estados Unidos" }],
  sameAs: [site.youtube],
  knowsLanguage: "es",
};

export const crumbsLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
});
