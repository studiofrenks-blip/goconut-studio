import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductView from "@/views/Product";
import { pageMeta } from "@/lib/meta";
import { getProduct, products } from "@/lib/products";
import { prodText } from "@/lib/products-en";

export const dynamicParams = false;
export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return pageMeta({ key: "product", lang: "en", p: p.slug, title: p.name, description: prodText(p, "en").summary, image: p.images[0] });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  return <ProductView p={p} lang="en" />;
}
