import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { href, type Locale } from "@/lib/i18n";
import { getTexts } from "@/lib/texts";
import { listPosts } from "@/lib/posts";
import { pageMeta } from "@/lib/seo";

type P = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: P) {
  const { lang } = await params;
  const t = await getTexts(lang);
  const posts = await listPosts(lang);
  // Mientras no haya artículos, el blog no se indexa (evita una página vacía en Google).
  return pageMeta(lang, "blog", t["blog.metaTitle"], t["blog.metaDesc"], { noindex: posts.length === 0 });
}

export default async function Blog({ params }: P) {
  const { lang } = await params;
  const t = await getTexts(lang);
  const posts = await listPosts(lang);
  const fmt = new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-GB", { day: "numeric", month: "long", year: "numeric" });
  return (
    <>
      <PageHero kicker={t["blog.kicker"]} title={t["blog.h1"]} lead={t["blog.lead"]} watermark="Blog" size="xl" />
      <section className="wrap">
        {posts.length === 0 ? (
          <div className="empty">
            <p>{t["blog.empty"]}</p>
            <Link className="btn btn-lime" href={href(lang, "contact")}>
              {t["cta.button"]}
            </Link>
          </div>
        ) : (
          <div className="posts">
            {posts.map((p) => (
              <Link className="post-card" key={p.slug} href={href(lang, "blog", p.slug)}>
                {p.cover_url && (
                  <Image src={p.cover_url} alt={p.cover_alt || ""} width={960} height={600} sizes="(max-width: 700px) 100vw, 33vw" />
                )}
                <div className="pc-body">
                  <time dateTime={p.published_at}>{fmt.format(new Date(p.published_at))}</time>
                  <h2>{p.title}</h2>
                  <p>{p.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
