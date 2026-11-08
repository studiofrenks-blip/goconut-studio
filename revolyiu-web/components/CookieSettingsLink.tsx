"use client";
export default function CookieSettingsLink({ label = "Configurar cookies" }: { label?: string }) {
  return (
    <button type="button" className="linkbtn" onClick={() => window.dispatchEvent(new Event("rv:open-cookies"))}>
      {label}
    </button>
  );
}
