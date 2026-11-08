"use client";
// Kit Frenks nº 2 · «Órbita con fichas». Las piezas giran alrededor del centro;
// al tocar una, el giro se para y su información se abre en el medio.
import { useEffect, useRef, useState } from "react";

type Item = { label: string; text: string };

export default function Orbit({ core, items, hint }: { core: string; items: Item[]; hint: string }) {
  const [active, setActive] = useState(-1);
  const [manual, setManual] = useState(false);
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
      const radius = w * (w < 460 ? 0.3 : 0.38);
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

  // Sin tocar nada, la órbita va enseñando cada pieza: el contenido no queda escondido.
  useEffect(() => {
    if (manual || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = box.current;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.4 });
    if (el) io.observe(el);
    const iv = window.setInterval(() => {
      if (visible) setActive((a) => (a + 1) % items.length);
    }, 3200);
    return () => {
      clearInterval(iv);
      io.disconnect();
    };
  }, [manual, items.length]);

  const cur = active >= 0 ? items[active] : null;
  return (
    <div>
      <div className="orbit" ref={box}>
        <div className="orbit-ring" />
        <div className="orbit-ping" />
        <div className="orbit-ping b" />
        <div className="orbit-core" aria-live="polite">
          <div>
            {cur ? (
              <>
                <strong>{cur.label}</strong>
                <p>{cur.text}</p>
              </>
            ) : (
              <img src="/img/ideaholiks-logo.svg" alt={core} width={150} height={64} className="orbit-logo" />
            )}
          </div>
        </div>
        {items.map((it, i) => (
          <button
            key={it.label}
            ref={(n) => {
              nodes.current[i] = n;
            }}
            className={`orbit-node n${i + 1}`}
            aria-pressed={active === i}
            onClick={() => {
              setManual(true);
              setActive((v) => (v === i ? -1 : i));
            }}
          >
            {it.label}
          </button>
        ))}
      </div>
      <div className="orbit-dots" aria-hidden="true">
        {items.map((it, i) => (
          <i key={it.label} data-on={i === active ? "1" : "0"} />
        ))}
      </div>
      <p className="orbit-hint">{hint}</p>
    </div>
  );
}
