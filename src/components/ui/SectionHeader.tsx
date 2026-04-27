import { motion } from 'framer-motion'
import { type ReactNode } from 'react'

interface SectionHeaderProps {
  /** Editorial numbered index — e.g. "01" */
  index?: string
  /** Eyebrow label — e.g. "About" */
  eyebrow: string
  /** Color accent for the eyebrow chip + dot */
  accent?: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose' | 'pink'
  title: ReactNode
  description?: ReactNode
  /** Editorial rule — defaults to a 1px gradient under the title */
  rule?: boolean
  align?: 'center' | 'left'
  id?: string
}

const accentMap = {
  cyan:    { text: 'text-[color:var(--cyan)]',    border: 'border-[color:var(--line-bright)]',     bg: 'bg-[var(--cyan-glow)]',    dot: 'bg-[color:var(--cyan)]'    },
  violet:  { text: 'text-[color:var(--violet)]',  border: 'border-[rgba(139,92,246,0.30)]',         bg: 'bg-[var(--violet-glow)]',  dot: 'bg-[color:var(--violet)]'  },
  emerald: { text: 'text-[color:var(--emerald)]', border: 'border-[rgba(16,185,129,0.30)]',         bg: 'bg-[var(--emerald-glow)]', dot: 'bg-[color:var(--emerald)]' },
  amber:   { text: 'text-[color:var(--amber)]',   border: 'border-[rgba(245,158,11,0.30)]',         bg: 'bg-[rgba(245,158,11,0.10)]', dot: 'bg-[color:var(--amber)]' },
  rose:    { text: 'text-[color:var(--rose)]',    border: 'border-[rgba(244,63,94,0.30)]',          bg: 'bg-[rgba(244,63,94,0.10)]', dot: 'bg-[color:var(--rose)]' },
  pink:    { text: 'text-[color:var(--pink)]',    border: 'border-[rgba(236,72,153,0.30)]',         bg: 'bg-[rgba(236,72,153,0.10)]', dot: 'bg-[color:var(--pink)]' },
} as const

export function SectionHeader({
  index,
  eyebrow,
  accent = 'cyan',
  title,
  description,
  rule = true,
  align = 'left',
  id,
}: SectionHeaderProps) {
  const tones = accentMap[accent]
  const isCenter = align === 'center'
  const wrap = isCenter ? 'mx-auto text-center' : 'text-left'
  const descMax = isCenter ? 'max-w-2xl' : 'max-w-3xl'

  return (
    <motion.header
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-6 sm:mb-8 md:mb-10 ${wrap}`}
    >
      <div
        className={`flex flex-wrap items-center gap-3 ${isCenter ? 'justify-center' : ''}`}
      >
        {index && (
          <span className="section-index">
            <span className="text-[color:var(--ink-muted)]">{index}</span>
            <span className="mx-2 text-[color:var(--ink-faint)]">/</span>
            <span className={tones.text}>{eyebrow}</span>
          </span>
        )}
        {!index && (
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[0.72rem] tracking-[0.05em] ${tones.bg} ${tones.text} ${tones.border}`}
          >
            <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${tones.dot}`} />
            {eyebrow}
          </span>
        )}
      </div>

      <h2
        id={id}
        className={`mt-6 font-display font-bold text-[length:var(--text-h1)] leading-[1.06] tracking-[-0.025em] text-[color:var(--ink)] ${
          isCenter ? 'mx-auto max-w-3xl' : ''
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-6 text-[1.02rem] leading-[1.8] text-[color:var(--ink-muted)] sm:text-[1.06rem] sm:leading-[1.82] ${descMax} ${
            isCenter ? 'mx-auto' : ''
          }`}
        >
          {description}
        </p>
      )}

      {rule && (
        <div
          aria-hidden="true"
          className={`mt-8 h-px w-full bg-[linear-gradient(90deg,var(--line-strong),transparent)] ${
            isCenter ? 'max-w-md mx-auto' : ''
          }`}
        />
      )}
    </motion.header>
  )
}
