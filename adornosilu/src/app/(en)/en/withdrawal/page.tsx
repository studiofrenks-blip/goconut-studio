import LegalView, { legalDesc, legalTitles } from "@/views/Legal";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "withdrawal", lang: "en", title: legalTitles.withdrawal.en, description: legalDesc.withdrawal.en });

export default function Page() {
  return <LegalView k="withdrawal" lang="en" />;
}
