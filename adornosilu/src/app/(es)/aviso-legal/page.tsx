import LegalView, { legalDesc, legalTitles } from "@/views/Legal";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "legal", lang: "es", title: legalTitles.legal.es, description: legalDesc.legal.es });

export default function Page() {
  return <LegalView k="legal" lang="es" />;
}
