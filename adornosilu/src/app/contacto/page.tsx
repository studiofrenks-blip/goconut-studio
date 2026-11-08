import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Contacta con Adornos ILU. Planta en la Zona Industrial Soco, La Victoria, Aragua, Venezuela.",
  alternates: { canonical: "/contacto" },
};

export default function Contacto() {
  const c = site.company;
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl">Contacto</h1>
      <address className="mt-8 not-italic leading-relaxed">
        <strong>{c.legalName}</strong>
        <br />
        R.I.F.: {c.rif}
        <br />
        {c.address}
      </address>
      {/* PENDIENTE: teléfono, correo, WhatsApp, mapa y formulario (datos del respaldo). */}
    </section>
  );
}
