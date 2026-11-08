import Link from "next/link";
import LegalPage from "@/components/LegalPage";
import { C, UPDATED, meta } from "@/lib/legal";
export const metadata = meta("Condiciones de venta", "/condiciones-de-venta");
export default function Page() {
  return (
    <LegalPage title="Condiciones de venta" updated={UPDATED}>
      <h2>Vendedor</h2>
      <p>{C.legalName}, R.I.F. {C.rif}, {C.address}.</p>
      <h2>Productos y precios</h2>
      <p>Las características de cada producto se describen en su ficha. Los precios se muestran en [PENDIENTE: moneda] e incluyen [PENDIENTE: IVA]. Los gastos de envío se indican antes de confirmar el pedido.</p>
      <h2>Cómo comprar</h2>
      <p>Añade los productos al carrito, indica tus datos de envío y facturación, elige la forma de pago y confirma. Recibirás un correo con el resumen del pedido.</p>
      <h2>Formas de pago</h2>
      <p>[PENDIENTE: definir métodos de pago].</p>
      <h2>Envío y entrega</h2>
      <p>[PENDIENTE: zonas, plazos y costes de envío]. En pinos gigantes y estructurales, la entrega e instalación se acuerdan en un presupuesto aparte.</p>
      <h2>Garantía</h2>
      <p>Los productos tienen la garantía que establece la ley. Si un producto llega dañado o con defectos de fabricación, contáctanos en {C.email || "[PENDIENTE]"} y lo repararemos o sustituiremos.</p>
      <h2>Desistimiento</h2>
      <p>Consulta nuestra <Link href="/desistimiento" className="underline">política de desistimiento</Link>.</p>
      <h2>Ley aplicable</h2>
      <p>Estas condiciones se rigen por las leyes de la República Bolivariana de Venezuela.</p>
    </LegalPage>
  );
}
