"use server";
import { supabaseService } from "@/lib/supabase";

export type ContactValues = { name: string; email: string; subject: string; message: string; consent: boolean };
export type ContactState = { status: "idle" | "ok" | "invalid" | "error"; fields?: string[]; values?: ContactValues };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function sendContact(_prev: ContactState, fd: FormData): Promise<ContactState> {
  // Trampa para bots: si rellenan el campo oculto, fingimos éxito y no guardamos nada.
  if (String(fd.get("website") || "").trim()) return { status: "ok" };

  const name = String(fd.get("name") || "").trim().slice(0, 120);
  const email = String(fd.get("email") || "").trim().slice(0, 200);
  const subject = String(fd.get("subject") || "").trim().slice(0, 120);
  const message = String(fd.get("message") || "").trim().slice(0, 4000);
  const consent = fd.get("consent") === "on";
  const locale = String(fd.get("locale") || "es").slice(0, 2);

  const bad: string[] = [];
  if (name.length < 2) bad.push("name");
  if (!EMAIL.test(email)) bad.push("email");
  if (message.length < 10) bad.push("message");
  if (!consent) bad.push("consent");
  // Devolvemos lo escrito para que no se pierda al mostrar los errores.
  const values = { name, email, subject, message, consent };
  if (bad.length) return { status: "invalid", fields: bad, values };

  const sb = supabaseService();
  if (!sb) return { status: "error", values };
  const { error } = await sb.from("contact_messages").insert({ name, email, subject, message, locale });
  return error ? { status: "error", values } : { status: "ok" };
}
