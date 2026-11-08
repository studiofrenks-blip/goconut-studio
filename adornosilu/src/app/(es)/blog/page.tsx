import BlogView from "@/views/Blog";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "blog", lang: "es", title: "Blog de decoración navideña", description: "Ideas de decoración navideña, consejos para cuidar y montar tu pino y novedades de Adornos ILU, fabricantes venezolanos de adornos de Navidad." });

export default function Page() {
  return <BlogView lang="es" />;
}
