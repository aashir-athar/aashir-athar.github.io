import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { skills } from '../data/resume'
import { Container, Section, SectionHeader } from '../components/ui'

const ease = [0.16, 1, 0.3, 1] as const

const categories = ['Core', 'Mobile', 'Backend', 'Auth', 'DevOps', 'Design'] as const

/* Category accents are CSS var refs so they auto-theme. Inline styles
 * use color-mix() instead of hex alpha. --pink has no per-theme override,
 * so use a fixed hex for it (acceptable: pink is rarely used as text). */
const categoryMeta: Record<string, { label: string; color: string; index: string; note: string }> = {
  Core:    { label: 'Core engineering', color: 'var(--cyan)',    index: '01', note: 'Daily drivers — what every commit touches.' },
  Mobile:  { label: 'Mobile platform',  color: 'var(--violet)',  index: '02', note: 'Native bridges, animation, distribution.' },
  Backend: { label: 'Backend & data',   color: 'var(--emerald)', index: '03', note: 'Realtime, persistence, REST + RPC.' },
  Auth:    { label: 'Auth & security',  color: 'var(--amber)',   index: '04', note: 'Identity, sessions, hardening.' },
  DevOps:  { label: 'Release & DevOps', color: 'var(--rose)',    index: '05', note: 'Pipelines that don\'t break at 2 a.m.' },
  Design:  { label: 'Design & UX',      color: 'var(--pink)',    index: '06', note: 'Pixel discipline, motion as feedback.' },
}

/* -------------------------------------------------------------------------- *
 *  SKILLS — bento layout. The key moves vs. the prior version:               *
 *   - The first card (Core) spans 2 columns on desktop, anchoring the grid   *
 *     and giving the eye a confident entry point. Editorial bento staple.    *
 *   - Each card has a ghosted index in the corner — turns the grid into a    *
 *     navigable directory rather than a flat tag cloud.                      *
 *   - Skill chips use accent-tinted hover via a CSS variable, no inline JS   *
 *     handlers. Lower reconciliation cost on a long chip list.               *
 *                                                                             *
 *  Performance: the IntersectionObserver fires once. Once revealed, the      *
 *  whole section is GPU-only (transform/opacity transitions). Reduced-motion *
 *  users see a static state immediately.                                     *
 * -------------------------------------------------------------------------- */

export default function Skills() {
  const { ref, inView } = useInView()
  const reduceMotion = useReducedMotion()

  const grouped = categories.map(cat => ({
    category: cat,
    ...categoryMeta[cat],
    skills: skills.filter(s => s.category === cat),
  }))

  return (
    <Section id="skills" aria-labelledby="skills-heading">
      <Container>
        <SectionHeader
          index="02"
          eyebrow="Stack"
          accent="violet"
          id="skills-heading"
          title={
            <>
              The stack I{' '}
              <span className="serif-italic text-[color:var(--cyan)]">actually</span>{' '}
              <span className="gradient-text">ship with.</span>
            </>
          }
          description="React Native end-to-end, plus the backend and DevOps the team needs to keep moving. Tools I've shipped at production scale — not a checklist of things I've heard of in a conference talk."
        />

        <div
          ref={ref}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {grouped.map((group, gi) => {
            // Anchor card — Core spans 2 columns at lg+ for editorial weight.
            const isAnchor = group.category === 'Core'
            return (
              <motion.article
                key={group.category}
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                animate={inView && !reduceMotion ? { opacity: 1, y: 0 } : reduceMotion ? { opacity: 1 } : undefined}
                transition={{ duration: 0.65, delay: gi * 0.05, ease }}
                className={`group relative h-full overflow-hidden rounded-3xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[var(--shadow-card)] transition-[transform,border-color] duration-500 [transition-timing-function:var(--ease-signature)] hover:-translate-y-1 hover:border-[color:var(--line-strong)] sm:p-7 ${
                  isAnchor ? 'lg:col-span-2' : ''
                }`}
                style={{ ['--chip-accent' as string]: group.color } as React.CSSProperties}
              >
                {/* Background glow disc — accent-tinted, blurred, GPU-only. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 -right-20 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 [transition-timing-function:var(--ease-signature)] group-hover:opacity-50"
                  style={{ background: group.color }}
                />

                {/* Ghost index — sits in the corner, large, very faint. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-5 -top-2 select-none font-display text-[5.5rem] font-bold leading-none tracking-[-0.05em] opacity-[0.05] transition-opacity duration-700 group-hover:opacity-[0.10]"
                  style={{ color: group.color }}
                >
                  {group.index}
                </span>

                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span
                        aria-hidden="true"
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ background: group.color, boxShadow: `0 0 8px ${group.color}` }}
                      />
                      <h3 className="font-display text-[0.85rem] font-semibold uppercase tracking-[0.10em] text-[color:var(--ink)]">
                        {group.label}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 max-w-md text-[0.94rem] leading-[1.7] text-[color:var(--ink-muted)]">
                    {group.note}
                  </p>

                  {/* Chips — pure CSS hover via custom property. */}
                  <ul className="skill-chips mt-6 flex flex-wrap gap-2">
                    {group.skills.map(skill => (
                      <li
                        key={skill.name}
                        className="skill-chip rounded-full border border-[color:var(--line)] bg-[color:var(--bg-elev)] px-3 py-1.5 text-[0.82rem] text-[color:var(--ink)] transition-[border-color,color,transform] duration-300 hover:-translate-y-0.5"
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom accent rule */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 [transition-timing-function:var(--ease-signature)] group-hover:scale-x-100"
                  style={{ background: `linear-gradient(90deg, transparent, ${group.color}, transparent)` }}
                />
              </motion.article>
            )
          })}
        </div>

        {/* Footnote — the philosophy line. Stays. */}
        <p className="mt-10 max-w-2xl text-[0.85rem] leading-[1.65] text-[color:var(--ink-faint)]">
          Levels intentionally not shown — proficiency lives in the code, not in a self-rated bar
          chart.
        </p>
      </Container>
    </Section>
  )
}
