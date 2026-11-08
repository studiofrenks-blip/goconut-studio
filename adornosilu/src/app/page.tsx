import Image from "next/image";
import Link from "next/link";
import Beams from "@/components/Beams";
import CtaBand from "@/components/CtaBand";
import HeroExpand from "@/components/HeroExpand";
import Highlights from "@/components/Highlights";
import Reveal from "@/components/Reveal";
import Spotlight from "@/components/Spotlight";
import StickyStory from "@/components/StickyStory";
import { getProduct, productsIn } from "@/lib/products";

const highlights = [
  { img: "/marca/estructura-pino-gigante.jpg", alt: "Estructura de un pino gigante", kicker: "Pinos gigantes", title: "Hasta 20 metros. Montados en todo el país.", dark: true },
  { img: "/productos/pino-monterrey-pm/pino-monterrey-pm-1.jpg", alt: "Pino Monterrey", kicker: "Pino Monterrey", title: "Nuestro pino insignia. Hasta 3.595 ramas." },
  { img: "/productos/pino-monterrey-pm/pino-monterrey-pm-6.jpg", alt: "Sistema de paraguas del pino", kicker: "Fácil armado", title: "Sistema de paraguas: abre y listo.", dark: true },
  { img: "/productos/corona-canadian-king-rck/corona-canadian-king-rck-1.jpg", alt: "Corona Canadian King", kicker: "Coronas", title: "De 41 cm a 1,80 m de diámetro." },
  { img: "/productos/guirnalda-canadian-king/guirnalda-canadian-king-1.jpg", alt: "Guirnalda Canadian King", kicker: "Guirnaldas", title: "Moldeables. Listas para iluminar." },
  { img: "/productos/pino-monterrey-pm/pino-monterrey-pm-4.jpg", alt: "Detalle de ramas", kicker: "Materiales", title: "PVC no inflamable que no se decolora.", dark: true },
];

const steps = [
  { n: "01", t: "Diseños únicos", d: "Estilos adaptados a las tendencias y a cada cliente." },
  { n: "02", t: "Materiales premium", d: "Materias primas de alta calidad y acabado duradero." },
  { n: "03", t: "Seguridad", d: "PVC no inflamable, inodoro, que no se decolora." },
  { n: "04", t: "Control de calidad", d: "Revisamos cada unidad, pieza por pieza." },
];

const story = [
  { img: "/marca/estructura-pino-gigante.jpg", alt: "Estructura metálica de un pino gigante", kicker: "Paso 1 · Estructura", title: "Una base modular que crece contigo.", text: "Estructura metálica reforzada y cableada. Se amplía temporada tras temporada sin perder estabilidad." },
  { img: "/marca/montaje-pino-gigante.jpg", alt: "Equipo montando un pino gigante", kicker: "Paso 2 · Montaje", title: "Nuestro equipo lo monta donde estés.", text: "Instalación profesional en cualquier parte de Venezuela: rápida, segura y con armado y desarmado sencillos." },
  { img: "/marca/pino-gigante-patio.jpg", alt: "Pino gigante terminado y decorado", kicker: "Paso 3 · La magia", title: "Y la Navidad brilla por todo lo alto.", text: "Ramas de aspecto natural e iluminación perfecta: el lienzo ideal para plazas, centros comerciales y avenidas." },
];

const compare = ["pino-canadian-king-pck", "pino-canadian-king-slim-pcks", "pino-canadian-king-slim-deluxe-pcksl", "pino-monterrey-pm", "pino-victoria-pv", "pino-canadian-prince-pcp", "pino-de-mesa-pa"].map((s) => getProduct(s)!);
const swatch: Record<string, string> = { Verde: "#2f5b3a", Blanco: "#ffffff", Nevado: "#dfe9e4", Otros: "conic-gradient(#c33,#d4ae55,#2f5b3a,#c33)", "Colores variados": "conic-gradient(#c33,#d4ae55,#2f5b3a,#c33)" };
const range = (p: (typeof compare)[number]) => {
  const hs = p.models.map((m) => m.specs.find(([k]) => k === "Altura")?.[1]).filter(Boolean) as string[];
  return hs.length > 1 ? `${hs[0]} – ${hs[hs.length - 1]}` : hs[0];
};

export default function Home() {
  return (
    <>
      <HeroExpand />

      {/* Lo esencial */}
      <section aria-labelledby="esencial" className="pt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 id="esencial" className="font-display text-4xl sm:text-6xl">Lo esencial.</h2>
        </div>
        <div className="mt-10"><Highlights items={highlights} /></div>
      </section>

      {/* Bento */}
      <section aria-labelledby="porque" className="mx-auto mt-32 max-w-6xl px-4 sm:px-6">
        <Reveal><h2 id="porque" className="font-display max-w-3xl text-4xl sm:text-6xl">Hechos para durar. <span className="text-[var(--ink)]/40">Año tras año.</span></h2></Reveal>
        <div className="mt-12 grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-4">
          <Reveal className="col-span-2 row-span-2"><div className="relative h-full overflow-hidden rounded-[28px] bg-[var(--night)] p-8 text-white">
            <p className="text-[13px] font-semibold uppercase tracking-wide text-[var(--gold)]">Tradición</p>
            <p className="font-display mt-2 text-[clamp(5rem,14vw,10rem)] leading-none">+60</p>
            <p className="mt-2 max-w-xs text-lg text-white/75">años fabricando la Navidad de Venezuela, en familia.</p>
            <div className="absolute -bottom-10 -right-6 h-72 w-56 opacity-90"><Image src="/marca/logo-ilu-blanco.png" alt="" fill sizes="224px" className="object-contain opacity-15" /></div>
          </div></Reveal>
          <Reveal className="col-span-1"><div className="h-full rounded-[28px] bg-white p-6">
            <p className="font-display text-5xl">20 m</p><p className="mt-2 text-[15px] text-[var(--ink)]/65">de altura en pinos gigantes</p>
          </div></Reveal>
          <Reveal className="col-span-1"><div className="relative h-full overflow-hidden rounded-[28px]"><Image src="/productos/pino-monterrey-pm/pino-monterrey-pm-5.jpg" alt="Armado de ramas" fill sizes="25vw" className="object-cover" /></div></Reveal>
          <Reveal className="col-span-1"><div className="h-full rounded-[28px] bg-white p-6">
            <p className="text-[13px] font-semibold uppercase tracking-wide text-[var(--gold-ink)]">Seguridad</p>
            <p className="font-display mt-2 text-2xl leading-tight">PVC no inflamable, inodoro, que no se decolora.</p>
          </div></Reveal>
          <Reveal className="col-span-1"><div className="h-full rounded-[28px] bg-[var(--gold)] p-6 text-[var(--night)]">
            <p className="text-[13px] font-semibold uppercase tracking-wide">Colores</p>
            <div className="mt-4 flex gap-2">{["#2f5b3a", "#ffffff", "#dfe9e4"].map((c) => <span key={c} className="size-9 rounded-full ring-2 ring-white/60" style={{ background: c }} />)}</div>
            <p className="font-display mt-4 text-2xl">Verde, blanco y nevado.</p>
          </div></Reveal>
        </div>
      </section>

      {/* Cómo trabajamos: animación 7 del Kit */}
      <section aria-labelledby="proceso" className="mx-auto mt-32 max-w-6xl px-4 sm:px-6">
        <Reveal className="text-center">
          <h2 id="proceso" className="font-display text-4xl sm:text-6xl">De la idea al adorno perfecto.</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-[var(--ink)]/65">Cuatro claves que se unen en cada pino, corona y guirnalda que sale de nuestra planta.</p>
        </Reveal>
        <div className="mt-10"><Beams items={steps} /></div>
      </section>

      {/* Historia con scroll */}
      <section aria-labelledby="gigantes" className="mt-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Reveal><h2 id="gigantes" className="font-display max-w-3xl text-4xl sm:text-6xl">Pinos gigantes. <span className="text-[var(--ink)]/40">De la estructura a la magia.</span></h2></Reveal>
        </div>
        <div className="mt-6"><StickyStory steps={story} /></div>
      </section>

      {/* Comparador */}
      <section aria-labelledby="comparar" className="mt-24">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-4 sm:px-6">
          <Reveal><h2 id="comparar" className="font-display text-4xl sm:text-6xl">¿Qué pino es para ti?</h2></Reveal>
          <Link href="/catalogo/pinos" className="text-sm font-semibold text-[var(--gold-ink)] hover:underline">Ver todos los pinos ›</Link>
        </div>
        <ul className="no-bar mt-10 flex snap-x gap-4 overflow-x-auto px-4 pb-4 sm:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
          {compare.map((p) => (
            <li key={p.slug} className="w-[260px] shrink-0 snap-start">
              <Spotlight className="h-full rounded-[28px]">
                <Link href={`/producto/${p.slug}`} className="flex h-full flex-col rounded-[28px] bg-white p-5 text-center">
                  <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-2xl"><Image src={p.images[0]} alt={p.name} fill sizes="260px" className="object-cover" /></div>
                  <div className="mt-4 flex justify-center gap-1.5">{p.colors?.map((c) => <span key={c} title={c} className="size-3.5 rounded-full ring-1 ring-black/15" style={{ background: swatch[c] ?? "#ccc" }} />)}</div>
                  <h3 className="font-display mt-3 text-xl">{p.name.replace("Pino ", "")}</h3>
                  <dl className="mt-4 space-y-3 border-t border-[var(--line)] pt-4 text-sm">
                    <div><dt className="text-[var(--ink)]/50">Alturas</dt><dd className="font-medium">{range(p)}</dd></div>
                    <div><dt className="text-[var(--ink)]/50">Modelos</dt><dd className="font-medium">{p.models.length}</dd></div>
                    <div><dt className="text-[var(--ink)]/50">Base</dt><dd className="font-medium">{p.base}</dd></div>
                  </dl>
                  <span className="mt-auto pt-5 text-sm font-semibold text-[var(--gold-ink)]">Ver más ›</span>
                </Link>
              </Spotlight>
            </li>
          ))}
        </ul>
      </section>

      {/* Coronas y guirnaldas */}
      <section aria-label="Coronas y guirnaldas" className="mx-auto mt-24 grid max-w-6xl gap-4 px-4 sm:px-6 lg:grid-cols-2">
        {[["coronas", "Coronas", "Para puertas, paredes y mesas.", "/productos/corona-canadian-king-rck/corona-canadian-king-rck-1.jpg"], ["guirnaldas", "Guirnaldas", "Para escaleras, barandas y fachadas.", "/productos/guirnalda-canadian-king/guirnalda-canadian-king-2.jpg"]].map(([slug, t, d, img]) => (
          <Reveal key={slug}>
            <Link href={`/catalogo/${slug}`} className="group relative block h-[520px] overflow-hidden rounded-[28px] bg-white">
              <Image src={img} alt={t} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-white/90 to-transparent p-8 text-center">
                <h3 className="font-display text-4xl">{t}</h3>
                <p className="mt-2 text-[var(--ink)]/70">{d}</p>
                <p className="mt-3 text-sm font-semibold text-[var(--gold-ink)]">{productsIn(slug).length} modelos ›</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      {/* Testimonios */}
      <section aria-labelledby="testimonios" className="mx-auto mt-32 max-w-6xl px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-2">
          {[["Compramos un pino estructural hace 5 años y aún luce como nuevo. La calidad es incomparable.", "Arquitecta de interiores, Caracas"], ["Los adornos de ILU decoran nuestra tienda cada diciembre. Son duraderos, hermosos y fáciles de montar.", "Gerente de tienda, Barquisimeto"]].map(([q, a]) => (
            <Reveal key={a}><figure className="h-full rounded-[28px] bg-white p-10">
              <blockquote className="font-display text-2xl leading-snug sm:text-3xl">“{q}”</blockquote>
              <figcaption className="mt-6 text-sm text-[var(--ink)]/55">{a}</figcaption>
            </figure></Reveal>
          ))}
        </div>
        <h2 id="testimonios" className="sr-only">Lo que dicen nuestros clientes</h2>
      </section>

      <CtaBand />
    </>
  );
}
