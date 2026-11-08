import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import { WhatsAppIcon } from "@/components/WhatsAppFloat";
import { getProduct, primaryCategory, products, productsIn } from "@/lib/products";
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
  const related = productsIn(c.slug).filter((x) => x.slug !== p.slug).slice(0, 4);
  return (
    <>
    <article className="mx-auto max-w-6xl px-4 pt-10 sm:px-6">
      <nav aria-label="Migas de pan" className="text-sm text-[var(--ink)]/70">
        <Link href="/catalogo" className="hover:underline">Catálogo</Link> / <Link href={`/catalogo/${c.slug}`} className="hover:underline">{c.name}</Link> / <span className="text-[var(--ink)]">{p.name}</span>
      </nav>
      <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 [&>*]:min-w-0">
        <ProductGallery images={p.images} name={p.name} />
        <div>
          <p className="inline-block rounded-full bg-[var(--night)] px-3 py-1 text-xs font-semibold tracking-[0.2em] text-[var(--gold)]">{p.code}</p>
          <h1 className="font-display mt-4 text-5xl leading-[1.02] sm:text-6xl">{p.name}</h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed">{p.body.map((t) => <p key={t}>{t}</p>)}</div>

          {p.models.length > 0 && (
            <section aria-labelledby="modelos" className="mt-10">
              <h2 id="modelos" className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--gold-ink)]">Modelos disponibles</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {p.models.map((m) => (
                  <li key={m.code} className="rounded-2xl border border-[var(--line)] bg-white p-4">
                    <p className="font-display text-xl">{m.code}</p>
                    <dl className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
                      {m.specs.map(([k, v]) => (<div key={k} className="contents"><dt className="text-[var(--ink)]/60">{k}</dt><dd className="font-medium">{v}</dd></div>))}
                    </dl>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <dl className="mt-8 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] bg-white text-sm">
            {p.colors && <div className="flex justify-between gap-4 p-4"><dt className="text-[var(--ink)]/60">Colores</dt><dd className="text-right font-medium">{p.colors.join(" · ")}</dd></div>}
            {p.base && <div className="flex justify-between gap-4 p-4"><dt className="text-[var(--ink)]/60">Base</dt><dd className="font-medium">{p.base}</dd></div>}
            <div className="flex justify-between gap-4 p-4"><dt className="text-[var(--ink)]/60">Material</dt><dd className="text-right font-medium">PVC no inflamable, inodoro, no se decolora</dd></div>
            <div className="flex justify-between gap-4 p-4"><dt className="text-[var(--ink)]/60">Fabricado en</dt><dd className="font-medium">Venezuela</dd></div>
          </dl>

          <a href={wa} target="_blank" rel="noopener" className="mt-8 hidden min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--night)] text-base font-semibold text-white sm:inline-flex">
            <WhatsAppIcon /> {p.quote ? "Pedir presupuesto por WhatsApp" : "Consultar disponibilidad por WhatsApp"}
          </a>
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
    </article>

    {related.length > 0 && (
      <section aria-labelledby="rel" className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <h2 id="rel" className="font-display text-3xl sm:text-4xl">También te puede gustar</h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{related.map((r) => <li key={r.slug}><ProductCard p={r} /></li>)}</ul>
      </section>
    )}
    <CtaBand />

    {/* Barra fija en móvil */}
    <div className="wa-bar fixed inset-x-0 bottom-0 z-30 border-t border-[var(--line)] bg-[var(--paper)]/95 p-3 backdrop-blur sm:hidden">
      <a href={wa} target="_blank" rel="noopener" className="flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--night)] font-semibold text-white">
        <WhatsAppIcon /> {p.quote ? "Pedir presupuesto" : "Consultar por WhatsApp"}
      </a>
    </div>
    </>
  );
}
