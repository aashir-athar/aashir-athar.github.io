import { type HTMLAttributes } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  /* Default content track. Caps at 1200px through XL; widens at 4K/ultra-wide
     via the `bp-xxl` overrides in index.css so content doesn't look stranded
     in the middle of a 1920+ monitor. */
  lg: 'max-w-[1200px] bp-xxl-container',
} as const

export function Container({ size = 'lg', className = '', ...rest }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 ${sizes[size]} ${className}`}
      {...rest}
    />
  )
}
