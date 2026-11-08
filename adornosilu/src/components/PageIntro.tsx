import InView from "./InView";

// Cabecera de página interior: H1 condensado que se estira al cargar + entradilla.
export default function PageIntro({ eyebrow, a, b, lead, children }: { eyebrow?: string; a: string; b?: string; lead?: string; children?: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-14 sm:px-8 sm:pt-24">
      {eyebrow && eyebrow.toLowerCase() !== a.toLowerCase() && <p className="eyebrow">{eyebrow}</p>}
      <InView as="h1" className="kinetic font-display condensed mt-3 text-[clamp(40px,6vw,88px)]">
        {a}{b && <> <span className="text-[var(--accent)]">{b}</span></>}
      </InView>
      {lead && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--cream-2)]">{lead}</p>}
      {children}
    </section>
  );
}
