import Link from "next/link";
import { Arrow } from "@/components/Icons";
export const metadata = { title: "Página no encontrada", robots: { index: false } };
export default function NotFound() {
  return (
    <section className="phero" style={{ minHeight: "80vh" }}>
      <div className="wrap">
        <p className="kicker">Error 404</p>
        <h1>Perdidos <span className="grad">en el espacio</span></h1>
        <p className="lead" style={{ margin: "28px 0 36px" }}>Esta página no existe o ha cambiado de órbita.</p>
        <Link href="/" className="btn btn--primary">Volver al inicio <Arrow /></Link>
      </div>
    </section>
  );
}
