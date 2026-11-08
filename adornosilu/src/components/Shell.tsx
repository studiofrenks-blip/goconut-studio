import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import CookieBanner from "./CookieBanner";
import Cursor from "./Cursor";
import Footer from "./Footer";
import Header from "./Header";
import WhatsAppFloat from "./WhatsAppFloat";
import { t } from "@/lib/dict";
import type { Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

// Fuentes autoalojadas con precarga y ajuste de métricas (evita saltos al cargar).
const display = localFont({ src: "../fonts/bricolage.woff2", variable: "--font-bricolage", weight: "200 800", style: "normal", display: "swap", declarations: [{ prop: "font-stretch", value: "75% 100%" }] });
const sans = localFont({ src: "../fonts/inter.woff2", variable: "--font-inter", weight: "100 900", display: "swap" });

export const baseMetadata = (lang: Lang): Metadata => ({
  metadataBase: new URL(site.url),
  title: { default: lang === "es" ? "Adornos ILU | Pinos, coronas y guirnaldas" : "Adornos ILU | Christmas trees and wreaths", template: `%s | ${site.name}` },
  robots: site.indexable ? { index: true, follow: true } : { index: false, follow: false },
});

export const viewport: Viewport = { themeColor: "#2a0a12", width: "device-width", initialScale: 1 };

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.company.legalName,
  url: site.url,
  logo: `${site.url}/marca/logo-ilu-blanco.png`,
  taxID: site.company.rif,
  email: site.company.email,
  telephone: site.company.phoneHref,
  address: { "@type": "PostalAddress", streetAddress: "Zona Industrial Soco, Avenida El Parque, galpón No. 19", addressLocality: "La Victoria", addressRegion: "Aragua", addressCountry: "VE" },
};

export default function Shell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const d = t(lang);
  return (
    <html lang={lang === "es" ? "es-VE" : "en"} className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      {/* eslint-disable-next-line @next/next/no-head-element */}
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-[var(--accent)] focus:px-4 focus:py-2 focus:text-[var(--bg)]">{d.skip}</a>
        <Header lang={lang} />
        <main id="main">{children}</main>
        <Footer lang={lang} />
        <WhatsAppFloat lang={lang} />
        <CookieBanner lang={lang} />
        <Cursor />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </body>
    </html>
  );
}
