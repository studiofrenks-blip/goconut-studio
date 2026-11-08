"use client";
// Kit Frenks · 3 — Fotos que se ordenan solas.
// Entran desperdigadas, se ponen en fila, se cierran en órbita y se abren en arco
// sobre el titular. Al bajar, el arco se abre y se desvanece.
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Img } from "@/lib/content";

export default function HeroMorph({ photos }: { photos: Img[] }) {
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>(".morph__card"));
    const N = cards.length;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    let phase: "scatter" | "line" | "circle" | "arc" = "scatter";
    let spin = 0, raf = 0, scrollP = 0;

    const geo = () => {
      const w = el.clientWidth, h = el.clientHeight, mob = w < 700;
      const card = mob ? 58 : Math.min(118, w * 0.085);
      return { w, h, mob, card, R: mob ? Math.min(w * 0.42, 175) : Math.min(w * 0.34, h * 0.42, 480) };
    };
    const place = () => {
      const g = geo();
      cards.forEach((c, i) => {
        let x = 0, y = 0, r = 0, s = 1, o = 1;
        if (phase === "scatter") {
          const seed = Math.sin(i * 91.7) * 10000; const rx = seed - Math.floor(seed);
          const seed2 = Math.sin(i * 17.3) * 10000; const ry = seed2 - Math.floor(seed2);
          x = (rx - 0.5) * g.w * 0.9; y = (ry - 0.5) * g.h * 0.7 - g.h * 0.12; r = (rx - 0.5) * 90; s = 0.6; o = 0;
        } else if (phase === "line") {
          x = (i - (N - 1) / 2) * g.card * 0.82; y = -g.h * 0.16;
        } else if (phase === "circle") {
          const a = (i / N) * Math.PI * 2 + spin;
          const rad = g.mob ? 92 : Math.min(g.h * 0.17, 150);
          x = Math.cos(a) * rad; y = Math.sin(a) * rad - g.h * 0.16; r = (a * 180) / Math.PI + 90;
        } else {
          const open = 1 + scrollP * 0.55;
          const a = ((-158 + (i / (N - 1)) * 136) * Math.PI) / 180 + Math.sin(spin) * 0.02;
          x = Math.cos(a) * g.R * open; y = Math.sin(a) * g.R * (g.mob ? 0.8 : 0.85) * open + g.h * (g.mob ? -0.13 : 0.0);
          r = ((a * 180) / Math.PI + 90) * 0.5; s = 1; o = 1 - scrollP * 0.9;
        }
        c.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${r.toFixed(1)}deg) scale(${s})`;
        c.style.opacity = String(o);
      });
    };

    const go = (p: typeof phase) => { phase = p; place(); };
    if (still) { go("arc"); el.classList.add("is-done"); }
    else {
      go("scatter");
      timers.push(window.setTimeout(() => go("line"), 250));
      timers.push(window.setTimeout(() => go("circle"), 1200));
      timers.push(window.setTimeout(() => { go("arc"); el.classList.add("is-done"); }, 2500));
      const loop = () => {
        spin += phase === "circle" ? 0.012 : 0.004;
        if (phase === "circle" || phase === "arc") place();
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }
    const onScroll = () => {
      scrollP = Math.min(1, Math.max(0, window.scrollY / (el.clientHeight * 0.9)));
      if (phase === "arc") place();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", place);
    return () => { timers.forEach(clearTimeout); cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", place); };
  }, []);

  return (
    <div className="morph" ref={box} aria-hidden="true">
      {photos.map((p, i) => (
        <div className="morph__card" key={p.src} style={{ ["--i" as string]: i }}>
          <Image src={p.src} alt="" width={p.w} height={p.h} sizes="120px" quality={70} priority={i < 4} />
        </div>
      ))}
    </div>
  );
}
