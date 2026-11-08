import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Motion from "@/components/Motion";
import JsonLd from "@/components/JsonLd";
import { WhatsApp } from "@/components/Icons";
import MobileBar from "@/components/MobileBar";
import { site } from "@/lib/content";
import { isProd, orgLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Revolyiu | Agencia creativa integral", template: "%s | Revolyiu" },
  description: site.description,
  applicationName: "Revolyiu",
  // La web de pruebas nunca se indexa. Solo con SITE_ENV=production.
  robots: isProd ? { index: true, follow: true } : { index: false, follow: false, nocache: true },
  formatDetection: { telephone: false },
};
export const viewport: Viewport = { themeColor: "#05060a", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "(function(d){d.classList.add('js');try{var c=JSON.parse(localStorage.getItem('rv-consent'));if(c&&c.v===1&&Date.now()-new Date(c.ts)<31536e6)d.classList.add('has-consent')}catch(e){}})(document.documentElement)" }} />
      </head>
      <body>
        <a href="#main" className="skip">Saltar al contenido</a>
                        <Header />
        <main id="main">{children}</main>
        <Footer />
        <a className="wa" href={site.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Escríbenos por WhatsApp"><WhatsApp /></a>
        <MobileBar />
        <CookieBanner />
        <Motion />
        <JsonLd data={orgLd} />
      </body>
    </html>
  );
}
