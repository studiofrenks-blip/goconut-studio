// Consentimiento de cookies. Se guarda solo en el navegador del visitante.
// Cualquier script no esencial (analítica, píxeles) debe comprobar `hasConsent`
// o escuchar el evento `rv:consent` antes de cargarse.
export type Consent = { v: 1; analytics: boolean; marketing: boolean; ts: string };
export const CONSENT_KEY = "rv-consent";
export const CONSENT_MAX_AGE_DAYS = 365; // se vuelve a preguntar pasado un año

export function readConsent(): Consent | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const c = JSON.parse(raw) as Consent;
    if (c.v !== 1) return null;
    if (Date.now() - new Date(c.ts).getTime() > CONSENT_MAX_AGE_DAYS * 864e5) return null;
    return c;
  } catch {
    return null;
  }
}
export function saveConsent(analytics: boolean, marketing: boolean) {
  const c: Consent = { v: 1, analytics, marketing, ts: new Date().toISOString() };
  try { localStorage.setItem(CONSENT_KEY, JSON.stringify(c)); } catch {}
  window.dispatchEvent(new CustomEvent("rv:consent", { detail: c }));
  return c;
}
export const hasConsent = (k: "analytics" | "marketing") => !!readConsent()?.[k];
