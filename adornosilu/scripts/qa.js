/* eslint-disable */
// QA de Adornos ILU — recorre todas las páginas en móvil y ordenador.
// Uso: node scripts/qa.js [URL]   (QA_BYPASS=... para la dirección de prueba de Vercel)
const { chromium, devices } = require("playwright");
const { AxeBuilder } = require("@axe-core/playwright");
const BASE = (process.argv[2] || process.env.QA_URL || "http://localhost:3100").replace(/\/$/, "");
const headers = process.env.QA_BYPASS ? { "x-vercel-protection-bypass": process.env.QA_BYPASS } : {};
const FORBIDDEN = [/lorem/i, /ipsum/i, /sample page/i, /call us anytime/i, /123 456 7890/, /\[PENDIENTE/i, /read more/i, /we design idea/i, /floor plan/i, /default sorting/i, /undefined/, /NaN/];
// palabras que en español siempre llevan tilde
const ACCENTS = ["catalogo", "navideno", "navidenos", "pagina", "informacion", "telefono", "politica", "electronico", "direccion", "pais", "tambien", "aqui", "dias", "anos", "diseno", "disenos", "numero", "ultima", "metalica", "plastica", "diametro", "montaje en todo el pais", "arbol"];
const problems = [];
const bad = (u, m) => problems.push(`${u} → ${m}`);

(async () => {
  const b = await chromium.launch();
  const ctxs = {
    movil: await b.newContext({ ...devices["iPhone 13"], extraHTTPHeaders: headers }),
    tablet: await b.newContext({ ...devices["iPad Mini"], extraHTTPHeaders: headers }),
    ordenador: await b.newContext({ viewport: { width: 1440, height: 900 }, extraHTTPHeaders: headers }),
  };
  // 1) Banner de cookies: sin cookies antes de decidir, Rechazar = Aceptar
  {
    const p = await ctxs.movil.newPage();
    await p.goto(BASE + "/", { waitUntil: "networkidle" });
    const before = (await ctxs.movil.cookies()).filter((c) => !c.name.startsWith("_vercel"));
    if (before.length) bad("/", "hay cookies antes de decidir: " + before.map((c) => c.name));
    const btns = await p.$$eval('[role=dialog] button', (bs) => bs.map((x) => { const r = x.getBoundingClientRect(), s = getComputedStyle(x); return { t: x.textContent.trim(), w: Math.round(r.width), h: Math.round(r.height), bg: s.backgroundColor, c: s.color, b: s.borderColor, f: s.fontSize }; }));
    const rej = btns.find((x) => /rechazar|reject/i.test(x.t)), acc = btns.find((x) => /aceptar|accept/i.test(x.t));
    if (!rej || !acc) bad("/", "banner sin Rechazar/Aceptar");
    else if (["w", "h", "bg", "c", "b", "f"].some((k) => rej[k] !== acc[k])) bad("/", "Rechazar y Aceptar no son idénticos " + JSON.stringify([rej, acc]));
    if (rej && rej.h < 44) bad("/", "botón de cookies < 44 px");
    await p.getByRole("button", { name: /rechazar/i }).click();
    await p.waitForTimeout(300);
    if (await p.$('[role=dialog]')) bad("/", "el banner no se cierra al rechazar");
    const footerBtn = await p.getByRole("button", { name: /configurar cookies/i }).count();
    if (!footerBtn) bad("/", "falta Configurar cookies en el pie");
    await p.close();
  }
  for (const c of Object.values(ctxs)) await c.addCookies([{ name: "ilu_consent", value: "%7B%22v%22%3A1%7D", url: BASE }]);

  // 2) Rastreo
  const seen = new Set(), queue = ["/", "/en"], external = new Set();
  while (queue.length) {
    const u = queue.shift();
    if (seen.has(u)) continue;
    seen.add(u);
    for (const [name, ctx] of Object.entries(ctxs)) {
      const p = await ctx.newPage();
      const errs = [];
      p.on("pageerror", (e) => errs.push(e.message));
      p.on("console", (m) => m.type() === "error" && errs.push(m.text()));
      const r = await p.goto(BASE + u, { waitUntil: "networkidle" });
      if (!r || r.status() !== 200) { bad(u, `HTTP ${r && r.status()} (${name})`); await p.close(); continue; }
      // bajar para que carguen imágenes perezosas y se activen animaciones
      await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } scrollTo(0, 0); });
      await p.waitForTimeout(400);
      const i = await p.evaluate(() => {
        const q = (s) => document.querySelector(s);
        const metaC = (s) => q(s)?.getAttribute("content") || "";
        return {
          hs: document.documentElement.scrollWidth > innerWidth + 1,
          h1: document.querySelectorAll("h1").length,
          logo: !!document.querySelector('header img[alt*="ILU"]'),
          title: document.title, desc: metaC('meta[name="description"]'),
          canon: q('link[rel=canonical]')?.href || "", hreflang: [...document.querySelectorAll('link[rel=alternate][hreflang]')].map((l) => l.hreflang),
          og: metaC('meta[property="og:image"]'), robots: metaC('meta[name="robots"]'),
          ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => { try { JSON.parse(s.textContent); return true; } catch { return false; } }),
          broken: [...document.images].filter((im) => im.complete && im.naturalWidth === 0).map((im) => im.currentSrc || im.src),
          noalt: [...document.images].filter((im) => !im.hasAttribute("alt")).length,
          links: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
          text: document.body.innerText, lang: document.documentElement.lang,
          small: [...document.querySelectorAll("a,button,summary,input,select,textarea")].filter((e) => { const r = e.getBoundingClientRect(); const inText = (e.tagName === "A" || e.tagName === "BUTTON") && e.closest("p,address,dd,article li"); const hidden = r.width <= 1 || e.classList.contains("sr-only") || getComputedStyle(e).opacity === "0" || e.closest("[data-hidden=\"1\"]"); return !hidden && r.height > 0 && r.height < (e.closest("footer li,header nav li") ? 24 : 44) && !inText; }).map((e) => (e.textContent || e.getAttribute("aria-label") || e.tagName).trim().slice(0, 30)),
        };
      });
      const tag = `(${name})`;
      if (i.hs) bad(u, "scroll horizontal " + tag);
      if (i.h1 !== 1) bad(u, `h1=${i.h1} ${tag}`);
      if (!i.logo) bad(u, "sin logo " + tag);
      if (i.broken.length) bad(u, "imágenes rotas " + i.broken.join(", "));
      if (i.noalt) bad(u, `${i.noalt} imágenes sin alt`);
      if (i.small.length && name === "movil") bad(u, "objetivos táctiles < 44 px: " + [...new Set(i.small)].join(" | "));
      if (errs.length) bad(u, "errores JS " + errs.slice(0, 3).join(" | "));
      if (name === "ordenador") {
        if (i.title.length > 60) bad(u, `título ${i.title.length} > 60: ${i.title}`);
        if (!/\/blog\/_/.test(u) && (i.desc.length < 110 || i.desc.length > 160)) bad(u, `descripción ${i.desc.length} (110–160)`);
        if (!i.canon) bad(u, "sin canonical");
        if (!i.hreflang.includes("es-VE") || !i.hreflang.includes("en") || !i.hreflang.includes("x-default")) bad(u, "hreflang incompleto " + i.hreflang);
        if (!i.og) bad(u, "sin og:image");
        if (!i.ld.length || i.ld.includes(false)) bad(u, "JSON-LD ausente o inválido");
        if (!process.env.QA_PROD && !/noindex/.test(i.robots)) bad(u, "la prueba debería llevar noindex");
        for (const f of FORBIDDEN) if (f.test(i.text)) bad(u, "texto prohibido: " + f);
        if (i.lang.startsWith("es")) for (const w of ACCENTS) if (new RegExp(`\\b${w}\\b`, "i").test(i.text)) bad(u, "posible tilde que falta: " + w);
        const axe = await new AxeBuilder({ page: p }).withTags(["wcag2a", "wcag2aa"]).analyze();
        for (const v of axe.violations) bad(u, `axe ${v.id} (${v.impact}): ${v.nodes.length} · ${v.nodes[0]?.target}`);
        for (const l of i.links) {
          if (l.startsWith("/") && !l.startsWith("//")) { const x = l.split("#")[0]; if (x && !seen.has(x)) queue.push(x); }
          else if (/^https?:/.test(l)) external.add(l);
        }
      }
      await p.close();
    }
  }
  // 3) Formulario de contacto
  {
    await ctxs.ordenador.route(/wa\.me/, (r) => r.fulfill({ body: "ok" }));
    const p = await ctxs.ordenador.newPage();
    await p.goto(BASE + "/contacto", { waitUntil: "networkidle" });
    const popup = p.waitForEvent("popup", { timeout: 5000 }).catch(() => null);
    await p.fill('input[name=nombre]', "Prueba QA"); await p.fill('textarea[name=mensaje]', "Hola");
    await p.click('form button[type=submit]');
    const w = await popup;
    if (!w || !/wa\.me|whatsapp/.test(w.url())) bad("/contacto", "el formulario no abre WhatsApp"); else await w.close();
    await p.close();
  }
  // 4) Redirecciones de WordPress
  const req = ctxs.ordenador.request;
  for (const [from, to] of [["/product/guirnaldas-flexible/", "/producto/guirnalda-flexible"], ["/product/pino-monterrey-pm/", "/producto/pino-monterrey-pm"], ["/productos/", "/catalogo"], ["/product-category/pinos-navidenos/", "/catalogo/pinos"], ["/tienda", "/catalogo"], ["/home/", "/"]]) {
    const r = await req.get(BASE + from).catch((e) => null);
    if (!r || r.status() !== 200 || !r.url().endsWith(to)) bad(from, "redirección fallida → " + (r && r.url()));
  }
  // 5) Enlaces externos (sin WhatsApp/mailto: no se pueden comprobar desde aquí)
  console.log(`Páginas: ${seen.size} × 3 dispositivos · externos: ${external.size}`);
  console.log(problems.length ? "PROBLEMAS:\n" + [...new Set(problems)].join("\n") : "QA OK: 0 problemas");
  await b.close();
  process.exit(problems.length ? 1 : 0);
})();
