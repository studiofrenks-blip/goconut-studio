import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo de pinos, coronas y guirnaldas navideñas",
  description: "Catálogo Adornos ILU: pinos de Navidad Canadian King, Monterrey y Victoria, pinos gigantes, coronas y guirnaldas fabricadas en Venezuela.",
  alternates: { canonical: "/catalogo" },
};

export default function Catalogo() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl">Catálogo</h1>
      <nav aria-label="Categorías" className="mt-6 flex flex-wrap gap-2">
        {categories.map((c) => (
          <Link key={c.slug} href={`/catalogo/${c.slug}`} className="rounded-full border border-[var(--line)] px-4 py-2 text-sm hover:border-[var(--gold)]">{c.name}</Link>
        ))}
      </nav>
      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {products.map((p) => <li key={p.slug}><ProductCard p={p} /></li>)}
      </ul>
    </section>
  );
}
