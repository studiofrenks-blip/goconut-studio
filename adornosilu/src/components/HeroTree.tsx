"use client";
import { useEffect, useRef } from "react";

// Metáfora de marca: el árbol en espiral del logo, hecho de bombillas.
// Se encienden donde pasa el dedo o el ratón; sin puntero, la luz se pasea sola.
const PATH =
  "M 60 26 C 66 32, 72 36, 66 42 C 60 48, 46 48, 48 56 C 50 64, 80 64, 80 74 C 80 86, 38 84, 36 96 C 34 108, 92 106, 92 120 C 92 134, 28 132, 26 146 C 24 160, 102 158, 102 172 C 102 184, 34 184, 14 192 C 40 196, 90 198, 116 196";

export default function HeroTree({ label }: { label: string }) {
  const svg = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    const path = el.querySelector<SVGPathElement>("#ilu-spiral")!;
    const g = el.querySelector<SVGGElement>("#bulbs")!;
    const star = el.querySelector<SVGGElement>("#star")!;
    const len = path.getTotalLength();
    const N = 70;
    const bulbs: { x: number; y: number; c: SVGCircleElement; h: SVGCircleElement; phase: number }[] = [];
    for (let i = 0; i < N; i++) {
      const p = path.getPointAtLength((i / (N - 1)) * len);
      const h = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      h.setAttribute("cx", String(p.x)); h.setAttribute("cy", String(p.y)); h.setAttribute("r", "5"); h.setAttribute("fill", "url(#halo)");
      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", String(p.x)); c.setAttribute("cy", String(p.y)); c.setAttribute("r", "1.25");
      g.append(h, c);
      bulbs.push({ x: p.x, y: p.y, c, h, phase: Math.random() * Math.PI * 2 });
    }
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: 60, y: 110 }, cur = { x: 60, y: 110 };
    let lastMove = -1e9, raf = 0;
    const toLocal = (cx: number, cy: number) => {
      const pt = el.createSVGPoint(); pt.x = cx; pt.y = cy;
      const m = el.getScreenCTM(); if (!m) return null;
      return pt.matrixTransform(m.inverse());
    };
    const onMove = (e: PointerEvent) => { const p = toLocal(e.clientX, e.clientY); if (p) { target.x = p.x; target.y = p.y; lastMove = performance.now(); } };
    window.addEventListener("pointermove", onMove, { passive: true });
    const draw = (now: number) => {
      if (now - lastMove > 2500) { // se pasea solo
        const t = now / 1000;
        target.x = 60 + Math.sin(t * 0.7) * 34;
        target.y = 110 + Math.sin(t * 0.45) * 70;
      }
      cur.x += (target.x - cur.x) * 0.08; cur.y += (target.y - cur.y) * 0.08;
      for (const b of bulbs) {
        const d = Math.hypot(b.x - cur.x, b.y - cur.y);
        const near = Math.max(0, 1 - d / 38);
        const tw = 0.18 + 0.12 * Math.sin(now / 600 + b.phase);
        const on = Math.min(1, tw + near * 1.1);
        b.c.setAttribute("fill", `rgba(255, ${Math.round(220 + 25 * on)}, ${Math.round(150 + 80 * on)}, ${0.25 + on * 0.75})`);
        b.h.setAttribute("opacity", String(near * 0.9));
      }
      const ds = Math.hypot(60 - cur.x, 18 - cur.y);
      star.setAttribute("opacity", String(0.55 + Math.max(0, 1 - ds / 60) * 0.45));
      raf = requestAnimationFrame(draw);
    };
    if (reduce) {
      for (const b of bulbs) { b.c.setAttribute("fill", "rgb(255,236,190)"); b.h.setAttribute("opacity", "0.35"); }
    } else raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("pointermove", onMove); g.innerHTML = ""; };
  }, []);

  return (
    <svg ref={svg} viewBox="0 0 120 210" role="img" aria-label={label} className="h-full w-full overflow-visible">
      <defs>
        <radialGradient id="halo"><stop offset="0" stopColor="#ffe6a3" stopOpacity=".9" /><stop offset="1" stopColor="#ffe6a3" stopOpacity="0" /></radialGradient>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2" /></filter>
      </defs>
      <path id="ilu-spiral" d={PATH} fill="none" stroke="rgba(241,239,228,.12)" strokeWidth="1.2" strokeLinecap="round" />
      <g id="bulbs" />
      <g id="star" transform="translate(60 18)">
        <g filter="url(#glow)" opacity=".8">{[0, 45, 90, 135].map((a) => <rect key={a} x="-0.7" y="-9" width="1.4" height="18" rx=".7" fill="#e0b141" transform={`rotate(${a})`} />)}</g>
        {[0, 45, 90, 135].map((a) => <rect key={a} x="-0.5" y={a % 90 ? -5 : -8} width="1" height={a % 90 ? 10 : 16} rx=".5" fill="#fff6d6" transform={`rotate(${a})`} />)}
      </g>
    </svg>
  );
}
