// Catálogo provisional. Fuente definitiva: Supabase (tabla products) + fotos del respaldo.
// Descripciones, medidas y precios se rellenan al tener el respaldo de la web actual.
export type Category = { slug: string; name: string; intro: string };
export type Product = { slug: string; name: string; category: string };

export const categories: Category[] = [
  { slug: "pinos", name: "Pinos", intro: "Pinos navideños que conservan su forma, brillo y estructura año tras año." },
  { slug: "pinos-gigantes", name: "Pinos gigantes", intro: "Pinos estructurales de hasta 20 metros de altura para grandes espacios." },
  { slug: "coronas", name: "Coronas", intro: "Coronas navideñas para recibir la Navidad desde la puerta." },
  { slug: "guirnaldas", name: "Guirnaldas", intro: "Guirnaldas para vestir escaleras, chimeneas y fachadas." },
];

export const products: Product[] = [
  { slug: "pino-canadian-king", name: "Pino Canadian King", category: "pinos" },
  { slug: "pino-canadian-king-slim", name: "Pino Canadian King Slim", category: "pinos" },
  { slug: "pino-slim-deluxe", name: "Pino Slim Deluxe", category: "pinos" },
  { slug: "pino-canadian-prince", name: "Pino Canadian Prince", category: "pinos" },
  { slug: "pino-monterrey", name: "Pino Monterrey", category: "pinos" },
  { slug: "pino-victoria", name: "Pino Victoria", category: "pinos" },
  { slug: "pino-de-mesa", name: "Pino de mesa", category: "pinos" },
  { slug: "pinos-estructurales", name: "Pinos estructurales", category: "pinos-gigantes" },
  { slug: "corona-canadian-king", name: "Corona Canadian King", category: "coronas" },
  { slug: "corona-canadian-king-junior", name: "Corona Canadian King Junior", category: "coronas" },
  { slug: "guirnalda-canadian-king", name: "Guirnalda Canadian King", category: "guirnaldas" },
  { slug: "guirnalda-flexible", name: "Guirnalda flexible", category: "guirnaldas" },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const productsIn = (cat: string) => products.filter((p) => p.category === cat);
