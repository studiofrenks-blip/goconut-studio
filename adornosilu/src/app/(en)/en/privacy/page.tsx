import LegalView, { legalDesc, legalTitles } from "@/views/Legal";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "privacy", lang: "en", title: legalTitles.privacy.en, description: legalDesc.privacy.en });

export default function Page() {
  return <LegalView k="privacy" lang="en" />;
}
