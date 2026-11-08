import Image from "next/image";
import Link from "next/link";
import { t } from "@/lib/dict";
import { path, type Lang } from "@/lib/i18n";
import LangSwitch from "./LangSwitch";
import NavLinks from "./NavLinks";
import { categories } from "@/lib/products";
import { catText } from "@/lib/products-en";
import { site } from "@/lib/site";

export default function Header({ lang }: { lang: Lang }) {
  const d = t(lang);
  const nav = [
    [path("home", lang), d.nav.home], [path("about", lang), d.nav.about], [path("catalog", lang), d.nav.catalog],
    [path("blog", lang), d.nav.blog], [path("contact", lang), d.nav.contact],
  ] as const;
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link href={path("home", lang)} className="flex items-center gap-2.5" aria-label="Adornos ILU">
          <Image src="/marca/logo-ilu-blanco.png" alt="Adornos ILU" width={605} height={892} priority className="h-11 w-auto" />
        </Link>
        <nav aria-label={d.menu} className="hidden lg:block">
          <NavLinks items={nav} home={path("home", lang)} />
        </nav>
        <div className="flex items-center gap-2">
          <Link href={path("catalog", lang)} className="hidden min-h-11 items-center rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-[var(--bg)] sm:inline-flex">{d.seeCatalog}</Link>
          <LangSwitch lang={lang} label={d.langName} short={d.langShort} />
          <details className="relative lg:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-full border border-[var(--line)] px-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">{d.menu}</summary>
            <nav aria-label={`${d.menu} (móvil)`} className="absolute right-0 mt-2 w-64 rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] p-2 shadow-2xl">
              <ul>{nav.map(([h, l]) => <li key={h}><Link href={h} className="block rounded-xl px-4 py-3 hover:bg-[var(--bg-3)]">{l}</Link></li>)}</ul>
              <p className="mt-2 border-t border-[var(--line)] px-4 pb-1 pt-3 text-xs font-semibold uppercase tracking-wide text-[var(--accent)]">{d.nav.catalog}</p>
              <ul>{categories.map((k) => <li key={k.slug}><Link href={path("category", lang, k.slug)} className="block rounded-xl px-4 py-2.5 text-sm hover:bg-[var(--bg-3)]">{catText(k, lang).name}</Link></li>)}</ul>
              <a href={`https://wa.me/${site.company.whatsapp}`} target="_blank" rel="noopener" className="mt-2 flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] font-semibold text-[var(--bg)]">WhatsApp</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
