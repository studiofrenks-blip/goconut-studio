export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "es";

export function isLocale(v: string): v is Locale {
  return (locales as readonly string[]).includes(v);
}

// Claves internas de página -> slug público por idioma.
export type PageKey = "home" | "about" | "work" | "contact" | "blog" | "notice" | "privacy" | "cookies";

const slugs: Record<PageKey, Record<Locale, string>> = {
  home: { es: "", en: "" },
  about: { es: "nosotros", en: "about" },
  work: { es: "proyectos", en: "work" },
  contact: { es: "contacto", en: "contact" },
  blog: { es: "blog", en: "blog" },
  notice: { es: "legal/aviso-legal", en: "legal/legal-notice" },
  privacy: { es: "legal/privacidad", en: "legal/privacy" },
  cookies: { es: "legal/cookies", en: "legal/cookies" },
};

export function href(locale: Locale, page: PageKey, extra = ""): string {
  const s = slugs[page][locale];
  const path = `/${locale}${s ? "/" + s : ""}${extra ? "/" + extra : ""}`;
  return path;
}

export function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ideaholikstudio.com").replace(/\/$/, "");
}

export function isIndexable(): boolean {
  return process.env.SITE_INDEXABLE === "1";
}

/** Metadatos de idioma alternativo + canónica para una página. */
export function alternates(locale: Locale, page: PageKey, extra?: Partial<Record<Locale, string>>) {
  const base = siteUrl();
  const url = (l: Locale) => base + href(l, page, extra?.[l] ?? "");
  const languages: Record<string, string> = {};
  for (const l of locales) if (!extra || extra[l] !== undefined) languages[l] = url(l);
  if (languages.es) languages["x-default"] = languages.es;
  return { canonical: url(locale), languages };
}

/** Ruta equivalente en el otro idioma (para el botón ES/EN). */
export function translatePath(pathname: string, to: Locale): string {
  const m = pathname.match(/^\/(es|en)(?:\/(.*))?$/);
  if (!m) return `/${to}`;
  const from = m[1] as Locale;
  const rest = (m[2] || "").replace(/\/$/, "");
  if (!rest) return `/${to}`;
  for (const key of Object.keys(slugs) as PageKey[]) {
    if (slugs[key][from] === rest) return href(to, key);
  }
  if (rest.startsWith("blog/")) return href(to, "blog");
  return `/${to}`;
}
