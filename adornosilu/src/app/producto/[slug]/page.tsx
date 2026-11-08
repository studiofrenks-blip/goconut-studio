import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getProduct, products } from "@/lib/products";
import { site } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: `${p.name} de Adornos ILU, fabricado en Venezuela.`,
    alternates: { canonical: `/producto/${p.slug}` },
  };
}

export default async function Producto({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const c = getCategory(p.category)!;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    brand: { "@type": "Brand", name: site.name },
    category: c.name,
    url: `${site.url}/producto/${p.slug}`,
  };
  return (
    <article className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <nav aria-label="Migas de pan" className="text-sm">
        <Link href="/tienda">Tienda</Link> / <Link href={`/tienda/${c.slug}`}>{c.name}</Link> / {p.name}
      </nav>
      <h1 className="font-display mt-3 text-4xl sm:text-5xl">{p.name}</h1>
      {/* PENDIENTE: galería, descripción, medidas, precio y botón de compra (respaldo + Supabase). */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </article>
  );
}
