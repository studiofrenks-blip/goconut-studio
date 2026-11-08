"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Consentimiento: "necessary" siempre; "analytics" y "marketing" solo si el usuario acepta.
export type Consent = { v: 1; analytics: boolean; marketing: boolean; date: string };
const COOKIE = "ilu_consent";
const MAX_AGE = 60 * 60 * 24 * 180; // 6 meses, luego se vuelve a preguntar

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie.split("; ").find((c) => c.startsWith(COOKIE + "="));
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw.split("=").slice(1).join("=")));
  } catch {
    return null;
  }
}

function saveConsent(analytics: boolean, marketing: boolean) {
  const value: Consent = { v: 1, analytics, marketing, date: new Date().toISOString() };
  document.cookie = `${COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  window.dispatchEvent(new CustomEvent("ilu:consent", { detail: value }));
}

export default function CookieBanner() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const c = readConsent();
    if (!c) setOpen(true);
    const reopen = () => {
      const cur = readConsent();
      setAnalytics(!!cur?.analytics);
      setMarketing(!!cur?.marketing);
      setSettings(true);
      setOpen(true);
    };
    window.addEventListener("ilu:open-cookies", reopen);
    return () => window.removeEventListener("ilu:open-cookies", reopen);
  }, []);

  if (!open) return null;

  const decide = (a: boolean, m: boolean) => {
    saveConsent(a, m);
    setOpen(false);
    setSettings(false);
  };

  // Rechazar y Aceptar comparten exactamente el mismo estilo, tamaño y posición jerárquica.
  const btn =
    "min-h-11 flex-1 rounded-full border-2 border-[var(--ink)] px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--gold)]";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--line)] bg-[var(--paper)] p-5 text-[var(--ink)] shadow-2xl sm:p-6">
        <h2 id="cookie-title" className="text-base font-semibold">
          Usamos cookies
        </h2>
        <p className="mt-2 text-sm leading-relaxed">
          Usamos cookies necesarias para que la web y la tienda funcionen. Con tu permiso, también
          usaremos cookies de análisis y de marketing. Puedes aceptarlas, rechazarlas o elegir cuáles.
          Más información en la{" "}
          <Link href="/cookies" className="underline underline-offset-2">
            política de cookies
          </Link>
          .
        </p>

        {settings && (
          <fieldset className="mt-4 space-y-3 text-sm">
            <legend className="sr-only">Tipos de cookies</legend>
            <label className="flex items-start gap-3">
              <input type="checkbox" checked disabled className="mt-1 size-4" />
              <span>
                <strong>Necesarias</strong> — carrito, seguridad y esta elección. Siempre activas.
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="mt-1 size-4"
              />
              <span>
                <strong>Análisis</strong> — nos ayudan a saber qué páginas se visitan.
              </span>
            </label>
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="mt-1 size-4"
              />
              <span>
                <strong>Marketing</strong> — miden nuestros anuncios.
              </span>
            </label>
          </fieldset>
        )}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button type="button" className={btn} onClick={() => decide(false, false)}>
            Rechazar
          </button>
          {settings ? (
            <button type="button" className={btn} onClick={() => decide(analytics, marketing)}>
              Guardar selección
            </button>
          ) : (
            <button type="button" className={btn} onClick={() => setSettings(true)}>
              Configurar
            </button>
          )}
          <button type="button" className={btn} onClick={() => decide(true, true)}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}

export function OpenCookieSettings({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("ilu:open-cookies"))}
    >
      Configurar cookies
    </button>
  );
}
