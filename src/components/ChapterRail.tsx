import { useEffect, useRef, useState } from 'react'

/* -------------------------------------------------------------------------- *
 *  CHAPTER RAIL — sticky right-edge wayfinding for long single-page sites.   *
 *                                                                             *
 *  A stack of dots, one per top-level section. The active dot expands into a *
 *  pill labelled with the section name. Click any dot to jump.                *
 *                                                                             *
 *  Visibility rules:                                                          *
 *   - Hidden on viewports < 1024px (the navbar serves the same role there).   *
 *   - Fades in only after the user scrolls past the hero — no rail clutter   *
 *     on first impression.                                                    *
 *                                                                             *
 *  Performance:                                                               *
 *   - One `IntersectionObserver` watching all sections at multiple thresholds *
 *     to compute a single "current" id. No scroll listener.                   *
 *   - Component renders only when `current` flips, which is at most once per *
 *     section transition.                                                     *
 *   - `data-cursor="target"` on each dot makes the magnetic cursor snap to   *
 *     it, so navigation feels tactile.                                        *
 * -------------------------------------------------------------------------- */

const sections = [
  { id: 'hero',       label: 'Top' },
  { id: 'about',      label: 'About' },
  { id: 'skills',     label: 'Stack' },
  { id: 'projects',   label: 'Work' },
  { id: 'process',    label: 'Process' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact',    label: 'Contact' },
] as const

export default function ChapterRail() {
  const [current, setCurrent] = useState<string>('hero')
  const [visible, setVisible] = useState(false)
  const heroRef = useRef<HTMLElement | null>(null)

  /* Watch the hero — when it leaves the viewport, the rail fades in. We
   * use an IO here too so there's no scroll listener anywhere. */
  useEffect(() => {
    heroRef.current = document.getElementById('hero') as HTMLElement | null
    if (!heroRef.current) return
    const io = new IntersectionObserver(
      entries => entries.forEach(e => setVisible(!e.isIntersecting || e.intersectionRatio < 0.2)),
      { threshold: [0, 0.2, 0.5, 1] },
    )
    io.observe(heroRef.current)
    return () => io.disconnect()
  }, [])

  /* Compute the current section by tracking how much of each section is in
   * the viewport. The one with the largest visible area wins. */
  useEffect(() => {
    const els: HTMLElement[] = []
    sections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) els.push(el)
    })
    if (!els.length) return

    const ratios = new Map<string, number>()
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          ratios.set(e.target.id, e.intersectionRatio)
        })
        let best = { id: 'hero', r: 0 }
        ratios.forEach((r, id) => {
          if (r > best.r) best = { id, r }
        })
        if (best.r > 0) setCurrent(best.id)
      },
      {
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
        rootMargin: '-15% 0% -25% 0%',
      },
    )
    els.forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      aria-label="Section navigation"
      className={`chapter-rail ${visible ? 'is-visible' : ''}`}
    >
      <ul className="flex flex-col gap-3.5">
        {sections.map(s => {
          const active = s.id === current
          return (
            <li key={s.id} className="group relative flex items-center justify-end">
              <button
                type="button"
                onClick={() => jump(s.id)}
                aria-label={`Jump to ${s.label}`}
                aria-current={active ? 'true' : undefined}
                data-cursor="target"
                className="flex items-center gap-2 rounded-full px-2 py-1 transition-colors"
              >
                {/* Label — only appears on hover/focus at viewports wide
                    enough that it never bleeds into content. CSS gates
                    the max-width transition behind a 1536px breakpoint,
                    so at 1400-1535px the label stays collapsed. */}
                <span
                  data-rail-label
                  className={`font-mono text-[0.66rem] uppercase tracking-[0.18em] ${
                    active ? 'text-[color:var(--cyan)]' : 'text-[color:var(--ink-muted)]'
                  }`}
                >
                  {s.label}
                </span>
                {/* Dot — color + size + glow already convey active. No
                    perpetual label needed. */}
                <span
                  aria-hidden="true"
                  className={`block rounded-full transition-[width,height,background,box-shadow] duration-500 [transition-timing-function:var(--ease-signature)] ${
                    active
                      ? 'h-2.5 w-2.5 bg-[color:var(--cyan)] shadow-[0_0_10px_var(--cyan)]'
                      : 'h-1.5 w-1.5 bg-[color:var(--ink-faint)] group-hover:bg-[color:var(--ink-muted)]'
                  }`}
                />
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
