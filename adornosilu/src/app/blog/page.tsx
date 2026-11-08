import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Ideas de decoración navideña, cuidado de tu pino y novedades de Adornos ILU.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="font-display text-4xl sm:text-5xl">Blog</h1>
      {posts.length === 0 ? (
        <p className="mt-6">Muy pronto, nuevos artículos.</p>
      ) : (
        <ul className="mt-10 space-y-8">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`} className="font-display text-2xl hover:text-[var(--gold-ink)]">{p.title}</Link>
              <p className="mt-2">{p.excerpt}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
