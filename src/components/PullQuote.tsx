import { type ReactNode, useEffect, useRef, useState } from 'react'

/* -------------------------------------------------------------------------- *
 *  PULL QUOTE — editorial typographic break that lives between sections.     *
 *                                                                            *
 *  Why it exists: a stack of card grids reads as a list. A line of mega-     *
 *  type between them establishes rhythm and gives the eye somewhere to       *
 *  rest before the next dense block.                                         *
 *                                                                            *
 *  Implementation notes:                                                     *
 *   - Uses a single IntersectionObserver disconnect-after-fire — the         *
 *     reveal animates once and never costs anything afterwards.              *
 *   - Animation is a CSS class change (transform + opacity), not Framer.     *
 *     Framer Motion would parse a new MotionValue per quote; this stays at   *
 *     ~0kb runtime impact.                                                   *
 *   - `text-wrap: balance` (set in .pull-quote) keeps the line breaks even   *
 *     on every viewport without manual <br/>.                                *
 * -------------------------------------------------------------------------- */

interface PullQuoteProps {
  children: ReactNode
  /** Optional eyebrow above the quote — short, mono, faint. */
  kicker?: string
  /** Aligns the quote — defaults to left, which reads as editorial.     */
  align?: 'left' | 'center'
  /** Tighter / looser surrounding rhythm. Defaults to standard.         */
  pad?: 'standard' | 'tight'
}

export default function PullQuote({
  children,
  kicker,
  align = 'left',
  pad = 'standard',
}: PullQuoteProps) {
  const ref = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setRevealed(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const padClass = pad === 'tight' ? 'py-12 sm:py-16' : 'py-20 sm:py-28 md:py-32'
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <section
      ref={ref}
      aria-hidden="true"
      className={`relative z-[1] ${padClass}`}
    >
      <div className="mx-auto w-full max-w-[1200px] bp-xxl-container px-4 sm:px-6 md:px-8 lg:px-10">
        <div
          className={`max-w-[44rem] ${alignClass} transition-[transform,opacity] duration-[1.1s] [transition-timing-function:var(--ease-signature)] ${
            revealed ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          {kicker && (
            <p className="mb-5 font-mono text-[0.72rem] tracking-[0.18em] uppercase text-[color:var(--ink-faint)]">
              <span className="text-[color:var(--cyan)]">[</span>
              <span className="mx-2">{kicker}</span>
              <span className="text-[color:var(--cyan)]">]</span>
            </p>
          )}
          <p className="pull-quote">{children}</p>
        </div>

        {/* Editorial hairline — fades in after the quote settles. */}
        <div
          aria-hidden="true"
          className={`mt-10 h-px max-w-[140px] origin-left bg-[linear-gradient(90deg,var(--cyan),transparent)] transition-transform duration-[1.4s] [transition-timing-function:var(--ease-signature)] ${
            revealed ? 'scale-x-100' : 'scale-x-0'
          }`}
          style={{ transitionDelay: '0.3s' }}
        />
      </div>
    </section>
  )
}
