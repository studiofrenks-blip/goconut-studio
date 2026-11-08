// QA de la web. Uso: BASE=http://localhost:3100 node scripts/qa.mjs
// Revisa: estado HTTP, enlaces internos rotos, imágenes, SEO (title, description,
// canonical, h1, JSON-LD, noindex en pruebas), móvil (desbordes y tamaño de toque),
// contraste WCAG AA, acentos, cookies (nada antes de consentir, Rechazar = Aceptar)
// y peso de cada página. Sale con código 1 si hay errores.
import { createRequire } from "module";
import { execSync } from "child_process";
import fs from "fs";
const require = createRequire(import.meta.url);
let pw;
try { pw = require("playwright"); } catch { pw = require(execSync("npm root -g").toString().trim() + "/playwright"); }
const { chromium, devices } = pw;

const BASE = (process.env.BASE || "http://localhost:3100").replace(/\/$/, "");
const errors = [], warns = [], info = [];
const E = (p, m) => errors.push(`${p} → ${m}`);
const W = (p, m) => warns.push(`${p} → ${m}`);

// ---------- 1. Páginas desde el sitemap ----------
const sm = await (await fetch(BASE + "/sitemap.xml")).text();
const pages = [...sm.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
info.push(`Páginas en el sitemap: ${pages.length}`);

// ---------- 2. Acentos: palabras que casi siempre van con tilde ----------
const ACCENTS = {
  diseno: "diseño", disenos: "diseños", disenamos: "diseñamos", espana: "España", pagina: "página", paginas: "páginas",
  tambien: "también", aqui: "aquí", ademas: "además", despues: "después", telefono: "teléfono", politica: "política",
  tecnologia: "tecnología", metodologia: "metodología", analisis: "análisis", publico: "público", codigo: "código",
  movil: "móvil", exito: "éxito", area: "área", dias: "días", traves: "través", rapido: "rápido", rapidas: "rápidas",
  estetica: "estética", tecnica: "técnica", graficas: "gráficas", grafico: "gráfico", unico: "único", ultima: "última",
  numero: "número", basicos: "básicos", automaticas: "automáticas", estrategico: "estratégico", electronico: "electrónico",
  energia: "energía", categorias: "categorías", articulos: "artículos",
};
const accentIssues = (text) => {
  const out = new Set();
  for (const w of text.toLowerCase().match(/[a-záéíóúüñ]+/g) || []) {
    if (/^[a-z]+cion$/.test(w)) out.add(`${w} → ${w.replace(/cion$/, "ción")}`);
    if (ACCENTS[w]) out.add(`${w} → ${ACCENTS[w]}`);
  }
  return [...out];
};

// ---------- 3. Contraste ----------
const contrastScript = () => {
  const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r, g, b, a }; };
  const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  const bgOf = (el) => {
    let layers = [];
    for (let e = el; e; e = e.parentElement) {
      const cs = getComputedStyle(e);
      if (cs.backgroundImage && cs.backgroundImage !== "none" && !cs.backgroundImage.includes("radial")) return null; // degradado/imagen: no medible
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0) { layers.push(c); if (c.a >= 1) break; }
    }
    let base = { r: 5, g: 6, b: 10 };
    for (const l of layers.reverse()) base = { r: l.r * l.a + base.r * (1 - l.a), g: l.g * l.a + base.g * (1 - l.a), b: l.b * l.a + base.b * (1 - l.a) };
    return base;
  };
  const bad = [];
  const seen = new Set();
  document.querySelectorAll("body *").forEach((el) => {
    const own = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!own) return;
    const cs = getComputedStyle(el);
    if (cs.visibility === "hidden" || cs.display === "none" || +cs.opacity === 0) return;
    if (el.closest("[aria-hidden=true]")) return;
    if (cs.webkitTextFillColor === "rgba(0, 0, 0, 0)" || cs.color === "rgba(0, 0, 0, 0)") return; // texto con degradado / contorno (decorativo)
    const fg = parse(cs.color); const bg = bgOf(el);
    if (!fg || !bg) return;
    const L1 = lum(fg), L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const size = parseFloat(cs.fontSize), bold = +cs.fontWeight >= 700;
    const need = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5;
    const key = el.tagName + el.className + ratio.toFixed(2);
    if (ratio < need && !seen.has(key)) { seen.add(key); bad.push(`"${el.textContent.trim().slice(0, 40)}" ${ratio.toFixed(2)}:1 (mín. ${need})`); }
  });
  return bad;
};

const browser = await chromium.launch();
const linkSet = new Set();

for (const [label, opts] of [["móvil", devices["iPhone 13"]], ["tablet", devices["iPad Mini"]], ["tablet horizontal", devices["iPad Mini landscape"]], ["escritorio", { viewport: { width: 1440, height: 900 } }]]) {
  const ctx = await browser.newContext({ ...opts, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  const consoleErrors = [];
  page.on("pageerror", (e) => consoleErrors.push(e.message));
  page.on("console", (m) => m.type() === "error" && consoleErrors.push(m.text()));
  for (const p of pages) {
    const bytes = { total: 0 };
    const onResp = async (r) => { try { const l = +(r.headers()["content-length"] || 0) || (await r.body()).length; bytes.total += l; } catch {} };
    page.on("response", onResp);
    const res = await page.goto(BASE + p, { waitUntil: "networkidle" });
    page.off("response", onResp);
    if (!res || res.status() !== 200) { E(p, `HTTP ${res?.status()}`); continue; }
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo({ top: y, behavior: "instant" }); await new Promise((r) => setTimeout(r, 30)); } });

    const d = await page.evaluate(() => {
      const W = document.documentElement.clientWidth;
      const meta = (n) => document.querySelector(`meta[name="${n}"]`)?.getAttribute("content") || null;
      const small = [];
      document.querySelectorAll("a, button, input, summary, select, textarea").forEach((el) => {
        const r = el.getBoundingClientRect(); const cs = getComputedStyle(el);
        if (!r.width || cs.visibility === "hidden" || el.closest("[inert],[aria-hidden=true]") || el.closest(".hp")) return;
        const inline = cs.display === "inline" && el.closest("p, li, td, label, span.muted, small, .lightbox__cap");
        if (!inline && (r.height < 24 || r.width < 24) && el.type !== "checkbox") small.push(`${el.tagName} "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30)}" ${Math.round(r.width)}×${Math.round(r.height)}`);
      });
      return {
        title: document.title, desc: meta("description"), robots: meta("robots"),
        canonical: document.querySelector('link[rel="canonical"]')?.href || null,
        lang: document.documentElement.lang,
        h1: [...document.querySelectorAll("h1")].map((h) => h.textContent.trim()),
        overflow: document.documentElement.scrollWidth > W + 1 ? document.documentElement.scrollWidth : 0,
        imgsNoAlt: [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).map((i) => i.src),
        brokenImgs: [...document.querySelectorAll("img")].filter((i) => i.complete && i.naturalWidth === 0 && !i.closest('[style*="display: none"]') && getComputedStyle(i).display !== "none").map((i) => i.currentSrc || i.src),
        links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
        ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { return JSON.parse(s.textContent)["@type"]; } catch { return "INVALID"; } }),
        text: document.querySelector("main")?.innerText || "",
        headings: [...document.querySelectorAll("main h1, main h2, main h3, main h4")].map((h) => +h.tagName[1]),
        small,
        og: !!document.querySelector('meta[property="og:image"]'),
      };
    });

    if (label === "móvil") {
      if (!d.title || d.title.length > 60) E(p, `title de ${d.title.length} caracteres (máx. 60): "${d.title}"`);
      if (!d.desc) E(p, "sin meta description");
      else if (d.desc.length < 110 || d.desc.length > 160) E(p, `description de ${d.desc.length} caracteres (110–160)`);
      if (!d.canonical) E(p, "sin canonical");
      if (d.lang !== "es") E(p, `lang="${d.lang}"`);
      if (d.h1.length !== 1) E(p, `${d.h1.length} h1 (debe haber 1)`);
      if (!d.og) E(p, "sin og:image");
      if (d.ld.includes("INVALID")) E(p, "JSON-LD inválido");
      if (!d.ld.includes("BreadcrumbList") && p !== "/") W(p, "sin migas de pan en JSON-LD");
      if (process.env.EXPECT_PROD !== "1" && !(d.robots || "").includes("noindex")) E(p, "la web de pruebas no tiene noindex");
      d.imgsNoAlt.forEach((s) => E(p, `imagen sin alt: ${s}`));
      for (let i = 1; i < d.headings.length; i++) if (d.headings[i] - d.headings[i - 1] > 1) { W(p, `salto de encabezado h${d.headings[i - 1]}→h${d.headings[i]}`); break; }
      accentIssues(d.text).forEach((a) => E(p, `posible falta de tilde: ${a}`));
      if (d.text.includes("[Pendiente")) (process.env.EXPECT_PROD === "1" ? E : W)(p, "faltan datos legales del titular ([Pendiente: …] en lib/legal.ts)");
      if (bytes.total > 2.5e6) W(p, `pesa ${(bytes.total / 1e6).toFixed(2)} MB`);
      info.push(`${p}: ${(bytes.total / 1024).toFixed(0)} KB transferidos`);
      d.links.forEach((l) => linkSet.add(JSON.stringify([p, l])));
    }
    if (d.overflow) E(p, `${label}: desborde horizontal (${d.overflow}px)`);
    d.brokenImgs.forEach((s) => E(p, `${label}: imagen rota ${s}`));
    d.small.forEach((s) => W(p, `${label}: objetivo táctil pequeño ${s}`));
    // axe WCAG AA
    await page.addScriptTag({ path: "node_modules/axe-core/axe.min.js" });
    const ax = await page.evaluate(async () => (await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa"], resultTypes: ["violations"] })).violations.map((v) => `${v.id} (${v.nodes.length}): ${v.nodes[0]?.target?.join(" ")}`));
    ax.forEach((v) => E(p, `${label}: axe ${v}`));
    // logo y textos de plantilla prohibidos
    const tpl = await page.evaluate(() => ({ logo: !!document.querySelector(".hdr__logo img"), txt: document.body.innerText }));
    if (!tpl.logo) E(p, "sin logo en la cabecera");
    for (const t of ["Lorem ipsum", "Steve Bullack", "Fortune 500", "Hannah Montana", "Read All Posts", "Latest Posts", "Best Team Ever", "youremail@", "+1 234"]) if (tpl.txt.includes(t)) E(p, `${label}: texto de plantilla «${t}»`);
    const bad = await page.evaluate(contrastScript);
    bad.forEach((b) => E(p, `${label}: contraste insuficiente ${b}`));
  }
  consoleErrors.forEach((c) => E("consola", `${label}: ${c}`));
  await ctx.close();
}

// ---------- 4. Enlaces ----------
const checked = new Map();
for (const s of linkSet) {
  const [from, href] = JSON.parse(s);
  if (/^(mailto:|tel:|#)/.test(href)) continue;
  const u = new URL(href, BASE + from);
  if (u.origin !== new URL(BASE).origin) { info.push(`Enlace externo (no verificado desde aquí): ${u.href}`); continue; }
  const key = u.pathname;
  if (!checked.has(key)) { const r = await fetch(BASE + key, { redirect: "manual" }); checked.set(key, r.status); }
  const st = checked.get(key);
  if (st >= 400) E(from, `enlace roto ${href} (${st})`);
  else if (st >= 300) W(from, `enlace que redirige ${href} (${st})`);
}
// Redirecciones de las URL antiguas
for (const [old, to] of [["/about/", "/nosotros/"], ["/likes-no-pagan-las-cuentas/", "/blog/likes-no-pagan-las-cuentas/"], ["/portfolio/avignon-quartet/", "/servicios/"], ["/services/", "/servicios/"]]) {
  const r = await fetch(BASE + old, { redirect: "manual" });
  const loc = r.headers.get("location") || "";
  if (r.status !== 308 && r.status !== 301) E(old, `la URL antigua no redirige (HTTP ${r.status})`);
  else if (!loc.endsWith(to)) E(old, `redirige a ${loc}, se esperaba ${to}`);
}
for (const p of pages) { const r = await fetch(BASE + p); if (!r.ok) E(p, `HTTP ${r.status}`); }
const robots = await (await fetch(BASE + "/robots.txt")).text();
if (process.env.EXPECT_PROD !== "1" && !/Disallow: \/\s*$/m.test(robots)) E("/robots.txt", "la web de pruebas debería bloquear a los buscadores");
const nf = await fetch(BASE + "/no-existe-esta-pagina/");
if (nf.status !== 404) E("/no-existe-esta-pagina/", `debería dar 404 y da ${nf.status}`);

// ---------- 5. Cookies ----------
{
  const ctx = await browser.newContext({ ...devices["iPhone 13"] });
  const page = await ctx.newPage();
  const thirdParty = new Set();
  page.on("request", (r) => { const u = new URL(r.url()); if (u.origin !== new URL(BASE).origin && !u.protocol.startsWith("data")) thirdParty.add(u.host); });
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  const ck = await ctx.cookies();
  if (ck.length) E("cookies", `hay cookies antes de consentir: ${ck.map((c) => c.name).join(", ")}`);
  if (thirdParty.size) E("cookies", `peticiones a terceros antes de consentir: ${[...thirdParty].join(", ")}`);
  const banner = page.locator(".ck");
  if (!(await banner.isVisible())) E("cookies", "el banner no aparece en la primera visita");
  const btn = async (name) => {
    const b = page.getByRole("button", { name });
    const box = await b.boundingBox();
    const st = await b.evaluate((el) => { const c = getComputedStyle(el); return [c.backgroundColor, c.color, c.fontSize, c.fontWeight, c.borderColor].join("|"); });
    return { box, st };
  };
  const rej = await btn("Rechazar todo"), acc = await btn("Aceptar todo");
  if (!rej.box || !acc.box) E("cookies", "falta el botón Rechazar o Aceptar");
  else {
    if (Math.abs(rej.box.width - acc.box.width) > 2 || Math.abs(rej.box.height - acc.box.height) > 2) E("cookies", `Rechazar (${rej.box.width}×${rej.box.height}) y Aceptar (${acc.box.width}×${acc.box.height}) no miden igual`);
    if (rej.st !== acc.st) E("cookies", `Rechazar y Aceptar no tienen el mismo estilo: ${rej.st} vs ${acc.st}`);
    if (Math.abs(rej.box.y - acc.box.y) > 2) W("cookies", "Rechazar y Aceptar no están a la misma altura");
  }
  await page.getByRole("button", { name: "Rechazar todo" }).click();
  if (await banner.isVisible()) E("cookies", "el banner no se cierra al rechazar");
  const stored = await page.evaluate(() => localStorage.getItem("rv-consent"));
  if (!stored || JSON.parse(stored).analytics !== false) E("cookies", "el rechazo no se guarda correctamente");
  await page.reload({ waitUntil: "networkidle" });
  if (await banner.isVisible()) E("cookies", "el banner vuelve a salir tras rechazar");
  await page.goto(BASE + "/politica-de-cookies/");
  await page.getByRole("button", { name: "Configurar cookies" }).first().click();
  if (!(await banner.isVisible())) E("cookies", "el enlace «Configurar cookies» del pie no reabre el banner");
  if ((await ctx.cookies()).length) E("cookies", "hay cookies tras rechazar");
  info.push("Cookies: 0 cookies y 0 peticiones a terceros antes de consentir; Rechazar y Aceptar idénticos.");
  await ctx.close();
}

// ---------- 6. Formulario ----------
{
  const r = await fetch(BASE + "/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "", email: "x", message: "" }) });
  if (r.status !== 400) E("/api/contact", `datos inválidos deberían dar 400 y dan ${r.status}`);
  const r2 = await fetch(BASE + "/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "QA", email: "qa@example.com", message: "Mensaje de prueba de QA", privacy: false }) });
  if (r2.status !== 400) E("/api/contact", "sin aceptar la privacidad debería rechazarse");
}

await browser.close();

const report = [
  `# Informe de QA — ${new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}`,
  `Base: ${BASE}`, "",
  `## Errores (${errors.length})`, ...(errors.length ? errors.map((e) => `- ❌ ${e}`) : ["- Ninguno ✅"]), "",
  `## Avisos (${warns.length})`, ...(warns.length ? warns.map((w) => `- ⚠️ ${w}`) : ["- Ninguno ✅"]), "",
  `## Información`, ...info.map((i) => `- ${i}`),
].join("\n");
fs.mkdirSync("qa-report", { recursive: true });
fs.writeFileSync("qa-report/qa.md", report);
console.log(report);
process.exit(errors.length ? 1 : 0);
