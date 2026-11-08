import LegalView, { legalDesc, legalTitles } from "@/views/Legal";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "withdrawal", lang: "es", title: legalTitles.withdrawal.es, description: legalDesc.withdrawal.es });

export default function Page() {
  return <LegalView k="withdrawal" lang="es" />;
}
