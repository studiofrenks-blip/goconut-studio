import CatalogView from "@/views/Catalog";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "catalog", lang: "en", title: "Catalog of trees, wreaths and garlands", description: "Adornos ILU catalog: Canadian King, Monterrey and Victoria Christmas trees, giant trees, wreaths and garlands made in Venezuela." });

export default function Page() {
  return <CatalogView lang="en" />;
}
