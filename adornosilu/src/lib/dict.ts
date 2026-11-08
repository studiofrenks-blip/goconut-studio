import type { Lang } from "./i18n";

export const dict = {
  es: {
    nav: { home: "Inicio", about: "Nosotros", catalog: "Catálogo", blog: "Blog", contact: "Contacto" },
    menu: "Menú", skip: "Saltar al contenido", langName: "English", langShort: "EN",
    tagline: "El lugar donde nace la Navidad en Venezuela",
    whatsappCta: "Escríbenos por WhatsApp", whatsappMsg: "Hola, quiero información sobre sus productos.",
    productMsg: (n: string, c: string) => `Hola, quiero información sobre ${n} (${c}).`,
    seeCatalog: "Ver el catálogo", models: (n: number) => `${n} ${n === 1 ? "modelo" : "modelos"}`, items: (n: number) => `${n} ${n === 1 ? "producto" : "productos"}`, byProject: "Por proyecto",
    modelsTitle: "Modelos disponibles", colors: "Colores", base: "Base", material: "Material", madeIn: "Fabricado en",
    materialText: "PVC no inflamable, inodoro, que no se decolora", venezuela: "Venezuela",
    askWa: "Consultar disponibilidad por WhatsApp", askQuote: "Pedir presupuesto por WhatsApp", related: "También te puede gustar",
    footer: { web: "Web", catalog: "Catálogo", contact: "Contacto", cookies: "Configurar cookies", place: "La Victoria, Aragua, Venezuela" },
    legalNav: { legal: "Aviso legal", privacy: "Política de privacidad", cookies: "Política de cookies", terms: "Condiciones de venta", withdrawal: "Derecho de desistimiento" },
    closing: { line1: "¿Encendemos", line2: "tu Navidad?", btn: "Escríbenos" },
    blogEmpty: "Muy pronto, ideas de decoración navideña cada semana.",
  },
  en: {
    nav: { home: "Home", about: "About", catalog: "Catalog", blog: "Blog", contact: "Contact" },
    menu: "Menu", skip: "Skip to content", langName: "Español", langShort: "ES",
    tagline: "Where Christmas is born in Venezuela",
    whatsappCta: "Message us on WhatsApp", whatsappMsg: "Hello, I would like information about your products.",
    productMsg: (n: string, c: string) => `Hello, I would like information about ${n} (${c}).`,
    seeCatalog: "See the catalog", models: (n: number) => `${n} ${n === 1 ? "model" : "models"}`, items: (n: number) => `${n} ${n === 1 ? "product" : "products"}`, byProject: "Made to order",
    modelsTitle: "Available models", colors: "Colours", base: "Stand", material: "Material", madeIn: "Made in",
    materialText: "Flame-retardant, odourless, fade-resistant PVC", venezuela: "Venezuela",
    askWa: "Check availability on WhatsApp", askQuote: "Request a quote on WhatsApp", related: "You may also like",
    footer: { web: "Site", catalog: "Catalog", contact: "Contact", cookies: "Cookie settings", place: "La Victoria, Aragua, Venezuela" },
    legalNav: { legal: "Legal notice", privacy: "Privacy policy", cookies: "Cookie policy", terms: "Terms of sale", withdrawal: "Right of withdrawal" },
    closing: { line1: "Shall we light up", line2: "your Christmas?", btn: "Message us" },
    blogEmpty: "Coming soon: Christmas decorating ideas every week.",
  },
} as const;

export const t = (lang: Lang) => dict[lang];
