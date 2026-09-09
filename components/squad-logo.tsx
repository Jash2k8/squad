import { cn } from "@/lib/utils"

export function AtomMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={cn("inline-block shrink-0 align-middle", className)}
      fill="none"
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="7" fill="currentColor" />
      <g stroke="currentColor" strokeWidth="4" fill="none">
        <ellipse cx="50" cy="50" rx="44" ry="17" />
        <ellipse cx="50" cy="50" rx="44" ry="17" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="44" ry="17" transform="rotate(120 50 50)" />
      </g>
    </svg>
  )
}

export function SquadWordmark({
  className,
  tone = "dark",
}: {
  className?: string
  tone?: "light" | "dark"
}) {
  const color = tone === "light" ? "text-white" : "text-foreground"
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[0.02em] font-display font-bold tracking-[0.1em] leading-none",
        color,
        className,
      )}
      aria-label="SQUAD"
    >
      <span>SQU</span>
      <AtomMark className="h-[0.78em] w-[0.78em]" />
      <span>D</span>
    </span>
  )
}
