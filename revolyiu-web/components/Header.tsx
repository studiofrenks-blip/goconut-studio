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
            {services.map((s) => (
              <Link key={s.slug} href={`/${s.slug}/`} aria-current={path?.startsWith(`/${s.slug}`) ? "page" : undefined}>
                {s.navLabel}
              </Link>
            ))}
            <Link href="/nosotros/" aria-current={isCurrent("/nosotros/") ? "page" : undefined}>Nosotros</Link>
            <Link href="/blog/" aria-current={isCurrent("/blog/") ? "page" : undefined}>Blog</Link>
          </nav>
          <Link href="/contacto/" className="btn btn--primary hdr__cta" data-magnetic>
            Escríbenos <Arrow />
          </Link>
          <button className="hdr__burger" aria-expanded={open} aria-controls="menu" aria-label={open ? "Cerrar menú" : "Abrir menú"} onClick={() => setOpen(!open)}>
            <span /><span />
          </button>
        </div>
      </header>
      <div id="menu" className={`menu${open ? " is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <Link href="/">Inicio</Link>
        <Link href="/nosotros/">Nosotros</Link>
        <Link href="/servicios/">Servicios</Link>
        <div className="menu__sub">
          {services.map((s) => (
            <Link key={s.slug} href={`/${s.slug}/`}>{s.name}</Link>
          ))}
        </div>
        <Link href="/blog/">Blog</Link>
        <Link href="/contacto/">Contacto</Link>
        <div className="menu__foot">
          <a href={site.phoneHref}>{site.phone}</a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>
    </>
  );
}
