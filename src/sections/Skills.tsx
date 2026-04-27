import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { skills } from '../data/resume'
import { Container, Section, SectionHeader } from '../components/ui'

const ease = [0.16, 1, 0.3, 1] as const

const categories = ['Core', 'Mobile', 'Backend', 'Auth', 'DevOps', 'Design'] as const

const categoryMeta: Record<string, { label: string; color: string; index: string; note: string }> = {
  Core:    { label: 'Core engineering', color: '#06b6d4', index: '01', note: 'Daily drivers — what every commit touches.' },
  Mobile:  { label: 'Mobile platform',  color: '#8b5cf6', index: '02', note: 'Native bridges, animation, distribution.' },
  Backend: { label: 'Backend & data',   color: '#10b981', index: '03', note: 'Realtime, persistence, REST + RPC.' },
  Auth:    { label: 'Auth & security',  color: '#f59e0b', index: '04', note: 'Identity, sessions, hardening.' },
  DevOps:  { label: 'Release & DevOps', color: '#f43f5e', index: '05', note: 'Pipelines that don\'t break at 2 a.m.' },
  Design:  { label: 'Design & UX',      color: '#ec4899', index: '06', note: 'Pixel discipline, motion as feedback.' },
}

export default function Skills() {
  const { ref, inView } = useInView()
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

        <div ref={ref} className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {grouped.map((group, gi) => (
            <motion.article
              key={group.category}
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: gi * 0.06, ease }}
              className="group relative h-full overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[var(--shadow-card)] transition-[transform,border-color] duration-500 [transition-timing-function:var(--ease-signature)] hover:-translate-y-1 hover:border-[color:var(--line-strong)] sm:p-7"
            >
              {/* Header */}
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
                <span
                  className="font-mono text-[0.65rem] tracking-[0.18em] text-[color:var(--ink-faint)]"
                  aria-hidden="true"
                >
                  {group.index}
                </span>
              </div>

              <p className="mt-4 text-[0.92rem] leading-[1.7] text-[color:var(--ink-muted)]">
                {group.note}
              </p>

              {/* Chips */}
              <ul className="mt-6 flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <li
                    key={skill.name}
                    className="rounded-full border border-[color:var(--line)] bg-[color:var(--bg-elev)] px-3 py-1.5 text-[0.82rem] text-[color:var(--ink)] transition-colors duration-300"
                    style={{ ['--chip-accent' as string]: group.color } as React.CSSProperties}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = `${group.color}55`
                      el.style.color = group.color
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLElement
                      el.style.borderColor = ''
                      el.style.color = ''
                    }}
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>

              {/* Accent rule */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-700 [transition-timing-function:var(--ease-signature)] group-hover:scale-x-100"
                style={{ background: `linear-gradient(90deg, transparent, ${group.color}, transparent)` }}
              />
            </motion.article>
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-10 max-w-2xl text-[0.85rem] leading-[1.65] text-[color:var(--ink-faint)]">
          Levels intentionally not shown — proficiency lives in the code, not in a self-rated bar
          chart.
        </p>
      </Container>
    </Section>
  )
}
