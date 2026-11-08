"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { translatePath } from "@/lib/i18n";

type NavItem = { href: string; label: string };
type Props = {
  homeHref: string;
  items: NavItem[];
  cta: NavItem;
  locale: "es" | "en";
  lang: { label: string; aria: string };
  t: { menu: string; close: string; logoAlt: string };
};

export default function Header({ homeHref, items, cta, locale, lang, t }: Props) {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const other = locale === "es" ? "en" : "es";
  const langHref = translatePath(pathname, other);
  const isCurrent = (h: string) => pathname === h || (h !== homeHref && pathname.startsWith(h + "/"));

  return (
    <header className="site-header" data-solid={solid || open ? "1" : "0"}>
      <div className="wrap bar">
        <Link href={homeHref} className="logo" aria-label={t.logoAlt}>
          {/* SVG del logo: 64 px de alto (antes 438 px). */}
          <img src="/img/ideaholiks-logo.svg" alt={t.logoAlt} width={151} height={64} />
        </Link>
        <nav className="nav" aria-label="Principal">
          {items.map((i) => (
            <Link key={i.href} href={i.href} aria-current={isCurrent(i.href) ? "page" : undefined}>
              {i.label}
            </Link>
          ))}
        </nav>
        <a className="lang" href={langHref} hrefLang={other} lang={other} aria-label={lang.aria}>
          {lang.label}
        </a>
        <Link href={cta.href} className="btn btn-lime header-cta">
          {cta.label}
        </Link>
        <button
          className="menu-btn"
          aria-expanded={open}
          aria-controls="mobile-panel"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? t.close : t.menu}
        </button>
      </div>
      <div id="mobile-panel" className="mobile-panel" data-open={open ? "1" : "0"} hidden={!open}>
        <nav aria-label="Móvil">
          {items.map((i) => (
            <Link key={i.href} href={i.href} aria-current={isCurrent(i.href) ? "page" : undefined}>
              {i.label}
            </Link>
          ))}
        </nav>
        <Link href={cta.href} className="btn btn-lime">
          {cta.label}
        </Link>
        <a className="lang" href={langHref} hrefLang={other} lang={other} aria-label={lang.aria}>
          {lang.label}
        </a>
      </div>
    </header>
  );
}
