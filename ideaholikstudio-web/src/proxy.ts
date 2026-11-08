import { NextRequest, NextResponse } from "next/server";

// Solo decide el idioma al entrar por la raíz "/": inglés si el navegador lo
// prefiere antes que el español; si no, español.
export function proxy(req: NextRequest) {
  const accept = (req.headers.get("accept-language") || "").toLowerCase();
  const prefs = accept
    .split(",")
    .map((p) => p.trim().split(";")[0])
    .filter(Boolean);
  const firstKnown = prefs.find((p) => p.startsWith("es") || p.startsWith("en"));
  const locale = firstKnown?.startsWith("en") ? "en" : "es";
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url, 307);
}

export const config = { matcher: ["/"] };
