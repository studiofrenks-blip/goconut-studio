import Link from "next/link";
import { Arrow } from "./Icons";
import Split from "./Split";

export default function CtaBlock({ kicker = "¿Hablamos?", line = "Construyamos juntos algo grande." }: { kicker?: string; line?: string }) {
  return (
    <section className="bigcta" aria-labelledby="cta-t">
      <div className="bigcta__rings" aria-hidden="true"><span /><span /><span /></div>
      <div className="wrap">
        <p className="kicker" style={{ justifyContent: "center" }}>{kicker}</p>
        <h2 id="cta-t">
          <span className="bigcta__word grad" data-fx="03"><Split text="Hablemos" /></span>
          <span className="lead" style={{ display: "block", margin: "0 auto 40px", fontWeight: 300, letterSpacing: 0 }}>{line}</span>
        </h2>
        <Link href="/contacto/" className="btn btn--primary" data-magnetic>Cuéntanos tu proyecto <Arrow /></Link>
      </div>
    </section>
  );
}
