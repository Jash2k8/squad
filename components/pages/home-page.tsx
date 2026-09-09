"use client"

import React, { useRef, useState, MouseEvent as ReactMouseEvent } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { ArrowRight, ArrowDown, Code2, Lightbulb, Users, ChevronRight } from "lucide-react"
import { AtomMark } from "@/components/squad-logo"
import Link from "next/link"

// ============================================================================
// 0. DATA & CONSTANTS (KEPT EXACTLY FROM YOUR CURRENT CODE)
// ============================================================================

const BUZZWORDS_ROW1 = ["INNOVATION", "DATA SCIENCE", "LEADERSHIP", "COMMUNITY", "OUTREACH", "SQUAD", "MLRIT", "TECH"]
const BUZZWORDS_ROW2 = ["CODEX", "PROJECT EXPO", "UNPLUGGED", "WORKSHOPS", "HACKATHONS", "OUTREACH", "BUILDERS", "SQUAD"]

const DIVISIONS = [
  {
    icon: Code2,
    title: "Technical Excellence",
    desc: "We sharpen skills through competitions, workshops, and real projects that push engineering craft.",
    tags: ["Competitions", "Workshops", "Projects"],
    delay: 0.1,
  },
  {
    icon: Lightbulb,
    title: "Relentless Innovation",
    desc: "From prototypes to production ideas, we turn curiosity into things that actually work.",
    tags: ["Prototypes", "Ideas", "Execution"],
    delay: 0.2,
  },
  {
    icon: Users,
    title: "A Builder Community",
    desc: "A tight-knit crew that learns together, ships together, and lifts the whole campus with it.",
    tags: ["Events", "Mentorship", "Outreach"],
    delay: 0.3,
  },
]

const EASING = {
  APPLE: [0.16, 1, 0.3, 1],
  FLUID: [0.22, 1, 0.36, 1],
}

// ============================================================================
// 1. GOD-TIER MICRO-INTERACTIONS & HOOKS
// ============================================================================

function useMagneticPhysics(ref: React.RefObject<HTMLAnchorElement | null>) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = (e: ReactMouseEvent | globalThis.MouseEvent) => {
    if (!ref.current) return
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    const centerX = left + width / 2
    const centerY = top + height / 2
    const pullX = (e.clientX - centerX) * 0.2
    const pullY = (e.clientY - centerY) * 0.2
    x.set(pullX)
    y.set(pullY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return { x: springX, y: springY, handleMouseMove, handleMouseLeave }
}

// ============================================================================
// 2. PREMIUM UI COMPONENTS
// ============================================================================

function FilmGrain() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[100] h-full w-full opacity-[0.03] mix-blend-overlay">
      <svg className="absolute inset-0 h-full w-full">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  )
}

function MagneticButton({ children, href, className }: { children: React.ReactNode, href: string, className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const { x, y, handleMouseMove, handleMouseLeave } = useMagneticPhysics(ref)

  return (
    <motion.div style={{ x, y }} className="relative z-10 inline-block">
      <Link
        href={href}
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`group relative flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full px-8 font-bold text-sm tracking-widest transition-all transform-gpu ${className}`}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </Link>
    </motion.div>
  )
}

function SpotlightBentoCard({ title, desc, icon: Icon, tags, delay }: { title: string, desc: string, icon: React.ElementType, tags: string[], delay: number }) {
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return
    const div = divRef.current
    const rect = div.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.7, delay, ease: EASING.APPLE }}
      ref={divRef} onMouseMove={handleMouseMove} onMouseEnter={() => setOpacity(1)} onMouseLeave={() => setOpacity(0)}
      className="group relative h-full w-full rounded-[2rem] border border-white/10 bg-[#050505]/80 p-8 overflow-hidden transition-all duration-500 hover:border-cyan-400/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.1)] transform-gpu backdrop-blur-md"
    >
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0" style={{ opacity, background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(34,211,238,0.1), transparent 40%)` }} />
      <div className="absolute inset-x-0 -top-px h-px w-2/3 mx-auto bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 group-hover:scale-110 group-hover:bg-cyan-400/10 group-hover:border-cyan-400/30 transition-all duration-500 transform-gpu">
            <Icon className="h-6 w-6 text-white group-hover:text-cyan-400 transition-colors duration-500" />
          </div>
          <h3 className="mb-3 text-2xl font-black uppercase tracking-tight text-white">{title}</h3>
          <p className="text-sm font-light leading-relaxed text-slate-400 mb-6">{desc}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[10px] font-mono text-cyan-100/60 group-hover:text-cyan-300 group-hover:border-cyan-400/30 transition-colors duration-500 uppercase">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ============================================================================
// 3. MAIN PAGE ASSEMBLY
// ============================================================================

export function HomeSection() {
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 800], [1, 0])
  const heroY = useTransform(scrollY, [0, 800], [0, 50])

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500/30 overflow-hidden font-sans relative">
      <FilmGrain />

      {/* 🔥 ZERO-LAG PURE CSS 2D GRID 🔥 */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* ── HERO ── */}
      <motion.div 
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 flex min-h-[90vh] flex-col items-start justify-center pt-24 pb-12 px-6 md:px-12 w-full max-w-screen-xl mx-auto"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-950/20 px-4 py-1.5 backdrop-blur-md"
        >
          <div className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
          </div>
          <AtomMark className="h-4 w-4 text-cyan-400" />
          <span className="text-[10px] font-mono tracking-widest text-cyan-100/70 uppercase">
            Departmental Club&nbsp;
            <span className="text-white/20 mx-1">|</span>
            &nbsp;Data Science, MLRIT
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="max-w-4xl font-black text-4xl leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl mb-4"
        >
          Empowering{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(34,211,238,0.2)]">
            innovation
          </span>
          , technical mastery, and collaborative growth.
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="max-w-2xl text-base md:text-lg text-slate-400 font-light leading-relaxed tracking-wide mb-10"
        >
          SQUAD is the technical club of the Department of Data Science at MLRIT — a community of
          engineers, designers, and builders competing, teaching, and celebrating together.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          <MagneticButton href="/events" className="bg-white text-black hover:bg-cyan-400 hover:scale-105 shadow-lg uppercase tracking-widest">
            Explore Events <ArrowDown className="h-4 w-4" />
          </MagneticButton>
          <MagneticButton href="/contact" className="border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/40 uppercase tracking-widest">
            Get in Touch <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* ── DUAL MARQUEE ── */}
      <div className="relative z-10 w-full overflow-hidden border-y border-white/5 bg-black/20 py-10 mb-24 flex flex-col gap-5 backdrop-blur-sm">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#020202] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#020202] to-transparent z-10 pointer-events-none" />

        <motion.div
          className="flex whitespace-nowrap will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        >
          {[...BUZZWORDS_ROW1, ...BUZZWORDS_ROW1].map((word, i) => (
            <div key={i} className="flex items-center gap-6 px-6">
              <span className="text-xl md:text-3xl font-black uppercase tracking-tighter text-white/10 hover:text-cyan-400/40 transition-colors duration-300">{word}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
            </div>
          ))}
        </motion.div>

        <motion.div
          className="flex whitespace-nowrap will-change-transform"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...BUZZWORDS_ROW2, ...BUZZWORDS_ROW2].map((word, i) => (
            <div key={i} className="flex items-center gap-6 px-6">
              <span className="text-lg md:text-2xl font-black uppercase tracking-tighter text-white/10 hover:text-indigo-400/40 transition-colors duration-300">{word}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── MISSION STATEMENT ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-5xl mx-auto px-6 py-8 md:py-12 text-center"
      >
        <AtomMark className="h-8 w-8 text-cyan-400/50 mx-auto mb-8" />
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-black uppercase tracking-tighter text-white leading-tight">
          We exist to make technical growth<br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-200">
            accessible, collaborative, and genuinely exciting.
          </span>
        </h2>
      </motion.div>

      {/* ── DIVISIONS BENTO ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 bg-white/[0.02] p-8 rounded-3xl border border-white/5 backdrop-blur-md">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white mb-4">
              What We <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">Do.</span>
            </h2>
            <p className="text-slate-400 font-light leading-relaxed text-lg">
              Three pillars that define how SQUAD operates and grows as a community.
            </p>
          </div>
          <Link
            href="/about"
            className="group flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors border border-cyan-400/20 bg-cyan-950/20 px-6 py-3 rounded-full hover:bg-cyan-900/40"
          >
            Read Our Story <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DIVISIONS.map((d) => (
            <SpotlightBentoCard 
              key={d.title} 
              title={d.title} 
              desc={d.desc} 
              icon={d.icon} 
              tags={d.tags} 
              delay={d.delay} 
            />
          ))}
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 via-cyan-500/5 to-transparent p-10 md:p-16 text-center backdrop-blur-md"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-indigo-500/5" />
          <h2 className="relative text-3xl md:text-5xl font-black tracking-tighter text-white mb-6 uppercase">
            Ready to innovate with us?
          </h2>
          <p className="relative text-slate-400 text-base font-light mb-10 max-w-xl mx-auto">
            Applications are open for driven students who want to learn, build, and lead.
          </p>
          
          <div className="flex justify-center">
            <MagneticButton href="/contact" className="bg-white text-black hover:bg-cyan-400 hover:scale-105 shadow-lg uppercase tracking-widest">
              Join SQUAD <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </div>
  )
}