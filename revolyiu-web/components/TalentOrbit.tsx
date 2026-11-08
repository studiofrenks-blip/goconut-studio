"use client";
// Kit Frenks · 2 — Órbita con fichas. Tocas una, el giro se para y su información se abre en el centro.
import { useEffect, useRef, useState } from "react";

export type OrbitItem = { label: string; text: string };

export default function TalentOrbit({ items, hint = "Toca una" }: { items: OrbitItem[]; hint?: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState(-1);
  const selRef = useRef(-1);
  selRef.current = sel;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const nodes = Array.from(el.querySelectorAll<HTMLElement>(".orbit2__node"));
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let spin = 0, raf = 0;
    const place = () => {
      const r = el.clientWidth / 2 - (el.clientWidth < 420 ? 40 : 64);
      nodes.forEach((n, i) => {
        const a = (i / nodes.length) * Math.PI * 2 + spin - Math.PI / 2;
        const on = i === selRef.current;
        n.style.transform = `translate(${(Math.cos(a) * r).toFixed(1)}px, ${(Math.sin(a) * r).toFixed(1)}px) scale(${on ? 1.12 : 1})`;
      });
    };
    const loop = () => { if (selRef.current === -1 && !still) spin += 0.0035; place(); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const cur = sel >= 0 ? items[sel] : null;
  return (
    <div className="orbit2" ref={box}>
      <div className="orbit2__ring" aria-hidden="true" />
      <div className="orbit2__core" aria-live="polite">
        {cur ? (<><strong>{cur.label}</strong><span>{cur.text}</span></>) : <span className="orbit2__hint">{hint}</span>}
      </div>
      {items.map((it, i) => (
        <button key={it.label} type="button" className="orbit2__node" aria-pressed={sel === i} onClick={() => setSel(sel === i ? -1 : i)}>
          {it.label}
        </button>
      ))}
    </div>
  );
}
