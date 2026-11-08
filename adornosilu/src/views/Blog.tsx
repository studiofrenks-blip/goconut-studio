import Link from "next/link";
import PageIntro from "@/components/PageIntro";
import { t } from "@/lib/dict";
import { path, type Lang } from "@/lib/i18n";
import { posts } from "@/lib/posts";

export default function BlogView({ lang }: { lang: Lang }) {
  const d = t(lang);
  return (
    <>
      <PageIntro eyebrow="Blog" a={lang === "es" ? "Ideas para" : "Ideas for"} b={lang === "es" ? "tu Navidad" : "your Christmas"} lead={d.blogEmpty} />
      {posts.length > 0 && (
        <ul className="mx-auto mt-16 max-w-4xl space-y-10 px-4 sm:px-8">
          {posts.map((p) => <li key={p.slug}><Link href={path("post", lang, p.slug)} className="font-display text-3xl hover:text-[var(--accent)]">{p.title}</Link><p className="mt-2 text-[var(--cream-2)]">{p.excerpt}</p></li>)}
        </ul>
      )}
    </>
  );
}
