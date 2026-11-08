"use client";
import { useState } from "react";
import { WhatsAppIcon } from "./WhatsAppFloat";

// Eliges el modelo y el botón de WhatsApp lleva ese modelo en el mensaje.
export type PickModel = { code: string; specs: [string, string][] };

export default function ModelPicker({ models, title, cta, msg, whatsapp, bar }: { models: PickModel[]; title: string; cta: string; msg: string; whatsapp: string; bar: string }) {
  const [sel, setSel] = useState(models[0]?.code ?? "");
  const href = `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg.replace("{model}", sel))}`;
  return (
    <>
      {models.length > 0 && (
        <fieldset className="mt-8">
          <legend className="eyebrow">{title}</legend>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {models.map((m) => (
              <label key={m.code} className={`cursor-pointer rounded-2xl border-2 p-4 transition-colors ${sel === m.code ? "border-[var(--accent)] bg-[var(--bg-2)]" : "border-[var(--line)] hover:border-[var(--cream)]/40"}`}>
                <input type="radio" name="modelo" value={m.code} checked={sel === m.code} onChange={() => setSel(m.code)} className="sr-only" />
                <span className="font-display condensed block text-2xl">{m.code}</span>
                <span className="mt-1 grid grid-cols-2 gap-x-3 text-sm">
                  {m.specs.map(([k, v]) => <span key={k} className="contents"><span className="text-[var(--cream-2)]">{k}</span><span className="font-medium">{v}</span></span>)}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}
      <a data-wa href={href} target="_blank" rel="noopener" className="mt-6 hidden min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 text-base font-semibold text-[var(--bg)] sm:inline-flex">
        <WhatsAppIcon /> {cta}{sel && models.length > 0 ? ` · ${sel}` : ""}
      </a>
      <div className="wa-bar fixed inset-x-0 bottom-0 z-30 border-t border-[var(--line)] bg-[var(--bg)]/95 p-3 backdrop-blur sm:hidden">
        <a data-wa href={href} target="_blank" rel="noopener" className="flex min-h-[52px] items-center justify-center gap-2 rounded-full bg-[var(--accent)] font-semibold text-[var(--bg)]"><WhatsAppIcon /> {bar}{sel && models.length > 0 ? ` · ${sel}` : ""}</a>
      </div>
    </>
  );
}
