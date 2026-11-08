import Image from "next/image";
import Link from "next/link";
import { t } from "@/lib/dict";
import { path, type Lang } from "@/lib/i18n";
import type { Product } from "@/lib/products";
import Spotlight from "./Spotlight";

export default function ProductCard({ p, lang }: { p: Product; lang: Lang }) {
  const d = t(lang);
  return (
    <Spotlight className="h-full rounded-[28px]">
      <Link href={path("product", lang, p.slug)} className="group flex h-full flex-col rounded-[28px] border border-[var(--line)] bg-[var(--bg-2)] p-2.5 hover:border-[var(--accent)]">
        <div className="relative aspect-square overflow-hidden rounded-[22px] bg-white">
          {p.images[0] && <Image src={p.images[0]} alt={p.name} fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />}
        </div>
        <div className="flex flex-1 items-end justify-between gap-3 px-2 pb-2 pt-4">
          <div>
            <h3 className="font-display text-base leading-tight sm:text-lg">{p.name}</h3>
            <p className="mt-1 text-sm text-[var(--accent)]">{p.quote ? d.byProject : d.models(p.models.length)}</p>
          </div>
          <span aria-hidden className="hidden size-9 shrink-0 place-items-center rounded-full bg-[var(--cream)] text-[var(--bg)] transition-transform group-hover:translate-x-1 sm:grid">→</span>
        </div>
      </Link>
    </Spotlight>
  );
}
