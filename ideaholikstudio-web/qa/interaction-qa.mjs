// QA de interacción: cabecera a 320/360, cookies frente al botón principal,
// móvil en horizontal, formulario que conserva lo escrito y órbita.
// Uso: BASE=http://localhost:3000 node qa/interaction-qa.mjs
import { chromium, devices } from "playwright";
const B = (process.env.BASE || "http://localhost:3000").replace(/\/$/, "");
const b = await chromium.launch();
const out = [];
// 1) cabecera
for (const w of [320, 360]) for (const l of ["es", "en"]) {
  const c = await b.newContext({ viewport: { width: w, height: 740 }, isMobile: true, hasTouch: true });
  await c.addCookies([{ name: "ih_consent", value: encodeURIComponent('{"v":1,"analytics":false}'), url: B }]);
  const p = await c.newPage(); await p.goto(`${B}/${l}`); await p.waitForTimeout(500);
  const r = await p.evaluate(() => { const m = document.querySelector(".menu-btn").getBoundingClientRect(); const c = document.querySelector(".header-cta").getBoundingClientRect(); return { menu: [Math.round(m.width), Math.round(m.right)], ctaH: Math.round(c.height), vw: innerWidth }; });
  out.push(`header ${w} ${l}: menu ${r.menu[0]}px ancho, borde ${r.menu[1]}/${r.vw}; cta alto ${r.ctaH} ${r.menu[0] >= 44 && r.menu[1] <= r.vw && r.ctaH <= 46 ? "OK" : "FALLA"}`);
  await c.close();
}
// 2) cookies vs botón principal
for (const [n, o] of [["360", { viewport: { width: 360, height: 740 }, isMobile: true }], ["iphone", devices["iPhone 13"]], ["768", { viewport: { width: 768, height: 1024 } }], ["land", { viewport: { width: 844, height: 390 }, isMobile: true }]]) {
  const c = await b.newContext(o); const p = await c.newPage(); await p.goto(`${B}/es`); await p.waitForTimeout(1500);
  const r = await p.evaluate(() => { const k = document.querySelector(".cookie").getBoundingClientRect(); const a = document.querySelector(".sh-foot .btn-lime").getBoundingClientRect(); return { k: Math.round(k.top), a: [Math.round(a.top), Math.round(a.bottom)], vh: innerHeight }; });
  out.push(`cookies ${n}: botón ${r.a[0]}-${r.a[1]}, aviso desde ${r.k} ${r.a[1] <= r.k ? "OK" : "FALLA"}`);
  await c.close();
}
// 9) horizontal sin aviso: botón visible
{ const c = await b.newContext({ viewport: { width: 844, height: 390 }, isMobile: true }); await c.addCookies([{ name: "ih_consent", value: encodeURIComponent('{"v":1,"analytics":false}'), url: B }]);
  const p = await c.newPage(); await p.goto(`${B}/es`); await p.waitForTimeout(1500);
  const r = await p.evaluate(() => Math.round(document.querySelector(".sh-foot .btn-lime").getBoundingClientRect().bottom));
  out.push(`horizontal: botón termina en ${r}/390 ${r <= 390 ? "OK" : "FALLA"}`); await c.close(); }
// 6) formulario conserva todo
{ const c = await b.newContext({ viewport: { width: 390, height: 844 } }); await c.addCookies([{ name: "ih_consent", value: encodeURIComponent('{"v":1,"analytics":false}'), url: B }]);
  const p = await c.newPage(); await p.goto(`${B}/es/contacto?s=3`); await p.waitForTimeout(800);
  const pre = await p.inputValue("#f-subject");
  await p.fill("#f-name", "Ana"); await p.fill("#f-email", "ana@example.com"); await p.fill("#f-msg", "Hola, quiero una web nueva para mi marca."); await p.check("input[name=consent]");
  await p.click("form.form button[type=submit]"); await p.waitForTimeout(2500);
  const v = await p.evaluate(() => ({ n: document.querySelector("#f-name")?.value, s: document.querySelector("#f-subject")?.value, m: document.querySelector("#f-msg")?.value, c: document.querySelector("input[name=consent]")?.checked, st: document.querySelector(".status")?.textContent }));
  out.push(`form: preelegido «${pre}»; tras enviar → nombre ${v.n}, servicio «${v.s}», consentimiento ${v.c}, aviso «${v.st}» ${v.n === "Ana" && v.s === pre && v.c ? "OK" : "FALLA"}`); await c.close(); }
// 8) órbita
{ const c = await b.newContext({ viewport: { width: 390, height: 844 } }); await c.addCookies([{ name: "ih_consent", value: encodeURIComponent('{"v":1,"analytics":false}'), url: B }]);
  const p = await c.newPage(); await p.goto(`${B}/es`); await p.locator(".orbit").scrollIntoViewIfNeeded(); await p.waitForTimeout(4000);
  const pressed = await p.locator('.orbit-node[aria-pressed="true"]').first();
  const txt = await pressed.textContent(); await pressed.click(); await p.waitForTimeout(400);
  const cap = (await p.textContent(".orbit-caption")).trim();
  out.push(`órbita: toco «${txt}» que ya se mostraba → texto «${cap.slice(0, 40)}» ${cap.length > 5 ? "OK" : "FALLA"}`); await c.close(); }
console.log(out.join("\n"));
const bad = out.filter((l) => l.endsWith("FALLA"));
if (bad.length) process.exitCode = 1;
await b.close();
