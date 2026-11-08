import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";

// Barra tipo cristal: clara, translúcida y fina, como en las webs de producto más cuidadas.
export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-[var(--paper)]/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" aria-label={`${site.name}, inicio`} className="flex items-center gap-2">
          <Image src="/marca/logo-ilu-blanco.png" alt="" width={605} height={892} priority className="h-9 w-auto invert" />
          <span className="font-display text-[15px] tracking-tight">Adornos ILU</span>
        </Link>
        <nav aria-label="Principal" className="hidden sm:block">
          <ul className="flex gap-7 text-[13px] text-[var(--ink)]/80">
            {nav.map((n) => (<li key={n.href}><Link href={n.href} className="hover:text-[var(--ink)]">{n.label}</Link></li>))}
          </ul>
        </nav>
        <Link href="/catalogo" className="hidden rounded-full bg-[var(--ink)] px-4 py-1.5 text-[13px] font-medium text-white sm:inline-block">Catálogo</Link>
        <details className="relative sm:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-full px-3 text-sm font-medium [&::-webkit-details-marker]:hidden">Menú</summary>
          <nav aria-label="Principal (móvil)" className="absolute right-0 mt-2 w-56 rounded-2xl border border-black/5 bg-white p-2 shadow-xl">
            <ul>{nav.map((n) => (<li key={n.href}><Link href={n.href} className="block rounded-xl px-4 py-3 hover:bg-[var(--paper)]">{n.label}</Link></li>))}</ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
