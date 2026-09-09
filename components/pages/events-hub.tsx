"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import {
  Terminal, Users, Award, Activity,
  ChevronRight, CalendarDays, MapPin, X
} from "lucide-react"
import { EVENTS } from "@/lib/data"
import { Gallery } from "@/components/gallery"

// Map data keys to timeline visual configuration
const EVENT_CONFIGS = {
  codex: {
    category: "Algorithmic Thinking & Competitive Programming",
    date: "Annual Benchmark",
    location: "Main Labs, MLRIT",
    iconName: "terminal" as const,
    gradient: "from-cyan-500/20 to-blue-600/20",
    borderGlow: "group-hover:border-cyan-400/50",
    iconColor: "text-cyan-400",
    metrics: [
      { label: "Difficulty", value: "Extreme" },
      { label: "Focus", value: "Logic & DSA" },
    ],
  },
  unplugged: {
    category: "Technical Workshop",
    date: "Dec 04",
    location: "MT-104, MLRIT",
    iconName: "activity" as const,
    gradient: "from-indigo-500/20 to-purple-600/20",
    borderGlow: "group-hover:border-indigo-400/50",
    iconColor: "text-indigo-400",
    metrics: [
      { label: "Format", value: "Hands-on" },
      { label: "Stack", value: "Power BI" },
    ],
  },
  outreach: {
    category: "Community Empowerment",
    date: "Oct 16",
    location: "ZPHS Gundlapochampally",
    iconName: "users" as const,
    gradient: "from-emerald-500/20 to-teal-600/20",
    borderGlow: "group-hover:border-emerald-400/50",
    iconColor: "text-emerald-400",
    metrics: [
      { label: "Target", value: "Youth STEM" },
      { label: "Impact", value: "High" },
    ],
  },
  "project-expo": {
    category: "Prototype Showcase & Jury Pitching",
    date: "Fall Semester",
    location: "Campus Hub, MLRIT",
    iconName: "award" as const,
    gradient: "from-amber-500/20 to-orange-600/20",
    borderGlow: "group-hover:border-amber-400/50",
    iconColor: "text-amber-400",
    metrics: [
      { label: "Evaluation", value: "External" },
      { label: "Output", value: "Production" },
    ],
  },
} as const

function EventIcon({ name, color }: { name: string; color: string }) {
  const cls = `h-7 w-7 ${color}`
  if (name === "terminal") return <Terminal className={cls} />
  if (name === "activity") return <Activity className={cls} />
  if (name === "users") return <Users className={cls} />
  return <Award className={cls} />
}

const EVENT_KEYS = ["codex", "unplugged", "outreach", "project-expo"] as const

export function EventsHub() {
  const [selectedEvent, setSelectedEvent] = useState<keyof typeof EVENTS | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-[#030303] text-white selection:bg-cyan-500/30 pt-40 pb-40 px-6 md:px-12 relative overflow-hidden font-sans"
    >
      {/* Background Architecture */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
      </div>

      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center mb-32"
      >
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-5 py-2 backdrop-blur-xl shadow-[0_0_20px_rgba(34,211,238,0.1)]">
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">Events Hub</span>
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-[140px] font-black tracking-tighter uppercase leading-[0.85] text-white mb-8">
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Events
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 filter drop-shadow-[0_0_40px_rgba(34,211,238,0.2)]">
            Hub.
          </span>
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-slate-400 font-light leading-relaxed tracking-wide">
          From coding competitions to workshops and community outreach — click any event to explore the gallery and respective archives.
        </p>
      </motion.div>

      {/* Timeline Section */}
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/5 rounded-full" />

        <div className="flex flex-col gap-16 md:gap-32">
          {EVENT_KEYS.map((key, index) => {
            const event = EVENTS[key]
            const config = EVENT_CONFIGS[key]
            const isEven = index % 2 === 0

            return (
              <div
                key={key}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? "md:flex-row-reverse" : ""}`}
              >
                {/* Timeline Node */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-12 w-12 rounded-full bg-[#030303] border-4 border-white/5 items-center justify-center z-20 shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                >
                  <div className="h-4 w-4 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.9)]" />
                </motion.div>

                <div className="hidden md:block flex-1" />

                {/* Event Card */}
                <motion.div
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full md:flex-1 group"
                >
                  <div className={`relative p-[1px] rounded-[2rem] bg-gradient-to-br from-white/10 to-white/0 overflow-hidden transition-all duration-500 ${config.borderGlow}`}>
                    <div className="relative h-full w-full bg-[#0a0a0a]/90 backdrop-blur-2xl rounded-[31px] p-8 md:p-10 overflow-hidden shadow-2xl">

                      <div className={`absolute -inset-20 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-700 pointer-events-none`} />

                      <div className="relative z-10">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                          <div className="h-16 w-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                            <EventIcon name={config.iconName} color={config.iconColor} />
                          </div>
                          <div className="flex flex-col items-end gap-2 text-right">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white/5 border border-white/10 text-cyan-400">
                              <CalendarDays className="h-3 w-3" /> {config.date}
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-white/5 border border-white/10 text-slate-400">
                              <MapPin className="h-3 w-3" /> {config.location}
                            </span>
                          </div>
                        </div>

                        <div className="mb-8">
                          <span className="text-xs font-mono tracking-widest text-indigo-400 uppercase block mb-2">
                            {config.category}
                          </span>
                          <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-white mb-4 uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all duration-300">
                            {event.title}
                          </h2>
                          <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed">
                            {event.description}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-8 py-6 border-y border-white/5">
                          {config.metrics.map((metric, idx) => (
                            <div key={idx} className="flex flex-col">
                              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">{metric.label}</span>
                              <span className="text-sm font-bold text-white tracking-wide">{metric.value}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4">
                          <div className="flex flex-wrap gap-2">
                            {event.highlights.map((tag) => (
                              <span key={tag} className="px-3 py-1.5 rounded-md bg-white/[0.03] border border-white/5 text-[10px] md:text-xs font-mono text-slate-300 uppercase tracking-wider">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedEvent(key)}
                            className="flex items-center gap-2 h-10 px-5 rounded-full bg-white/5 border border-white/10 text-xs font-mono tracking-widest uppercase text-white/70 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 transition-all duration-300 shadow-md"
                          >
                            View Gallery <ChevronRight className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <EventModal
            event={EVENTS[selectedEvent]}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function EventModal({
  event,
  onClose,
}: {
  event: (typeof EVENTS)[keyof typeof EVENTS]
  onClose: () => void
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[9000] flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.div
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] border border-white/10 bg-[#0d0d0d]/95 backdrop-blur-xl shadow-2xl p-6 md:p-10"
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-cyan-500 hover:text-black transition-all z-10 text-white"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-8">
          <p className="mb-2 text-xs font-mono uppercase tracking-widest text-cyan-400">
            {event.tagline}
          </p>
          <h2 className="mb-4 font-black text-3xl tracking-tighter text-white uppercase sm:text-4xl">
            {event.title}
          </h2>
          <p className="max-w-3xl text-slate-400 text-base font-light leading-relaxed">
            {event.description}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {event.highlights.map((h) => (
            <span
              key={h}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-mono text-white/70 uppercase tracking-wider"
            >
              {h}
            </span>
          ))}
        </div>

        <div>
          <div className="mb-5 flex items-baseline justify-between border-b border-white/5 pb-3">
            <h3 className="font-black text-xl tracking-tighter text-white uppercase">Event Gallery</h3>
            <span className="text-xs font-mono text-slate-400">{event.images.length} photos — tap to expand</span>
          </div>
          <Gallery images={event.images} />
        </div>
      </motion.div>
    </motion.div>
  )
}