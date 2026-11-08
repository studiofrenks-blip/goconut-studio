import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/lib/content";
import { Arrow } from "./Icons";

export default function ServiceCards({ items, headingLevel = 3 }: { items: Service[]; headingLevel?: 2 | 3 }) {
  const H = `h${headingLevel}` as "h2" | "h3";
  return (
    <div className="svc-grid" data-fx="06">
      {items.map((s) => (
        <Link key={s.slug} href={`/${s.slug}/`} className="svc-card">
          <div className="svc-card__img">
            <Image src={s.hero[0].src} alt="" width={s.hero[0].w} height={s.hero[0].h} sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, 400px" />
          </div>
          <div className="svc-card__body">
            <span className="svc-card__code">{s.code}</span>
            <H>{s.name}</H>
            <p>{s.short}</p>
            <span className="svc-card__more">Ver servicio <Arrow /></span>
          </div>
        </Link>
      ))}
    </div>
  );
}
