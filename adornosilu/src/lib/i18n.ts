export type Lang = "es" | "en";
export const langs: Lang[] = ["es", "en"];

type Key = "home" | "about" | "catalog" | "category" | "product" | "blog" | "post" | "contact" | "legal" | "privacy" | "cookies" | "terms" | "withdrawal";

const table: Record<Key, Record<Lang, string>> = {
  home: { es: "/", en: "/en" },
  about: { es: "/nosotros", en: "/en/about" },
  catalog: { es: "/catalogo", en: "/en/catalog" },
  category: { es: "/catalogo/:p", en: "/en/catalog/:p" },
  product: { es: "/producto/:p", en: "/en/product/:p" },
  blog: { es: "/blog", en: "/en/blog" },
  post: { es: "/blog/:p", en: "/en/blog/:p" },
  contact: { es: "/contacto", en: "/en/contact" },
  legal: { es: "/aviso-legal", en: "/en/legal-notice" },
  privacy: { es: "/privacidad", en: "/en/privacy" },
  cookies: { es: "/cookies", en: "/en/cookies" },
  terms: { es: "/condiciones-de-venta", en: "/en/terms-of-sale" },
  withdrawal: { es: "/desistimiento", en: "/en/withdrawal" },
};

export const path = (key: Key, lang: Lang, p?: string) => table[key][lang].replace(":p", p ?? "");

// canonical + hreflang de cada página
export const alternates = (key: Key, lang: Lang, p?: string) => ({
  canonical: path(key, lang, p),
  languages: { "es-VE": path(key, "es", p), en: path(key, "en", p), "x-default": path(key, "es", p) },
});

// Para el selector de idioma: traduce la ruta actual al otro idioma.
export function switchPath(pathname: string, to: Lang): string {
  const clean = pathname.replace(/\/$/, "") || "/";
  for (const k of Object.keys(table) as Key[]) {
    for (const from of langs) {
      const pat = table[k][from];
      const re = new RegExp("^" + pat.replace(":p", "([^/]+)") + "$");
      const m = clean.match(re);
      if (m) return path(k, to, m[1]);
    }
  }
  return path("home", to);
}
