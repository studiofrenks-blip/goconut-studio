import Link from "next/link";
import { categories } from "@/lib/products";

const steps = [
  { n: "01", t: "Diseño", d: "Cada modelo nace del conocimiento profundo del gusto y las tradiciones navideñas." }, // PENDIENTE: texto del respaldo
  { n: "02", t: "Materiales premium", d: "Usamos materias primas de alta calidad para un acabado impecable y duradero." },
  { n: "03", t: "Seguridad", d: "Fabricados en PVC, no inflamable, inodoro, no se decolora." },
  { n: "04", t: "Control de calidad", d: "Revisamos cada unidad para asegurar que cumpla con nuestros estándares, garantizando la calidad de cada una de sus partes." },
];

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--gold-ink)]">
          Más de 60 años de tradición
        </p>
        <h1 className="font-display mt-4 max-w-3xl text-4xl leading-tight sm:text-6xl">
          El lugar donde nace la Navidad en Venezuela
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed">
          Adornos ILU es una marca venezolana dedicada a llenar cada rincón del país con la magia, el
          color y la emoción de la Navidad. Transformamos simples espacios en escenarios llenos de luz
          y recuerdos inolvidables.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/tienda" className="rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-[var(--paper)]">
            Ver productos
          </Link>
          <Link href="/nosotros" className="rounded-full border-2 border-[var(--ink)] px-6 py-3 text-sm font-semibold">
            Nuestra historia
          </Link>
        </div>
      </section>

      <section aria-labelledby="cats" className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="cats" className="font-display text-3xl">Nuestros productos</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link href={`/tienda/${c.slug}`} className="block h-full rounded-2xl border border-[var(--line)] p-6 hover:border-[var(--gold)]">
                <h3 className="font-display text-xl">{c.name}</h3>
                <p className="mt-2 text-sm leading-relaxed">{c.intro}</p>
              </Link>
            </li>
          ))}
        </ul>
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

      <section aria-labelledby="gigantes" className="mx-auto mt-24 max-w-6xl rounded-3xl bg-[var(--ink)] px-6 py-14 text-[var(--paper)] sm:px-12">
        <h2 id="gigantes" className="font-display text-3xl sm:text-4xl">Pinos gigantes</h2>
        <p className="mt-4 max-w-2xl leading-relaxed opacity-90">
          Pinos estructurales de hasta 20 metros de altura para centros comerciales, plazas y grandes
          espacios.
        </p>
        <Link href="/tienda/pinos-gigantes" className="mt-8 inline-block rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-semibold text-[var(--ink)]">
          Conocer los pinos gigantes
        </Link>
      </section>
    </>
  );
}
