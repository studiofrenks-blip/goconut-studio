import Link from "next/link";
import Closing from "@/components/Closing";
import InView from "@/components/InView";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import ModelPicker from "@/components/ModelPicker";
import { t } from "@/lib/dict";
import { path, type Lang } from "@/lib/i18n";
import { primaryCategory, products, productsIn, type Product } from "@/lib/products";
import { L, N, catText, prodText } from "@/lib/products-en";
import { site } from "@/lib/site";

export default function ProductView({ p, lang }: { p: Product; lang: Lang }) {
  const d = t(lang);
  const c = primaryCategory(p);
  const ct = catText(c, lang);
  const pt = prodText(p, lang);
  const related = productsIn(c.slug).filter((x) => x.slug !== p.slug).slice(0, 4);
  const idx = products.findIndex((x) => x.slug === p.slug);
  const prev = products[(idx - 1 + products.length) % products.length], next = products[(idx + 1) % products.length];
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Product", name: p.name, sku: p.code, description: pt.summary,
    image: p.images.map((i) => site.url + i), brand: { "@type": "Brand", name: site.name },
    manufacturer: { "@type": "Organization", name: site.company.legalName }, category: ct.name, url: site.url + path("product", lang, p.slug),
  };
  const crumbs = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
    { "@type": "ListItem", position: 1, name: d.nav.catalog, item: site.url + path("catalog", lang) },
    { "@type": "ListItem", position: 2, name: ct.name, item: site.url + path("category", lang, c.slug) },
    { "@type": "ListItem", position: 3, name: p.name },
  ] };
  return (
    <>
      <article className="mx-auto max-w-7xl px-4 pt-10 sm:px-8">
        <nav aria-label={lang === "es" ? "Migas de pan" : "Breadcrumb"} className="text-sm text-[var(--cream-2)]">
          <Link href={path("catalog", lang)} className="inline-flex min-h-11 items-center hover:text-[var(--cream)]">{d.nav.catalog}</Link> / <Link href={path("category", lang, c.slug)} className="inline-flex min-h-11 items-center hover:text-[var(--cream)]">{ct.name}</Link> / <span className="text-[var(--cream)]">{p.name}</span>
        </nav>
        <div className="mt-4 grid grid-cols-1 gap-x-16 gap-y-6 lg:mt-6 lg:grid-cols-2 lg:grid-rows-[auto_1fr] [&>*]:min-w-0">
          <header className="lg:col-start-2 lg:row-start-1">
            <p className="eyebrow">{p.code} · {ct.name}</p>
            <InView as="h1" className="kinetic font-display condensed mt-2 text-[clamp(40px,4.6vw,72px)]">{p.name}</InView>
          </header>
          <div className="lg:col-start-1 lg:row-span-2 lg:row-start-1"><ProductGallery images={p.images} name={p.name} label={lang === "es" ? "Ver foto" : "See photo"} /></div>
          <div className="lg:col-start-2">
            <div className="space-y-4 text-lg leading-relaxed text-[var(--cream-2)]">{pt.body.map((x) => <p key={x}>{x}</p>)}</div>
            <ModelPicker
              models={p.models.map((m) => ({ code: m.code, specs: m.specs.map(([k, v]) => [L(k, lang), N(v, lang)] as [string, string]) }))}
              title={d.modelsTitle}
              cta={p.quote ? d.askQuote : d.askWa}
              bar={lang === "es" ? (p.quote ? "Pedir presupuesto" : "Pedir por WhatsApp") : p.quote ? "Request a quote" : "Order on WhatsApp"}
              msg={d.productMsg(p.name, p.models.length ? "{model}" : p.code)}
              whatsapp={site.company.whatsapp}
            />
            <dl className="mt-8 divide-y divide-[var(--line)] rounded-2xl border border-[var(--line)] text-sm">
              {p.colors && <div className="flex justify-between gap-4 p-4"><dt className="text-[var(--cream-2)]">{d.colors}</dt><dd className="text-right font-medium">{p.colors.map((x) => L(x, lang)).join(" · ")}</dd></div>}
              {p.base && <div className="flex justify-between gap-4 p-4"><dt className="text-[var(--cream-2)]">{d.base}</dt><dd className="font-medium">{L(p.base, lang)}</dd></div>}
              <div className="flex justify-between gap-4 p-4"><dt className="text-[var(--cream-2)]">{d.material}</dt><dd className="text-right font-medium">{d.materialText}</dd></div>
              <div className="flex justify-between gap-4 p-4"><dt className="text-[var(--cream-2)]">{d.madeIn}</dt><dd className="font-medium">{d.venezuela}</dd></div>
            </dl>
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />
      </article>
      <nav aria-label={lang === "es" ? "Más productos" : "More products"} className="mx-auto mt-16 grid max-w-7xl grid-cols-2 gap-3 px-4 sm:px-8">
        <Link href={path("product", lang, prev.slug)} className="rounded-2xl border border-[var(--line)] p-4 hover:border-[var(--accent)]"><span className="text-xs text-[var(--cream-2)]">← {lang === "es" ? "Anterior" : "Previous"}</span><span className="font-display mt-1 block text-lg">{prev.name}</span></Link>
        <Link href={path("product", lang, next.slug)} className="rounded-2xl border border-[var(--line)] p-4 text-right hover:border-[var(--accent)]"><span className="text-xs text-[var(--cream-2)]">{lang === "es" ? "Siguiente" : "Next"} →</span><span className="font-display mt-1 block text-lg">{next.name}</span></Link>
      </nav>
      {related.length > 0 && (
        <section aria-labelledby="rel" className="section mx-auto max-w-7xl px-4 sm:px-8">
          <h2 id="rel" className="font-display condensed t-section">{d.related}</h2>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">{related.map((r) => <li key={r.slug}><ProductCard p={r} lang={lang} /></li>)}</ul>
        </section>
      )}
      <Closing lang={lang} />
    </>
  );
}
