import Shell, { baseMetadata, viewport } from "@/components/Shell";

export const metadata = baseMetadata("en");
export { viewport };

export default function Layout({ children }: { children: React.ReactNode }) {
  return <Shell lang="en">{children}</Shell>;
}
