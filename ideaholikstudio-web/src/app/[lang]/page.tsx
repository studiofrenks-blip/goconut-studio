import Image from "next/image";
import Link from "next/link";
import HeroExpand from "@/components/HeroExpand";
import Orbit from "@/components/Orbit";
import SpotlightCards from "@/components/SpotlightCards";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { href, type Locale } from "@/lib/i18n";
import { getTexts } from "@/lib/texts";
import { pageMeta } from "@/lib/seo";

type P = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: P) {
  const { lang } = await params;
  const t = await getTexts(lang);
  return pageMeta(lang, "home", t["home.metaTitle"], t["home.metaDesc"]);
}

export default async function Home({ params }: P) {
  const { lang } = await params;
  const t = await getTexts(lang);
  const words = [t["home.trait1"], t["nav.work"], t["home.trait4"], "Branding", "Web", "Shows", t["home.trait2"], "CRM", t["home.trait3"]];

  return (
    <>
      <HeroExpand
        eyebrow={t["home.eyebrow"]}
        h1a={t["home.h1a"]}
        h1b={t["home.h1b"]}
        lead={t["home.lead"]}
        primary={{ href: href(lang, "contact"), label: t["home.ctaPrimary"] }}
        secondary={{ href: href(lang, "work"), label: t["home.ctaSecondary"] }}
        scrollHint={t["home.scrollHint"]}
        imgAlt={t["home.heroAlt"]}
      />

      <section className="section" aria-labelledby="who-title">
        <div className="wrap who">
          <Reveal>
            <p className="kicker">{t["home.whoKicker"]}</p>
            <h2 id="who-title" className="h-lg">
              {t["home.whoTitle"]}
            </h2>
            <p className="lead">{t["home.whoBody"]}</p>
          </Reveal>
          <Reveal delay={120}>
            <Orbit
              core={t["home.orbitCore"]}
              hint={t["home.orbitHint"]}
              items={[1, 2, 3, 4].map((n) => ({
                label: t[`home.trait${n}` as "home.trait1"],
                text: t[`home.trait${n}Text` as "home.trait1Text"],
              }))}
            />
          </Reveal>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...words, ...words].map((w, i) => (
            <span key={i}>{w} ✦</span>
          ))}
        </div>
      </div>

      <section className="section" id="servicios" aria-labelledby="services-title">
        <div className="wrap">
          <Reveal className="services-head">
            <div>
              <p className="kicker">{t["home.servicesKicker"]}</p>
              <h2 id="services-title" className="h-lg">
                {t["home.servicesTitle"]}
              </h2>
            </div>
            <p className="lead">{t["home.servicesBody"]}</p>
          </Reveal>
          <SpotlightCards
            cards={[1, 2, 3, 4].map((n) => ({
              title: t[`home.s${n}Title` as "home.s1Title"],
              text: t[`home.s${n}Text` as "home.s1Text"],
            }))}
          />
        </div>
      </section>

      <section className="section" aria-labelledby="stage-title" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal className="stage-intro">
            <div>
              <p className="kicker">{t["home.showKicker"]}</p>
              <h2 id="stage-title" className="h-lg">
                {t["home.showTitle"]}
              </h2>
            </div>
            <div>
              <p className="lead">{t["home.showBody"]}</p>
              <p style={{ marginTop: 26 }}>
                <Link className="btn btn-ghost" href={href(lang, "work")}>
                  {t["home.showCta"]} <span className="arrow" aria-hidden="true">→</span>
                </Link>
              </p>
            </div>
          </Reveal>
          <div className="stage-grid">
            <Reveal as="figure" className="tall">
              <Image
                src="/img/personajes-del-show.png"
                alt={t["work.p3Alt"]}
                width={853}
                height={935}
                sizes="(max-width: 760px) 100vw, 55vw"
              />
            </Reveal>
            <Reveal as="figure" delay={100}>
              <Image
                src="/img/manu-alerod-escenario.jpg"
                alt={t["work.p2Alt"]}
                width={2000}
                height={1334}
                sizes="(max-width: 760px) 100vw, 42vw"
              />
            </Reveal>
            <Reveal as="figure" delay={200}>
              <Image
                src="/img/show-en-directo-publico.jpg"
                alt={t["work.p1Alt"]}
                width={2000}
                height={1414}
                sizes="(max-width: 760px) 100vw, 42vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand t={t} contactHref={href(lang, "contact")} />
    </>
  );
}
