import HomeView from "@/views/Home";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "home", lang: "en", title: "Christmas trees, wreaths and garlands", description: "Adornos ILU: Venezuelan makers of Christmas trees, wreaths and garlands for more than 60 years, including giant trees up to 20 metres tall." });

export default function Page() {
  return <HomeView lang="en" />;
}
