"use client";
// Kit Frenks · 3 — Fotos que se ordenan solas (versión contenida):
// una sola entrada corta hasta el arco y se quedan quietas. Al bajar, el arco se abre y se desvanece.
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Img } from "@/lib/content";

export default function HeroMorph({ photos }: { photos: Img[] }) {
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const all = Array.from(el.querySelectorAll<HTMLElement>(".morph__card"));
    let scrollP = 0, done = false;
    const place = () => {
      const w = el.clientWidth, h = el.clientHeight, mob = w < 700;
      const cards = all.filter((c, i) => (mob ? i < 6 : true));
      all.forEach((c, i) => { if (mob && i >= 6) c.style.display = "none"; else c.style.display = ""; });
      const N = cards.length;
      const R = mob ? Math.min(w * 0.34, 140) : Math.min(w * 0.3, h * 0.34, 420);
      const span = mob ? 120 : 136;
      cards.forEach((c, i) => {
        const open = 1 + scrollP * 0.4;
        const a = ((-90 - span / 2 + (i / (N - 1)) * span) * Math.PI) / 180;
        const x = Math.cos(a) * R * open, y = Math.sin(a) * R * 0.85 * open + h * (mob ? -0.12 : 0.04);
        const r = ((a * 180) / Math.PI + 90) * 0.45;
        c.style.transform = done ? `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${r.toFixed(1)}deg)` : `translate(${(x * 0.3).toFixed(1)}px, ${(y * 0.3 + 40).toFixed(1)}px) scale(0.7)`;
        c.style.opacity = done ? String(1 - scrollP * 0.9) : "0";
      });
    };
    place();
    const t = window.setTimeout(() => { done = true; place(); }, 60);
    const onScroll = () => { scrollP = Math.min(1, Math.max(0, window.scrollY / (el.clientHeight * 0.9))); place(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", place);
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", place); };
  }, []);
  return (
    <div className="morph" ref={box} aria-hidden="true">
      {photos.map((p, i) => (
        <div className="morph__card" key={p.src} style={{ transitionDelay: `${i * 40}ms` }}>
          <Image src={p.src} alt="" width={p.w} height={p.h} sizes="140px" quality={70} priority={i < 6} />
        </div>
      ))}
    </div>
  );
}
