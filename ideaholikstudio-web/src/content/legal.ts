// Datos del titular y textos legales (LSSI-CE, RGPD, LOPDGDD).
// ⚠️ Los campos con PENDIENTE hay que rellenarlos antes de apuntar el dominio.
// El QA (qa/run-qa.mjs) falla mientras quede alguno.
import type { Locale } from "@/lib/i18n";

export const PENDING = "PENDIENTE";

export const owner = {
  name: PENDING, // Nombre y apellidos o razón social
  taxId: PENDING, // NIF / CIF
  address: PENDING, // Domicilio completo
  email: PENDING, // Email de contacto y para ejercer derechos
  registry: "", // Datos registrales si es sociedad (opcional si es autónomo)
  brand: "Ideaholiks Studio",
  domain: "ideaholikstudio.com",
};

export const lastUpdated = "2026-11-08";

export type LegalSection = { h: string; p: string[] };
export type LegalDoc = { title: string; metaDesc: string; intro: string; sections: LegalSection[] };

const o = owner;

const es: Record<"notice" | "privacy" | "cookies", LegalDoc> = {
  notice: {
    title: "Aviso legal",
    metaDesc:
      "Aviso legal de Ideaholiks Studio: datos del titular de la web, condiciones de uso, propiedad intelectual y legislación aplicable.",
    intro: `En cumplimiento de la Ley 34/2002, de servicios de la sociedad de la información y de comercio electrónico (LSSI-CE), estos son los datos del titular de ${o.domain}.`,
    sections: [
      {
        h: "1. Titular",
        p: [
          `Titular: ${o.name}. Nombre comercial: ${o.brand}.`,
          `NIF/CIF: ${o.taxId}. Domicilio: ${o.address}.`,
          `Email: ${o.email}.${o.registry ? " " + o.registry : ""}`,
        ],
      },
      {
        h: "2. Uso de la web",
        p: [
          "Al navegar por esta web aceptas este aviso legal. Te comprometes a usarla de forma lícita y a no dañar la web, sus sistemas ni a terceros.",
        ],
      },
      {
        h: "3. Propiedad intelectual e industrial",
        p: [
          `Los textos, fotografías, logotipos, diseño y código de esta web pertenecen a ${o.brand} o a sus legítimos titulares. No se pueden reproducir, distribuir ni transformar sin autorización expresa.`,
        ],
      },
      {
        h: "4. Responsabilidad",
        p: [
          "Cuidamos que la información sea correcta y esté actualizada, pero no garantizamos la ausencia de errores ni la disponibilidad ininterrumpida de la web. No respondemos del contenido de webs de terceros enlazadas desde aquí.",
        ],
      },
      {
        h: "5. Legislación y jurisdicción",
        p: [
          "Este aviso legal se rige por la legislación española. Para cualquier conflicto, las partes se someten a los juzgados y tribunales que correspondan conforme a la ley; si la persona usuaria es consumidora, los de su domicilio.",
        ],
      },
    ],
  },
  privacy: {
    title: "Política de privacidad",
    metaDesc:
      "Cómo trata Ideaholiks Studio tus datos personales: responsable, finalidad, base legal, plazos de conservación, destinatarios y tus derechos.",
    intro:
      "Esta política explica qué datos personales tratamos, para qué y cuáles son tus derechos, conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).",
    sections: [
      {
        h: "1. Responsable del tratamiento",
        p: [`${o.name} (${o.brand}), NIF/CIF ${o.taxId}, con domicilio en ${o.address}. Contacto: ${o.email}.`],
      },
      {
        h: "2. Qué datos tratamos y para qué",
        p: [
          "Formulario de contacto: nombre, email, el servicio que te interesa y tu mensaje. Los usamos solo para responderte y, si lo pides, preparar una propuesta.",
          "Navegación: guardamos tu elección sobre cookies. No usamos cookies de análisis ni de publicidad salvo que las aceptes.",
        ],
      },
      {
        h: "3. Base legal",
        p: [
          "Tu consentimiento al enviar el formulario (art. 6.1.a RGPD) y, si llegamos a trabajar juntos, la aplicación de medidas precontractuales a petición tuya (art. 6.1.b RGPD).",
        ],
      },
      {
        h: "4. Cuánto tiempo guardamos los datos",
        p: [
          "Los mensajes de contacto, hasta 12 meses después de la última comunicación, salvo que se conviertan en una relación comercial. Después se borran.",
        ],
      },
      {
        h: "5. Destinatarios y proveedores",
        p: [
          "No cedemos tus datos a terceros salvo obligación legal. Usamos proveedores que tratan datos por nuestra cuenta con contrato de encargo: Vercel Inc. (alojamiento web) y Supabase Inc. (base de datos). Pueden implicar transferencias internacionales amparadas en las cláusulas contractuales tipo de la Comisión Europea o en el Marco de Privacidad de Datos UE-EE. UU.",
        ],
      },
      {
        h: "6. Tus derechos",
        p: [
          `Puedes pedir acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad de tus datos, y retirar tu consentimiento cuando quieras, escribiendo a ${o.email}.`,
          "Si crees que no hemos atendido bien tu solicitud, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).",
        ],
      },
      {
        h: "7. Seguridad",
        p: [
          "Aplicamos medidas técnicas y organizativas para proteger tus datos: conexión cifrada (HTTPS), acceso restringido a la base de datos y proveedores con garantías de seguridad.",
        ],
      },
    ],
  },
  cookies: {
    title: "Política de cookies",
    metaDesc:
      "Qué cookies usa la web de Ideaholiks Studio, para qué sirven, cuánto duran y cómo aceptarlas, rechazarlas o cambiar tu elección en cualquier momento.",
    intro:
      "Una cookie es un pequeño archivo que la web guarda en tu navegador. Aquí te contamos cuáles usamos y cómo decidir sobre ellas.",
    sections: [
      {
        h: "1. Cookies que usamos",
        p: [
          "ih_consent · propia · técnica · 12 meses. Guarda si aceptas o rechazas las cookies opcionales. Es necesaria y no requiere consentimiento.",
          "Cookies de análisis: ahora mismo no hay ninguna activa. Si las incorporamos, solo se activarán si las aceptas en el banner, y las añadiremos a esta lista con su nombre, proveedor y duración.",
          "No usamos cookies de publicidad ni de seguimiento entre webs.",
        ],
      },
      {
        h: "2. Cómo aceptar, rechazar o cambiar tu elección",
        p: [
          "En tu primera visita verás un aviso con los botones Aceptar, Rechazar y Configurar, con la misma visibilidad. Puedes cambiar tu elección cuando quieras desde el enlace «Configurar cookies» del pie de página.",
          "También puedes borrar las cookies desde la configuración de tu navegador.",
        ],
      },
      {
        h: "3. Actualizaciones",
        p: ["Si cambian las cookies que usamos, actualizaremos esta política y te volveremos a pedir tu elección."],
      },
    ],
  },
};

const en: Record<"notice" | "privacy" | "cookies", LegalDoc> = {
  notice: {
    title: "Legal notice",
    metaDesc:
      "Legal notice for Ideaholiks Studio: website owner details, terms of use, intellectual property and applicable law.",
    intro: `Under Spanish Law 34/2002 on information society services and e-commerce (LSSI-CE), these are the details of the owner of ${o.domain}.`,
    sections: [
      {
        h: "1. Owner",
        p: [
          `Owner: ${o.name}. Trade name: ${o.brand}.`,
          `Tax ID: ${o.taxId}. Address: ${o.address}.`,
          `Email: ${o.email}.${o.registry ? " " + o.registry : ""}`,
        ],
      },
      {
        h: "2. Use of the website",
        p: [
          "By browsing this website you accept this legal notice. You agree to use it lawfully and not to harm the website, its systems or third parties.",
        ],
      },
      {
        h: "3. Intellectual and industrial property",
        p: [
          `The texts, photographs, logos, design and code of this website belong to ${o.brand} or their rightful owners. They may not be reproduced, distributed or transformed without express permission.`,
        ],
      },
      {
        h: "4. Liability",
        p: [
          "We take care to keep the information accurate and up to date, but we cannot guarantee it is error-free or that the website will always be available. We are not responsible for third-party websites linked from here.",
        ],
      },
      {
        h: "5. Governing law and jurisdiction",
        p: [
          "This legal notice is governed by Spanish law. Any dispute will be submitted to the competent courts under the law; if the user is a consumer, those of their place of residence.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy policy",
    metaDesc:
      "How Ideaholiks Studio handles your personal data: controller, purpose, legal basis, retention, recipients and your rights under the GDPR.",
    intro:
      "This policy explains what personal data we process, why, and what your rights are, under Regulation (EU) 2016/679 (GDPR) and Spanish Organic Law 3/2018 (LOPDGDD).",
    sections: [
      {
        h: "1. Data controller",
        p: [`${o.name} (${o.brand}), tax ID ${o.taxId}, address ${o.address}. Contact: ${o.email}.`],
      },
      {
        h: "2. What data we process and why",
        p: [
          "Contact form: name, email, the service you're interested in and your message. We use them only to reply and, if you ask, to prepare a proposal.",
          "Browsing: we store your cookie choice. We don't use analytics or advertising cookies unless you accept them.",
        ],
      },
      {
        h: "3. Legal basis",
        p: [
          "Your consent when you submit the form (Art. 6.1.a GDPR) and, if we end up working together, steps taken at your request before entering into a contract (Art. 6.1.b GDPR).",
        ],
      },
      {
        h: "4. How long we keep data",
        p: [
          "Contact messages are kept for up to 12 months after our last exchange, unless they become a business relationship. Then they are deleted.",
        ],
      },
      {
        h: "5. Recipients and providers",
        p: [
          "We don't share your data with third parties unless required by law. We use providers that process data on our behalf under a data processing agreement: Vercel Inc. (web hosting) and Supabase Inc. (database). This may involve international transfers covered by the European Commission's standard contractual clauses or the EU-US Data Privacy Framework.",
        ],
      },
      {
        h: "6. Your rights",
        p: [
          `You can request access, rectification, erasure, objection, restriction of processing and portability of your data, and withdraw your consent at any time, by writing to ${o.email}.`,
          "If you believe we haven't handled your request properly, you can file a complaint with the Spanish Data Protection Agency (www.aepd.es).",
        ],
      },
      {
        h: "7. Security",
        p: [
          "We apply technical and organisational measures to protect your data: encrypted connection (HTTPS), restricted database access and providers with security guarantees.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookie policy",
    metaDesc:
      "Which cookies the Ideaholiks Studio website uses, what they do, how long they last and how to accept, reject or change your choice at any time.",
    intro: "A cookie is a small file a website stores in your browser. Here's which ones we use and how to decide about them.",
    sections: [
      {
        h: "1. Cookies we use",
        p: [
          "ih_consent · first-party · technical · 12 months. Stores whether you accept or reject optional cookies. It is necessary and doesn't require consent.",
          "Analytics cookies: none are active right now. If we add them, they will only run if you accept them in the banner, and we'll list them here with their name, provider and duration.",
          "We don't use advertising or cross-site tracking cookies.",
        ],
      },
      {
        h: "2. How to accept, reject or change your choice",
        p: [
          "On your first visit you'll see a notice with Accept, Reject and Settings buttons, all equally visible. You can change your choice at any time from the “Cookie settings” link in the footer.",
          "You can also delete cookies from your browser settings.",
        ],
      },
      {
        h: "3. Updates",
        p: ["If the cookies we use change, we'll update this policy and ask for your choice again."],
      },
    ],
  },
};

export const legal: Record<Locale, typeof es> = { es, en };
