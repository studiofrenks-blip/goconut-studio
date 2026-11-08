"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Lang } from "@/lib/i18n";

const TX = {
  es: { title: "Usamos cookies", body: "Usamos cookies necesarias para que la web funcione. Con tu permiso, también usaremos cookies de análisis y de marketing. Puedes aceptarlas, rechazarlas o elegir cuáles. Más información en la", link: "política de cookies", href: "/cookies", types: "Tipos de cookies", nec: "Necesarias", necD: "seguridad y esta elección. Siempre activas.", an: "Análisis", anD: "nos ayudan a saber qué páginas se visitan.", mk: "Marketing", mkD: "miden nuestros anuncios.", reject: "Rechazar", config: "Configurar", save: "Guardar selección", accept: "Aceptar" },
  en: { title: "We use cookies", body: "We use necessary cookies to make the site work. With your permission, we will also use analytics and marketing cookies. You can accept them, reject them or choose which ones. More information in our", link: "cookie policy", href: "/en/cookies", types: "Cookie types", nec: "Necessary", necD: "security and this choice. Always on.", an: "Analytics", anD: "help us know which pages are visited.", mk: "Marketing", mkD: "measure our ads.", reject: "Reject", config: "Settings", save: "Save selection", accept: "Accept" },
};

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

export default function CookieBanner({ lang }: { lang: Lang }) {
  const x = TX[lang];
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
    "min-h-12 flex-1 rounded-full border-2 border-[var(--cream)] px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-[var(--cream)] hover:text-[var(--bg)]";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--line)] bg-[var(--bg-2)] p-5 text-[var(--cream)] shadow-2xl sm:p-6">
        <h2 id="cookie-title" className="text-base font-semibold">
          {x.title}
        </h2>
        <p className="mt-2 text-sm leading-relaxed">
          {x.body}{" "}
          <Link href={x.href} className="underline underline-offset-2">
            {x.link}
          </Link>
          .
        </p>

        {settings && (
          <fieldset className="mt-4 space-y-3 text-sm">
            <legend className="sr-only">{x.types}</legend>
            <label className="flex items-start gap-3">
              <input type="checkbox" checked disabled className="mt-1 size-4" />
              <span>
                <strong>{x.nec}</strong> — {x.necD}
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
                <strong>{x.an}</strong> — {x.anD}
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
                <strong>{x.mk}</strong> — {x.mkD}
              </span>
            </label>
          </fieldset>
        )}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button type="button" className={btn} onClick={() => decide(false, false)}>
            {x.reject}
          </button>
          {settings ? (
            <button type="button" className={btn} onClick={() => decide(analytics, marketing)}>
              {x.save}
            </button>
          ) : (
            <button type="button" className={btn} onClick={() => setSettings(true)}>
              {x.config}
            </button>
          )}
          <button type="button" className={btn} onClick={() => decide(true, true)}>
            {x.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

export function OpenCookieSettings({ className, label = "Configurar cookies" }: { className?: string; label?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event("ilu:open-cookies"))}
    >
      {label}
    </button>
  );
}
