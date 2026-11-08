"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Animación 5 del Kit Frenks, versión legible: el titular va sobre crema (nunca sobre la foto),
// se parte en dos al bajar y la foto crece por debajo hasta llenar la pantalla.
export default function HeroExpand() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const w = useTransform(scrollYProgress, [0, 0.75], ["min(88vw, 760px)", "100vw"]);
  const h = useTransform(scrollYProgress, [0, 0.75], ["min(46vw, 380px)", "100svh"]);
  const radius = useTransform(scrollYProgress, [0, 0.75], [32, 0]);
  const y = useTransform(scrollYProgress, [0, 0.75], ["0svh", "-34svh"]);
  const left = useTransform(scrollYProgress, [0, 0.5], ["0vw", "-70vw"]);
  const right = useTransform(scrollYProgress, [0, 0.5], ["0vw", "70vw"]);
  const fade = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  if (reduce) {
    return (
      <section aria-label="Portada" className="mx-auto max-w-6xl px-4 pt-14 text-center sm:px-6">
        <Headline />
        <Intro />
        <div className="relative mt-10 aspect-[16/8] overflow-hidden rounded-[2rem]">
          <Image src="/marca/pino-gigante-plaza.jpg" alt="Pino gigante Adornos ILU instalado en una plaza" fill priority sizes="100vw" className="object-cover object-[50%_35%]" />
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} aria-label="Portada" className="relative h-[240svh]">
      <p className="sr-only">Navidad 2026</p>
      <div className="sticky top-0 flex h-svh flex-col items-center overflow-hidden pt-[8svh] text-center">
        <p className="mb-4 text-[13px] font-semibold uppercase tracking-wide text-[var(--gold-ink)]">Más de 60 años · Hecho en Venezuela</p>
        <h1 className="font-display px-4 text-[clamp(3rem,9.5vw,8rem)] leading-[0.95]">
          <motion.span style={{ x: left }} className="block">Donde nace</motion.span>
          <motion.span style={{ x: right }} className="block">la <span className="font-serif-accent text-[var(--gold-ink)]">Navidad.</span></motion.span>
          <span className="sr-only"> en Venezuela: pinos, coronas y guirnaldas Adornos ILU</span>
        </h1>
        <motion.div style={{ opacity: fade }}><Intro /></motion.div>
        <motion.div style={{ width: w, height: h, borderRadius: radius, y }} className="relative mt-8 shrink-0 overflow-hidden shadow-[0_30px_80px_-20px_rgba(15,31,23,.45)]">
          <Image src="/marca/pino-gigante-plaza.jpg" alt="Pino gigante Adornos ILU instalado en una plaza" fill priority sizes="100vw" className="object-cover object-[50%_35%]" />
        </motion.div>
      </div>
    </section>
  );
}

function Headline() {
  return (
    <h1 className="font-display text-[clamp(3rem,9.5vw,8rem)] leading-[0.95]">
      Donde nace la <span className="font-serif-accent text-[var(--gold-ink)]">Navidad.</span>
      <span className="sr-only"> en Venezuela: pinos, coronas y guirnaldas Adornos ILU</span>
    </h1>
  );
}

function Intro() {
  return (
    <div className="px-4">
      <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[var(--ink)]/80">
        Fabricantes venezolanos de pinos, coronas y guirnaldas desde hace más de 60 años.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/catalogo" className="inline-flex min-h-12 items-center rounded-full bg-[var(--night)] px-7 text-sm font-semibold text-white">Ver el catálogo</Link>
        <Link href="/contacto" className="inline-flex min-h-12 items-center px-4 text-sm font-semibold text-[var(--gold-ink)] hover:underline">Pide asesoría ›</Link>
      </div>
    </div>
  );
}
