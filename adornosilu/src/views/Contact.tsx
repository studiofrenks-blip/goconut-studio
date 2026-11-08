import ContactForm from "@/components/ContactForm";
import { WhatsAppIcon } from "@/components/WhatsAppFloat";
import PageIntro from "@/components/PageIntro";
import { getContent } from "@/lib/content";
import type { Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

export default async function ContactView({ lang }: { lang: Lang }) {
  const c = await getContent(lang);
  const k = site.company;
  const es = lang === "es";
  const row = "flex min-h-12 items-center justify-between gap-4 border-b border-[var(--line)] py-4";
  return (
    <>
      <PageIntro eyebrow={es ? "Contacto" : "Contact"} a={c["contact.h1a"]} b={c["contact.h1b"]} lead={c["contact.lead"]} />
      <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-8">
        <a data-wa href={`https://wa.me/${k.whatsapp}`} target="_blank" rel="noopener" className="flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-8 text-base font-semibold text-[var(--bg)] sm:inline-flex sm:w-auto">
          <WhatsAppIcon /> {es ? "Escríbenos por WhatsApp" : "Message us on WhatsApp"}
        </a>
      </div>
      <section className="mx-auto mt-16 grid max-w-7xl gap-14 px-4 sm:px-8 lg:grid-cols-2">
        <div>
          <h2 className="font-display condensed t-section">{es ? "O déjanos tu mensaje" : "Or leave us a message"}</h2>
          <div className="mt-6"><ContactForm lang={lang} whatsapp={k.whatsapp} /></div>
        </div>
        <div>
          <ul className="text-lg">
            <li className={row}><span className="text-[var(--cream-2)]">{es ? "Teléfono y WhatsApp" : "Phone and WhatsApp"}</span><a className="inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline" href={`tel:${k.phoneHref}`}>{k.phone}</a></li>
            <li className={row}><span className="text-[var(--cream-2)]">Email</span><a className="inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline" href={`mailto:${k.email}`}>{k.email}</a></li>
            <li className={row}><span className="text-[var(--cream-2)]">{es ? "Horario" : "Hours"}</span><span className="text-right font-semibold">{es ? k.hours : "Monday to Friday, 9:00 to 18:00"}</span></li>
          </ul>
          <address className="mt-8 not-italic leading-relaxed text-[var(--cream-2)]">
            <strong className="text-[var(--cream)]">{k.legalName}</strong> · R.I.F. {k.rif}<br />{k.address}
          </address>
        </div>
      </section>
    </>
  );
}
