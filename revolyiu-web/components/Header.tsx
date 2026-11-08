"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { services, site } from "@/lib/content";
import { Arrow } from "./Icons";

export default function Header() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open]);

  const isCurrent = (href: string) =>
    href === "/" ? path === "/" : path?.startsWith(href) || (href === "/servicios/" && services.some((s) => path?.startsWith(`/${s.slug}`)));

  return (
    <>
      <header className={`hdr${scrolled || open ? " is-scrolled" : ""}`}>
        <div className="wrap hdr__in">
          <Link href="/" className="hdr__logo" aria-label="Revolyiu, ir al inicio">
            <img src={site.logo.src} width={site.logo.w} height={site.logo.h} alt="Revolyiu" />
          </Link>
          <nav className="hdr__nav" aria-label="Principal">
            <div className="dd">
              <Link href="/servicios/" className="dd__btn" aria-current={isCurrent("/servicios/") ? "page" : undefined} aria-haspopup="true">Servicios <span aria-hidden="true">▾</span></Link>
              <div className="dd__panel">
                {services.map((s) => (
                  <Link key={s.slug} href={`/${s.slug}/`} className="dd__item" aria-current={path?.startsWith(`/${s.slug}`) ? "page" : undefined}>
                    <strong>{s.name}</strong><span>{s.kicker}</span>
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/nosotros/" aria-current={isCurrent("/nosotros/") ? "page" : undefined}>Nosotros</Link>
            <Link href="/blog/" aria-current={isCurrent("/blog/") ? "page" : undefined}>Blog</Link>
            <Link href="/contacto/" aria-current={isCurrent("/contacto/") ? "page" : undefined}>Contacto</Link>
          </nav>
          <Link href="/contacto/" className="btn btn--primary hdr__cta">
            Pide propuesta <Arrow />
          </Link>
          <button className="hdr__burger" aria-expanded={open} aria-controls="menu" aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => setOpen(!open)}>
            <span /><span />
          </button>
        </div>
      </header>
      <div id="menu" className={`menu${open ? " is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <Link href="/servicios/" aria-current={isCurrent("/servicios/") ? "page" : undefined}>Servicios</Link>
        <div className="menu__sub">
          {services.map((s) => (
            <Link key={s.slug} href={`/${s.slug}/`} aria-current={path?.startsWith(`/${s.slug}`) ? "page" : undefined}>{s.name}</Link>
          ))}
        </div>
        <Link href="/nosotros/" aria-current={isCurrent("/nosotros/") ? "page" : undefined}>Nosotros</Link>
        <Link href="/blog/" aria-current={isCurrent("/blog/") ? "page" : undefined}>Blog</Link>
        <Link href="/contacto/" aria-current={isCurrent("/contacto/") ? "page" : undefined}>Contacto</Link>
        <div className="menu__foot">
          <Link href="/contacto/" className="btn btn--primary">Pide tu propuesta <Arrow /></Link>
          <div className="menu__links">
            <a href={site.phoneHref}>Llamar</a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a href={`mailto:${site.email}`}>Email</a>
          </div>
        </div>
      </div>
    </>
  );
}
