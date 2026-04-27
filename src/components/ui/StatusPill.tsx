import { type ReactNode } from 'react'

interface StatusPillProps {
  children: ReactNode
  tone?: 'live' | 'info'
  className?: string
}

const toneMap = {
  live: {
    container: 'border-[rgba(16,185,129,0.30)] bg-[rgba(16,185,129,0.10)] text-[color:var(--emerald)]',
    dot: 'bg-[color:var(--emerald)] shadow-[0_0_10px_var(--emerald)]',
    pulse: true,
  },
  info: {
    container: 'border-[color:var(--line-bright)] bg-[color:var(--cyan-glow)] text-[color:var(--cyan)]',
    dot: 'bg-[color:var(--cyan)] shadow-[0_0_10px_var(--cyan)]',
    pulse: false,
  },
} as const

export function StatusPill({ children, tone = 'live', className = '' }: StatusPillProps) {
  const t = toneMap[tone]
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[0.72rem] tracking-[0.04em] ${t.container} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`relative h-1.5 w-1.5 flex-shrink-0 rounded-full ${t.dot} ${t.pulse ? 'animate-pulse-ring' : ''}`}
      />
      <span className="whitespace-nowrap">{children}</span>
    </span>
  )
}
