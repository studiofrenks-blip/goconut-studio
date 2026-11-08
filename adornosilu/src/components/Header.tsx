import Link from "next/link";
import { nav, site } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="font-display whitespace-nowrap text-xl font-semibold tracking-tight">
          {site.name}
        </Link>
        <nav aria-label="Principal" className="hidden sm:block">
          <ul className="flex gap-6 text-sm">
            {nav.map((n) => (
              <li key={n.href}><Link href={n.href} className="hover:text-[var(--gold-ink)]">{n.label}</Link></li>
            ))}
          </ul>
        </nav>
        <details className="relative sm:hidden">
          <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-full border border-[var(--line)] px-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
            Menú
          </summary>
          <nav aria-label="Principal (móvil)" className="absolute right-0 mt-2 w-56 rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-2 shadow-xl">
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
