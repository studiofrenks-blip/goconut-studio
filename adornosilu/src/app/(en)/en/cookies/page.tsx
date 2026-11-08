import LegalView, { legalDesc, legalTitles } from "@/views/Legal";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "cookies", lang: "en", title: legalTitles.cookies.en, description: legalDesc.cookies.en });

export default function Page() {
  return <LegalView k="cookies" lang="en" />;
}
