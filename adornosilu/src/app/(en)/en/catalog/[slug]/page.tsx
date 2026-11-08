import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CatalogView from "@/views/Catalog";
import { pageMeta } from "@/lib/meta";
import { categories, getCategory } from "@/lib/products";
import { catText } from "@/lib/products-en";

export const dynamicParams = false;
export const generateStaticParams = () => categories.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCategory((await params).slug);
  if (!c) return {};
  const x = catText(c, "en");
  return pageMeta({ key: "category", lang: "en", p: c.slug, title: x.title, description: x.seo });
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCategory((await params).slug);
  if (!c) notFound();
  return <CatalogView lang="en" only={c.slug} />;
}
