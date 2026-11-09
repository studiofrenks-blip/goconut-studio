"use client";
import { useActionState, useEffect, useRef, useState } from "react";
import { sendContact, type ContactState } from "@/app/actions";

type T = Record<
  | "name" | "email" | "subject" | "subjectPick" | "subjectOther" | "message" | "consent" | "consentLink"
  | "send" | "sending" | "ok" | "error" | "invalid" | "privacyNote"
  | "errName" | "errEmail" | "errMessage" | "errConsent",
  string
>;

export default function ContactForm({
  t,
  services,
  locale,
  privacyHref,
}: {
  t: T;
  services: string[];
  locale: string;
  privacyHref: string;
}) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, { status: "idle" });
  // Si vienes desde un servicio (?s=1..4), ya viene elegido.
  const [subject, setSubject] = useState("");
  useEffect(() => {
    const n = Number(new URLSearchParams(window.location.search).get("s"));
    if (n >= 1 && n <= services.length) setSubject(services[n - 1]);
  }, [services]);
  // Al fallar, el cursor va al primer campo con error.
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state.status !== "invalid") return;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state]);
  const err = (f: string) => (state.status === "invalid" && state.fields?.includes(f) ? true : undefined);

  if (state.status === "ok") {
    return (
      <div className="form">
        <p className="status ok" role="status">
          {t.ok}
        </p>
      </div>
    );
  }

  return (
    // La clave cambia con cada intento: el formulario se monta de nuevo con lo que se escribió.
    <form className="form" action={action} noValidate ref={formRef} key={`${subject}|${JSON.stringify(state.values || {})}`}>
      <input type="hidden" name="locale" value={locale} />
      <div className="hp" aria-hidden="true">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="field">
        <label htmlFor="f-name">{t.name}</label>
        <input id="f-name" name="name" defaultValue={state.values?.name} autoComplete="name" required maxLength={120} aria-invalid={err("name")} aria-describedby={err("name") ? "e-name" : undefined} />
        {err("name") && <p className="err" id="e-name">{t.errName}</p>}
      </div>
      <div className="field">
        <label htmlFor="f-email">{t.email}</label>
        <input id="f-email" name="email" defaultValue={state.values?.email} type="email" autoComplete="email" required maxLength={200} aria-invalid={err("email")} aria-describedby={err("email") ? "e-email" : undefined} />
        {err("email") && <p className="err" id="e-email">{t.errEmail}</p>}
      </div>
      <div className="field">
        <label htmlFor="f-subject">{t.subject}</label>
        <select id="f-subject" name="subject" defaultValue={state.values?.subject || subject}>
          <option value="" disabled>
            {t.subjectPick}
          </option>
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
          <option value="other">{t.subjectOther}</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="f-msg">{t.message}</label>
        <textarea id="f-msg" name="message" defaultValue={state.values?.message} required maxLength={4000} aria-invalid={err("message")} aria-describedby={err("message") ? "e-msg" : undefined} />
        {err("message") && <p className="err" id="e-msg">{t.errMessage}</p>}
      </div>
      <label className="check">
        <input type="checkbox" name="consent" defaultChecked={state.values?.consent} required aria-invalid={err("consent")} aria-describedby={err("consent") ? "e-consent" : undefined} />
        <span>
          {t.consent} <a href={privacyHref}>{t.consentLink}</a>.
        </span>
      </label>
      {err("consent") && <p className="check-err" id="e-consent">{t.errConsent}</p>}
      <p className="note">{t.privacyNote}</p>
      {state.status === "invalid" && (
        <p className="status bad" role="alert">
          {t.invalid}
        </p>
      )}
      {state.status === "error" && (
        <p className="status bad" role="alert">
          {t.error}
        </p>
      )}
      <button className="btn btn-lime" type="submit" disabled={pending}>
        {pending ? t.sending : t.send}
      </button>
    </form>
  );
}
