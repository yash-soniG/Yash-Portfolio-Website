import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Mail, Linkedin, Download, Calendar, ArrowDown, FileText, ClipboardList, Instagram, Youtube, Camera, Pencil, Menu, X } from "lucide-react";
import kkLogo from "@/assets/kk-create.png";
import wapLogo from "@/assets/what-a-playerr.png";
import { WorkSection } from "@/components/portfolio/WorkSection";
import { FadeIn } from "@/components/portfolio/FadeIn";
import {
  kkInstagram, kkYoutube, kkCategories, kkYoutubeCategories,
  wapInstagram, wapYoutube, wapCategories,
  skills, testimonials, milestones,
} from "@/components/portfolio/data";

const RESUME_URL = "https://drive.google.com/file/d/1YBPJxL8aiA1BjAFzCkaomI34XfvPFHg6/view";
const EMAIL = "yashsoni98136@gmail.com";
const MAILTO = `mailto:${EMAIL}`;
const LINKEDIN_URL = "https://www.linkedin.com/in/yashsonig";
const CALENDLY_URL = "https://calendly.com/yashsoni98136/30min";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Yash Soni — Short-Form Content Producer" },
      { name: "description", content: "Short-form content producer with 3 years of building audiences, breaking down complex topics, and leading end-to-end production." },
      { property: "og:title", content: "Yash Soni — Short-Form Content Producer" },
      { property: "og:description", content: "1.6M+ followers grown. 1.5M+ avg. views per reel. 750K+ YouTube subscribers built." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 glass border-b border-hairline">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="text-lg font-bold tracking-tight">Yash Soni</a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-foreground transition-colors">{l.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={MAILTO} aria-label="Email" target="_blank" rel="noreferrer" className="hidden sm:inline-flex p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors">
            <Mail size={18} />
          </a>
          <a href={LINKEDIN_URL} aria-label="LinkedIn" target="_blank" rel="noreferrer" className="hidden sm:inline-flex p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors">
            <Linkedin size={18} />
          </a>
          <a href={RESUME_URL} target="_blank" rel="noreferrer" className="ml-2 hidden sm:inline-flex items-center gap-2 text-xs font-medium bg-accent-blue text-white px-4 py-2 rounded-full hover:opacity-90 transition-opacity">
            <Download size={14} /> Resume
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-11 w-11 rounded-full text-foreground hover:bg-white/5 transition-colors"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-hairline bg-background/95 backdrop-blur">
          <nav className="mx-auto max-w-6xl px-6 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3 text-base text-foreground/90 hover:text-accent-blue transition-colors"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex items-center gap-3">
              <a href={MAILTO} aria-label="Email" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center h-11 w-11 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5"><Mail size={18} /></a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex items-center justify-center h-11 w-11 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5"><Linkedin size={18} /></a>
              <a href={RESUME_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-medium bg-accent-blue text-white px-4 py-2 rounded-full hover:opacity-90">
                <Download size={14} /> Resume
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function FloatingComposition() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const handler = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / r.width;
      const y = (e.clientY - (r.top + r.height / 2)) / r.height;
      setMouse({ x, y });
    };
    const leave = () => setMouse({ x: 0, y: 0 });
    el.addEventListener("mousemove", handler);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", handler);
      el.removeEventListener("mouseleave", leave);
    };
  }, []);
  const Tile = ({
    className, gradient, tilt, depth, delay, children,
  }: { className: string; gradient: string; tilt: number; depth: number; delay: string; children: React.ReactNode }) => (
    <div
      className={`absolute rounded-2xl shadow-2xl flex items-center justify-center text-white/95 float-tile cursor-pointer ${className}`}
      style={{
        background: gradient,
        ["--tilt" as any]: `${tilt}deg`,
        animationDelay: delay,
        transform: `translate3d(${mouse.x * depth}px, ${mouse.y * depth}px, 0) rotate(${tilt}deg)`,
      }}
    >
      {children}
    </div>
  );
  return (
    <div ref={wrapRef} className="relative h-[360px] sm:h-[480px] w-full" style={{ perspective: "1000px" }}>
      <div className="absolute inset-0 -z-10 rounded-full blur-3xl opacity-60"
        style={{ background: "radial-gradient(circle at 60% 50%, rgba(0,113,227,0.35), transparent 60%)" }} />
      <Tile className="top-2 left-[18%] h-20 w-20 sm:h-24 sm:w-24" gradient="linear-gradient(135deg,#7a1f3d,#3d0f1f)" tilt={-8} depth={28} delay="0s">
        <Instagram size={32} />
      </Tile>
      <Tile className="top-[30%] right-[8%] h-20 w-20 sm:h-24 sm:w-24" gradient="linear-gradient(135deg,#7a1f1f,#3d0f0f)" tilt={8} depth={-22} delay="0.4s">
        <Youtube size={32} />
      </Tile>
      <Tile className="top-[52%] left-[8%] h-20 w-20 sm:h-24 sm:w-24" gradient="linear-gradient(135deg,#1f4a7a,#0f243d)" tilt={-6} depth={18} delay="0.8s">
        <Camera size={30} />
      </Tile>
      <Tile className="bottom-2 right-[20%] h-20 w-20 sm:h-24 sm:w-24" gradient="linear-gradient(135deg,#1f5a3a,#0f2d1d)" tilt={6} depth={-30} delay="1.2s">
        <Pencil size={28} />
      </Tile>
    </div>
  );
}

function Hero() {
  return (
   <section id="top" className="pt-24 pb-16 sm:pt-28 sm:pb-16">
      <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs px-4 py-1.5 rounded-full border border-hairline text-foreground/80">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-blue" />
            Open to: Freelance · Full-Time · Collaborations
          </span>
          <h1 className="mt-8 text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
            Short-Form
            <br />
            <span className="whitespace-nowrap">Creative <span className="text-accent-blue">Producer</span></span>
          </h1>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
            3 years of building audiences, breaking down complex topics, and leading end-to-end production.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-4 max-w-xl">
            {[
              { num: "1.6M+", label: "Followers Grown" },
              { num: "1.5M+", label: "Avg. Views Per Reel" },
              { num: "750K+", label: "YouTube Subscribers Built" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl sm:text-3xl font-semibold tracking-tight">{s.num}</div>
                <div className="mt-2 text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#work" className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
              See My Work <ArrowDown size={16} />
            </a>
            <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-hairline px-6 py-3 rounded-full text-sm font-medium text-foreground hover:bg-white/5 transition-colors">
              <Calendar size={16} /> Schedule a 10-min Call
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <p className="text-[11px] uppercase tracking-[0.2em] text-accent-blue">Who I Am</p>
          <p className="mt-6 text-[20px] sm:text-[26px] font-light leading-[1.7] text-foreground/90">
            I&apos;m Iron Man.<br />
            Haha, not really :)<br />
            But hear me out. Tony Stark built a suit, &amp; everyone noticed the suit. Yet behind every suit, there&apos;s a Stark. Similarly, I&apos;m the one who made you stop scrolling. Through research, storytelling, scripts and content strategies that reach <span className="text-accent-blue">millions</span>.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-accent-blue">The Journey</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">Growth, in milestones.</h2>

        <div className="mt-14 relative">
          <div className="hidden md:block absolute left-0 right-0 top-3 h-px bg-accent-blue/30" />
          <div className="grid md:grid-cols-6 gap-10 md:gap-4">
            {milestones.map((m, i) => (
              <div key={i} className="relative md:pt-10">
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-1 h-5 w-5 rounded-full bg-accent-blue ring-4 ring-background" />
                <div className="md:text-center">
                  <div className="text-lg sm:text-xl font-semibold tracking-tight">{m.stat}</div>
                  <div className="mt-2 text-xs text-muted-foreground leading-relaxed">{m.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkSamples() {
  const samples = [
    {
      icon: FileText,
      title: "Sample Script",
      desc: "A short-form script breaking down a complex topic.",
      href: "https://www.notion.so/Yash-s-Portfolio-1bfc2ca2cb924936b1393f2732218f3e?source=copy_link",
    },
    {
      icon: ClipboardList,
      title: "SOP Document",
      desc: "Operating playbook for running a content page.",
      href: "https://canva.link/5qb8v0x48dfkl2x",
    },
  ];
  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h3 className="text-2xl font-semibold tracking-tight">Work Samples</h3>
        <div className="mt-8 grid sm:grid-cols-2 gap-5">
          {samples.map((s) => (
            <a
              key={s.title}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="block rounded-2xl border border-hairline p-6 bg-white/[0.02] hover:border-accent-blue/50 transition-colors"
            >
              <s.icon className="text-accent-blue" size={22} />
              <div className="mt-4 text-lg font-medium">{s.title}</div>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm text-accent-blue hover:opacity-80">
                View / Download →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        
        <p className="text-[11px] uppercase tracking-[0.2em] text-accent-blue">Skills</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">What I Bring</h2>
        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {Object.entries(skills).map(([cat, items], idx) => (
            <FadeIn
              key={cat}
              className="group relative rounded-2xl border border-hairline border-l-2 border-l-accent-blue bg-white/[0.02] p-6 sm:p-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div
                style={{ transitionDelay: `${idx * 80}ms` }}
                className="transition-all duration-500"
              >
                <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">{cat}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="text-xs px-3 py-1.5 rounded-full bg-accent-blue/10 text-foreground/90 border border-accent-blue/20 transition-all duration-300 hover:bg-accent-blue/20 hover:border-accent-blue/50 hover:shadow-[0_0_18px_-2px_color-mix(in_oklab,var(--accent-blue)_55%,transparent)] hover:-translate-y-0.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-12 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-[11px] uppercase tracking-[0.2em] text-accent-blue">Testimonials</p>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">What People Say</h2>
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <a
              key={i}
              href={t.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${t.name} on LinkedIn`}
              className="group relative rounded-2xl border border-hairline p-6 sm:p-8 bg-white/[0.02] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 hover:border-white/20"
            >
              <div className="flex items-center gap-4">
                {t.image ? (
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-12 w-12 sm:h-[60px] sm:w-[60px] rounded-full object-cover ring-1 ring-white/10"
                  />
                ) : (
                  <div className="h-12 w-12 sm:h-[60px] sm:w-[60px] rounded-full bg-gradient-to-br from-accent-blue to-accent-blue/40 flex items-center justify-center text-sm font-semibold text-white">
                    {t.initials}
                  </div>
                )}
                <div className="flex-1">
                  <div className="text-sm sm:text-base font-medium">{t.name}</div>
                  {t.designation && (
                    <div className="mt-0.5 text-xs sm:text-sm italic text-muted-foreground">{t.designation}</div>
                  )}
                </div>
              </div>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-foreground/90">“{t.quote}”</p>
              <span className="absolute bottom-4 right-4 text-muted-foreground group-hover:text-accent-blue transition-colors">
                <Linkedin size={18} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-accent-blue">Contact</p>
        <h2 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight">Let&apos;s Talk</h2>
        <p className="mt-5 text-muted-foreground max-w-xl mx-auto">
          Open to collaborations, freelance projects, and full-time opportunities.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <a href={MAILTO} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-accent-blue text-white px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            <Mail size={16} /> Email Me
          </a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-hairline px-6 py-3 rounded-full text-sm font-medium hover:bg-white/5 transition-colors">
            <Linkedin size={16} /> LinkedIn
          </a>
          <a href={CALENDLY_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-hairline px-6 py-3 rounded-full text-sm font-medium hover:bg-white/5 transition-colors">
            <Calendar size={16} /> Schedule a Call
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© 2026 Yash Soni. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <a href={MAILTO} aria-label="Email" target="_blank" rel="noreferrer" className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"><Mail size={16} /></a>
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors"><Linkedin size={16} /></a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
{/* <About /> */}
        <section id="work" className="py-12 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-accent-blue">Work</p>
           <h2 className="mt-6 text-3xl sm:text-4xl font-semibold tracking-tight">Pages I&apos;ve led.</h2>

            <WorkSection
              sectionId="kk-create"
              logo={kkLogo}
              title="KK Create"
              subtitle="Short-form Lead & Content Strategist"
              description="Wrote 200+ scripts and led the page end-to-end: ideation, scripting, editor coordination, and performance tracking. Scaled from 350K to 1.6M followers and built the YouTube channel to 750K subscribers."
              categories={kkCategories}
              youtubeCategories={kkYoutubeCategories}
              instagram={kkInstagram}
              youtube={kkYoutube}
              youtubeSubs="750K"
              igHandle="kk.create"
              igProfileUrl="https://www.instagram.com/kk.create/"
              ytHandle="@kkcreate"
              ytProfileUrl="https://www.youtube.com/@kkcreate"
            />

            <div className="my-12 sm:my-20 h-px bg-hairline" />

            <WorkSection
              sectionId="what-a-playerr"
              logo={wapLogo}
              title="What A Playerr"
              subtitle="Sports Page Lead: Built from Zero"
              description="Built KK Create's sports content page from scratch, including strategy, scripting, and on-ground direction across Instagram and YouTube."
              categories={wapCategories}
              instagram={wapInstagram}
              youtube={wapYoutube}
              youtubeSubs="16.5K"
              igHandle="what.a.playerr"
              igProfileUrl="https://www.instagram.com/what.a.playerr/"
              ytHandle="@whataplayerr"
              ytProfileUrl="https://www.youtube.com/@whataplayerr"
              stats={[
                { label: "Instagram", value: "30.5K" },
                { label: "YouTube", value: "16.5K" },
                { label: "Built in", value: "3 months" },
              ]}
            />
          </div>
        </section>
        <Timeline />
        <WorkSamples />
        <Skills />

        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}