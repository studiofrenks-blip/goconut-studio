import Link from "next/link";
import { site } from "@/lib/content";
import { Phone, WhatsApp } from "./Icons";

// Barra fija en móvil: contacto siempre a mano.
export default function MobileBar() {
  return (
    <nav className="mbar" aria-label="Contacto rápido">
      <a href={site.phoneHref} className="mbar__icon" aria-label="Llamar"><Phone /></a>
      <a href={site.whatsapp} className="mbar__icon" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WhatsApp /></a>
      <Link href="/contacto/" className="btn btn--primary mbar__cta">Pide tu propuesta</Link>
    </nav>
  );
}
