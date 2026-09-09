"use client"

import { motion } from "motion/react"
import { CORE_TEAM } from "@/lib/data"

export function TeamGrid() {
  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {CORE_TEAM.map((member, i) => (
        <motion.article
          key={member.id}
          className="group relative overflow-hidden rounded-2xl border border-border bg-white/30 backdrop-blur-md"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: (i % 4) * 0.06 }}
          whileHover={{ y: -6 }}
        >
          <div className="aspect-square overflow-hidden bg-muted">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={member.avatar || "/placeholder.svg"}
              alt={`${member.name}, ${member.role}`}
              className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
              style={{ objectPosition: member.objectPosition ?? "center" }}
            />
          </div>
          <div className="flex flex-col gap-0.5 p-4">
            <h3 className="font-display text-base font-semibold text-foreground">{member.name}</h3>
            <p className="text-sm text-primary font-medium">{member.role}</p>
          </div>
          <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
        </motion.article>
      ))}
    </div>
  )
}
