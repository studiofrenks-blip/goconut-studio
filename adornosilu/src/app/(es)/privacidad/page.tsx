import LegalView, { legalDesc, legalTitles } from "@/views/Legal";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "privacy", lang: "es", title: legalTitles.privacy.es, description: legalDesc.privacy.es });

export default function Page() {
  return <LegalView k="privacy" lang="es" />;
}
