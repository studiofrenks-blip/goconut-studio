"use client";
// Kit Frenks nº 7 · «Hilos de luz». Varias piezas alrededor y una en medio;
// por cada curva viaja un destello hacia el centro.
import { useEffect, useRef } from "react";

export default function LightThreads({ nodes, center }: { nodes: string[]; center: string }) {
  const box = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const b = box.current, s = svg.current;
    if (!b || !s) return;
    const draw = () => {
      const r = b.getBoundingClientRect();
      if (!r.width) return;
      s.setAttribute("viewBox", `0 0 ${r.width} ${r.height}`);
      const mid = (el: Element) => {
        const q = el.getBoundingClientRect();
        return { x: q.left - r.left + q.width / 2, y: q.top - r.top + q.height / 2 };
      };
      const c = mid(b.querySelector(".lt-center")!);
      let out =
        '<defs><linearGradient id="ltg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#c6ff3d" stop-opacity="0"/><stop offset="50%" stop-color="#c6ff3d"/><stop offset="100%" stop-color="#a64dff" stop-opacity="0"/></linearGradient></defs>';
      b.querySelectorAll(".lt-node").forEach((n, i) => {
        const a = mid(n);
        const bend = (i % 2 ? 1 : -1) * Math.min(80, Math.abs(a.y - c.y) * 0.6 + 30);
        const d = `M ${a.x},${a.y} Q ${(a.x + c.x) / 2},${(a.y + c.y) / 2 + bend} ${c.x},${c.y}`;
        out += `<path class="lt-via" d="${d}"/><path class="lt-luz" d="${d}" stroke="url(#ltg)" style="animation-delay:${(i * 0.45).toFixed(2)}s"/>`;
      });
      s.innerHTML = out;
    };
    draw();
    document.fonts?.ready.then(draw);
    const ro = new ResizeObserver(draw);
    ro.observe(b);
    return () => ro.disconnect();
  }, []);
  return (
    <div className="lt" ref={box}>
      <svg className="lt-svg" ref={svg} aria-hidden="true" />
      {nodes.map((n, i) => (
        <span key={n} className={`lt-node p${i + 1}`}>
          {n}
        </span>
      ))}
      <span className="lt-center">
        <img src="/img/ideaholiks-logo.svg" alt={center} width={150} height={64} />
      </span>
    </div>
  );
}
