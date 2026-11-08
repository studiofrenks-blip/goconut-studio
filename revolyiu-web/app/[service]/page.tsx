import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { services as base } from "@/lib/content";
import { getService, getServices } from "@/lib/data";
import { crumbsLd, pageMeta } from "@/lib/seo";
import { site } from "@/lib/content";
import Split from "@/components/Split";
import Gallery from "@/components/Gallery";
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
  const REL: Record<string, string[]> = {
    "diseno-grafico-branding": ["desarrollo-web", "marketing-creativo"],
    "desarrollo-web": ["soluciones-crm", "marketing-creativo"],
    "marketing-creativo": ["diseno-grafico-branding", "gestion-de-talentos"],
    "soluciones-crm": ["desarrollo-web", "marketing-creativo"],
    "gestion-de-talentos": ["marketing-creativo", "diseno-grafico-branding"],
    "arquitectura-interiorismo": ["diseno-grafico-branding", "marketing-creativo"],
  };
  const related = (REL[s.slug] || []).map((r) => all.find((x) => x.slug === r)!).filter(Boolean);

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
              <Link href={`/contacto/?s=${s.slug}`} className="btn btn--primary">Pide tu propuesta <Arrow /></Link>
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

      {s.slug === "gestion-de-talentos" && (
        <section className="section section--tight" aria-labelledby="who-t">
          <div className="wrap">
            <p className="kicker">¿Por dónde empezamos?</p>
            <h2 id="who-t" className="h-lg" data-fx="01">Elige tu camino</h2>
            <div className="who" data-fx="06">
              <div className="who__col">
                <h3>Soy marca</h3>
                <p>Te ayudamos a encontrar el talento adecuado y gestionamos la campaña de principio a fin.</p>
                <Link href="/contacto/?s=gestion-de-talentos" className="btn btn--primary">Quiero trabajar con talentos <Arrow /></Link>
              </div>
              <div className="who__col">
                <h3>Soy talento</h3>
                <p>Representamos a influencers, artistas y creadores. Cuéntanos quién eres y qué haces.</p>
                <a href={`mailto:${site.talentEmail}`} className="btn">Escribir a la agencia de talentos <Arrow /></a>
              </div>
            </div>
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

      <section className="section section--tight" aria-labelledby="rel-t">
        <div className="wrap">
          <p className="kicker">Suele ir con</p>
          <h2 id="rel-t" className="h-lg" data-fx="01" style={{ marginBottom: 32 }}>Servicios que se complementan</h2>
          <div className="rel" data-fx="06">
            {related.map((r) => (
              <Link key={r.slug} href={`/${r.slug}/`} className="rel__card">
                <strong>{r.name}</strong>
                <span>{r.short}</span>
                <span className="rel__go">Ver servicio <Arrow /></span>
              </Link>
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

      <CtaBlock title={s.ctaLine} href={`/contacto/?s=${s.slug}`} />
    </>
  );
}
