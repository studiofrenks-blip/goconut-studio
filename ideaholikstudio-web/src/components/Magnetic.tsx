"use client";
// Botón magnético: se deja atraer por el ratón.
import Link from "next/link";
import { useRef } from "react";

export default function Magnetic({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <Link
      ref={ref}
      href={href}
      className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        e.currentTarget.style.transform = `translate(${dx * 0.25}px, ${dy * 0.3}px)`;
      }}
      onPointerLeave={(e) => (e.currentTarget.style.transform = "")}
    >
      {children}
    </Link>
  );
}
