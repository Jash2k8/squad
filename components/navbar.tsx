"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { NAV_TABS } from "@/lib/data"
import { SquadWordmark } from "@/components/squad-logo"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-[8000] border-b border-white/5 bg-[#161618]/80 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12">

        <Link href="/" className="flex items-center shrink-0" aria-label="Go to home">
          <SquadWordmark tone="light" className="text-2xl" />
        </Link>

        {/* Centre: nav links */}
        <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {NAV_TABS.map((tab) => {
            const isActive = pathname === `/${tab.id}` || (tab.id === "home" && pathname === "/")
            return (
              <Link
                key={tab.id}
                href={tab.id === "home" ? "/" : `/${tab.id}`}
                className={cn(
                  "relative px-4 py-2 text-[14px] font-medium transition-colors group",
                  isActive ? "text-white" : "text-white/50 hover:text-white"
                )}
              >
                {tab.label}
                <span className={cn(
                  "absolute bottom-1 left-4 right-4 h-[2px] bg-cyan-400 origin-left transition-transform duration-300 shadow-[0_0_10px_rgba(34,211,238,0.8)]",
                  isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                )} />
              </Link>
            )
          })}
        </nav>

        {/* Right: CTA + mobile toggle */}
        <div className="flex items-center gap-4 shrink-0">
          <Link
            href="/join"
            className="hidden md:flex h-9 items-center justify-center rounded-full bg-white px-5 text-[13px] font-semibold text-black transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            Join the Club
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile slide-in panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[7999] bg-black/60 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 z-[8001] h-full w-72 border-l border-white/10 bg-[#161618]/95 backdrop-blur-xl shadow-2xl md:hidden flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <Link href="/" onClick={() => setOpen(false)}>
                  <SquadWordmark tone="light" className="text-xl" />
                </Link>
                <button
                  type="button"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ul className="flex flex-col gap-1 px-4 py-4 flex-1">
                {NAV_TABS.map((tab) => {
                  const isActive = pathname === `/${tab.id}` || (tab.id === "home" && pathname === "/")
                  return (
                    <li key={tab.id}>
                      <Link
                        href={tab.id === "home" ? "/" : `/${tab.id}`}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex w-full items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                          isActive ? "bg-white/10 text-cyan-400" : "text-white/50 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        {tab.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <div className="px-4 pb-6">
                <Link
                  href="/join"
                  onClick={() => setOpen(false)}
                  className="block w-full rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-black transition-colors hover:bg-white/90"
                >
                  Join the Club
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
