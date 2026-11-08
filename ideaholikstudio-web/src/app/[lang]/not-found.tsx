import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap nf">
      <div>
        <p className="kicker">404</p>
        <h1 className="h-lg">Esta página no existe · This page doesn&apos;t exist</h1>
        <p>Puede que el enlace haya cambiado. · The link may have changed.</p>
        <Link className="btn btn-lime" href="/es">
          Ir al inicio
        </Link>{" "}
        <Link className="btn btn-ghost" href="/en">
          Go home
        </Link>
      </div>
    </section>
  );
}
