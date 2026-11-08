import Link from "next/link";
import { OpenCookieSettings } from "@/components/CookieBanner";
import { path, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

export type LegalKey = "legal" | "privacy" | "cookies" | "terms" | "withdrawal";
const C = site.company;
const UPDATED = { es: "8 de noviembre de 2026", en: "8 November 2026" };

export const legalTitles: Record<LegalKey, Record<Lang, string>> = {
  legal: { es: "Aviso legal", en: "Legal notice" },
  privacy: { es: "Política de privacidad", en: "Privacy policy" },
  cookies: { es: "Política de cookies", en: "Cookie policy" },
  terms: { es: "Condiciones de venta", en: "Terms of sale" },
  withdrawal: { es: "Derecho de desistimiento", en: "Right of withdrawal" },
};
export const legalDesc: Record<LegalKey, Record<Lang, string>> = {
  legal: { es: "Aviso legal de adornosilu.com: titular del sitio web Ilu Company, C.A., condiciones de uso, propiedad intelectual y legislación aplicable.", en: "Legal notice for adornosilu.com: website owner Ilu Company, C.A., terms of use, intellectual property and applicable law in Venezuela." },
  privacy: { es: "Política de privacidad de Adornos ILU: qué datos tratamos, para qué, con quién los compartimos y cómo ejercer tus derechos sobre ellos.", en: "Adornos ILU privacy policy: what data we process, why, who we share it with and how you can exercise your rights over your personal data." },
  cookies: { es: "Política de cookies de adornosilu.com: qué cookies usamos, para qué sirven y cómo puedes aceptarlas, rechazarlas o cambiar tu elección.", en: "Cookie policy for adornosilu.com: which cookies we use, what they are for and how you can accept them, reject them or change your choice." },
  terms: { es: "Condiciones de venta de Adornos ILU: cómo pedir pinos, coronas y guirnaldas, presupuesto, pago, entrega, garantía y legislación aplicable.", en: "Adornos ILU terms of sale: how to order trees, wreaths and garlands, quotes, payment, delivery, warranty and the applicable law in Venezuela." },
  withdrawal: { es: "Derecho de desistimiento en Adornos ILU: plazo, cómo ejercerlo, devolución de productos, reembolso y excepciones para pedidos a medida.", en: "Right of withdrawal at Adornos ILU: time limit, how to exercise it, returning products, refunds and exceptions for made-to-order items." },
};

function Body({ k, lang }: { k: LegalKey; lang: Lang }) {
  const es = lang === "es";
  const cookiesLink = <Link href={path("cookies", lang)} className="underline">{es ? "política de cookies" : "cookie policy"}</Link>;
  switch (k) {
    case "legal": return es ? (<>
      <h2>Titular del sitio web</h2>
      <ul><li>Razón social: {C.legalName}</li><li>R.I.F.: {C.rif}</li><li>Domicilio: {C.address}</li><li>Correo electrónico: {C.email}</li><li>Teléfono: {C.phone}</li></ul>
      <h2>Objeto</h2><p>Este aviso regula el acceso y uso de {site.domain}, propiedad de {C.legalName}, que informa sobre la empresa y muestra el catálogo de pinos, coronas y guirnaldas de la marca {site.name}.</p>
      <h2>Condiciones de uso</h2><p>El acceso es gratuito e implica la aceptación de este aviso. Quien use la web se compromete a hacerlo de forma lícita y a no dañar sus sistemas.</p>
      <h2>Propiedad intelectual e industrial</h2><p>Los textos, fotografías, diseños, logotipos y la marca {site.name} pertenecen a {C.legalName} o a sus licenciantes. No se pueden reproducir sin autorización escrita.</p>
      <h2>Responsabilidad</h2><p>Procuramos que la información sea exacta y esté actualizada, pero no garantizamos la ausencia de errores ni de interrupciones. Los enlaces a otros sitios se ofrecen solo a título informativo.</p>
      <h2>Legislación aplicable</h2><p>Este aviso se rige por las leyes de la República Bolivariana de Venezuela. Para cualquier controversia, las partes se someten a los tribunales competentes del estado Aragua, salvo que la ley disponga otra cosa.</p>
    </>) : (<>
      <h2>Website owner</h2>
      <ul><li>Company name: {C.legalName}</li><li>Tax ID (R.I.F.): {C.rif}</li><li>Address: {C.address}</li><li>Email: {C.email}</li><li>Phone: {C.phone}</li></ul>
      <h2>Purpose</h2><p>This notice governs access to and use of {site.domain}, owned by {C.legalName}, which provides information about the company and shows the catalog of {site.name} trees, wreaths and garlands.</p>
      <h2>Terms of use</h2><p>Access is free and implies acceptance of this notice. Users agree to use the site lawfully and not to damage its systems.</p>
      <h2>Intellectual and industrial property</h2><p>Texts, photographs, designs, logos and the {site.name} brand belong to {C.legalName} or its licensors and may not be reproduced without written permission.</p>
      <h2>Liability</h2><p>We try to keep the information accurate and up to date, but we do not guarantee the absence of errors or interruptions. Links to other sites are provided for information only.</p>
      <h2>Applicable law</h2><p>This notice is governed by the laws of the Bolivarian Republic of Venezuela. Any dispute shall be submitted to the competent courts of Aragua State, unless the law provides otherwise.</p>
    </>);
    case "privacy": return es ? (<>
      <h2>Responsable</h2><p>{C.legalName} (R.I.F. {C.rif}), {C.address}. Contacto: {C.email}.</p>
      <h2>Qué datos tratamos y para qué</h2>
      <ul><li><strong>Consultas y pedidos:</strong> los datos que nos envíes por WhatsApp, teléfono o correo (nombre, teléfono, dirección, R.I.F. o cédula), para responderte, preparar el presupuesto, facturar y entregar.</li>
        <li><strong>Formulario de contacto:</strong> no guarda datos en esta web; solo prepara un mensaje que tú decides enviar por WhatsApp.</li>
        <li><strong>Navegación:</strong> datos técnicos y, solo si lo aceptas, cookies de análisis y marketing (ver la {cookiesLink}).</li></ul>
      <h2>Base y conservación</h2><p>Tratamos los datos para atender tu solicitud y ejecutar el pedido, cumplir obligaciones legales y fiscales, o con tu consentimiento. Los conservamos mientras dure la relación y, después, durante los plazos que exija la ley.</p>
      <h2>Con quién los compartimos</h2><p>Con proveedores necesarios para prestar el servicio (alojamiento web, mensajería y transporte), que solo pueden usarlos para ese fin. Algunos están fuera de Venezuela. No vendemos tus datos.</p>
      <h2>Tus derechos</h2><p>Conforme al artículo 28 de la Constitución de la República Bolivariana de Venezuela, puedes acceder a tus datos, pedir que se rectifiquen o eliminen y retirar tu consentimiento escribiendo a {C.email}.</p>
    </>) : (<>
      <h2>Data controller</h2><p>{C.legalName} (Tax ID {C.rif}), {C.address}. Contact: {C.email}.</p>
      <h2>What data we process and why</h2>
      <ul><li><strong>Enquiries and orders:</strong> the data you send us by WhatsApp, phone or email (name, phone, address, tax or ID number), to reply, prepare a quote, invoice and deliver.</li>
        <li><strong>Contact form:</strong> it does not store any data on this site; it only prepares a message that you decide to send on WhatsApp.</li>
        <li><strong>Browsing:</strong> technical data and, only if you accept them, analytics and marketing cookies (see the {cookiesLink}).</li></ul>
      <h2>Legal basis and retention</h2><p>We process data to handle your request and fulfil the order, to meet legal and tax obligations, or with your consent. We keep it for as long as the relationship lasts and then for the periods required by law.</p>
      <h2>Who we share it with</h2><p>With providers needed to deliver the service (web hosting, messaging and transport), who may only use it for that purpose. Some are outside Venezuela. We do not sell your data.</p>
      <h2>Your rights</h2><p>Under article 28 of the Constitution of the Bolivarian Republic of Venezuela, you can access your data, ask for it to be corrected or deleted and withdraw your consent by writing to {C.email}.</p>
    </>);
    case "cookies": return es ? (<>
      <p>Las cookies son pequeños archivos que la web guarda en tu navegador. Solo instalamos las necesarias sin pedirte permiso; las demás, únicamente si las aceptas. Antes de que decidas no se instala ninguna cookie opcional.</p>
      <h2>Cookies que usamos</h2>
      <ul><li><strong>ilu_consent</strong> (necesaria, propia, 6 meses): guarda tu elección sobre las cookies.</li><li><strong>Análisis y marketing</strong> (opcionales): hoy no usamos ninguna. Si las añadimos, aparecerán aquí y solo se activarán con tu permiso.</li></ul>
      <h2>Cómo cambiar tu elección</h2><p>Puedes cambiarla o retirarla cuando quieras: <OpenCookieSettings className="underline" label="Configurar cookies" />. También puedes borrar las cookies desde tu navegador.</p>
    </>) : (<>
      <p>Cookies are small files that the website stores in your browser. We only set the necessary ones without asking; any others only if you accept them. No optional cookie is set before you decide.</p>
      <h2>Cookies we use</h2>
      <ul><li><strong>ilu_consent</strong> (necessary, first-party, 6 months): stores your cookie choice.</li><li><strong>Analytics and marketing</strong> (optional): we do not use any today. If we add them, they will be listed here and only enabled with your permission.</li></ul>
      <h2>How to change your choice</h2><p>You can change or withdraw it at any time: <OpenCookieSettings className="underline" label="Cookie settings" />. You can also delete cookies from your browser.</p>
    </>);
    case "terms": return es ? (<>
      <h2>Vendedor</h2><p>{C.legalName}, R.I.F. {C.rif}, {C.address}.</p>
      <h2>Cómo se compra</h2><p>Esta web es un catálogo: no se paga en línea. Eliges el producto y el modelo, nos escribes por WhatsApp, teléfono o correo y te enviamos disponibilidad y presupuesto. El pedido queda confirmado cuando aceptas el presupuesto por escrito.</p>
      <h2>Precios, pago y entrega</h2><p>El presupuesto indica el precio, los impuestos, la forma de pago, el plazo y el coste de entrega. En pinos gigantes y estructurales, la fabricación, entrega e instalación se acuerdan en un presupuesto aparte.</p>
      <h2>Garantía</h2><p>Los productos tienen la garantía que establece la ley. Si un producto llega dañado o con defectos de fabricación, escríbenos a {C.email} y lo repararemos o sustituiremos.</p>
      <h2>Desistimiento</h2><p>Consulta el <Link href={path("withdrawal", lang)} className="underline">derecho de desistimiento</Link>.</p>
      <h2>Ley aplicable</h2><p>Estas condiciones se rigen por las leyes de la República Bolivariana de Venezuela.</p>
    </>) : (<>
      <h2>Seller</h2><p>{C.legalName}, Tax ID {C.rif}, {C.address}.</p>
      <h2>How to buy</h2><p>This website is a catalog: there are no online payments. Choose the product and model, contact us by WhatsApp, phone or email, and we will send you availability and a quote. The order is confirmed when you accept the quote in writing.</p>
      <h2>Prices, payment and delivery</h2><p>The quote states the price, taxes, payment method, lead time and delivery cost. For giant and structural trees, manufacturing, delivery and installation are agreed in a separate quote.</p>
      <h2>Warranty</h2><p>Products carry the warranty provided by law. If a product arrives damaged or with a manufacturing defect, write to {C.email} and we will repair or replace it.</p>
      <h2>Withdrawal</h2><p>See the <Link href={path("withdrawal", lang)} className="underline">right of withdrawal</Link>.</p>
      <h2>Applicable law</h2><p>These terms are governed by the laws of the Bolivarian Republic of Venezuela.</p>
    </>);
    case "withdrawal": return es ? (<>
      <h2>Plazo</h2><p>Puedes desistir de tu compra sin dar explicaciones dentro de los 14 días naturales siguientes a la recepción del pedido.</p>
      <h2>Cómo ejercerlo</h2><p>Escríbenos a {C.email} con tu nombre, el número de pedido y los productos que devuelves. Puedes usar este modelo:</p>
      <p className="rounded-2xl border border-[var(--line)] p-4 text-sm">A la atención de {C.legalName}, {C.address}: comunico que desisto del contrato de compra de los siguientes productos: ___. Pedido n.º ___, recibido el ___. Nombre: ___. Fecha y firma: ___.</p>
      <h2>Devolución y reembolso</h2><p>Devuelve el producto sin usar y en su embalaje original dentro de los 14 días siguientes a tu comunicación. Te reembolsaremos lo pagado por el mismo medio de pago en un máximo de 14 días desde que recibamos el producto.</p>
      <h2>Excepciones</h2><p>No se aplica a productos fabricados a medida, como los pinos gigantes y estructurales hechos por encargo.</p>
    </>) : (<>
      <h2>Time limit</h2><p>You may withdraw from your purchase without giving reasons within 14 calendar days of receiving the order.</p>
      <h2>How to exercise it</h2><p>Write to {C.email} with your name, the order number and the products you are returning. You can use this template:</p>
      <p className="rounded-2xl border border-[var(--line)] p-4 text-sm">To {C.legalName}, {C.address}: I hereby give notice that I withdraw from the purchase of the following products: ___. Order no. ___, received on ___. Name: ___. Date and signature: ___.</p>
      <h2>Returns and refunds</h2><p>Return the product unused and in its original packaging within 14 days of your notice. We will refund the amount paid using the same payment method within 14 days of receiving the product.</p>
      <h2>Exceptions</h2><p>This does not apply to made-to-order products, such as custom giant and structural trees.</p>
    </>);
  }
}

export default function LegalView({ k, lang }: { k: LegalKey; lang: Lang }) {
  const es = lang === "es";
  return (
    <article className="mx-auto max-w-3xl px-4 pt-14 sm:px-8 sm:pt-20">
      <p role="note" className="mb-6 rounded-2xl border border-[var(--accent)]/40 px-4 py-2 text-sm text-[var(--accent)]">
        {es ? "Borrador pendiente de revisión por un abogado antes de publicar." : "Draft pending legal review before publication."}
      </p>
      <h1 className="font-display condensed text-[clamp(36px,5vw,72px)]">{legalTitles[k][lang]}</h1>
      <p className="mt-3 text-sm text-[var(--cream-2)]">{es ? "Última actualización" : "Last updated"}: {UPDATED[lang]}</p>
      <div className="mt-10 space-y-4 leading-relaxed text-[var(--cream-2)] [&_h2]:font-display [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:text-[var(--cream)] [&_strong]:text-[var(--cream)] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6">
        <Body k={k} lang={lang} />
      </div>
    </article>
  );
}
