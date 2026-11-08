import Link from "next/link";
import Reveal from "./Reveal";
import type { Texts } from "@/content/texts";

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
    <section className="wrap" aria-labelledby="cta-title">
      <Reveal className="cta-band">
        <p className="kicker">{t["cta.kicker"]}</p>
        <h2 id="cta-title" className="h-xl">
          {title || t["cta.title"]}
        </h2>
        <p>{body || t["cta.body"]}</p>
        <Link className="btn btn-lime" href={contactHref}>
          {t["cta.button"]} <span className="arrow" aria-hidden="true">→</span>
        </Link>
      </Reveal>
    </section>
  );
}
