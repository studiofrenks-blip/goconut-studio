// QA de Ideaholiks Studio. Uso: BASE=http://localhost:3000 node qa/run-qa.mjs
// Falla (exit 1) si encuentra cualquier error. Los "avisos" no bloquean la
// dirección de prueba, pero sí el cambio de dominio (ver GO-LIVE abajo).
import { chromium, devices } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";

const BASE = (process.env.BASE || "http://localhost:3000").replace(/\/$/, "");
const GO_LIVE = process.env.GO_LIVE === "1";
const PAGES = {
  es: ["/es", "/es/nosotros", "/es/proyectos", "/es/blog", "/es/contacto", "/es/legal/aviso-legal", "/es/legal/privacidad", "/es/legal/cookies"],
  en: ["/en", "/en/about", "/en/work", "/en/blog", "/en/contact", "/en/legal/legal-notice", "/en/legal/privacy", "/en/legal/cookies"],
};
const ALL = [...PAGES.es, ...PAGES.en];

// Lo que NO puede volver a salir (errores de la web antigua + relleno de plantilla).
const BANNED = [
  "MailChimp", "Newslatter", "BecomeBrands", "Meat the team", "Meat", "yourdomain", "Lorem", "Kevin Lynch",
  "Category 1", "Environmental Policy", "Shopping Basket", "English language instruction", "Answer here",
  "+99 (0)", "+34-----", "undefined", "NaN", "[object Object]",
];
// Palabras españolas que suelen perder la tilde.
const NO_ACCENT = [
  "politica", "tecnologia", "diseno", "pagina", "informacion", "aqui", "tambien", "creacion", "produccion",
  "conversacion", "musica", "publico", "telefono", "electronico", "categoria", "proposito", "estrategico",
  "analisis", "ultima", "proximo", "proxima", "facil", "comunicacion", "direccion", "unico", "rapido",
  "dia", "dias", "ademas", "despues", "segun", "asi", "quien", "quienes", "que hacemos", "como trabajamos",
  "anos", "espana", "pequena", "companias", "camara", "imagenes", "graficos", "grafico", "basico", "practica",
];
const SHOULD_ACCENT_EXCEPTIONS = new Set(["que hacemos", "quien", "quienes", "dia", "dias"]); // revisadas abajo con contexto

const errors = [];
const warnings = [];
const err = (page, msg) => errors.push(`${page} · ${msg}`);
const warn = (page, msg) => warnings.push(`${page} · ${msg}`);

const browser = await chromium.launch();

async function checkPage(ctx, path, label) {
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
  page.on("pageerror", (e) => consoleErrors.push(String(e)));
  const res = await page.goto(BASE + path, { waitUntil: "load" });
  if (!res || res.status() !== 200) err(path, `${label}: HTTP ${res?.status()}`);

  // Bajar hasta el final para que se carguen imágenes y animaciones.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 40));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(300);

  const info = await page.evaluate(() => {
    const q = (s) => document.querySelector(s);
    const imgs = [...document.images].map((i) => ({ src: i.currentSrc || i.src, alt: i.getAttribute("alt"), ok: i.complete && i.naturalWidth > 0, hidden: !!i.closest("[aria-hidden=true]") }));
    const logo = q(".site-header .logo img");
    return {
      lang: document.documentElement.lang,
      title: document.title,
      desc: q('meta[name="description"]')?.content || "",
      canonical: q('link[rel="canonical"]')?.href || "",
      hreflang: [...document.querySelectorAll('link[rel="alternate"][hreflang]')].map((l) => l.hreflang),
      robots: q('meta[name="robots"]')?.content || "",
      ogImage: q('meta[property="og:image"]')?.content || "",
      h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()),
      overflow: document.documentElement.scrollWidth - window.innerWidth,
      logoH: logo ? logo.getBoundingClientRect().height : 0,
      imgs,
      links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
      text: document.body.innerText,
      jsonld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => {
        try { JSON.parse(s.textContent); return true; } catch { return false; }
      }),
      smallTargets: [...document.querySelectorAll("a, button, input, select, textarea")]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          const st = getComputedStyle(el);
          if (!r.width || st.visibility === "hidden" || el.closest("[hidden], .hp, .mobile-panel[data-open='0']")) return false;
          if (el.closest(".md, p, li, label") && el.tagName === "A") return false; // enlaces en texto corrido
          return r.height < 24 || r.width < 24;
        })
        .map((el) => (el.textContent || el.getAttribute("aria-label") || el.tagName).trim().slice(0, 30)),
    };
  });

  const expectLang = path.startsWith("/en") ? "en" : "es";
  if (info.lang !== expectLang) err(path, `lang="${info.lang}" (debería ser ${expectLang})`);
  if (info.h1.length !== 1) err(path, `${label}: ${info.h1.length} H1 (debe haber 1)`);
  if (info.overflow > 1) err(path, `${label}: scroll horizontal de ${info.overflow}px`);
  if (info.logoH < 60 || info.logoH > 80) err(path, `${label}: logo de ${info.logoH.toFixed(0)}px de alto (60–80)`);
  if (consoleErrors.length) err(path, `${label}: errores JS → ${consoleErrors.slice(0, 2).join(" | ")}`);
  for (const i of info.imgs) {
    if (!i.ok) err(path, `${label}: imagen rota ${i.src}`);
    if (!i.hidden && (!i.alt || i.alt.trim().length < 3)) err(path, `${label}: imagen sin texto alternativo ${i.src}`);
  }
  if (info.smallTargets.length) warn(path, `${label}: zonas táctiles < 24px: ${info.smallTargets.slice(0, 4).join(", ")}`);

  if (label === "móvil") {
    // SEO (una vez por página)
    if (info.title.length < 15 || info.title.length > 60) err(path, `título de ${info.title.length} caracteres: "${info.title}"`);
    if (info.desc.length < 110 || info.desc.length > 160) err(path, `meta descripción de ${info.desc.length} caracteres (110–160)`);
    if (!info.canonical) err(path, "sin canonical");
    for (const h of ["es", "en", "x-default"]) if (!info.hreflang.includes(h)) err(path, `falta hreflang ${h}`);
    if (!info.ogImage) err(path, "sin imagen para redes (og:image)");
    if (info.jsonld.some((ok) => !ok)) err(path, "JSON-LD inválido");
    const isEmptyBlog = path.endsWith("/blog") && info.text.includes(path.startsWith("/en") ? "coming very soon" : "Muy pronto");
    if (GO_LIVE && info.robots.includes("noindex") && !isEmptyBlog) err(path, "sigue con noindex (falta SITE_INDEXABLE=1)");

    // Textos
    for (const b of BANNED) {
      const re = new RegExp(`\\b${b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i");
      if (re.test(info.text)) err(path, `texto prohibido: "${b}"`);
    }
    if (info.text.includes("PENDIENTE")) (GO_LIVE ? err : warn)(path, "faltan datos del titular (PENDIENTE)");
    if (expectLang === "es") {
      const low = info.text.toLowerCase();
      for (const w of NO_ACCENT) {
        if (SHOULD_ACCENT_EXCEPTIONS.has(w)) continue;
        const re = new RegExp(`(^|[^a-záéíóúñü])${w}([^a-záéíóúñü]|$)`, "i");
        if (re.test(low)) err(path, `posible falta de tilde: "${w}"`);
      }
      if (/¿[^?]*$/m.test(info.text.split("\n").find((l) => l.includes("¿") && !l.includes("?")) || "")) err(path, "¿ sin cerrar");
      const qs = info.text.split("\n").filter((l) => l.trim().endsWith("?"));
      for (const q of qs) if (!q.includes("¿")) err(path, `pregunta sin ¿: "${q.trim().slice(0, 60)}"`);
    }
    if (/[a-záéíóú][A-ZÁÉÍÓÚ][a-z]/.test(info.text.replace(/AleRod|ACM|ARJ|CRM|SEO|JavaScript|WhatsApp|TikTok|YouTube|LinkedIn/g, ""))) {
      const m = info.text.match(/\S*[a-záéíóú][A-ZÁÉÍÓÚ][a-z]\S*/);
      warn(path, `posible palabra pegada: "${m?.[0]}"`);
    }
  }
  page.__links = info.links;
  await page.close();
  return info;
}

// 1) Páginas en móvil y en ordenador
const mobile = await browser.newContext({ ...devices["iPhone 13"] });
const desktop = await browser.newContext({ viewport: { width: 1366, height: 860 } });
const links = new Set();
for (const p of ALL) {
  const m = await checkPage(mobile, p, "móvil");
  await checkPage(desktop, p, "ordenador");
  m.links.forEach((l) => links.add(l));
}

// 2) Accesibilidad y contraste (axe-core, WCAG 2.1 AA) en móvil
for (const p of ALL) {
  const page = await mobile.newPage();
  await page.goto(BASE + p, { waitUntil: "load" });
  await page.evaluate(() => document.querySelectorAll(".reveal").forEach((e) => (e.dataset.in = "1")));
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);
  const r = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
  for (const v of r.violations) {
    const where = v.nodes.slice(0, 2).map((n) => n.target.join(" ")).join(" | ");
    (v.impact === "minor" ? warn : err)(p, `accesibilidad [${v.id}] ${v.help} → ${where}`);
  }
  await page.close();
}

// 3) Enlaces rotos (internos) y redirecciones de la web antigua
const internal = [...links].filter((l) => l.startsWith("/") && !l.startsWith("//")).map((l) => l.split("#")[0]).filter(Boolean);
for (const l of new Set(internal)) {
  const r = await fetch(BASE + l, { redirect: "follow" });
  if (r.status !== 200) err(l, `enlace roto (HTTP ${r.status})`);
}
const OLD = ["/about/", "/contact/", "/portfolio/", "/blog-2/", "/blog/", "/how-wordpress-revolutionized-content-sharing/", "/category/category-1/"];
for (const l of OLD) {
  const r = await fetch(BASE + l, { redirect: "follow" });
  if (r.status !== 200) err(l, `URL antigua no redirige bien (HTTP ${r.status})`);
}
for (const [path, accept, want] of [["/", "es-ES,es;q=0.9", "/es"], ["/", "en-US,en;q=0.9", "/en"]]) {
  const r = await fetch(BASE + path, { redirect: "manual", headers: { "accept-language": accept } });
  const loc = r.headers.get("location") || "";
  if (!loc.endsWith(want)) err(path, `idioma ${accept} → ${loc} (esperado ${want})`);
}
for (const f of ["/robots.txt", "/sitemap.xml", "/icon.svg", "/og/es.jpg", "/og/en.jpg"]) {
  const r = await fetch(BASE + f);
  if (r.status !== 200) err(f, `HTTP ${r.status}`);
}

// 4) Cookies: banner al entrar, Rechazar tan visible como Aceptar, y que se respete
for (const lang of ["es", "en"]) {
  const ctx = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await ctx.newPage();
  await page.goto(`${BASE}/${lang}`, { waitUntil: "load" });
  const banner = page.locator(".cookie");
  await banner.waitFor({ state: "visible", timeout: 8000 }).catch(() => err(`/${lang}`, "no aparece el banner de cookies"));
  const acc = page.locator('[data-cookie="accept"]');
  const rej = page.locator('[data-cookie="reject"]');
  const look = async (l) =>
    l.evaluate((e) => {
      const s = getComputedStyle(e);
      const r = e.getBoundingClientRect();
      return { w: Math.round(r.width), h: Math.round(r.height), bg: s.backgroundColor, c: s.color, fw: s.fontWeight, fs: s.fontSize };
    });
  const a = await look(acc);
  const r = await look(rej);
  if (JSON.stringify(a) !== JSON.stringify(r)) err(`/${lang}`, `Aceptar y Rechazar no son iguales: ${JSON.stringify(a)} vs ${JSON.stringify(r)}`);
  const cookiesBefore = (await ctx.cookies()).map((c) => c.name);
  if (cookiesBefore.length) err(`/${lang}`, `cookies antes de decidir: ${cookiesBefore.join(", ")}`);
  await rej.click();
  const after = await ctx.cookies();
  const consent = after.find((c) => c.name === "ih_consent");
  if (!consent || !decodeURIComponent(consent.value).includes('"analytics":false')) err(`/${lang}`, "Rechazar no guarda la elección");
  if (after.some((c) => c.name !== "ih_consent")) err(`/${lang}`, `cookies extra tras rechazar: ${after.map((c) => c.name)}`);
  await page.reload({ waitUntil: "load" });
  await page.waitForTimeout(1500);
  if (await banner.isVisible()) err(`/${lang}`, "el banner vuelve a salir tras decidir");
  await page.locator(".foot-links button").click();
  await page.waitForTimeout(300);
  if (!(await banner.isVisible())) err(`/${lang}`, "«Configurar cookies» del pie no reabre el banner");
  await ctx.close();
}

// 5) Formulario: valida campos vacíos sin enviar nada
{
  const page = await mobile.newPage();
  await page.goto(`${BASE}/es/contacto`, { waitUntil: "load" });
  await page.locator(".cookie [data-cookie=reject]").click().catch(() => {});
  await page.locator("form.form button[type=submit]").click();
  await page.waitForTimeout(1500);
  if (!(await page.locator(".status.bad").isVisible())) err("/es/contacto", "el formulario vacío no muestra error");
  await page.close();
}

await browser.close();

const summary = [
  `QA Ideaholiks Studio · ${new Date().toISOString()} · ${BASE}${GO_LIVE ? " · modo GO-LIVE" : ""}`,
  `Páginas: ${ALL.length} × (móvil + ordenador) · Enlaces internos revisados: ${new Set(internal).size}`,
  "",
  `ERRORES (${errors.length})`,
  ...errors.map((e) => "  ✗ " + e),
  "",
  `AVISOS (${warnings.length})`,
  ...[...new Set(warnings)].map((w) => "  · " + w),
].join("\n");
fs.mkdirSync("qa/report", { recursive: true });
fs.writeFileSync("qa/report/qa.txt", summary);
console.log(summary);
process.exit(errors.length ? 1 : 0);
