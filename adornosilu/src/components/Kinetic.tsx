import InView from "./InView";

// Titular de sección con tipografía cinética (se estira una vez al entrar).
export default function Kinetic({ as = "h2", id, children, className = "" }: { as?: "h1" | "h2" | "h3"; id?: string; children: React.ReactNode; className?: string }) {
  return <InView as={as} id={id} className={`kinetic font-display condensed t-section ${className}`}>{children}</InView>;
}
