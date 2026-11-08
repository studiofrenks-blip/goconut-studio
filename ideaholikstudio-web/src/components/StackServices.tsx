"use client";
// Servicios en tarjetas que se apilan al bajar. Cada tarjeta se enciende
// siguiendo el dedo o el ratón (Kit Frenks nº 1).
import Link from "next/link";

type Card = { title: string; text: string; tags: string; href: string; cta: string };

export default function StackServices({ cards }: { cards: Card[] }) {
  const paint = (e: React.PointerEvent<HTMLElement>) => {
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    c.style.setProperty("--mx", `${e.clientX - r.left}px`);
    c.style.setProperty("--my", `${e.clientY - r.top}px`);
    c.style.setProperty("--on", "1");
  };
  return (
    <div className="stack">
      {cards.map((c, i) => (
        <article
          key={c.title}
          className={`stack-card c${i + 1}`}
          style={{ ["--i" as string]: i }}
          onPointerMove={paint}
          onPointerDown={paint}
          onPointerLeave={(e) => e.currentTarget.style.setProperty("--on", "0")}
        >
          <span className="stack-num" aria-hidden="true">
            0{i + 1}
          </span>
          <div className="stack-body">
            <h3>{c.title}</h3>
            <p>{c.text}</p>
            <p className="stack-tags">{c.tags}</p>
            <Link className="stack-link" href={c.href}>
              {c.cta} <span className="arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
