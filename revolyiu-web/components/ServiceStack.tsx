"use client";
// Kit Frenks · 1 — Tarjetas que se encienden, apiladas con position: sticky.
import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/content";
import { Arrow } from "./Icons";

const tones = ["dark", "light", "accent"] as const;

export default function ServiceStack({ items, headingLevel = 3, more = "Ver servicio" }: { items: Service[]; headingLevel?: 2 | 3; more?: string }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  const glow = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = e.currentTarget, r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${e.clientX - r.left}px`);
    el.style.setProperty("--gy", `${e.clientY - r.top}px`);
    if (e.pointerType !== "mouse") el.classList.add("is-touch");
  };
  return (
    <div className="stack">
      {items.map((s, i) => (
        <Link key={s.slug} href={`/${s.slug}/`} className={`stack__card stack__card--${tones[i % 3]}`} style={{ ["--i" as string]: i }} onPointerMove={glow} onPointerDown={glow} onPointerLeave={(e) => e.currentTarget.classList.remove("is-touch")}>
          <div className="stack__body">
            <span className="stack__n">{s.code} / 0{items.length}</span>
            <H>{s.name}</H>
            <p>{s.short}</p>
            <ul className="stack__list">{s.groups.slice(0, 3).map((g) => <li key={g.title}>{g.title}</li>)}</ul>
            <span className="stack__more">{more} <Arrow /></span>
          </div>
          <div className="stack__img">
            <Image src={s.hero[0].src} alt={s.hero[0].alt} width={s.hero[0].w} height={s.hero[0].h} sizes="(max-width: 860px) 100vw, 45vw" />
          </div>
        </Link>
      ))}
    </div>
  );
}
