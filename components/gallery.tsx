"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Lightbox } from "@/components/lightbox"
import type { GalleryImage } from "@/lib/data"
import { cn } from "@/lib/utils"

const SPAN_CLASS: Record<GalleryImage["span"], string> = {
  tall: "row-span-2",
  wide: "col-span-2",
  square: "",
}

export function Gallery({ images }: { images: GalleryImage[] }) {
  const [active, setActive] = useState<number | null>(null)

  return (
    <>
      <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-3 md:auto-rows-[200px] lg:grid-cols-4">
        {images.map((img, i) => (
          <motion.button
            key={img.id}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "group relative overflow-hidden rounded-xl border border-border bg-white/20 backdrop-blur-sm",
              SPAN_CLASS[img.span],
            )}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
            aria-label={`Open ${img.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src || "/placeholder.svg"}
              alt={img.alt}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <span className="absolute inset-0 bg-primary/0 transition-colors duration-300 group-hover:bg-primary/15" />
          </motion.button>
        ))}
      </div>

      <Lightbox
        images={images}
        index={active}
        onClose={() => setActive(null)}
        onNavigate={(n) => setActive(n)}
      />
    </>
  )
}
