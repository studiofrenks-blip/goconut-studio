import Image from "next/image";
import Link from "next/link";
import HeroExpand from "@/components/HeroExpand";
import ProductCard from "@/components/ProductCard";
import { categories, getProduct } from "@/lib/products";

const featured = ["pino-monterrey-pm", "pino-canadian-king-pck", "corona-canadian-king-rck", "guirnalda-canadian-king"].map((s) => getProduct(s)!);

const steps = [
  { n: "01", t: "Diseños únicos", d: "Creamos estilos únicos adaptados a las tendencias y a las necesidades de cada cliente." },
  { n: "02", t: "Materiales premium", d: "Usamos materias primas de alta calidad para un acabado impecable y duradero." },
  { n: "03", t: "Seguridad", d: "Fabricados en PVC, no inflamable, inodoro, no se decolora." },
  { n: "04", t: "Control de calidad", d: "Revisamos cada unidad para asegurar que cumpla con nuestros estándares, garantizando la calidad de cada una de sus partes." },
];

export default function Home() {
  return (
    <>
      <HeroExpand />

      <section aria-labelledby="cats" className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--gold-ink)]">Pinos, coronas y guirnaldas</p>
        <h2 id="cats" className="font-display mt-2 text-4xl sm:text-5xl">Nuestros productos</h2>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {featured.map((p) => <li key={p.slug}><ProductCard p={p} /></li>)}
        </ul>
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((c) => (
            <Link key={c.slug} href={`/catalogo/${c.slug}`} className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm hover:border-[var(--gold)]">{c.name}</Link>
          ))}
          <Link href="/catalogo" className="rounded-full bg-[var(--night)] px-4 py-2 text-sm text-white">Ver todo el catálogo →</Link>
        </div>
      </section>

      <section aria-labelledby="proceso" className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <blockquote className="font-display max-w-3xl text-2xl leading-snug sm:text-3xl">
          “En cada adorno hay un pedacito de historia, un suspiro de felicidad y la promesa de una
          Navidad llena de recuerdos inolvidables.”
        </blockquote>
        <h2 id="proceso" className="font-display mt-16 text-3xl">De la idea al adorno perfecto</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="border-t-2 border-[var(--gold)] pt-4">
              <span className="text-sm font-semibold text-[var(--gold-ink)]">{s.n}</span>
              <h3 className="mt-1 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="gigantes" className="mx-auto mt-24 max-w-6xl rounded-3xl bg-[var(--night)] px-6 py-14 text-[var(--paper)] sm:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
        <h2 id="gigantes" className="font-display text-3xl sm:text-4xl">Pinos gigantes de hasta 20 metros</h2>
        <p className="mt-4 max-w-2xl leading-relaxed opacity-90">
          Fabricamos y montamos estructuras metálicas para pinos navideños gigantes en plazas, centros
          comerciales y eventos institucionales. La base modular reforzada permite que crezcan cada
          temporada sin perder estabilidad, y los instalamos en cualquier parte del país.
        </p>
        <ul className="mt-6 grid gap-2 text-sm sm:grid-cols-2">
          {["Estructura metálica", "Bases modulares ampliables", "Montaje en todo el país", "Proyectos para espacios públicos"].map((t) => (
            <li key={t} className="before:mr-2 before:text-[var(--gold)] before:content-['✦']">{t}</li>
          ))}
        </ul>
        <Link href="/catalogo/pinos-gigantes" className="mt-8 inline-block rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-[var(--ink)]">
          Conocer los pinos gigantes
        </Link>
        </div>
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
          <Image src="/marca/pino-gigante-plaza.jpg" alt="Pino gigante Adornos ILU instalado en una plaza" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
        </div>
        </div>
      </section>

      <section aria-labelledby="testimonios" className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <h2 id="testimonios" className="font-display text-3xl">Lo que dicen nuestros clientes</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {[
            ["Compramos un pino estructural hace 5 años y aún luce como nuevo. La calidad es incomparable.", "Arquitecta de interiores, Caracas"],
            ["Los adornos de ILU decoran nuestra tienda cada diciembre. Son duraderos, hermosos y fáciles de montar.", "Gerente de tienda, Barquisimeto"],
          ].map(([q, a]) => (
            <figure key={a} className="rounded-2xl border border-[var(--line)] p-6">
              <blockquote className="font-display text-xl leading-snug">“{q}”</blockquote>
              <figcaption className="mt-4 text-sm opacity-70">{a}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
