"use client"

import { motion } from "motion/react"
import { Image as ImageIcon, Sparkles } from "lucide-react"
import { GALLERY_IMAGES } from "@/lib/data"
import { Gallery } from "@/components/gallery"

export function GallerySection() {
  return (
    <div className="min-h-screen text-white selection:bg-cyan-500/30 pt-32 pb-32 px-6 md:px-12 relative overflow-hidden">

      {/* Background */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 h-[600px] w-[800px] bg-indigo-500/8 blur-[160px] rounded-full pointer-events-none" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center mb-16"
      >
        <div className="mb-6 flex items-center justify-center h-16 w-16 rounded-2xl bg-white/5 border border-white/10 text-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
          <ImageIcon className="h-8 w-8" />
        </div>
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          <span className="text-xs font-mono tracking-widest text-cyan-300 uppercase">Visual Archive</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 uppercase">
          The{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-500">
            Gallery.
          </span>
        </h1>
        <p className="max-w-2xl text-lg text-white/40 font-light leading-relaxed tracking-wide">
          Highlights from our events, workshops, and moments that define SQUAD.
        </p>
      </motion.div>

      {/* Gallery grid */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <Gallery images={GALLERY_IMAGES} />
      </div>
    </div>
  )
}
