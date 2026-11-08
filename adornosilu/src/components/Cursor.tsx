"use client";
import { useEffect, useRef } from "react";

// Cursor propio en ordenador: un punto que crece sobre enlaces y botones.
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    
    const el = ref.current!;
    let x = -100, y = -100, cx = -100, cy = -100, raf = 0, big = false;
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; big = !!(e.target as Element).closest("a,button,summary,[role=button],input,textarea,label"); el.style.opacity = "1"; };
    const tick = () => { cx += (x - cx) * 0.22; cy += (y - cy) * 0.22; el.style.transform = `translate(${cx}px,${cy}px) translate(-50%,-50%) scale(${big ? 1.8 : 1})`; raf = requestAnimationFrame(tick); };
    addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); removeEventListener("pointermove", move);  };
  }, []);
  return <div ref={ref} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[70] size-8 rounded-full border border-[var(--accent)]/70 opacity-0 [transition-property:opacity] duration-300" />;
}
