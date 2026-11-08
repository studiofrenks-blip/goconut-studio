// Dos cintas cruzadas, finas y poco inclinadas, con texto en movimiento.
export default function Ribbons({ a, b }: { a: string[]; b: string[] }) {
  const Row = ({ items, rev, cls }: { items: string[]; rev?: boolean; cls: string }) => (
    <div className={`overflow-hidden py-3 ${cls}`}>
      <div className={`marquee flex w-max ${rev ? "rev" : ""}`}>
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0 items-center">
            {[...items, ...items].map((t, i) => (
              <li key={i} className="font-display condensed flex items-center gap-6 whitespace-nowrap px-6 text-2xl sm:text-3xl">{t}<span aria-hidden>✦</span></li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
  return (
    <div aria-hidden className="relative my-4 h-36 overflow-hidden sm:h-44">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[3deg]"><Row items={a} cls="bg-[var(--accent)] text-[var(--bg)]" /></div>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2.5deg]"><Row items={b} rev cls="bg-[var(--cream)] text-[var(--bg)]" /></div>
    </div>
  );
}
