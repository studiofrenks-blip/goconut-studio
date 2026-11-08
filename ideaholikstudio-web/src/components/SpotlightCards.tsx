"use client";
// Kit Frenks nº 1 · «Tarjetas que se encienden». El borde y el fondo se
// iluminan siguiendo el dedo o el ratón; cada tarjeta tiene su color.
import { useRef } from "react";

type Card = { title: string; text: string };
const GLOWS = ["rgba(136,17,255,.45)", "rgba(74,75,255,.45)", "rgba(182,242,58,.28)", "rgba(166,77,255,.4)"];

export default function SpotlightCards({ cards }: { cards: Card[] }) {
  const grid = useRef<HTMLDivElement>(null);
  const paint = (x: number, y: number) => {
    grid.current?.querySelectorAll<HTMLElement>(".spot").forEach((c) => {
      const r = c.getBoundingClientRect();
      const near = x > r.left - 80 && x < r.right + 80 && y > r.top - 80 && y < r.bottom + 80;
      c.style.setProperty("--on", near ? "1" : "0");
      c.style.setProperty("--mx", `${x - r.left}px`);
      c.style.setProperty("--my", `${y - r.top}px`);
    });
  };
  const off = () => grid.current?.querySelectorAll<HTMLElement>(".spot").forEach((c) => c.style.setProperty("--on", "0"));
  return (
    <div
      className="spot-grid"
      ref={grid}
      onPointerMove={(e) => paint(e.clientX, e.clientY)}
      onPointerDown={(e) => paint(e.clientX, e.clientY)}
      onPointerLeave={off}
    >
      {cards.map((c, i) => (
        <article className="spot" key={c.title} style={{ ["--glow" as string]: GLOWS[i % GLOWS.length] }}>
          <span className="num" aria-hidden="true">
            0{i + 1}
          </span>
          <h3>{c.title}</h3>
          <p>{c.text}</p>
        </article>
      ))}
    </div>
  );
}
