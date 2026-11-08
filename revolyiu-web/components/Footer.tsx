import Link from "next/link";
import { services, site } from "@/lib/content";
import CookieSettingsLink from "./CookieSettingsLink";

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr__grid">
          <div>
            <img src={site.logo.src} width={150} height={Math.round((150 * site.logo.h) / site.logo.w)} alt="Revolyiu" loading="lazy" />
            <p className="ftr__claim">Agencia creativa integral. Basados en creatividad, impulsados por estrategia.</p>
          </div>
          <div>
            <h2>Servicios</h2>
            <ul>
              {services.map((s) => (
                <li key={s.slug}><Link href={`/${s.slug}/`}>{s.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Agencia</h2>
            <ul>
              <li><Link href="/nosotros/">Nosotros</Link></li>
              <li><Link href="/servicios/">Servicios</Link></li>
              <li><Link href="/blog/">Blog</Link></li>
              <li><Link href="/contacto/">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h2>Contacto</h2>
            <ul>
              <li><a href={site.phoneHref}>{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
              <li><a href={site.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href={site.youtube} target="_blank" rel="noopener noreferrer">YouTube</a></li>
            </ul>
          </div>
        </div>
        <div className="ftr__bottom">
          <span>© {new Date().getFullYear()} Revolyiu. Todos los derechos reservados.</span>
          <nav aria-label="Legal">
            <Link href="/aviso-legal/">Aviso legal</Link>
            <Link href="/politica-de-privacidad/">Privacidad</Link>
            <Link href="/politica-de-cookies/">Cookies</Link>
            <CookieSettingsLink />
          </nav>
        </div>
      </div>
    </footer>
  );
}
