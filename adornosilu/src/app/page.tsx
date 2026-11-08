import Image from "next/image";
import Link from "next/link";
import CtaBand from "@/components/CtaBand";
import HeroExpand from "@/components/HeroExpand";
import Orbit from "@/components/Orbit";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import { categories, getProduct, productsIn } from "@/lib/products";

const featured = ["pino-monterrey-pm", "pino-canadian-king-pck", "corona-canadian-king-rck", "guirnalda-canadian-king"].map((s) => getProduct(s)!);

const stats = [
  { n: "+60", t: "años de tradición" },
  { n: "20 m", t: "de altura, nuestros pinos gigantes" },
  { n: "12", t: "líneas de producto" },
  { n: "VE", t: "montaje en todo el país" },
];

const steps = [
  { n: "01", t: "Diseños únicos", d: "Creamos estilos adaptados a las tendencias y a lo que necesita cada cliente." },
  { n: "02", t: "Materiales premium", d: "Materias primas de alta calidad para un acabado impecable y duradero." },
  { n: "03", t: "Seguridad", d: "PVC no inflamable, inodoro y que no se decolora." },
  { n: "04", t: "Control de calidad", d: "Revisamos cada unidad, pieza por pieza, antes de que salga de la planta." },
];

const catImg: Record<string, string> = {
  pinos: "/productos/pino-canadian-king-pck/pino-canadian-king-pck-1.jpg",
  "pinos-gigantes": "/marca/pino-gigante-plaza.jpg",
  coronas: "/productos/corona-canadian-king-rck/corona-canadian-king-rck-1.jpg",
  guirnaldas: "/productos/guirnalda-canadian-king/guirnalda-canadian-king-1.jpg",
};

export default function Home() {
  return (
    <>
      <HeroExpand />

      {/* Cifras */}
      <section aria-label="Adornos ILU en cifras" className="bg-[var(--night)] text-white">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-px border-t border-white/10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <li key={s.t} className="px-4 py-10 sm:px-8">
              <Reveal delay={i * 0.08}>
                <p className="font-display text-5xl text-[var(--gold)] sm:text-6xl">{s.n}</p>
                <p className="mt-2 text-sm text-white/70">{s.t}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Historia */}
      <section className="mx-auto mt-28 grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem]">
            <Image src="/marca/montaje-pino-gigante.jpg" alt="Equipo de Adornos ILU montando la estructura de un pino gigante" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-4 hidden w-44 overflow-hidden rounded-2xl border-4 border-[var(--paper)] shadow-xl sm:block">
            <div className="relative aspect-square">
              <Image src="/productos/pino-monterrey-pm/pino-monterrey-pm-4.jpg" alt="Detalle de las ramas del pino Monterrey" fill sizes="176px" className="object-cover" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--gold-ink)]">Bienvenidos</p>
          <h2 className="font-display mt-3 text-4xl leading-tight sm:text-5xl">Una familia que fabrica la Navidad desde hace más de 60 años</h2>
          <p className="mt-6 text-lg leading-relaxed">
            Adornos ILU nació del deseo de llenar cada Navidad de color, elegancia y espíritu festivo.
            Hoy mantenemos ese legado familiar con una visión moderna: pinos, coronas y guirnaldas que
            conservan su forma, brillo y estructura año tras año.
          </p>
          <p className="mt-4 leading-relaxed text-[var(--ink)]/80">
            Decoramos hogares, oficinas y grandes espacios comerciales en Venezuela y en el extranjero.
            No buscamos competir: ofrecemos una alternativa superior.
          </p>
          <Link href="/nosotros" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[var(--night)] px-7 text-sm font-semibold text-white">Conoce nuestra historia</Link>
        </Reveal>
      </section>

      {/* Productos destacados */}
      <section aria-labelledby="cats" className="mx-auto mt-32 max-w-6xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--gold-ink)]">Lo más pedido</p>
            <h2 id="cats" className="font-display mt-2 text-4xl sm:text-5xl">Nuestros productos</h2>
          </Reveal>
          <Link href="/catalogo" className="text-sm font-semibold underline underline-offset-4">Ver todo el catálogo →</Link>
        </div>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {featured.map((p, i) => <li key={p.slug}><Reveal delay={i * 0.06} className="h-full"><ProductCard p={p} /></Reveal></li>)}
        </ul>
      </section>

      {/* Categorías */}
      <section aria-label="Categorías" className="mx-auto mt-20 max-w-6xl px-4 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c, i) => (
            <li key={c.slug}>
              <Reveal delay={i * 0.06}>
                <Link href={`/catalogo/${c.slug}`} className="group relative block aspect-[3/4] overflow-hidden rounded-3xl">
                  <Image src={catImg[c.slug]} alt="" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)] via-[var(--night)]/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <h3 className="font-display text-2xl">{c.name}</h3>
                    <p className="mt-1 text-sm text-white/75">{productsIn(c.slug).length} {productsIn(c.slug).length === 1 ? "producto" : "productos"} →</p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* Proceso: animación 2 del Kit */}
      <section aria-labelledby="proceso" className="mt-32 bg-[var(--night)] py-24 text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">Cómo trabajamos</p>
            <h2 id="proceso" className="font-display mt-3 text-4xl leading-tight sm:text-5xl">De la idea al adorno perfecto</h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/80">
              “En cada adorno hay un pedacito de historia, un suspiro de felicidad y la promesa de una Navidad llena de recuerdos inolvidables.”
            </p>
            <p className="mt-6 text-sm text-white/60">Toca cada número para ver el paso.</p>
          </Reveal>
          <Orbit items={steps} />
        </div>
      </section>

      {/* Pinos gigantes */}
      <section aria-labelledby="gigantes" className="mx-auto mt-32 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--gold-ink)]">Proyectos</p>
            <h2 id="gigantes" className="font-display mt-3 text-4xl leading-tight sm:text-5xl">Pinos gigantes de hasta 20 metros</h2>
            <p className="mt-6 text-lg leading-relaxed">
              Fabricamos y montamos estructuras metálicas para pinos navideños gigantes en plazas, centros
              comerciales y eventos institucionales. La base modular reforzada permite que crezcan cada
              temporada sin perder estabilidad.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Estructura metálica cableada", "Bases modulares ampliables", "Montaje en todo el país", "Proyectos para espacios públicos"].map((t) => (
                <li key={t} className="flex items-center gap-3 rounded-2xl border border-[var(--line)] bg-white px-4 py-3 text-sm font-medium">
                  <span aria-hidden className="text-[var(--gold)]">✦</span>{t}
                </li>
              ))}
            </ul>
            <Link href="/producto/pinos-estructurales" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-[var(--night)] px-7 text-sm font-semibold text-white">Ver pinos gigantes</Link>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-2 gap-3">
            {[["pino-gigante-plaza.jpg", "Pino gigante terminado en una plaza", "row-span-2 aspect-[3/5]"], ["estructura-pino-gigante.jpg", "Estructura metálica de un pino gigante", "aspect-square"], ["pino-gigante-patio.jpg", "Pino gigante decorado en un patio colonial", "aspect-square"]].map(([f, a, c]) => (
              <div key={f} className={`relative overflow-hidden rounded-3xl ${c}`}>
                <Image src={`/marca/${f}`} alt={a} fill sizes="(min-width:1024px) 30vw, 50vw" className="object-cover" />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Testimonios */}
      <section aria-labelledby="testimonios" className="mx-auto mt-32 max-w-6xl px-4 sm:px-6">
        <Reveal><h2 id="testimonios" className="font-display text-4xl sm:text-5xl">Lo que dicen nuestros clientes</h2></Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            ["Compramos un pino estructural hace 5 años y aún luce como nuevo. La calidad es incomparable.", "Arquitecta de interiores, Caracas"],
            ["Los adornos de ILU decoran nuestra tienda cada diciembre. Son duraderos, hermosos y fáciles de montar.", "Gerente de tienda, Barquisimeto"],
          ].map(([q, a], i) => (
            <Reveal key={a} delay={i * 0.08}>
              <figure className="h-full rounded-[2rem] bg-white p-8 shadow-[0_1px_0_var(--line)]">
                <p aria-hidden className="font-display text-6xl leading-none text-[var(--gold)]">“</p>
                <blockquote className="font-display -mt-4 text-2xl leading-snug">{q}</blockquote>
                <figcaption className="mt-6 text-sm text-[var(--ink)]/70">{a}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
