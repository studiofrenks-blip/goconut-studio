import CatalogView from "@/views/Catalog";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "catalog", lang: "es", title: "Catálogo de pinos, coronas y guirnaldas", description: "Catálogo Adornos ILU: pinos de Navidad Canadian King, Monterrey y Victoria, pinos gigantes, coronas y guirnaldas fabricados en Venezuela." });

export default function Page() {
  return <CatalogView lang="es" />;
}
