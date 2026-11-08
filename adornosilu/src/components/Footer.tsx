import Link from "next/link";
import { legalNav, site } from "@/lib/site";
import { OpenCookieSettings } from "./CookieBanner";

export default function Footer() {
  const c = site.company;
  return (
    <footer className="mt-24 border-t border-[var(--line)] bg-[var(--night)] text-[var(--paper)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6">
        <div className="text-sm leading-relaxed">
          <p className="font-display text-lg">{site.name}</p>
          <p className="mt-2 opacity-80">
            {c.legalName} · R.I.F.: {c.rif}
            <br />
            {c.address}
          </p>
        </div>
        <nav aria-label="Legal">
          <ul className="space-y-2 text-sm">
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="underline-offset-2 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <OpenCookieSettings className="underline-offset-2 hover:underline" />
            </li>
          </ul>
        </nav>
      </div>
      <p className="border-t border-white/10 px-4 py-4 text-center text-xs opacity-70">
        © {new Date().getFullYear()} {c.legalName}
      </p>
    </footer>
  );
}
