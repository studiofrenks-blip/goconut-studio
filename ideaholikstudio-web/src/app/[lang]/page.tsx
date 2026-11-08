import SpotlightHero from "@/components/SpotlightHero";
import Tapes from "@/components/Tapes";
import ScrollFill from "@/components/ScrollFill";
import Orbit from "@/components/Orbit";
import StackServices from "@/components/StackServices";
import ExpandReveal from "@/components/ExpandReveal";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import Globe from "@/components/Globe";
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
  const n4 = [1, 2, 3, 4] as const;

  return (
    <>
      <SpotlightHero
        eyebrow={t["home.eyebrow"]}
        titleA={t["home.titleA"]}
        rotPrefix={t["home.rotPrefix"]}
        words={[t["home.rot1"], t["home.rot2"], t["home.rot3"]]}
        fullTitle={`${t["home.h1a"]} ${t["home.h1b"]}`}
        lead={t["home.lead"]}
        primary={{ href: href(lang, "contact"), label: t["home.ctaPrimary"] }}
        secondary={{ href: href(lang, "work"), label: t["home.ctaSecondary"] }}
        stickers={n4.map((n) => t[`home.sticker${n}`])}
        hint={t["home.spotHint"]}
        imgAlt={t["home.heroAlt"]}
      />

      <Tapes
        a={[t["home.trait1"], "Branding", t["home.trait4"], "Web & CRM", t["home.trait2"], "Influencers"]}
        b={["Shows", t["home.trait3"], "Live", "Content", t["home.rot1"], "Ideaholiks"]}
      />

      <section className="section who-sec" aria-labelledby="who-title">
        <div className="wrap">
          <p className="kicker">{t["home.whoKicker"]}</p>
          <h2 id="who-title" className="mega">
            {t["home.whoTitle"]}
          </h2>
          <div className="who">
            <ScrollFill className="who-fill" text={t["home.whoBody"]} />
            <Orbit
              core={t["home.orbitCore"]}
              hint={t["home.orbitHint"]}
              items={n4.map((n) => ({ label: t[`home.trait${n}`], text: t[`home.trait${n}Text`] }))}
            />
          </div>
        </div>
      </section>

      <section className="section services-sec" id="servicios" aria-labelledby="services-title">
        <div className="wrap">
          <Reveal className="services-head">
            <div>
              <p className="kicker">{t["home.servicesKicker"]}</p>
              <h2 id="services-title" className="mega">
                {t["home.servicesTitle"]}
              </h2>
            </div>
            <p className="lead">{t["home.servicesBody"]}</p>
          </Reveal>
          <StackServices
            cards={n4.map((n) => ({
              title: t[`home.s${n}Title`],
              text: t[`home.s${n}Text`],
              tags: t[`home.servicesTags${n}`],
              href: `${href(lang, "contact")}?s=${n}`,
              cta: t["home.serviceCta"],
            }))}
          />
        </div>
      </section>

      <ExpandReveal
        kicker={t["home.showKicker"]}
        a={t["home.stageA"]}
        b={t["home.stageB"]}
        body={t["home.showBody"]}
        cta={{ href: href(lang, "work"), label: t["home.showCta"] }}
        img={{ src: "/img/manu-alerod-escenario.jpg", alt: t["home.stageAlt"] }}
      />

      <section className="section globe-sec" aria-labelledby="globe-title">
        <div className="wrap globe-grid">
          <Reveal>
            <p className="kicker">{t["home.globeKicker"]}</p>
            <h2 id="globe-title" className="mega">
              {t["home.globeTitle"]}
            </h2>
            <p className="lead" style={{ marginTop: 26 }}>
              {t["home.globeBody"]}
            </p>
          </Reveal>
          <div className="globe-wrap">
            <Globe label={t["home.globeLabel"]} />
            <p className="globe-hint" aria-hidden="true">
              ✦ {t["home.globeHint"]}
            </p>
          </div>
        </div>
      </section>

      <CtaBand t={t} contactHref={href(lang, "contact")} />
    </>
  );
}
