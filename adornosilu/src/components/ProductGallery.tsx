"use client";
import Image from "next/image";
import { useState } from "react";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [i, setI] = useState(0);
  return (
    <div className="lg:sticky lg:top-24">
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white">
        <Image key={images[i]} src={images[i]} alt={i === 0 ? name : `${name}, detalle ${i}`} fill priority sizes="(min-width:1024px) 50vw, 100vw" className="animate-[fade_.4s_ease] object-cover" />
      </div>
      {images.length > 1 && (
        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((src, k) => (
            <li key={src} className="shrink-0">
              <button type="button" onClick={() => setI(k)} aria-label={`Ver foto ${k + 1}`} aria-current={k === i}
                className={`relative block size-16 overflow-hidden rounded-xl border-2 sm:size-20 ${k === i ? "border-[var(--gold)]" : "border-transparent opacity-70 hover:opacity-100"}`}>
                <Image src={src} alt="" fill sizes="80px" className="object-cover" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
