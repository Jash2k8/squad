"use client"

import { motion } from "motion/react"
import { Users } from "lucide-react"
import { CORE_TEAM } from "@/lib/data"

export function SquadSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-accent/50 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
        <motion.div
          className="mb-10 flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
              <Users className="h-5 w-5" />
            </span>
            <p className="text-xs font-medium uppercase tracking-widest text-primary">The team</p>
          </div>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Meet the Squad
          </h2>
          <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            The people steering SQUAD — a mix of engineers, organisers, and creatives who keep the
            club running and the ideas flowing.
          </p>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                <p className="text-sm font-medium text-primary">{member.role}</p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
