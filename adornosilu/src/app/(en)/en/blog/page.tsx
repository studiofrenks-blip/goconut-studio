import BlogView from "@/views/Blog";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "blog", lang: "en", title: "Christmas decorating blog", description: "Christmas decorating ideas, tips to assemble and look after your tree, and news from Adornos ILU, Venezuelan makers of Christmas decorations." });

export default function Page() {
  return <BlogView lang="en" />;
}
