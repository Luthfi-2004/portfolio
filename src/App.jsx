import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import {
  GitBranch, Linkedin, Mail, X, ExternalLink, ChevronDown,
  Cpu, Code2, Award, Briefcase, Sparkles, ArrowRight,
  Terminal, Zap, Brain, Server, Shield, Layers, Database,
  Eye, Activity, Fingerprint, MonitorSmartphone, Wifi, Rocket, Hexagon
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: "AI HR Burnout Predictor (StayPath AI)",
    emoji: "🧠",
    tags: ["React", "Express.js", "Python", "Flask", "ML"],
    accent: "#00f0ff", // Cyberpunk Cyan
    accentDim: "rgba(0, 240, 255, 0.12)",
    image: null,
    demo: "https://staypath-ai-project.vercel.app/",
    shortDesc: "Predicts employee burnout risk using machine learning.",
    longDesc: "A full-stack HR management application utilizing Artificial Intelligence and Machine Learning to evaluate and predict employee burnout levels. Integrating a React.js/Express.js frontend with a Python (Flask) backend for ML predictive models.",
    highlights: ["Machine Learning predictive models", "Full-stack React/Flask integration", "Real-time risk evaluation", "Actionable HR insights"],
  },
  {
    id: 2,
    title: "Greensand Reporting App",
    emoji: "🏭",
    tags: ["Laravel", "CodeIgniter", "MySQL", "PHP"],
    accent: "#ff003c", // Cyberpunk Red
    accentDim: "rgba(255, 0, 60, 0.12)",
    image: null,
    demo: null,
    shortDesc: "Industrial sand operational data reporting system.",
    longDesc: "Architected a web-based industrial data reporting application to streamline operational flows in a factory environment. Digitalized the entire reporting workflow — replacing paper logs with structured data capture, real-time analytics, and automated reporting.",
    highlights: ["Paper-to-digital transformation", "Streamlined operational flows", "Laravel + CodeIgniter architecture", "MySQL database optimization"],
  },
  {
    id: 3,
    title: "Resdigaza - Technovision 2025",
    emoji: "🏆",
    tags: ["Software Innovation", "Full-Stack"],
    accent: "#7000ff", // Cyberpunk Purple
    accentDim: "rgba(112, 0, 255, 0.12)",
    image: null,
    demo: null,
    shortDesc: "1st Place Winner — Innovation Beyond Code.",
    longDesc: "Won 1st Place at Technovision 2025 (Resdigaza) in the 'Innovation Beyond Code' competition for software development innovation. Demonstrated exceptional problem-solving and full-stack capabilities.",
    highlights: ["1st Place Winner", "Software Development Innovation", "High-impact solution architecture", "Proven competitive programming skills"],
  },
];

const skills = [
  { label: "AI & Computer Vision", icon: Eye, items: ["Python", "YOLO", "OpenCV", "MediaPipe", "Flask", "Machine Learning Integration"], accent: "#00f0ff" },
  { label: "Full-Stack Development", icon: Code2, items: ["PHP", "Laravel", "CodeIgniter", "JavaScript", "React.js", "Express.js", "Golang", "C/C++ (Basic)"], accent: "#ff003c" },
  { label: "Infrastructure & Data", icon: Database, items: ["MySQL", "PostgreSQL", "Git & GitHub", "REST API", "Basic ERP Understanding", "Basic Networking (MikroTik)"], accent: "#7000ff" },
];

const experience = [
  {
    role: "IT Quality Assurance Engineer",
    company: "PT Inti Ganda Perdana",
    period: "Aug 2026 – Present",
    icon: <Activity size={12} />,
    accent: "#00f0ff",
    points: [
      "Worked on the development of an AI-based monitoring system using computer vision and machine learning to support quality control activities.",
      "Collected and prepared data, developed and tested AI models, and improved real-time detection performance.",
      "Integrated the AI system into a web-based monitoring dashboard and optimized it to run efficiently with clear detection results.",
      "Gained hands-on experience with Python, YOLO, OpenCV, MediaPipe, and Flask while applying AI technology to real-world industrial needs."
    ],
  },
  {
    role: "IT Programmer Intern",
    company: "PT Asian Isuzu Casting Center",
    period: "Aug 2025 – Jan 2026",
    icon: <Database size={12} />,
    accent: "#ff003c",
    points: [
      "Developed a web-based Quality Control & Traceability system using PHP (Laravel) and MySQL to replace manual recording.",
      "Analyzed business process flowcharts and architecture to ensure system stability and strict compliance with factory SOPs.",
      "Successfully reduced human error in data input by 70% and accelerated the rendering time of QC summary reports for management.",
      "Collaborated to design future system integration architectures with the company's ERP system.",
      "Provided IT support by managing server/CCTV IP addressing and assisted with troubleshooting Raspberry Pi devices."
    ],
  },
  {
    role: "Freelance Web & AI Developer",
    company: "Self-employed",
    period: "Jul 2024 – Present",
    icon: <Terminal size={12} />,
    accent: "#7000ff",
    points: [
      "Developed custom web application modules and architectures using PHP (Laravel & CodeIgniter) and MySQL based on requirements.",
      "Analyzed client workflows to translate operational needs into efficient application features.",
      "Engineered an AI-driven HR Employee Burnout Prediction System (React.js/Express.js frontend, Python/Flask ML backend).",
      "Collaborated with clients (university students and small business owners) to ensure final deliverables met expectations."
    ],
  },
];

const education = [
  {
    degree: "Bachelor of Informatics Engineering (GPA: 3.92/4.00)",
    school: "Universitas Buana Perjuangan Karawang",
    period: "2023 - Present (6th-Semester)",
    icon: <Brain size={16} />,
    accent: "#00f0ff"
  },
  {
    degree: "Mathematics and Natural Sciences Major",
    school: "SMA Negeri 1 Telukjambe",
    period: "2020 - 2023",
    icon: <Fingerprint size={16} />,
    accent: "#7000ff"
  }
];

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  
  useEffect(() => {
    let cursorX = 0;
    let cursorY = 0;
    let ringX = 0;
    let ringY = 0;
    let isHovering = false;
    let requestRef;

    const onMouseMove = (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    };

    const onMouseOver = (e) => {
      if (e.target.closest('button, a, .interactive')) {
        if (!isHovering) {
          isHovering = true;
          animate(dotRef.current, { scale: 1.5, duration: 200, easing: 'easeOutSine' });
          animate(ringRef.current, { scale: 1.5, opacity: 0.8, duration: 200, easing: 'easeOutSine' });
        }
      } else {
        if (isHovering) {
          isHovering = false;
          animate(dotRef.current, { scale: 1, duration: 200, easing: 'easeOutSine' });
          animate(ringRef.current, { scale: 1, opacity: 0.4, duration: 200, easing: 'easeOutSine' });
        }
      }
    };

    const loop = () => {
      ringX += (cursorX - ringX) * 0.2;
      ringY += (cursorY - ringY) * 0.2;

      if (dotRef.current && ringRef.current) {
        dotRef.current.style.transform = `translate(${cursorX - 8}px, ${cursorY - 8}px) scale(${isHovering ? 1.5 : 1})`;
        ringRef.current.style.transform = `translate(${ringX - 24}px, ${ringY - 24}px) scale(${isHovering ? 1.5 : 1})`;
      }
      requestRef = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    requestRef = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-4 h-4 bg-[#00f0ff] rounded-full pointer-events-none z-[100] mix-blend-screen" />
      <div ref={ringRef} className="fixed top-0 left-0 w-12 h-12 border border-[#00f0ff] rounded-full pointer-events-none z-[99] opacity-40" />
    </>
  );
}

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

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    animate(ref.current, {
      rotateX: -y * 24,
      rotateY: x * 24,
      scale: 1.05,
      duration: 300,
      easing: 'easeOutQuad'
    });
  };
  
  const handleMouseLeave = () => {
    animate(ref.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 500,
      easing: 'easeOutElastic(1, .5)'
    });
  };

  const handleMouseDown = () => {
    animate(ref.current, { scale: 0.95, duration: 100, easing: 'easeOutSine' });
  };
  const handleMouseUp = () => {
    animate(ref.current, { scale: 1.05, duration: 100, easing: 'easeOutSine' });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={onClick}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={`cursor-none interactive relative ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity rounded-inherit" style={{ transform: "translateZ(1px)" }} />
      {children}
    </div>
  );
}

// ─── MODAL ────────────────────────────────────────────────────────────────────

function Modal({ item, type, onClose }) {
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const esc = (e) => e.key === "Escape" && handleClose();
    window.addEventListener("keydown", esc);
    document.body.style.overflow = "hidden";
    
    animate(overlayRef.current, {
      opacity: [0, 1],
      duration: 300,
      easing: 'easeOutSine'
    });
    
    animate(modalRef.current, {
      translateY: ['100%', 0],
      opacity: [0, 1],
      scale: [0.9, 1],
      duration: 600,
      easing: 'easeOutElastic(1, .8)'
    });

    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, []);

  const handleClose = () => {
    animate(overlayRef.current, {
      opacity: 0,
      duration: 200,
      easing: 'easeInSine'
    });
    animate(modalRef.current, {
      translateY: '100%',
      opacity: 0,
      scale: 0.9,
      duration: 300,
      easing: 'easeInSine',
      complete: onClose
    });
  };

  const accent = type === "project" ? item.accent : item.accent;

  return (
    <div className="fixed inset-0 z-[110] flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div ref={overlayRef} className="absolute inset-0 bg-black/80 backdrop-blur-md opacity-0" onClick={handleClose} />

      <div
        ref={modalRef}
        className="relative z-10 w-full sm:max-w-lg bg-[#0a0a0f] rounded-t-3xl sm:rounded-2xl overflow-hidden border border-white/10 opacity-0"
        style={{ boxShadow: `0 0 80px ${accent}30, inset 0 0 20px ${accent}10` }}
      >
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />

        <div className="p-5 sm:p-6 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl" style={{ background: accent }} />
          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center text-2xl rounded-xl bg-white/5 border border-white/10" style={{ boxShadow: `0 0 20px ${accent}40` }}>
                {type === "project" ? item.emoji : "🎓"}
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-white leading-tight font-sans tracking-tight">{type === "project" ? item.title : item.degree}</h2>
                {type === "edu" && <p className="text-xs text-white/50 mt-1 font-mono">{item.school}</p>}
              </div>
            </div>
            <button onClick={handleClose} className="interactive p-2 rounded-xl bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all hover:rotate-90">
              <X size={16} />
            </button>
          </div>
          {type === "project" && (
            <div className="flex flex-wrap gap-2 mt-5 relative z-10">
              {item.tags.map(t => (
                <span key={t} style={{ color: accent, borderColor: `${accent}40`, background: `${accent}15` }} className="px-2.5 py-1 rounded-md text-xs font-mono border backdrop-blur-sm">{t}</span>
              ))}
            </div>
          )}
        </div>

        <div className="px-5 sm:px-6 pb-2 space-y-5">
          {type === "project" && item.demo && !item.image && (
            <div className="rounded-xl overflow-hidden border border-white/10 relative group" style={{ height: 200 }}>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
              <iframe
                src={item.demo}
                title={item.title}
                className="w-full h-full"
                style={{ pointerEvents: "none", transform: "scale(0.7)", transformOrigin: "top left", width: "142%", height: "142%" }}
              />
            </div>
          )}

          <p className="text-white/70 text-sm leading-relaxed font-sans">{type === "project" ? item.longDesc : `${item.school} | ${item.period}`}</p>

          {type === "project" && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Activity size={14} style={{ color: accent }} />
                <p className="text-xs font-mono text-white/50 uppercase tracking-widest">System Capabilities</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/5 text-xs text-white/80 hover:bg-white/[0.06] transition-colors">
                    <Hexagon size={12} style={{ color: accent }} />
                    {h}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6 pt-6 space-y-3">
          {type === "project" && (
            item.demo ? (
              <a
                href={item.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="interactive w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                style={{ background: `linear-gradient(135deg, ${accent}, #000)`, color: "#fff", border: `1px solid ${accent}` }}
              >
                <Rocket size={16} />
                LAUNCH LIVE DEMO
              </a>
            ) : (
              <button
                disabled
                className="w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 cursor-not-allowed border border-white/10 bg-white/[0.02] text-white/30"
              >
                <Shield size={16} />
                INTERNAL SYSTEM (NO PUBLIC DEMO)
              </button>
            )
          )}
          
          <button onClick={handleClose} className="interactive w-full py-3 rounded-xl border border-white/10 text-sm text-white/50 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all font-mono uppercase tracking-widest">
            Close Interface
          </button>
        </div>
      </div>
    </div>
  );
}

// SCROLL ANIMATION HOOK
function useScrollAnimation(ref, animationOptions, childSelector = null) {
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targets = childSelector ? entry.target.querySelectorAll(childSelector) : entry.target;
            animate(targets, animationOptions);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, animationOptions, childSelector]);
}

// ─── SECTION ──────────────────────────────────────────────────────────────────

function Section({ id, children }) {
  const ref = useRef(null);
  useScrollAnimation(ref, {
    translateY: [60, 0],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutQuart'
  });

  return (
    <section id={id} ref={ref} className="py-20 sm:py-32 px-4 max-w-6xl mx-auto relative z-10 opacity-0">
      {children}
    </section>
  );
}

function SectionLabel({ icon: Icon, label, accent = "#00f0ff" }) {
  return (
    <div className="flex items-center gap-4 mb-12 sm:mb-16">
      <div className="relative">
        <div className="absolute inset-0 blur-md opacity-50 rounded-lg" style={{ background: accent }} />
        <div className="relative p-3 rounded-xl bg-[#0a0a0f] border" style={{ borderColor: `${accent}40` }}>
          <Icon size={18} style={{ color: accent }} />
        </div>
      </div>
      <h2 className="text-xl sm:text-2xl font-black uppercase tracking-[0.3em] font-sans" style={{ color: "#fff" }}>
        {label}
        <span style={{ color: accent }}>_</span>
      </h2>
      <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${accent}50, transparent)` }} />
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    
    animate(navRef.current, {
      translateY: [-100, 0],
      duration: 1000,
      easing: 'easeOutElastic(1, .8)'
    });
    
    return () => window.removeEventListener("scroll", fn);
  }, []);
  
  const scroll = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
        style={scrolled ? { background: "rgba(10,10,15,0.8)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(0,240,255,0.1)" } : { padding: "10px 0" }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 interactive cursor-none" onClick={() => window.scrollTo(0, 0)}>
            <div className="relative flex items-center justify-center w-10 h-10">
              <div className="absolute inset-0 bg-[#00f0ff] blur-md opacity-40 rounded-full animate-pulse" />
              <div className="relative w-full h-full bg-[#0a0a0f] border border-[#00f0ff]/50 rounded-xl flex items-center justify-center transform rotate-45 hover:rotate-90 transition-transform duration-500">
                <Terminal size={16} className="text-[#00f0ff] -rotate-45" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm tracking-widest uppercase text-white leading-none">Luthfi.</span>
              <span className="font-mono text-[10px] text-[#00f0ff] tracking-widest">ONLINE</span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-mono text-white/50 uppercase tracking-widest">
            {["experience", "projects", "skills", "education"].map(s => (
              <button key={s} onClick={() => scroll(s)} className="interactive hover:text-[#00f0ff] transition-colors relative group py-2">
                {s}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#00f0ff] transition-all group-hover:w-full" />
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={() => scroll("contact")} className="interactive hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-sm text-xs font-bold uppercase tracking-widest transition-all relative overflow-hidden group border border-[#00f0ff]/30 bg-[#00f0ff]/5 hover:bg-[#00f0ff]/20 text-[#00f0ff]">
              <span className="relative z-10 flex items-center gap-2"><Wifi size={14} className="animate-pulse" /> Connect</span>
            </button>
            
            <button onClick={() => setMenuOpen(v => !v)} className="interactive md:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-white">
              <div className="space-y-1.5">
                <div className="w-5 h-0.5 bg-white rounded transition-transform" style={{ transform: menuOpen ? 'rotate(45deg) translateY(8px)' : 'none' }} />
                <div className="w-5 h-0.5 bg-white rounded transition-opacity" style={{ opacity: menuOpen ? 0 : 1 }} />
                <div className="w-5 h-0.5 bg-white rounded transition-transform" style={{ transform: menuOpen ? 'rotate(-45deg) translateY(-8px)' : 'none' }} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-30 md:hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[#0a0a0f]/90 backdrop-blur-md" onClick={() => setMenuOpen(false)} />
          <div className="relative z-10 w-full max-w-xs flex flex-col gap-6 p-6">
            {["experience", "projects", "skills", "education", "contact"].map((s, i) => (
              <button
                key={s} onClick={() => scroll(s)}
                className="interactive text-center text-2xl font-black uppercase tracking-widest text-white/50 hover:text-[#00f0ff] transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

// ─── CYBER BACKGROUND ─────────────────────────────────────────────────────────

function CyberBackground() {
  const bgRef = useRef(null);
  
  useEffect(() => {
    animate(document.querySelectorAll('.bg-orb-1'), {
      translateX: [0, 50, 0],
      translateY: [0, -50, 0],
      duration: 20000,
      loop: true,
      easing: 'linear'
    });
    animate(document.querySelectorAll('.bg-orb-2'), {
      translateX: [0, -50, 0],
      translateY: [0, 50, 0],
      duration: 15000,
      loop: true,
      easing: 'linear'
    });
    animate(document.querySelectorAll('.bg-orb-3'), {
      scale: [1, 1.2, 1],
      duration: 10000,
      loop: true,
      easing: 'easeInOutSine'
    });
  }, []);

  return (
    <div ref={bgRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#06080e]">
      <div className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 240, 255, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 240, 255, 0.2) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          transform: "perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)",
        }} />
      <div className="bg-orb-1 absolute rounded-full mix-blend-screen"
        style={{ width: 800, height: 800, top: "-20%", left: "-10%", background: "radial-gradient(circle, rgba(0,240,255,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="bg-orb-2 absolute rounded-full mix-blend-screen"
        style={{ width: 600, height: 600, bottom: "-10%", right: "-10%", background: "radial-gradient(circle, rgba(112,0,255,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
      <div className="bg-orb-3 absolute rounded-full mix-blend-screen"
        style={{ width: 500, height: 500, top: "40%", left: "40%", background: "radial-gradient(circle, rgba(255,0,60,0.03) 0%, transparent 70%)", filter: "blur(60px)" }} />
    </div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  const typed = useTyping(["Software Engineer", "AI & Computer Vision Enthusiast", "Full-Stack Developer", "Industrial Digitalizer"]);
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const heroRef = useRef(null);

  useEffect(() => {
    animate(document.querySelectorAll('.hero-element'), {
      translateY: [30, 0],
      opacity: [0, 1],
      delay: stagger(200, { start: 500 }),
      easing: 'easeOutQuart'
    });
    
    animate(document.querySelectorAll('.scroll-arrow'), {
      translateY: [0, 8, 0],
      loop: true,
      duration: 1500,
      easing: 'easeInOutSine'
    });
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center z-10 pt-20">
      <div className="relative max-w-4xl w-full flex flex-col items-center">
        


        <div className="hero-element opacity-0">
          <h1 className="font-black tracking-tighter leading-none text-white text-5xl sm:text-7xl md:text-8xl mb-2 font-sans uppercase">
            Luthfi
          </h1>
          <h1 className="font-black tracking-tighter leading-none text-5xl sm:text-7xl md:text-8xl mb-4 font-sans uppercase relative inline-block">
            <span className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] via-[#7000ff] to-[#ff003c] blur-xl opacity-50" />
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] via-[#7000ff] to-[#ff003c]">
              Rafananda
            </span>
          </h1>
          <p className="text-white/40 text-lg sm:text-2xl font-light tracking-[0.5em] uppercase mb-12 font-sans">Naufal</p>
        </div>

        <div className="hero-element opacity-0 h-10 flex items-center justify-center mb-8 px-6 py-2 border-l-2 border-r-2 border-[#00f0ff]/50 bg-black/20">
          <span className="text-sm sm:text-xl font-mono text-white/90">{typed}</span>
          <span className="ml-2 w-3 h-5 inline-block bg-[#00f0ff] animate-pulse" />
        </div>

        <p className="hero-element opacity-0 text-white/50 text-sm sm:text-base font-mono mb-12 leading-relaxed max-w-2xl mx-auto">
          Informatics Engineering Student at UBP Karawang (GPA: 3.92).<br/>
          Specializing in AI Integration, Computer Vision QA Systems, and Industrial Web Applications.
        </p>

        <div className="hero-element opacity-0 flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
          <button
            onClick={() => scroll("projects")}
            className="interactive group relative flex items-center justify-center gap-3 px-8 py-4 bg-transparent border-2 border-[#00f0ff] text-[#00f0ff] font-black uppercase tracking-widest text-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#00f0ff] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <span className="relative z-10 group-hover:text-black transition-colors duration-300">Initialize Projects</span>
            <Terminal size={16} className="relative z-10 group-hover:text-black transition-colors duration-300" />
          </button>
          
          <button
            onClick={() => scroll("contact")}
            className="interactive group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 border border-white/10 hover:border-[#7000ff]/50 text-white font-bold uppercase tracking-widest text-sm transition-all hover:bg-[#7000ff]/10"
          >
            <Mail size={16} className="text-[#7000ff]" />
            Establish Link
          </button>
        </div>

        {/* Cyber stats */}
        <div className="hero-element opacity-0 grid grid-cols-2 sm:grid-cols-4 gap-4 w-full mt-20">
          {[
            { v: "3.92", l: "GPA_SCORE", c: "#00f0ff" },
            { v: "70%", l: "ERROR_REDUCED", c: "#ff003c" },
            { v: "1st", l: "TECHNOVISION", c: "#7000ff" },
            { v: "100%", l: "DEDICATION", c: "#00f0ff" }
          ].map((stat, i) => (
            <div key={i} className="p-4 border border-white/5 bg-black/40 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1" style={{ background: stat.c, opacity: 0.5 }} />
              <p className="text-2xl sm:text-3xl font-black mb-1 font-sans" style={{ color: stat.c }}>{stat.v}</p>
              <p className="text-[10px] font-mono text-white/40 tracking-widest uppercase">{stat.l}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="hero-element opacity-0 absolute bottom-10 left-1/2 -translate-x-1/2 text-[#00f0ff]/50 flex flex-col items-center gap-2 cursor-none">
        <span className="text-[10px] font-mono tracking-widest">SCROLL_DOWN</span>
        <div className="scroll-arrow">
          <ChevronDown size={20} />
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

function Experience() {
  const listRef = useRef(null);
  useScrollAnimation(listRef, {
    translateY: [40, 0],
    opacity: [0, 1],
    delay: stagger(150),
    easing: 'easeOutQuart'
  }, '.stagger-item');

  return (
    <Section id="experience">
      <SectionLabel icon={Activity} label="Experience Logs" accent="#ff003c" />
      <div className="relative" ref={listRef}>
        {/* Neon Line */}
        <div className="absolute left-[20px] sm:left-[27px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff003c] via-[#7000ff] to-transparent opacity-50" />
        
        <div className="space-y-12">
          {experience.map((exp, i) => (
            <div key={i} className="stagger-item relative pl-14 sm:pl-20 opacity-0">
              {/* Glowing Node */}
              <div className="absolute left-[9px] sm:left-[16px] top-6 w-6 h-6 rounded-sm bg-[#0a0a0f] border-2 flex items-center justify-center z-10 rotate-45"
                style={{ borderColor: exp.accent, boxShadow: `0 0 15px ${exp.accent}60` }}>
                <div className="-rotate-45" style={{ color: exp.accent }}>{exp.icon}</div>
              </div>

              <TiltCard className="p-1">
                <div className="p-6 sm:p-8 rounded-lg border border-white/10 bg-[#0a0a0f]/80 backdrop-blur-md relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10 bg-gradient-to-bl blur-3xl pointer-events-none" style={{ backgroundImage: `linear-gradient(to bottom left, ${exp.accent}, transparent)` }} />
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/5 pb-4">
                    <div>
                      <h3 className="text-white font-black text-lg sm:text-xl font-sans uppercase tracking-wide">{exp.role}</h3>
                      <p className="text-white/60 font-mono text-sm mt-1">{exp.company}</p>
                    </div>
                    <div className="px-3 py-1.5 border rounded-sm font-mono text-xs uppercase tracking-widest whitespace-nowrap"
                      style={{ borderColor: `${exp.accent}40`, color: exp.accent, backgroundColor: `${exp.accent}10` }}>
                      {exp.period}
                    </div>
                  </div>
                  
                  <ul className="space-y-3">
                    {exp.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-white/70 font-mono leading-relaxed">
                        <span className="mt-1 flex-shrink-0" style={{ color: exp.accent }}>▹</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

function Projects({ onOpen }) {
  const gridRef = useRef(null);
  useScrollAnimation(gridRef, {
    scale: [0.95, 1],
    opacity: [0, 1],
    delay: stagger(100),
    easing: 'easeOutQuart'
  }, '.stagger-item');

  return (
    <Section id="projects">
      <SectionLabel icon={Layers} label="Deployed Modules" accent="#00f0ff" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={gridRef}>
        {projects.map((proj, i) => (
          <div key={proj.id} className="stagger-item opacity-0">
            <TiltCard onClick={() => onOpen(proj, "project")}
              className="h-full group">
              <div className="h-full p-6 sm:p-8 rounded-xl border border-white/10 bg-[#0a0a0f]/60 backdrop-blur-md relative overflow-hidden flex flex-col transition-colors group-hover:border-white/30"
                style={{ boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.02)` }}>
                
                {/* Cyber Grid Bg inside card */}
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                
                <div className="absolute -right-10 -top-10 w-40 h-40 opacity-20 blur-3xl rounded-full transition-opacity group-hover:opacity-40" style={{ background: proj.accent }} />

                <div className="relative z-10" style={{ transform: "translateZ(30px)" }}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 flex items-center justify-center text-2xl bg-black border rounded-lg" style={{ borderColor: `${proj.accent}50`, color: proj.accent, boxShadow: `0 0 15px ${proj.accent}30` }}>
                      {proj.emoji}
                    </div>
                    <div className="p-2 bg-white/5 rounded-full text-white/30 group-hover:text-white transition-colors group-hover:rotate-45 duration-300">
                      <ExternalLink size={16} />
                    </div>
                  </div>
                  
                  <h3 className="text-white font-black text-xl mb-3 font-sans uppercase leading-tight tracking-tight">{proj.title}</h3>
                  <p className="text-white/50 text-sm mb-6 flex-grow font-mono leading-relaxed">{proj.shortDesc}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {proj.tags.slice(0, 3).map(t => (
                      <span key={t} className="px-2 py-1 rounded-sm text-[10px] font-mono border uppercase tracking-wider"
                        style={{ color: proj.accent, borderColor: `${proj.accent}30`, backgroundColor: `${proj.accent}05` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

function Skills() {
  const skillsRef = useRef(null);
  useScrollAnimation(skillsRef, {
    translateY: [30, 0],
    opacity: [0, 1],
    delay: stagger(150),
    easing: 'easeOutQuad'
  }, '.stagger-item');

  return (
    <Section id="skills">
      <SectionLabel icon={Cpu} label="System Capabilities" accent="#7000ff" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6" ref={skillsRef}>
        {skills.map((group, i) => (
          <div key={group.label} className="stagger-item opacity-0 p-6 sm:p-8 rounded-xl border border-white/10 bg-[#0a0a0f]/60 backdrop-blur-md relative overflow-hidden group">
            
            <div className="absolute bottom-0 left-0 w-full h-1 transition-all duration-300 opacity-50 group-hover:opacity-100" style={{ background: group.accent }} />

            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-lg border bg-black" style={{ borderColor: `${group.accent}40`, boxShadow: `0 0 20px ${group.accent}20` }}>
                <group.icon size={20} style={{ color: group.accent }} />
              </div>
              <span className="text-sm font-black text-white uppercase tracking-widest font-sans">{group.label}</span>
            </div>
            
            <div className="flex flex-wrap gap-2.5">
              {group.items.map((item, j) => (
                <span key={item}
                  className="interactive px-3 py-1.5 rounded-sm text-xs font-mono border border-white/10 bg-white/5 text-white/70 hover:text-white transition-all cursor-none uppercase tracking-wide"
                  style={{
                    ':hover': { borderColor: group.accent, backgroundColor: `${group.accent}10`, color: group.accent, transform: 'translateY(-2px)' }
                  }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── EDUCATION ───────────────────────────────────────────────────────────

function Education({ onOpen }) {
  const eduRef = useRef(null);
  useScrollAnimation(eduRef, {
    scale: [0.95, 1],
    opacity: [0, 1],
    delay: stagger(150),
    easing: 'easeOutQuad'
  }, '.stagger-item');

  return (
    <Section id="education">
      <SectionLabel icon={Brain} label="Education & Core Data" accent="#00f0ff" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6" ref={eduRef}>
        {education.map((edu, i) => (
          <div key={i} className="stagger-item opacity-0">
            <TiltCard onClick={() => onOpen(edu, "edu")}
              className="h-full group">
              <div className="h-full p-6 sm:p-8 rounded-xl border border-white/10 bg-[#0a0a0f]/60 backdrop-blur-md relative overflow-hidden transition-all group-hover:border-white/30">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl blur-3xl opacity-10 group-hover:opacity-30 transition-opacity" style={{ from: edu.accent, to: "transparent" }} />
                <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl mb-6 border bg-black"
                    style={{ borderColor: `${edu.accent}50`, color: edu.accent, boxShadow: `0 0 15px ${edu.accent}30` }}>
                    {edu.icon}
                  </div>
                  <p className="text-white/40 text-xs font-mono uppercase tracking-widest mb-2">{edu.school}</p>
                  <h3 className="text-white text-lg font-black font-sans uppercase leading-snug mb-4">{edu.degree}</h3>
                  <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-sm text-xs font-mono text-white/50">
                    {edu.period}
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  const footRef = useRef(null);
  useScrollAnimation(footRef, {
    translateY: [30, 0],
    opacity: [0, 1],
    duration: 800,
    easing: 'easeOutQuart'
  });

  return (
    <footer id="contact" className="py-24 px-4 relative overflow-hidden bg-black/50 border-t border-white/10 mt-20">
      <div className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: "radial-gradient(circle at center, #00f0ff 0%, transparent 50%)", backgroundSize: "100% 100%" }} />
      
      <div className="max-w-4xl mx-auto text-center relative z-10 opacity-0" ref={footRef}>
        <div>
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-sm text-xs font-mono tracking-widest uppercase mb-8 border border-[#7000ff]/40 bg-[#7000ff]/10 text-[#7000ff]">
            <Sparkles size={14} className="animate-pulse" />
            Initialization Complete
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tighter uppercase font-sans">Establish Connection</h2>
          <p className="text-white/40 text-sm sm:text-base font-mono mb-12 max-w-xl mx-auto leading-relaxed">
            Ready to integrate into complex digitalization projects involving information systems, IoT, and AI.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            {[
              { href: "https://github.com/Luthfi-2004", icon: GitBranch, label: "GITHUB_PROFILE", accent: "#ffffff" },
              { href: "https://www.linkedin.com/in/luthfirafanandanaufal/", icon: Linkedin, label: "LINKEDIN_NETWORK", accent: "#00f0ff" },
              { href: "mailto:luthfi.rafanandanaufal@gmail.com", icon: Mail, label: "SECURE_EMAIL", accent: "#ff003c" },
            ].map(({ href, icon: Icon, label, accent }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                className="interactive flex items-center justify-center gap-3 px-6 py-4 rounded-sm text-xs font-bold font-sans uppercase tracking-widest border border-white/10 bg-white/5 transition-all overflow-hidden relative group hover:scale-[1.02] active:scale-[0.98]">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity" style={{ background: accent }} />
                <Icon size={16} className="relative z-10" style={{ color: accent }} />
                <span className="relative z-10 text-white group-hover:text-white transition-colors">{label}</span>
              </a>
            ))}
          </div>
          
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-[10px] font-mono tracking-widest uppercase">© 2026 LUTHFI RAFANANDA NAUFAL. ALL RIGHTS RESERVED.</p>
            <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse" />
              SECURE
            </div>
          </div>
        </div>
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
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; cursor: none !important; }
        html { scroll-behavior: smooth; background: #06080e; }
        body { margin: 0; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #06080e; }
        ::-webkit-scrollbar-thumb { background: rgba(0,240,255,0.3); border-radius: 0; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0,240,255,0.6); }
        h1, h2, h3 { font-family: 'Inter', sans-serif; }
        p, span, div { font-family: 'JetBrains Mono', monospace; }
        ::selection { background: rgba(0,240,255,0.3); color: white; }
      `}</style>
      
      <CustomCursor />
      
      <div className="min-h-screen text-white relative selection:bg-[#00f0ff]/30 selection:text-white">
        <CyberBackground />
        
        <Navbar />
        <Hero />
        <Experience />
        <Projects onOpen={openModal} />
        <Skills />
        <Education onOpen={openModal} />
        <Footer />
        
        {modal && <Modal item={modal.item} type={modal.type} onClose={closeModal} />}
      </div>
    </>
  );
}