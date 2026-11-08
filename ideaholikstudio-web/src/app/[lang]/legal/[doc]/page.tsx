import { notFound } from "next/navigation";
import { legal, lastUpdated, PENDING } from "@/content/legal";
import { type Locale } from "@/lib/i18n";
import { pageMeta } from "@/lib/seo";

type Doc = "notice" | "privacy" | "cookies";
type P = { params: Promise<{ lang: Locale; doc: string }> };
const DOCS: Doc[] = ["notice", "privacy", "cookies"];

export function generateStaticParams() {
  return DOCS.map((doc) => ({ doc }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: P) {
  const { lang, doc } = await params;
  if (!DOCS.includes(doc as Doc)) return {};
  const d = legal[lang][doc as Doc];
  return pageMeta(lang, doc as Doc, `${d.title} · Ideaholiks Studio`, d.metaDesc);
}

/** Resalta en amarillo los datos que faltan, para que nadie los pase por alto. */
function Text({ s }: { s: string }) {
  const parts = s.split(PENDING);
  return (
    <>
      {parts.map((p, i) => (
        <span key={i}>
          {p}
          {i < parts.length - 1 && <mark className="pending">{PENDING}</mark>}
        </span>
      ))}
    </>
  );
}

export default async function LegalPage({ params }: P) {
  const { lang, doc } = await params;
  if (!DOCS.includes(doc as Doc)) notFound();
  const d = legal[lang][doc as Doc];
  const date = new Date(lastUpdated).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">Legal</p>
          <h1 className="h-lg">{d.title}</h1>
          <p className="lead">{d.intro}</p>
        </div>
      </section>
      <article className="wrap legal">
        {d.sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            {s.p.map((p, i) => (
              <p key={i}>
                <Text s={p} />
              </p>
            ))}
          </section>
        ))}
        <p className="updated">
          {lang === "es" ? "Última actualización" : "Last updated"}: {date}
        </p>
      </article>
    </>
  );
}
