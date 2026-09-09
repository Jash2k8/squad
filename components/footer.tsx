"use client"

import { MapPin, Mail } from "lucide-react"
import { SquadWordmark } from "@/components/squad-logo"
import { NAV_TABS, SOCIALS, CONTACT_EMAIL } from "@/lib/data"
import Link from "next/link"

const EXPLORE = NAV_TABS.slice(0, 3)
const MORE = NAV_TABS.slice(3)

export function Footer() {
  return (
    <footer className="relative w-full overflow-hidden border-t border-white/5 bg-[#050505] pt-20 pb-10">

      {/* Background glows */}
      <div className="absolute top-0 left-1/4 h-[300px] w-[500px] -translate-y-1/2 rounded-full bg-cyan-500/8 blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-1/4 h-[300px] w-[500px] -translate-y-1/2 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">

        {/* 4-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-16">

          {/* Brand */}
          <div className="flex flex-col gap-6 lg:pr-8">
            <Link href="/" className="flex items-center group">
              <SquadWordmark tone="light" className="text-xl" />
            </Link>
            <p className="text-white/40 text-sm font-light leading-relaxed">
              Departmental Club — Data Science, MLRIT. Building, competing, and celebrating together.
            </p>
            <div className="flex flex-col gap-3 text-white/40 text-sm font-light">
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-cyan-400" />
                <span>Hyderabad, Telangana, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-cyan-400" />
                <a href={`mailto:${CONTACT_EMAIL}`} className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold tracking-wide text-sm">Explore</h4>
            {EXPLORE.map((t) => (
              <Link
                key={t.id}
                href={t.id === "home" ? "/" : `/${t.id}`}
                className="text-white/40 hover:text-cyan-400 text-sm font-light transition-colors duration-200 w-fit"
              >
                {t.label}
              </Link>
            ))}
          </div>

          {/* More */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold tracking-wide text-sm">More</h4>
            {MORE.map((t) => (
              <Link
                key={t.id}
                href={`/${t.id}`}
                className="text-white/40 hover:text-cyan-400 text-sm font-light transition-colors duration-200 w-fit"
              >
                {t.label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-semibold tracking-wide text-sm">Social</h4>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-0.5 text-white/40 hover:text-cyan-400 text-sm font-light transition-colors duration-200 w-fit"
              >
                <span>{s.label}</span>
                <span className="text-[11px] font-mono text-white/20">{s.handle}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
          <div className="flex items-center gap-6 text-white/20 text-xs font-light">
            <div className="flex items-center gap-2 text-emerald-400/70">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              All systems operational
            </div>
            <span>© {new Date().getFullYear()} SQUAD Club · MLRIT. All rights reserved.</span>
          </div>

          <button
            type="button"
            id="footer-admin-trigger"
            className="text-white/20 text-xs transition-colors duration-200 hover:text-white/50"
          >
            Designed &amp; built by the SQUAD core team.
          </button>
        </div>
      </div>
    </footer>
  )
}
