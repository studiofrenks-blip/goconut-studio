import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import type { Texts } from "@/content/texts";

// Cierre de página: frase gigante y botón magnético.
export default function CtaBand({
  t,
  contactHref,
  title,
  body,
}: {
  t: Texts;
  contactHref: string;
  title?: string;
  body?: string;
}) {
  return (
    <section className="big-cta" aria-labelledby="cta-title">
      <div className="grain" aria-hidden="true" />
      <div className="wrap">
        <Reveal>
          <p className="kicker">{t["cta.kicker"]}</p>
          <h2 id="cta-title" className="big-cta-title">
            {title || t["home.bigCta"]}
          </h2>
        </Reveal>
        <div className="big-cta-row">
          <p>{body || t["cta.body"]}</p>
          <Magnetic href={contactHref} className="btn btn-lime btn-orb">
            {t["cta.button"]} <span className="arrow" aria-hidden="true">→</span>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
