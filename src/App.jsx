import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  GitBranch, Linkedin, Mail, X, ExternalLink, ChevronDown,
  Cpu, Code2, Award, Briefcase, Sparkles, ArrowRight,
  Terminal, Zap, Brain, Server, Shield, Layers
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: "AI HR Burnout Predictor",
    emoji: "🧠",
    tags: ["React", "Express.js", "Python", "Flask", "ML"],
    accent: "#38bdf8",
    accentDim: "rgba(56,189,248,0.12)",
    image: null,
    demo: null,
    shortDesc: "Predicts employee burnout risk using machine learning.",
    longDesc: "A full-stack application with a React/Express.js frontend and a Python/Flask ML backend. The system ingests HR metrics — workload, tenure, satisfaction scores — and runs a trained predictive model to evaluate individual burnout probability. Features a real-time dashboard with risk segmentation, actionable HR insights, and exportable reports.",
    highlights: ["70%+ prediction accuracy", "REST API integration", "Real-time risk dashboard", "Exportable PDF reports"],
  },
  {
    id: 2,
    title: "Greensand Reporting",
    emoji: "🏭",
    tags: ["Laravel", "MySQL", "PHP", "Livewire"],
    accent: "#34d399",
    accentDim: "rgba(52,211,153,0.12)",
    image: null,
    demo: null,
    shortDesc: "Industrial sand operational system for factory digitalization.",
    longDesc: "A web-based factory operational system built with Laravel and MySQL for a manufacturing environment. Digitalized the entire sand quality reporting workflow — replacing paper logs with structured data capture, real-time analytics, and automated reporting.",
    highlights: ["Paper-to-digital transformation", "Real-time analytics", "Laravel + Livewire stack", "MySQL optimization"],
  },
  {
    id: 3,
    title: "Resdigaza",
    emoji: "🏆",
    tags: ["React", "Full-Stack", "Innovation"],
    accent: "#f59e0b",
    accentDim: "rgba(245,158,11,0.12)",
    image: "https://staypath-ai-project.vercel.app/og-image.png",
    demo: "https://staypath-ai-project.vercel.app/",
    shortDesc: "1st Place — Technovision 2025 Innovation Beyond Code.",
    longDesc: "Resdigaza captured first place at Technovision 2025, the flagship innovation competition themed Innovation Beyond Code. This project exemplified the fusion of social impact and technical excellence — built with a modern full-stack architecture and designed for real-world deployment.",
    highlights: ["1st Place — Technovision 2025", "Innovation Beyond Code theme", "Social impact focus", "Production-ready architecture"],
  },
];

const certifications = [
  {
    id: 1,
    title: "Fundamental Back-End with JavaScript",
    issuer: "Dicoding",
    badge: "AWS",
    accent: "#38bdf8",
    desc: "Advanced back-end development curriculum validated by Amazon Web Services. Covers Node.js server architecture, RESTful APIs, authentication, and cloud deployment on AWS infrastructure.",
  },
  {
    id: 2,
    title: "Beginner Back-End with JavaScript",
    issuer: "Dicoding",
    badge: "JS",
    accent: "#a78bfa",
    desc: "Foundational back-end engineering with Node.js and Hapi.js. Covers HTTP fundamentals, routing, request handling, and server-side data management.",
  },
  {
    id: 3,
    title: "Fundamental Web App with React",
    issuer: "Dicoding",
    badge: "R",
    accent: "#34d399",
    desc: "Comprehensive React.js curriculum covering component architecture, hooks, state management, routing, and building production-grade single-page applications.",
  },
];

const skills = [
  { label: "AI & ML", icon: Brain, items: ["Python", "Flask", "Machine Learning", "Predictive Modeling", "Scikit-learn"], accent: "#38bdf8" },
  { label: "Full-Stack", icon: Code2, items: ["React.js", "Express.js", "PHP", "Laravel", "Livewire", "Tailwind CSS"], accent: "#a78bfa" },
  { label: "Infrastructure", icon: Server, items: ["MySQL", "REST APIs", "AWS", "Git", "Linux", "Docker"], accent: "#34d399" },
];

const experience = [
  {
    role: "IT Programmer Intern",
    company: "PT Asian Isuzu Casting Center",
    period: "Aug 2025 – Jan 2026",
    icon: "🏗️",
    accent: "#38bdf8",
    points: [
      "Developed PHP/MySQL QC & Traceability system, reducing human error by 70%.",
      "Integrated production data pipelines for ERP architecture compatibility.",
      "Designed factory-floor data capture workflows replacing legacy paper systems.",
    ],
  },
  {
    role: "Freelance Full-Stack & AI Developer",
    company: "Independent",
    period: "Jul 2024 – Present",
    icon: "🤖",
    accent: "#a78bfa",
    points: [
      "Built custom web architectures tailored to client operational requirements.",
      "Integrated machine learning models into functional, production-deployed web apps.",
      "Delivered end-to-end solutions from system design to deployment.",
    ],
  },
];

// ─── TYPING HOOK ──────────────────────────────────────────────────────────────

function useTyping(texts, speed = 75, pause = 2000) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  
  useEffect(() => {
    const current = texts[idx];
    const t = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) setTimeout(() => setDeleting(true), pause);
        else setCharIdx(c => c + 1);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setCharIdx(0); setIdx(i => (i + 1) % texts.length); }
        else setCharIdx(c => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [charIdx, deleting, idx, texts, speed, pause]);
  
  return display;
}

// ─── 3D TILT CARD ─────────────────────────────────────────────────────────────

function TiltCard({ children, className = "", onClick }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 800 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────

function Modal({ item, type, onClose }) {
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [onClose]);

  const accent = type === "project" ? item.accent : item.accent;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      >
        <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

        <motion.div
          className="relative z-10 w-full sm:max-w-lg bg-[#0c1018] rounded-t-3xl sm:rounded-2xl overflow-hidden border border-white/8"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 32 }}
          style={{ boxShadow: `0 -20px 60px ${accent}15, 0 0 0 1px ${accent}20` }}
        >
          {/* Drag handle on mobile */}
          <div className="flex justify-center pt-3 pb-1 sm:hidden">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          {/* Accent line */}
          <div style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, height: 1 }} />

          {/* Header */}
          <div className="p-5 sm:p-6" style={{ background: `linear-gradient(135deg, ${accent}10, transparent)` }}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">{type === "project" ? item.emoji : "📜"}</div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white leading-tight">{item.title}</h2>
                  {type === "cert" && <p className="text-xs text-white/40 mt-0.5 font-mono">{item.issuer} · Verified</p>}
                </div>
              </div>
              <button onClick={onClose} className="p-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all flex-shrink-0">
                <X size={15} />
              </button>
            </div>
            {type === "project" && (
              <div className="flex flex-wrap gap-1.5 mt-4">
                {item.tags.map(t => (
                  <span key={t} style={{ color: accent, borderColor: `${accent}40`, background: `${accent}10` }} className="px-2.5 py-0.5 rounded-full text-xs font-mono border">{t}</span>
                ))}
              </div>
            )}
          </div>

          {/* Body */}
          <div className="px-5 sm:px-6 pb-2 space-y-4">

            {/* Preview image */}
            {type === "project" && item.image && (
              <div className="rounded-xl overflow-hidden border border-white/8">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover"
                  style={{ maxHeight: 180 }}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              </div>
            )}

            {/* Live demo iframe preview */}
            {type === "project" && item.demo && !item.image && (
              <div className="rounded-xl overflow-hidden border border-white/8" style={{ height: 180 }}>
                <iframe
                  src={item.demo}
                  title={item.title}
                  className="w-full h-full"
                  style={{ pointerEvents: "none", transform: "scale(0.8)", transformOrigin: "top left", width: "125%", height: "125%" }}
                />
              </div>
            )}

            <p className="text-white/60 text-sm leading-relaxed">{type === "project" ? item.longDesc : item.desc}</p>

            {type === "project" && (
              <div>
                <p className="text-xs font-mono text-white/30 uppercase tracking-widest mb-3">Key Highlights</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: item.accent }} />
                      {h}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {type === "cert" && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/8">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{ background: `${item.accent}15`, border: `1px solid ${item.accent}30`, color: item.accent }}>
                  {item.badge}
                </div>
                <div>
                  <p className="text-xs text-white/30">Issued by</p>
                  <p className="text-sm font-semibold text-white">{item.issuer}</p>
                </div>
              </div>
            )}

          </div>

          <div className="p-5 sm:p-6 pt-4 space-y-2">
            {type === "project" && item.demo && (
              <a
                href={item.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                style={{ background: `linear-gradient(135deg, ${item.accent}CC, ${item.accent}88)`, color: "#fff" }}
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
            <button onClick={onClose} className="w-full py-2.5 rounded-xl border border-white/8 text-sm text-white/40 hover:text-white hover:border-white/15 hover:bg-white/5 transition-all font-mono">
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── SECTION ──────────────────────────────────────────────────────────────────

function Section({ id, children }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section id={id} ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="py-16 sm:py-24 px-4 max-w-5xl mx-auto"
    >
      {children}
    </motion.section>
  );
}

function SectionLabel({ icon: Icon, label, accent = "#38bdf8" }) {
  return (
    <div className="flex items-center gap-3 mb-10 sm:mb-12">
      <div className="p-2 rounded-lg" style={{ background: `${accent}15`, border: `1px solid ${accent}25` }}>
        <Icon size={15} style={{ color: accent }} />
      </div>
      <span className="text-xs font-mono uppercase tracking-[0.2em]" style={{ color: accent }}>{label}</span>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${accent}25, transparent)` }} />
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  
  const scroll = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={scrolled ? { background: "rgba(6,8,14,0.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.05)" } : {}}
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="max-w-5xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, #38bdf8, #818cf8)" }}>
              <Terminal size={13} className="text-white" />
            </div>
            <span className="font-mono text-sm text-white/70">luthfi.dev</span>
          </div>
          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-6 text-xs font-mono text-white/40">
            {["experience", "projects", "skills", "certifications"].map(s => (
              <button key={s} onClick={() => scroll(s)} className="hover:text-white transition-colors capitalize tracking-wide">{s}</button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => scroll("contact")} className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all"
              style={{ background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.25)", color: "#38bdf8" }}>
              Contact
            </button>
            {/* Mobile hamburger */}
            <button onClick={() => setMenuOpen(v => !v)} className="sm:hidden p-2 rounded-lg bg-white/5 border border-white/8">
              <div className="space-y-1.5">
                <motion.div className="w-5 h-0.5 bg-white/60 rounded" animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }} />
                <motion.div className="w-5 h-0.5 bg-white/60 rounded" animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} />
                <motion.div className="w-5 h-0.5 bg-white/60 rounded" animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }} />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 sm:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="absolute top-14 left-4 right-4 rounded-2xl border border-white/8 overflow-hidden"
              style={{ background: "#0c1018" }}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
            >
              {["experience", "projects", "skills", "certifications", "contact"].map((s, i) => (
                <motion.button
                  key={s} onClick={() => scroll(s)}
                  className="w-full text-left px-5 py-4 text-sm font-mono text-white/60 hover:text-white hover:bg-white/5 transition-all capitalize border-b border-white/5 last:border-0"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {s}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── FLOATING ORBS ────────────────────────────────────────────────────────────

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute rounded-full"
        style={{ width: 500, height: 500, top: "10%", left: "60%", background: "radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)", filter: "blur(40px)" }}
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{ width: 400, height: 400, top: "50%", left: "-10%", background: "radial-gradient(circle, rgba(129,140,248,0.06) 0%, transparent 70%)", filter: "blur(40px)" }}
        animate={{ x: [0, -20, 0], y: [0, 30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute rounded-full"
        style={{ width: 300, height: 300, top: "70%", left: "70%", background: "radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)", filter: "blur(40px)" }}
        animate={{ x: [0, 15, 0], y: [0, 25, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const typed = useTyping(["Software Engineer", "AI & ML Enthusiast", "Full-Stack Developer", "Manufacturing Digitalizer"]);
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden">
      <FloatingOrbs />
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-3xl w-full">
        {/* Status badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono mb-8"
          style={{ background: "rgba(56,189,248,0.06)", border: "1px solid rgba(56,189,248,0.2)", color: "#38bdf8" }}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        >
          <motion.span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]"
            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} />
          Open to Internship Opportunities
        </motion.div>

        {/* Name */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
          <h1 className="font-black tracking-tight leading-none text-white text-4xl sm:text-6xl mb-1">
            Luthfi
          </h1>
          <h1 className="font-black tracking-tight leading-none text-4xl sm:text-6xl mb-2"
            style={{ background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #a78bfa 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Rafananda
          </h1>
          <p className="text-white/30 text-sm sm:text-lg font-light tracking-widest uppercase mb-8">Naufal</p>
        </motion.div>

        {/* Typing */}
        <motion.div className="h-9 flex items-center justify-center mb-5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
          <span className="text-base sm:text-xl font-mono" style={{ color: "#818cf8" }}>{typed}</span>
          <motion.span className="ml-1 w-0.5 h-6 inline-block rounded-full bg-[#818cf8]"
            animate={{ opacity: [1, 0] }} transition={{ duration: 0.8, repeat: Infinity }} />
        </motion.div>

        {/* Sub */}
        <motion.p className="text-white/35 text-sm sm:text-base font-mono mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
          Informatics Engineering · GPA <span className="text-white/60">3.92</span><br />
          <span className="text-white/20 text-xs sm:text-sm">Universitas Buana Perjuangan Karawang</span>
        </motion.p>

        {/* CTAs */}
        <motion.div className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
          <motion.button
            onClick={() => scroll("projects")}
            className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white text-sm font-semibold"
            style={{ background: "linear-gradient(135deg, #38bdf8, #818cf8)" }}
            whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(56,189,248,0.3)" }}
            whileTap={{ scale: 0.97 }}
          >
            View My Work
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          <motion.button
            onClick={() => scroll("contact")}
            className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-white/70 text-sm font-semibold border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:text-white hover:border-white/20 transition-all"
            whileTap={{ scale: 0.97 }}
          >
            <Mail size={15} />
            Contact Me
          </motion.button>
        </motion.div>

        {/* Stats row */}
        <motion.div className="flex justify-center gap-6 sm:gap-10 mt-12 pt-10 border-t border-white/5"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}>
          {[["3.92", "GPA"], ["70%", "Error Reduced"], ["3+", "Projects"]].map(([val, lab]) => (
            <div key={lab} className="text-center">
              <p className="text-lg sm:text-2xl font-black text-white">{val}</p>
              <p className="text-xs text-white/30 font-mono mt-0.5">{lab}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/20"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>
        <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ChevronDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

function Experience() {
  return (
    <Section id="experience">
      <SectionLabel icon={Briefcase} label="Experience" />
      <div className="relative">
        <div className="absolute left-5 sm:left-6 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, rgba(56,189,248,0.4), rgba(129,140,248,0.2), transparent)" }} />
        <div className="space-y-6 sm:space-y-8">
          {experience.map((exp, i) => (
            <motion.div key={i} className="relative pl-12 sm:pl-16"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}>
              {/* Node */}
              <div className="absolute left-3 sm:left-4 top-4 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-xs"
                style={{ border: `2px solid ${exp.accent}`, background: `${exp.accent}20` }}>
                <span style={{ fontSize: 9 }}>{exp.icon}</span>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 group">
                <div className="flex flex-col gap-1 mb-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <h3 className="text-white font-semibold text-sm sm:text-base">{exp.role}</h3>
                    <span className="text-xs font-mono px-2 py-0.5 rounded-full w-fit" style={{ color: exp.accent, background: `${exp.accent}12`, border: `1px solid ${exp.accent}25` }}>{exp.company}</span>
                  </div>
                  <p className="text-xs font-mono text-white/25">{exp.period}</p>
                </div>
                <ul className="mt-3 space-y-2">
                  {exp.points.map((p, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/50">
                      <Zap size={11} className="mt-0.5 flex-shrink-0" style={{ color: exp.accent }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

function Projects({ onOpen }) {
  return (
    <Section id="projects">
      <SectionLabel icon={Layers} label="Projects" accent="#818cf8" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((proj, i) => (
          <motion.div key={proj.id}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.55 }}>
            <TiltCard onClick={() => onOpen(proj, "project")}
              className="h-full p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all duration-300 group"
              style={{ background: `linear-gradient(135deg, ${proj.accentDim}, transparent)` }}>
              <div style={{ transform: "translateZ(20px)" }}>
                <div className="text-3xl mb-4">{proj.emoji}</div>
                <h3 className="text-white font-bold text-sm sm:text-base mb-2 font-mono leading-snug">{proj.title}</h3>
                <p className="text-white/40 text-xs leading-relaxed mb-4">{proj.shortDesc}</p>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {proj.tags.slice(0, 3).map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-xs font-mono border"
                      style={{ color: proj.accent, borderColor: `${proj.accent}30`, background: `${proj.accent}08` }}>{t}</span>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: proj.accent }}>
                  <span>View details</span>
                  <ExternalLink size={11} />
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <Section id="skills">
      <SectionLabel icon={Cpu} label="Skills & Tools" accent="#34d399" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {skills.map((group, i) => (
          <motion.div key={group.label}
            className="p-5 rounded-2xl border border-white/5 bg-white/[0.02]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-1.5 rounded-lg" style={{ background: `${group.accent}15`, border: `1px solid ${group.accent}25` }}>
                <group.icon size={14} style={{ color: group.accent }} />
              </div>
              <span className="text-xs font-mono text-white/40 uppercase tracking-wider">{group.label}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item, j) => (
                <motion.span key={item}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono border border-white/5 bg-white/[0.03] text-white/50 hover:text-white/80 hover:border-white/15 transition-all cursor-default"
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 + j * 0.04 }}
                  whileHover={{ y: -2 }}>
                  {item}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── CERTIFICATIONS ───────────────────────────────────────────────────────────

function Certifications({ onOpen }) {
  return (
    <Section id="certifications">
      <SectionLabel icon={Award} label="Certifications" accent="#a78bfa" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {certifications.map((cert, i) => (
          <motion.div key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}>
            <TiltCard onClick={() => onOpen(cert, "cert")}
              className="h-full p-5 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all duration-300 group">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold mb-4 flex-shrink-0"
                style={{ background: `${cert.accent}12`, border: `1px solid ${cert.accent}25`, color: cert.accent }}>
                {cert.badge}
              </div>
              <p className="text-white/25 text-xs font-mono mb-1">{cert.issuer}</p>
              <h3 className="text-white text-sm font-semibold leading-snug mb-4">{cert.title}</h3>
              <div className="flex items-center gap-1.5 text-xs font-mono text-white/25 group-hover:text-white/50 transition-colors">
                <span>View details</span>
                <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer id="contact" className="border-t border-white/5 py-16 sm:py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(56,189,248,0.04) 0%, transparent 70%)" }} />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono mb-6"
            style={{ background: "rgba(129,140,248,0.06)", border: "1px solid rgba(129,140,248,0.2)", color: "#818cf8" }}>
            <Sparkles size={12} />
            Let's build something together
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white mb-3 tracking-tight">Get In Touch</h2>
          <p className="text-white/30 text-sm font-mono mb-10 max-w-sm mx-auto leading-relaxed">
            Targeting AI Driver Assistance System Development Intern at Toyota.
            Open to collaborations & freelance.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-12">
            {[
              { href: "https://github.com/Luthfi-2004", icon: GitBranch, label: "GitHub", accent: "#ffffff" },
              { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn", accent: "#38bdf8" },
              { href: "mailto:luthfi.rafanandanaufal@gmail.com", icon: Mail, label: "luthfi.rafanandanaufal@gmail.com", accent: "#a78bfa" },
            ].map(({ href, icon: Icon, label, accent }) => (
              <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl text-sm font-mono border border-white/8 bg-white/[0.03] hover:bg-white/[0.07] transition-all"
                style={{ color: "rgba(255,255,255,0.5)" }}
                whileHover={{ scale: 1.03, color: accent, borderColor: `${accent}40` }}
                whileTap={{ scale: 0.97 }}>
                <Icon size={15} />
                <span className="truncate max-w-[200px] sm:max-w-none">{label}</span>
              </motion.a>
            ))}
          </div>
          <p className="text-white/15 text-xs font-mono">2025 Luthfi Rafananda Naufal · Built with React & Framer Motion</p>
        </motion.div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [modal, setModal] = useState(null);
  const openModal = (item, type) => setModal({ item, type });
  const closeModal = () => setModal(null);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #06080e; }
        ::-webkit-scrollbar-thumb { background: rgba(56,189,248,0.2); border-radius: 2px; }
        h1, h2, h3 { font-family: 'Syne', sans-serif; }
      `}</style>
      <div className="min-h-screen text-white" style={{ background: "#06080e", fontFamily: "'JetBrains Mono', monospace" }}>
        <Navbar />
        <Hero />
        <Experience />
        <Projects onOpen={openModal} />
        <Skills />
        <Certifications onOpen={openModal} />
        <Footer />
        {modal && <Modal item={modal.item} type={modal.type} onClose={closeModal} />}
      </div>
    </>
  );
}