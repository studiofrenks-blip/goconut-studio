"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Step = { img: string; alt: string; kicker: string; title: string; text: string };

// Historia con scroll: la foto se queda fija y cambia mientras los textos pasan a su lado.
export default function StickyStory({ steps }: { steps: Step[] }) {
  const [i, setI] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setI(Number((e.target as HTMLElement).dataset.i)); }), { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  return (
    <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2">
      <div className="sticky top-20 hidden h-[calc(100svh-7rem)] overflow-hidden rounded-[28px] lg:block">
        {steps.map((s, k) => (
          <Image key={s.img} src={s.img} alt={s.alt} fill sizes="50vw" className={`object-cover transition-[opacity,transform] duration-700 ${k === i ? "scale-100 opacity-100" : "scale-105 opacity-0"}`} />
        ))}
        <div className="absolute bottom-5 left-5 flex gap-1.5">
          {steps.map((s, k) => <span key={s.img} className={`h-1.5 rounded-full bg-white transition-all ${k === i ? "w-8" : "w-1.5 opacity-60"}`} />)}
        </div>
      </div>
      <div>
        {steps.map((s, k) => (
          <div key={s.title} data-i={k} ref={(el) => { refs.current[k] = el; }} className="flex min-h-[80svh] flex-col justify-center py-10 lg:min-h-[100svh]">
            <div className="relative mb-6 aspect-[4/3] overflow-hidden rounded-[24px] lg:hidden"><Image src={s.img} alt={s.alt} fill sizes="100vw" className="object-cover" /></div>
            <p className="text-[13px] font-semibold uppercase tracking-wide text-[var(--gold-ink)]">{s.kicker}</p>
            <h3 className={`font-display mt-3 text-4xl leading-[1.05] transition-opacity duration-500 sm:text-5xl ${k === i ? "opacity-100" : "lg:opacity-30"}`}>{s.title}</h3>
            <p className={`mt-5 max-w-md text-lg leading-relaxed text-[var(--ink)]/70 transition-opacity duration-500 ${k === i ? "opacity-100" : "lg:opacity-30"}`}>{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
