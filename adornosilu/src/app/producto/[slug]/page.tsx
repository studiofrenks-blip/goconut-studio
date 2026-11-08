import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, primaryCategory, products } from "@/lib/products";
import { site } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: `/producto/${p.slug}` },
    openGraph: { images: p.images.slice(0, 1) },
  };
}

export default async function Producto({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const c = primaryCategory(p);
  // PROVISIONAL: la web actual no tiene precios; el pedido se hace por WhatsApp hasta decidir el checkout.
  const wa = `https://wa.me/${site.company.whatsapp}?text=${encodeURIComponent(`Hola, quiero información sobre ${p.name} (${p.code}).`)}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.code,
    description: p.summary,
    image: p.images.map((i) => site.url + i),
    brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@type": "Organization", name: site.company.legalName },
    category: c.name,
    url: `${site.url}/producto/${p.slug}`,
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Catálogo", item: `${site.url}/catalogo` },
      { "@type": "ListItem", position: 2, name: c.name, item: `${site.url}/catalogo/${c.slug}` },
      { "@type": "ListItem", position: 3, name: p.name },
    ],
  };
  return (
    <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <nav aria-label="Migas de pan" className="text-sm">
        <Link href="/catalogo" className="underline-offset-2 hover:underline">Catálogo</Link> / <Link href={`/catalogo/${c.slug}`} className="underline-offset-2 hover:underline">{c.name}</Link> / {p.name}
      </nav>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-3">
          {p.images.map((src, i) => (
            <div key={src} className={`relative overflow-hidden rounded-2xl bg-white ${i === 0 ? "col-span-2 aspect-square" : "aspect-square"}`}>
              <Image src={src} alt={i === 0 ? p.name : `${p.name}, detalle ${i}`} fill priority={i === 0} sizes={i === 0 ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, 50vw"} className="object-cover" />
            </div>
          ))}
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--gold-ink)]">{p.code}</p>
          <h1 className="font-display mt-2 text-4xl sm:text-5xl">{p.name}</h1>
          <div className="mt-6 space-y-4 leading-relaxed">{p.body.map((t) => <p key={t}>{t}</p>)}</div>

          {p.models.length > 0 && (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <caption className="mb-2 text-left font-semibold">Modelos disponibles</caption>
                <thead>
                  <tr className="border-b border-[var(--line)]">
                    <th scope="col" className="py-2 pr-4">Modelo</th>
                    {p.models[0].specs.map(([k]) => <th key={k} scope="col" className="py-2 pr-4">{k}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {p.models.map((m) => (
                    <tr key={m.code} className="border-b border-[var(--line)]">
                      <th scope="row" className="py-2 pr-4 font-semibold">{m.code}</th>
                      {m.specs.map(([k, v]) => <td key={k} className="py-2 pr-4">{v}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
            {p.colors && (<><dt className="font-semibold">Colores</dt><dd>{p.colors.join(", ")}</dd></>)}
            {p.base && (<><dt className="font-semibold">Base</dt><dd>{p.base}</dd></>)}
            <dt className="font-semibold">Material</dt><dd>PVC no inflamable, inodoro, que no se decolora</dd>
          </dl>

          <a href={wa} target="_blank" rel="noopener" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[var(--ink)] px-7 text-sm font-semibold text-[var(--paper)]">
            {p.quote ? "Pedir presupuesto por WhatsApp" : "Pedir por WhatsApp"}
          </a>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
    </article>
  );
}
