import Image from "next/image";
import Link from "next/link";
import { legalNav, nav, site } from "@/lib/site";
import { categories } from "@/lib/products";
import { OpenCookieSettings } from "./CookieBanner";

export default function Footer() {
  const c = site.company;
  return (
    <footer className="mt-28 bg-[var(--night)] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Image src="/marca/logo-ilu-blanco.png" alt={site.name} width={605} height={892} className="h-24 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">{site.tagline}. Más de 60 años fabricando pinos, coronas y guirnaldas.</p>
        </div>
        <nav aria-label="Web">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">Web</p>
          <ul className="mt-4 space-y-2 text-sm">{nav.map((n) => <li key={n.href}><Link href={n.href} className="text-white/80 hover:text-white">{n.label}</Link></li>)}</ul>
        </nav>
        <nav aria-label="Catálogo">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">Catálogo</p>
          <ul className="mt-4 space-y-2 text-sm">{categories.map((k) => <li key={k.slug}><Link href={`/catalogo/${k.slug}`} className="text-white/80 hover:text-white">{k.name}</Link></li>)}</ul>
        </nav>
        <div className="text-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--gold)]">Contacto</p>
          <ul className="mt-4 space-y-2 text-white/80">
            <li><a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener" className="hover:text-white">WhatsApp {c.phone}</a></li>
            <li><a href={`mailto:${c.email}`} className="hover:text-white">{c.email}</a></li>
            <li>{c.hours}</li>
            <li className="text-white/60">La Victoria, Aragua, Venezuela</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-6 text-xs text-white/60 sm:px-6 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {c.legalName} · R.I.F. {c.rif}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {legalNav.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>)}
            <li><OpenCookieSettings className="hover:text-white" /></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
