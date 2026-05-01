import { motion, useReducedMotion } from 'framer-motion'
import { processSteps } from '../data/process'
import { Container, Section, SectionHeader } from '../components/ui'

const ease = [0.16, 1, 0.3, 1] as const

/* -------------------------------------------------------------------------- *
 *  PROCESS — five-step engagement rhythm, redesigned as an editorial          *
 *  timeline rather than a stack of identical cards.                           *
 *                                                                             *
 *  Composition:                                                               *
 *   - A single vertical rail runs the full timeline (hairline gradient).      *
 *   - Each step is a *staggered* asymmetric card: the index+title sit on a   *
 *     dedicated left-rail column, the body fans out into a wider right       *
 *     column. The artifacts row reads as a chip strip.                       *
 *   - Hover: a thin accent line draws across the bottom of the active card,  *
 *     and the index node lifts subtly. No Framer per-step — CSS-only,        *
 *     pauses on `prefers-reduced-motion`.                                    *
 *                                                                             *
 *  Why no horizontal scroll: horizontal carousels test poorly with keyboard   *
 *  + screen-reader users. A vertical rail keeps the document order natural   *
 *  and the layout responsive without bespoke gesture handling.               *
 * -------------------------------------------------------------------------- */

export default function Process() {
  const reduceMotion = useReducedMotion()

  return (
    <Section id="process" aria-labelledby="process-heading">
      <Container>
        <SectionHeader
          index="04"
          eyebrow="How I work"
          accent="violet"
          id="process-heading"
          title={
            <>
              Spec to ship,{' '}
              <span className="serif-italic text-[color:var(--violet)]">in five moves</span>{' '}
              <span className="gradient-text">— no surprises.</span>
            </>
          }
          description="A five-step rhythm I run on every engagement. It's how I ship on time, with zero post-launch crashes, and leave behind a codebase the next engineer can read — without a Slack thread or a hand-off call."
        />

        <div className="relative">
          {/* Single rail down the entire timeline, fading at top + bottom. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 left-[22px] w-px bg-[linear-gradient(to_bottom,transparent,var(--line-strong)_6%,var(--line-strong)_94%,transparent)] sm:left-[28px]"
          />

          <ol className="space-y-10 sm:space-y-14">
            {processSteps.map((step, i) => {
              const isOdd = i % 2 === 1
              return (
                <motion.li
                  key={step.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.7, delay: i * 0.04, ease }}
                  className="relative grid grid-cols-[44px_1fr] items-start gap-5 sm:grid-cols-[60px_1fr] sm:gap-7"
                >
                  {/* Index node — sits *on* the rail, with a soft halo that
                      brightens on hover via the parent group. */}
                  <div className="group/node relative flex justify-center pt-1">
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 place-items-center rounded-full border bg-[color:var(--bg)] font-mono text-[0.75rem] font-medium transition-[transform,box-shadow] duration-700 [transition-timing-function:var(--ease-signature)] sm:h-12 sm:w-12 sm:text-[0.78rem]"
                      style={{
                        borderColor: `color-mix(in srgb, ${step.accent} 33%, transparent)`,
                        color: step.accent,
                        boxShadow: `0 0 0 4px var(--bg), 0 0 24px color-mix(in srgb, ${step.accent} 20%, transparent)`,
                      }}
                    >
                      {step.index}
                    </span>
                  </div>

                  {/* Step body — asymmetric grid that breaks the "stack of
                      cards" feel. Title sits in a left band; body + chips
                      span the rest. On mobile this collapses to one column. */}
                  <article
                    className={`group relative overflow-hidden rounded-3xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6 transition-[border-color,transform] duration-500 [transition-timing-function:var(--ease-signature)] hover:-translate-y-0.5 hover:border-[color:var(--line-strong)] sm:p-8 ${
                      isOdd ? 'md:ml-12 lg:ml-20' : ''
                    }`}
                  >
                    {/* Top-left tinted corner — accent-color glow that gives
                        each step its own visual identity without changing
                        layout. Pure CSS, GPU-cheap. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -top-24 -left-16 h-44 w-44 rounded-full opacity-0 blur-3xl transition-opacity duration-700 [transition-timing-function:var(--ease-signature)] group-hover:opacity-100"
                      style={{ background: step.accent }}
                    />

                    <div className="relative grid gap-5 md:grid-cols-12 md:gap-7">
                      {/* Title band */}
                      <div className="md:col-span-4">
                        <span
                          className="font-mono text-[0.7rem] uppercase tracking-[0.16em]"
                          style={{ color: step.accent }}
                        >
                          Step {step.index}
                        </span>
                        <h3 className="mt-2 font-display text-[1.55rem] font-bold leading-[1.08] tracking-[-0.02em] text-[color:var(--ink)] sm:text-[1.75rem]">
                          {step.title}
                          <span aria-hidden="true" className="serif-italic text-[color:var(--ink-muted)]">
                            .
                          </span>
                        </h3>
                      </div>

                      {/* Body band */}
                      <div className="md:col-span-8">
                        <p className="text-[0.98rem] leading-[1.82] text-[color:var(--ink-muted)] sm:text-[1.02rem] sm:leading-[1.85]">
                          {step.body}
                        </p>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {step.artifacts.map(a => (
                            <li
                              key={a}
                              className="rounded-full border bg-[color:var(--bg-elev)] px-3 py-1 font-mono text-[0.7rem] transition-[border-color,transform] duration-300 hover:-translate-y-0.5"
                              style={{
                                borderColor: `color-mix(in srgb, ${step.accent} 20%, transparent)`,
                                color: step.accent,
                              }}
                            >
                              {a}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Hover rule — the signature. Draws in left-to-right. */}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-700 [transition-timing-function:var(--ease-signature)] group-hover:scale-x-100"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${step.accent}, transparent)`,
                      }}
                    />
                  </article>
                </motion.li>
              )
            })}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
