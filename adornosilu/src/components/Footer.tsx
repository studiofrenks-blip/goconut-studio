import Image from "next/image";
import Link from "next/link";
import { categories } from "@/lib/products";
import { catText } from "@/lib/products-en";
import { t } from "@/lib/dict";
import { path, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { OpenCookieSettings } from "./CookieBanner";

export default function Footer({ lang }: { lang: Lang }) {
  const d = t(lang); const c = site.company;
  const nav = [[path("home", lang), d.nav.home], [path("about", lang), d.nav.about], [path("catalog", lang), d.nav.catalog], [path("blog", lang), d.nav.blog], [path("contact", lang), d.nav.contact]] as const;
  const legal = [[path("legal", lang), d.legalNav.legal], [path("privacy", lang), d.legalNav.privacy], [path("cookies", lang), d.legalNav.cookies], [path("terms", lang), d.legalNav.terms], [path("withdrawal", lang), d.legalNav.withdrawal]] as const;
  const h = "eyebrow";
  return (
    <footer className="mt-24 border-t border-[var(--line)] sm:mt-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Image src="/marca/logo-ilu-blanco.png" alt="Adornos ILU" width={605} height={892} className="h-14 w-auto sm:h-20" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-[var(--cream-2)]">{d.tagline}.</p>
        </div>
        <nav aria-label={d.footer.web}><p className={h}>{d.footer.web}</p>
          <ul className="mt-4 space-y-1 text-sm">{nav.map(([u, l]) => <li key={u}><Link href={u} className="inline-flex min-h-8 items-center text-[var(--cream-2)] hover:text-[var(--cream)]">{l}</Link></li>)}</ul></nav>
        <nav aria-label={d.footer.catalog}><p className={h}>{d.footer.catalog}</p>
          <ul className="mt-4 space-y-1 text-sm">{categories.map((k) => <li key={k.slug}><Link href={path("category", lang, k.slug)} className="inline-flex min-h-8 items-center text-[var(--cream-2)] hover:text-[var(--cream)]">{catText(k, lang).name}</Link></li>)}</ul></nav>
        <div className="text-sm"><p className={h}>{d.footer.contact}</p>
          <ul className="mt-4 space-y-2 text-[var(--cream-2)] [&>li]:whitespace-nowrap">
            <li><a href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener" className="inline-flex min-h-8 items-center hover:text-[var(--cream)]">WhatsApp {c.phone}</a></li>
            <li><a href={`mailto:${c.email}`} className="inline-flex min-h-8 items-center hover:text-[var(--cream)]">{c.email}</a></li>
            <li>{lang === "es" ? c.hours : "Monday to Friday, 9:00 to 18:00"}</li>
            <li>{d.footer.place}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 text-xs text-[var(--cream-2)] sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {c.legalName} · R.I.F. {c.rif}</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-3">
            {legal.map(([u, l]) => <li key={u}><Link href={u} className="-my-3 inline-flex min-h-11 items-center hover:text-[var(--cream)]">{l}</Link></li>)}
            <li><OpenCookieSettings className="-my-3 inline-flex min-h-11 items-center hover:text-[var(--cream)]" label={d.footer.cookies} /></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
