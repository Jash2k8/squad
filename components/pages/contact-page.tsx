"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Mail, MapPin, Send, Check } from "lucide-react"
import { SOCIALS, CONTACT_EMAIL } from "@/lib/data"

export function ContactPage() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3500)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/8 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
        <motion.div
          className="mb-10 flex flex-col gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xs font-medium uppercase tracking-widest text-primary">Say hello</p>
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Contact Us
          </h2>
          <p className="max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
            Want to collaborate, invite SQUAD to an event, or just say hello? Drop us a line — we
            read every message.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-2xl border border-border bg-white/30 backdrop-blur-md p-5 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" htmlFor="name">
                <input
                  id="name" name="name" required placeholder="Your name"
                  className="w-full rounded-lg border border-input bg-white/30 backdrop-blur-sm px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:bg-white/50"
                />
              </Field>
              <Field label="Email" htmlFor="email">
                <input
                  id="email" name="email" type="email" required placeholder="you@college.edu"
                  className="w-full rounded-lg border border-input bg-white/30 backdrop-blur-sm px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:bg-white/50"
                />
              </Field>
            </div>
            <Field label="Subject" htmlFor="subject">
              <input
                id="subject" name="subject" required placeholder="What's this about?"
                className="w-full rounded-lg border border-input bg-white/30 backdrop-blur-sm px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:bg-white/50"
              />
            </Field>
            <Field label="Message" htmlFor="message">
              <textarea
                id="message" name="message" required rows={5} placeholder="Tell us more..."
                className="w-full resize-none rounded-lg border border-input bg-white/30 backdrop-blur-sm px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary focus:bg-white/50"
              />
            </Field>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {sent ? (
                <><Check className="h-4 w-4" /> Message sent</>
              ) : (
                <><Send className="h-4 w-4" /> Send message</>
              )}
            </button>
          </motion.form>

          {/* Info + socials */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.12 }}
          >
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-white/30 backdrop-blur-md p-5">
              <InfoRow icon={Mail} label="Email" value={CONTACT_EMAIL} />
              <InfoRow icon={MapPin} label="Find us" value="Dept. of Data Science, MLRIT" />
            </div>

            <div className="flex flex-col gap-3 rounded-2xl border border-border bg-white/30 backdrop-blur-md p-5">
              <h3 className="font-display text-base font-semibold text-foreground">Follow along</h3>
              <p className="text-sm text-muted-foreground">
                Follow our official SQUAD handles to stay updated.
              </p>
              <div className="grid grid-cols-2 gap-2.5">
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col rounded-xl border border-border bg-white/20 px-3.5 py-3 transition-all hover:border-primary/50 hover:bg-white/40"
                  >
                    <span className="text-sm font-medium text-foreground">{s.label}</span>
                    <span className="text-xs text-muted-foreground">{s.handle}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground">{label}</span>
      {children}
    </label>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
        <Icon className="h-4 w-4" />
      </span>
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className="text-sm font-medium text-foreground">{value}</span>
      </div>
    </div>
  )
}
