import LegalView, { legalDesc, legalTitles } from "@/views/Legal";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "cookies", lang: "es", title: legalTitles.cookies.es, description: legalDesc.cookies.es });

export default function Page() {
  return <LegalView k="cookies" lang="es" />;
}
