"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "motion/react"
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronRight,
  Code2,
  Cpu,
  Lightbulb,
  MapPin,
  Network,
  Sparkles,
  Users,
} from "lucide-react"

const highlights = [
  { icon: Lightbulb, label: "Innovation", copy: "Turn a bold idea into something tangible." },
  { icon: Code2, label: "Technology", copy: "Explore the tools that make your thinking possible." },
  { icon: Network, label: "Problem-solving", copy: "Break complex challenges into clear next steps." },
  { icon: Users, label: "Teamwork", copy: "Build stronger solutions together." },
  { icon: Sparkles, label: "Creativity", copy: "Bring a distinct point of view to the room." },
  { icon: Cpu, label: "Building solutions", copy: "Learn by making, testing, and iterating." },
]

const details = [
  ["Theme", "Details coming soon"],
  ["Timings", "Details coming soon"],
  ["Team information", "Details coming soon"],
  ["Eligibility", "Details coming soon"],
]

function IntroSequence({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"access" | "ready" | "reveal" | "zoom">("access")

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase("ready"), 1050),
      window.setTimeout(() => setPhase("reveal"), 1900),
      window.setTimeout(() => setPhase("zoom"), 3050),
      window.setTimeout(onComplete, 4300),
    ]
    return () => timers.forEach(window.clearTimeout)
  }, [onComplete])

  return (
    <motion.div
      className="codex-intro fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-[#02070d] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="codex-intro-grid absolute inset-0 opacity-60" />
      <div className="codex-intro-scan absolute inset-x-0 top-0 h-px bg-cyan-300/70 shadow-[0_0_28px_8px_rgba(34,211,238,0.3)]" />
      <div className="codex-orbit absolute h-[min(70vw,680px)] w-[min(70vw,680px)] rounded-full border border-cyan-300/10" />
      <div className="codex-orbit codex-orbit-delayed absolute h-[min(52vw,500px)] w-[min(52vw,500px)] rounded-full border border-blue-400/10" />
      <div className="codex-particles absolute inset-0" aria-hidden="true" />

      <div className="relative flex w-full flex-col items-center px-6 text-center">
        <div className="mb-8 flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.32em] text-cyan-300/80">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]" />
          SQUAD // SECURE CHANNEL
        </div>
        <div className="mb-8 h-5 overflow-hidden text-xs font-mono uppercase tracking-[0.35em] text-white/60 sm:text-sm">
          <motion.span
            key={phase}
            initial={{ opacity: 0, y: 12, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.35 }}
          >
            {phase === "access" && "ACCESSING ONGOING EVENT"}
            {phase === "ready" && "SYSTEM READY // CHANNEL OPEN"}
            {(phase === "reveal" || phase === "zoom") && "CODEX 2.0 // INTERFACE UNLOCKED"}
          </motion.span>
        </div>
        <motion.img
          src="/codex-2-logo.png"
          alt="CODEX 2.0"
          className="codex-intro-logo relative w-[min(76vw,760px)] object-contain"
          animate={{
            scale: phase === "zoom" ? 7 : phase === "reveal" ? 1.1 : 0.64,
            opacity: phase === "access" ? 0.18 : 1,
            filter: phase === "zoom"
              ? "drop-shadow(0 0 65px rgba(103,232,249,0.98))"
              : "drop-shadow(0 0 22px rgba(103,232,249,0.66))",
          }}
          transition={{
            scale: phase === "zoom" ? { duration: 1.25, ease: [0.76, 0, 0.24, 1] } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            opacity: { duration: 0.6 },
            filter: { duration: 0.8 },
          }}
        />
        <motion.div
          className="mt-10 flex items-center gap-3 text-[9px] font-mono uppercase tracking-[0.28em] text-white/35"
          animate={{ opacity: phase === "access" ? 0 : 1 }}
        >
          <span className="h-px w-10 bg-cyan-300/30" />
          initializing creative protocol
          <span className="h-px w-10 bg-cyan-300/30" />
        </motion.div>
      </div>
    </motion.div>
  )
}

export function OngoingEventsPage() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      {!introComplete && <IntroSequence onComplete={() => setIntroComplete(true)} />}
      <div className="codex-page min-h-screen overflow-hidden bg-[#03070c] text-white">
        <section className="relative flex min-h-[820px] items-center px-6 pb-24 pt-36 md:min-h-[900px] md:px-12 md:pt-44">
          <div className="codex-page-grid absolute inset-0" />
          <div className="absolute -left-40 top-24 h-[440px] w-[440px] rounded-full bg-cyan-500/10 blur-[130px]" />
          <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-blue-700/10 blur-[150px]" />
          <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div initial={{ opacity: 0, y: 32 }} animate={introComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }} transition={{ duration: 0.8, delay: 0.15 }}>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/[0.06] px-4 py-2 text-[10px] font-mono uppercase tracking-[0.28em] text-cyan-200">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]" /> Ongoing event // Hackathon
              </div>
              <h1 className="max-w-3xl text-6xl font-black uppercase leading-[0.87] tracking-[-0.07em] text-white sm:text-8xl lg:text-[clamp(5rem,9vw,9.2rem)]">
                <span className="block">Where ideas</span>
                <span className="block text-transparent [background:linear-gradient(110deg,#67e8f9,#60a5fa_45%,#fff)] bg-clip-text">turn into</span>
                <span className="block">innovation.</span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-slate-400 md:text-lg">A hands-on space for students to collaborate, experiment, and build working solutions with the SQUAD Club community.</p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a href="#registration" className="group inline-flex items-center gap-3 rounded-full bg-cyan-300 px-6 py-3 text-sm font-bold text-[#031018] shadow-[0_0_28px_rgba(103,232,249,0.28)] transition hover:bg-white hover:shadow-[0_0_38px_rgba(103,232,249,0.5)]">Register now <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
                <a href="#about" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white/75 transition hover:border-cyan-300/50 hover:text-cyan-200">Explore the event <ArrowDown className="h-4 w-4" /></a>
              </div>
              <div className="mt-12 grid max-w-lg grid-cols-2 gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                <div><p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Date</p><p className="mt-2 text-sm font-semibold">22 September</p></div>
                <div><p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Venue</p><p className="mt-2 text-sm font-semibold">MLRIT</p></div>
                <div><p className="text-[10px] font-mono uppercase tracking-widest text-slate-500">By</p><p className="mt-2 text-sm font-semibold">SQUAD Club</p></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.86 }} animate={introComplete ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.86 }} transition={{ duration: 1, delay: 0.35 }} className="relative mx-auto w-full max-w-2xl">
              <div className="absolute inset-12 rounded-full bg-cyan-400/15 blur-[90px]" />
              <div className="codex-hero-frame relative overflow-hidden rounded-[2rem] border border-cyan-200/20 bg-[#07121d]/70 p-6 shadow-[0_0_70px_rgba(34,211,238,0.12)] backdrop-blur-xl sm:p-10">
                <div className="mb-7 flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-slate-500"><span>CODX_SYS / 02</span><span className="text-cyan-300">● live</span></div>
                <img src="/codex-2-logo.png" alt="CODEX 2.0 official logo" className="relative w-full object-contain" />
                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-[10px] font-mono uppercase tracking-widest text-slate-500"><span>Creative protocol active</span><span className="text-cyan-200">22.09 // MLRIT</span></div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="relative border-y border-white/10 px-6 py-24 md:px-12 md:py-32"><div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300">01 / The brief</p><h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">Build what<br /><span className="text-slate-500">matters.</span></h2></div><p className="max-w-3xl text-lg leading-9 text-slate-400">CODEX 2.0 is a hackathon conducted by the SQUAD Club at MLRIT. It brings together students interested in technology, innovation, coding, problem-solving, and creative development. Participants get the opportunity to collaborate, develop ideas, build solutions, and showcase their technical and creative abilities in a competitive hackathon environment.<br /><br />The event emphasizes innovation, technology, problem-solving, teamwork, creativity, building real solutions, learning, and experimentation.</p></div></section>

        <section className="px-6 py-24 md:px-12 md:py-32"><div className="mx-auto max-w-7xl"><div className="mb-14 flex items-end justify-between gap-6"><div><p className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300">02 / What we value</p><h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">The build<br /><span className="text-slate-500">mindset.</span></h2></div><span className="hidden text-right text-xs font-mono uppercase tracking-widest text-slate-500 md:block">Six signals<br />one direction</span></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{highlights.map(({ icon: Icon, label, copy }, index) => <motion.article key={label} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className="codex-card group relative rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/[0.06]"><Icon className="h-6 w-6 text-cyan-300 transition group-hover:scale-110" /><h3 className="mt-12 text-xl font-semibold">{label}</h3><p className="mt-3 text-sm leading-7 text-slate-500">{copy}</p><ChevronRight className="absolute bottom-6 right-6 h-4 w-4 text-white/20 transition group-hover:translate-x-1 group-hover:text-cyan-300" /></motion.article>)}</div></div></section>

        <section className="border-y border-white/10 bg-[#06101a] px-6 py-24 md:px-12 md:py-32"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300">03 / Coordinates</p><h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">Meet at the<br /><span className="text-cyan-300">starting point.</span></h2></div><div className="grid gap-4 sm:grid-cols-2"><div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"><CalendarDays className="h-6 w-6 text-cyan-300" /><p className="mt-12 text-xs font-mono uppercase tracking-widest text-slate-500">Date</p><p className="mt-2 text-2xl font-semibold">22 September</p></div><div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"><MapPin className="h-6 w-6 text-cyan-300" /><p className="mt-12 text-xs font-mono uppercase tracking-widest text-slate-500">Venue</p><p className="mt-2 text-2xl font-semibold">MLRIT</p></div></div></div></section>

        <section className="px-6 py-24 md:px-12 md:py-32"><div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2"><div><p className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300">04 / Parameters</p><h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">Everything else<br /><span className="text-slate-500">is loading.</span></h2><p className="mt-7 max-w-lg text-slate-400 leading-8">Official hackathon details will be added here as they are confirmed. No assumptions. No noise. Just the information you need, when it is ready.</p></div><div className="divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.025]">{details.map(([label, value]) => <div key={label} className="flex items-center justify-between gap-5 px-6 py-5 sm:px-8"><span className="text-sm text-slate-400">{label}</span><span className="text-right text-sm font-medium text-white/80">{value}</span></div>)}</div></div></section>

        <section className="px-6 pb-28 md:px-12 md:pb-40" id="registration"><div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-cyan-300/25 bg-cyan-300/[0.06] p-8 sm:p-14"><div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-300/15 blur-[90px]" /><div className="relative flex flex-col items-start justify-between gap-10 md:flex-row md:items-end"><div><p className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-300">05 / Open channel</p><h2 className="mt-5 max-w-2xl text-4xl font-bold tracking-tight sm:text-6xl">Ready to turn<br />an idea into <span className="text-cyan-300">impact?</span></h2><p className="mt-5 text-slate-400">Registration link will be added when it is available.</p></div><a href="#" onClick={(event) => event.preventDefault()} className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-black transition hover:bg-cyan-300">Register now <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a></div></div></section>

        <footer className="border-t border-white/10 px-6 py-12 md:px-12"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 text-xs font-mono uppercase tracking-widest text-slate-600 sm:flex-row"><span>CODEX 2.0 // SQUAD CLUB</span><span>Contact details coming soon</span><Link href="/events" className="text-slate-400 transition hover:text-cyan-300">Back to events <Check className="ml-1 inline h-3 w-3" /></Link></div></footer>
      </div>
    </>
  )
}
