import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";

export default function ProductCard({ p }: { p: Product }) {
  return (
    <Link href={`/producto/${p.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
        {p.images[0] && (
          <Image src={p.images[0]} alt={p.name} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
        )}
      </div>
      <h3 className="mt-3 font-semibold">{p.name}</h3>
      <p className="text-sm opacity-70">{p.quote ? "Por proyecto" : `${p.models.length} ${p.models.length === 1 ? "modelo" : "modelos"}`}</p>
    </Link>
  );
}
