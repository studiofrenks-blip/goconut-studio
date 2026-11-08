"use client";
import Image from "next/image";

// Animación 7 del Kit Frenks: hilos de luz. Cuatro pasos alrededor y uno en el centro;
// por cada curva viaja un destello dorado hacia el centro.
export type Beam = { n: string; t: string; d: string };

export default function Beams({ items }: { items: Beam[] }) {
  // posiciones en un lienzo 100x100
  const pos = [ [12, 18], [88, 18], [12, 82], [88, 82] ];
  return (
    <>
    <ol className="relative mx-auto max-w-md space-y-3 pl-8 sm:hidden">
      <span aria-hidden className="absolute bottom-2 left-3 top-2 w-px bg-black/10" />
      <span aria-hidden className="beam-v absolute left-[11px] top-2 h-10 w-[3px] rounded-full bg-[var(--gold)]" />
      {items.map((it) => (
        <li key={it.n} className="relative rounded-2xl border border-black/5 bg-white p-4">
          <span aria-hidden className="absolute -left-[26px] top-5 size-2.5 rounded-full bg-[var(--gold)] ring-4 ring-[var(--paper)]" />
          <p className="text-[11px] font-semibold text-[var(--gold-ink)]">{it.n}</p>
          <p className="font-display text-lg leading-tight">{it.t}</p>
          <p className="mt-1 text-sm text-[var(--ink)]/65">{it.d}</p>
        </li>
      ))}
    </ol>
    <div className="relative mx-auto hidden aspect-[4/3] w-full max-w-3xl sm:block">
      <svg viewBox="0 0 100 75" className="absolute inset-0 size-full" aria-hidden preserveAspectRatio="none">
        {pos.map(([x, y], k) => {
          const yy = (y * 75) / 100;
          const d = `M ${x} ${yy} C ${x} 37.5, 50 ${yy}, 50 37.5`;
          return (
            <g key={k}>
              <path d={d} fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth=".35" vectorEffect="non-scaling-stroke" />
              <path d={d} fill="none" stroke="var(--gold)" strokeWidth=".7" strokeLinecap="round" className="beam" style={{ animationDelay: `${k * 0.6}s` }} pathLength={100} />
            </g>
          );
        })}
      </svg>
      <div className="absolute left-1/2 top-1/2 grid size-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[var(--night)] shadow-[0_0_0_10px_rgba(212,174,85,.12),0_20px_50px_-10px_rgba(15,31,23,.5)] sm:size-28">
        <Image src="/marca/logo-ilu-blanco.png" alt="Adornos ILU" width={605} height={892} className="h-14 w-auto sm:h-16" />
      </div>
      {items.map((it, k) => {
        const [x, y] = pos[k];
        return (
          <div key={it.n} style={{ left: `${x}%`, top: `${y}%` }} className="absolute w-[38%] max-w-[230px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-black/5 bg-white/90 p-3 shadow-sm backdrop-blur sm:p-4">
            <p className="text-[11px] font-semibold text-[var(--gold-ink)]">{it.n}</p>
            <p className="font-display text-[15px] leading-tight sm:text-lg">{it.t}</p>
            <p className="mt-1 hidden text-[13px] leading-snug text-[var(--ink)]/65 sm:block">{it.d}</p>
          </div>
        );
      })}
    </div>
    </>
  );
}
