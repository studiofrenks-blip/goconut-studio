import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { missing, owner } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Política de privacidad", description: "Cómo trata Revolyiu tus datos personales: responsable, finalidades, base legal, conservación, destinatarios y tus derechos.", path: "/politica-de-privacidad/" });

export default function Privacidad() {
  return (
    <LegalPage title="Política de privacidad" path="/politica-de-privacidad/">
      <p>Esta política explica cómo tratamos tus datos personales conforme al Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).</p>
      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li><strong>Responsable:</strong> {missing(owner.name, "nombre o razón social")} ({owner.brand})</li>
        <li><strong>NIF/CIF:</strong> {missing(owner.nif, "NIF/CIF")}</li>
        <li><strong>Domicilio:</strong> {missing(owner.address, "domicilio")}</li>
        <li><strong>Contacto:</strong> <a href={`mailto:${owner.email}`}>{owner.email}</a> · {owner.phone}</li>
      </ul>
      <h2>2. Qué datos tratamos y para qué</h2>
      <table>
        <thead><tr><th>Tratamiento</th><th>Datos</th><th>Finalidad</th><th>Base legal</th></tr></thead>
        <tbody>
          <tr><td>Formulario de contacto</td><td>Nombre, correo, teléfono (opcional), empresa (opcional), servicios de interés y mensaje</td><td>Responder a tu consulta y, si lo pides, enviarte un presupuesto</td><td>Tu consentimiento (art. 6.1.a RGPD) y la aplicación de medidas precontractuales a petición tuya (art. 6.1.b)</td></tr>
          <tr><td>Correo, teléfono o WhatsApp</td><td>Los que nos facilites al escribirnos o llamarnos</td><td>Atender tu solicitud</td><td>Tu consentimiento y medidas precontractuales</td></tr>
          <tr><td>Clientes</td><td>Datos identificativos, de contacto y de facturación</td><td>Prestar los servicios contratados, facturar y cumplir obligaciones legales</td><td>Ejecución del contrato (art. 6.1.b) y obligación legal (art. 6.1.c)</td></tr>
          <tr><td>Cookies</td><td>Ver la <Link href="/politica-de-cookies/">política de cookies</Link></td><td>Funcionamiento de la web y, solo si aceptas, analítica y marketing</td><td>Interés legítimo para las necesarias; consentimiento para el resto</td></tr>
        </tbody>
      </table>
      <p>No tomamos decisiones automatizadas ni elaboramos perfiles con tus datos. Los campos marcados con asterisco son obligatorios: sin ellos no podemos responderte.</p>
      <h2>3. Cuánto tiempo los conservamos</h2>
      <p>Los datos de contacto, durante el tiempo necesario para atender tu consulta y, como máximo, 12 meses después si no llegamos a colaborar. Los de clientes, mientras dure la relación y, después, durante los plazos legales (por ejemplo, seis años para la documentación contable y fiscal).</p>
      <h2>4. Destinatarios y encargados</h2>
      <p>No cedemos tus datos a terceros salvo obligación legal. Para prestar el servicio utilizamos proveedores que actúan como encargados del tratamiento, con contrato y garantías adecuadas:</p>
      <ul>
        <li><strong>Vercel Inc.</strong> (alojamiento web). Puede implicar transferencias a EE. UU., amparadas en el Marco de Privacidad de Datos UE-EE. UU. y en cláusulas contractuales tipo.</li>
        <li><strong>Supabase Inc.</strong> (base de datos donde se guardan los mensajes del formulario), con almacenamiento en la Unión Europea.</li>
        <li><strong>Google LLC</strong> (correo electrónico), al responder desde nuestra cuenta de correo, con las mismas garantías de transferencia internacional.</li>
      </ul>
      <p>Si nos escribes por WhatsApp, Meta Platforms trata esos datos según su propia política de privacidad.</p>
      <h2>5. Tus derechos</h2>
      <p>Puedes ejercer en cualquier momento tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, así como retirar tu consentimiento, escribiendo a <a href={`mailto:${owner.email}`}>{owner.email}</a>. Si consideras que no hemos tratado bien tus datos, puedes reclamar ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">aepd.es</a>).</p>
      <h2>6. Seguridad</h2>
      <p>Aplicamos medidas técnicas y organizativas para proteger tus datos: conexión cifrada (HTTPS), acceso restringido a la base de datos y proveedores con certificaciones de seguridad.</p>
      <h2>7. Menores</h2>
      <p>La web no está dirigida a menores de 14 años. Si lo eres, no nos envíes datos sin el consentimiento de tus padres o tutores.</p>
      <h2>8. Cambios</h2>
      <p>Podemos actualizar esta política para adaptarla a cambios legales o del servicio. La fecha de la última actualización figura al principio.</p>
    </LegalPage>
  );
}
