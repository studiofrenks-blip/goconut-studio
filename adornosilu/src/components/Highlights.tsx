"use client";
import Image from "next/image";
import { useRef } from "react";

export type Highlight = { img: string; alt: string; kicker: string; title: string; dark?: boolean };

// Carrusel de destacados con scroll horizontal y flechas, al estilo "lo esencial" de las webs de producto.
export default function Highlights({ items }: { items: Highlight[] }) {
  const ref = useRef<HTMLUListElement>(null);
  const go = (d: number) => ref.current?.scrollBy({ left: d * (ref.current.clientWidth * 0.8), behavior: "smooth" });
  return (
    <div>
      <ul ref={ref} className="no-bar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 sm:scroll-px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))] sm:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]">
        {items.map((h) => (
          <li key={h.title} className="relative h-[520px] w-[82vw] max-w-[380px] shrink-0 snap-start overflow-hidden rounded-[28px] bg-white sm:h-[600px]">
            <Image src={h.img} alt={h.alt} fill sizes="380px" className="object-cover" />
            <div className={`absolute inset-x-0 top-0 p-7 ${h.dark ? "bg-gradient-to-b from-black/55 to-transparent text-white" : "bg-gradient-to-b from-white/90 via-white/60 to-transparent"}`}>
              <p className="text-[13px] font-semibold uppercase tracking-wide opacity-80">{h.kicker}</p>
              <p className="font-display mt-2 text-[26px] leading-[1.1]">{h.title}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mx-auto mt-5 flex max-w-6xl justify-end gap-2 px-4 sm:px-6">
        <button type="button" onClick={() => go(-1)} aria-label="Anterior" className="grid size-10 place-items-center rounded-full bg-black/5 hover:bg-black/10">‹</button>
        <button type="button" onClick={() => go(1)} aria-label="Siguiente" className="grid size-10 place-items-center rounded-full bg-black/5 hover:bg-black/10">›</button>
      </div>
    </div>
  );
}
