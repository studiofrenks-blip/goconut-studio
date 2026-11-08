import Link from "next/link";
import { getPosts } from "@/lib/data";
import { crumbsLd, pageMeta } from "@/lib/seo";
import Split from "@/components/Split";
import PostCard from "@/components/PostCard";
import JsonLd from "@/components/JsonLd";

export const revalidate = 600;
export const metadata = pageMeta({
  title: "Blog de marketing y diseño",
  description: "Ideas prácticas sobre marketing, branding, diseño y web para hacer crecer tu marca. Nuevos artículos cada semana.",
  path: "/blog/",
});

export default async function Blog() {
  const posts = await getPosts();
  return (
    <>
      <JsonLd data={crumbsLd([{ name: "Inicio", path: "/" }, { name: "Blog", path: "/blog/" }])} />
      <section className="phero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Migas de pan"><Link href="/">Inicio</Link>/<span aria-current="page">Blog</span></nav>
          <p className="kicker">Marketing y diseño</p>
          <h1 data-fx="03"><Split text="Blog" /></h1>
          <p className="lead" data-fx="01">Ideas prácticas sobre marketing, branding, diseño y web para que tu marca suene fuerte.</p>
        </div>
      </section>
      <section className="section section--tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          {posts.length ? (
            <div className="posts" data-fx="06">{posts.map((p) => <PostCard key={p.slug} post={p} h="h2" />)}</div>
          ) : (
            <p className="empty">Muy pronto publicaremos los primeros artículos.</p>
          )}
        </div>
      </section>
    </>
  );
}
