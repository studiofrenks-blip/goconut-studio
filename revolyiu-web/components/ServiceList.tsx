"use client";
// FX 10: al pasar el ratón por un servicio, su imagen flota junto al cursor.
import Link from "next/link";
import { useRef, useState } from "react";
import type { Service } from "@/lib/content";
import { Arrow } from "./Icons";

export default function ServiceList({ items, headingLevel = 3 }: { items: Service[]; headingLevel?: 2 | 3 }) {
  const peek = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Service | null>(null);
  const H = `h${headingLevel}` as "h2" | "h3";
  const move = (e: React.MouseEvent) => {
    if (peek.current) { peek.current.style.left = `${e.clientX}px`; peek.current.style.top = `${e.clientY}px`; }
  };
  return (
    <div className="svc-list" data-fx="06" onMouseMove={move} onMouseLeave={() => setActive(null)}>
      {items.map((s) => (
        <Link key={s.slug} href={`/${s.slug}/`} className="svc-row" onMouseEnter={() => setActive(s)}>
          <span className="svc-row__code">{s.code} /</span>
          <H className="svc-row__name">{s.name}</H>
          <p className="svc-row__txt">{s.short}</p>
          <span className="svc-row__go" aria-hidden="true"><Arrow /></span>
        </Link>
      ))}
      <div ref={peek} className={`svc-peek${active ? " is-on" : ""}`} aria-hidden="true">
        {items.map((s) => (
          <img key={s.slug} src={s.hero[0].src} alt="" loading="lazy" style={{ display: active?.slug === s.slug ? "block" : "none" }} />
        ))}
      </div>
    </div>
  );
}
