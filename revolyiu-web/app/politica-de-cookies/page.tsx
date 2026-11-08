import LegalPage from "@/components/LegalPage";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import { owner } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Política de cookies", description: "Qué cookies y tecnologías de almacenamiento usa revolyiu.com, para qué sirven y cómo aceptarlas, rechazarlas o cambiar tu elección.", path: "/politica-de-cookies/" });

export default function Cookies() {
  return (
    <LegalPage title="Política de cookies" path="/politica-de-cookies/">
      <p>En cumplimiento del artículo 22.2 de la LSSI-CE y de la Guía sobre el uso de las cookies de la Agencia Española de Protección de Datos, te explicamos qué cookies y tecnologías similares usa {owner.domain}.</p>
      <h2>1. Qué son las cookies</h2>
      <p>Son pequeños archivos o registros que una web guarda en tu navegador para recordar información sobre tu visita. Algunas son imprescindibles para que la web funcione; otras sirven para medir el uso o para publicidad, y solo se activan si las aceptas.</p>
      <h2>2. Cookies que usamos ahora</h2>
      <table tabIndex={0} aria-label="Cookies que usamos">
        <thead><tr><th>Nombre</th><th>Tipo</th><th>Titular</th><th>Finalidad</th><th>Duración</th></tr></thead>
        <tbody>
          <tr><td>rv-consent</td><td>Necesaria (almacenamiento local)</td><td>Revolyiu</td><td>Recordar si has aceptado o rechazado las cookies para no volver a preguntarte</td><td>12 meses</td></tr>
        </tbody>
      </table>
      <p>Hoy la web <strong>no instala cookies de analítica ni de publicidad</strong>. Si en el futuro las incorporamos, solo se activarán tras tu consentimiento expreso y las añadiremos a esta tabla.</p>
      <h2>3. Contenido de terceros</h2>
      <p>Los enlaces a WhatsApp y YouTube te llevan a servicios externos. Esas plataformas pueden instalar sus propias cookies cuando las visitas, conforme a sus políticas.</p>
      <h2>4. Cómo aceptar, rechazar o cambiar tu elección</h2>
      <p>En tu primera visita te mostramos un aviso donde puedes <strong>aceptar todo</strong>, <strong>rechazar todo</strong> (los dos botones son igual de visibles) o <strong>configurar</strong> por categorías. Puedes cambiar de opinión cuando quieras: <CookieSettingsLink label="abrir la configuración de cookies" />.</p>
      <p>También puedes borrar o bloquear las cookies desde tu navegador: <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Chrome</a>, <a href="https://support.mozilla.org/es/kb/Borrar%20cookies" target="_blank" rel="noopener noreferrer">Firefox</a>, <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a> y <a href="https://support.microsoft.com/es-es/microsoft-edge" target="_blank" rel="noopener noreferrer">Edge</a>.</p>
      <h2>5. Más información</h2>
      <p>Para cualquier duda, escríbenos a <a href={`mailto:${owner.email}`}>{owner.email}</a>.</p>
    </LegalPage>
  );
}
