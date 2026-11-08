import { notFound } from "next/navigation";
import { getPost, posts } from "@/lib/posts";

export const dynamicParams = false;
export const generateStaticParams = () => (posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: "_" }]);

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  return (
    <article className="mx-auto max-w-3xl px-4 pt-14 sm:px-8">
      <h1 className="font-display condensed text-[clamp(44px,7vw,96px)]">{p.title}</h1>
      <div className="mt-8 whitespace-pre-line leading-relaxed text-[var(--cream-2)]">{p.body}</div>
    </article>
  );
}
