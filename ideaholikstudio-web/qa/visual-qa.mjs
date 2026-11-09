// QA visual: detecta textos que se pisan, textos recortados y cosas fuera de
// pantalla, en varios tamaños y en varios puntos del scroll.
// Uso: BASE=http://localhost:3000 node qa/visual-qa.mjs
import { chromium, devices } from "playwright";
import fs from "node:fs";

const BASE = (process.env.BASE || "http://localhost:3000").replace(/\/$/, "");
const PAGES = [
  "/es", "/es/nosotros", "/es/proyectos", "/es/blog", "/es/contacto", "/es/legal/aviso-legal",
  "/en", "/en/about", "/en/work", "/en/blog", "/en/contact", "/en/legal/privacy",
];
const VIEWPORTS = [
  ["360", { viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }],
  ["iphone", devices["iPhone 13"]],
  ["tablet", { viewport: { width: 768, height: 1024 } }],
  ["laptop", { viewport: { width: 1024, height: 768 } }],
  ["desktop", { viewport: { width: 1440, height: 900 } }],
  ["landscape", { viewport: { width: 844, height: 390 }, isMobile: true, hasTouch: true }],
];

const issues = new Map();
const add = (k, v) => issues.set(k, v);

function probe() {
  // Elementos de texto "hoja" visibles en pantalla.
  const SEL = "h1,h2,h3,p,a,button,summary,label,li,span.sticker,span.lt-node,.kicker,.tag,.stack-num,.work-num";
  const vis = (el) => {
    const st = getComputedStyle(el);
    if (st.visibility === "hidden" || st.display === "none" || parseFloat(st.opacity) < 0.6) return false;
    let a = el;
    while (a) {
      const s = getComputedStyle(a);
      if (parseFloat(s.opacity) < 0.6 || s.visibility === "hidden") return false;
      if (a.matches?.("[aria-hidden=true], .sr-only, .hp, .marquee, .tapes, .watermark, .float-cta")) return false;
      a = a.parentElement;
    }
    return true;
  };
  const out = [];
  const vw = innerWidth, vh = innerHeight;
  const els = [...document.querySelectorAll(SEL)].filter((e) => e.innerText?.trim() && vis(e));
  const boxes = [];
  // Para saber qué texto se ve de verdad, todo debe poder "tocarse".
  const tmp = document.createElement("style");
  tmp.textContent = "*{pointer-events:auto!important}";
  document.head.appendChild(tmp);
  for (const el of els) {
    // Rectángulos reales del texto propio (sin texto oculto para lectores de pantalla).
    const rects = [];
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      if (!n.data.trim() || n.parentElement.closest(".sr-only, [aria-hidden=true]")) continue;
      if (!vis(n.parentElement)) continue; // texto desvaneciéndose (opacidad baja): no se ve
      const range = document.createRange();
      range.selectNodeContents(n);
      for (const r of range.getClientRects()) if (r.width > 2 && r.height > 2) rects.push(r);
    }
    for (const r of rects) {
      if (r.bottom < 76 || r.top > vh) continue; // fuera de pantalla o bajo la cabecera
      // ¿Se ve este texto, o lo tapa otra cosa opaca (p. ej. la tarjeta de encima)?
      const cx = Math.min(vw - 1, Math.max(0, r.left + r.width / 2)), cy = r.top + r.height / 2;
      // Tapado = hay encima algo con fondo opaco (tarjeta, cabecera…). Texto sobre texto NO cuenta como tapado.
      let covered = false;
      for (const e of document.elementsFromPoint(cx, cy)) {
        if (e === el || el.contains(e) || e.contains(el)) break;
        const cs = getComputedStyle(e);
        const bg = cs.backgroundColor;
        const opaque = (bg && bg !== "transparent" && !/rgba\(.*,\s*0(\.0+)?\)$/.test(bg) && !/rgba\(.*,\s*0\.[0-4]\d*\)$/.test(bg)) || (cs.backgroundImage !== "none" && !e.matches(".grain, .sh-haze, .sh-dark"));
        if (opaque) { covered = true; break; }
      }
      if (covered) continue;
      boxes.push({ el, r });
      if (r.left < -1 || r.right > vw + 1) out.push(["fuera-de-pantalla", el, r]);
    }
    // Recortado: el contenido es más ancho/alto que su caja con overflow oculto.
    const st = getComputedStyle(el);
    if ((st.overflow === "hidden" || st.overflowX === "hidden") && (el.scrollWidth > el.clientWidth + 2)) out.push(["recortado", el, el.getBoundingClientRect()]);
  }
  // Textos que se pisan (de elementos distintos que no se contienen).
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const A = boxes[i], B = boxes[j];
      if (A.el === B.el || A.el.contains(B.el) || B.el.contains(A.el)) continue;
      const ix = Math.min(A.r.right, B.r.right) - Math.max(A.r.left, B.r.left);
      const iy = Math.min(A.r.bottom, B.r.bottom) - Math.max(A.r.top, B.r.top);
      if (ix > 6 && iy > 6) {
        // ¿Está uno tapado por un fondo opaco encima (p. ej. tarjetas apiladas)? Mira qué hay en el punto central.
        const cx = Math.max(A.r.left, B.r.left) + ix / 2, cy = Math.max(A.r.top, B.r.top) + iy / 2;
        const top = document.elementFromPoint(cx, cy);
        out.push(["se-pisan", A.el, A.r, B.el]);
      }
    }
  }
  tmp.remove();
  const h1 = document.querySelector("h1:not(.sr-only)");
  const label = (e) => (e.innerText || "").trim().replace(/\s+/g, " ").slice(0, 50);
  return out.map(([t, el, r, el2]) => ({
    t,
    a: `${el.tagName.toLowerCase()}.${[...el.classList].join(".")} «${label(el)}»`,
    b: el2 ? `${el2.tagName.toLowerCase()}.${[...el2.classList].join(".")} «${label(el2)}»` : "",
  }));
}

// Guardia: si los estilos no cargan, todo lo demás no vale (pasó una vez).
{
  const html = await (await fetch(BASE + "/es")).text();
  const css = [...html.matchAll(/href="([^"]+\.css)"/g)].map((m) => m[1]);
  if (!css.length) { console.log("ERROR: la página no enlaza ningún CSS"); process.exit(3); }
  for (const c of css) {
    const r = await fetch(new URL(c, BASE));
    if (r.status !== 200) { console.log(`ERROR: el CSS ${c} da HTTP ${r.status}: la web se ve sin estilos`); process.exit(3); }
  }
}
const browser = await chromium.launch();
// Autoprueba: provoca un solape y exige que se detecte (si no, el detector no vale).
{
  const pg = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await pg.goto(BASE + "/es/contacto", { waitUntil: "load" });
  await pg.waitForTimeout(1200);
  await pg.evaluate(() => (document.querySelector(".page-hero .lead").style.marginTop = "-90px"));
  const f = await pg.evaluate(probe);
  if (!f.some((x) => x.t === "se-pisan")) {
    console.log("AUTOPRUEBA FALLIDA: el detector no ve un solape provocado", JSON.stringify(f));
    process.exit(2);
  }
  await pg.close();
}
for (const [vname, opts] of VIEWPORTS) {
  const ctx = await browser.newContext(opts);
  await ctx.addCookies([{ name: "ih_consent", value: encodeURIComponent('{"v":1,"analytics":false}'), url: BASE }]);
  const page = await ctx.newPage();
  for (const path of PAGES) {
    await page.goto(BASE + path, { waitUntil: "load" });
    await page.waitForTimeout(1300);
    const H = await page.evaluate(() => document.documentElement.scrollHeight);
    const vh = page.viewportSize().height;
    for (let y = 0; y < H; y += Math.round(vh * 0.5)) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y);
      await page.waitForTimeout(450);
      const found = await page.evaluate(probe);
      for (const f of found) add(`${f.t}|${path}|${vname}|${f.a}|${f.b}`, { ...f, path, vname, y });
    }
  }
  await ctx.close();
}
await browser.close();
const list = [...issues.values()];
const lines = list.map((f) => `${f.t.padEnd(18)} ${f.path} [${f.vname} @${f.y}] ${f.a}${f.b ? "  ⟷  " + f.b : ""}`);
fs.mkdirSync("qa/report", { recursive: true });
fs.writeFileSync("qa/report/visual.txt", lines.join("\n"));
console.log(`QA visual: ${list.length} problemas\n` + lines.join("\n"));
process.exit(list.length ? 1 : 0);
