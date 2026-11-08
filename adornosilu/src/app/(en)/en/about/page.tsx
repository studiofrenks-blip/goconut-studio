import AboutView from "@/views/About";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "about", lang: "en", title: "About us: 60+ years of Christmas", description: "Adornos ILU is a Venezuelan family business that has been making high-quality Christmas trees, wreaths and garlands for more than 60 years." });

export default function Page() {
  return <AboutView lang="en" />;
}
