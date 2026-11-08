import ContactView from "@/views/Contact";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({ key: "contact", lang: "es", title: "Contacto y presupuestos", description: "Habla con Adornos ILU por WhatsApp, teléfono o correo. Atendemos a clientes, tiendas, decoradores y distribuidores en toda Venezuela." });

export default function Page() {
  return <ContactView lang="es" />;
}
