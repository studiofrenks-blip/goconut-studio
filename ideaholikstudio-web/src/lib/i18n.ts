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

// Rutas internas (las de las carpetas de Next). Durante el prerender,
// usePathname() devuelve estas y no las públicas.
const internal: Partial<Record<PageKey, string>> = {
  about: "about",
  work: "work",
  contact: "contact",
  notice: "legal/notice",
  privacy: "legal/privacy",
  cookies: "legal/cookies",
};

/** Qué página es una ruta (pública o interna). */
export function pageKeyOf(pathname: string): { locale: Locale; key: PageKey | null; rest: string } | null {
  const m = pathname.match(/^\/(es|en)(?:\/(.*))?$/);
  if (!m) return null;
  const locale = m[1] as Locale;
  const rest = (m[2] || "").replace(/\/$/, "");
  if (!rest) return { locale, key: "home", rest };
  for (const key of Object.keys(slugs) as PageKey[]) {
    if (slugs[key][locale] === rest || internal[key] === rest) return { locale, key, rest };
  }
  if (rest.startsWith("blog/")) return { locale, key: "blog", rest };
  return { locale, key: null, rest };
}

/** Ruta equivalente en el otro idioma (para el botón ES/EN). */
export function translatePath(pathname: string, to: Locale): string {
  const k = pageKeyOf(pathname);
  if (!k || !k.key) return `/${to}`;
  return href(to, k.key);
}
