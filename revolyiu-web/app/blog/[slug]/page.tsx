import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getPost, getPosts } from "@/lib/data";
import { crumbsLd, pageMeta } from "@/lib/seo";
import { md, readingTime } from "@/lib/markdown";
import { fmtDate } from "@/lib/date";
import { site } from "@/lib/content";
import JsonLd from "@/components/JsonLd";
import PostCard from "@/components/PostCard";
import CtaBlock from "@/components/CtaBlock";

export const revalidate = 600;
export const dynamicParams = true;
export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}
type P = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: P) {
  const p = await getPost((await params).slug);
  if (!p) return {};
  return {
    ...pageMeta({ title: p.title, description: p.excerpt, path: `/blog/${p.slug}/`, image: p.cover?.src, type: "article" }),
    other: { "article:published_time": p.published_at },
  };
}

export default async function PostPage({ params }: P) {
  const p = await getPost((await params).slug);
  if (!p) notFound();
  const more = (await getPosts()).filter((x) => x.slug !== p.slug).slice(0, 2);
  return (
    <>
      <JsonLd data={crumbsLd([{ name: "Inicio", path: "/" }, { name: "Blog", path: "/blog/" }, { name: p.title, path: `/blog/${p.slug}/` }])} />
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.excerpt,
        datePublished: p.published_at, dateModified: p.updated_at || p.published_at, inLanguage: "es",
        image: p.cover ? `${site.url}${p.cover.src}` : undefined, mainEntityOfPage: `${site.url}/blog/${p.slug}/`,
        author: { "@type": "Organization", name: p.author || "Revolyiu" }, publisher: { "@id": `${site.url}/#org` },
      }} />
      <article>
        <header className="phero" style={{ paddingBottom: 0 }}>
          <div className="wrap" style={{ maxWidth: 960 }}>
            <nav className="crumbs" aria-label="Migas de pan"><Link href="/">Inicio</Link>/<Link href="/blog/">Blog</Link>/<span aria-current="page">{p.category}</span></nav>
            <div className="meta" style={{ marginBottom: 20 }}><span className="tag">{p.category}</span><time dateTime={p.published_at}>{fmtDate(p.published_at)}</time><span>{readingTime(p.body_md)} min de lectura</span></div>
            <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", maxWidth: "none" }}>{p.title}</h1>
            <p className="lead" style={{ marginTop: 24 }}>{p.excerpt}</p>
          </div>
        </header>
        {p.cover && (
          <div className="wrap"><div className="post-cover"><Image src={p.cover.src} alt={p.cover.alt || ""} width={p.cover.w || 1200} height={p.cover.h || 675} priority sizes="(max-width: 1000px) 100vw, 1000px" /></div></div>
        )}
        <div className="wrap"><div className="prose" dangerouslySetInnerHTML={{ __html: md(p.body_md) }} /></div>
      </article>
      {more.length > 0 && (
        <section className="section section--tight" aria-labelledby="more-t">
          <div className="wrap"><h2 id="more-t" className="h-md" style={{ marginBottom: 32 }}>Sigue leyendo</h2><div className="posts">{more.map((m) => <PostCard key={m.slug} post={m} />)}</div></div>
        </section>
      )}
      <CtaBlock line="¿Tu marca está lista para sonar fuerte? Hablemos." />
    </>
  );
}
