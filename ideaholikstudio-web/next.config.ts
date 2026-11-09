import type { NextConfig } from "next";

// Slugs en español -> rutas internas. La URL pública es la localizada.
const esSlugs: Record<string, string> = {
  nosotros: "about",
  proyectos: "work",
  contacto: "contact",
  "legal/aviso-legal": "legal/notice",
  "legal/privacidad": "legal/privacy",
  "legal/cookies": "legal/cookies",
};
const enSlugs: Record<string, string> = {
  "legal/legal-notice": "legal/notice",
};

const config: NextConfig = {
  trailingSlash: false,
  experimental: { globalNotFound: true },
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
  async rewrites() {
    return [
      ...Object.entries(esSlugs)
        .filter(([pub, internal]) => pub !== internal)
        .map(([pub, internal]) => ({ source: `/es/${pub}`, destination: `/es/${internal}` })),
      ...Object.entries(enSlugs).map(([pub, internal]) => ({ source: `/en/${pub}`, destination: `/en/${internal}` })),
    ];
  },
  async redirects() {
    return [
      // Raíz -> español (idioma principal). El proxy elige inglés si el navegador lo pide.
      // URLs internas en español -> URL pública localizada (evita duplicados).
      ...Object.entries(esSlugs)
        .filter(([pub, internal]) => pub !== internal)
        .map(([pub, internal]) => ({ source: `/es/${internal}`, destination: `/es/${pub}`, permanent: true })),
      { source: "/en/legal/notice", destination: "/en/legal/legal-notice", permanent: true },
      // URLs de la web WordPress antigua (estaban en inglés).
      { source: "/about", destination: "/en/about", permanent: true },
      { source: "/contact", destination: "/en/contact", permanent: true },
      { source: "/portfolio", destination: "/en/work", permanent: true },
      { source: "/portfolio/:path*", destination: "/en/work", permanent: true },
      { source: "/portfolio-cat/:path*", destination: "/en/work", permanent: true },
      { source: "/blog", destination: "/en/blog", permanent: true },
      { source: "/blog-2", destination: "/en/blog", permanent: true },
      { source: "/category/:path*", destination: "/en/blog", permanent: true },
      { source: "/author/:path*", destination: "/en", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: true },
      { source: "/wp-login.php", destination: "/", permanent: true },
      { source: "/feed", destination: "/en/blog", permanent: true },
      // Los 8 artículos de ejemplo de la plantilla.
      ...[
        "exploring-the-versatility-of-wordpress-solutions",
        "optimizing-your-wordpress-platform-for-success",
        "why-wordpress-is-ideal-for-content-sharing",
        "tips-for-building-engaging-wordpress-platforms",
        "the-rise-of-wordpress-as-a-creative-tool",
        "customizing-wordpress-to-fit-your-needs",
        "top-features-of-wordpress-for-creators",
        "how-wordpress-revolutionized-content-sharing",
      ].map((s) => ({ source: `/${s}`, destination: "/en/blog", permanent: true })),
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default config;
