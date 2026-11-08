import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { missing, owner } from "@/lib/legal";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({ title: "Aviso legal", description: "Aviso legal de revolyiu.com: datos del titular, condiciones de uso, propiedad intelectual y legislación aplicable.", path: "/aviso-legal/" });

export default function AvisoLegal() {
  return (
    <LegalPage title="Aviso legal" path="/aviso-legal/">
      <h2>1. Datos del titular</h2>
      <p>En cumplimiento del artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), te informamos de los datos del titular de este sitio web:</p>
      <ul>
        <li><strong>Titular:</strong> {missing(owner.name, "nombre o razón social")}</li>
        <li><strong>Nombre comercial:</strong> {owner.brand}</li>
        <li><strong>NIF/CIF:</strong> {missing(owner.nif, "NIF/CIF")}</li>
        <li><strong>Domicilio:</strong> {missing(owner.address, "domicilio")}</li>
        {owner.registry && <li><strong>Datos registrales:</strong> {owner.registry}</li>}
        <li><strong>Correo electrónico:</strong> <a href={`mailto:${owner.email}`}>{owner.email}</a></li>
        <li><strong>Teléfono:</strong> {owner.phone}</li>
        <li><strong>Sitio web:</strong> {owner.domain}</li>
      </ul>
      <h2>2. Objeto y aceptación</h2>
      <p>Este aviso legal regula el acceso y uso del sitio web {owner.domain}. Navegar por él te atribuye la condición de usuario e implica que aceptas estas condiciones. Si no estás de acuerdo, te pedimos que no utilices la web.</p>
      <h2>3. Condiciones de uso</h2>
      <p>Te comprometes a hacer un uso adecuado de los contenidos y servicios de la web y, en particular, a no emplearlos para actividades ilícitas, contrarias a la buena fe o al orden público; ni para difundir contenidos de carácter racista, xenófobo, ilegal o que atenten contra los derechos humanos; ni para provocar daños en los sistemas del titular, de sus proveedores o de terceros.</p>
      <h2>4. Propiedad intelectual e industrial</h2>
      <p>Todos los contenidos de la web (textos, fotografías, gráficos, logotipos, iconos, diseño, código y demás elementos) son propiedad del titular o de terceros que han autorizado su uso, y están protegidos por la normativa de propiedad intelectual e industrial. Los trabajos mostrados en el portfolio pertenecen a sus respectivos clientes y se muestran con fines ilustrativos. Queda prohibida su reproducción, distribución, comunicación pública o transformación sin autorización expresa.</p>
      <h2>5. Exclusión de responsabilidad</h2>
      <p>El titular no se hace responsable de los daños que pudieran derivarse de interrupciones del servicio, errores técnicos, virus o del uso que hagas de la información publicada. Los contenidos tienen carácter informativo y no constituyen una oferta vinculante.</p>
      <h2>6. Enlaces externos</h2>
      <p>La web puede contener enlaces a sitios de terceros (por ejemplo, WhatsApp o YouTube). El titular no controla ni se responsabiliza de sus contenidos ni de sus políticas de privacidad.</p>
      <h2>7. Protección de datos y cookies</h2>
      <p>El tratamiento de tus datos personales se rige por la <Link href="/politica-de-privacidad/">política de privacidad</Link>, y el uso de cookies, por la <Link href="/politica-de-cookies/">política de cookies</Link>.</p>
      <h2>8. Legislación aplicable y jurisdicción</h2>
      <p>Estas condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a la ley; si eres consumidor, a los de tu domicilio.</p>
    </LegalPage>
  );
}
