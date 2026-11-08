export const site = {
  name: "Adornos ILU",
  domain: "adornosilu.com",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://adornosilu.com",
  tagline: "El lugar donde nace la Navidad en Venezuela",
  description:
    "Adornos ILU: fabricantes venezolanos de pinos, coronas y guirnaldas navideñas con más de 60 años de tradición.",
  company: {
    legalName: "Ilu Company, C.A.",
    rif: "J-50539722-2",
    address:
      "Zona Industrial Soco, Avenida El Parque, galpón No. 19, La Victoria, Edo. Aragua, Venezuela",
    email: "", // PENDIENTE: confirmar del respaldo
    phone: "", // PENDIENTE: confirmar del respaldo
  },
  // Solo la web aprobada en producción se indexa. Cualquier otra dirección (prueba) lleva noindex.
  indexable: process.env.NEXT_PUBLIC_INDEXABLE === "true",
} as const;

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/tienda", label: "Tienda" },
  { href: "/blog", label: "Blog" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const legalNav = [
  { href: "/aviso-legal", label: "Aviso legal" },
  { href: "/privacidad", label: "Política de privacidad" },
  { href: "/cookies", label: "Política de cookies" },
  { href: "/condiciones-de-venta", label: "Condiciones de venta" },
  { href: "/desistimiento", label: "Derecho de desistimiento" },
] as const;
