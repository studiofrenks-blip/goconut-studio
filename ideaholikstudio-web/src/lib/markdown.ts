import { Marked } from "marked";

// Markdown de los artículos -> HTML. Se escapa cualquier HTML crudo:
// el contenido viene de la IA y nunca debe poder inyectar código.
const md = new Marked({ gfm: true, breaks: false });
md.use({
  renderer: {
    html({ text }) {
      return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },
    link({ href, title, tokens }) {
      const label = this.parser.parseInline(tokens);
      const safe = /^(https?:|mailto:|\/|#)/i.test(href) ? href : "#";
      const ext = /^https?:/i.test(safe) && !safe.includes("ideaholikstudio.com");
      const t = title ? ` title="${title.replace(/"/g, "&quot;")}"` : "";
      return `<a href="${safe}"${t}${ext ? ' rel="noopener" target="_blank"' : ""}>${label}</a>`;
    },
    image({ href, title, text }) {
      if (!/^https?:|^\//i.test(href)) return "";
      const alt = (text || title || "").replace(/"/g, "&quot;");
      return `<img src="${href}" alt="${alt}" loading="lazy" />`;
    },
  },
});

export function renderMarkdown(src: string): string {
  return md.parse(src, { async: false }) as string;
}
