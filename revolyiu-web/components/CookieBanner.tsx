"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { readConsent, saveConsent } from "@/lib/consent";

export default function CookieBanner() {
  const [open, setOpen] = useState(true); // se pinta en el HTML; un script en <head> lo oculta si ya hay elección
  const [cfg, setCfg] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (readConsent()) setOpen(false);
    else document.documentElement.classList.remove("has-consent");
    const reopen = () => {
      const c = readConsent();
      setAnalytics(!!c?.analytics);
      setMarketing(!!c?.marketing);
      setCfg(true);
      setOpen(true);
    };
    window.addEventListener("rv:open-cookies", reopen);
    return () => window.removeEventListener("rv:open-cookies", reopen);
  }, []);
  useEffect(() => { if (open && cfg) ref.current?.focus(); }, [open, cfg]);

  if (!open) return null;
  const done = (a: boolean, m: boolean) => { saveConsent(a, m); setOpen(false); setCfg(false); };
  // Al reabrir desde «Configurar cookies» hay que saltarse la ocultación del <head>
  const reopened = cfg ? " is-reopened" : "";

  return (
    <div className={`ck${reopened}`} role="dialog" aria-modal="false" aria-labelledby="ck-t" aria-describedby="ck-d" tabIndex={-1} ref={ref}>
      <h2 id="ck-t">Tú decides sobre las cookies</h2>
      <p id="ck-d">
        Solo usamos lo imprescindible para que la web funcione. Con tu permiso, añadiríamos analítica y
        marketing para medir y mejorar. Puedes cambiar de opinión cuando quieras.{" "}
        <Link href="/politica-de-cookies/">Política de cookies</Link>.
      </p>
      {cfg && (
        <div className="ck__opts">
          <label className="ck__opt"><span>Necesarias<small>Siempre activas. Guardan tu elección.</small></span><input type="checkbox" checked disabled /></label>
          <label className="ck__opt"><span>Analítica<small>Estadísticas de uso anónimas.</small></span><input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} /></label>
          <label className="ck__opt"><span>Marketing<small>Medición de campañas publicitarias.</small></span><input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} /></label>
        </div>
      )}
      <div className="ck__btns">
        <button type="button" className="btn ck__btn" onClick={() => done(false, false)}>Rechazar todo</button>
        <button type="button" className="btn ck__btn" onClick={() => done(true, true)}>Aceptar todo</button>
      </div>
      <div className="ck__cfg">
        {cfg ? (
          <button type="button" className="linkbtn" onClick={() => done(analytics, marketing)}>Guardar mi selección</button>
        ) : (
          <button type="button" className="linkbtn" onClick={() => setCfg(true)}>Configurar</button>
        )}
      </div>
    </div>
  );
}
