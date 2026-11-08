import type { Metadata } from "next";
import Image from "next/image";
import CtaBand from "@/components/CtaBand";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Adornos ILU: empresa familiar venezolana con más de 60 años fabricando pinos, coronas y guirnaldas navideñas de alta calidad.",
  alternates: { canonical: "/nosotros" },
};

const values = [
  { t: "Tradición", d: "Más de seis décadas siendo parte de la Navidad en los hogares venezolanos." },
  { t: "Calidad", d: "Diseño y fabricación meticulosos, con materiales de primera, para que duren año tras año." },
  { t: "Innovación", d: "Valoramos nuestras raíces, pero miramos al futuro con nuevos modelos y tecnología." },
  { t: "Presencia nacional", d: "Una red de distribución que lleva nuestros productos a todos los rincones de Venezuela." },
];

export default function Nosotros() {
  return (
    <>
      <PageHero eyebrow="Nosotros" title="Más de 60 años iluminando la Navidad en Venezuela" image="/marca/pino-gigante-patio.jpg"
        text="Somos fabricantes. Una empresa familiar que transforma espacios en escenarios llenos de luz y recuerdos." />

      <section className="mx-auto mt-24 grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <Reveal className="grid grid-cols-2 gap-3">
          <div className="relative col-span-2 aspect-[16/10] overflow-hidden rounded-3xl"><Image src="/marca/montaje-pino-gigante.jpg" alt="Equipo de Adornos ILU montando un pino gigante" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" /></div>
          <div className="relative aspect-square overflow-hidden rounded-3xl"><Image src="/productos/pino-monterrey-pm/pino-monterrey-pm-5.jpg" alt="Armado de las ramas de un pino" fill sizes="25vw" className="object-cover" /></div>
          <div className="relative aspect-square overflow-hidden rounded-3xl"><Image src="/productos/pino-monterrey-pm/pino-monterrey-pm-6.jpg" alt="Sistema de paraguas del pino Monterrey" fill sizes="25vw" className="object-cover" /></div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl leading-tight sm:text-5xl">Somos Adornos ILU</h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed">
            <p>Empresa venezolana con más de 60 años de historia, nacida del deseo de llenar cada Navidad con color, elegancia y espíritu festivo. Hoy mantenemos el legado familiar con una visión moderna, enfocada en la innovación, la calidad y la expansión nacional e internacional.</p>
            <p>Fabricamos pinos, coronas y guirnaldas diseñados para conservar su forma, brillo y estructura a lo largo de los años, incluso en condiciones exigentes.</p>
            <p>No buscamos competir con productos similares: ofrecemos una alternativa superior, hecha con el conocimiento profundo del gusto y las tradiciones navideñas.</p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-4 sm:px-6">
        <Reveal><h2 className="font-display text-4xl sm:text-5xl">Lo que nos mueve</h2></Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <li key={v.t}><Reveal delay={i * 0.06} className="h-full">
              <div className="h-full rounded-3xl bg-white p-7">
                <p className="font-display text-3xl text-[var(--gold-ink)]">0{i + 1}</p>
                <h3 className="mt-4 text-lg font-semibold">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--ink)]/80">{v.d}</p>
              </div>
            </Reveal></li>
          ))}
        </ul>
      </section>

      <section className="mx-auto mt-28 max-w-6xl px-4 sm:px-6">
        <Reveal className="relative overflow-hidden rounded-[2rem]">
          <div className="relative aspect-[16/9] sm:aspect-[21/9]"><Image src="/marca/pino-gigante-plaza.jpg" alt="Pino gigante Adornos ILU en una plaza" fill sizes="100vw" className="object-cover" /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)]/90 to-transparent" />
          <blockquote className="font-display absolute inset-x-0 bottom-0 p-6 text-2xl leading-snug text-white sm:p-12 sm:text-4xl">
            “En cada adorno hay un pedacito de historia, un suspiro de felicidad y la promesa de una Navidad llena de recuerdos inolvidables.”
          </blockquote>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}
