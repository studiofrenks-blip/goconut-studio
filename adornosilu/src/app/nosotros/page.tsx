import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Somos Adornos ILU, empresa familiar venezolana con más de 60 años fabricando pinos, coronas y guirnaldas navideñas.",
  alternates: { canonical: "/nosotros" },
};

export default function Nosotros() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--gold-ink)]">Bienvenidos</p>
      <h1 className="font-display mt-3 text-4xl sm:text-5xl">Somos Adornos ILU</h1>
      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        <p>
          Empresa venezolana con más de 60 años de historia, nacida del deseo de llenar cada Navidad
          con color, elegancia y espíritu festivo. Hoy mantenemos el legado familiar con una visión
          moderna, enfocada en la innovación, la calidad y la expansión nacional e internacional.
        </p>
        <p>
          Somos fabricantes apasionados: creamos pinos, coronas y guirnaldas navideñas de alta
          calidad, diseñados para conservar su forma, brillo y estructura a lo largo de los años,
          incluso en condiciones exigentes. Decoramos hogares, oficinas y grandes espacios
          comerciales, y contribuimos a crear un ambiente de acogida y celebración que perdura por
          generaciones.
        </p>
        <p>
          En Adornos ILU nos enorgullece ser una marca de referencia en decoración festiva, en
          Venezuela y en el extranjero. No buscamos competir con productos similares: ofrecemos una
          alternativa superior, pensada y hecha con el conocimiento profundo del gusto y las
          tradiciones navideñas.
        </p>
      </div>
      {/* PENDIENTE: collage con fotos de la planta y del personal (indicación del documento). */}
      <Link href="/catalogo" className="mt-10 inline-block rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-semibold text-[var(--paper)]">
        Ver productos
      </Link>
    </article>
  );
}
