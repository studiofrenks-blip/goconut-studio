"use client";
// Botón «Hablemos» fijo en el móvil: aparece tras la primera pantalla y se
// esconde cerca del pie y en la página de contacto (ahí ya no hace falta).
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function FloatCta({ href, label }: { href: string; label: string }) {
  const [on, setOn] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    const check = () => {
      const y = window.scrollY;
      const nearEnd = window.innerHeight + y > document.documentElement.scrollHeight - 700;
      const cookieOpen = !!document.querySelector(".cookie");
      setOn(y > window.innerHeight * 0.8 && !nearEnd && !cookieOpen);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [pathname]);
  if (pathname === href) return null;
  return (
    <Link href={href} className="btn btn-lime float-cta" data-on={on ? "1" : "0"} tabIndex={on ? 0 : -1} aria-hidden={!on}>
      {label} <span className="arrow" aria-hidden="true">→</span>
    </Link>
  );
}
