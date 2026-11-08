"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import type { Img } from "@/lib/content";

export default function Gallery({ items, layout }: { items: Img[]; layout: "wide" | "square" }) {
  const [i, setI] = useState<number | null>(null);
  const close = useCallback(() => setI(null), []);
  const step = useCallback((d: number) => setI((v) => (v === null ? v : (v + d + items.length) % items.length)), [items.length]);
  useEffect(() => {
    if (i === null) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") close(); if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); };
    window.addEventListener("keydown", k);
    document.documentElement.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.documentElement.style.overflow = ""; };
  }, [i, close, step]);
  const tall = items.every((im) => im.w / im.h > 1.9);
  const sizes = layout === "wide" ? "(max-width: 700px) 100vw, 33vw" : "(max-width: 700px) 50vw, 20vw";
  return (
    <>
      <div className={`gallery gallery--${layout}${tall ? " gallery--shots" : ""}${items.length % 3 && items.length % 2 === 0 && items.length <= 4 ? " gallery--pairs" : ""}`} data-fx="06">
        {items.map((im, n) => (
          <button key={im.src} type="button" onClick={() => setI(n)} aria-label={`Ampliar: ${im.alt}`}>
            <Image src={im.src} alt={im.alt} width={im.w} height={im.h} sizes={sizes} />
          </button>
        ))}
      </div>
      {i !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={items[i].alt} onClick={close}>
          <figure style={{ margin: 0 }} onClick={(e) => e.stopPropagation()}>
            <Image src={items[i].src} alt={items[i].alt} width={items[i].w} height={items[i].h} sizes="90vw" />
            <figcaption className="lightbox__cap">{items[i].alt} · {i + 1}/{items.length}</figcaption>
          </figure>
          <button className="lightbox__btn lightbox__close" onClick={close} aria-label="Cerrar" autoFocus>×</button>
          {items.length > 1 && (<>
            <button className="lightbox__btn lightbox__prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Anterior">‹</button>
            <button className="lightbox__btn lightbox__next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Siguiente">›</button>
          </>)}
        </div>
      )}
    </>
  );
}
