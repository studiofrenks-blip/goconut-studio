"use client";
import { useEffect, useRef, useState } from "react";

// Texto que se enciende palabra a palabra al bajar.
export default function WordGlow({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [p, setP] = useState(1);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setP(0);
    const on = () => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      const v = (innerHeight * 0.9 - r.top) / (r.height * 0.9);
      setP(Math.max(0, Math.min(1, v)));
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <span key={i} className="transition-colors duration-300" style={{ color: i / words.length < p ? "var(--cream)" : "var(--sage-text)" }}>{w} </span>
      ))}
    </p>
  );
}
