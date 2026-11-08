import type { Metadata } from "next";
import { alternates, isIndexable, siteUrl, type Locale, type PageKey } from "@/lib/i18n";

export function pageMeta(
  locale: Locale,
  page: PageKey,
  title: string,
  description: string,
  opts: { extra?: Partial<Record<Locale, string>>; image?: string; type?: "website" | "article"; noindex?: boolean } = {}
): Metadata {
  const alt = alternates(locale, page, opts.extra);
  const image = opts.image || `${siteUrl()}/og/${locale}.jpg`;
  const index = isIndexable() && !opts.noindex;
  return {
    title: { absolute: title },
    description,
    alternates: alt,
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: opts.type || "website",
      url: alt.canonical,
      siteName: "Ideaholiks Studio",
      title,
      description,
      locale: locale === "es" ? "es_ES" : "en_US",
      alternateLocale: locale === "es" ? ["en_US"] : ["es_ES"],
      images: [{ url: image, width: 1200, height: 630, alt: "Ideaholiks Studio" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export function orgJsonLd(locale: Locale) {
  const base = siteUrl();
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${base}/#org`,
        name: "Ideaholiks Studio",
        url: base,
        logo: `${base}/img/ideaholiks-logo.svg`,
        description:
          locale === "es"
            ? "Estudio creativo de branding, web, marketing de influencers y producción de shows."
            : "Creative studio for branding, web, influencer marketing and show production.",
        founder: [
          { "@type": "Person", name: "Francisco ACM" },
          { "@type": "Person", name: "Manuel ARJ" },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${base}/#web`,
        url: base,
        name: "Ideaholiks Studio",
        inLanguage: ["es", "en"],
        publisher: { "@id": `${base}/#org` },
      },
    ],
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
  );
}
