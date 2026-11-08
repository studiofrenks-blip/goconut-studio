import Link from "next/link";
import Image from "next/image";
import imgs from "@/lib/images.json";
import { getHome, getPosts, getServices } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import HeroMorph from "@/components/HeroMorph";
import ServiceStack from "@/components/ServiceStack";
import Ribbons from "@/components/Ribbons";
import LitText from "@/components/LitText";
import CtaBlock from "@/components/CtaBlock";
import PostCard from "@/components/PostCard";
import { Arrow } from "@/components/Icons";

export const metadata = {
  ...pageMeta({
    title: "Agencia creativa integral: marcas, webs y espacios",
    description:
      "Agencia creativa integral: branding, diseño gráfico, desarrollo web, marketing, CRM, gestión de talentos y arquitectura. De la idea a la ejecución.",
    path: "/",
  }),
  title: { absolute: "Revolyiu | Agencia creativa integral" },
};

const P = (k: keyof typeof imgs, alt = "") => ({ ...imgs[k], alt });
const morphPhotos = [
  P("arq-la-cachapera-valencia-1"), P("branding-1"), P("portada-musical-2"), P("web-1"),
  P("arq-trattoria-1"), P("marketing-1"), P("logo-cliente-07"), P("crm-1"),
  P("arq-vestidor-1"), P("portada-musical-4"), P("arq-pista-vista-aerea"), P("marketing-2"),
];
const ICONS = ["/img/icono-Chess-Icon.svg", "/img/icono-megaphone.svg", "/img/icono-vector.svg"];

export default async function Home() {
  const [home, services, posts] = await Promise.all([getHome(), getServices(), getPosts()]);
  return (
    <>
      <section className="hero2" aria-labelledby="h1">
        <HeroMorph photos={morphPhotos} />
        <div className="wrap hero2__in">
          <h1 id="h1">
            <span className="sr-only">Revolyiu, agencia creativa integral: revolucionamos marcas, espacios, webs y personas.</span>
            <span className="h1v" aria-hidden="true">
              <span className="intro--up" style={{ display: "block" }}>Revolucionamos</span>
              <span className="rotator">
                <span>marcas</span><span>espacios</span><span>webs</span><span>personas</span>
              </span>
            </span>
          </h1>
          <p className="lead intro--up" style={{ ["--d" as string]: "0.3s" }}>{home.heroLead}</p>
          <div className="hero__ctas intro--up" style={{ ["--d" as string]: "0.45s" }}>
            <Link href="/contacto/" className="btn btn--primary" data-magnetic>Contacta con un experto <Arrow /></Link>
            <Link href="/servicios/" className="btn" data-magnetic>Ver servicios</Link>
          </div>
        </div>
      </section>

      <section className="section" aria-label="Quiénes somos">
        <div className="wrap">
          <p className="kicker">Agencia creativa integral</p>
          <LitText text="Unimos *estrategia,* *diseño* y *tecnología* para que tu marca, tu web y tus espacios cuenten la misma historia. De la idea a la ejecución, con un solo equipo." />
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="svc-t">
        <div className="wrap">
          <p className="kicker">Nuestros servicios</p>
          <h2 id="svc-t" className="h-sec stretch" style={{ marginBottom: 56 }}>Seis disciplinas, un equipo</h2>
          <ServiceStack items={services} />
        </div>
      </section>

      <Ribbons a={services.map((s) => s.name)} b={["Estrategia", "Diseño", "Tecnología", "Espacios", "Talento", "Resultados"]} />

      <section className="section" aria-labelledby="pil-t">
        <div className="wrap">
          <p className="kicker">{home.pillarsKicker}</p>
          <h2 id="pil-t" className="h-sec stretch">{home.pillarsTitle}</h2>
          <div className="pillars" data-fx="06">
            {home.pillars.map((p, i) => (
              <article className="pillar" key={p.title}>
                <span className="pillar__n">0{i + 1}</span>
                <span className="pillar__ico3d"><img src={ICONS[i]} alt="" width="46" height="46" loading="lazy" /></span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }} aria-labelledby="ab-t">
        <div className="wrap split">
          <div className="photo" data-fx="05">
            <Image src={home.aboutImgs[0].src} alt={home.aboutImgs[0].alt} width={home.aboutImgs[0].w} height={home.aboutImgs[0].h} sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
          <div>
            <p className="kicker">{home.aboutKicker}</p>
            <h2 id="ab-t" className="h-sec stretch">{home.aboutTitle}</h2>
            <div data-fx="01" style={{ marginTop: 28 }}>
              {home.about.map((p) => <p className="lead" key={p.slice(0, 20)} style={{ marginBottom: 20 }}>{p}</p>)}
              <div className="btn-row" style={{ display: "flex", gap: 12, marginTop: 12 }}>
                <Link href="/nosotros/" className="btn" data-magnetic>Conócenos <Arrow /></Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="section" style={{ paddingTop: 0 }} aria-labelledby="blog-t">
          <div className="wrap">
            <p className="kicker">Blog</p>
            <h2 id="blog-t" className="h-sec stretch" style={{ marginBottom: 40 }}>Ideas de marketing y diseño</h2>
            <div className="posts" data-fx="06">{posts.slice(0, 3).map((p) => <PostCard key={p.slug} post={p} />)}</div>
          </div>
        </section>
      )}

      <CtaBlock />
    </>
  );
}
