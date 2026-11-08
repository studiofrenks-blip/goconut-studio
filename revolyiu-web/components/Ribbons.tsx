export default function Ribbons({ a, b }: { a: string[]; b: string[] }) {
  const row = (w: string[]) => [...w, ...w, ...w, ...w].map((t, i) => <span key={i}>{t}</span>);
  return (
    <div className="ribbons" aria-hidden="true">
      <div className="ribbon ribbon--a"><div className="ribbon__track">{row(a)}</div></div>
      <div className="ribbon ribbon--b"><div className="ribbon__track">{row(b)}</div></div>
    </div>
  );
}
