import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { services as base } from "@/lib/content";
import { getService, getServices } from "@/lib/data";
import { crumbsLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/content";
import Split from "@/components/Split";
import Gallery from "@/components/Gallery";
import TalentOrbit from "@/components/TalentOrbit";
import CtaBlock from "@/components/CtaBlock";
import JsonLd from "@/components/JsonLd";
import { Arrow } from "@/components/Icons";

export const dynamicParams = false;
export const generateStaticParams = () => base.map((s) => ({ service: s.slug }));

type P = { params: Promise<{ service: string }> };

export async function generateMetadata({ params }: P) {
  const s = await getService((await params).service);
  if (!s) return {};
  return pageMeta({ title: s.seo.title, description: s.seo.description, path: `/${s.slug}/`, image: s.hero[0].src });
}

export default async function ServicePage({ params }: P) {
  const slug = (await params).service;
  const all = await getServices();
  const idx = all.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const s = all[idx];
  const next = all[(idx + 1) % all.length];

  return (
    <>
      <JsonLd data={crumbsLd([{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios/" }, { name: s.name, path: `/${s.slug}/` }])} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Service", name: s.name, serviceType: s.name, description: s.seo.description,
        provider: { "@id": `${site.url}/#org` }, url: `${site.url}/${s.slug}/`, areaServed: ["España", "Estados Unidos"],
        hasOfferCatalog: { "@type": "OfferCatalog", name: s.name, itemListElement: s.groups.map((g) => ({ "@type": "OfferCatalog", name: g.title, itemListElement: g.items.map((it) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: it } })) })) },
      }} />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: s.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />

      <section className="phero">
        <span className="phero__code" aria-hidden="true">{s.code}</span>
        <div className="wrap split" style={{ alignItems: "end" }}>
          <div>
            <nav className="crumbs" aria-label="Migas de pan"><Link href="/">Inicio</Link>/<Link href="/servicios/">Servicios</Link>/<span aria-current="page">{s.name}</span></nav>
            <p className="kicker">{s.kicker}</p>
            <h1 data-fx="03"><Split text={s.name} /></h1>
            <p className="lead" data-fx="01" style={{ ["--d" as string]: "0.3s" }}>{s.intro}</p>
            <div data-fx="01" style={{ ["--d" as string]: "0.45s", marginTop: 32 }}>
              <p style={{ fontSize: 20, marginBottom: 18 }}>{s.ctaLine}</p>
              <Link href="/contacto/" className="btn btn--primary" data-magnetic>Escríbenos <Arrow /></Link>
            </div>
          </div>
          <div className="duo">
            <div className="frame" data-fx="05"><Image src={s.hero[0].src} alt={s.hero[0].alt} width={s.hero[0].w} height={s.hero[0].h} priority sizes="(max-width: 900px) 50vw, 24vw" /></div>
            <div className="frame" data-fx="05" style={{ ["--d" as string]: "0.15s" }}><Image src={s.hero[1].src} alt={s.hero[1].alt} width={s.hero[1].w} height={s.hero[1].h} priority sizes="(max-width: 900px) 50vw, 24vw" /></div>
          </div>
        </div>
      </section>

      <section className="section section--tight" aria-labelledby="pitch-t">
        <div className="wrap">
          <p className="kicker">Qué incluye</p>
          <h2 id="pitch-t" className="h-lg" data-fx="03" style={{ maxWidth: "26ch" }}><Split text={s.pitchTitle} /></h2>
          <p className="lead" data-fx="01" style={{ marginTop: 28 }}>{s.pitch}</p>
          <div className="groups" data-fx="06" style={{ marginTop: 56 }}>
            {s.groups.map((g) => (
              <div className="group" key={g.title}>
                <h3>{g.title}</h3>
                <ul>{g.items.map((it) => <li key={it}>{it}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="proc-t">
        <div className="wrap">
          <p className="kicker">Metodología</p>
          <h2 id="proc-t" className="h-lg" data-fx="03" style={{ maxWidth: "26ch" }}><Split text={s.processTitle} /></h2>
          <ol className="steps" style={{ listStyle: "none", padding: 0 }}>
            {s.process.map((p) => (
              <li className="step" key={p.title}><h3>{p.title}</h3><p>{p.text}</p></li>
            ))}
          </ol>
        </div>
      </section>

      {s.orbit && (
        <section className="section section--tight" aria-labelledby="orb-t">
          <div className="wrap split">
            <div>
              <p className="kicker">Gestión de talentos</p>
              <h2 id="orb-t" className="h-lg stretch">{s.orbit.title}</h2>
              <p className="lead" style={{ marginTop: 24 }}>Toca cada servicio para ver qué incluye.</p>
            </div>
            <TalentOrbit items={s.orbit.items} />
          </div>
        </section>
      )}

      {s.gallery && (
        <section className="section section--tight" aria-labelledby="gal-t">
          <div className="wrap">
            <p className="kicker">Portfolio</p>
            <h2 id="gal-t" className="h-lg" data-fx="03" style={{ marginBottom: 48 }}><Split text={s.gallery.title} /></h2>
            <Gallery items={s.gallery.items} layout={s.gallery.layout} />
          </div>
        </section>
      )}

      <section className="section section--tight" aria-labelledby="faq-t">
        <div className="wrap split" style={{ alignItems: "start" }}>
          <div>
            <p className="kicker">Preguntas frecuentes</p>
            <h2 id="faq-t" className="h-lg">Lo que suelen preguntarnos sobre {s.name.toLowerCase().replace("&", "y")}</h2>
          </div>
          <div className="faq">
            {s.faq.map((f) => (
              <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
            ))}
          </div>
        </div>
      </section>

      <div className="wrap">
        <Link href={`/${next.slug}/`} className="next-svc">
          <div><span>Siguiente servicio · {next.code}</span><strong>{next.name}</strong></div>
          <span className="svc-row__go" aria-hidden="true"><Arrow /></span>
        </Link>
      </div>

      <CtaBlock title={s.ctaLine} />
    </>
  );
}
