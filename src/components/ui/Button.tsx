import { motion, type HTMLMotionProps } from 'framer-motion'
import { type ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const baseClasses = [
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-display font-bold no-underline',
  'transition-shadow duration-300',
  'min-h-11', /* WCAG 2.5.5 — 44px touch target */
].join(' ')

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[linear-gradient(135deg,var(--cyan),var(--violet))] text-white shadow-[0_8px_28px_rgba(34,211,238,0.30)] hover:shadow-[0_12px_36px_rgba(34,211,238,0.40)]',
  secondary:
    'bg-[color:var(--surface)] text-[color:var(--ink)] border border-[color:var(--line-bright)] hover:border-[color:var(--cyan)]',
  ghost:
    'bg-transparent text-[color:var(--ink-muted)] border border-[color:var(--line)] hover:text-[color:var(--ink)] hover:border-[color:var(--line-strong)]',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2.5 text-xs',
  md: 'px-5 py-3 text-sm',
  lg: 'px-6 py-3.5 text-sm sm:text-base',
}

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  className = '',
}: {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
} = {}): string {
  return `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`.trim()
}

interface CommonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: ReactNode
}

type ButtonAsButton = CommonProps & HTMLMotionProps<'button'> & { as?: 'button' }
type ButtonAsAnchor = CommonProps & HTMLMotionProps<'a'> & { as: 'a'; href: string }

export function Button(props: ButtonAsButton | ButtonAsAnchor) {
  const { variant = 'primary', size = 'md', className = '', children, ...rest } = props

  const cls = buttonClasses({ variant, size, className })
  const motionDefaults = {
    whileHover: { scale: 1.03, y: -2 },
    whileTap: { scale: 0.97 },
  }

  if ('as' in props && props.as === 'a') {
    const { as: _as, ...anchorProps } = rest as HTMLMotionProps<'a'> & { as: 'a' }
    return (
      <motion.a className={cls} {...motionDefaults} {...anchorProps}>
        {children}
      </motion.a>
    )
  }

  const { as: _as, ...buttonProps } = rest as HTMLMotionProps<'button'> & { as?: 'button' }
  return (
    <motion.button className={cls} {...motionDefaults} {...buttonProps}>
      {children}
    </motion.button>
  )
}
