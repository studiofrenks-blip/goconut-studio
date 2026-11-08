"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// Animación 2 del Kit Frenks: órbita con fichas. Tocas un punto, el giro se para y su ficha se abre en el centro.
export type OrbitItem = { n: string; t: string; d: string };

export default function Orbit({ items }: { items: OrbitItem[] }) {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [angle, setAngle] = useState(0);
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (reduce || paused) return;
    let last = performance.now();
    const tick = (now: number) => {
      setAngle((a) => (a + (now - last) * 0.012) % 360);
      last = now;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [reduce, paused]);

  // Sin tocar nada, la ficha activa va cambiando sola para que se entienda.
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % items.length), 3500);
    return () => clearInterval(id);
  }, [paused, items.length]);

  const cur = items[active];
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <div aria-hidden className="absolute inset-[12%] rounded-full border border-white/15" />
      <div aria-hidden className="absolute inset-[30%] animate-ping rounded-full border border-[var(--gold)]/30 [animation-duration:3s]" />
      <div className="absolute inset-[26%] grid place-items-center rounded-full bg-[radial-gradient(circle_at_35%_30%,#24493a,#0f1f17)] p-6 text-center shadow-[0_0_80px_rgba(212,174,85,.18)]" aria-live="polite">
        <div>
          <p className="font-display text-4xl text-[var(--gold)]">{cur.n}</p>
          <p className="mt-1 text-base font-semibold sm:text-lg">{cur.t}</p>
          <p className="mt-2 text-xs leading-relaxed text-white/75 sm:text-sm">{cur.d}</p>
        </div>
      </div>
      {items.map((it, i) => {
        const a = ((i / items.length) * 360 + angle) * (Math.PI / 180);
        const x = 50 + Math.cos(a) * 38;
        const y = 50 + Math.sin(a) * 38;
        const on = i === active;
        return (
          <button
            key={it.n}
            type="button"
            aria-label={`${it.n}: ${it.t}`}
            aria-pressed={on}
            onClick={() => { setActive(i); setPaused(on ? !paused : true); }}
            style={{ left: `${x}%`, top: `${y}%` }}
            className={`absolute grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-sm font-semibold transition-[background,box-shadow,transform] duration-300 sm:size-16 ${on ? "scale-110 border-[var(--gold)] bg-[var(--gold)] text-[var(--night)] shadow-[0_0_0_8px_rgba(212,174,85,.18)]" : "border-white/30 bg-[var(--night-2)] text-white hover:border-[var(--gold)]"}`}
          >
            {it.n}
          </button>
        );
      })}
    </div>
  );
}
