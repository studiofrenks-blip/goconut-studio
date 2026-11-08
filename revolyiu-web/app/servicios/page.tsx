import { getServices } from "@/lib/data";
import { crumbsLd, pageMeta } from "@/lib/seo";
import Link from "next/link";
import ServiceStack from "@/components/ServiceStack";
import CtaBlock from "@/components/CtaBlock";
import Split from "@/components/Split";
import JsonLd from "@/components/JsonLd";

export const metadata = pageMeta({
  title: "Servicios: branding, web, marketing, CRM y más",
  description: "Seis disciplinas, un único equipo: branding, desarrollo web, marketing creativo, CRM, gestión de talentos y arquitectura e interiorismo.",
  path: "/servicios/",
});

export default async function Servicios() {
  const services = await getServices();
  return (
    <>
      <JsonLd data={crumbsLd([{ name: "Inicio", path: "/" }, { name: "Servicios", path: "/servicios/" }])} />
      <section className="phero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Migas de pan"><Link href="/">Inicio</Link>/<span aria-current="page">Servicios</span></nav>
          <p className="kicker">Gran variedad de soluciones</p>
          <h1 data-fx="03"><Split text="Servicios" /></h1>
          <p className="lead" data-fx="01">Seis disciplinas coordinadas por un mismo equipo. De la estrategia a la ejecución, para que tu marca avance en una sola dirección.</p>
        </div>
      </section>
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap"><ServiceStack items={services} headingLevel={2} /></div>
      </section>
      <CtaBlock />
    </>
  );
}
