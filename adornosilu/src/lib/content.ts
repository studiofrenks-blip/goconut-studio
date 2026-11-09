import type { Lang } from "./i18n";

// Textos editables. Fuente: Supabase (tabla "contenidos": clave, es, en).
// Si Supabase no está configurado o no responde, se usan estos valores por defecto.
const defaults = {
  "home.kicker": { es: "Fabricantes desde hace más de 60 años", en: "Makers for more than 60 years" },
  "home.h1": { es: "Donde nace la Navidad en Venezuela: pinos, coronas y guirnaldas Adornos ILU", en: "Where Christmas is born in Venezuela: Adornos ILU trees, wreaths and garlands" },
  "home.lead1": { es: "Donde nace la", en: "Where" },
  "home.lead2": { es: "", en: "is born" },
  "home.words": { es: "Navidad|magia|tradición|ilusión", en: "Christmas|magic|tradition|wonder" },
  "home.sub": { es: "Pinos, coronas y guirnaldas fabricados en Venezuela para que la Navidad dure años.", en: "Trees, wreaths and garlands made in Venezuela so Christmas lasts for years." },
  "home.manifesto": { es: "Somos una empresa familiar venezolana. Desde hace más de 60 años fabricamos pinos, coronas y guirnaldas que conservan su forma, su brillo y su estructura temporada tras temporada. No decoramos espacios: creamos el lugar donde se reúne la familia.", en: "We are a Venezuelan family business. For more than 60 years we have made trees, wreaths and garlands that keep their shape, shine and structure season after season. We don't just decorate spaces: we create the place where families gather." },
  "home.catTitle": { es: "Lo que fabricamos", en: "What we make" },
  "home.projTitle": { es: "Pinos gigantes", en: "Giant trees" },
  "home.projText": { es: "Estructuras de hasta 20 metros para plazas, centros comerciales y avenidas. Las fabricamos y montamos en toda Venezuela.", en: "Structures up to 20 metres tall for squares, shopping centres and avenues. We build and install them all over Venezuela." },
  "home.whyTitle": { es: "De la idea al adorno perfecto", en: "From idea to the perfect ornament" },
  "about.h1a": { es: "Fabricamos", en: "We make" },
  "about.h1b": { es: "la Navidad", en: "Christmas" },
  "about.lead": { es: "Una empresa familiar venezolana con más de 60 años de historia.", en: "A Venezuelan family business with more than 60 years of history." },
  "about.p1": { es: "Adornos ILU nació del deseo de llenar cada Navidad de color, elegancia y espíritu festivo. Hoy mantenemos el legado familiar con una visión moderna, enfocada en la innovación, la calidad y la expansión nacional e internacional.", en: "Adornos ILU was born from the wish to fill every Christmas with colour, elegance and festive spirit. Today we keep the family legacy with a modern vision focused on innovation, quality and growth at home and abroad." },
  "about.p2": { es: "Fabricamos pinos, coronas y guirnaldas diseñados para conservar su forma, brillo y estructura a lo largo de los años, incluso en condiciones exigentes. Decoramos hogares, oficinas y grandes espacios comerciales.", en: "We make trees, wreaths and garlands designed to keep their shape, shine and structure for years, even in demanding conditions. We decorate homes, offices and large commercial spaces." },
  "about.p3": { es: "No buscamos competir con productos similares: ofrecemos una alternativa superior, hecha con el conocimiento profundo del gusto y las tradiciones navideñas.", en: "We don't try to compete with similar products: we offer a better alternative, made with a deep knowledge of Christmas taste and traditions." },
  "about.quote": { es: "En cada adorno hay un pedacito de historia, un suspiro de felicidad y la promesa de una Navidad llena de recuerdos inolvidables.", en: "In every ornament there is a little piece of history, a sigh of happiness and the promise of a Christmas full of unforgettable memories." },
  "contact.h1a": { es: "Hablemos de", en: "Let's talk about" },
  "contact.h1b": { es: "tu Navidad", en: "your Christmas" },
  "contact.lead": { es: "Seas cliente final, tienda, decorador o distribuidor, te asesoramos y te enviamos disponibilidad.", en: "Whether you are a customer, a shop, a decorator or a distributor, we will advise you and send you availability." },
} satisfies Record<string, Record<Lang, string>>;

export type ContentKey = keyof typeof defaults;
export type Content = Record<ContentKey, string>;

export async function getContent(lang: Lang): Promise<Content> {
  const base = Object.fromEntries(Object.entries(defaults).map(([k, v]) => [k, v[lang]])) as Content;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return base;
  try {
    const r = await fetch(`${url}/rest/v1/contenidos?select=clave,es,en`, {
      headers: { apikey: key, Authorization: `Bearer ${key}` },
      next: { revalidate: 1800 },
    });
    if (!r.ok) return base;
    const rows = (await r.json()) as { clave: string; es: string | null; en: string | null }[];
    for (const row of rows) if (row.clave in base && row[lang]) (base as Record<string, string>)[row.clave] = row[lang]!;
    return base;
  } catch {
    return base;
  }
}
