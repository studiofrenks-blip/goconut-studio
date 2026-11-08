import Link from "next/link";
import Image from "next/image";
import { getHome, getPosts, getServices } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import ServiceCards from "@/components/ServiceCards";
import CtaBlock from "@/components/CtaBlock";
import Split from "@/components/Split";
import PostCard from "@/components/PostCard";
import { Arrow } from "@/components/Icons";

export const metadata = {
  ...pageMeta({
    title: "Agencia creativa integral: branding, web y marketing",
    description:
      "Agencia creativa integral: branding, diseño gráfico, desarrollo web, marketing, CRM, gestión de talentos y arquitectura. De la idea a la ejecución.",
    path: "/",
  }),
  title: { absolute: "Revolyiu | Agencia creativa integral: branding, web y marketing" },
};

export default async function Home() {
  const [home, services, posts] = await Promise.all([getHome(), getServices(), getPosts()]);
  return (
    <>
      <section className="hero">
        <div className="wrap hero__grid">
          <div>
            <p className="kicker">Revolyiu · Agencia creativa integral</p>
            <h1 className="intro intro--words">
              <span className="line"><Split text="Revolucionamos" /></span>
              <span className="line grad"><Split text="marcas, espacios" offset={1} /></span>
              <span className="line"><Split text="y personas." offset={3} /></span>
            </h1>
            <p className="lead hero__lead intro intro--up" style={{ ["--d" as string]: "0.35s" }}>{home.heroLead}</p>
            <div className="hero__ctas intro intro--up" style={{ ["--d" as string]: "0.5s" }}>
              <Link href="/contacto/" className="btn btn--primary" data-magnetic>Contacta con un experto <Arrow /></Link>
              <Link href="/servicios/" className="btn" data-magnetic>Ver servicios</Link>
            </div>
            <div className="hero__meta intro intro--up" style={{ ["--d" as string]: "0.65s" }}>
              <span><b>6</b> disciplinas</span>
              <span><b>1</b> equipo</span>
              <span><b>ES · EE. UU.</b></span>
            </div>
          </div>
          <div className="hero__visual intro intro--orbit">
            <div className="orbit">
              <div className="orbit__ring orbit__ring--3" />
              <div className="orbit__ring" />
              <div className="orbit__ring orbit__ring--2" />
              <div className="orbit__sat orbit__sat--3"><i /></div>
              <div className="orbit__sat"><i /></div>
              <div className="orbit__sat orbit__sat--2"><i /></div>
              <div className="orbit__img">
                <Image src={home.heroImg.src} alt={home.heroImg.alt} width={home.heroImg.w} height={home.heroImg.h} priority quality={70} sizes="(max-width: 900px) 330px, 460px" />
              </div>
              <span className="orbit__label orbit__label--a">✦ Estrategia</span>
              <span className="orbit__label orbit__label--b">Diseño ✦</span>
              <span className="orbit__label orbit__label--c">Tecnología ✦</span>
            </div>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[...services, ...services].map((s, i) => <span key={i}>{s.name}</span>)}
        </div>
      </div>

      <section className="section" aria-labelledby="svc-t">
        <div className="wrap">
          <div className="svc-head">
            <div>
              <p className="kicker">Nuestros servicios</p>
              <h2 id="svc-t" className="h-lg" data-fx="03"><Split text="Todo lo que tu marca necesita," /> <Split text="en un solo equipo" offset={5} /></h2>
            </div>
            <p className="lead" style={{ maxWidth: "38ch" }}>Seis disciplinas coordinadas para que estrategia, imagen y ejecución vayan en la misma dirección.</p>
          </div>
          <ServiceCards items={services} />
        </div>
      </section>

      <section className="section" aria-labelledby="pil-t">
        <div className="wrap">
          <p className="kicker">{home.pillarsKicker}</p>
          <h2 id="pil-t" className="h-lg" data-fx="03"><Split text={home.pillarsTitle} /></h2>
          <div className="pillars" data-fx="06">
            {home.pillars.map((p, i) => (
              <article className="pillar" key={p.title}>
                <span className="pillar__n">0{i + 1} / 03</span>
                <span className="pillar__ico3d"><img src={["/img/icono-Chess-Icon.svg", "/img/icono-megaphone.svg", "/img/icono-vector.svg"][i]} alt="" width="56" height="56" loading="lazy" /></span>
                <h3>{p.title}</h3>
                <p>{p.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="vis-t">
        <div className="wrap"><div className="vision-card split">
          <div className="frame" data-fx="05" style={{ maxWidth: 440 }}>
            <Image src={home.visionImg.src} alt={home.visionImg.alt} width={home.visionImg.w} height={home.visionImg.h} sizes="(max-width: 900px) 100vw, 45vw" />
          </div>
          <div>
            <p className="kicker">{home.visionKicker}</p>
            <h2 id="vis-t" className="h-lg" data-fx="03"><Split text={home.visionTitle} /></h2>
            <div data-fx="01" style={{ marginTop: 28 }}>
              {home.vision.map((p) => <p className="muted" key={p.slice(0, 20)}>{p}</p>)}
              <Link href="/contacto/" className="btn btn--primary" style={{ marginTop: 16 }} data-magnetic>Envíanos un mensaje <Arrow /></Link>
            </div>
          </div>
        </div></div>
      </section>

      <section className="section" aria-labelledby="ab-t">
        <div className="wrap split split--rev">
          <div className="duo">
            <div className="frame" data-parallax="0.04"><Image src={home.aboutImgs[0].src} alt={home.aboutImgs[0].alt} width={home.aboutImgs[0].w} height={home.aboutImgs[0].h} sizes="(max-width: 900px) 50vw, 24vw" /></div>
            <div className="frame" data-parallax="-0.04"><Image src={home.aboutImgs[1].src} alt={home.aboutImgs[1].alt} width={home.aboutImgs[1].w} height={home.aboutImgs[1].h} sizes="(max-width: 900px) 50vw, 24vw" /></div>
          </div>
          <div>
            <p className="kicker">{home.aboutKicker}</p>
            <h2 id="ab-t" className="h-lg" data-fx="03"><Split text={home.aboutTitle} /></h2>
            <div data-fx="01" style={{ marginTop: 28 }}>
              {home.about.map((p) => <p className="muted" key={p.slice(0, 20)}>{p}</p>)}
              <p className="motto">{home.motto}</p>
              <Link href="/nosotros/" className="btn" data-magnetic>Conócenos mejor <Arrow /></Link>
            </div>
          </div>
        </div>
      </section>

      {posts.length > 0 && (
        <section className="section" aria-labelledby="blog-t">
          <div className="wrap">
            <div className="svc-head">
              <div>
                <p className="kicker">Blog</p>
                <h2 id="blog-t" className="h-lg" data-fx="03"><Split text="Ideas de marketing y diseño" /></h2>
              </div>
              <Link href="/blog/" className="btn" data-magnetic>Leer el blog <Arrow /></Link>
            </div>
            <div className="posts" data-fx="06">
              {posts.slice(0, 3).map((p) => <PostCard key={p.slug} post={p} />)}
            </div>
          </div>
        </section>
      )}

      <CtaBlock />
    </>
  );
}
