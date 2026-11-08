import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import Spotlight from "./Spotlight";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Spotlight className="h-full rounded-3xl">
      <Link href={`/producto/${p.slug}`} className="group flex h-full flex-col rounded-3xl border border-[var(--line)] bg-white p-2 sm:p-3">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-[var(--paper)]">
          {p.images[0] && (
            <Image src={p.images[0]} alt={p.name} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
          )}
        </div>
        <div className="flex flex-1 items-end justify-between gap-3 px-1 pb-1 pt-3 sm:px-2 sm:pt-4">
          <div>
            <h3 className="font-display text-base leading-tight sm:text-lg">{p.name}</h3>
            <p className="mt-1 text-sm text-[var(--gold-ink)]">{p.quote ? "Por proyecto" : `${p.models.length} ${p.models.length === 1 ? "modelo" : "modelos"}`}</p>
          </div>
          <span aria-hidden className="hidden size-9 shrink-0 sm:grid place-items-center rounded-full bg-[var(--night)] text-white transition-transform group-hover:translate-x-1">→</span>
        </div>
      </Link>
    </Spotlight>
  );
}
