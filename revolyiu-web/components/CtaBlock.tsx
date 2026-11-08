import Link from "next/link";
import { Arrow } from "./Icons";

// Cierre: frase gigante + botón redondo magnético.
export default function CtaBlock({ title = "Construye tu idea. Nosotros la ejecutamos.", line = "Cuéntanos tu marca, tus metas y tus ideas. Te respondemos con una propuesta a medida.", button = "Hablemos", href = "/contacto/" }: { title?: string; line?: string; button?: string; href?: string; kicker?: string }) {
  return (
    <section className="cta-final" aria-labelledby="cta-t">
      <div className="wrap">
        <h2 id="cta-t" className="cta-final__phrase stretch">{title}</h2>
        <div className="cta-final__row">
          <p>{line}</p>
          <Link href={href} className="round" data-magnetic>{button}<Arrow /></Link>
        </div>
      </div>
    </section>
  );
}
