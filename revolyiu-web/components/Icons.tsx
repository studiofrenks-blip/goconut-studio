export const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 12h16M14 6l6 6-6 6" /></svg>
);
export const Phone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
);
export const Mail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);
export const WhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.5-.3Z" /></svg>
);
export const YouTube = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1 31 31 0 0 0 .5-4.8 31 31 0 0 0-.5-4.8ZM9.7 15V9l5.8 3-5.8 3Z" /></svg>
);
/** Iconos de los tres pilares (dibujados en línea, en el degradado de marca). */
export const PillarIcon = ({ n }: { n: number }) => (
  <svg className="pillar__ico" viewBox="0 0 64 64" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`pg${n}`} x1="0" y1="0" x2="64" y2="64"><stop stopColor="#0cf4ed" /><stop offset="1" stopColor="#08ff89" /></linearGradient>
    </defs>
    <g stroke={`url(#pg${n})`} strokeWidth="1.6">
      {n === 0 && (<><circle cx="32" cy="32" r="26" /><circle cx="32" cy="32" r="16" /><circle cx="32" cy="32" r="6" /><path d="M32 2v12M32 50v12M2 32h12M50 32h12" /></>)}
      {n === 1 && (<><path d="M32 6c10 8 14 20 12 34H20C18 26 22 14 32 6Z" /><circle cx="32" cy="26" r="5" /><path d="M20 40l-8 10h10M44 40l8 10H42M28 48l4 10 4-10" /></>)}
      {n === 2 && (<><ellipse cx="32" cy="32" rx="28" ry="11" /><ellipse cx="32" cy="32" rx="28" ry="11" transform="rotate(60 32 32)" /><ellipse cx="32" cy="32" rx="28" ry="11" transform="rotate(120 32 32)" /><circle cx="32" cy="32" r="4" /></>)}
    </g>
  </svg>
);
