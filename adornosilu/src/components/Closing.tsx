import { t } from "@/lib/dict";
import type { Lang } from "@/lib/i18n";
import { site } from "@/lib/site";
import Magnetic from "./Magnetic";

// Cierre: frase grande + botón (magnético en ordenador, a ancho completo en el móvil).
export default function Closing({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <section aria-labelledby="cierre" className="section mx-auto max-w-7xl px-4 sm:px-8">
      <h2 id="cierre" className="font-display condensed t-close">
        {d.closing.line1}<br /><span className="text-[var(--accent)]">{d.closing.line2}</span>
      </h2>
      <div className="mt-8">
        <Magnetic href={`https://wa.me/${site.company.whatsapp}?text=${encodeURIComponent(d.whatsappMsg)}`} label={d.whatsappCta}>{d.whatsappCta}</Magnetic>
      </div>
    </section>
  );
}
