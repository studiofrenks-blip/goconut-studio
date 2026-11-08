import LegalPage from "@/components/LegalPage";
import { OpenCookieSettings } from "@/components/CookieBanner";
import { UPDATED, meta } from "@/lib/legal";
export const metadata = meta("Política de cookies", "/cookies");
export default function Page() {
  return (
    <LegalPage title="Política de cookies" updated={UPDATED}>
      <p>Las cookies son pequeños archivos que la web guarda en tu navegador. Solo instalamos las necesarias sin pedirte permiso; las demás, únicamente si las aceptas.</p>
      <h2>Cookies que usamos</h2>
      <ul>
        <li><strong>ilu_consent</strong> (necesaria, propia, 6 meses): guarda tu elección sobre cookies.</li>
        <li><strong>Carrito</strong> (necesaria, propia, sesión): recuerda los productos de tu carrito. [PENDIENTE al construir la tienda]</li>
        <li><strong>Análisis</strong> (opcional): [PENDIENTE — no hay ninguna instalada todavía].</li>
        <li><strong>Marketing</strong> (opcional): [PENDIENTE — no hay ninguna instalada todavía].</li>
      </ul>
      <h2>Cómo cambiar tu elección</h2>
      <p>Puedes cambiar o retirar tu consentimiento en cualquier momento: <OpenCookieSettings className="underline underline-offset-2" />. También puedes borrar las cookies desde la configuración de tu navegador.</p>
    </LegalPage>
  );
}
