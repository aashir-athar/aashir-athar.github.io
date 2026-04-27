interface StatProps {
  value: string
  label: string
  accent?: string
  className?: string
}

export function Stat({ value, label, accent = 'var(--cyan)', className = '' }: StatProps) {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <span
        className="font-display text-base font-extrabold leading-none sm:text-lg"
        style={{ color: accent }}
      >
        {value}
      </span>
      <span className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-[color:var(--ink-faint)]">
        {label}
      </span>
    </div>
  )
}
