import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let anon: SupabaseClient | null | undefined;

/** Cliente de solo lectura (clave pública). null si no hay Supabase configurado. */
export function supabasePublic(): SupabaseClient | null {
  if (anon !== undefined) return anon;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  anon = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return anon;
}

/** Cliente de servidor con permisos de escritura (solo para el formulario). */
export function supabaseService(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
}
