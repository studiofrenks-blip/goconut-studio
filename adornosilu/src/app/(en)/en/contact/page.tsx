import ContactView from "@/views/Contact";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "contact", lang: "en", title: "Contact and quotes", description: "Talk to Adornos ILU on WhatsApp, by phone or by email. We serve customers, shops, decorators and distributors all over Venezuela." });

export default function Page() {
  return <ContactView lang="en" />;
}
