"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import type { GalleryImage } from "@/lib/data"

export function Lightbox({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: GalleryImage[]
  index: number | null
  onClose: () => void
  onNavigate: (nextIndex: number) => void
}) {
  const open = index !== null

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNavigate((index! + 1) % images.length)
      if (e.key === "ArrowLeft") onNavigate((index! - 1 + images.length) % images.length)
    }
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open, index, images.length, onClose, onNavigate])

  const current = open ? images[index!] : null

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-[9500] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onNavigate((index! - 1 + images.length) % images.length) }}
            className="absolute left-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 md:left-6"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onNavigate((index! + 1) % images.length) }}
            className="absolute right-3 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white/10 md:right-6"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <motion.figure
            key={current.id}
            className="flex max-h-[85vh] max-w-5xl flex-col items-center gap-3"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.src || "/placeholder.svg"}
              alt={current.alt}
              className="max-h-[78vh] w-auto rounded-lg object-contain"
            />
            <figcaption className="text-sm text-white/60">
              {index! + 1} / {images.length} — {current.alt}
            </figcaption>
          </motion.figure>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
