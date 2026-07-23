import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CUT_COUNT,
  aboutImages,
  handleImageError,
  heroImages,
  localImageAttrs,
  portfolioCuts,
  serviceImages,
  workCollage,
} from "./config/images";
import { faqs, siteConfig, testimonials } from "./config/siteConfig";
import { BrandLogo } from "./components/BrandLogo";
import { SiteImage } from "./components/SiteImage";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

gsap.registerPlugin(ScrollTrigger);

/* ---------- Color tokens (black with white accents) ---------- */
const ACCENT = "#FFFFFF"; // white is accent now
const ACCENT_RGB = "255, 255, 255";
const BG = "#0A090C"; // dark background
const CARD = "#1A1A1A"; // dark card
const CREAM = "#FFFFFF";

/* ---------- Icons ---------- */
type IconProps = { className?: string; style?: React.CSSProperties };

const ScissorsIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
    <path d="M20 4L8.12 15.88" />
    <path d="M14.47 14.48L20 20" />
    <path d="M8.12 8.12L12 12" />
  </svg>
);

const ArrowRight = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14" />
    <path d="M13 5l7 7-7 7" />
  </svg>
);

const StarIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.9 6.9 7.1.6-5.4 4.7 1.6 7.1L12 17.8 5.8 21.3l1.6-7.1L2 9.5l7.1-.6L12 2z" />
  </svg>
);

const InstagramIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
  </svg>
);

const TikTokIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.6 6.6a5.6 5.6 0 01-3.4-1.2V15a5.6 5.6 0 11-5.6-5.6c.3 0 .6 0 .9.1v2.8a2.8 2.8 0 102 2.6V2h2.7a5.6 5.6 0 003.4 4v.6z" />
  </svg>
);

const FacebookIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.6V4.3c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.3H7.6V14h2.7v8h3.2z" />
  </svg>
);

const PlusIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
);
const MinusIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14" /></svg>
);

const PhoneIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3.1-8.7A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L8 9.7a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z" /></svg>
);
const MailIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
);
const PinIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
);
const CalendarIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
);
const WhatsAppIcon = ({ className = "", style }: IconProps) => (
  <svg className={className} style={{ ...style, verticalAlign: "middle" }} viewBox="0 0 30 30" fill="currentColor">
    <path d="M 15 3 C 8.373 3 3 8.373 3 15 C 3 17.251208 3.6323415 19.350068 4.7109375 21.150391 L 3.1074219 27 L 9.0820312 25.431641 C 10.829354 26.425062 12.84649 27 15 27 C 21.627 27 27 21.627 27 15 C 27 8.373 21.627 3 15 3 z M 10.892578 9.4023438 C 11.087578 9.4023438 11.287937 9.4011562 11.460938 9.4101562 C 11.674938 9.4151563 11.907859 9.4308281 12.130859 9.9238281 C 12.395859 10.509828 12.972875 11.979906 13.046875 12.128906 C 13.120875 12.277906 13.173313 12.453437 13.070312 12.648438 C 12.972312 12.848437 12.921344 12.969484 12.777344 13.146484 C 12.628344 13.318484 12.465078 13.532109 12.330078 13.662109 C 12.181078 13.811109 12.027219 13.974484 12.199219 14.271484 C 12.371219 14.568484 12.968563 15.542125 13.851562 16.328125 C 14.986562 17.342125 15.944188 17.653734 16.242188 17.802734 C 16.540187 17.951734 16.712766 17.928516 16.884766 17.728516 C 17.061766 17.533516 17.628125 16.864406 17.828125 16.566406 C 18.023125 16.268406 18.222188 16.319969 18.492188 16.417969 C 18.766188 16.515969 20.227391 17.235766 20.525391 17.384766 C 20.823391 17.533766 21.01875 17.607516 21.09375 17.728516 C 21.17075 17.853516 21.170828 18.448578 20.923828 19.142578 C 20.676828 19.835578 19.463922 20.505734 18.919922 20.552734 C 18.370922 20.603734 17.858562 20.7995 15.351562 19.8125 C 12.327563 18.6215 10.420484 15.524219 10.271484 15.324219 C 10.122484 15.129219 9.0605469 13.713906 9.0605469 12.253906 C 9.0605469 10.788906 9.8286563 10.071437 10.097656 9.7734375 C 10.371656 9.4754375 10.692578 9.4023438 10.892578 9.4023438 z"/>
  </svg>
);

function StarRating({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`flex gap-0.5 ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className={`h-3.5 w-3.5 ${i < rating ? "opacity-100" : "opacity-25"}`} />
      ))}
    </div>
  );
}

const timelineData = [
  {
    year: "WATTALA",
    title: (<>OUR <span style={{ color: ACCENT }}>HOME</span></>),
    description: "Super Cut Salon on Wattala - Hekitta Rd — your trusted unisex beauty salon in Wattala.",
    image: aboutImages[0],
    side: "right" as const,
  },
  {
    year: "SERVICE",
    title: (<><span style={{ color: ACCENT }}>PROFESSIONAL</span><br /><span style={{ color: ACCENT }}>SERVICE</span></>),
    description: "Keratin treatments, haircuts, styling, and more for both men and women — dedicated to your satisfaction.",
    image: aboutImages[1],
    side: "left" as const,
  },
  {
    year: "COMFORT",
    title: (<><span style={{ color: ACCENT }}>WELCOMING</span><br /><span style={{ color: ACCENT }}>VIBE</span></>),
    description: "Friendly staff, clean environment, and A/C available — a comfortable place for your beauty needs.",
    image: aboutImages[2],
    side: "right" as const,
  },
  {
    year: "STYLE",
    title: (<><span style={{ color: ACCENT }}>HAIR &</span><br /><span style={{ color: ACCENT }}>BEAUTY</span></>),
    description: "From hair coloring to threading and facials — all your beauty needs in one place.",
    image: aboutImages[3],
    side: "left" as const,
  },
  {
    year: "TODAY",
    title: (<><span style={{ color: ACCENT }}>OPEN</span><br /><span style={{ color: ACCENT }}>DAILY</span></>),
    description: "Walk in or book via WhatsApp — we're open until 9:30 PM. Call 072 072 4710 or find us on Google Maps.",
    image: aboutImages[4],
    side: "right" as const,
  },
];

const servicesData = [
  // Main Services
  { num: "01", name: "Haircut (Unisex)", duration: "30–45 min", note: "For all", image: serviceImages[0] },
  { num: "02", name: "Keratin Treatment", duration: "Varies", note: "Professional", image: serviceImages[1] },
  { num: "03", name: "Hair Straightening", duration: "Varies", note: "Smooth look", image: serviceImages[2] },
  { num: "04", name: "Hair Colouring", duration: "Varies", note: "Trendy", image: serviceImages[3] },
  
  // Additional Services
  { num: "05", name: "Hair Styling", duration: "20–30 min", note: "Fresh look", image: serviceImages[4] },
  { num: "06", name: "Beard Trim", duration: "15–25 min", note: "Clean finish", image: serviceImages[5] },
  { num: "07", name: "Head Massage", duration: "20–30 min", note: "Relaxing", image: serviceImages[6] },
  { num: "08", name: "Kids Cut", duration: "25–30 min", note: "All ages", image: serviceImages[7] },
  { num: "09", name: "Facial", duration: "30–45 min", note: "Grooming", image: serviceImages[8] },
  { num: "10", name: "Threading", duration: "15–20 min", note: "Precision", image: serviceImages[9] },
];

function AccentButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <button
      className={`inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:scale-[1.03] ${className}`}
      style={{ background: ACCENT, color: BG, border: "2px solid " + ACCENT }}
    >
      {children}
    </button>
  );
}

/* Infinite horizontal marquee */
function Marquee({ items, direction = "left", speed = 22 }: { items: typeof portfolioCuts; direction?: "left" | "right"; speed?: number }) {
  return (
    <div className="marquee-mask relative overflow-hidden">
      <motion.div
        className="flex gap-4"
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, ease: "linear", repeat: Infinity }}
        style={{ width: "max-content" }}
      >
        {[...items, ...items].map((it, idx) => {
          const h = it.size === "tall" ? "h-64" : it.size === "wide" ? "h-44" : "h-52";
          return (
            <div
              key={`${it.id}-${idx}`}
              className={`group relative flex-shrink-0 overflow-hidden rounded-3xl border border-white/5 ${h} w-40 sm:w-44`}
              style={{ background: CARD }}
            >
              <img
                src={it.src}
                alt={`Cut ${it.number}`}
                data-img-folder={it.folder}
                data-img-base={it.basename}
                onError={(e) => handleImageError(e, it)}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
              <div className="absolute left-3 top-3 rounded-full px-2 py-0.5 text-[9px] font-black tracking-widest" style={{ background: ACCENT, color: BG }}>
                #{it.number}
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 text-[10px] uppercase tracking-widest text-white/90">
                cut {it.number}
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);
  const timelineRef = useRef<HTMLElement | null>(null);
  const lineRef = useRef<SVGPathElement | null>(null);
  const instagramRef = useRef<HTMLDivElement>(null);

  const cursorX = useSpring(-40, { stiffness: 260, damping: 28 });
  const cursorY = useSpring(-40, { stiffness: 260, damping: 28 });
  const [cursorScale, setCursorScale] = useState(1);

  const { scrollYProgress } = useScroll();
  const topProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    const start = performance.now();
    const total = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const elapsed = t - start;
      setProgress(Math.min(100, Math.round((elapsed / total) * 100)));
      if (elapsed < total) raf = requestAnimationFrame(tick);
      else setTimeout(() => setLoading(false), 200);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.12, smoothWheel: true });
    let raf = 0;
    const animate = (t: number) => { lenis.raf(t); raf = requestAnimationFrame(animate); };
    raf = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!timelineRef.current || !lineRef.current) return;
    const path = lineRef.current;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;
    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: "power2.out",
        scrollTrigger: { trigger: timelineRef.current, start: "top 92%", end: "bottom 12%", scrub: 0.35 },
      });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveTestimonial((i) => (i + 1) % testimonials.length), 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    const over = (e: Event) => {
      const t = e.target as HTMLElement;
      if (["BUTTON", "A", "INPUT", "SELECT", "TEXTAREA"].includes(t.tagName)) setCursorScale(1.9);
      else setCursorScale(1);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    if (!instagramRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger Instagram embed to load
            if (window.instgrm && window.instgrm.Embeds) {
              window.instgrm.Embeds.process();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(instagramRef.current);

    return () => {
      if (instagramRef.current) observer.unobserve(instagramRef.current);
    };
  }, []);

  const current = testimonials[activeTestimonial];
  const prev = testimonials[(activeTestimonial - 1 + testimonials.length) % testimonials.length];
  const next = testimonials[(activeTestimonial + 1) % testimonials.length];

  return (
    <div
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: BG, color: CREAM, cursor: "none" }}
    >
      {/* Preloader */}
      {loading && (
        <div className="fixed inset-0 z-[130] flex flex-col items-center justify-center" style={{ background: BG }}>
          <BrandLogo 
            textClassName="text-5xl sm:text-6xl md:text-7xl" 
            imgClassName="h-24 sm:h-32 md:h-40 w-auto max-w-[350px] sm:max-w-[450px] md:max-w-[550px] object-contain" 
          />
          <p className="mt-10 text-xs sm:text-sm tracking-[0.35em]" style={{ color: "rgba(255,255,255,0.6)" }}>{progress}%</p>
          <div className="mt-4 h-[2px] w-64 sm:w-80 md:w-96 overflow-hidden rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div className="h-full rounded-full transition-[width] duration-100" style={{ width: `${progress}%`, background: ACCENT }} />
          </div>
        </div>
      )}

      {/* Top progress */}
      <motion.div style={{ scaleX: topProgress }} className="fixed left-0 top-0 z-[120] h-[2px] w-full origin-left" />

      {/* Custom cursor */}
      <motion.div
        style={{ x: cursorX, y: cursorY, scale: cursorScale }}
        className="pointer-events-none fixed left-0 top-0 z-[140] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full md:flex"
      >
        <span className="absolute inset-0 rounded-full border" style={{ borderColor: ACCENT }} />
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
      </motion.div>

      {/* Floating glow blobs */}
      <div className="pointer-events-none fixed left-[-10%] top-[-10%] h-[520px] w-[520px] rounded-full opacity-40 blur-[120px]"
           style={{ background: `radial-gradient(circle, rgba(${ACCENT_RGB},0.35), transparent 60%)` }} />
      <div className="pointer-events-none fixed bottom-[-10%] right-[-10%] h-[520px] w-[520px] rounded-full opacity-30 blur-[120px]"
           style={{ background: `radial-gradient(circle, rgba(${ACCENT_RGB},0.25), transparent 60%)` }} />

      {/* HEADER — invisible / glassy on scroll */}
      <header
        className={`fixed left-0 right-0 top-0 z-40 transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl" : ""
        }`}
        style={{ background: scrolled ? "rgba(10, 9, 12, 0.9)" : "transparent", backdropFilter: "blur(10px)" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-[11px] uppercase tracking-[0.24em] lg:px-10">
          <BrandLogo imgClassName="h-10 w-auto max-w-[200px] object-contain" />
          <nav className="hidden items-center gap-8 md:flex">
            <a href="#cuts" className="transition hover:text-white" style={{ color: CREAM }}>Gallery</a>
            <a href="#services" className="transition hover:text-white" style={{ color: CREAM }}>Services</a>
            <a href="#story" className="transition hover:text-white" style={{ color: CREAM }}>About</a>
            <a href="#reviews" className="transition hover:text-white" style={{ color: CREAM }}>Reviews</a>
            <a href="#location" className="transition hover:text-white" style={{ color: CREAM }}>Location</a>
          </nav>
          <a
            href={`tel:${siteConfig.location.phoneTel}`}
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-semibold transition hover:scale-[1.04]"
            style={{ color: BG, background: ACCENT }}
          >
            <PhoneIcon className="h-3.5 w-3.5" />
            Call
          </a>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section className="relative flex min-h-screen items-center">
          <div className="absolute inset-0">
            <SiteImage
              image={heroImages.background}
              alt={siteConfig.name}
              className="h-full w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, rgba(10,9,12,0.85) 0%, rgba(10,9,12,0.75) 40%, rgba(10,9,12,0.85) 100%)` }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: loading ? 0 : 1, y: loading ? 30 : 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="pointer-events-none absolute right-6 top-28 hidden select-none font-black leading-none tracking-[0.08em] text-white/10 md:block lg:text-[9vw]"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            SALOON
          </motion.div>

          <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-5 pb-16 pt-36 md:grid-cols-2 lg:px-10">
            <motion.div
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: loading ? -60 : 0, opacity: loading ? 0 : 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl"
            >
              <SiteImage
                image={heroImages.owner}
                alt={`${siteConfig.name} owner`}
                className="h-[480px] w-full object-cover md:h-[560px]"
                loading="eager"
                fetchPriority="high"
              />
            </motion.div>

            <div className="text-center md:text-left">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: loading ? 0 : 1 }}
                transition={{ duration: 0.4, delay: 1.4 }}
                className="text-[10px] uppercase tracking-[0.34em] md:justify-start"
                style={{ color: ACCENT }}
              >
                {siteConfig.tagline} · ★ {siteConfig.googleRating} Google rating
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: loading ? 0 : 1, y: loading ? 28 : 0 }}
                transition={{ duration: 0.6, delay: 1.45 }}
                className="mt-3 font-black uppercase leading-[0.92] tracking-tight"
                style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.4rem, 9vw, 5.8rem)", color: CREAM }}
              >
                WELCOME TO<br /><span style={{ color: ACCENT }}>{siteConfig.shortName.toUpperCase()}</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: loading ? 0 : 1 }}
                transition={{ duration: 0.4, delay: 1.6 }}
                className="mt-5 max-w-md text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                {siteConfig.owner.bio}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: loading ? 0 : 1, y: loading ? 14 : 0 }}
                transition={{ duration: 0.4, delay: 1.8 }}
                className="mt-7 flex flex-wrap items-center gap-3 md:justify-start"
              >
                <a href={`tel:${siteConfig.location.phoneTel}`}>
                  <AccentButton>
                    <PhoneIcon className="h-3.5 w-3.5" />
                    Call {siteConfig.location.phone}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </AccentButton>
                </a>
                <a href="https://wa.me/94720724710?text=Hello%20I%27m%20interested%20in%20booking%20an%20appointment" target="_blank" rel="noopener noreferrer">
                  <button className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:scale-105">
                    <WhatsAppIcon className="h-3.5 w-3.5" />
                    Book on WhatsApp
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </a>
                <a href="#location" className="inline-flex items-center gap-2 rounded-full border border-white/50 px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] transition hover:border-white hover:text-white" style={{ color: CREAM }}>
                  Get directions
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 18 CUTS — infinite scroll marquee */}
        <section id="cuts" className="relative px-0 py-24">
          <div className="mx-auto mb-10 max-w-7xl px-5 lg:px-10">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>Portfolio</p>
                <h2 className="mt-2 font-black uppercase leading-[1.02]" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2.2rem, 6vw, 4.2rem)" }}>
                  {CUT_COUNT} styles,<br />one trusted chair.
                </h2>
              </div>
              <p className="max-w-sm text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                Real cuts from Super Cut Salon — fades, trims, and styles our clients walk out wearing every day.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Marquee items={portfolioCuts.slice(0, 9)} direction="left" speed={22} />
            <Marquee items={portfolioCuts.slice(9)} direction="right" speed={26} />
          </div>

          <div className="mx-auto mt-10 flex max-w-7xl items-center justify-between px-5 lg:px-10">
            <p className="text-[10px] uppercase tracking-[0.26em]" style={{ color: "rgba(255,255,255,0.6)" }}>Scroll · hover · repeat</p>
            <AccentButton>See more <ArrowRight className="h-3.5 w-3.5" /></AccentButton>
          </div>
        </section>

        {/* MY WORK / collage */}
        <section className="relative overflow-hidden px-5 py-24 lg:px-10">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full"
               style={{ background: `radial-gradient(circle, rgba(${ACCENT_RGB},0.28) 0%, rgba(${ACCENT_RGB},0.06) 35%, transparent 70%)` }} />

          <div className="relative mx-auto max-w-6xl">
            <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>My work</p>
                <h2 className="mt-2 text-center font-black uppercase leading-[1.02] md:text-left" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 5vw, 3.6rem)" }}>
                  GET AN IDEA<br />OF MY WORK
                </h2>
              </div>
              <p className="max-w-[210px] text-[10px] leading-relaxed md:text-right" style={{ color: "rgba(255,255,255,0.7)" }}>
                Budget-friendly salon in Wattala — walk in for a sharp look.
              </p>
            </div>

            {/* Step progress with arrows */}
            <div className="mt-10 rounded-3xl border border-white/10 p-5" style={{ background: CARD }}>
              <div className="flex flex-col gap-4 md:flex-row md:items-stretch md:justify-between">
                {[
                  { n: "01", label: "Consultation", desc: "Quick chat about the look you want" },
                  { n: "02", label: "The Cut", desc: "Precision cut, fade & beard work" },
                  { n: "03", label: "Final Style", desc: "Polished finish and product setup" },
                ].map((s, i, arr) => (
                  <div key={s.n} className="flex items-center gap-3 md:flex-1">
                    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-black" style={{ background: ACCENT, color: BG }}>{s.n}</span>
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: CREAM }}>{s.label}</p>
                      <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.7)" }}>{s.desc}</p>
                    </div>
                    {i < arr.length - 1 && (
                      <div className="ml-auto hidden items-center md:flex">
                        <ArrowRight className="h-5 w-5 -mx-2" style={{ color: ACCENT }} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-8 min-h-[520px]">
              {workCollage.map((c, i) => (
                <motion.div
                  key={`work-${i}`}
                  initial={{ opacity: 0, y: 40, rotate: i % 2 === 0 ? -4 : 4 }}
                  whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.65, delay: i * 0.06 }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className={`absolute overflow-hidden rounded-3xl border border-white/10 shadow-xl hover:shadow-2xl ${c.position}`}
                >
                  <SiteImage image={c} alt="work" className="h-full w-full object-cover" loading="eager" />
                </motion.div>
              ))}

              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-4">
                <div className="rounded-2xl border px-5 py-4 text-center backdrop-blur-md" style={{ background: `${BG}cc`, borderColor: `${ACCENT}55` }}>
                  <div className="mb-2 flex items-center justify-center gap-1.5">
                    <span className="h-3 w-3 rounded-sm" style={{ background: ACCENT }} />
                    <span className="h-3 w-3 rounded-sm border" style={{ borderColor: ACCENT }} />
                  </div>
                  <p className="text-sm font-black tracking-[0.26em]" style={{ color: ACCENT }}>{siteConfig.shortName.toUpperCase()}</p>
                </div>
              </div>
            </div>

            <div className="mt-14 flex justify-center">
              <AccentButton>Show me more <ArrowRight className="h-3.5 w-3.5" /></AccentButton>
            </div>
          </div>
        </section>

        {/* OUR DEEPEST TRANSFORMATIONS */}
        <section className="relative px-5 py-24 lg:px-10">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full"
               style={{ background: `radial-gradient(circle, rgba(${ACCENT_RGB},0.2) 0%, rgba(${ACCENT_RGB},0.05) 35%, transparent 70%)` }} />
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>Transformations</p>
                <h2 className="mt-2 font-black uppercase leading-[1.02]" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 5vw, 3.6rem)" }}>
                  OUR DEEPEST<br />TRANSFORMATIONS
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Watch incredible makeovers from Super Cut Salon — real transformations, real results.
                </p>
                <div className="mt-8">
                  <a href="https://wa.me/94720724710?text=Hello%20I%27m%20interested%20in%20booking%20a%20transformation%20appointment%20and%20would%20like%20to%20know%20more%20about%20prices%20and%20availability" target="_blank" rel="noopener noreferrer">
                    <AccentButton>
                      Book Your Transformation
                      <ArrowRight className="h-3.5 w-3.5" />
                    </AccentButton>
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-center" ref={instagramRef}>
                <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 shadow-2xl" style={{ aspectRatio: "9/16" }}>
                  <blockquote 
                    className="instagram-media h-full w-full" 
                    data-instgrm-permalink="https://www.instagram.com/p/DTtuH_uCH4s/" 
                    data-instgrm-version="14"
                    style={{ background: "#000", border: 0, borderRadius: "3px", boxShadow: "none", margin: 0, maxWidth: "100%", minWidth: "unset", padding: 0, height: "100%" }}
                  ></blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STORY */}
        <section id="story" ref={timelineRef} className="relative px-5 py-24 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-end">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>About us</p>
                <h2 className="mt-2 font-black uppercase" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>OUR STORY</h2>
              </div>
              <p className="self-end text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                Wattala — serving the community with great hair and friendly service.
              </p>
            </div>

            <div className="relative mt-16">
              <svg
                className="pointer-events-none absolute left-0 top-0 hidden h-full w-full md:block"
                preserveAspectRatio="none"
                viewBox="0 0 1000 1700"
                fill="none"
              >
                <path
                  ref={lineRef}
                  d="M 340 0 L 640 0 L 640 170 L 360 170 L 360 450 L 640 450 L 640 730 L 360 730 L 360 1010 L 640 1010 L 640 1290 L 500 1290"
                  stroke={ACCENT}
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="space-y-20">
                {timelineData.map((item) => {
                  const isRight = item.side === "right";
                  return (
                    <div key={item.year} className="md:grid md:grid-cols-2 md:gap-12 md:items-start">
                      {isRight ? (
                        <>
                          <div className="md:col-start-1 md:row-start-1 md:mt-28">
                            <h3 className="text-3xl font-black uppercase leading-[1] sm:text-4xl" style={{ fontFamily: "Poppins, sans-serif" }}>
                              {item.title}
                            </h3>
                            <p className="mt-3 ml-auto max-w-sm text-sm md:text-right" style={{ color: "rgba(255,255,255,0.7)" }}>{item.description}</p>
                          </div>
                          <div className="mt-4 md:col-start-2 md:row-start-1 md:mt-0">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em] md:text-right" style={{ color: "rgba(255,255,255,0.75)" }}>{item.year}</p>
                            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-lg">
                              <img alt={item.year} className="h-60 w-full object-cover" loading="eager" {...localImageAttrs(item.image)} />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="md:col-start-1 md:row-start-1">
                            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.75)" }}>{item.year}</p>
                            <div className="overflow-hidden rounded-3xl border border-white/10 shadow-lg">
                              <img alt={item.year} className="h-60 w-full object-cover" loading="eager" {...localImageAttrs(item.image)} />
                            </div>
                          </div>
                          <div className="mt-4 md:col-start-2 md:row-start-1 md:mt-28">
                            <h3 className="text-3xl font-black uppercase leading-[1] sm:text-4xl" style={{ fontFamily: "Poppins, sans-serif" }}>
                              {item.title}
                            </h3>
                            <p className="mt-3 max-w-sm text-sm" style={{ color: "rgba(255,255,255,0.7)" }}>{item.description}</p>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="relative px-5 py-24 lg:px-10">
          <div className="mx-auto max-w-6xl">
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>Services</p>
        <h2 className="mt-2 font-black uppercase" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>What we offer</h2>
        <p className="mt-2 text-[11px]" style={{ color: "rgba(255,255,255,0.55)" }}>Walk-in welcome · Unisex · Open until 9:30 PM</p>
      </div>
    </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {servicesData.map((s, i) => (
                <motion.article
                  key={s.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.55, delay: i * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group overflow-hidden rounded-3xl border border-white/10 transition hover:shadow-2xl"
                  style={{ background: CARD, borderColor: `${ACCENT}33` }}
                >
                  <span className="absolute ml-4 mt-4 rounded-full px-3 py-1 text-[10px] font-black tracking-[0.24em]" style={{ background: ACCENT, color: BG }}>
                    {s.num}
                  </span>
                  <div className="h-56 overflow-hidden">
                    <img alt={s.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" loading="eager" {...localImageAttrs(s.image)} />
                  </div>
                  <div className="p-5">
                    <p className="text-lg font-bold uppercase tracking-wide" style={{ fontFamily: "Poppins, sans-serif" }}>{s.name}</p>
                    <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.6)" }}>
                      <span>{s.duration}</span>
                      <span className="font-bold" style={{ color: ACCENT }}>{s.note}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* SPECIAL WEDDING PACKAGES */}
        <section className="relative px-5 py-24 lg:px-10">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-black uppercase" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
              SPECIAL WEDDING PACKAGES
            </h2>
            <p className="mt-6 text-lg leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
              We undertake special grooming packages on a reservation basis.
            </p>
            <div className="mt-8">
              <a href="https://wa.me/94720724710?text=Hello%20I%27m%20interested%20in%20the%20wedding%20grooming%20package%20and%20would%20like%20to%20know%20more%20about%20prices%20and%20availability" target="_blank" rel="noopener noreferrer">
                <AccentButton>
                  Reserve Now
                  <ArrowRight className="h-3.5 w-3.5" />
                </AccentButton>
              </a>
            </div>
          </div>
        </section>

        {/* RESERVATIONS */}
        <section className="relative px-5 py-24 lg:px-10">
          <div className="relative mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>RESERVATIONS</p>
                <h2 className="mt-2 font-serif italic leading-[1.05]" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(2.5rem, 5vw, 3.5rem)" }}>
                  Reserve your spot at the salon.
                </h2>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>
                  Complete the form and we'll get back to you on WhatsApp. For special requests, just mention them in your message!
                </p>
              </div>
              <div>
                <form 
                  className="overflow-hidden rounded-3xl border border-white/10 p-8 shadow-2xl"
                  style={{ 
                    background: "linear-gradient(135deg, rgba(212,163,115,0.2) 0%, rgba(32,26,34,0.9) 100%)", 
                    backdropFilter: "blur(20px)" 
                  }}
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get("name") || "";
                    const email = formData.get("email") || "";
                    const phone = formData.get("phone") || "";
                    const guests = formData.get("guests") || "1";
                    const date = formData.get("date") || "";
                    const time = formData.get("time") || "";
                    const message = `Hello! I'd like to reserve an appointment:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nNumber of people: ${guests}\nDate: ${date}\nTime: ${time}\n\nThank you!`;
                    const whatsappUrl = `https://wa.me/94720724710?text=${encodeURIComponent(message)}`;
                    window.open(whatsappUrl, "_blank");
                  }}
                >
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: "rgba(255,255,255,0.7)" }}>NAME</label>
                      <input 
                        type="text" 
                        name="name" 
                        required
                        placeholder="Your name"
                        className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#D4A373] focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: "rgba(255,255,255,0.7)" }}>EMAIL</label>
                      <input 
                        type="email" 
                        name="email" 
                        required
                        placeholder="you@example.com"
                        className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#D4A373] focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: "rgba(255,255,255,0.7)" }}>PHONE</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        required
                        placeholder="+94 77 123 4567"
                        className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-[#D4A373] focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: "rgba(255,255,255,0.7)" }}>GUESTS</label>
                      <select 
                        name="guests" 
                        className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm text-white focus:border-[#D4A373] focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      >
                        {[1,2,3,4,5].map(n => <option key={n} value={n} style={{ background: "#201A22", color: "white" }}>{n}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: "rgba(255,255,255,0.7)" }}>DATE</label>
                      <input 
                        type="date" 
                        name="date" 
                        required
                        className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm text-white focus:border-[#D4A373] focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold uppercase tracking-[0.24em]" style={{ color: "rgba(255,255,255,0.7)" }}>TIME</label>
                      <input 
                        type="time" 
                        name="time" 
                        required
                        className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm text-white focus:border-[#D4A373] focus:outline-none"
                        style={{ background: "rgba(255,255,255,0.05)" }}
                      />
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <button 
                      type="submit" 
                      className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-8 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition hover:opacity-90"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      RESERVE ON WHATSAPP
                    </button>
                    <p className="text-[10px]" style={{ color: "rgba(255,255,255,0.6)" }}>Complete the details to request a time.</p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS */}
        <section id="reviews" className="relative px-5 py-24 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>Google Reviews</p>
            <h2 className="mt-2 font-black uppercase" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
              {siteConfig.googleRating} ★ · {siteConfig.googleReviewCount} reviews
            </h2>

            <div className="relative mt-12 flex items-center justify-center">
              <div className="hidden w-60 flex-shrink-0 scale-90 opacity-30 md:block">
                <div className="rounded-3xl border border-white/10 p-6" style={{ background: CARD }}>
                  <StarRating rating={prev.rating} />
                  <p className="mt-3 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>&ldquo;{prev.quote}&rdquo;</p>
                  <p className="mt-4 text-[11px] font-semibold">— {prev.name}</p>
                </div>
              </div>

              <motion.div
                key={current.name}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
                className="mx-0 w-full max-w-lg rounded-3xl p-8 md:mx-6"
                style={{ background: ACCENT, color: BG }}
              >
                <StarRating rating={current.rating} />
                <p className="mt-4 text-sm font-semibold leading-relaxed">&ldquo;{current.quote}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full text-[11px] font-black" style={{ background: BG, color: ACCENT }}>
                    {current.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.24em]">{current.name}</p>
                    {current.timeAgo && <p className="text-[10px] opacity-70">{current.timeAgo}{current.badge ? ` · ${current.badge}` : ""}</p>}
                  </div>
                </div>
              </motion.div>

              <div className="hidden w-60 flex-shrink-0 scale-90 opacity-30 md:block">
                <div className="rounded-3xl border border-white/10 p-6" style={{ background: CARD }}>
                  <StarRating rating={next.rating} />
                  <p className="mt-3 text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>&ldquo;{next.quote}&rdquo;</p>
                  <p className="mt-4 text-[11px] font-semibold">— {next.name}</p>
                </div>
              </div>

            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2 rounded-full transition-all ${i === activeTestimonial ? "w-6" : "w-2"}`}
                  style={i === activeTestimonial ? { background: ACCENT } : { background: "rgba(255,255,255,0.25)" }}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button onClick={() => setActiveTestimonial((i) => (i - 1 + testimonials.length) % testimonials.length)}
                className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:scale-110" style={{ borderColor: ACCENT, color: ACCENT }}>
                ←
              </button>
              <button onClick={() => setActiveTestimonial((i) => (i + 1) % testimonials.length)}
                className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:scale-110" style={{ borderColor: ACCENT, color: ACCENT }}>
                →
              </button>
            </div>
          </div>
        </section>

        {/* LOCATION */}
        <section id="location" className="relative px-5 py-24 lg:px-10">
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>{siteConfig.location.title}</p>
                <h2 className="mt-2 font-black uppercase" style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
                  Visit {siteConfig.shortName}
                </h2>
              </div>
              <p className="max-w-sm text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
                {siteConfig.location.fullAddress} — walk in or call {siteConfig.location.phone}. Open daily until 9:30 PM.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
              <div className="rounded-3xl border border-white/10 p-6 md:p-8" style={{ background: CARD }}>
                <div className="space-y-5">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.5)" }}>Address</p>
                    <p className="mt-2 flex items-start gap-2 text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
                      <PinIcon className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: ACCENT }} />
                      <span>
                        {siteConfig.location.address}<br />
                        {siteConfig.location.city}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.5)" }}>Contact</p>
                    <ul className="mt-2 space-y-2 text-sm" style={{ color: "rgba(255,255,255,0.8)" }}>
                      <li className="flex items-center gap-2">
                        <PhoneIcon className="h-4 w-4" style={{ color: ACCENT }} />
                        <a href={`tel:${siteConfig.location.phoneTel}`} className="transition" style={{ color: "rgba(255,255,255,0.9)" }}>{siteConfig.location.phone}</a>
                      </li>
                      <li className="flex items-center gap-2">
                        <WhatsAppIcon className="h-4 w-4" style={{ color: "#25D366" }} />
                        <a href="https://wa.me/94720724710?text=Hello%20I%27m%20interested%20in%20getting%20a%20cut" target="_blank" rel="noopener noreferrer" className="transition hover:text-[#25D366]">WhatsApp</a>
                      </li>
                      <li className="flex items-start gap-2" style={{ color: "rgba(255,255,255,0.65)" }}>
                        <span className="mt-0.5 text-[10px] uppercase tracking-wider" style={{ color: ACCENT }}>Plus</span>
                        <span>{siteConfig.location.plusCode}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.5)" }}>Amenities</p>
                    <ul className="mt-2 space-y-1.5 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                      {siteConfig.location.amenities.map((a) => (
                        <li key={a}>✓ {a}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.28em]" style={{ color: "rgba(255,255,255,0.5)" }}>Hours</p>
                    <ul className="mt-2 space-y-1.5 text-sm" style={{ color: "rgba(255,255,255,0.75)" }}>
                      {siteConfig.location.hours.map((h) => (
                        <li key={h.days} className="flex justify-between gap-4">
                          <span>{h.days}</span>
                          <span style={{ color: "rgba(255,255,255,0.55)" }}>{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <a
                    href={siteConfig.location.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:scale-[1.03]"
                    style={{ borderColor: ACCENT, color: ACCENT }}
                  >
                    <PinIcon className="h-3.5 w-3.5" />
                    Get directions
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>

              {siteConfig.location.mapsEmbedUrl ? (
                <div className="overflow-hidden rounded-3xl border border-white/10" style={{ minHeight: "360px" }}>
                  <iframe
                    title="Studio location map"
                    src={siteConfig.location.mapsEmbedUrl}
                    className="h-full min-h-[360px] w-full border-0 grayscale-[40%] invert-[95%] contrast-[100%]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="flex min-h-[360px] items-center justify-center rounded-3xl border border-dashed border-white/15 text-center text-sm" style={{ background: CARD, color: "rgba(255,255,255,0.45)" }}>
                  Add a map embed URL in <code className="mx-1" style={{ color: "rgba(255,255,255,0.7)" }}>src/config/siteConfig.ts</code>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="relative px-5 py-24 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] uppercase tracking-[0.32em]" style={{ color: ACCENT }}>FAQs</p>
            <h2 className="mt-3 font-serif text-5xl italic leading-[0.95] sm:text-6xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Fresh Cuts,<br />Clear Answers
            </h2>
          </div>

          <div className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-3xl border border-white/10" style={{ background: CARD }}>
            {faqs.map((f, i) => {
              const open = faqOpen === i;
              return (
                <div key={f.q} className="border-b border-white/10 last:border-b-0">
                  <button
                    onClick={() => setFaqOpen(open ? null : i)}
                    className="flex w-full items-center justify-between px-5 py-4 text-left text-[11px] uppercase tracking-[0.18em] transition hover:bg-white/5"
                  >
                    <span style={{ color: "rgba(255,255,255,0.9)" }}>{f.q}</span>
                    <span style={{ color: ACCENT }}>
                      {open ? <MinusIcon className="h-4 w-4" /> : <PlusIcon className="h-4 w-4" />}
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.28 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-4 text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.65)" }}>{f.a}</p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-10" style={{ background: "#0A090C" }}>
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-4 lg:px-10">
          <div>
            <p className="text-xl font-black tracking-[0.22em]" style={{ color: ACCENT }}>{siteConfig.name}</p>
            <p className="mt-3 text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)" }}>
              Premium unisex beauty salon. Professional service, friendly staff, your best look awaits.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: ACCENT }}>Contact</p>
            <ul className="mt-3 space-y-2 text-[11px]" style={{ color: "rgba(255,255,255,0.7)" }}>
              <li className="flex items-center gap-2"><PinIcon className="h-3.5 w-3.5" style={{ color: ACCENT }} />{siteConfig.location.fullAddress}</li>
              <li className="flex items-center gap-2"><PhoneIcon className="h-3.5 w-3.5" style={{ color: ACCENT }} />{siteConfig.location.phone}</li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: ACCENT }}>Hours</p>
            <ul className="mt-3 space-y-2 text-[11px]" style={{ color: "rgba(255,255,255,0.7)" }}>
              {siteConfig.location.hours.map((h) => (
                <li key={h.days}>{h.days}: {h.time}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: ACCENT }}>Social</p>
            <div className="mt-3 flex gap-3">
              <a href="https://www.instagram.com/super_cut_salon/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:scale-110" style={{ borderColor: `${ACCENT}55`, color: ACCENT }}><InstagramIcon className="h-4 w-4" /></a>
              <a href="https://web.facebook.com/kandeebanmuthu/?_rdc=3&_rdr#" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 transition hover:scale-110" style={{ borderColor: `${ACCENT}55`, color: ACCENT }}><FacebookIcon className="h-4 w-4" /></a>
              <a href="https://wa.me/94720724710?text=Hello%20I%27m%20interested%20in%20getting%20a%20cut" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#25D366] transition hover:scale-110" style={{ color: "#25D366" }}><WhatsAppIcon className="h-4 w-4" /></a>
            </div>
          </div>
        </div>
        <div className="px-5 lg:px-10 py-4 text-center text-[10px] uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.4)" }}>
          © {new Date().getFullYear()} {siteConfig.name} · All rights reserved · Powered by Trixiefy
        </div>
      </footer>
    </div>
  );
}
