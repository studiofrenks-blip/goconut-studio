import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "../globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import Cursor from "@/components/Cursor";
import { href, isLocale, locales, siteUrl, type Locale } from "@/lib/i18n";
import { getTexts } from "@/lib/texts";
import { JsonLd, orgJsonLd } from "@/lib/seo";

const display = localFont({
  src: [{ path: "../../fonts/bricolage.woff2", weight: "200 800", style: "normal" }],
  variable: "--font-display",
  display: "swap",
  declarations: [{ prop: "font-stretch", value: "75% 100%" }],
});
const sans = localFont({ src: "../../fonts/inter.woff2", variable: "--font-sans", display: "swap", weight: "100 900" });

export const revalidate = 300;
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  icons: { icon: "/icon.svg", apple: "/apple-icon.png" },
  formatDetection: { telephone: false },
};
export const viewport: Viewport = { themeColor: "#0e0b1d", width: "device-width", initialScale: 1 };

export default async function LangLayout({ children, params }: { children: React.ReactNode; params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const locale = lang as Locale;
  const t = await getTexts(locale);

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable}`}>
      <body>
        <a className="skip" href="#main">
          {t["nav.skip"]}
        </a>
        <Header
          locale={locale}
          homeHref={href(locale, "home")}
          items={[
            { href: href(locale, "about"), label: t["nav.about"] },
            { href: href(locale, "work"), label: t["nav.work"] },
            { href: href(locale, "blog"), label: t["nav.blog"] },
            { href: href(locale, "contact"), label: t["nav.contact"] },
          ]}
          cta={{ href: href(locale, "contact"), label: t["nav.cta"] }}
          lang={{ label: t["nav.langSwitch"], aria: t["nav.langSwitchLabel"] }}
          t={{ menu: t["nav.menu"], close: t["nav.close"], logoAlt: "Ideaholiks Studio" }}
        />
        <main id="main">{children}</main>
        <Footer locale={locale} t={t} />
        <CookieBanner
          policyHref={href(locale, "cookies")}
          t={{
            title: t["cookies.title"],
            body: t["cookies.body"],
            accept: t["cookies.accept"],
            reject: t["cookies.reject"],
            configure: t["cookies.configure"],
            save: t["cookies.save"],
            necessary: t["cookies.necessary"],
            necessaryText: t["cookies.necessaryText"],
            analytics: t["cookies.analytics"],
            analyticsText: t["cookies.analyticsText"],
            more: t["cookies.more"],
          }}
        />
        <Cursor />
        <JsonLd data={orgJsonLd(locale)} />
      </body>
    </html>
  );
}
