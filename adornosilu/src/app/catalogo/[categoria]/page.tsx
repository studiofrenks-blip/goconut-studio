import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { categories, getCategory, productsIn } from "@/lib/products";

export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ categoria: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ categoria: string }> }): Promise<Metadata> {
  const c = getCategory((await params).categoria);
  if (!c) return {};
  return { title: c.title, description: c.intro, alternates: { canonical: `/catalogo/${c.slug}` } };
}

export default async function Categoria({ params }: { params: Promise<{ categoria: string }> }) {
  const c = getCategory((await params).categoria);
  if (!c) notFound();
  return (
    <>
      <PageHero eyebrow="Catálogo" before={c.title} text={c.intro}>
        <nav aria-label="Categorías" className="mt-8 flex flex-wrap gap-2">
          <Link href="/catalogo" className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm hover:border-[var(--gold)]">Todo</Link>
          {categories.map((k) => (
            <Link key={k.slug} href={`/catalogo/${k.slug}`} aria-current={k.slug === c.slug ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-sm ${k.slug === c.slug ? "bg-[var(--night)] text-white" : "border border-[var(--line)] bg-white hover:border-[var(--gold)]"}`}>{k.name}</Link>
          ))}
        </nav>
      </PageHero>
      <section className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <ul className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {productsIn(c.slug).map((p) => <li key={p.slug}><ProductCard p={p} /></li>)}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
