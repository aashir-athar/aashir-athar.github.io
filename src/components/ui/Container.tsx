import { type HTMLAttributes } from 'react'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-[1200px]',
} as const

export function Container({ size = 'lg', className = '', ...rest }: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10 ${sizes[size]} ${className}`}
      {...rest}
    />
  )
}
