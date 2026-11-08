"use client";
// Motor de animaciones. Efectos numerados (data-fx="01"…"06"), más:
// FX 07 botón magnético (data-magnetic), FX 08 parallax (data-parallax="0.1"),
// FX 09 brillo que sigue al cursor, FX 10 vista previa flotante en servicios.
// Ver ANIMACIONES.md para el mapa con el Kit Frenks.
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Motion() {
  const path = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-fx], .steps"));
    if (reduce || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );
    els.forEach((el) => io.observe(el));

    // FX 08 parallax
    const par = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        par.forEach((el) => {
          const r = el.getBoundingClientRect();
          const k = parseFloat(el.dataset.parallax || "0.1");
          el.style.transform = `translate3d(0, ${((r.top + r.height / 2 - vh / 2) * -k).toFixed(1)}px, 0)`;
        });
      });
    };
    if (par.length && window.innerWidth > 900) { onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); }

    // FX 07 magnético (solo con ratón)
    const fine = window.matchMedia("(pointer: fine)").matches;
    const mags: HTMLElement[] = []; void fine;
    const mm = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${(e.clientX - r.left - r.width / 2) * 0.25}px`);
      el.style.setProperty("--my", `${(e.clientY - r.top - r.height / 2) * 0.35}px`);
    };
    const ml = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.setProperty("--mx", "0px"); el.style.setProperty("--my", "0px");
    };
    mags.forEach((m) => { m.addEventListener("mousemove", mm); m.addEventListener("mouseleave", ml); });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      mags.forEach((m) => { m.removeEventListener("mousemove", mm); m.removeEventListener("mouseleave", ml); });
    };
  }, [path]);

  return null;
}
