import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Habla con Adornos ILU por WhatsApp, teléfono o correo. Atención a clientes, tiendas, decoradores y distribuidores en toda Venezuela.",
  alternates: { canonical: "/contacto" },
};

export default function Contacto() {
  const c = site.company;
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--gold-ink)]">Contáctanos</p>
      <h1 className="font-display mt-3 text-4xl sm:text-5xl">Estamos aquí para iluminar tu Navidad</h1>
      <p className="mt-6 text-lg leading-relaxed">
        Queremos ayudarte a hacer realidad tus ideas navideñas. Seas cliente final, tienda, decorador o
        distribuidor, te ofrecemos atención personalizada, asesoría y soluciones a la medida.
      </p>
      <ul className="mt-10 space-y-4">
        <li><a className="font-semibold underline underline-offset-4" href={`https://wa.me/${c.whatsapp}`} target="_blank" rel="noopener">WhatsApp: {c.phone}</a></li>
        <li><a className="underline underline-offset-4" href={`tel:${c.phoneHref}`}>Teléfono: {c.phone}</a></li>
        <li><a className="underline underline-offset-4" href={`mailto:${c.email}`}>{c.email}</a></li>
        <li>{c.hours}</li>
      </ul>
      <address className="mt-10 not-italic leading-relaxed">
        <strong>{c.legalName}</strong> · R.I.F.: {c.rif}
        <br />
        {c.address}
      </address>
      {/* PENDIENTE: formulario de contacto (necesita envío de correo) y mapa. */}
    </section>
  );
}
