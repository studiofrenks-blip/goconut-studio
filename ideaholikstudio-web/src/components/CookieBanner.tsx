"use client";
// Banner de cookies: Aceptar y Rechazar con el mismo tamaño, color y peso.
// Guarda la elección en la cookie técnica ih_consent (12 meses).
import { useEffect, useState } from "react";

type T = {
  title: string;
  body: string;
  accept: string;
  reject: string;
  configure: string;
  save: string;
  necessary: string;
  necessaryText: string;
  analytics: string;
  analyticsText: string;
  more: string;
};
export type Consent = { v: 1; analytics: boolean; ts: string };

const NAME = "ih_consent";
const MAX_AGE = 60 * 60 * 24 * 365;

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(/(?:^|; )ih_consent=([^;]*)/);
  if (!m) return null;
  try {
    return JSON.parse(decodeURIComponent(m[1])) as Consent;
  } catch {
    return null;
  }
}

function save(analytics: boolean) {
  const c: Consent = { v: 1, analytics, ts: new Date().toISOString() };
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${NAME}=${encodeURIComponent(JSON.stringify(c))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  window.dispatchEvent(new CustomEvent("ih:consent", { detail: c }));
}

export default function CookieBanner({ t, policyHref }: { t: T; policyHref: string }) {
  const [show, setShow] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const c = readConsent();
    if (!c) setShow(true);
    else setAnalytics(c.analytics);
    const reopen = () => {
      const cur = readConsent();
      setAnalytics(!!cur?.analytics);
      setPrefs(true);
      setShow(true);
    };
    window.addEventListener("ih:open-cookies", reopen);
    return () => window.removeEventListener("ih:open-cookies", reopen);
  }, []);

  if (!show) return null;
  const decide = (a: boolean) => {
    save(a);
    setShow(false);
    setPrefs(false);
  };

  return (
    <section className="cookie" role="dialog" aria-modal="false" aria-labelledby="cookie-title">
      <h2 id="cookie-title">{t.title}</h2>
      <p>
        {t.body} <a href={policyHref}>{t.more}</a>
      </p>
      {prefs && (
        <div className="cookie-prefs">
          <label className="pref">
            <input type="checkbox" checked disabled />
            <span>
              <strong>{t.necessary}</strong>
              <span>{t.necessaryText}</span>
            </span>
          </label>
          <label className="pref">
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            <span>
              <strong>{t.analytics}</strong>
              <span>{t.analyticsText}</span>
            </span>
          </label>
        </div>
      )}
      <div className="cookie-actions">
        <button className="btn btn-choice" data-cookie="reject" onClick={() => decide(false)}>
          {t.reject}
        </button>
        <button className="btn btn-choice" data-cookie="accept" onClick={() => decide(true)}>
          {t.accept}
        </button>
        {prefs ? (
          <button className="btn btn-ghost btn-config" onClick={() => decide(analytics)}>
            {t.save}
          </button>
        ) : (
          <button className="btn btn-ghost btn-config" onClick={() => setPrefs(true)}>
            {t.configure}
          </button>
        )}
      </div>
    </section>
  );
}
