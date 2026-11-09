"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Menú principal con la página actual marcada (subrayado dorado).
export default function NavLinks({ items, home }: { items: readonly (readonly [string, string])[]; home: string }) {
  const p = usePathname() || "/";
  const on = (h: string) => (h === home ? p === h : p === h || p.startsWith(h + "/") || (/catalog/.test(h) && /\/(producto|product)\//.test(p)));
  return (
    <ul className="flex gap-7 text-sm text-[var(--cream-2)]">
      {items.map(([h, l]) => (
        <li key={h}>
          <Link href={h} aria-current={on(h) ? "page" : undefined}
            className={`inline-flex min-h-11 items-center border-b-2 hover:text-[var(--cream)] ${on(h) ? "border-[var(--accent)] text-[var(--cream)]" : "border-transparent"}`}>{l}</Link>
        </li>
      ))}
    </ul>
  );
}
