import Image from "next/image";
import Link from "next/link";
import Closing from "@/components/Closing";
import HeroTree from "@/components/HeroTree";
import InView from "@/components/InView";
import Kinetic from "@/components/Kinetic";
import RotatingWord from "@/components/RotatingWord";
import Spotlight from "@/components/Spotlight";
import WordGlow from "@/components/WordGlow";
import { WhatsAppIcon } from "@/components/WhatsAppFloat";
import { getContent } from "@/lib/content";
import { t } from "@/lib/dict";
import { path, type Lang } from "@/lib/i18n";
import { categories, productsIn } from "@/lib/products";
import { catText } from "@/lib/products-en";
import { site } from "@/lib/site";

const catImg: Record<string, string> = {
  pinos: "/productos/pino-monterrey-pm/pino-monterrey-pm-1.jpg",
  "pinos-gigantes": "/marca/pino-gigante-plaza.jpg",
  coronas: "/productos/corona-canadian-king-rck/corona-canadian-king-rck-1.jpg",
  guirnaldas: "/productos/guirnalda-canadian-king/guirnalda-canadian-king-1.jpg",
};
// Cada tarjeta, un color de la paleta 6 del Kit.
const cardTone = [
  "bg-[#6f1321] text-[var(--cream)]",
  "bg-[var(--cream)] text-[var(--bg)]",
  "bg-[#4a1022] text-[var(--cream)]",
  "bg-[var(--accent)] text-[var(--bg)]",
];

export default async function HomeView({ lang }: { lang: Lang }) {
  const c = await getContent(lang);
  const d = t(lang);
  const es = lang === "es";
  const facts = es
    ? [["+60", "años fabricando la Navidad en familia"], ["20 m", "de altura en pinos gigantes"], ["PVC", "no inflamable, inodoro, no se decolora"], ["Montaje", "en toda Venezuela"]]
    : [["60+", "years making Christmas as a family"], ["20 m", "tall giant trees"], ["PVC", "flame-retardant, odourless, fade-resistant"], ["Installed", "all over Venezuela"]];
  const stickers = es ? ["+60 años", "Hecho en Venezuela", "Hasta 20 m"] : ["60+ years", "Made in Venezuela", "Up to 20 m"];

  return (
    <>
      {/* Portada: metáfora de marca */}
      <section aria-labelledby="h1" className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_75%_40%,rgba(111,19,33,.6),transparent_70%)]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-6 px-4 pb-6 pt-10 sm:px-8 md:grid-cols-[1.3fr_1fr] lg:min-h-[calc(100svh-4rem)] lg:pt-0">
          <div className="relative z-10">
            <p className="eyebrow">{c["home.kicker"]}</p>
            <h1 id="h1" className="sr-only">{c["home.h1"]}</h1>
            <p aria-hidden className="font-display condensed t-hero relative z-10 mt-5 max-w-[640px]">
              {c["home.lead2"] ? (
                <>{c["home.lead1"]} <RotatingWord words={c["home.words"].split("|")} className="text-[var(--accent)]" /><br />{c["home.lead2"]}</>
              ) : (
                <>{c["home.lead1"]}<br /><RotatingWord words={c["home.words"].split("|")} className="text-[var(--accent)]" /></>
              )}
            </p>
            <p className="mt-7 max-w-lg text-lg leading-relaxed text-[var(--cream-2)]">{c["home.sub"]} <span className="hidden [@media(pointer:fine)]:inline">{es ? "Pasa el ratón por el árbol." : "Move your mouse over the tree."}</span></p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={path("catalog", lang)} className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--accent)] px-8 font-semibold text-[var(--bg)]">{d.seeCatalog}</Link>
              <a href={`https://wa.me/${site.company.whatsapp}?text=${encodeURIComponent(d.whatsappMsg)}`} target="_blank" rel="noopener" data-wa className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[var(--cream)]/40 bg-[var(--bg)]/60 px-8 font-semibold backdrop-blur hover:border-[var(--cream)]"><WhatsAppIcon /> WhatsApp</a>
            </div>
            <nav aria-label={es ? "Ir directo a" : "Go straight to"} className="mt-8">
              <p className="eyebrow">{es ? "¿Qué buscas?" : "What are you looking for?"}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {categories.map((k) => (
                  <li key={k.slug}><Link href={path("category", lang, k.slug)} className="inline-flex min-h-11 items-center rounded-full bg-[var(--bg-2)] px-4 text-sm font-medium hover:bg-[var(--bg-3)]">{catText(k, lang).name}</Link></li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="relative mx-auto mt-6 h-[300px] w-full md:mt-0 md:h-[520px] lg:h-[82svh]">
            <HeroTree label={es ? "Árbol de luces de Adornos ILU que se enciende al pasar el dedo" : "Adornos ILU tree of lights that lights up under your finger"} />
            {stickers.map((s, i) => (
              <span key={s} aria-hidden className={`font-display absolute hidden rounded-full border border-[var(--line)] bg-[var(--bg-2)]/90 px-4 py-2 text-sm backdrop-blur lg:block ${["left-0 top-[18%] -rotate-6", "right-0 top-[48%] rotate-3", "left-[8%] bottom-[10%] rotate-[-2deg]"][i]}`}>{s}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Manifiesto que se enciende palabra a palabra */}
      <section aria-label={es ? "Quiénes somos" : "Who we are"} className="section mx-auto max-w-5xl px-4 sm:px-8">
        <WordGlow text={c["home.manifesto"]} className="text-[clamp(22px,2.6vw,36px)] font-semibold leading-[1.3] tracking-[-0.01em]" />
      </section>

      {/* Tarjetas apiladas */}
      <section aria-labelledby="fabricamos" className="section mx-auto max-w-7xl px-4 sm:px-8">
        <Kinetic id="fabricamos">{c["home.catTitle"]}</Kinetic>
        <ul className="mt-12">
          {categories.map((k, i) => {
            const tx = catText(k, lang);
            const n = productsIn(k.slug).length;
            return (
              <li key={k.slug} className="sticky mb-6" style={{ top: `calc(5rem + ${i * 18}px)` }}>
                <Spotlight className={`overflow-hidden rounded-[32px] ${cardTone[i]}`}>
                  <Link href={path("category", lang, k.slug)} className="grid gap-6 p-5 sm:p-8 md:min-h-[400px] md:grid-cols-[1fr_1fr] md:p-10">
                    <div className="flex flex-col justify-center">
                      <p className="text-sm font-semibold opacity-75">0{i + 1} · {d.items(n)}</p>
                      <h3 className="font-display condensed mt-3 text-[clamp(32px,4vw,60px)]">{tx.name}</h3>
                      <p className="mt-4 max-w-md text-lg leading-relaxed opacity-85">{tx.intro}</p>
                      <span className="mt-6 inline-flex min-h-12 w-fit items-center rounded-full border-2 border-current px-6 font-semibold">{es ? `Ver ${d.items(n)}` : `See ${d.items(n)}`} →</span>
                    </div>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] md:aspect-auto md:min-h-[320px]">
                      <Image src={catImg[k.slug]} alt={tx.name} fill sizes="(min-width:768px) 45vw, 100vw" className="object-cover object-top" />
                    </div>
                  </Link>
                </Spotlight>
              </li>
            );
          })}
        </ul>
      </section>

      {/* Proyectos: pinos gigantes con fotos que se abren */}
      <section aria-labelledby="gigantes" className="section mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-10">
          <Kinetic id="gigantes">{c["home.projTitle"]}</Kinetic>
          <InView as="p" className="reveal max-w-xl text-lg leading-relaxed text-[var(--cream-2)]">{c["home.projText"]}</InView>
        </div>
        <div className="no-bar -mx-4 mt-10 flex snap-x snap-mandatory scroll-pl-4 gap-3 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 [&>figure]:w-[78vw] [&>figure]:shrink-0 [&>figure]:snap-start sm:[&>figure]:w-auto">
          {[["/marca/estructura-pino-gigante.jpg", es ? "Estructura metálica de un pino gigante" : "Metal structure of a giant tree", es ? "Estructura" : "Structure"],
            ["/marca/montaje-pino-gigante.jpg", es ? "Equipo de Adornos ILU montando un pino gigante" : "Adornos ILU team installing a giant tree", es ? "Montaje" : "Installation"],
            ["/marca/pino-gigante-plaza.jpg", es ? "Pino gigante terminado en una plaza" : "Finished giant tree in a square", es ? "Resultado" : "Result"]].map(([src, alt, cap], i) => (
            <figure key={src}>
              <InView className="clip relative aspect-[4/5] overflow-hidden rounded-[28px]" delay={i * 0.12}>
                <Image src={src} alt={alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
              </InView>
              <figcaption className="mt-3 text-sm text-[var(--cream-2)]">0{i + 1} · {cap}</figcaption>
            </figure>
          ))}
        </div>
        <p aria-hidden className="mt-3 text-sm text-[var(--cream-2)] sm:hidden">{es ? "Desliza para ver los 3 pasos →" : "Swipe to see the 3 steps →"}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a data-wa href={`https://wa.me/${site.company.whatsapp}?text=${encodeURIComponent(es ? "Hola, quiero presupuesto para un pino gigante." : "Hello, I would like a quote for a giant tree.")}`} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-8 font-semibold text-[var(--bg)]"><WhatsAppIcon /> {es ? "Pedir presupuesto" : "Request a quote"}</a>
          <Link href={path("product", lang, "pinos-estructurales")} className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--cream)]/40 px-8 font-semibold">{es ? "Ver detalles" : "See details"}</Link>
        </div>
      </section>

      {/* Datos clave (reales) */}
      <section aria-labelledby="datos" className="section mx-auto max-w-7xl px-4 sm:px-8">
        <h2 id="datos" className="sr-only">{c["home.whyTitle"]}</h2>
        <ul className="grid grid-cols-2 border-t border-[var(--line)] lg:grid-cols-4">
          {facts.map(([big, small], i) => (
            <InView as="li" key={big} className={`reveal border-b border-[var(--line)] py-6 pr-4 sm:py-8 ${i % 2 ? "pl-4 sm:pl-8" : ""} lg:border-b-0 ${i ? "lg:border-l lg:border-[var(--line)] lg:pl-8" : ""}`} delay={i * 0.06}>
              <p className="font-display condensed whitespace-nowrap text-[clamp(36px,4.4vw,60px)] text-[var(--accent)]">{big}</p>
              <p className="mt-2 text-[15px] leading-snug text-[var(--cream-2)]">{small}</p>
            </InView>
          ))}
        </ul>
      </section>

      <Closing lang={lang} />
    </>
  );
}
