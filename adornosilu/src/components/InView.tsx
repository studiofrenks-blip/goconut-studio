"use client";
import { createElement, useEffect, useRef } from "react";

// Añade la clase "in" una sola vez cuando el elemento entra en pantalla (para .reveal, .kinetic y .clip).
export default function InView({ as = "div", className = "", children, delay = 0, ...rest }: { as?: string; className?: string; children?: React.ReactNode; delay?: number } & Record<string, unknown>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { rootMargin: "0px 0px -12% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return createElement(as, { ref, className, style: delay ? { transitionDelay: `${delay}s` } : undefined, ...rest }, children);
}
