// Contenido de respaldo de la web. Si Supabase está configurado, los textos
// se leen de allí (tabla `site_content`) y esto sirve de fallback y de semilla.
import imgs from "./images.json";

export type Img = { src: string; w: number; h: number; alt: string };
const img = (key: keyof typeof imgs, alt: string): Img => ({ ...imgs[key], alt });

export const site = {
  name: "Revolyiu",
  legalName: "Revolyiu",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://revolyiu.com",
  tagline: "Agencia creativa integral",
  description:
    "Agencia creativa integral: branding, diseño gráfico, desarrollo web, marketing creativo, CRM, gestión de talentos y arquitectura e interiorismo. De la idea a la ejecución.",
  phone: "+34 661 144 170",
  phoneHref: "tel:+34661144170",
  email: "revolyiu@gmail.com",
  talentEmail: "youragensee@gmail.com",
  whatsapp: "https://wa.me/34661144170",
  youtube: "https://www.youtube.com/@Revolyiu",
  logo: img("logo-revolyiu", "Revolyiu"),
  isotipo: img("isotipo-revolyiu", "Isotipo de Revolyiu"),
};

export type Service = {
  slug: string;
  code: string;
  name: string;
  navLabel: string;
  short: string;
  kicker: string;
  intro: string;
  ctaLine: string;
  pitchTitle: string;
  pitch: string;
  groups: { title: string; items: string[] }[];
  processTitle: string;
  process: { title: string; text: string }[];
  hero: [Img, Img];
  gallery?: { title: string; layout: "wide" | "square"; items: Img[] };
  faq: { q: string; a: string }[];
  seo: { title: string; description: string };
  soon?: boolean;
};

export const services: Service[] = [
  {
    slug: "diseno-grafico-branding",
    navLabel: "Diseño",
    code: "01",
    name: "Diseño Gráfico & Branding",
    short:
      "Marcas auténticas y con dirección clara: del naming a la identidad visual y verbal, todo alineado para conectar con tu audiencia.",
    kicker: "Marcas poderosas y contenido visual que impacta",
    intro:
      "Unimos estrategia y creatividad para construir identidades visuales sólidas y piezas gráficas memorables. Del concepto de marca a cada material, trabajamos para que todo comunique tu esencia y conecte con tu público. No solo diseñamos: diseñamos con intención.",
    ctaLine: "¿Listo para destacar con una identidad visual única?",
    pitchTitle: "¿Tu comunicación visual representa lo que tu marca es hoy?",
    pitch:
      "Tener buena imagen no basta. Necesitas una marca coherente, profesional y adaptable, que transmita confianza, personalidad y propósito. Combinamos estrategia de marca con diseño gráfico de alto nivel para posicionarte visual y emocionalmente en el mercado.",
    groups: [
      {
        title: "Estrategia de marca",
        items: [
          "Naming y desarrollo conceptual",
          "Posicionamiento, propósito y tono de voz",
          "Storytelling de marca",
          "Dirección creativa general",
        ],
      },
      {
        title: "Identidad visual",
        items: [
          "Logotipos y sistemas gráficos",
          "Paleta cromática, tipografías y estilo visual",
          "Manual de marca (brand book)",
          "Estudios de mercado",
        ],
      },
      {
        title: "Diseño gráfico y contenido visual",
        items: [
          "Flyers y portadas estáticas y animadas",
          "Piezas para redes sociales",
          "Banners publicitarios para web e impresión",
          "Diseño 3D y motion graphics",
          "Presentaciones, catálogos y brochures",
          "Manuales corporativos internos o externos",
        ],
      },
    ],
    processTitle: "Creatividad y estrategia en cada paso",
    process: [
      { title: "Exploración y briefing", text: "Entendemos tu marca, tus necesidades visuales y tus objetivos comerciales." },
      { title: "Estrategia creativa", text: "Definimos tono, estilo visual y estructura gráfica alineados con tu propósito." },
      { title: "Diseño y desarrollo", text: "Creamos desde la identidad hasta cada pieza, con alto impacto visual." },
      { title: "Entrega final", text: "Recibes archivos, guías de uso y versiones listas para usar en cada canal." },
    ],
    hero: [
      img("branding-1", "Equipo creativo de Revolyiu trabajando en una identidad de marca"),
      img("branding-2", "Diseñadora de Revolyiu creando piezas gráficas"),
    ],
    gallery: {
      title: "Logotipos y portadas",
      layout: "square",
      items: [
        img("logo-cliente-07", "Logotipo de Revolyiu"),
        img("portada-musical-1", "Portada musical diseñada por Revolyiu"),
        img("logo-cliente-01", "Logotipo diseñado para un cliente"),
        img("portada-musical-2", "Portada musical «Sirena» diseñada por Revolyiu"),
        img("logo-cliente-02", "Logotipo diseñado para un cliente"),
        img("portada-musical-3", "Portada musical diseñada por Revolyiu"),
        img("logo-cliente-03", "Logotipo diseñado para un cliente"),
        img("portada-musical-4", "Portada musical diseñada por Revolyiu"),
        img("logo-cliente-04", "Logotipo diseñado para un cliente"),
        img("portada-musical-5", "Portada musical diseñada por Revolyiu"),
        img("logo-cliente-05", "Logotipo diseñado para un cliente"),
        img("portada-musical-6", "Portada musical diseñada por Revolyiu"),
        img("logo-cliente-06", "Logotipo diseñado para un cliente"),
      ],
    },
    faq: [
      {
        q: "¿Qué incluye un proyecto de branding?",
        a: "Depende de dónde parte tu marca. Un proyecto completo incluye estrategia (posicionamiento, propósito y tono de voz), naming si hace falta, identidad visual (logotipo, colores, tipografías) y un manual de marca para aplicarla con coherencia.",
      },
      {
        q: "¿Podéis rediseñar una marca que ya existe?",
        a: "Sí. Analizamos lo que funciona y lo que no, y proponemos desde una actualización sutil hasta un rebranding completo, sin perder el reconocimiento que ya tienes.",
      },
      {
        q: "¿Diseñáis piezas sueltas para redes o campañas?",
        a: "Sí: piezas para redes, banners, portadas, presentaciones, catálogos y motion graphics, tanto puntuales como de forma continua.",
      },
    ],
    seo: {
      title: "Diseño gráfico y branding",
      description:
        "Creamos marcas con estrategia: naming, logotipo, identidad visual, manual de marca y piezas gráficas para redes y campañas. Diseñamos con intención.",
    },
  },
  {
    slug: "desarrollo-web",
    navLabel: "Desarrollo Web",
    code: "02",
    name: "Desarrollo Web",
    short:
      "Webs intuitivas, modernas y escalables, con foco en UI/UX, rendimiento, SEO y adaptadas a cada proyecto.",
    kicker: "Ideas convertidas en plataformas digitales potentes",
    intro:
      "Diseñamos experiencias digitales que comunican, venden y conectan. Creamos webs a medida, escalables y alineadas con tu marca, cuidando cada detalle del diseño UI/UX a la estructura técnica. Landing, web corporativa o tienda online: siempre con estrategia.",
    ctaLine: "¿Listo para destacar con tu web?",
    pitchTitle: "Tu web debe evolucionar contigo",
    pitch:
      "Creamos plataformas con propósito, centradas en la experiencia de usuario, el diseño responsive y los resultados medibles. Forma, función y tecnología trabajando juntas para que destaques en digital.",
    groups: [
      {
        title: "Tipos de web que creamos",
        items: [
          "Tiendas online con carrito, pagos e inventario",
          "Webs corporativas para empresas, servicios y marcas personales",
          "Blogs con gestión de artículos, categorías y SEO",
          "Soluciones a medida según tus objetivos",
        ],
      },
      {
        title: "Diseño y experiencia de usuario",
        items: [
          "Diseño visual alineado con tu marca",
          "Adaptación total a móvil, tablet y escritorio",
          "Interfaces intuitivas y estética profesional",
          "Diseño centrado en el usuario",
        ],
      },
      {
        title: "Desarrollo a medida",
        items: [
          "Frontend y backend escalables",
          "Webs autogestionables con CMS a medida",
          "Integración con pasarelas de pago, CRM y API externas",
          "Webs rápidas, seguras y preparadas para crecer",
        ],
      },
      {
        title: "Rendimiento, SEO y soporte",
        items: [
          "SEO técnico: estructura, metadatos y velocidad",
          "Código limpio y tiempos de carga rápidos",
          "Mantenimiento y actualizaciones tras el lanzamiento",
          "Seguridad y copias de seguridad automáticas",
        ],
      },
    ],
    processTitle: "Un proceso ágil y colaborativo, de principio a fin",
    process: [
      { title: "Briefing y análisis", text: "Conocemos tus objetivos, tu audiencia y tus necesidades técnicas." },
      { title: "Diseño UI/UX", text: "Creamos propuestas visuales centradas en la experiencia del usuario." },
      { title: "Desarrollo full stack", text: "Programamos con precisión, uniendo diseño, funcionalidad y rendimiento." },
      { title: "QA y lanzamiento", text: "Probamos a fondo y lanzamos tu web con todo en orden." },
    ],
    hero: [
      img("web-1", "Equipo de desarrollo web de Revolyiu programando"),
      img("web-2", "Desarrolladores de Revolyiu revisando código"),
    ],
    gallery: {
      title: "Webs lanzadas",
      layout: "wide",
      items: [
        img("web-ideaholiks", "Web de Ideaholiks desarrollada por Revolyiu"),
        img("web-drip4you", "Web de Drip4U desarrollada por Revolyiu"),
        img("web-adornosilu", "Web de Adornos Ilu desarrollada por Revolyiu"),
        img("web-revolyiu", "Web de Revolyiu"),
      ],
    },
    faq: [
      {
        q: "¿Cuánto se tarda en lanzar una web?",
        a: "Una landing o web corporativa sencilla suele estar en pocas semanas; una tienda online o un desarrollo a medida lleva más. Te damos un calendario cerrado tras el briefing.",
      },
      {
        q: "¿Podré editar los contenidos yo mismo?",
        a: "Sí. Entregamos webs autogestionables con un gestor de contenidos pensado para que actualices textos, imágenes y artículos sin depender de nadie.",
      },
      {
        q: "¿La web estará optimizada para Google?",
        a: "Sí. Toda web sale con SEO técnico de base: estructura de encabezados, metadatos, datos estructurados, mapa del sitio, velocidad de carga y diseño adaptado a móvil.",
      },
    ],
    seo: {
      title: "Desarrollo web a medida",
      description:
        "Diseño y desarrollo de webs a medida: tiendas online, webs corporativas y blogs rápidos, seguros, adaptados a móvil y optimizados para SEO.",
    },
  },
  {
    slug: "marketing-creativo",
    navLabel: "Marketing",
    code: "03",
    name: "Marketing Creativo",
    short:
      "Estrategias con impacto real: campañas, contenido, redes y publicidad digital centradas en resultados y conexión emocional.",
    kicker: "Campañas con personalidad, estrategia y resultados",
    intro:
      "Creamos contenido que conecta e impulsa. De las redes sociales a la publicidad digital, ejecutamos estrategias a medida para hacer crecer tu marca con autenticidad, innovación y análisis.",
    ctaLine: "Llevemos tu comunicación al siguiente nivel",
    pitchTitle: "Estrategia con el ADN de tu marca",
    pitch:
      "En un entorno digital saturado, destacar exige creatividad, análisis y constancia. Diseñamos estrategias y contenidos que reflejan el ADN de tu marca y se adaptan a cada canal y audiencia.",
    groups: [
      {
        title: "Estrategia y planificación",
        items: [
          "Estudio de mercado y análisis de la competencia",
          "Definición de objetivos y público",
          "Planificación mensual de contenidos",
          "Estrategias personalizadas para cada marca",
        ],
      },
      {
        title: "Creación de contenido",
        items: [
          "Contenido visual para todas las redes",
          "Producción de vídeo para campañas y redes",
          "Diseño adaptado a cada formato: feed, stories, reels",
          "Sesiones fotográficas a medida",
          "Copywriting y storytelling",
          "Ingeniería de sonido para piezas audiovisuales",
        ],
      },
      {
        title: "Redes y community management",
        items: [
          "Gestión integral de redes sociales",
          "Publicación con estrategia y constancia",
          "Interacción con la comunidad y respuesta a mensajes",
          "Seguimiento de perfiles y engagement",
        ],
      },
      {
        title: "Calendario editorial",
        items: [
          "Planificación visual de todas las publicaciones",
          "Coordinación de campañas, fechas clave y lanzamientos",
          "Margen flexible para eventos y cambios de última hora",
        ],
      },
    ],
    processTitle: "Pasos claros para crecer sin parar",
    process: [
      { title: "Diagnóstico", text: "Evaluamos el estado actual de tu marca y tus canales digitales." },
      { title: "Estrategia", text: "Diseñamos el plan según tus objetivos y tu audiencia." },
      { title: "Ejecución", text: "Creamos, diseñamos y publicamos con calidad y coherencia." },
      { title: "Optimización", text: "Medimos resultados y ajustamos para multiplicar el impacto." },
    ],
    hero: [
      img("marketing-1", "Creativa de Revolyiu produciendo contenido para redes"),
      img("marketing-2", "Equipo de marketing de Revolyiu planificando una campaña"),
    ],
    faq: [
      {
        q: "¿Gestionáis las redes sociales de forma completa?",
        a: "Sí: estrategia, calendario, creación de contenido, publicación, interacción con la comunidad e informes de resultados.",
      },
      {
        q: "¿Producís vídeo y fotografía?",
        a: "Sí. Producimos vídeo para campañas y redes, sesiones fotográficas a medida y piezas audiovisuales con ingeniería de sonido.",
      },
      {
        q: "¿Cómo medís los resultados?",
        a: "Fijamos objetivos medibles desde el inicio y revisamos métricas de alcance, interacción y conversión para ajustar la estrategia cada mes.",
      },
    ],
    seo: {
      title: "Marketing creativo y redes sociales",
      description:
        "Estrategia de contenidos, gestión de redes sociales, producción de vídeo y campañas digitales con creatividad, datos y resultados medibles.",
    },
  },
  {
    slug: "soluciones-crm",
    navLabel: "CRM",
    code: "04",
    name: "Soluciones CRM",
    short:
      "Digitalizamos tus procesos: CRM a medida para gestionar contactos, automatizar ventas y fortalecer la relación con tus clientes.",
    kicker: "Automatiza, organiza y cuida a tus clientes",
    intro:
      "Implantamos sistemas CRM adaptados a tu negocio para mejorar tus flujos de trabajo, gestionar oportunidades y fidelizar clientes. Centraliza tus datos y decide mejor con tecnología a tu medida.",
    ctaLine: "Centraliza tus datos y decide mejor",
    pitchTitle: "Escala con control",
    pitch:
      "Un buen CRM te permite crecer sin perder visibilidad ni eficiencia. Analizamos tus procesos y diseñamos una solución personalizada que automatiza tareas, mejora la gestión comercial y te da claridad sobre el día a día.",
    groups: [
      {
        title: "Diagnóstico y planificación",
        items: [
          "Auditoría de procesos y necesidades del negocio",
          "Definición de objetivos y funciones clave",
          "Recomendación de la plataforma ideal",
          "Plan de acción alineado con tu forma de trabajar",
        ],
      },
      {
        title: "Implantación y automatización",
        items: [
          "Configuración del CRM a medida",
          "Automatización de ventas y seguimiento de clientes",
          "Integración con tu web, redes y herramientas actuales",
          "Sincronización con correo, formularios y agendas",
        ],
      },
      {
        title: "Formación y soporte",
        items: [
          "Formación para tu equipo",
          "Documentación de procesos y buenas prácticas",
          "Soporte técnico y funcional tras el lanzamiento",
          "Ajustes y mejoras según el uso real",
        ],
      },
    ],
    processTitle: "Un proceso colaborativo y centrado en resultados",
    process: [
      { title: "Análisis de procesos", text: "Estudiamos cómo opera tu negocio y detectamos qué automatizar y mejorar." },
      { title: "Selección del CRM", text: "Elegimos la plataforma que mejor encaja con tus necesidades comerciales." },
      { title: "Integración y pruebas", text: "Conectamos tus sistemas, hacemos pruebas funcionales y validamos la configuración." },
      { title: "Formación y soporte", text: "Formamos a tu equipo, documentamos procesos y te acompañamos después del lanzamiento." },
    ],
    hero: [
      img("crm-1", "Especialistas de Revolyiu configurando un CRM"),
      img("crm-2", "Equipo de Revolyiu automatizando procesos de venta"),
    ],
    faq: [
      {
        q: "¿Qué CRM recomendáis?",
        a: "El que mejor encaje con tu negocio. Analizamos tus procesos, tu equipo y tu presupuesto antes de recomendar una plataforma o un desarrollo a medida.",
      },
      {
        q: "¿Podéis conectar el CRM con mi web?",
        a: "Sí. Integramos formularios, correo, agendas, redes sociales y otras herramientas para que todos los contactos lleguen al mismo sitio.",
      },
      {
        q: "¿Formáis a mi equipo?",
        a: "Sí. Incluimos formación, documentación de procesos y soporte posterior para que el equipo lo use de verdad.",
      },
    ],
    seo: {
      title: "Soluciones CRM a medida",
      description:
        "Implantación de CRM a medida: automatización de ventas, gestión de contactos, integración con tu web y formación para tu equipo.",
    },
  },
  {
    slug: "gestion-de-talentos",
    navLabel: "Talentos",
    code: "05",
    name: "Gestión de Talentos",
    short:
      "Colaboraciones auténticas entre marcas y talentos: representamos a influencers, artistas y creadores y gestionamos sus campañas.",
    kicker: "Marcas y talentos, conectados con autenticidad",
    intro:
      "Impulsamos colaboraciones auténticas entre marcas y talentos. Representamos a influencers, artistas y creadores, y gestionamos campañas, patrocinios y alianzas estratégicas que generan valor real para ambas partes.",
    ctaLine: "¿Eres marca o talento? Hablemos",
    pitchTitle: "Una agencia de talentos con mirada de marca",
    pitch:
      "Entendemos a las marcas porque las construimos cada día. Por eso sabemos qué talento encaja con cada campaña y cómo hacer que una colaboración se sienta natural, sea creíble y dé resultados.",
    groups: [
      {
        title: "Para talentos",
        items: [
          "Representación de influencers, artistas y creadores",
          "Negociación de campañas y patrocinios",
          "Desarrollo de marca personal",
          "Acompañamiento en la producción de contenido",
        ],
      },
      {
        title: "Para marcas",
        items: [
          "Selección del talento adecuado para cada campaña",
          "Campañas con influencers de principio a fin",
          "Patrocinios y alianzas estratégicas",
          "Seguimiento y medición de resultados",
        ],
      },
    ],
    processTitle: "Cómo trabajamos",
    process: [
      { title: "Encaje", text: "Analizamos marca, audiencia y objetivos para encontrar el talento ideal." },
      { title: "Propuesta", text: "Definimos el concepto, los formatos y las condiciones de la colaboración." },
      { title: "Campaña", text: "Coordinamos la producción y la publicación del contenido." },
      { title: "Resultados", text: "Medimos el impacto y compartimos un informe claro con ambas partes." },
    ],
    hero: [
      img("marketing-1", "Creadora de contenido trabajando con Revolyiu"),
      img("nosotros-2", "Equipo de Revolyiu coordinando una campaña con talentos"),
    ],
    faq: [
      {
        q: "¿A quién representáis?",
        a: "A influencers, artistas y creadores de contenido que buscan crecer profesionalmente y colaborar con marcas afines.",
      },
      {
        q: "¿Cómo contacto con la agencia de talentos?",
        a: `Escríbenos a ${"youragensee@gmail.com"} o llámanos al +34 661 144 170 y te respondemos lo antes posible.`,
      },
    ],
    seo: {
      title: "Gestión de talentos e influencers",
      description:
        "Representamos a influencers, artistas y creadores y conectamos marcas con el talento adecuado: campañas, patrocinios y alianzas estratégicas.",
    },
  },
  {
    slug: "arquitectura-interiorismo",
    navLabel: "Arquitectura",
    code: "06",
    name: "Arquitectura & Interiorismo",
    short:
      "Espacios con intención y personalidad: funcionalidad, estética y experiencia para proyectos residenciales, comerciales y corporativos.",
    kicker: "Espacios funcionales, estéticos y alineados con tu marca",
    intro:
      "Te conectamos con estudios de arquitectura e interiorismo altamente cualificados en España y EE. UU. Hacemos realidad proyectos residenciales y comerciales con creatividad, eficiencia y rigor técnico, del primer concepto a la entrega final.",
    ctaLine: "¿Listo para transformar tu espacio?",
    pitchTitle: "Un espacio que hable por tu marca y cumpla objetivos",
    pitch:
      "Ofrecemos un servicio integral: proyectamos y diseñamos locales comerciales, viviendas, oficinas y espacios gastronómicos, combinando estética, funcionalidad y viabilidad técnica.",
    groups: [
      {
        title: "Diseño y creatividad",
        items: [
          "Arquitectura: espacios funcionales, estéticos y optimizados",
          "Interiorismo: ambientes que reflejan tu esencia",
          "Decoración y rótulos: los detalles que marcan la diferencia",
          "Asesoramiento experto para decidir mejor",
        ],
      },
      {
        title: "Ingeniería y construcción",
        items: [
          "Ingeniería técnica y soluciones constructivas",
          "Reformas integrales y parciales",
          "Dirección de obra y licencias",
          "Planificación financiera de tu inversión",
        ],
      },
      {
        title: "Servicios especializados",
        items: [
          "Modelado 3D y renders: ve tu espacio antes de construirlo",
          "Tramitación completa de permisos y licencias",
          "Asesoría y planes de negocio",
          "Equipamiento y maquinaria para hostelería",
        ],
      },
    ],
    processTitle: "Un proceso integrado y personalizado",
    process: [
      { title: "Análisis y briefing", text: "Evaluamos tus necesidades funcionales, estéticas y de negocio." },
      { title: "Diseño y planificación", text: "Elaboramos planos, imágenes 3D y renders para validarlos contigo." },
      { title: "Permisos y logística", text: "Gestionamos licencias, maquinaria y recursos técnicos." },
      { title: "Obra y puesta en marcha", text: "Supervisamos la obra, el montaje, los detalles y la entrega final." },
    ],
    hero: [
      img("arquitectura-1", "Proyecto de arquitectura contemporánea"),
      img("arquitectura-2", "Proyecto de interiorismo de Revolyiu"),
    ],
    gallery: {
      title: "Proyectos realizados",
      layout: "wide",
      items: [
        img("arq-la-cachapera-valencia-1", "Restaurante La Cachapera en Valencia, interiorismo"),
        img("arq-la-cachapera-valencia-2", "Restaurante La Cachapera en Valencia, detalle del interior"),
        img("arq-pista-techada-exterior", "Pista deportiva techada, vista exterior"),
        img("arq-pista-vista-aerea", "Pista deportiva techada, vista aérea"),
        img("arq-pista-techada-interior", "Pista deportiva techada, vista interior"),
        img("arq-sala-lectura-recepcion", "Sala de lectura, recepción"),
        img("arq-sala-lectura-pasillo", "Sala de lectura, pasillo"),
        img("arq-sala-lectura-exterior", "Sala de lectura, exterior"),
        img("arq-vestidor-1", "Vestidor a medida, vista general"),
        img("arq-vestidor-2", "Vestidor a medida, detalle"),
        img("arq-vestidor-3", "Vestidor a medida, módulos"),
        img("arq-interior-residencial-1", "Interiorismo residencial, salón"),
        img("arq-interior-residencial-2", "Interiorismo residencial, estancia"),
        img("arq-interior-residencial-3", "Interiorismo residencial, detalle"),
        img("arq-la-desayuneria-1", "Local gastronómico La Desayunería"),
        img("arq-la-desayuneria-2", "Local gastronómico La Desayunería, barra"),
        img("arq-parque-alejandra-1", "Proyecto Parque Alejandra"),
        img("arq-parque-alejandra-2", "Proyecto Parque Alejandra, vista general"),
        img("arq-trattoria-1", "Restaurante Trattoria, sala"),
        img("arq-trattoria-2", "Restaurante Trattoria, fachada"),
      ],
    },
    faq: [
      {
        q: "¿En qué países trabajáis?",
        a: "Trabajamos con estudios de arquitectura e interiorismo en España y Estados Unidos.",
      },
      {
        q: "¿Os encargáis de las licencias?",
        a: "Sí. Tramitamos permisos y licencias, y supervisamos la obra para que todo cumpla la normativa.",
      },
      {
        q: "¿Puedo ver el resultado antes de construir?",
        a: "Sí. Preparamos modelado 3D y renders para que valides cada espacio antes de empezar la obra.",
      },
    ],
    seo: {
      title: "Arquitectura e interiorismo",
      description:
        "Arquitectura, interiorismo y reformas para viviendas, locales, oficinas y restaurantes en España y EE. UU.: diseño, renders 3D, licencias y obra.",
    },
  },
];

export const home = {
  title: "Revolyiu, agencia creativa integral",
  heroLead:
    "Soluciones digitales completas, de la idea a la ejecución. Ayudamos a las marcas a crecer con impacto y coherencia.",
  heroImg: img("hero-equipo-revolyiu", "Astronautas del equipo Revolyiu creando en su estudio"),
  pillarsKicker: "Tres pilares de nuestra metodología",
  pillarsTitle: "¿Por qué elegir Revolyiu?",
  pillars: [
    { title: "Estrategia sólida", text: "Construimos desde los cimientos: marca, mensaje y propósito." },
    { title: "Campañas en marcha", text: "Conceptos creativos, landings, contenido y publicidad digital." },
    { title: "Ejecución impecable", text: "Diseño web, producción audiovisual, gráfica y soporte integral." },
  ],
  visionKicker: "Hablemos de tu próximo proyecto",
  visionTitle: "Tu visión, nuestra próxima creación",
  vision: [
    "Queremos conocer tu visión y ayudarte a hacerla realidad. Una estrategia de branding potente, contenido creativo para redes, una web a medida, un CRM para escalar, campañas con influencers o un espacio físico transformado: te acompañamos en cada paso.",
    "Cuéntanos tu marca, tus metas y tus ideas. Diseñaremos una propuesta estratégica que una creatividad, tecnología y resultados.",
  ],
  visionImg: img("proyecto-destacado", "Equipo de Revolyiu en una sesión de trabajo"),
  aboutKicker: "Sobre nosotros",
  aboutTitle: "Hacemos crecer tu negocio",
  about: [
    "Combinamos estrategia, diseño y tecnología para transformar ideas en marcas memorables. Hemos trabajado con empresas de todos los tamaños, de startups emergentes a compañías consolidadas, con una mentalidad ágil, creativa y orientada a resultados.",
    "Nos apasiona crear soluciones que no solo se vean bien, sino que funcionen: generamos tráfico, aumentamos la visibilidad y multiplicamos las conversiones.",
  ],
  aboutImgs: [
    img("nosotros-1", "Equipo de Revolyiu"),
    img("nosotros-2", "Creativos de Revolyiu trabajando"),
  ] as Img[],
  motto: "Basados en creatividad. Impulsados por estrategia.",
};

export const about = {
  title: "Nosotros",
  kicker: "Basados en creatividad. Impulsados por estrategia.",
  lead:
    "Somos una agencia creativa integral. Reunimos bajo un mismo techo estrategia, diseño, tecnología, marketing, talento y espacios para que tu marca avance en una sola dirección.",
  body: [
    "Combinamos estrategia, diseño y tecnología para transformar ideas en marcas memorables. Hemos trabajado con empresas de todos los tamaños, de startups emergentes a compañías consolidadas, con una mentalidad ágil, creativa y orientada a resultados.",
    "Nos apasiona crear soluciones que no solo se vean bien, sino que funcionen: generamos tráfico, aumentamos la visibilidad y multiplicamos las conversiones. Cada cliente es único, y por eso nuestro enfoque es personal y está alineado con tu propósito y tus objetivos de negocio.",
  ],
  values: [
    { title: "Visión integral", text: "Seis disciplinas coordinadas. Un único equipo y un mensaje coherente en todos tus puntos de contacto." },
    { title: "Creatividad con datos", text: "Ideas que llaman la atención y métricas que demuestran que funcionan." },
    { title: "Trato cercano", text: "Escuchamos primero. Proponemos después. Y te acompañamos hasta el final." },
  ],
  imgs: [
    img("nosotros-1", "Equipo de Revolyiu"),
    img("nosotros-2", "Creativos de Revolyiu trabajando"),
  ] as Img[],
};

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  published_at: string;
  updated_at?: string;
  cover: Img | null;
  body_md: string;
  author?: string;
};

export const fallbackPosts: Post[] = [
  {
    slug: "likes-no-pagan-las-cuentas",
    title: "Los likes no pagan las cuentas (una buena estrategia, sí)",
    excerpt:
      "¿Publicas todos los días y aun así nadie compra? Quizá no te falta contenido, sino una estrategia creativa que convierta tus redes en una máquina de resultados.",
    category: "Marketing",
    published_at: "2021-09-12",
    cover: img("blog-likes-estrategia", "Estrategia de marketing en redes sociales"),
    author: "Equipo Revolyiu",
    body_md: `¿Publicas todos los días y aun así nadie compra? Quizá no te falta contenido, sino una **estrategia creativa** que convierta tus redes en una máquina de resultados.

## 1. Creatividad sin dirección es solo ruido

La clave es tener una estrategia de contenido que conecte con tu audiencia, con objetivos claros y formatos bien pensados: reels, stories, carruseles, TikToks, campañas integradas… Todo con un propósito.

## 2. La fórmula: contenido útil + emoción + constancia

No se trata de vender en cada publicación, sino de **aportar valor, entretener y enseñar**. Una comunidad se gana, no se compra. Con contenido creativo y auténtico construyes una relación duradera con tu público.

## 3. Datos + creatividad = resultados

Medimos, analizamos y ajustamos. La creatividad sin métricas es arte; nosotros hacemos marketing: **campañas que se ven bien y funcionan mejor**.

## 4. Humaniza tu marca (y disfruta del proceso)

No le hables a tu audiencia como un robot corporativo. Las marcas que más conectan hoy se atreven a ser humanas: cuentan historias reales y muestran errores, logros, procesos y personas.

---

En Revolyiu no solo diseñamos campañas bonitas. Creamos estrategias pensadas para conectar, generar resultados y hacer crecer tu marca de verdad.

**¿Tu marca está lista para sonar fuerte en redes?** [Hablemos](/contacto/).`,
  },
];

export const nav = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros/", label: "Nosotros" },
  { href: "/servicios/", label: "Servicios" },
  { href: "/blog/", label: "Blog" },
  { href: "/contacto/", label: "Contacto" },
];
