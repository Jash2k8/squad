"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { AtomMark } from "@/components/squad-logo"

const GLYPHS = "!<>-_\\/[]{}—=+*^?#01ABCDEFGHIJKLMNOPQRSTUVWXYZ"

// Renders: S Q U ⚛ D
// Sequence: all 5 slots scramble → lock one by one as random glyphs → 
// resolve to S Q U [atom] D — A is never shown
function DecodingText() {
  // each slot: "scrambling" | "locked"
  const [phase, setPhase] = useState<"scrambling" | "done">("scrambling")
  const [lockedCount, setLockedCount] = useState(0) // 0-5 slots locked
  const [scramble, setScramble] = useState<string[]>(["", "", "", "", ""])

  // The resolved display for each slot (atom replaces the A at index 3)
  const RESOLVED = ["S", "Q", "U", "⚛", "D"]

  useEffect(() => {
    // Scramble interval
    const id = setInterval(() => {
      setScramble(() =>
        RESOLVED.map((_, i) =>
          GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        )
      )
    }, 55)

    // Lock slots one by one: S→Q→U→atom→D
    const lockTimers = [0, 1, 2, 3, 4].map((i) =>
      setTimeout(() => {
        setLockedCount(i + 1)
      }, 500 + i * 280)
    )

    // After all locked, mark done
    const doneTimer = setTimeout(() => {
      clearInterval(id)
      setPhase("done")
    }, 500 + 5 * 280 + 100)

    return () => {
      clearInterval(id)
      lockTimers.forEach(clearTimeout)
      clearTimeout(doneTimer)
    }
  }, [])

  return (
    <span
      className="inline-flex items-center font-display text-6xl font-bold tracking-[0.1em] text-white sm:text-7xl md:text-8xl"
      aria-label="SQUAD"
    >
      {/* S */}
      <span>{lockedCount > 0 ? "S" : (scramble[0] || "\u00A0")}</span>
      {/* Q */}
      <span>{lockedCount > 1 ? "Q" : (scramble[1] || "\u00A0")}</span>
      {/* U */}
      <span>{lockedCount > 2 ? "U" : (scramble[2] || "\u00A0")}</span>

      {/* ⚛ — atom replaces A, never shows the letter A */}
      <span className="inline-flex items-center justify-center" style={{ width: "0.72em" }}>
        {lockedCount > 3 ? (
          <motion.span
            initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
            className="inline-flex"
          >
            <AtomMark className="h-[0.78em] w-[0.78em]" />
          </motion.span>
        ) : (
          <span>{scramble[3] || "\u00A0"}</span>
        )}
      </span>

      {/* D */}
      <span>{lockedCount > 4 ? "D" : (scramble[4] || "\u00A0")}</span>
    </span>
  )
}

export function SplashScreen({ onDismiss }: { onDismiss: () => void }) {
  const calledRef = useRef(false)

  useEffect(() => {
    const t = setTimeout(() => {
      if (!calledRef.current) {
        calledRef.current = true
        onDismiss()
      }
    }, 3800)
    return () => clearTimeout(t)
  }, [onDismiss])

  const scanlines = useMemo(
    () => ({
      backgroundImage:
        "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 3px)",
    }),
    [],
  )

  return (
    <motion.div
      className="fixed inset-0 z-[9000] flex flex-col items-center justify-center bg-black"
      initial={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-60" style={scanlines} />

      <div className="relative flex flex-col items-center gap-8 px-6">
        <motion.div
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6 }}
        >
          <DecodingText />
        </motion.div>

        <motion.p
          className="max-w-md text-center text-sm tracking-wide text-white/60"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          Departmental Club — Data Science Department, MLRIT
        </motion.p>
      </div>
    </motion.div>
  )
}
