// Catálogo real de adornosilu.com (leído de la web en vivo el 8-nov-2026).
// Fuente definitiva prevista: Supabase. Mientras tanto, este archivo es la fuente.
import images from "./product-images.json";

export type Category = { slug: string; name: string; title: string; intro: string; legacy: string; seo: string };
export type Model = { code: string; specs: [string, string][] };
export type Product = {
  slug: string;
  legacySlug: string; // slug de WordPress, para redirecciones 301
  code: string;
  name: string;
  categories: string[];
  summary: string; // descripción SEO (≤155 caracteres)
  body: string[];
  models: Model[];
  colors?: string[];
  base?: string;
  quote?: boolean; // se vende por presupuesto (instalación incluida)
  images: string[];
};

export const categories: Category[] = [
  { slug: "pinos", legacy: "pinos-navidenos", seo: "Pinos de Navidad Adornos ILU: Canadian King, Slim, Slim Deluxe, Prince, Monterrey, Victoria y pinos de mesa. Frondosos, de fácil armado y hechos en Venezuela.", name: "Pinos navideños", title: "Pinos de Navidad", intro: "Pinos artificiales frondosos y de fácil armado que conservan su forma, color y estructura temporada tras temporada." },
  { slug: "pinos-gigantes", legacy: "gigante", seo: "Pinos gigantes y estructurales de hasta 20 metros para plazas, centros comerciales y avenidas. Estructura metálica cableada y montaje en toda Venezuela.", name: "Pinos gigantes", title: "Pinos gigantes y estructurales", intro: "Estructuras metálicas para pinos navideños de hasta 20 metros, con montaje profesional en toda Venezuela." },
  { slug: "coronas", legacy: "coronas", seo: "Coronas navideñas Canadian King y Canadian King Junior para puertas, paredes y mesas, de 41 cm a 1,80 m de diámetro, en verde, blanco y nevado.", name: "Coronas", title: "Coronas navideñas", intro: "Coronas de pino canadiense para puertas, paredes y mesas, de 41 cm a 1,80 m de diámetro." },
  { slug: "guirnaldas", legacy: "guirnaldas", seo: "Guirnaldas navideñas Canadian King y flexibles para escaleras, barandas, chimeneas y fachadas. Moldeables, listas para iluminar y fabricadas en Venezuela.", name: "Guirnaldas", title: "Guirnaldas navideñas", intro: "Guirnaldas moldeables para vestir escaleras, barandas, chimeneas y fachadas." },
];

const img = (slug: string) => (images as Record<string, string[]>)[slug] ?? [];
const pino = (code: string, h: string, w: string, r: string): Model => ({ code, specs: [["Altura", h], ["Ancho", w], ["Ramas", r]] });

export const products: Product[] = [
  {
    slug: "pino-canadian-king-pck", legacySlug: "pino-canadian-king-pck", code: "PCK", name: "Pino Canadian King",
    categories: ["pinos"],
    summary: "Pino Canadian King: la forma triangular clásica del pino canadiense, frondoso y de fácil armado. De 1,80 a 2,40 m, en verde, blanco y nevado.",
    body: [
      "Si te gusta lo tradicional, el Canadian King es tu pino. Conserva la forma triangular clásica del pino canadiense, es frondoso y se arma en minutos.",
      "Lo fabricamos en cuatro alturas para que encaje en cualquier espacio, del salón de casa al vestíbulo de una oficina.",
    ],
    models: [pino("PCK-180", "1,80 m", "120 cm", "841"), pino("PCK-200", "2,00 m", "130 cm", "1.153"), pino("PCK-220", "2,20 m", "140 cm", "1.477"), pino("PCK-240", "2,40 m", "150 cm", "1.849")],
    colors: ["Verde", "Blanco", "Nevado"], base: "Metálica", images: img("pino-canadian-king-pck"),
  },
  {
    slug: "pino-canadian-king-slim-pcks", legacySlug: "pino-canadian-king-slim-pcks", code: "PCKS", name: "Pino Canadian King Slim",
    categories: ["pinos"],
    summary: "Pino Canadian King Slim: igual de frondoso que el Canadian King, con menos diámetro para espacios pequeños. De 1,80 a 2,20 m.",
    body: [
      "Si tuviéramos que describirlo con una palabra, sería versátil. Desciende del Canadian King y es igual de frondoso, pero con un diámetro menor para lucir en espacios más pequeños.",
    ],
    models: [pino("PCKS-180", "1,80 m", "80 cm", "613"), pino("PCKS-200", "2,00 m", "90 cm", "805"), pino("PCKS-220", "2,20 m", "100 cm", "1.029")],
    colors: ["Verde", "Blanco", "Nevado"], base: "Plástica", images: img("pino-canadian-king-slim-pcks"),
  },
  {
    slug: "pino-canadian-king-slim-deluxe-pcksl", legacySlug: "pino-canadian-king-slim-deluxe-pcksl", code: "PCKSL", name: "Pino Canadian King Slim Deluxe",
    categories: ["pinos"],
    summary: "Pino Canadian King Slim Deluxe: silueta esbelta y rama ancha en verde claro, pensado para techos altos. De 2,44 a 3,66 m.",
    body: [
      "Diseñado para enaltecer espacios de gran altura. Su figura slim marca tendencia, con una rama más ancha que nace desde la base, en tonos verde claro.",
      "Elegante, sobrio, frondoso y de fácil armado.",
    ],
    models: [pino("PCKSL-8’", "2,44 m", "106 cm", "1.285"), pino("PCKSL-9’", "2,74 m", "127 cm", "1.893"), pino("PCKSL-10’", "3,05 m", "130 cm", "1.893"), pino("PCKSL-12’", "3,66 m", "151 cm", "2.277")],
    colors: ["Verde"], base: "Metálica", images: img("pino-canadian-king-slim-deluxe-pcksl"),
  },
  {
    slug: "pino-canadian-prince-pcp", legacySlug: "pino-canadian-prince-pcp", code: "PCP", name: "Pino Canadian Prince",
    categories: ["pinos"],
    summary: "Pino Canadian Prince: práctico, compacto y muy fácil de armar. Cinco alturas de 1,20 a 2,20 m para llevar la Navidad a cualquier rincón.",
    body: [
      "Práctico, compacto y muy fácil de armar. El Canadian Prince es el pino hecho para dar a tus espacios ese toque navideño que tanto esperas.",
    ],
    models: [pino("PCP-120", "1,20 m", "80 cm", "137"), pino("PCP-160", "1,60 m", "90 cm", "301"), pino("PCP-180", "1,80 m", "100 cm", "385"), pino("PCP-200", "2,00 m", "110 cm", "481"), pino("PCP-220", "2,20 m", "120 cm", "709")],
    colors: ["Verde"], base: "Plástica", images: img("pino-canadian-prince-pcp"),
  },
  {
    slug: "pino-monterrey-pm", legacySlug: "pino-monterrey-pm", code: "PM", name: "Pino Monterrey",
    categories: ["pinos"],
    summary: "Pino Monterrey: imponente, elegante y moderno, el pino insignia de Adornos ILU. De 2,00 a 2,80 m de altura, con base metálica.",
    body: [
      "Si hablamos de distinción, hablamos del Monterrey. Imponente, elegante y moderno: un pino de gran calidad y estilo.",
      "El Monterrey es sinónimo de nuestra marca.",
    ],
    models: [pino("PM-200", "2,00 m", "130 cm", "1.489"), pino("PM-220", "2,20 m", "140 cm", "1.945"), pino("PM-240", "2,40 m", "150 cm", "2.449"), pino("PM-280", "2,80 m", "213 cm", "3.595")],
    colors: ["Verde", "Blanco", "Nevado", "Otros"], base: "Metálica", images: img("pino-monterrey-pm"),
  },
  {
    slug: "pino-victoria-pv", legacySlug: "pino-victoria-pv", code: "PV", name: "Pino Victoria",
    categories: ["pinos"],
    summary: "Pino Victoria: inspirado en la naturaleza, diferente y único, de fácil armado. De 2,00 a 2,40 m de altura, con base metálica.",
    body: [
      "Inspirado en la naturaleza. Si buscas algo diferente y único, el Victoria es ideal para ese espacio especial, y se arma con facilidad.",
    ],
    models: [pino("PV-200", "2,00 m", "110 cm", "1.416"), pino("PV-220", "2,20 m", "120 cm", "1.704"), pino("PV-240", "2,40 m", "130 cm", "2.640")],
    colors: ["Verde"], base: "Metálica", images: img("pino-victoria-pv"),
  },
  {
    slug: "pino-de-mesa-pa", legacySlug: "pino-de-mesa-pa", code: "PA", name: "Pino de mesa",
    categories: ["pinos"],
    summary: "Pinos de mesa de 60 y 90 cm: el complemento ideal para mesas, habitaciones, consultorios y oficinas. En verde, blanco, nevado y colores.",
    body: [
      "El complemento ideal para tu decoración: dan ese toque especial a la mesa, la habitación, el consultorio o la oficina.",
    ],
    models: [
      { code: "PA-60", specs: [["Altura", "60 cm"], ["Ramas", "45"], ["Unidades por bulto", "24"]] },
      { code: "PA-90", specs: [["Altura", "90 cm"], ["Ramas", "95"], ["Unidades por bulto", "12"]] },
    ],
    colors: ["Verde", "Blanco", "Nevado", "Colores variados"], base: "Plástica", images: img("pino-de-mesa-pa"),
  },
  {
    slug: "pinos-estructurales", legacySlug: "pinos-estructurales", code: "PE", name: "Pinos estructurales",
    categories: ["pinos-gigantes", "pinos"], quote: true,
    summary: "Pinos estructurales gigantes de hasta 20 m para plazas, centros comerciales y avenidas. Estructura metálica cableada y montaje en toda Venezuela.",
    body: [
      "Diseñados sobre un esquema industrial inteligente para armarse y desarmarse de forma fácil, rápida y segura. La estructura metálica garantiza seguridad y resistencia, y va cableada con materiales de gran calidad para una iluminación perfecta. Sus ramas le dan un aspecto natural e imponente.",
      "Son el lienzo perfecto para un sinfín de esquemas decorativos y dan un toque mágico a plazas, centros comerciales, calles y avenidas.",
      "Fabricamos y montamos estructuras de hasta 20 metros de altura. La base modular reforzada permite ampliarlas temporada tras temporada sin perder estabilidad, y ofrecemos instalación profesional en todo el país.",
    ],
    models: [],
    images: img("pinos-estructurales"),
  },
  {
    slug: "corona-canadian-king-rck", legacySlug: "corona-canadian-king-rck", code: "RCK", name: "Corona Canadian King",
    categories: ["coronas"],
    summary: "Corona Canadian King para puertas, paredes y mesas. Cinco diámetros, de 51 cm a 1,80 m, en verde, blanco y nevado.",
    body: [
      "Nuestra corona de Navidad es ese detalle único para puertas, paredes y mesas. Iluminada y decorada, será el toque perfecto para tus espacios.",
    ],
    models: [
      { code: "RCK-20", specs: [["Diámetro", "51 cm"], ["Ramas", "186"], ["Unidades por bulto", "4"]] },
      { code: "RCK-26", specs: [["Diámetro", "66 cm"], ["Ramas", "261"], ["Unidades por bulto", "4"]] },
      { code: "RCK-3’", specs: [["Diámetro", "91 cm"], ["Ramas", "192"], ["Unidades por bulto", "2"]] },
      { code: "RCK-4’", specs: [["Diámetro", "1,22 m"], ["Ramas", "350"], ["Unidades por bulto", "2"]] },
      { code: "RCK-6’", specs: [["Diámetro", "1,80 m"], ["Ramas", "592"], ["Unidades por bulto", "1"]] },
    ],
    colors: ["Verde", "Blanco", "Nevado"], images: img("corona-canadian-king-rck"),
  },
  {
    slug: "corona-canadian-king-junior-rckj", legacySlug: "corona-canadian-king-junior-rckj", code: "RCKJ", name: "Corona Canadian King Junior",
    categories: ["coronas"],
    summary: "Corona Canadian King Junior de 41 y 66 cm: el detalle navideño para puertas, paredes y mesas. Lista para iluminar y decorar.",
    body: [
      "La versión compacta de nuestra corona Canadian King: el detalle único para puertas, paredes y mesas. Iluminada y decorada, luce perfecta en cualquier espacio.",
    ],
    models: [
      { code: "RCKJ-16", specs: [["Diámetro", "41 cm"], ["Ramas", "63"], ["Unidades por bulto", "15"]] },
      { code: "RCKJ-26", specs: [["Diámetro", "66 cm"], ["Ramas", "168"], ["Unidades por bulto", "4"]] },
    ],
    colors: ["Verde"], images: img("corona-canadian-king-junior-rckj"),
  },
  {
    slug: "guirnalda-canadian-king", legacySlug: "guirnaldas-canadian-king", code: "GCK", name: "Guirnalda Canadian King",
    categories: ["guirnaldas"],
    summary: "Guirnalda Canadian King de ramas rígidas de pino canadiense, moldeable y lista para iluminar. Cuatro modelos, en verde, blanco y nevado.",
    body: [
      "Guirnalda tejida con ramas rígidas de pino canadiense. Su diseño moldeable se adapta a cualquier decoración y puedes iluminarla y decorarla como quieras.",
    ],
    models: [
      { code: "200/156", specs: [["Largo", "2,75 m"], ["Ancho", "20 cm"], ["Ramas", "156"], ["Unidades por bulto", "20"]] },
      { code: "280/156", specs: [["Largo", "2,75 m"], ["Ancho", "28 cm"], ["Ramas", "156"], ["Unidades por bulto", "10"]] },
      { code: "280/240", specs: [["Largo", "2,75 m"], ["Ancho", "28 cm"], ["Ramas", "240"], ["Unidades por bulto", "8"]] },
      { code: "310/360", specs: [["Largo", "2,75 m"], ["Ancho", "31 cm"], ["Ramas", "360"], ["Unidades por bulto", "6"]] },
    ],
    colors: ["Verde", "Blanco", "Nevado"], images: img("guirnalda-canadian-king"),
  },
  {
    slug: "guirnalda-flexible", legacySlug: "guirnaldas-flexible", code: "G", name: "Guirnalda flexible",
    categories: ["guirnaldas"],
    summary: "Guirnalda flexible de 4,5 y 5 m, en varios anchos y colores, para dar un toque distinto a escaleras, barandas y fachadas.",
    body: [
      "Guirnalda tejida con ramas flexibles, disponible en varios tamaños y colores para dar un toque diferente a ese lugar especial.",
    ],
    models: [
      { code: "G-44510", specs: [["Largo", "4,5 m"], ["Ancho", "100 mm"], ["Unidades por bulto", "30"]] },
      { code: "G-6580", specs: [["Largo", "5 m"], ["Ancho", "80 mm"], ["Unidades por bulto", "24"]] },
      { code: "G-6512", specs: [["Largo", "5 m"], ["Ancho", "120 mm"], ["Unidades por bulto", "18"]] },
      { code: "G-6515", specs: [["Largo", "5 m"], ["Ancho", "150 mm"], ["Unidades por bulto", "8"]] },
    ],
    colors: ["Verde", "Nevado", "Colores variados"], images: img("guirnalda-flexible"),
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsIn = (cat: string) => products.filter((p) => p.categories.includes(cat));
export const primaryCategory = (p: Product) => getCategory(p.categories[0])!;
