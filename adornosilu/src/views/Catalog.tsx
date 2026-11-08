import Link from "next/link";
import Closing from "@/components/Closing";
import Kinetic from "@/components/Kinetic";
import PageIntro from "@/components/PageIntro";
import ProductCard from "@/components/ProductCard";
import { path, type Lang } from "@/lib/i18n";
import { categories, productsIn } from "@/lib/products";
import { catText } from "@/lib/products-en";

export default function CatalogView({ lang, only }: { lang: Lang; only?: string }) {
  const es = lang === "es";
  const cur = only ? categories.find((c) => c.slug === only)! : null;
  const ct = cur ? catText(cur, lang) : null;
  const chip = (on: boolean) => `inline-flex min-h-11 shrink-0 items-center rounded-full px-5 text-sm font-semibold ${on ? "bg-[var(--accent)] text-[var(--bg)]" : "border border-[var(--line)] hover:border-[var(--cream)]"}`;
  return (
    <>
      <PageIntro eyebrow={es ? "Catálogo" : "Catalog"} a={ct ? ct.title : es ? "Catálogo" : "Catalog"}
        lead={ct ? ct.intro : es ? "Pinos, coronas y guirnaldas fabricados en Venezuela. Elige el modelo y te enviamos disponibilidad por WhatsApp." : "Trees, wreaths and garlands made in Venezuela. Pick a model and we will send you availability on WhatsApp."}>
        <nav aria-label={es ? "Categorías" : "Categories"} className="no-bar sticky top-16 z-30 -mx-4 mt-8 flex gap-2 overflow-x-auto bg-[var(--bg)]/90 px-4 py-3 pr-12 backdrop-blur [mask-image:linear-gradient(to_right,#000_82%,transparent)] sm:-mx-8 sm:flex-wrap sm:px-8 sm:[mask-image:none]">
          <Link href={path("catalog", lang)} aria-current={!only ? "page" : undefined} className={chip(!only)}>{es ? "Todo" : "All"}</Link>
          {categories.map((c) => <Link key={c.slug} href={path("category", lang, c.slug)} aria-current={only === c.slug ? "page" : undefined} className={chip(only === c.slug)}>{catText(c, lang).name}</Link>)}
        </nav>
      </PageIntro>
      {(cur ? [cur] : categories).map((c) => (
        <section key={c.slug} aria-labelledby={`h-${c.slug}`} className="mx-auto mt-24 max-w-7xl px-4 sm:px-8">
          {!cur && <Kinetic id={`h-${c.slug}`} className="">{catText(c, lang).name}</Kinetic>}
          {cur && <h2 id={`h-${c.slug}`} className="sr-only">{catText(c, lang).name}</h2>}
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {productsIn(c.slug).filter((p) => cur || c.slug === "pinos-gigantes" || p.categories[0] === c.slug).map((p) => <li key={p.slug}><ProductCard p={p} lang={lang} /></li>)}
          </ul>
        </section>
      ))}
      <Closing lang={lang} />
    </>
  );
}
