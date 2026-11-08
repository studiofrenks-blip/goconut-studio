import Image from "next/image";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";
import { href, type Locale } from "@/lib/i18n";
import { getTexts } from "@/lib/texts";
import { pageMeta } from "@/lib/seo";

type P = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: P) {
  const { lang } = await params;
  const t = await getTexts(lang);
  return pageMeta(lang, "work", t["work.metaTitle"], t["work.metaDesc"]);
}

export default async function Work({ params }: P) {
  const { lang } = await params;
  const t = await getTexts(lang);
  const items = [
    { n: 1, src: "/img/show-en-directo-publico.jpg", w: 2000, h: 1414 },
    { n: 2, src: "/img/manu-alerod-escenario.jpg", w: 2000, h: 1334 },
    { n: 3, src: "/img/personajes-del-show.png", w: 853, h: 935 },
  ];
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">{t["work.kicker"]}</p>
          <h1 className="h-xl">{t["work.h1"]}</h1>
          <p className="lead">{t["work.lead"]}</p>
        </div>
      </section>
      <section className="wrap work-list">
        {items.map(({ n, src, w, h }) => (
          <Reveal as="article" className="work-item" key={n}>
            <div className="work-media">
              <Image src={src} alt={t[`work.p${n}Alt` as "work.p1Alt"]} width={w} height={h} sizes="(max-width: 760px) 100vw, 58vw" />
            </div>
            <div>
              <span className="tag">{t[`work.p${n}Tag` as "work.p1Tag"]}</span>
              <h2>{t[`work.p${n}Title` as "work.p1Title"]}</h2>
              <p>{t[`work.p${n}Text` as "work.p1Text"]}</p>
            </div>
          </Reveal>
        ))}
      </section>
      <div style={{ height: "clamp(80px, 10vw, 140px)" }} />
      <CtaBand t={t} contactHref={href(lang, "contact")} />
    </>
  );
}
