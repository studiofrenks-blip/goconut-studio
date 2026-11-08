import Image from "next/image";

// Cabecera editorial: titular enorme con una foto en píldora dentro del texto
// y un bento de fotos nítidas (sin velos oscuros) que se destapan al cargar.
export default function PageHero({ eyebrow, before, pill, after, text, images = [], children }: {
  eyebrow?: string; before: string; pill?: string; after?: string; text?: string; images?: { src: string; alt: string }[]; children?: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-14 sm:px-6 sm:pt-20">
      {eyebrow && (
        <p className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-white px-3 py-1 text-[12px] font-semibold uppercase tracking-wide text-[var(--gold-ink)]">
          <span aria-hidden className="size-1.5 rounded-full bg-[var(--gold)]" />{eyebrow}
        </p>
      )}
      <h1 className="font-display mt-6 text-[clamp(2.8rem,8.5vw,7.2rem)] leading-[0.95]">
        {before}
        {pill && (
          <span className="relative mx-[0.12em] inline-block h-[0.78em] w-[1.7em] translate-y-[0.06em] overflow-hidden rounded-full align-baseline">
            <Image src={pill} alt="" fill priority sizes="200px" className="hero-pill object-cover" />
          </span>
        )}
        {after && <> <span className="font-serif-accent text-[var(--gold-ink)]">{after}</span></>}
      </h1>
      {text && <p className="mt-6 max-w-xl text-lg leading-relaxed text-[var(--ink)]/80">{text}</p>}
      {children}
      {images.length >= 3 && (
        <div className="mt-12 grid h-[clamp(320px,52vw,560px)] grid-cols-4 grid-rows-2 gap-3">
          {images.slice(0, 3).map((im, i) => (
            <div key={im.src} className={`hero-tile relative overflow-hidden rounded-[1.75rem] ${i === 0 ? "col-span-2 row-span-2" : "col-span-2 sm:col-span-1 sm:row-span-2"} ${i === 2 ? "hidden sm:block" : ""}`} style={{ animationDelay: `${i * 0.12}s` }}>
              <Image src={im.src} alt={im.alt} fill priority={i === 0} sizes="(min-width:640px) 50vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
