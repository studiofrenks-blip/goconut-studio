import Image from "next/image";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import ScrollFill from "@/components/ScrollFill";
import LightThreads from "@/components/LightThreads";
import CtaBand from "@/components/CtaBand";
import { href, type Locale } from "@/lib/i18n";
import { getTexts } from "@/lib/texts";
import { pageMeta } from "@/lib/seo";

type P = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: P) {
  const { lang } = await params;
  const t = await getTexts(lang);
  return pageMeta(lang, "about", t["about.metaTitle"], t["about.metaDesc"]);
}

export default async function About({ params }: P) {
  const { lang } = await params;
  const t = await getTexts(lang);
  const team = [
    { name: t["about.member1"], role: t["about.member1Role"], alt: t["about.member1Alt"], src: "/img/francisco-acm.jpg" },
    { name: t["about.member2"], role: t["about.member2Role"], alt: t["about.member2Alt"], src: "/img/manuel-arj.jpg" },
  ];
  return (
    <>
      <PageHero kicker={t["about.kicker"]} title={t["about.h1"]} watermark="Ideaholiks" />

      <section className="wrap about-fill">
        <ScrollFill className="fill-lg" text={t["about.p1"]} />
        <Reveal className="about-p2">
          <p className="lead">{t["about.p2"]}</p>
        </Reveal>
      </section>

      <section className="section flow-sec" aria-labelledby="flow-title">
        <div className="wrap flow-grid">
          <Reveal>
            <p className="kicker">{t["about.flowKicker"]}</p>
            <h2 id="flow-title" className="mega">
              {t["about.flowTitle"]}
            </h2>
            <p className="lead" style={{ marginTop: 26 }}>
              {t["about.flowBody"]}
            </p>
          </Reveal>
          <LightThreads center="Ideaholiks Studio" nodes={[t["about.flow1"], t["about.flow2"], t["about.flow3"], t["about.flow4"]]} />
        </div>
      </section>

      <section className="section manifesto" aria-label={lang === "es" ? "Manifiesto" : "Manifesto"}>
        <div className="wrap">
          <ul>
            {[1, 2, 3].map((n, i) => (
              <Reveal as="li" key={n} delay={i * 90}>
                <span>{t[`about.m${n}a` as "about.m1a"]}</span> <em style={{ fontStyle: "normal" }} className="grad-text">{t[`about.m${n}b` as "about.m1b"]}</em>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="team-title">
        <div className="wrap">
          <Reveal>
            <p className="kicker">{t["about.teamKicker"]}</p>
            <h2 id="team-title" className="mega">
              {t["about.teamTitle"]}
            </h2>
            <p className="lead" style={{ marginTop: 20 }}>
              {t["about.teamBody"]}
            </p>
          </Reveal>
          <div className="team">
            {team.map((m, i) => (
              <Reveal as="figure" className="member" key={m.name} delay={i * 120}>
                <Image src={m.src} alt={m.alt} width={873} height={873} sizes="(max-width: 640px) 100vw, 50vw" />
                <figcaption>
                  <strong>{m.name}</strong>
                  <span>{m.role}</span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand t={t} contactHref={href(lang, "contact")} title={t["about.ctaTitle"]} body={t["about.ctaBody"]} />
    </>
  );
}
