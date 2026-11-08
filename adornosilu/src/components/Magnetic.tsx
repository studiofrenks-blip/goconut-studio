"use client";
import { useRef } from "react";
import { WhatsAppIcon } from "./WhatsAppFloat";

// Botón magnético: con ratón se acerca al puntero; en el móvil es un botón normal a ancho completo.
export default function Magnetic({ href, children, label }: { href: string; children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!; const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - (r.left + r.width / 2)) * 0.25}px, ${(e.clientY - (r.top + r.height / 2)) * 0.35}px)`;
  };
  return (
    <span className="block sm:inline-block sm:p-4 sm:-m-4" onPointerMove={move} onPointerLeave={() => { if (ref.current) ref.current.style.transform = ""; }}>
      <a ref={ref} data-wa href={href} target="_blank" rel="noopener" title={label}
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-8 text-base font-semibold text-[var(--bg)] transition-transform duration-300 ease-out sm:inline-flex sm:w-auto sm:min-h-16 sm:px-10 sm:text-lg">
        <WhatsAppIcon /> {children}
      </a>
    </span>
  );
}
