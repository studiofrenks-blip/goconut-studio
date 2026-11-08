import ContactForm from "@/components/ContactForm";
import { href, type Locale } from "@/lib/i18n";
import { getTexts } from "@/lib/texts";
import { JsonLd, pageMeta } from "@/lib/seo";

type P = { params: Promise<{ lang: Locale }> };

export async function generateMetadata({ params }: P) {
  const { lang } = await params;
  const t = await getTexts(lang);
  return pageMeta(lang, "contact", t["contact.metaTitle"], t["contact.metaDesc"]);
}

export default async function Contact({ params }: P) {
  const { lang } = await params;
  const t = await getTexts(lang);
  const faq = [1, 2, 3, 4, 5].map((n) => ({ q: t[`contact.q${n}` as "contact.q1"], a: t[`contact.a${n}` as "contact.a1"] }));
  const pick = <K extends string>(keys: K[]) =>
    Object.fromEntries(keys.map((k) => [k, t[`contact.${k}` as "contact.name"]])) as Record<K, string>;

  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <p className="kicker">{t["contact.kicker"]}</p>
          <h1 className="h-xl">{t["contact.h1"]}</h1>
          <p className="lead">{t["contact.lead"]}</p>
        </div>
      </section>
      <section className="wrap contact-grid">
        <ContactForm
          locale={lang}
          privacyHref={href(lang, "privacy")}
          services={[t["home.s1Title"], t["home.s2Title"], t["home.s3Title"], t["home.s4Title"]]}
          t={pick([
            "name", "email", "subject", "subjectPick", "subjectOther", "message", "consent", "consentLink",
            "send", "sending", "ok", "error", "invalid", "privacyNote",
          ])}
        />
        <div className="faq">
          <h2 className="h-md">{t["contact.faqTitle"]}</h2>
          {faq.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: lang,
          mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </>
  );
}
