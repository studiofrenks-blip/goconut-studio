"use client";
// Kit Frenks nº 2 · «Órbita con fichas». Las piezas giran alrededor del centro;
// al tocar una, el giro se para y su información se abre en el medio.
import { useEffect, useRef, useState } from "react";

type Item = { label: string; text: string };

export default function Orbit({ core, items, hint }: { core: string; items: Item[]; hint: string }) {
  const [active, setActive] = useState(-1);
  const box = useRef<HTMLDivElement>(null);
  const nodes = useRef<(HTMLButtonElement | null)[]>([]);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let angle = -90;
    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    const place = () => {
      const w = el.clientWidth;
      const radius = w * 0.38;
      nodes.current.forEach((n, i) => {
        if (!n) return;
        const a = ((i / items.length) * 360 + angle) * (Math.PI / 180);
        n.style.transform = `translate(${(Math.cos(a) * radius).toFixed(1)}px, ${(Math.sin(a) * radius).toFixed(1)}px)`;
      });
    };
    const tick = () => {
      if (visible && activeRef.current === -1 && !still) angle += 0.12;
      place();
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [items.length]);

  const cur = active >= 0 ? items[active] : null;
  return (
    <div>
      <div className="orbit" ref={box}>
        <div className="orbit-ring" />
        <div className="orbit-ping" />
        <div className="orbit-ping b" />
        <div className="orbit-core" aria-live="polite">
          <div>
            <strong>{cur ? cur.label : core}</strong>
            {cur && <p>{cur.text}</p>}
          </div>
        </div>
        {items.map((it, i) => (
          <button
            key={it.label}
            ref={(n) => {
              nodes.current[i] = n;
            }}
            className="orbit-node"
            aria-pressed={active === i}
            onClick={() => setActive((v) => (v === i ? -1 : i))}
          >
            {it.label}
          </button>
        ))}
      </div>
      <p className="orbit-hint">{hint}</p>
    </div>
  );
}
