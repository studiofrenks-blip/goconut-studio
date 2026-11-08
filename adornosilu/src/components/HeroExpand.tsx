"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Animación 5 del Kit Frenks: la foto pequeña crece hasta llenar la pantalla al bajar
// y el titular se parte en dos y se aparta a los lados.
export default function HeroExpand() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const w = useTransform(scrollYProgress, [0, 0.7], ["min(62vw, 340px)", "100vw"]);
  const h = useTransform(scrollYProgress, [0, 0.7], ["min(78vw, 440px)", "100svh"]);
  const radius = useTransform(scrollYProgress, [0, 0.7], [28, 0]);
  const left = useTransform(scrollYProgress, [0, 0.7], ["0vw", "-60vw"]);
  const right = useTransform(scrollYProgress, [0, 0.7], ["0vw", "60vw"]);
  const veil = useTransform(scrollYProgress, [0.55, 0.85], [0, 1]);
  const intro = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section ref={ref} aria-label="Portada" className={reduce ? "relative bg-[var(--night)]" : "relative h-[230svh] bg-[var(--night)]"}>
      <div className="sticky top-0 grid h-svh place-items-center overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#24493a_0%,transparent_60%)]" />
        <motion.div style={reduce ? { width: "100vw", height: "100svh" } : { width: w, height: h, borderRadius: radius }} className="relative overflow-hidden shadow-2xl">
          <Image src="/marca/pino-gigante-noche.jpg" alt="Pino gigante Adornos ILU iluminado de noche" fill priority sizes="100vw" className="object-cover" />
          <motion.div style={{ opacity: reduce ? 1 : veil }} className="absolute inset-0 bg-gradient-to-t from-[var(--night)] via-[var(--night)]/40 to-transparent" />
        </motion.div>

        <h1 className="font-display pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[clamp(2.6rem,9vw,7.5rem)] leading-[0.95] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,.55)]">
          <motion.span style={{ x: reduce ? 0 : left }} className="block">Donde nace</motion.span>
          <motion.span style={{ x: reduce ? 0 : right }} className="block italic text-[var(--gold)]">la Navidad</motion.span>
          <span className="sr-only"> en Venezuela: pinos, coronas y guirnaldas Adornos ILU</span>
        </h1>

        <motion.p style={{ opacity: reduce ? 1 : intro }} className="absolute inset-x-0 bottom-8 text-center text-xs font-semibold uppercase tracking-[0.3em] text-white/75">
          Más de 60 años de tradición · Baja
        </motion.p>

        <motion.div style={{ opacity: reduce ? 1 : veil }} className="absolute inset-x-0 bottom-0 px-4 pb-14 text-center text-white sm:pb-20">
          <p className="mx-auto max-w-xl text-lg leading-relaxed text-white/90">
            Fabricantes venezolanos de pinos, coronas y guirnaldas que conservan su forma, brillo y estructura año tras año.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/catalogo" className="pointer-events-auto rounded-full bg-[var(--gold)] px-7 py-3 text-sm font-semibold text-[var(--night)]">Ver el catálogo</Link>
            <Link href="/nosotros" className="pointer-events-auto rounded-full border border-white/50 px-7 py-3 text-sm font-semibold">Nuestra historia</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
