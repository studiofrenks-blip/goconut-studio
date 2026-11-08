import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Cliente público (solo lectura de lo publicado + insertar mensajes de contacto, vía RLS). */
export const supabase: SupabaseClient | null = url && anon ? createClient(url, anon, { auth: { persistSession: false } }) : null;
