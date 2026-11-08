import type { Metadata } from "next";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { categories, productsIn } from "@/lib/products";

export const metadata: Metadata = {
  title: "Catálogo de pinos, coronas y guirnaldas navideñas",
  description: "Catálogo Adornos ILU: pinos de Navidad Canadian King, Monterrey y Victoria, pinos gigantes, coronas y guirnaldas fabricadas en Venezuela.",
  alternates: { canonical: "/catalogo" },
};

export default function Catalogo() {
  return (
    <>
      <PageHero eyebrow="Catálogo 2026" before="Pinos," pill="/productos/corona-canadian-king-rck/corona-canadian-king-rck-1.jpg" after="coronas y guirnaldas." text="Fabricados en Venezuela. Elige el modelo y te enviamos disponibilidad por WhatsApp.">
        <nav aria-label="Categorías" className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <a key={c.slug} href={`#${c.slug}`} className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm hover:border-[var(--gold)]">{c.name}</a>
          ))}
        </nav>
      </PageHero>
      {categories.map((c) => (
        <section key={c.slug} id={c.slug} aria-labelledby={`h-${c.slug}`} className="mx-auto mt-20 max-w-6xl scroll-mt-28 px-4 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-[var(--line)] pb-4">
            <div>
              <h2 id={`h-${c.slug}`} className="font-display text-3xl sm:text-4xl">{c.name}</h2>
              <p className="mt-2 max-w-2xl text-[var(--ink)]/75">{c.intro}</p>
            </div>
            <Link href={`/catalogo/${c.slug}`} className="text-sm font-semibold underline underline-offset-4">Ver categoría →</Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {productsIn(c.slug).filter((p) => c.slug === "pinos-gigantes" || p.categories[0] === c.slug).map((p) => <li key={p.slug}><ProductCard p={p} /></li>)}
          </ul>
        </section>
      ))}
      <CtaBand />
    </>
  );
}
