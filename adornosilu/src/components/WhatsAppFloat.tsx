"use client";
import { useEffect, useRef } from "react";
import { t } from "@/lib/dict";
import type { Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.6-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.5 3.9 1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}

// Burbuja en colores de marca. Se esconde cuando ya hay otro botón de WhatsApp a la vista.
export default function WhatsAppFloat({ lang }: { lang: Lang }) {
  const d = t(lang);
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const visible = new Set<Element>();
    const update = () => ref.current?.setAttribute("data-hidden", visible.size || scrollY < innerHeight * 0.8 ? "1" : "0");
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      update();
    });
    addEventListener("scroll", update, { passive: true });
    update();
    const watch = () => document.querySelectorAll("[data-wa]").forEach((el) => io.observe(el));
    watch();
    const mo = new MutationObserver(watch);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { io.disconnect(); mo.disconnect(); removeEventListener("scroll", update); };
  }, []);
  return (
    <a ref={ref} href={`https://wa.me/${site.company.whatsapp}?text=${encodeURIComponent(d.whatsappMsg)}`} target="_blank" rel="noopener" aria-label={d.whatsappCta}
      data-hidden="1" className="wa-float fixed bottom-6 right-6 z-30 grid size-12 sm:size-14 place-items-center rounded-full border border-[var(--accent)]/40 bg-[#6f1321] text-[var(--accent)] shadow-[0_10px_30px_rgba(0,0,0,.4)] transition-[opacity,transform] duration-300 sm:right-6">
      <WhatsAppIcon className="size-7" />
    </a>
  );
}
