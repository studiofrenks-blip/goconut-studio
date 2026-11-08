import Image from "next/image";

// Animación 7 del Kit Frenks: hilos de luz. Cuatro claves alrededor y el logo en el centro;
// por cada curva viaja un destello dorado. En el móvil, línea vertical.
export type Beam = { n: string; t: string; d: string };
const pos = [[12, 18], [88, 18], [12, 82], [88, 82]];

export default function Beams({ items }: { items: Beam[] }) {
  return (
    <>
      <ol className="relative mx-auto max-w-md space-y-3 pl-8 sm:hidden">
        <span aria-hidden className="absolute bottom-2 left-3 top-2 w-px bg-[var(--line)]" />
        {items.map((it) => (
          <li key={it.n} className="relative rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] p-5">
            <span aria-hidden className="absolute -left-[26px] top-6 size-2.5 rounded-full bg-[var(--accent)] ring-4 ring-[var(--bg)]" />
            <p className="text-xs font-semibold text-[var(--accent)]">{it.n}</p>
            <p className="font-display text-xl leading-tight">{it.t}</p>
            <p className="mt-1 text-sm text-[var(--cream-2)]">{it.d}</p>
          </li>
        ))}
      </ol>
      <div className="relative mx-auto hidden aspect-[4/3] w-full max-w-4xl sm:block">
        <svg viewBox="0 0 100 75" className="absolute inset-0 size-full" aria-hidden preserveAspectRatio="none">
          {pos.map(([x, y], k) => {
            const yy = (y * 75) / 100;
            const d = `M ${x} ${yy} C ${x} 37.5, 50 ${yy}, 50 37.5`;
            return (
              <g key={k}>
                <path d={d} fill="none" stroke="rgba(241,239,228,.14)" strokeWidth=".25" />
                <path d={d} fill="none" stroke="var(--accent)" strokeWidth=".7" strokeLinecap="round" className="beam" style={{ animationDelay: `${k * 0.6}s` }} pathLength={100} />
              </g>
            );
          })}
        </svg>
        <div className="absolute left-1/2 top-1/2 grid size-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[var(--line)] bg-[var(--bg-2)] shadow-[0_0_80px_rgba(224,177,65,.25)]">
          <Image src="/marca/logo-ilu-blanco.png" alt="" width={605} height={892} className="h-16 w-auto" />
        </div>
        {items.map((it, k) => (
          <div key={it.n} style={{ left: `${pos[k][0]}%`, top: `${pos[k][1]}%` }} className="absolute w-[36%] max-w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] p-5">
            <p className="text-xs font-semibold text-[var(--accent)]">{it.n}</p>
            <p className="font-display text-xl leading-tight">{it.t}</p>
            <p className="mt-1 text-sm leading-snug text-[var(--cream-2)]">{it.d}</p>
          </div>
        ))}
      </div>
    </>
  );
}
