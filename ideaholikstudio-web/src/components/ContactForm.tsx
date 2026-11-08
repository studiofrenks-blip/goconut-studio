"use client";
import { useActionState } from "react";
import { sendContact, type ContactState } from "@/app/actions";

type T = Record<
  | "name" | "email" | "subject" | "subjectPick" | "subjectOther" | "message" | "consent" | "consentLink"
  | "send" | "sending" | "ok" | "error" | "invalid" | "privacyNote",
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
    <form className="form" action={action} noValidate>
      <input type="hidden" name="locale" value={locale} />
      <div className="hp" aria-hidden="true">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="field">
        <label htmlFor="f-name">{t.name}</label>
        <input id="f-name" name="name" autoComplete="name" required maxLength={120} aria-invalid={err("name")} />
      </div>
      <div className="field">
        <label htmlFor="f-email">{t.email}</label>
        <input id="f-email" name="email" type="email" autoComplete="email" required maxLength={200} aria-invalid={err("email")} />
      </div>
      <div className="field">
        <label htmlFor="f-subject">{t.subject}</label>
        <select id="f-subject" name="subject" defaultValue="">
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
        <textarea id="f-msg" name="message" required maxLength={4000} aria-invalid={err("message")} />
      </div>
      <label className="check">
        <input type="checkbox" name="consent" required aria-invalid={err("consent")} />
        <span>
          {t.consent} <a href={privacyHref}>{t.consentLink}</a>.
        </span>
      </label>
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
