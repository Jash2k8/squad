import { Lock } from "lucide-react"

export default function JoinPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="rounded-3xl border border-border bg-white/60 backdrop-blur-md p-8 md:p-12 text-center shadow-xl">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-border bg-accent/30">
              <Lock className="h-10 w-10 text-primary" />
            </div>
          </div>

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-red-500" />
            <span className="text-sm font-medium tracking-wide text-red-600">APPLICATIONS CLOSED</span>
          </div>

          <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Applications Closed
          </h1>

          <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Recruitment for the SQUAD team is now closed. Thank you to everyone who applied — follow our
            official handles to stay in the loop on what's next.
          </p>
        </div>
      </div>
    </div>
  )
}
