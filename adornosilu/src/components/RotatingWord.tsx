"use client";
import { useEffect, useState } from "react";

// Palabra que rota dentro del titular. Es decorativa: el H1 completo va en texto oculto.
export default function RotatingWord({ words, className = "" }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setI((x) => (x + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [words.length]);
  return (
    <span aria-hidden className={`relative inline-grid overflow-hidden align-bottom ${className}`}>
      {words.map((w, k) => (
        <span key={w} className="col-start-1 row-start-1 transition-[transform,opacity] duration-700 [transition-timing-function:cubic-bezier(.7,0,.2,1)]"
          style={{ transform: `translateY(${k === i ? 0 : k === (i - 1 + words.length) % words.length ? -100 : 100}%)`, opacity: k === i ? 1 : 0 }}>
          {w}
        </span>
      ))}
    </span>
  );
}
