// Cabecera de página interior: palabra gigante de fondo, titular y entradilla.
export default function PageHero({
  kicker,
  title,
  lead,
  watermark,
  size = "lg",
}: {
  kicker: string;
  title: string;
  lead?: string;
  watermark?: string;
  size?: "lg" | "xl";
}) {
  return (
    <section className="page-hero">
      <div className="grain" aria-hidden="true" />
      {watermark && (
        <span className="watermark" aria-hidden="true">
          {watermark}
        </span>
      )}
      <div className="wrap">
        <p className="kicker">{kicker}</p>
        <h1 className={size === "xl" ? "mega-xl" : "mega"}>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}
