"use client";
// Kit Frenks nº 5 · «Vídeo que se abre al bajar», con la foto del show.
// La foto empieza pequeña en el centro; al bajar crece hasta llenar la pantalla
// y el titular se parte en dos y se aparta a los lados.
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
  eyebrow: string;
  h1a: string;
  h1b: string;
  lead: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
  scrollHint: string;
  imgAlt: string;
};

export default function HeroExpand(p: Props) {
  const ref = useRef<HTMLElement>(null);
  const [isStatic, setStatic] = useState(false);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStatic(true);
      return;
    }
    let raf = 0;
    // Hueco libre entre las dos mitades del titular: ahí va la foto pequeña.
    let small = 0.3;
    let offY = 0;
    const measure = () => {
      const a = el.querySelector<HTMLElement>(".line.a");
      const b = el.querySelector<HTMLElement>(".line.b");
      if (!a || !b) return;
      const vh = window.innerHeight;
      const top = a.offsetTop + a.offsetHeight + 20;
      const bottom = b.offsetTop - 20;
      const gap = Math.max(80, bottom - top);
      small = Math.min(0.55, Math.max(0.16, gap / vh));
      offY = (top + bottom) / 2 - vh / 2;
    };
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const prog = clamp(-r.top / (total || 1));
      const grow = ease(clamp(prog / 0.6)); // 0 → 0.6: la foto crece
      const after = clamp((prog - 0.55) / 0.3); // 0.55 → 0.85: aparece el texto
      el.style.setProperty("--hs", String(small + (1 - small) * grow));
      el.style.setProperty("--hy", String(offY * (1 - grow)));
      el.style.setProperty("--hr", String(28 * (1 - grow)));
      el.style.setProperty("--hx", String(grow * 60));
      el.style.setProperty("--tl", String(1 - clamp(grow * 1.6)));
      el.style.setProperty("--ho", String(grow));
      el.style.setProperty("--ha", String(after));
      setLive(after > 0.6);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    update();
    document.fonts?.ready.then(onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="hero" ref={ref} data-static={isStatic ? "1" : "0"} aria-labelledby="hero-title">
      <div className="hero-stage">
        <div className="hero-glow" />
        <div className="hero-eyebrow wrap">
          <span>{p.eyebrow}</span>
        </div>
        <div className="hero-media">
          <Image
            src="/img/show-en-directo-publico.jpg"
            alt={p.imgAlt}
            fill
            priority
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="hero-title wrap">
          <h1 id="hero-title">
            <span className="line a">{p.h1a}</span> <span className="line b grad-text">{p.h1b}</span>
          </h1>
        </div>
        <div className="hero-after" data-live={live || isStatic ? "1" : "0"}>
          <div className="wrap">
            <p className="lead">{p.lead}</p>
            <div className="ctas">
              <Link className="btn btn-lime" href={p.primary.href} tabIndex={live || isStatic ? 0 : -1}>
                {p.primary.label} <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <Link className="btn btn-ghost" href={p.secondary.href} tabIndex={live || isStatic ? 0 : -1}>
                {p.secondary.label}
              </Link>
            </div>
          </div>
        </div>
        <div className="scroll-hint" aria-hidden="true">
          {p.scrollHint}
          <i />
        </div>
      </div>
    </section>
  );
}
