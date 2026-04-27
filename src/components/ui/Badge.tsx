import { type HTMLAttributes, type ReactNode } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode
  /** custom inline accent color (text + border tint) */
  accent?: string
}

export function Badge({ children, accent, className = '', style, ...rest }: BadgeProps) {
  const accentStyle = accent
    ? {
        color: accent,
        borderColor: `${accent}33`,
        background: `${accent}10`,
      }
    : undefined

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border border-[color:var(--line)] bg-[color:var(--bg-elev)] px-2 py-1 font-mono text-[0.7rem] text-[color:var(--ink-muted)] ${className}`}
      style={{ ...accentStyle, ...style }}
      {...rest}
    >
      {children}
    </span>
  )
}
