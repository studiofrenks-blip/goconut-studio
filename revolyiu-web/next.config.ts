import type { NextConfig } from "next";

const config: NextConfig = {
  trailingSlash: true, // mismas URL que la web actual de WordPress
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"], qualities: [70, 75] },
  async redirects() {
    return [
      // URL antiguas de WordPress → nuevas (301, conserva el SEO)
      { source: "/about/", destination: "/nosotros/", permanent: true },
      { source: "/services/", destination: "/servicios/", permanent: true },
      { source: "/contact-us/", destination: "/contacto/", permanent: true },
      { source: "/likes-no-pagan-las-cuentas/", destination: "/blog/likes-no-pagan-las-cuentas/", permanent: true },
      // Relleno de la plantilla que ya no existe
      { source: "/portfolio/:path*", destination: "/servicios/", permanent: true },
      { source: "/students-defy-university-ban-on-sheltering-riot-victims-from-china/", destination: "/blog/", permanent: true },
      { source: "/hiring-and-promotion-are-key-to-fulfilling-he-mission-in-this-situations/", destination: "/blog/", permanent: true },
      { source: "/top-challenges-for-agencies-in-2020/", destination: "/blog/", permanent: true },
      { source: "/category/:path*", destination: "/blog/", permanent: true },
      { source: "/author/:path*", destination: "/blog/", permanent: true },
      { source: "/feed/", destination: "/blog/", permanent: true },
      { source: "/wp-admin/:path*", destination: "/", permanent: false },
      { source: "/wp-login.php", destination: "/", permanent: false },
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
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        ],
      },
      { source: "/img/:path*", headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }] },
    ];
  },
};
export default config;
