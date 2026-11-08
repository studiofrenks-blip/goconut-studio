import Link from "next/link";
import Image from "next/image";
import { getAbout, getServices } from "@/lib/data";
import { crumbsLd, pageMeta } from "@/lib/seo";
import Split from "@/components/Split";
import CtaBlock from "@/components/CtaBlock";
import JsonLd from "@/components/JsonLd";
import ServiceCards from "@/components/ServiceCards";

export const metadata = pageMeta({
  title: "Nosotros: la agencia creativa que hace crecer tu negocio",
  description: "Conoce Revolyiu: una agencia creativa integral que combina estrategia, diseño y tecnología para transformar ideas en marcas memorables.",
  path: "/nosotros/",
});

export default async function Nosotros() {
  const [a, services] = await Promise.all([getAbout(), getServices()]);
  return (
    <>
      <JsonLd data={crumbsLd([{ name: "Inicio", path: "/" }, { name: "Nosotros", path: "/nosotros/" }])} />
      <section className="phero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Migas de pan"><Link href="/">Inicio</Link>/<span aria-current="page">Nosotros</span></nav>
          <p className="kicker">{a.kicker}</p>
          <h1 data-fx="03"><Split text="Somos quienes hacen" /> <span className="grad"><Split text="crecer tu negocio" offset={3} /></span></h1>
          <p className="lead" data-fx="01">{a.lead}</p>
        </div>
      </section>
      <section className="section section--tight">
        <div className="wrap split">
          <div className="duo">
            {a.imgs.map((im, i) => (
              <div className="frame" key={im.src} data-parallax={i ? "-0.04" : "0.04"}><Image src={im.src} alt={im.alt} width={im.w} height={im.h} sizes="(max-width: 900px) 50vw, 24vw" /></div>
            ))}
          </div>
          <div data-fx="01">
            {a.body.map((p) => <p className="lead" key={p.slice(0, 20)} style={{ marginBottom: 24 }}>{p}</p>)}
          </div>
        </div>
      </section>
      <section className="section" aria-labelledby="val-t">
        <div className="wrap">
          <p className="kicker">Cómo trabajamos</p>
          <h2 id="val-t" className="h-lg" data-fx="03"><Split text="Lo que nos mueve" /></h2>
          <div className="values" data-fx="06">
            {a.values.map((v) => (<div key={v.title}><h3>{v.title}</h3><p>{v.text}</p></div>))}
          </div>
        </div>
      </section>
      <section className="section section--tight" aria-labelledby="svc2-t">
        <div className="wrap">
          <p className="kicker">Qué hacemos</p>
          <h2 id="svc2-t" className="h-lg" data-fx="03" style={{ marginBottom: 48 }}><Split text="Seis disciplinas, un equipo" /></h2>
          <ServiceCards items={services} />
        </div>
      </section>
      <CtaBlock title="¿Damos el siguiente paso juntos?" line="Una agencia que entiende lo que tu marca necesita. Cuéntanos tu proyecto." />
    </>
  );
}
