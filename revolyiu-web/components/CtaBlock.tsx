import Link from "next/link";
import { Arrow } from "./Icons";

export default function CtaBlock({ title = "Construye tu idea, nosotros la ejecutamos", line = "Cuéntanos tu marca, tus metas y tus ideas. Te respondemos con una propuesta a medida." }: { kicker?: string; title?: string; line?: string }) {
  return (
    <section className="bigcta" aria-labelledby="cta-t">
      <div className="wrap">
        <div className="cta-band" data-fx="04">
          <div>
            <h2 id="cta-t">{title}</h2>
            <p>{line}</p>
          </div>
          <Link href="/contacto/" className="btn" data-magnetic>Hablemos <Arrow /></Link>
        </div>
      </div>
    </section>
  );
}
