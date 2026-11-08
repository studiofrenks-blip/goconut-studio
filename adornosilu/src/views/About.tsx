import Image from "next/image";
import Closing from "@/components/Closing";
import InView from "@/components/InView";
import Kinetic from "@/components/Kinetic";
import PageIntro from "@/components/PageIntro";
import WordGlow from "@/components/WordGlow";
import { getContent } from "@/lib/content";
import type { Lang } from "@/lib/i18n";

export default async function AboutView({ lang }: { lang: Lang }) {
  const c = await getContent(lang);
  const es = lang === "es";
  const values = es
    ? [["Tradición", "Más de seis décadas siendo parte de la Navidad en los hogares venezolanos."], ["Calidad", "Diseño y fabricación cuidadosos, con materiales de primera, para que duren año tras año."], ["Innovación", "Valoramos nuestras raíces y miramos al futuro con nuevos modelos."], ["Presencia nacional", "Una red de distribución que lleva nuestros productos a toda Venezuela."]]
    : [["Tradition", "More than six decades as part of Christmas in Venezuelan homes."], ["Quality", "Careful design and manufacturing with first-rate materials, so they last year after year."], ["Innovation", "We value our roots and look to the future with new models."], ["Nationwide", "A distribution network that takes our products all over Venezuela."]];
  return (
    <>
      <PageIntro eyebrow={es ? "Nosotros" : "About us"} a={c["about.h1a"]} b={c["about.h1b"]} lead={c["about.lead"]} />
      <section className="mx-auto mt-16 grid max-w-7xl gap-4 px-4 sm:px-8 md:grid-cols-3">
        {[["/marca/montaje-pino-gigante.jpg", es ? "Equipo de Adornos ILU montando la estructura de un pino gigante" : "Adornos ILU team assembling the structure of a giant tree"],
          ["/productos/pino-monterrey-pm/pino-monterrey-pm-5.jpg", es ? "Manos armando las ramas de un pino Monterrey" : "Hands assembling the branches of a Monterrey tree"],
          ["/marca/pino-gigante-plaza.jpg", es ? "Pino gigante de Adornos ILU en una plaza" : "Adornos ILU giant tree in a square"]].map(([s, a], i) => (
          <InView key={s} className={`clip relative aspect-[3/4] overflow-hidden rounded-[28px] ${i === 1 ? "md:mt-16" : ""}`} delay={i * 0.12}>
            <Image src={s} alt={a} fill priority={i === 0} sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
          </InView>
        ))}
      </section>
      <section className="section mx-auto max-w-5xl px-4 sm:px-8">
        <WordGlow text={c["about.p1"]} className="font-display text-[clamp(22px,2.6vw,38px)] font-semibold leading-[1.15]" />
        <div className="mt-12 grid gap-8 text-lg leading-relaxed text-[var(--cream-2)] md:grid-cols-2">
          <InView as="p" className="reveal">{c["about.p2"]}</InView>
          <InView as="p" className="reveal" delay={0.1}>{c["about.p3"]}</InView>
        </div>
      </section>
      <section aria-labelledby="valores" className="section mx-auto max-w-7xl px-4 sm:px-8">
        <Kinetic id="valores">{es ? "Lo que nos mueve" : "What drives us"}</Kinetic>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map(([h, p], i) => (
            <InView as="li" key={h} className="reveal rounded-[28px] border border-[var(--line)] bg-[var(--bg-2)] p-7" delay={i * 0.06}>
              <p className="font-display text-4xl text-[var(--accent)]">0{i + 1}</p>
              <h3 className="font-display mt-4 text-2xl">{h}</h3>
              <p className="mt-2 text-[var(--cream-2)]">{p}</p>
            </InView>
          ))}
        </ul>
      </section>
      <section className="section mx-auto max-w-5xl px-4 text-center sm:px-8">
        <blockquote className="font-display text-[clamp(24px,2.8vw,40px)] font-semibold leading-[1.15]">“{c["about.quote"]}”</blockquote>
      </section>
      <Closing lang={lang} />
    </>
  );
}
