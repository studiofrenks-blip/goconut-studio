// Cinta de texto que se desplaza sin fin.
export default function Marquee({ items, dark = false }: { items: string[]; dark?: boolean }) {
  const row = [...items, ...items];
  return (
    <div aria-hidden className={`overflow-hidden border-y py-5 ${dark ? "border-white/10 bg-[var(--night)] text-white" : "border-[var(--line)]"}`}>
      <div className="marquee flex w-max gap-10">
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0 items-center gap-10">
            {row.map((t, i) => (
              <li key={`${k}-${i}`} className="font-display flex items-center gap-10 whitespace-nowrap text-3xl sm:text-5xl">
                {t}<span className="text-[var(--gold)]">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
