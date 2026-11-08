"use client";
// Kit Frenks nº 5 · «Vídeo que se abre al bajar», con la foto del show.
// La foto empieza pequeña en el centro; al bajar crece hasta llenar la pantalla
// y el titular se parte en dos y se aparta a los lados.
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Props = {
  kicker: string;
  a: string;
  b: string;
  body: string;
  cta: { href: string; label: string };
  img: { src: string; alt: string };
};

export default function ExpandReveal(p: Props) {
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
    let small = 0.3;
    let offY = 0;
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    // Hueco libre entre las dos mitades del titular: ahí va la foto pequeña.
    const measure = () => {
      const a = el.querySelector<HTMLElement>(".xr-line.a");
      const b = el.querySelector<HTMLElement>(".xr-line.b");
      if (!a || !b) return;
      const vh = window.innerHeight;
      const top = a.offsetTop + a.offsetHeight + 20;
      const bottom = b.offsetTop - 20;
      small = Math.min(0.55, Math.max(0.16, (bottom - top) / vh));
      offY = (top + bottom) / 2 - vh / 2;
    };
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const prog = clamp(-r.top / (total || 1));
      const grow = ease(clamp(prog / 0.6));
      const after = clamp((prog - 0.55) / 0.3);
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

  const on = live || isStatic;
  return (
    <section className="xr" ref={ref} data-static={isStatic ? "1" : "0"} aria-labelledby="xr-title">
      <div className="xr-stage">
        <div className="xr-media">
          <Image src={p.img.src} alt={p.img.alt} fill sizes="100vw" />
        </div>
        <div className="xr-title wrap">
          <p className="kicker xr-kicker">{p.kicker}</p>
          <h2 id="xr-title">
            <span className="xr-line a">{p.a}</span> <span className="xr-line b">{p.b}</span>
          </h2>
        </div>
        <div className="xr-after" data-live={on ? "1" : "0"}>
          <div className="wrap">
            <p className="xr-body">{p.body}</p>
            <Link className="btn btn-lime btn-xl" href={p.cta.href} tabIndex={on ? 0 : -1}>
              {p.cta.label} <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
