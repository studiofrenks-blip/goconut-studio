"use client";
// Portada: escenario a oscuras con un foco que sigue al dedo o al ratón
// (Kit Frenks nº 1 «se enciende siguiendo el dedo», llevado a toda la pantalla).
// Sin ratón, el foco se pasea solo por el escenario.
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
  eyebrow: string;
  titleA: string;
  rotPrefix: string;
  words: string[];
  fullTitle: string;
  lead: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  stickers: string[];
  hint: string;
  imgAlt: string;
};

export default function SpotlightHero(p: Props) {
  const ref = useRef<HTMLElement>(null);
  const [word, setWord] = useState(0);
  const [prev, setPrev] = useState(-1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    let x = 0.62,
      y = 0.45,
      tx = x,
      ty = y,
      last = 0,
      raf = 0,
      t0 = performance.now(),
      visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(el);
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
      last = performance.now();
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onMove);
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const idle = now - last > (fine ? 2500 : 3500);
      if (idle && !still) {
        const t = (now - t0) / 1000;
        tx = 0.55 + Math.sin(t * 0.45) * 0.3;
        ty = 0.5 + Math.sin(t * 0.7 + 1) * 0.2;
      }
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      el.style.setProperty("--sx", `${(x * 100).toFixed(2)}%`);
      el.style.setProperty("--sy", `${(y * 100).toFixed(2)}%`);
      el.style.setProperty("--px", (x - 0.5).toFixed(3));
      el.style.setProperty("--py", (y - 0.5).toFixed(3));
    };
    raf = requestAnimationFrame(tick);
    const iv = still ? 0 : window.setInterval(
          () =>
            setWord((w) => {
              setPrev(w);
              return (w + 1) % p.words.length;
            }),
          2200
        );
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(iv);
      io.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onMove);
    };
  }, [p.words.length]);

  return (
    <section className="sh" ref={ref} aria-labelledby="sh-title">
      <div className="sh-photo">
        <Image src="/img/show-en-directo-publico.jpg" alt={p.imgAlt} fill priority sizes="100vw" />
      </div>
      <div className="sh-dark" aria-hidden="true" />
      <div className="sh-haze" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />

      <div className="stickers" aria-hidden="true">
        {p.stickers.map((s, i) => (
          <span key={s} className={`sticker s${i + 1}`}>
            {s}
          </span>
        ))}
      </div>

      <div className="wrap sh-content">
        <p className="sh-eyebrow">
          <span className="live-dot" aria-hidden="true" /> {p.eyebrow}
        </p>
        <h1 id="sh-title" className="sh-title">
          <span className="sr-only">{p.fullTitle}</span>
          <span aria-hidden="true">
            <span className="ln ln1">{p.titleA}</span>
            <span className="ln ln2">{p.rotPrefix}</span>
            <span className="ln ln3 rot">
              {p.words.map((w, i) => (
                <span key={w} className="rot-w" data-s={i === word ? "on" : i === prev ? "out" : "wait"}>
                  {w}.
                </span>
              ))}
            </span>
          </span>
        </h1>
        <div className="sh-foot">
          <p className="sh-lead">{p.lead}</p>
          <div className="ctas">
            <Link className="btn btn-lime btn-xl" href={p.primary.href}>
              {p.primary.label} <span className="arrow" aria-hidden="true">→</span>
            </Link>
            <Link className="btn btn-ghost btn-xl" href={p.secondary.href}>
              {p.secondary.label}
            </Link>
          </div>
        </div>
      </div>
      <p className="sh-hint" aria-hidden="true">
        ✦ {p.hint}
      </p>
    </section>
  );
}
