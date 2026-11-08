import HomeView from "@/views/Home";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "home", lang: "es", title: "Pinos, coronas y guirnaldas de Navidad", description: "Adornos ILU: fabricantes venezolanos de pinos de Navidad, coronas y guirnaldas desde hace más de 60 años. Pinos gigantes de hasta 20 metros." });

export default function Page() {
  return <HomeView lang="es" />;
}
