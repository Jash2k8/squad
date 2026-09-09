"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"

export function CustomCursor() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const ringX = useSpring(cursorX, { damping: 26, stiffness: 260, mass: 0.6 })
  const ringY = useSpring(cursorY, { damping: 26, stiffness: 260, mass: 0.6 })
  const dotX = useSpring(cursorX, { damping: 40, stiffness: 900, mass: 0.3 })
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 900, mass: 0.3 })

  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!visible) setVisible(true)
      const target = e.target as HTMLElement | null
      const interactive = target?.closest(
        'a, button, input, textarea, select, label, [role="button"], [data-cursor="hover"]',
      )
      setHovering(Boolean(interactive))
    }

    const down = () => setPressed(true)
    const up = () => setPressed(false)
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    window.addEventListener("mousemove", move)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)
    document.addEventListener("mouseleave", leave)
    document.addEventListener("mouseenter", enter)

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup", up)
      document.removeEventListener("mouseleave", leave)
      document.removeEventListener("mouseenter", enter)
    }
  }, [cursorX, cursorY, visible])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[99999] hidden md:block"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        className="absolute left-0 top-0 rounded-full border border-primary/70 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 52 : 34,
          height: hovering ? 52 : 34,
          opacity: pressed ? 0.4 : 1,
          scale: pressed ? 0.85 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      />
      <motion.div
        className="absolute left-0 top-0 rounded-full bg-primary"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 6 : 8,
          height: hovering ? 6 : 8,
          scale: pressed ? 1.6 : 1,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 400 }}
      />
    </div>
  )
}
