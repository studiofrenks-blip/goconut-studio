import "./globals.css";
import localFont from "next/font/local";
import type { Metadata } from "next";

const display = localFont({ src: "../fonts/bricolage.woff2", variable: "--font-display", weight: "200 800" });
const sans = localFont({ src: "../fonts/inter.woff2", variable: "--font-sans", weight: "100 900" });

export const metadata: Metadata = {
  title: "404 · Ideaholiks Studio",
  robots: { index: false, follow: false },
};

// Cualquier dirección que no existe: página propia, en los dos idiomas.
export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body>
        <main className="nf">
          <div className="wrap">
            <a href="/es" aria-label="Ideaholiks Studio">
              <img src="/img/ideaholiks-logo.svg" alt="Ideaholiks Studio" width={151} height={64} style={{ height: 64, width: "auto", margin: "0 auto 40px" }} />
            </a>
            <p className="kicker">404</p>
            <h1>Esta página no existe</h1>
            <p lang="en">This page doesn&apos;t exist.</p>
            <p>
              <a className="btn btn-lime" href="/es">
                Ir al inicio
              </a>{" "}
              <a className="btn btn-ghost" href="/en" lang="en">
                Go home
              </a>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
