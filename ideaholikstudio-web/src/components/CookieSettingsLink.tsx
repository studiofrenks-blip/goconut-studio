"use client";
export default function CookieSettingsLink({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event("ih:open-cookies"))}>
      {label}
    </button>
  );
}
