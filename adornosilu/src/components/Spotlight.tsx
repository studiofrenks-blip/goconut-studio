"use client";
import { useRef } from "react";

// Animación 1 del Kit Frenks. Envuelve una tarjeta: el brillo dorado sigue al puntero.
export default function Spotlight({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.setProperty("--on", "1");
  };
  return (
    <div ref={ref} onPointerMove={move} onPointerLeave={() => ref.current?.style.setProperty("--on", "0")} className={`spot ${className}`}>
      {children}
    </div>
  );
}
