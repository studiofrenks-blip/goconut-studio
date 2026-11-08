import AboutView from "@/views/About";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "about", lang: "es", title: "Nosotros: más de 60 años de Navidad", description: "Adornos ILU es una empresa familiar venezolana con más de 60 años fabricando pinos, coronas y guirnaldas navideñas de alta calidad." });

export default function Page() {
  return <AboutView lang="es" />;
}
