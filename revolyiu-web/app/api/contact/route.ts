import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const hits = new Map<string, number[]>();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "?";
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60e3);
  if (recent.length >= 5) return NextResponse.json({ error: "Demasiados envíos seguidos. Prueba en unos minutos." }, { status: 429 });
  hits.set(ip, [...recent, now]);

  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return NextResponse.json({ error: "Petición no válida." }, { status: 400 }); }
  if (str(b.website, 200)) return NextResponse.json({ ok: true }); // trampa antispam

  const name = str(b.name, 120), email = str(b.email, 200), message = str(b.message, 5000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10)
    return NextResponse.json({ error: "Revisa el nombre, el correo y el mensaje." }, { status: 400 });
  if (b.privacy !== true) return NextResponse.json({ error: "Debes aceptar la política de privacidad." }, { status: 400 });

  if (!supabase) return NextResponse.json({ error: "El formulario aún no está conectado." }, { status: 503 });
  const services = Array.isArray(b.services) ? b.services.filter((s) => typeof s === "string").slice(0, 10).map((s) => (s as string).slice(0, 60)) : [];
  const { error } = await supabase.from("contact_messages").insert({
    name, email, phone: str(b.phone, 40) || null, company: str(b.company, 120) || null, message, services, privacy_accepted_at: new Date().toISOString(),
  });
  if (error) return NextResponse.json({ error: "No hemos podido guardar el mensaje." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
