import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import { categories, getCategory, productsIn } from "@/lib/products";

export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ categoria: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ categoria: string }> }): Promise<Metadata> {
  const c = getCategory((await params).categoria);
  if (!c) return {};
  return { title: c.title, description: c.intro, alternates: { canonical: `/tienda/${c.slug}` } };
}

export default async function Categoria({ params }: { params: Promise<{ categoria: string }> }) {
  const c = getCategory((await params).categoria);
  if (!c) notFound();
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <nav aria-label="Migas de pan" className="text-sm"><Link href="/tienda" className="underline-offset-2 hover:underline">Tienda</Link> / {c.name}</nav>
      <h1 className="font-display mt-3 text-4xl sm:text-5xl">{c.title}</h1>
      <p className="mt-4 max-w-2xl text-lg">{c.intro}</p>
      <ul className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {productsIn(c.slug).map((p) => <li key={p.slug}><ProductCard p={p} /></li>)}
      </ul>
    </section>
  );
}
