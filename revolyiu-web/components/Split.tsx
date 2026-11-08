// FX 03: divide un texto en palabras para animarlas una a una.
export default function Split({ text, offset = 0 }: { text: string; offset?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span key={i}>
          <span className="wm"><span className="w" style={{ ["--i" as string]: i + offset }}>{w}</span></span>{" "}
        </span>
      ))}
    </>
  );
}
