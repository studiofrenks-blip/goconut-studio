import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { href, siteUrl, type Locale } from "@/lib/i18n";
import { getTexts } from "@/lib/texts";
import { getPost, readingMinutes } from "@/lib/posts";
import { renderMarkdown } from "@/lib/markdown";
import { JsonLd, pageMeta } from "@/lib/seo";

type P = { params: Promise<{ lang: Locale; slug: string }> };
export const dynamicParams = true;
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: P) {
  const { lang, slug } = await params;
  const post = await getPost(lang, slug);
  if (!post) return {};
  const other = lang === "es" ? "en" : "es";
  const extra: Partial<Record<Locale, string>> = { [lang]: slug };
  if (post.translation_slug) extra[other] = post.translation_slug;
  return pageMeta(lang, "blog", `${post.title} · Ideaholiks Studio`, post.description, {
    extra,
    type: "article",
    image: post.cover_url || undefined,
  });
}

export default async function PostPage({ params }: P) {
  const { lang, slug } = await params;
  const [t, post] = await Promise.all([getTexts(lang), getPost(lang, slug)]);
  if (!post) notFound();
  const fmt = new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  const url = siteUrl() + href(lang, "blog", slug);
  return (
    <>
      <article className="page-hero">
        <div className="wrap article">
          <Link className="back-link" href={href(lang, "blog")}>
            ← {t["blog.back"]}
          </Link>
          <h1 className="h-lg">{post.title}</h1>
          <p className="meta">
            <time dateTime={post.published_at}>{fmt.format(new Date(post.published_at))}</time> · {readingMinutes(post.body_md)}{" "}
            {t["blog.minutes"]}
          </p>
          {post.cover_url && (
            <div className="cover">
              <Image src={post.cover_url} alt={post.cover_alt || ""} width={1480} height={900} priority sizes="(max-width: 780px) 100vw, 740px" />
            </div>
          )}
          <div className="md" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.body_md) }} />
        </div>
      </article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          inLanguage: lang,
          datePublished: post.published_at,
          dateModified: post.updated_at || post.published_at,
          mainEntityOfPage: url,
          image: post.cover_url || undefined,
          author: { "@type": "Organization", name: "Ideaholiks Studio" },
          publisher: { "@id": `${siteUrl()}/#org` },
        }}
      />
    </>
  );
}
