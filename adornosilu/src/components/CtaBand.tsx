import Link from "next/link";
import { site } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppFloat";

export default function CtaBand({ title = "¿Hablamos de tu Navidad?", text = "Clientes, tiendas, decoradores y distribuidores: te asesoramos y te enviamos disponibilidad por WhatsApp." }: { title?: string; text?: string }) {
  return (
    <section className="mx-auto mt-28 max-w-6xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-[2rem] bg-[var(--night)] px-6 py-14 text-white sm:px-14">
        <div aria-hidden className="absolute -right-24 -top-24 size-80 rounded-full bg-[var(--gold)]/20 blur-3xl" />
        <div className="relative grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <h2 className="font-display text-4xl leading-tight sm:text-5xl">{title}</h2>
            <p className="mt-4 max-w-xl text-lg text-white/80">{text}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <a href={`https://wa.me/${site.company.whatsapp}`} target="_blank" rel="noopener" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--gold)] px-7 font-semibold text-[var(--night)]">
              <WhatsAppIcon /> Escríbenos
            </a>
            <Link href="/catalogo" className="inline-flex min-h-12 items-center rounded-full border border-white/40 px-7 font-semibold">Ver catálogo</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
