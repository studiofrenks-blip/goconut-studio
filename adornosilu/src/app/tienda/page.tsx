import type { Metadata } from "next";
import Link from "next/link";
import { categories, productsIn } from "@/lib/products";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Pinos, coronas y guirnaldas navideñas Adornos ILU: Canadian King, Slim Deluxe, Monterrey, Victoria y más.",
  alternates: { canonical: "/tienda" },
};

export default function Tienda() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl">Tienda</h1>
      {categories.map((c) => (
        <div key={c.slug} className="mt-14">
          <h2 className="font-display text-2xl">
            <Link href={`/tienda/${c.slug}`} className="hover:text-[var(--gold-ink)]">{c.name}</Link>
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {productsIn(c.slug).map((p) => (
              <li key={p.slug}>
                <Link href={`/producto/${p.slug}`} className="block rounded-2xl border border-[var(--line)] p-5 hover:border-[var(--gold)]">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
