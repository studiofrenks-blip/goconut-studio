import LegalPage from "@/components/LegalPage";
import { C, UPDATED, meta } from "@/lib/legal";
export const metadata = meta("Derecho de desistimiento", "/desistimiento");
export default function Page() {
  return (
    <LegalPage title="Derecho de desistimiento" updated={UPDATED}>
      <h2>Plazo</h2>
      <p>Puedes desistir de tu compra sin dar explicaciones dentro de los [PENDIENTE: 14] días naturales siguientes a la recepción del pedido.</p>
      <h2>Cómo ejercerlo</h2>
      <p>Escríbenos a {C.email || "[PENDIENTE]"} indicando tu nombre, número de pedido y los productos que devuelves. También puedes usar este modelo:</p>
      <p className="rounded-lg border border-[var(--line)] p-4 text-sm">
        A la atención de {C.legalName}, {C.address}: por la presente comunico que desisto del contrato de compra de los siguientes productos: [___]. Pedido n.º [___], recibido el [___]. Nombre: [___]. Fecha y firma: [___].
      </p>
      <h2>Devolución del producto y reembolso</h2>
      <p>Devuelve el producto sin usar y en su embalaje original dentro de los [PENDIENTE: 14] días siguientes a tu comunicación. Te reembolsaremos el importe pagado, incluido el envío estándar, por el mismo medio de pago, en un máximo de [PENDIENTE: 14] días desde que recibamos el producto. Los gastos de devolución corren por cuenta de [PENDIENTE].</p>
      <h2>Excepciones</h2>
      <p>No se aplica a productos fabricados a medida o personalizados, como los pinos gigantes y estructurales hechos por encargo.</p>
    </LegalPage>
  );
}
