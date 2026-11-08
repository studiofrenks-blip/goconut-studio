// Dos cintas cruzadas tipo «backstage», con texto en movimiento.
export default function Tapes({ a, b }: { a: string[]; b: string[] }) {
  const row = (items: string[]) => [...items, ...items, ...items, ...items];
  return (
    <div className="tapes" aria-hidden="true">
      <div className="tape tape-a">
        <div className="tape-track">
          {row(a).map((w, i) => (
            <span key={i}>{w} ✦</span>
          ))}
        </div>
      </div>
      <div className="tape tape-b">
        <div className="tape-track rev">
          {row(b).map((w, i) => (
            <span key={i}>{w} ✺</span>
          ))}
        </div>
      </div>
    </div>
  );
}
