"use client";
import { useState } from "react";
import type { Lang } from "@/lib/i18n";

// Formulario que no guarda nada: prepara el mensaje y lo abre en WhatsApp.
const TX = {
  es: { name: "Nombre", type: "Eres…", types: ["Cliente final", "Tienda", "Decorador", "Distribuidor", "Empresa o institución"], msg: "¿Qué necesitas?", send: "Enviar por WhatsApp", note: "Se abrirá WhatsApp con tu mensaje listo. No guardamos tus datos en esta web.", req: "Escribe tu nombre y tu mensaje.", hello: "Hola, soy" },
  en: { name: "Name", type: "You are…", types: ["Customer", "Shop", "Decorator", "Distributor", "Company or institution"], msg: "What do you need?", send: "Send on WhatsApp", note: "WhatsApp will open with your message ready. We don't store your data on this site.", req: "Please write your name and your message.", hello: "Hello, I am" },
};

export default function ContactForm({ lang, whatsapp }: { lang: Lang; whatsapp: string }) {
  const x = TX[lang];
  const [err, setErr] = useState("");
  const field = "mt-2 w-full rounded-2xl border border-[var(--line)] bg-[var(--bg-3)] px-4 py-3 text-base font-normal text-[var(--cream)] placeholder:text-[var(--cream-2)]/60";
  return (
    <form
      className="space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        const f = new FormData(e.currentTarget);
        const n = String(f.get("nombre") || "").trim(), m = String(f.get("mensaje") || "").trim(), t = String(f.get("tipo") || "");
        if (!n || !m) { setErr(x.req); return; }
        setErr("");
        window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(`${x.hello} ${n} (${t}). ${m}`)}`, "_blank", "noopener");
      }}
    >
      <label className="block text-sm font-semibold">{x.name}<input name="nombre" autoComplete="name" required className={field} /></label>
      <label className="block text-sm font-semibold">{x.type}
        <select name="tipo" className={`${field} min-h-12 appearance-none font-normal`}>{x.types.map((o) => <option key={o}>{o}</option>)}</select>
      </label>
      <label className="block text-sm font-semibold">{x.msg}<textarea name="mensaje" rows={5} required className={field} /></label>
      {err && <p role="alert" className="text-sm text-[var(--accent)]">{err}</p>}
      <button type="submit" className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--accent)] px-8 font-semibold text-[var(--bg)] sm:w-auto">{x.send}</button>
      <p className="text-sm text-[var(--cream-2)]">{x.note}</p>
    </form>
  );
}
