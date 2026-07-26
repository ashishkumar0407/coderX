import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Menu, X, ChevronDown, Star, Linkedin, Instagram, Youtube, Facebook,
  Play, Award, Users, Briefcase, TrendingUp, Code2, Database, Cpu,
  Terminal, Brain, CheckCircle2, ArrowRight, Download, Phone, Mail,
  User, Clock, BarChart3, Sparkles, ChevronLeft, ChevronRight, X as XIcon
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Fonts                                                               */
/* ------------------------------------------------------------------ */
function useGoogleFonts() {
  useEffect(() => {
    if (document.getElementById("cx-fonts")) return;
    const link = document.createElement("link");
    link.id = "cx-fonts";
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Poppins:wght@500;600;700;800&family=Inter:wght@400;500;600;700&display=swap";
    document.head.appendChild(link);
  }, []);
}

/* ------------------------------------------------------------------ */
/* Scroll reveal hook                                                  */
/* ------------------------------------------------------------------ */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.7s cubic-bezier(.21,.9,.32,1) ${delay}ms, transform 0.7s cubic-bezier(.21,.9,.32,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Count-up number                                                     */
/* ------------------------------------------------------------------ */
function CountUp({ target, suffix = "", duration = 1600 }) {
  const [val, setVal] = useState(0);
  const [ref, visible] = useReveal();
  useEffect(() => {
    if (!visible) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setVal(target);
    };
    requestAnimationFrame(step);
  }, [visible, target, duration]);
  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Validation helpers                                                  */
/* ------------------------------------------------------------------ */
const isValidMobile = (v) => /^[6-9]\d{9}$/.test(v.trim());
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());

/* ------------------------------------------------------------------ */
/* Data                                                                 */
/* ------------------------------------------------------------------ */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Programs", href: "#accelerator" },
  { label: "Courses", href: "#courses" },
  { label: "Mentors", href: "#mentors" },
  { label: "Success Stories", href: "#stories" },
  { label: "Contact", href: "#contact" },
];

const COURSES = [
  {
    icon: Code2,
    title: "Full Stack Development",
    desc: "Build and ship production web apps with React, Node.js and databases.",
    duration: "6 Months",
    level: "Beginner to Advanced",
  },
  {
    icon: BarChart3,
    title: "Data Science",
    desc: "Turn raw data into decisions with statistics, Python and visualization.",
    duration: "5 Months",
    level: "Intermediate",
  },
  {
    icon: Terminal,
    title: "Python Programming",
    desc: "Go from fundamentals to automation, scripting and backend basics.",
    duration: "3 Months",
    level: "Beginner",
  },
  {
    icon: Cpu,
    title: "Java Development",
    desc: "Master core Java, OOP and enterprise-grade backend engineering.",
    duration: "4 Months",
    level: "Beginner to Intermediate",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    desc: "Design and deploy real ML models, from theory to applied projects.",
    duration: "6 Months",
    level: "Intermediate to Advanced",
  },
  {
    icon: Database,
    title: "DSA + Interview Prep",
    desc: "Crack technical interviews with structured problem solving practice.",
    duration: "4 Months",
    level: "All Levels",
  },
];

const ACCELERATOR_FEATURES = [
  "Live Classes",
  "Resume Building",
  "LinkedIn Optimization",
  "Mock Interviews",
  "Weekly Assessments",
  "Career Mentorship",
  "Real Projects",
  "Placement Preparation",
];

const MENTORS = [
  { name: "Rituraj Singh Gour", company: "Adobe, Amazon", linkedin: "https://www.linkedin.com/in/rituraj-singh-gour-bb7721171/", image: "/assets/mentors/rituraj.jpg" },
  { name: "Varun Tyagi", company: "Booking.com (Europe)", linkedin: "https://www.linkedin.com/in/varuntyagi-3112/", image: "/assets/mentors/varuntyagi.jpg" },
  { name: "Nishant Sharma", company: "Industry Mentor", linkedin: "https://www.linkedin.com/in/nishant-sharma05/", image: "/assets/mentors/NIshant.jpg" },
  { name: "Mohit Ranawat", company: "Target, Visa", linkedin: "https://www.linkedin.com/in/mohitranawat/", image: "/assets/mentors/Mohit.jpg" },
  { name: "Sukrati Pateriya", company: "Amazon", linkedin: "https://www.linkedin.com/in/sukrati7/", image: "/assets/mentors/sukrati.jpg" },
  { name: "Sanskar Rastogi", company: "PayPal", linkedin: "https://www.linkedin.com/in/sanskar-rastogi/", image: "/assets/mentors/Sanskar.jpeg" },
  { name: "Abhishek Kaundal", company: "PayPal", linkedin: "https://www.linkedin.com/in/abhishek-kaundal-209b58129/", image: "/assets/mentors/abhishek.jpg" },
  { name: "Mradul Saraf", company: "Industry Mentor", linkedin: "https://www.linkedin.com/in/mradul-saraf-97414781/", image: "/assets/mentors/mradul.jpg" },
];

const TESTIMONIALS = [
  { name: "Aditya Dwivedi", org: "Tata Consultancy Services", linkedin: "https://www.linkedin.com/in/aditya-dwivedi-19355b151", image: "/assets/learner/Aditya.jpeg" },
  { name: "Muskan Singhal", org: "Deloitte", linkedin: "https://www.linkedin.com/in/muskan-singhal-29267a190", image: "/assets/learner/muskan.jpg" },
  { name: "Priyanka Bind", org: "Capgemini", linkedin: "https://www.linkedin.com/in/priyanka-bind-13a732186", image: "/assets/learner/priyanka.png" },
  { name: "Saketh Reddy Sheri", org: "EY", linkedin: "https://www.linkedin.com/in/saketh-reddy-sheri-92b357137", image: "/assets/learner/saketh.jpg" },
  { name: "Sarthak Bhatt", org: "Accenture", linkedin: "https://www.linkedin.com/in/sarthak-bhatt-a750431a2", image: "/assets/learner/sathak.jpg" },
  { name: "Isha Agarwal", org: "Bank of America (BOA)", linkedin: "https://www.linkedin.com/in/isha-agrawal-141ba21b5", image: "/assets/learner/isha.jpg" },
];

const COMPANY_LOGOS = [
  "Screenshot 2026-07-26 000030.png",
  "Screenshot 2026-07-26 000036.png",
  "Screenshot 2026-07-26 000041.png",
  "Screenshot 2026-07-26 000046.png",
  "Screenshot 2026-07-26 000052.png",
  "Screenshot 2026-07-26 000101.png",
  "Screenshot 2026-07-26 000120.png",
  "Screenshot 2026-07-26 000128.png",
  "Screenshot 2026-07-26 000132.png",
  "Screenshot 2026-07-26 000136.png"
];

const FAQS = [
  {
    q: "How do classes work?",
    a: "Classes run live over video with an instructor, followed by hands-on practice and doubt-clearing sessions each week.",
  },
  {
    q: "Are recordings available?",
    a: "Yes, every live class is recorded and added to your dashboard within a few hours for lifetime access.",
  },
  {
    q: "Is placement support included?",
    a: "Every program includes resume building, mock interviews and access to our 200+ hiring partner network.",
  },
  {
    q: "Who can join?",
    a: "Students, freshers and working professionals looking to build job-ready technical skills can all join.",
  },
  {
    q: "What is course duration?",
    a: "Programs range from 3 to 6 months depending on the track you choose, with flexible weekday and weekend batches.",
  },
  {
    q: "How do I download syllabus?",
    a: "Click 'Download Syllabus' at the top of the page, share a few quick details, and the PDF downloads instantly.",
  },
];

/* ------------------------------------------------------------------ */
/* Reusable UI atoms                                                   */
/* ------------------------------------------------------------------ */
function RippleButton({ children, className = "", onClick, type = "button", variant = "primary" }) {
  const [ripples, setRipples] = useState([]);
  const base =
    "relative overflow-hidden inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300 active:scale-[0.97]";
  const variants = {
    primary:
      "bg-[#2563EB] text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5",
    secondary:
      "bg-blue-50 text-[#2563EB] border-2 border-[#2563EB] hover:bg-[#2563EB] hover:text-white hover:-translate-y-0.5",
    accent:
      "bg-[#38BDF8] text-white shadow-lg shadow-sky-400/30 hover:bg-sky-500 hover:-translate-y-0.5",
    dark: "bg-slate-900 text-white border-2 border-slate-900 hover:bg-white hover:text-slate-900 hover:-translate-y-0.5",
  };

  const fire = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const id = Date.now();
    const size = Math.max(rect.width, rect.height) * 2;
    setRipples((r) => [
      ...r,
      { id, x: e.clientX - rect.left - size / 2, y: e.clientY - rect.top - size / 2, size },
    ]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 650);
    onClick && onClick(e);
  };

  return (
    <button type={type} onClick={fire} className={`${base} ${variants[variant]} ${className}`}>
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/40 pointer-events-none"
          style={{
            left: r.x,
            top: r.y,
            width: r.size,
            height: r.size,
            animation: "cx-ripple 650ms ease-out forwards",
          }}
        />
      ))}
      {children}
    </button>
  );
}

function Field({ icon: Icon, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      )}
      <input
        {...props}
        className={`w-full ${Icon ? "pl-10" : "pl-4"} pr-4 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] transition`}
      />
    </div>
  );
}

function Select({ icon: Icon, children, ...props }) {
  return (
    <div className="relative">
      {Icon && (
        <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
      )}
      <select
        {...props}
        className={`w-full appearance-none ${Icon ? "pl-10" : "pl-4"} pr-10 py-3 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB] transition`}
      >
        {children}
      </select>
      <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                               */
/* ------------------------------------------------------------------ */
function Navbar({ onDownloadClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-lg shadow-sm" : "bg-white/40 backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center">
          <img src="/logo.svg" alt="CodersX Academy Logo" className="h-14 w-auto object-contain" />
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-slate-600 hover:text-[#2563EB] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <RippleButton variant="primary" className="px-5 py-2.5 text-sm" onClick={onDownloadClick}>
            <Download className="w-4 h-4" /> Download Syllabus
          </RippleButton>
        </div>

        <button className="lg:hidden text-slate-700" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-5 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-slate-700"
            >
              {l.label}
            </a>
          ))}
          <RippleButton variant="primary" className="w-full py-2.5 text-sm" onClick={onDownloadClick}>
            <Download className="w-4 h-4" /> Download Syllabus
          </RippleButton>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                                 */
/* ------------------------------------------------------------------ */
function Hero({ onDownloadClick }) {
  const stats = [
    { label: "Students", value: 5000, suffix: "+" },
    { label: "Hiring Partners", value: 200, suffix: "+" },
    { label: "Placement Support", value: 95, suffix: "%" },
    { label: "Expert Mentors", value: 50, suffix: "+" },
  ];

  return (
    <section id="home" className="relative pt-32 pb-24 overflow-hidden header">
      {/* Animated gradient blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#38BDF8]/25 rounded-full blur-3xl cx-blob" />
      <div className="absolute top-40 -right-24 w-[28rem] h-[28rem] bg-[#2563EB]/20 rounded-full blur-3xl cx-blob" style={{ animationDelay: "2s" }} />
      <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-white -z-10" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-[#2563EB] text-xs font-semibold mb-6">
              <Sparkles className="w-3.5 h-3.5" /> India's Career-First Coding Academy
            </span>
            <h1 className="font-[Poppins] font-extrabold text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.1] text-slate-900">
              Learn Today. <span className="text-[#2563EB]">Get Hired</span> Tomorrow.
            </h1>
            <p className="mt-6 text-slate-600 text-lg leading-relaxed max-w-xl">
              Master Full Stack Development, Data Science, AI, Python, Java, DSA and
              Interview Preparation with industry experts.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <RippleButton variant="primary" className="px-7 py-3.5" onClick={onDownloadClick}>
                <Download className="w-4 h-4" /> Download Syllabus
              </RippleButton>
              <RippleButton
                variant="secondary"
                className="px-7 py-3.5"
                onClick={() => document.getElementById("courses")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore Courses <ArrowRight className="w-4 h-4" />
              </RippleButton>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-[Poppins] font-bold text-2xl sm:text-3xl text-slate-900">
                    <CountUp target={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative h-[420px] hidden sm:block">
            <div className="absolute inset-0 flex items-center justify-center">
              <img src="/hero-image.jpg" alt="Student Coding" className="w-96 h-96 object-contain mix-blend-multiply drop-shadow-2xl z-0 -translate-y-8" />
            </div>
            <div className="absolute top-6 left-2 w-56 bg-white/70 backdrop-blur-md border border-white/60 rounded-2xl shadow-xl p-4 cx-float">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
              </div>
              <p className="font-mono text-[11px] text-slate-700 leading-5">
                const future = <span className="text-[#2563EB]">you</span>.code();<br />
                future.<span className="text-[#38BDF8]">launch</span>();
              </p>
            </div>
            <div className="absolute bottom-10 right-0 w-52 bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-xl p-4 cx-float" style={{ animationDelay: "1.2s" }}>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span className="text-sm font-semibold text-slate-800">Offer Accepted</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Full Stack Developer</p>
            </div>
            <div className="absolute top-1/2 right-6 -translate-y-1/2 w-40 bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl shadow-xl p-3 cx-float" style={{ animationDelay: "0.6s" }}>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">4.9 avg course rating</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Achievements                                                        */
/* ------------------------------------------------------------------ */
function Achievements() {
  const cards = [
    { icon: Users, value: 5000, suffix: "+", label: "Students Trained" },
    { icon: Briefcase, value: 95, suffix: "%", label: "Placement Assistance" },
    { icon: TrendingUp, value: 200, suffix: "+", label: "Hiring Partners" },
    { icon: Award, value: 50, suffix: "+", label: "Industry Expert Mentors" },
  ];
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="font-[Poppins] font-bold text-3xl sm:text-4xl text-center text-slate-900">
            Why Students Choose <span className="text-[#2563EB]">CodersX Academy</span>
          </h2>
        </Reveal>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 100}>
              <div className="group bg-white rounded-2xl p-7 shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 h-full">
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-5 group-hover:bg-[#2563EB] transition-colors">
                  <c.icon className="w-6 h-6 text-[#2563EB] group-hover:text-white transition-colors" />
                </div>
                <div className="font-[Poppins] font-extrabold text-3xl text-slate-900">
                  <CountUp target={c.value} suffix={c.suffix} />
                </div>
                <p className="text-sm text-slate-500 mt-2">{c.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Courses                                                              */
/* ------------------------------------------------------------------ */
function Courses() {
  return (
    <section id="courses" className="py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-[Poppins] font-bold text-3xl sm:text-4xl text-slate-900">Our Courses</h2>
            <p className="mt-3 text-slate-600">
              Industry-focused programs designed with hiring partners to make you job-ready.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COURSES.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 100}>
              <div className="group bg-white rounded-2xl border border-slate-100 shadow-sm p-7 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 h-full flex flex-col">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#38BDF8] flex items-center justify-center mb-5 shadow-md shadow-blue-500/30">
                  <c.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-[Poppins] font-semibold text-lg text-slate-900">{c.title}</h3>
                <p className="text-sm text-slate-500 mt-2 flex-1">{c.desc}</p>
                <div className="flex items-center gap-4 mt-5 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {c.duration}</span>
                  <span className="flex items-center gap-1"><BarChart3 className="w-3.5 h-3.5" /> {c.level}</span>
                </div>
                <button className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] group-hover:gap-2.5 transition-all">
                  Learn More <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Accelerator                                                         */
/* ------------------------------------------------------------------ */
function Accelerator({ onJoinClick }) {
  return (
    <section id="accelerator" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#38BDF8] p-10 sm:p-14">
            <div className="absolute -top-16 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

            <div className="relative grid lg:grid-cols-[1.1fr_1fr] gap-12 items-center">
              <div>
                <span className="inline-block px-3 py-1.5 rounded-full bg-white/15 text-white text-xs font-semibold mb-5">
                  Premium Program
                </span>
                <h2 className="font-[Poppins] font-bold text-3xl sm:text-4xl text-white">
                  Career Accelerator Program
                </h2>
                <p className="mt-4 text-blue-50/90 max-w-md">
                  A guided sprint to your first tech job — live mentorship, real projects and
                  interview-ready polish, end to end.
                </p>
                <div className="mt-8">
                  <RippleButton variant="dark" className="px-7 py-3.5" onClick={onJoinClick}>
                    Join Accelerator <ArrowRight className="w-4 h-4" />
                  </RippleButton>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {ACCELERATOR_FEATURES.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 text-white text-sm font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#38BDF8] shrink-0" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Callback form                                                       */
/* ------------------------------------------------------------------ */
function CallbackForm() {
  const [form, setForm] = useState({ name: "", mobile: "", email: "", course: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!isValidMobile(form.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
    if (!isValidEmail(form.email)) e.email = "Enter a valid email";
    if (!form.course) e.course = "Please select a course";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/60 p-8 sm:p-12">
            {!submitted ? (
              <>
                <div className="text-center mb-8">
                  <h2 className="font-[Poppins] font-bold text-2xl sm:text-3xl text-slate-900">
                    Talk to Our Career Expert
                  </h2>
                  <p className="text-slate-500 mt-2 text-sm">
                    Share your details and we'll call you back within minutes.
                  </p>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Field icon={User} placeholder="Full Name" value={form.name} onChange={update("name")} />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Field icon={Phone} placeholder="Mobile Number" value={form.mobile} onChange={update("mobile")} />
                    {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
                  </div>
                  <div>
                    <Field icon={Mail} placeholder="Email" value={form.email} onChange={update("email")} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Select icon={Code2} value={form.course} onChange={update("course")}>
                      <option value="">Interested Course</option>
                      {COURSES.map((c) => (
                        <option key={c.title} value={c.title}>{c.title}</option>
                      ))}
                    </Select>
                    {errors.course && <p className="text-xs text-red-500 mt-1">{errors.course}</p>}
                  </div>
                </div>
                <RippleButton variant="primary" className="w-full mt-7 py-3.5" onClick={handleSubmit}>
                  Request Callback
                </RippleButton>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-[Poppins] font-bold text-xl text-slate-900">
                  Thank you! Our career expert will contact you shortly.
                </h3>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Download syllabus modal                                             */
/* ------------------------------------------------------------------ */
function SyllabusModal({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", mobile: "", email: "", otp: "" });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setStep(1);
      setForm({ name: "", mobile: "", email: "", otp: "" });
      setErrors({});
      setDone(false);
      setLoading(false);
    }
  }, [open]);

  if (!open) return null;

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const validateStep1 = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!isValidMobile(form.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
    if (!isValidEmail(form.email)) e.email = "Enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSendOTP = async () => {
    if (loading) return;
    if (!validateStep1()) return;
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, mobile: form.mobile, email: form.email })
      });
      const data = await res.json();
      if (res.ok) {
        setStep(2);
      } else {
        setErrors({ submit: data.error || "Failed to send OTP" });
      }
    } catch (err) {
      setErrors({ submit: "Network error. Is the backend server running?" });
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    if (loading) return;
    if (!form.otp || form.otp.length < 4) {
      setErrors({ otp: "Enter a valid OTP" });
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: form.mobile, otp: form.otp })
      });
      const data = await res.json();
      if (res.ok) {
        setDone(true);
      } else {
        setErrors({ otp: data.error || "Invalid OTP" });
      }
    } catch (err) {
      setErrors({ otp: "Network error. Is the backend server running?" });
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-7 sm:p-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <XIcon className="w-5 h-5" />
        </button>

        {done ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
              <Download className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="font-[Poppins] font-bold text-xl text-slate-900">
              Authentication Successful!
            </h3>
            <p className="text-sm text-slate-500 mt-2">Check your downloads folder for the Syllabus PDF.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-6">
              <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-[#2563EB]" : "bg-slate-200"}`} />
              <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-[#2563EB]" : "bg-slate-200"}`} />
            </div>

            {step === 1 ? (
              <>
                <h3 className="font-[Poppins] font-bold text-xl text-slate-900 mb-1">Download Syllabus</h3>
                <p className="text-sm text-slate-500 mb-6">Step 1 of 2 — Your details</p>
                <div className="space-y-4">
                  <div>
                    <Field icon={User} placeholder="Name" value={form.name} onChange={update("name")} disabled={loading} />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Field icon={Phone} placeholder="Mobile Number" value={form.mobile} onChange={update("mobile")} disabled={loading} />
                    {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
                  </div>
                  <div>
                    <Field icon={Mail} placeholder="Email" value={form.email} onChange={update("email")} disabled={loading} />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>
                {errors.submit && <p className="text-sm text-red-500 mt-4 text-center font-semibold">{errors.submit}</p>}
                <RippleButton variant="primary" className="w-full mt-6 py-3.5" onClick={handleSendOTP}>
                  {loading ? "Sending OTP..." : "Continue"} <ArrowRight className="w-4 h-4 ml-1 inline-block" />
                </RippleButton>
              </>
            ) : (
              <>
                <h3 className="font-[Poppins] font-bold text-xl text-slate-900 mb-1">Verify Mobile Number</h3>
                <p className="text-sm text-slate-500 mb-6">Step 2 of 2 — Enter OTP sent to {form.mobile}</p>
                <div>
                  <Field icon={CheckCircle2} placeholder="6-digit OTP" value={form.otp} onChange={update("otp")} disabled={loading} maxLength={6} />
                  {errors.otp && <p className="text-xs text-red-500 mt-1">{errors.otp}</p>}
                </div>
                <div className="flex gap-3 mt-6">
                  <RippleButton variant="secondary" className="flex-1 py-3.5" onClick={() => setStep(1)}>
                    Back
                  </RippleButton>
                  <RippleButton variant="primary" className="flex-1 py-3.5" onClick={handleVerifyOTP}>
                    {loading ? "Verifying..." : <><Download className="w-4 h-4 mr-1 inline-block" /> Verify & Download</>}
                  </RippleButton>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mentors carousel                                                    */
/* ------------------------------------------------------------------ */
function Mentors() {
  return (
    <section id="mentors" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="flex items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="font-[Poppins] font-bold text-3xl sm:text-4xl text-slate-900">Meet Your Mentors</h2>
              <p className="text-slate-600 mt-2">Learn directly from engineers at top companies.</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <div className="flex gap-6 w-max animate-marquee hover:[animation-play-state:paused] pb-4 px-6">
          {[...MENTORS, ...MENTORS].map((m, i) => (
            <div key={i + "-" + m.name} className="shrink-0 w-64 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-300 p-6 text-center">
              {m.image ? (
                <img 
                  src={m.image} 
                  alt={m.name} 
                  className="w-20 h-20 rounded-full mx-auto object-cover border-2 border-[#2563EB]/20 bg-slate-100"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className="w-20 h-20 rounded-full mx-auto bg-gradient-to-br from-[#2563EB] to-[#38BDF8] flex items-center justify-center text-white font-[Poppins] font-bold text-xl"
                style={{ display: m.image ? 'none' : 'flex' }}
              >
                {m.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <h3 className="font-[Poppins] font-semibold text-slate-900 mt-4">{m.name}</h3>
              <p className="text-xs font-semibold text-[#2563EB] mt-1">{m.company}</p>
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-full px-3.5 py-1.5 hover:border-[#2563EB] hover:text-[#2563EB] transition"
              >
                <Linkedin className="w-3.5 h-3.5" /> LinkedIn
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Testimonials / Trusted by                                           */
/* ------------------------------------------------------------------ */
function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const t = TESTIMONIALS[currentIndex];

  return (
    <section id="stories" className="py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-[Poppins] font-bold text-3xl sm:text-4xl text-slate-900">Trusted by Learners</h2>
            <p className="mt-3 text-slate-600">Real stories from students who landed their first tech role.</p>
          </div>
        </Reveal>

        <Reveal>
          <div className="w-full max-w-md mx-auto aspect-[3/4] sm:aspect-[4/5] relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 group">
            {/* Background Image Placeholder (until user uploads real ones) */}
            <img 
              src={t.image || `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800`} 
              alt={t.name}
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90" />

            {/* Progress Bars */}
            <div className="absolute top-4 left-4 right-4 flex gap-2 z-30">
              {TESTIMONIALS.map((_, i) => (
                <div key={i} className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                  {i === currentIndex && (
                    <div key={currentIndex} className="h-full bg-white animate-story-progress" />
                  )}
                  {i < currentIndex && (
                    <div className="h-full bg-white" />
                  )}
                </div>
              ))}
            </div>

            {/* Content Overlay */}
            <div className="absolute top-10 left-6 z-30">
              <h3 className="text-white font-bold text-4xl font-[Poppins] drop-shadow-lg">{t.name.split(' ')[0]}</h3>
            </div>

            {/* Animated Arrow (SVG) */}
            <svg className="absolute bottom-[6.5rem] left-10 w-24 h-24 text-white drop-shadow-md z-30 opacity-90" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 10 90 Q 20 40 80 50" />
              <path d="M 70 40 L 80 50 L 70 60" />
            </svg>

            {/* SDE Badge */}
            <div className="absolute bottom-8 left-6 bg-white text-[#0A56D0] font-bold px-6 py-2 rounded-full shadow-xl z-30 text-lg">
              SDE
            </div>

            {/* Role Badge */}
            <div className="absolute bottom-16 right-6 bg-[#0A56D0] text-white p-4 rounded-xl shadow-xl z-30 max-w-[200px] border border-white/20">
              <p className="text-xs opacity-90 mb-1">Currently,</p>
              <p className="font-bold text-lg leading-tight">SWE at {t.org}</p>
            </div>

            {/* Click Navigation Areas */}
            <div className="absolute inset-0 z-40 flex">
              <button 
                className="flex-1 cursor-pointer outline-none" 
                onClick={() => setCurrentIndex(prev => prev === 0 ? TESTIMONIALS.length - 1 : prev - 1)}
                aria-label="Previous Story"
              />
              <button 
                className="flex-1 cursor-pointer outline-none" 
                onClick={() => setCurrentIndex(prev => (prev + 1) % TESTIMONIALS.length)}
                aria-label="Next Story"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-16 w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
            <div className="flex items-center gap-6 w-max animate-marquee hover:[animation-play-state:paused]">
              {[...COMPANY_LOGOS, ...COMPANY_LOGOS].map((c, i) => (
                <img 
                  key={i} 
                  src={`/assets/company logo/${c}`} 
                  alt="Company Logo" 
                  className="h-8 sm:h-10 w-auto object-contain shrink-0 grayscale hover:grayscale-0 opacity-50 hover:opacity-100 transition-all duration-300 px-6" 
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Certification                                                       */
/* ------------------------------------------------------------------ */
function Certification() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <Reveal>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl shadow-slate-300/50 border border-slate-100 p-8 rotate-[-2deg] max-w-md mx-auto">
              <div className="flex items-center justify-between mb-6">
                <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#2563EB] to-[#38BDF8]" />
                <Award className="w-8 h-8 text-amber-400" />
              </div>
              <p className="text-[11px] tracking-widest text-slate-400 font-semibold">CERTIFICATE OF COMPLETION</p>
              <p className="font-[Poppins] font-bold text-xl text-slate-900 mt-3">Full Stack Development</p>
              <p className="text-sm text-slate-500 mt-1">Awarded to a CodersX Academy graduate</p>
              <div className="mt-8 flex justify-between items-end">
                <div className="h-8 w-24 border-b-2 border-slate-300" />
                <p className="text-[11px] text-slate-400">CodersX Academy</p>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div>
            <h2 className="font-[Poppins] font-bold text-3xl sm:text-4xl text-slate-900">Get Certified</h2>
            <p className="mt-4 text-slate-600 max-w-md">
              Earn an industry-recognized certificate after successfully completing your course,
              built to stand out to recruiters and hiring partners.
            </p>
            <div className="mt-8">
              <RippleButton variant="primary" className="px-7 py-3.5">
                View Sample Certificate <ArrowRight className="w-4 h-4" />
              </RippleButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ                                                                  */
/* ------------------------------------------------------------------ */
function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">
        <Reveal>
          <h2 className="font-[Poppins] font-bold text-3xl sm:text-4xl text-slate-900 text-center">
            Frequently Asked Questions
          </h2>
        </Reveal>
        <div className="mt-12 space-y-3">
          {FAQS.map((f, i) => {
            const open = openIdx === i;
            return (
              <Reveal key={f.q} delay={i * 60}>
                <div className={`rounded-xl border transition-colors ${open ? "border-[#2563EB]/30 bg-blue-50/40" : "border-slate-100 bg-white"}`}>
                  <button
                    onClick={() => setOpenIdx(open ? -1 : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-[Poppins] font-medium text-slate-900">{f.q}</span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-300 ${open ? "rotate-180 text-[#2563EB]" : ""}`} />
                  </button>
                  <div
                    className="grid transition-all duration-300 ease-out"
                    style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                               */
/* ------------------------------------------------------------------ */
function Footer() {
  const cols = [
    { title: "Quick Links", items: ["Programs", "Courses", "About Us", "Contact Us"] },
    { title: "Legal", items: ["Privacy Policy", "Terms & Conditions"] },
  ];
  const socials = [Linkedin, Instagram, Youtube, Facebook];
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center bg-white rounded-xl p-2 w-fit">
            <img src="/logo.svg" alt="CodersX Academy Logo" className="h-12 w-auto object-contain" />
          </div>
          <p className="text-sm text-slate-400 mt-4 max-w-xs">
            Industry-focused courses that turn learners into job-ready engineers.
          </p>
          <div className="flex gap-3 mt-6">
            {socials.map((S, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#2563EB] transition-colors">
                <S className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="font-[Poppins] font-semibold text-white text-sm mb-4">{c.title}</h4>
            <ul className="space-y-2.5">
              {c.items.map((it) => (
                <li key={it}>
                  <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{it}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="font-[Poppins] font-semibold text-white text-sm mb-4">Contact</h4>
          <p className="text-sm text-slate-400">hello@codersxacademy.com</p>
          <p className="text-sm text-slate-400 mt-2">+91 98765 43210</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mt-12 pt-6 border-t border-white/10 text-center text-xs text-slate-500">
        © 2026 CodersX Academy. All Rights Reserved.
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Root                                                                 */
/* ------------------------------------------------------------------ */
export default function CodersXAcademyLanding() {
  useGoogleFonts();
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }} className="bg-white text-slate-800 antialiased">
      <style>{`
        @keyframes cx-ripple {
          from { transform: scale(0); opacity: 0.6; }
          to { transform: scale(1); opacity: 0; }
        }
        @keyframes cx-blob {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(20px,-30px) scale(1.08); }
          66% { transform: translate(-15px,15px) scale(0.95); }
        }
        .cx-blob { animation: cx-blob 12s ease-in-out infinite; }
        @keyframes cx-float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        .cx-float { animation: cx-float 5s ease-in-out infinite; }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          .cx-blob, .cx-float { animation: none; }
        }
      `}</style>

      <Navbar onDownloadClick={() => setModalOpen(true)} />
      <Hero onDownloadClick={() => setModalOpen(true)} />
      <Achievements />
      <Courses />
      <Accelerator onJoinClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} />
      <CallbackForm />
      <Mentors />
      <Testimonials />
      <Certification />
      <FAQ />
      <Footer />

      <SyllabusModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
