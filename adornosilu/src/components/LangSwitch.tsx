"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { switchPath, type Lang } from "@/lib/i18n";

export default function LangSwitch({ lang, label, short }: { lang: Lang; label: string; short: string }) {
  const to: Lang = lang === "es" ? "en" : "es";
  return (
    <Link href={switchPath(usePathname() || "/", to)} hrefLang={to === "es" ? "es-VE" : "en"} lang={to === "es" ? "es" : "en"} aria-label={`${short} · ${label}`}
      className="grid min-h-11 min-w-11 place-items-center rounded-full border border-[var(--line)] px-3 text-xs font-semibold tracking-wide hover:border-[var(--accent)]">
      {short}
    </Link>
  );
}
