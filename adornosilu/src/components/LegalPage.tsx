export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <article className="legal mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <p role="note" className="mb-6 rounded-lg bg-[var(--berry)]/10 px-4 py-2 text-sm text-[var(--berry)]">
        Borrador pendiente de revisión por un abogado antes de publicar.
      </p>
      <h1 className="font-display text-4xl">{title}</h1>
      <p className="mt-2 text-sm opacity-70">Última actualización: {updated}</p>
      <div className="mt-8 space-y-4 leading-relaxed [&_h2]:font-display [&_h2]:mt-10 [&_h2]:text-2xl [&_ul]:list-disc [&_ul]:pl-6">
        {children}
      </div>
    </article>
  );
}
