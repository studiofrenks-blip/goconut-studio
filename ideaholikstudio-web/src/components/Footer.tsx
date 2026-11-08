import Link from "next/link";
import CookieSettingsLink from "./CookieSettingsLink";
import { href, type Locale } from "@/lib/i18n";
import type { Texts } from "@/content/texts";

export default function Footer({ locale, t }: { locale: Locale; t: Texts }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div className="brand-col">
            <img src="/img/ideaholiks-logo.svg" alt="Ideaholiks Studio" width={151} height={64} loading="lazy" />
            <p>{t["footer.tagline"]}</p>
          </div>
          <div>
            <p className="foot-title">{t["footer.explore"]}</p>
            <ul className="foot-links">
              <li><Link href={href(locale, "home")}>{t["nav.home"]}</Link></li>
              <li><Link href={href(locale, "about")}>{t["nav.about"]}</Link></li>
              <li><Link href={href(locale, "work")}>{t["nav.work"]}</Link></li>
              <li><Link href={href(locale, "blog")}>{t["nav.blog"]}</Link></li>
              <li><Link href={href(locale, "contact")}>{t["nav.contact"]}</Link></li>
            </ul>
          </div>
          <div>
            <p className="foot-title">{t["footer.services"]}</p>
            <ul className="foot-links">
              <li><Link href={href(locale, "home") + "#servicios"}>{t["home.s1Title"]}</Link></li>
              <li><Link href={href(locale, "home") + "#servicios"}>{t["home.s2Title"]}</Link></li>
              <li><Link href={href(locale, "home") + "#servicios"}>{t["home.s3Title"]}</Link></li>
              <li><Link href={href(locale, "home") + "#servicios"}>{t["home.s4Title"]}</Link></li>
            </ul>
          </div>
          <div>
            <p className="foot-title">{t["footer.legal"]}</p>
            <ul className="foot-links">
              <li><Link href={href(locale, "notice")}>{t["footer.notice"]}</Link></li>
              <li><Link href={href(locale, "privacy")}>{t["footer.privacy"]}</Link></li>
              <li><Link href={href(locale, "cookies")}>{t["footer.cookies"]}</Link></li>
              <li><CookieSettingsLink label={t["footer.cookieSettings"]} /></li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© {year} Ideaholiks Studio. {t["footer.rights"]}</span>
          <span>ideaholikstudio.com</span>
        </div>
      </div>
    </footer>
  );
}
