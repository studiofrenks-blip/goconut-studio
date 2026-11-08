import { createRequire } from "module";
const require = createRequire(import.meta.url);
let pw; try { pw = require("playwright"); } catch { pw = require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright"); }
const { chromium, devices } = pw;
const base = process.env.BASE || "http://localhost:3100";
const out = process.argv[2];
const pages = (process.argv[3] || "/").split(",");
const b = await chromium.launch();
for (const [name, ctxOpts] of [["desk", { viewport: { width: 1440, height: 900 } }], ["tab", { ...devices["iPad Mini"] }], ["mob", { ...devices["iPhone 13"] }]]) {
  const ctx = await b.newContext({ ...ctxOpts, reducedMotion: "no-preference" });
  const p = await ctx.newPage();
  for (const path of pages) {
    await p.goto(base + path, { waitUntil: "networkidle" });
    // desplazar para disparar las animaciones
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo({top: y, behavior: "instant"}); await new Promise(r => setTimeout(r, 60)); } window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 1300)); });
    const f = `${out}/${name}${path.replace(/\//g, "_") || "_"}.png`;
    await p.screenshot({ path: f, fullPage: true });
    console.log(f);
  }
  await ctx.close();
}
await b.close();
