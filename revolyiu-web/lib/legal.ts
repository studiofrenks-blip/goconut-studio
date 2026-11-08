// Datos del titular de la web (LSSI art. 10 y RGPD art. 13).
// ⚠️ Los campos `null` deben completarse antes de apuntar el dominio.
export const owner = {
  name: null as string | null, // Nombre completo o razón social
  nif: null as string | null, // NIF / CIF
  address: null as string | null, // Domicilio
  registry: null as string | null, // Datos registrales (solo si es sociedad)
  brand: "Revolyiu",
  email: "revolyiu@gmail.com",
  phone: "+34 661 144 170",
  domain: "revolyiu.com",
  updated: "8 de noviembre de 2026",
};
export const missing = (v: string | null, label: string) => v ?? `[Pendiente: ${label}]`;
