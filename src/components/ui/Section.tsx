import { type HTMLAttributes } from 'react'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div'
  /** Vertical rhythm. `standard` is the editorial default (fluid clamp).
   *  `tight` is for compact stretches; `hero` strips padding. */
  spacing?: 'standard' | 'tight' | 'hero'
}

const spacingClasses = {
  /** Editorial rhythm: clamp(3.5rem → 6rem). About 30% tighter than the old
   *  py-16…py-32 ladder. Defined in index.css for fluid scaling. */
  standard: 'section-y',
  tight: 'section-y-tight',
  hero: '',
} as const

export function Section({
  as: Tag = 'section',
  spacing = 'standard',
  className = '',
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag className={`relative ${spacingClasses[spacing]} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
