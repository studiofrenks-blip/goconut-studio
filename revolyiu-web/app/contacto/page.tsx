import Link from "next/link";
import { site } from "@/lib/content";
import { crumbsLd, pageMeta } from "@/lib/seo";
import Split from "@/components/Split";
import JsonLd from "@/components/JsonLd";
import ContactForm from "@/components/ContactForm";
import { Mail, Phone, WhatsApp, YouTube } from "@/components/Icons";

export const metadata = pageMeta({
  title: "Contacto: cuéntanos tu proyecto",
  description: "Escríbenos o llámanos al +34 661 144 170. Te ayudamos con branding, web, marketing, CRM, talentos o arquitectura. Respuesta rápida.",
  path: "/contacto/",
});

export default function Contacto() {
  return (
    <>
      <JsonLd data={crumbsLd([{ name: "Inicio", path: "/" }, { name: "Contacto", path: "/contacto/" }])} />
      <section className="phero phero--compact">
        <div className="wrap">
          <nav className="crumbs" aria-label="Migas de pan"><Link href="/">Inicio</Link>/<span aria-current="page">Contacto</span></nav>
          <p className="kicker">Hablemos de tu próximo proyecto</p>
          <h1 data-fx="03"><Split text="Contáctanos" /></h1>
          <p className="lead">Cuéntanos tu proyecto y te respondemos con una propuesta a medida.</p>
        </div>
      </section>
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap contact">
          <ContactForm />
          <aside className="cards" data-fx="06">
            <div className="card">
              <h2>Revolyiu</h2>
              <a href={site.phoneHref}><Phone />{site.phone}</a>
              <a href={`mailto:${site.email}`}><Mail />{site.email}</a>
              <a href={site.whatsapp} target="_blank" rel="noopener noreferrer"><WhatsApp />WhatsApp</a>
              <a href={site.youtube} target="_blank" rel="noopener noreferrer"><YouTube />YouTube</a>
            </div>
            <div className="card">
              <h2>Agencia de talentos</h2>
              <a href={site.phoneHref}><Phone />{site.phone}</a>
              <a href={`mailto:${site.talentEmail}`}><Mail />{site.talentEmail}</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
