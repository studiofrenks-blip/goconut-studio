import LegalPage from "@/components/LegalPage";
import { C, UPDATED, meta } from "@/lib/legal";
export const metadata = meta("Política de privacidad", "/privacidad");
export default function Page() {
  return (
    <LegalPage title="Política de privacidad" updated={UPDATED}>
      <h2>Responsable</h2>
      <p>{C.legalName} (R.I.F. {C.rif}), con domicilio en {C.address}. Contacto: {C.email || "[PENDIENTE]"}.</p>
      <h2>Qué datos tratamos y para qué</h2>
      <ul>
        <li><strong>Pedidos:</strong> nombre, documento de identidad o R.I.F., dirección, teléfono y correo, para gestionar la compra, la facturación y el envío.</li>
        <li><strong>Contacto:</strong> los datos que nos envíes en el formulario o por correo, para responderte.</li>
        <li><strong>Navegación:</strong> datos técnicos y, solo si lo aceptas, cookies de análisis y marketing (ver política de cookies).</li>
      </ul>
      <h2>Base y conservación</h2>
      <p>Tratamos los datos para ejecutar el contrato de compra, cumplir obligaciones legales y fiscales, o con tu consentimiento. Los conservamos mientras dure la relación y, después, durante los plazos que exija la ley.</p>
      <h2>Con quién los compartimos</h2>
      <p>Con proveedores necesarios para prestar el servicio (alojamiento web, base de datos, procesador de pagos y empresa de transporte), que solo pueden usarlos para ese fin. Algunos de estos proveedores pueden estar fuera de Venezuela. No vendemos tus datos.</p>
      <h2>Tus derechos</h2>
      <p>Conforme al artículo 28 de la Constitución de la República Bolivariana de Venezuela, puedes acceder a tus datos, pedir su rectificación o actualización, solicitar su eliminación y retirar tu consentimiento escribiendo a {C.email || "[PENDIENTE]"}.</p>
      <h2>Seguridad</h2>
      <p>Aplicamos medidas técnicas y organizativas razonables para proteger tus datos frente a pérdida, uso indebido o acceso no autorizado.</p>
    </LegalPage>
  );
}
