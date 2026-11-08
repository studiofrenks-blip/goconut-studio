// Conversor Markdown → HTML mínimo y seguro (escapa todo el HTML de entrada).
// Suficiente para los artículos del blog: ## títulos, párrafos, listas, citas,
// **negrita**, *cursiva*, [enlaces](url) y separadores ---.
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const safeUrl = (u: string) => (/^(https?:\/\/|\/|#|mailto:|tel:)/i.test(u) ? u : "#");

function inline(s: string) {
  return esc(s)
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*(?!\s)(.+?)\*/g, "$1<em>$2</em>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, t, u) => {
      const url = safeUrl(u.replace(/&amp;/g, "&"));
      const ext = /^https?:\/\//.test(url) && !url.includes("revolyiu.com");
      return `<a href="${esc(url)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ""}>${t}</a>`;
    });
}

export function md(src: string) {
  const out: string[] = [];
  const blocks = src.replace(/\r/g, "").split(/\n{2,}/);
  for (const raw of blocks) {
    const b = raw.trim();
    if (!b) continue;
    if (/^-{3,}$/.test(b)) { out.push("<hr>"); continue; }
    const h = b.match(/^(#{2,4})\s+(.+)$/);
    if (h) { const n = h[1].length; out.push(`<h${n}>${inline(h[2])}</h${n}>`); continue; }
    const lines = b.split("\n");
    if (lines.every((l) => /^[-*]\s+/.test(l))) { out.push(`<ul>${lines.map((l) => `<li>${inline(l.replace(/^[-*]\s+/, ""))}</li>`).join("")}</ul>`); continue; }
    if (lines.every((l) => /^\d+\.\s+/.test(l))) { out.push(`<ol>${lines.map((l) => `<li>${inline(l.replace(/^\d+\.\s+/, ""))}</li>`).join("")}</ol>`); continue; }
    if (lines.every((l) => /^>\s?/.test(l))) { out.push(`<blockquote><p>${inline(lines.map((l) => l.replace(/^>\s?/, "")).join(" "))}</p></blockquote>`); continue; }
    out.push(`<p>${inline(lines.join(" "))}</p>`);
  }
  return out.join("\n");
}

export const readingTime = (s: string) => Math.max(1, Math.round(s.split(/\s+/).length / 200));
