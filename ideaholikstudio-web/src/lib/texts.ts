import { cache } from "react";
import { defaults, type Texts, type TextKey } from "@/content/texts";
import type { Locale } from "@/lib/i18n";
import { supabasePublic } from "@/lib/supabase";

/** Textos de un idioma: valores locales + lo que haya en Supabase (manda Supabase). */
export const getTexts = cache(async (locale: Locale): Promise<Texts> => {
  const base = { ...defaults[locale] };
  const sb = supabasePublic();
  if (!sb) return base;
  try {
    const { data, error } = await sb.from("site_texts").select("key,value").eq("locale", locale);
    if (error || !data) return base;
    for (const row of data as { key: string; value: string }[]) {
      if (row.key in base && typeof row.value === "string" && row.value.trim()) {
        base[row.key as TextKey] = row.value;
      }
    }
  } catch {
    // Si Supabase no responde, la web sigue funcionando con los textos locales.
  }
  return base;
});
