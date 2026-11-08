import LegalView, { legalDesc, legalTitles } from "@/views/Legal";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "terms", lang: "es", title: legalTitles.terms.es, description: legalDesc.terms.es });

export default function Page() {
  return <LegalView k="terms" lang="es" />;
}
