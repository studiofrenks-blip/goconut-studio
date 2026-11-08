import Image from "next/image";

export default function PageHero({ eyebrow, title, text, image, children }: { eyebrow?: string; title: string; text?: string; image?: string; children?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--night)] text-white">
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover opacity-45" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-[var(--night)] via-[var(--night)]/80 to-transparent" />
        </>
      )}
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 sm:pb-24 sm:pt-28">
        {eyebrow && <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--gold)]">{eyebrow}</p>}
        <h1 className="font-display mt-3 max-w-3xl text-5xl leading-[1.02] sm:text-7xl">{title}</h1>
        {text && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">{text}</p>}
        {children}
      </div>
    </section>
  );
}
