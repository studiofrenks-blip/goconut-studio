import Link from "next/link";
import { site } from "@/lib/content";
import { Arrow } from "./Icons";

export default function CtaBlock({ title = "Construye tu idea. Nosotros la ejecutamos.", line = "Cuéntanos tu marca, tus metas y tus ideas. Te respondemos con una propuesta a medida.", button = "Pide tu propuesta", href = "/contacto/" }: { title?: string; line?: string; button?: string; href?: string; kicker?: string }) {
  return (
    <section className="cta-final" aria-labelledby="cta-t">
      <div className="wrap">
        <h2 id="cta-t" className="cta-final__phrase">{title}</h2>
        <p className="lead" style={{ marginTop: 20 }}>{line}</p>
        <div className="btn-row cta-final__row">
          <Link href={href} className="btn btn--primary">{button} <Arrow /></Link>
          <a href={site.phoneHref} className="btn">o llámanos: {site.phone}</a>
        </div>
      </div>
    </section>
  );
}
