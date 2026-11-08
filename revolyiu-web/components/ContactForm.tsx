"use client";
import Link from "next/link";
import { useState } from "react";
import { services, site } from "@/lib/content";
import { Arrow } from "./Icons";

type State = "idle" | "sending" | "ok" | "err";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      name: fd.get("name"), email: fd.get("email"), phone: fd.get("phone"), company: fd.get("company"),
      message: fd.get("message"), services: fd.getAll("services"), privacy: fd.get("privacy") === "on", website: fd.get("website"),
    };
    setState("sending");
    try {
      const r = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "error");
      setState("ok");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setError(err instanceof Error && err.message !== "error" ? err.message : "");
      setState("err");
    }
  }

  if (state === "ok")
    return (
      <div className="form__msg form__msg--ok" role="status">
        <h2 className="h-md" style={{ marginBottom: 12 }}>¡Mensaje recibido!</h2>
        <p style={{ margin: 0 }}>Gracias por escribirnos. Te responderemos lo antes posible.</p>
      </div>
    );

  return (
    <form className="form" onSubmit={onSubmit} noValidate={false} data-fx="01">
      <div className="form__row">
        <div className="field"><label htmlFor="f-name">Nombre *</label><input id="f-name" name="name" required autoComplete="name" maxLength={120} /></div>
        <div className="field"><label htmlFor="f-email">Correo electrónico *</label><input id="f-email" name="email" type="email" required autoComplete="email" maxLength={200} /></div>
      </div>
      <div className="form__row">
        <div className="field"><label htmlFor="f-phone">Teléfono</label><input id="f-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} /></div>
        <div className="field"><label htmlFor="f-company">Empresa o marca</label><input id="f-company" name="company" autoComplete="organization" maxLength={120} /></div>
      </div>
      <fieldset className="field chips">
        <legend>¿Qué necesitas?</legend>
        {services.map((s) => (
          <label className="chip" key={s.slug}><input type="checkbox" name="services" value={s.name} /><span>{s.name}</span></label>
        ))}
      </fieldset>
      <div className="field"><label htmlFor="f-msg">Cuéntanos tu proyecto *</label><textarea id="f-msg" name="message" required minLength={10} maxLength={5000} /></div>
      <div className="hp" aria-hidden="true"><label htmlFor="f-web">No rellenar</label><input id="f-web" name="website" tabIndex={-1} autoComplete="off" /></div>
      <label className="check">
        <input type="checkbox" name="privacy" required />
        <span>He leído y acepto la <Link href="/politica-de-privacidad/">política de privacidad</Link>. Usaremos tus datos solo para responder a tu consulta. *</span>
      </label>
      {state === "err" && (
        <div className="form__msg form__msg--err" role="alert">
          {error || "No hemos podido enviar el mensaje."} Escríbenos a <a href={`mailto:${site.email}`}>{site.email}</a> o por <a href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a>.
        </div>
      )}
      <div><button className="btn btn--primary" type="submit" disabled={state === "sending"} data-magnetic>{state === "sending" ? "Enviando…" : "Enviar mensaje"} <Arrow /></button></div>
    </form>
  );
}
