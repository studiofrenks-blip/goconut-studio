import Image from "next/image";
import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[var(--night)]/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-2 sm:px-6">
        <Link href="/" aria-label={`${site.name}, inicio`} className="block">
          <Image src="/marca/logo-ilu-blanco.png" alt={site.name} width={605} height={892} priority className="h-14 w-auto" />
        </Link>
        <nav aria-label="Principal" className="hidden sm:block">
          <ul className="flex gap-7 text-sm">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="opacity-90 hover:text-[var(--gold)] hover:opacity-100">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <details className="relative sm:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-full border border-white/30 px-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
            Menú
          </summary>
          <nav aria-label="Principal (móvil)" className="absolute right-0 mt-2 w-56 rounded-2xl bg-[var(--paper)] p-2 text-[var(--ink)] shadow-xl">
            <ul>
              {nav.map((n) => (
                <li key={n.href}><Link href={n.href} className="block rounded-xl px-4 py-3 hover:bg-[var(--line)]">{n.label}</Link></li>
              ))}
            </ul>
          </nav>
        </details>
      </div>
    </header>
  );
}
