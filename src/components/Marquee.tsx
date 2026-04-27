import { type ReactNode, useMemo } from 'react'

interface MarqueeProps {
  items: ReactNode[]
  speed?: number
  separator?: ReactNode
  className?: string
  ariaLabel?: string
}

/**
 * Infinite-scrolling marquee. Accessible: paused on hover, hidden from screen
 * readers (decorative). Uses a doubled track + transform — GPU-only, no JS tick.
 */
export default function Marquee({
  items,
  speed = 38,
  separator,
  className = '',
  ariaLabel,
}: MarqueeProps) {
  const doubled = useMemo(() => [...items, ...items], [items])

  return (
    <div
      role="presentation"
      aria-label={ariaLabel}
      className={`marquee-track relative w-full overflow-hidden ${className}`}
      style={
        {
          maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
          ['--marquee-duration' as string]: `${speed}s`,
        } as React.CSSProperties
      }
    >
      <div className="animate-marquee flex w-max items-center" aria-hidden="true">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex flex-shrink-0 items-center gap-3 px-5 font-mono text-[0.78rem] text-[color:var(--ink-muted)]"
          >
            {item}
            <span aria-hidden="true" className="text-[color:var(--ink-faint)]">
              {separator ?? '·'}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
