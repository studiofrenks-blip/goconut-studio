"use client";
// Kit Frenks nº 8 · «El mundo que gira». Globo de puntos que gira solo,
// con luces en ciudades; se arrastra con el dedo para girarlo.
import { useEffect, useRef } from "react";

const CITIES: [number, number][] = [
  [40.4, -3.7], [19.4, -99.1], [10.5, -66.9], [40.7, -74.0],
  [-34.6, -58.4], [51.5, -0.1], [4.7, -74.1], [25.8, -80.2],
];

export default function Globe({ label }: { label: string }) {
  const cv = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = cv.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const S = 760, R = 330, cx = S / 2, cy = S / 2, N = 2200;
    const pts: number[][] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = i * 2.399963;
      pts.push([Math.cos(th) * rad, y, Math.sin(th) * rad]);
    }
    const marks = CITIES.map(([la0, lo0]) => {
      const la = (la0 * Math.PI) / 180, lo = (lo0 * Math.PI) / 180;
      return [Math.cos(la) * Math.cos(lo), Math.sin(la), Math.cos(la) * Math.sin(lo)];
    });
    let rot = 1.2, extra = 0, drag: number | null = null, raf = 0, visible = true, t = 0;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(c);
    const paint = () => {
      ctx.clearRect(0, 0, S, S);
      const g = rot + extra, co = Math.cos(g), si = Math.sin(g), tilt = 0.32, ct = Math.cos(tilt), st = Math.sin(tilt);
      const proj = (v: number[]) => {
        const x = v[0] * co - v[2] * si;
        const z0 = v[0] * si + v[2] * co;
        const y = v[1] * ct - z0 * st;
        const z = v[1] * st + z0 * ct;
        return [cx + x * R, cy - y * R, z];
      };
      ctx.fillStyle = "#d3cdea";
      for (const v of pts) {
        const q = proj(v);
        if (q[2] < 0) continue;
        ctx.globalAlpha = 0.12 + q[2] * 0.55;
        ctx.beginPath();
        ctx.arc(q[0], q[1], 1.2 + q[2] * 1.6, 0, 6.2832);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      marks.forEach((v, i) => {
        const q = proj(v);
        if (q[2] < 0.02) return;
        const pulse = 1 + 0.5 * Math.sin(t * 2 + i);
        ctx.fillStyle = "#c6ff3d";
        ctx.globalAlpha = 0.18 * q[2];
        ctx.beginPath();
        ctx.arc(q[0], q[1], 16 * pulse, 0, 6.2832);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(q[0], q[1], 5.5, 0, 6.2832);
        ctx.fill();
      });
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!visible) return;
      t += 0.016;
      if (drag === null) rot += 0.0035;
      paint();
    };
    const down = (e: PointerEvent) => {
      drag = e.clientX - extra * 260;
      c.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (drag !== null) extra = (e.clientX - drag) / 260;
    };
    const up = () => (drag = null);
    c.addEventListener("pointerdown", down);
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerup", up);
    c.addEventListener("pointercancel", up);
    if (still) paint();
    else loop();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      c.removeEventListener("pointerdown", down);
      c.removeEventListener("pointermove", move);
      c.removeEventListener("pointerup", up);
      c.removeEventListener("pointercancel", up);
    };
  }, []);
  return <canvas ref={cv} className="globe" width={760} height={760} role="img" aria-label={label} />;
}
