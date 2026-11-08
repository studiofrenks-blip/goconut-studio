import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/lib/content";
import { fmtDate } from "@/lib/date";

export default function PostCard({ post, h = "h3" }: { post: Post; h?: "h2" | "h3" }) {
  const H = h;
  return (
    <Link href={`/blog/${post.slug}/`} className="post-card">
      <div className="post-card__img">
        {post.cover && <Image src={post.cover.src} alt={post.cover.alt || ""} width={post.cover.w || 1200} height={post.cover.h || 675} sizes="(max-width: 700px) 100vw, 33vw" />}
      </div>
      <div className="post-card__body">
        <div className="meta"><span className="tag">{post.category}</span><time dateTime={post.published_at}>{fmtDate(post.published_at)}</time></div>
        <H>{post.title}</H>
        <p>{post.excerpt}</p>
      </div>
    </Link>
  );
}
