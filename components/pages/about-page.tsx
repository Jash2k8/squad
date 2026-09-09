"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Cpu, Sparkles, Code2, Lightbulb, Users, ChevronRight } from "lucide-react"
import { AtomMark } from "@/components/squad-logo"
import Link from "next/link"

import KineticGrid from "@/components/ui/kinetic-grid"

// ── SQUAD full-form typewriter ────────────────────────────────
const FULL_FORM_WORDS = [
  { letter: "S", rest: "chool" },
  { letter: "", rest: "of" },
  { letter: "Q", rest: "ualitative" },
  { letter: "U", rest: "nderstanding" },
  { letter: "", rest: "&" },
  { letter: "A", rest: "nalysis" },
  { letter: "", rest: "of" },
  { letter: "D", rest: "ata" },
]

function FullFormTypewriter() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [phase, setPhase] = useState<"in" | "out">("in")

  useEffect(() => {
    if (phase === "in") {
      if (visibleCount < FULL_FORM_WORDS.length) {
        const t = setTimeout(() => setVisibleCount((v) => v + 1), 500)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase("out"), 2800)
        return () => clearTimeout(t)
      }
    } else {
      if (visibleCount > 0) {
        const t = setTimeout(() => setVisibleCount((v) => v - 1), 320)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase("in"), 600)
        return () => clearTimeout(t)
      }
    }
  }, [visibleCount, phase])

  return (
    <p className="font-bold text-2xl md:text-4xl lg:text-5xl leading-snug tracking-tight flex flex-wrap justify-center gap-x-3 gap-y-1 min-h-[3.5rem] relative z-10">
      {FULL_FORM_WORDS.map((word, i) => (
        <motion.span
          key={i}
          animate={{
            opacity: i < visibleCount ? 1 : 0,
            filter: i < visibleCount ? "blur(0px)" : "blur(6px)",
            maxWidth: i < visibleCount ? "800px" : "0px",
            marginRight: i < visibleCount ? "0.5rem" : "0px",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="inline-block overflow-hidden whitespace-nowrap text-white"
          style={{ maxWidth: "0px", opacity: 0 }}
        >
          {word.letter && (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]">
              {word.letter}
            </span>
          )}
          {word.rest}
        </motion.span>
      ))}
    </p>
  )
}

// ── Pillars ────────────────────────────────────────────────────────────────
const PILLARS = [
  {
    icon: Code2,
    title: "Technical Excellence",
    body: "We sharpen skills through competitions, workshops, and real projects that push engineering craft.",
    iconClass: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.25)]",
    cardHover: "hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)]",
  },
  {
    icon: Lightbulb,
    title: "Relentless Innovation",
    body: "From prototypes to production ideas, we turn curiosity into things that actually work.",
    iconClass: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.25)]",
    cardHover: "hover:border-indigo-400/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]",
  },
  {
    icon: Users,
    title: "A Builder Community",
    body: "A tight-knit crew that learns together, ships together, and lifts the whole campus with it.",
    iconClass: "bg-sky-500/10 text-sky-400 border border-sky-500/30 shadow-[0_0_15px_rgba(14,165,233,0.25)]",
    cardHover: "hover:border-sky-400/40 hover:shadow-[0_0_30px_rgba(14,165,233,0.15)]",
  },
]

const VALUES = [
  {
    title: "Build Real Things",
    description: "Every workshop, competition, and project is designed to produce something tangible — not just slides.",
  },
  {
    title: "Grow Together",
    description: "Senior members actively mentor juniors. Knowledge flows both ways — everyone teaches, everyone learns.",
  },
  {
    title: "Reach Beyond Campus",
    description: "From school outreach to open-source contributions, we believe technical skills have a responsibility to serve communities.",
  },
]

export function AboutSection() {
  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30 overflow-hidden relative font-sans">

      {/* 🔥 KINETIC GRID RUNNING SMOOTHLY IN THE BACKGROUND 🔥 */}
      <div className="fixed inset-0 z-0 pointer-events-none transform-gpu">
        <div className="absolute inset-0 opacity-40"><KineticGrid /></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#020202_85%)]" />
      </div>

      {/* ── Ambient Glows ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[600px] w-[800px] bg-indigo-500/10 blur-[160px] rounded-full pointer-events-none z-0" />

      {/* ── SECTION 1: HERO ── */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 flex flex-col items-center justify-center min-h-[75vh]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center"
        >
          <div className="mb-8 flex items-center justify-center h-16 w-16 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.15)] backdrop-blur-md">
            <Cpu className="h-8 w-8" />
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            <span className="text-xs font-mono tracking-widest text-cyan-100/70 uppercase">
              Departmental Club — Data Science, MLRIT
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white mb-6 leading-[0.9]">
            SQUAD{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              CLUB.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-lg md:text-xl text-slate-400 font-light leading-relaxed tracking-wide mb-10">
            We exist to make technical growth accessible, collaborative, and genuinely exciting.
            Our vision is a campus where every curious student has a place to learn, build, and lead.
          </p>

          <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-4">
            <AtomMark className="h-8 w-8 text-cyan-400" />
            <p className="text-sm font-medium text-white/70">
              Departmental Club — Data Science, MLRIT
            </p>
          </div>
        </motion.div>
      </section>

      {/* ── SECTION 2: WHAT SQUAD STANDS FOR ── */}
      <section className="relative z-10 py-20 px-6 md:px-12 border-y border-white/5 bg-[#050505]/60 backdrop-blur-md">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="text-xs font-bold tracking-[0.4em] text-cyan-400 uppercase mb-6 drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]">What SQUAD Stands For</p>
          <FullFormTypewriter />
        </div>
      </section>

      {/* ── SECTION 3: PILLARS (Clean Apple-Style Frosted Glass) ── */}
      <section className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="mb-12 flex flex-col gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-xs font-bold tracking-[0.4em] text-indigo-400 uppercase">Our Foundation</p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
              Mission & Vision
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-3">
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                className={`flex flex-col gap-4 rounded-[2rem] border border-white/10 bg-[#080808]/80 backdrop-blur-xl p-8 transition-all duration-500 shadow-2xl ${p.cardHover}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${p.iconClass}`}>
                  <p.icon className="h-6 w-6" />
                </span>
                <h3 className="text-xl font-bold tracking-tight text-white">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-400">{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: THE THREE LAWS ── */}
      <section className="relative z-10 py-24 px-6 md:px-12 bg-black/40 backdrop-blur-md">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto flex flex-col items-center text-center relative z-20">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-16 uppercase">
            What We Stand For
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {VALUES.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-[#080808]/80 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl"
              >
                <div className="h-[2px] w-12 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mb-6 opacity-50" />
                <h3 className="text-xl font-bold text-white mb-4 tracking-wide uppercase">{value.title}</h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: CTA ── */}
      <section className="relative z-10 py-24 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full p-10 md:p-16 rounded-[2rem] bg-gradient-to-br from-indigo-500/10 via-cyan-500/5 to-transparent border border-white/10 relative overflow-hidden text-center backdrop-blur-xl"
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-indigo-500/5" />
            <h2 className="relative text-3xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase">
              Ready to Join SQUAD?
            </h2>
            <p className="relative text-slate-400 text-base font-light mb-10 max-w-xl mx-auto">
              We are always looking for builders, thinkers, and anyone who wants to do something meaningful with technology.
            </p>
            <Link
              href="/contact"
              data-magnetic
              className="relative inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-cyan-400 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get in Touch <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}