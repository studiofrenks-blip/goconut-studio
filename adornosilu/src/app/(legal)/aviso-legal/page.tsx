import LegalPage from "@/components/LegalPage";
import { C, UPDATED, meta } from "@/lib/legal";
import { site } from "@/lib/site";
export const metadata = meta("Aviso legal", "/aviso-legal");
export default function Page() {
  return (
    <LegalPage title="Aviso legal" updated={UPDATED}>
      <h2>Titular del sitio web</h2>
      <ul>
        <li>Razón social: {C.legalName}</li>
        <li>R.I.F.: {C.rif}</li>
        <li>Domicilio: {C.address}</li>
        <li>Correo electrónico: {C.email || "[PENDIENTE]"}</li>
        <li>Teléfono: {C.phone || "[PENDIENTE]"}</li>
      </ul>
      <h2>Objeto</h2>
      <p>Este aviso regula el acceso y uso del sitio web {site.domain}, propiedad de {C.legalName}, que ofrece información sobre la empresa y la venta en línea de pinos, coronas y guirnaldas navideñas bajo la marca {site.name}.</p>
      <h2>Condiciones de uso</h2>
      <p>El acceso a la web es gratuito e implica la aceptación de este aviso. La persona usuaria se compromete a hacer un uso lícito de la web y a no dañar, inutilizar o sobrecargar sus sistemas.</p>
      <h2>Propiedad intelectual e industrial</h2>
      <p>Los textos, fotografías, diseños, logotipos y la marca {site.name} pertenecen a {C.legalName} o a sus licenciantes. Queda prohibida su reproducción, distribución o modificación sin autorización escrita.</p>
      <h2>Responsabilidad</h2>
      <p>{C.legalName} procura que la información de la web sea exacta y esté actualizada, pero no garantiza la ausencia de errores ni interrupciones del servicio. Los enlaces a sitios de terceros se ofrecen solo a título informativo.</p>
      <h2>Legislación aplicable</h2>
      <p>Este aviso se rige por las leyes de la República Bolivariana de Venezuela. Para cualquier controversia, las partes se someten a los tribunales competentes del estado Aragua, salvo que la ley disponga otra cosa.</p>
    </LegalPage>
  );
}
