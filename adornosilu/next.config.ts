import type { NextConfig } from "next";
import { categories, products } from "./src/lib/products";

// 301 desde las URLs de WordPress para no perder posicionamiento al cambiar el dominio.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      ...products.flatMap((p) => [
        { source: `/product/${p.legacySlug}`, destination: `/producto/${p.slug}`, permanent: true },
        { source: `/producto/${p.legacySlug}`, destination: `/producto/${p.slug}`, permanent: true },
      ]).filter((r) => r.source !== r.destination),
      ...categories.map((c) => ({ source: `/product-category/${c.legacy}`, destination: `/tienda/${c.slug}`, permanent: true })),
      { source: "/product-category/todos-los-productos", destination: "/tienda", permanent: true },
      { source: "/productos", destination: "/tienda", permanent: true },
      { source: "/shop", destination: "/tienda", permanent: true },
      { source: "/home", destination: "/", permanent: true },
      { source: "/sample-page", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
