import type { Lang } from "./i18n";
import type { Category, Product } from "./products";

const cat: Record<string, { name: string; title: string; intro: string; seo: string }> = {
  pinos: { name: "Christmas trees", title: "Christmas trees", intro: "Full, easy-to-assemble artificial trees that keep their shape, colour and structure season after season.", seo: "Adornos ILU Christmas trees: Canadian King, Slim, Slim Deluxe, Prince, Monterrey, Victoria and tabletop trees. Full, easy to assemble and made in Venezuela." },
  "pinos-gigantes": { name: "Giant trees", title: "Giant and structural trees", intro: "Metal structures for Christmas trees up to 20 metres tall, professionally installed anywhere in Venezuela.", seo: "Giant and structural Christmas trees up to 20 metres tall for squares, shopping centres and avenues. Wired metal structure, installed anywhere in Venezuela." },
  coronas: { name: "Wreaths", title: "Christmas wreaths", intro: "Canadian pine wreaths for doors, walls and tables, from 41 cm to 1.80 m in diameter.", seo: "Canadian King and Canadian King Junior Christmas wreaths for doors, walls and tables, from 41 cm to 1.80 m in diameter, in green, white and snowy." },
  guirnaldas: { name: "Garlands", title: "Christmas garlands", intro: "Shapeable garlands for staircases, railings, mantelpieces and façades.", seo: "Canadian King and flexible Christmas garlands for staircases, railings, mantelpieces and façades. Shapeable, ready to light and made in Venezuela." },
};

const prod: Record<string, { summary: string; body: string[] }> = {
  "pino-canadian-king-pck": { summary: "Canadian King tree: the classic triangular shape of the Canadian pine, full and easy to assemble. 1.80 to 2.40 m, in green, white and snowy.", body: ["If you love tradition, the Canadian King is your tree. It keeps the classic triangular shape of the Canadian pine, it is full and it goes up in minutes.", "We make it in four heights so it fits any space, from the living room to an office lobby."] },
  "pino-canadian-king-slim-pcks": { summary: "Canadian King Slim tree: as full as the Canadian King with a smaller diameter for compact spaces. From 1.80 to 2.20 m tall.", body: ["If we had to describe it in one word, it would be versatile. It comes from the Canadian King and is just as full, but with a smaller diameter for smaller spaces."] },
  "pino-canadian-king-slim-deluxe-pcksl": { summary: "Canadian King Slim Deluxe tree: slender silhouette and wide light-green branches, designed for high ceilings. From 2.44 to 3.66 m.", body: ["Designed to make tall spaces shine. Its slim figure sets the trend, with a wider branch that starts at the base, in light green tones.", "Elegant, understated, full and easy to assemble."] },
  "pino-canadian-prince-pcp": { summary: "Canadian Prince tree: practical, compact and very easy to assemble. Five heights from 1.20 to 2.20 m to bring Christmas to any corner.", body: ["Practical, compact and very easy to assemble. The Canadian Prince is the tree made to give your spaces the Christmas touch you have been waiting for."] },
  "pino-monterrey-pm": { summary: "Monterrey tree: imposing, elegant and modern, the flagship tree of Adornos ILU. From 2.00 to 2.80 m tall, with a metal stand.", body: ["When we talk about distinction, we talk about the Monterrey. Imposing, elegant and modern: a tree of great quality and style.", "The Monterrey is a synonym of our brand."] },
  "pino-victoria-pv": { summary: "Victoria tree: inspired by nature, different and unique, and easy to assemble. From 2.00 to 2.40 m tall, with a metal stand.", body: ["Inspired by nature. If you are looking for something different and unique, the Victoria is ideal for that special space, and it is easy to assemble."] },
  "pino-de-mesa-pa": { summary: "Tabletop trees of 60 and 90 cm: the perfect touch for tables, bedrooms, practices and offices. In green, white, snowy and colours.", body: ["The perfect complement to your decoration: they add a special touch to the table, bedroom, practice or office."] },
  "pinos-estructurales": { summary: "Giant structural trees up to 20 m for squares, shopping centres and avenues. Wired metal structure, installed anywhere in Venezuela.", body: ["Built on a smart industrial design to be assembled and dismantled easily, quickly and safely. The metal structure guarantees safety and strength, and it is wired with high-quality materials for perfect lighting. Its branches give a natural, imposing look.", "They are the perfect canvas for endless decorative schemes and add a magical touch to squares, shopping centres, streets and avenues.", "We build and install structures up to 20 metres tall. The reinforced modular base lets them grow season after season without losing stability, and we offer professional installation across the country."] },
  "corona-canadian-king-rck": { summary: "Canadian King wreath for doors, walls and tables. Five diameters from 51 cm to 1.80 m, in green, white and snowy.", body: ["Our Christmas wreath is that unique detail for doors, walls and tables. Lit and decorated, it is the perfect touch for your spaces."] },
  "corona-canadian-king-junior-rckj": { summary: "Canadian King Junior wreath, 41 and 66 cm: the Christmas detail for doors, walls and tables, ready to light and decorate.", body: ["The compact version of our Canadian King wreath: the unique detail for doors, walls and tables. Lit and decorated, it looks perfect anywhere."] },
  "guirnalda-canadian-king": { summary: "Canadian King garland made of stiff Canadian pine branches, shapeable and ready to light. Four models in green, white and snowy.", body: ["A garland woven with stiff Canadian pine branches. Its shapeable design adapts to any decoration and you can light and decorate it however you like."] },
  "guirnalda-flexible": { summary: "Flexible garland, 4.5 and 5 m long, in several widths and colours, for a different touch on staircases, railings and façades.", body: ["A garland woven with flexible branches, available in several sizes and colours to give a different touch to that special place."] },
};

const words: Record<string, string> = {
  Altura: "Height", Ancho: "Width", Ramas: "Branches", "Unidades por bulto": "Units per pack", Diámetro: "Diameter", Largo: "Length",
  Verde: "Green", Blanco: "White", Nevado: "Snowy", Otros: "Others", "Colores variados": "Assorted colours", Metálica: "Metal", Plástica: "Plastic",
};

export const L = (s: string, lang: Lang) => (lang === "en" ? words[s] ?? s : s);
// 2,00 m → 2.00 m · 1.489 → 1,489
export const N = (s: string, lang: Lang) => (lang === "en" ? s.replace(/(\d)([.,])(\d)/g, (_, a, sep, b) => a + (sep === "," ? "." : ",") + b) : s);

export const catText = (c: Category, lang: Lang) => (lang === "en" ? cat[c.slug] : { name: c.name, title: c.title, intro: c.intro, seo: c.seo });
export const prodText = (p: Product, lang: Lang) => (lang === "en" ? prod[p.slug] : { summary: p.summary, body: p.body });
