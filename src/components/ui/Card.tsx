import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Make the card hoverable (border-glow + lift). Pure visual, doesn't change semantics. */
  interactive?: boolean
  /** Color accent on hover — only used when interactive */
  accent?: string
  padding?: 'sm' | 'md' | 'lg'
}

const paddingClasses = {
  sm: 'p-4 sm:p-5',
  md: 'p-5 sm:p-6 md:p-7',
  lg: 'p-6 sm:p-7 md:p-8',
} as const

export function Card({
  interactive = false,
  accent = 'var(--cyan)',
  padding = 'md',
  className = '',
  style,
  ...rest
}: CardProps) {
  const interactiveStyle = interactive
    ? {
        ['--card-accent' as string]: accent,
      }
    : undefined

  return (
    <div
      className={[
        'rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)]',
        'shadow-[var(--shadow-card)]',
        paddingClasses[padding],
        interactive
          ? 'transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[color:var(--card-accent,var(--cyan))]/60 hover:shadow-[var(--shadow-elev)]'
          : '',
        className,
      ].join(' ')}
      style={{ ...interactiveStyle, ...style }}
      {...rest}
    />
  )
}
