import LegalView, { legalDesc, legalTitles } from "@/views/Legal";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "terms", lang: "en", title: legalTitles.terms.en, description: legalDesc.terms.en });

export default function Page() {
  return <LegalView k="terms" lang="en" />;
}
