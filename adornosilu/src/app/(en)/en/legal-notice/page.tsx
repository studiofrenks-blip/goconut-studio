import LegalView, { legalDesc, legalTitles } from "@/views/Legal";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "legal", lang: "en", title: legalTitles.legal.en, description: legalDesc.legal.en });

export default function Page() {
  return <LegalView k="legal" lang="en" />;
}
