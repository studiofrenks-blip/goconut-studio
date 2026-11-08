"use client";
// Texto que se enciende palabra a palabra al bajar. Las palabras entre *asteriscos* van en acento.
import { useEffect, useRef } from "react";

export default function LitText({ text, as = "p" }: { text: string; as?: "p" | "h2" }) {
  const ref = useRef<HTMLElement>(null);
  const words = text.split(" ");
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ws = Array.from(el.querySelectorAll<HTMLElement>(".lw"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { ws.forEach((w) => w.classList.add("on")); return; }
    let raf = 0;
    const tick = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect(), vh = window.innerHeight;
        const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
        const n = Math.round(p * ws.length);
        ws.forEach((w, i) => w.classList.toggle("on", i < n));
      });
    };
    tick();
    window.addEventListener("scroll", tick, { passive: true });
    return () => window.removeEventListener("scroll", tick);
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref as never} className="litext">
      {words.map((w, i) => {
        const key = w.startsWith("*");
        const clean = w.replace(/\*/g, "");
        return <span key={i}><span className={`lw${key ? " key" : ""}`}>{clean}</span>{" "}</span>;
      })}
    </Tag>
  );
}
