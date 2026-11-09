"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images, name, label }: { images: string[]; name: string; label: string }) {
  const [i, setI] = useState(0);
  return (
    <div className="lg:sticky lg:top-24">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-white lg:aspect-square lg:rounded-[32px]">
        <Image key={images[i]} src={images[i]} alt={i === 0 ? name : `${name} · ${i + 1}`} fill priority sizes="(min-width:1024px) 50vw, 100vw" className="animate-[fade_.4s_ease] object-cover" />
      </div>
      {images.length > 1 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {images.map((src, k) => (
            <li key={src} className="shrink-0">
              <button type="button" onClick={() => setI(k)} aria-label={`${label} ${k + 1}`} aria-current={k === i}
                className={`relative block size-16 overflow-hidden rounded-xl border-2 sm:size-20 ${k === i ? "border-[var(--accent)]" : "border-transparent opacity-60 hover:opacity-100"}`}>
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
