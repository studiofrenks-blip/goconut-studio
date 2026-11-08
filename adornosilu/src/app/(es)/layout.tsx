import Shell, { baseMetadata, viewport } from "@/components/Shell";

export const metadata = baseMetadata("es");
export { viewport };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell lang="es">{children}</Shell>;
}
