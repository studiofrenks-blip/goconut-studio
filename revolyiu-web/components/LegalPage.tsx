import Link from "next/link";
import JsonLd from "./JsonLd";
import { crumbsLd } from "@/lib/seo";
import { owner } from "@/lib/legal";

export default function LegalPage({ title, path, children }: { title: string; path: string; children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={crumbsLd([{ name: "Inicio", path: "/" }, { name: title, path }])} />
      <section className="phero" style={{ paddingBottom: 32 }}>
        <div className="wrap">
          <nav className="crumbs" aria-label="Migas de pan"><Link href="/">Inicio</Link>/<span aria-current="page">{title}</span></nav>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 80px)", maxWidth: "none" }}>{title}</h1>
          <p className="muted" style={{ marginTop: 20 }}>Última actualización: {owner.updated}</p>
        </div>
      </section>
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap legal">{children}</div>
      </section>
    </>
  );
}
