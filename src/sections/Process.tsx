import { motion } from 'framer-motion'
import { processSteps } from '../data/process'
import { Container, Section, SectionHeader } from '../components/ui'

export default function Process() {
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
              From spec to ship —{' '}
              <span className="serif-italic text-[color:var(--violet)]">no surprises</span>{' '}
              <span className="gradient-text">in the middle.</span>
            </>
          }
          description="A five-step rhythm I run on every engagement. It's how four mobile apps shipped on time, with zero post-launch crashes, and a codebase the next engineer can read without a Slack thread or a hand-off call."
        />

        <div className="relative">
          {/* Vertical rule */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 left-[18px] w-px bg-[linear-gradient(to_bottom,transparent,var(--line-strong)_8%,var(--line-strong)_92%,transparent)] sm:left-[22px]"
          />

          <ol className="space-y-8 sm:space-y-10">
            {processSteps.map((step, i) => (
              <motion.li
                key={step.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid grid-cols-[44px_1fr] items-start gap-5 sm:grid-cols-[60px_1fr] sm:gap-7"
              >
                {/* Index node */}
                <div className="relative flex justify-center pt-1">
                  <span
                    aria-hidden="true"
                    className="grid h-9 w-9 place-items-center rounded-full border bg-[color:var(--bg)] font-mono text-[0.72rem] sm:h-11 sm:w-11 sm:text-[0.78rem]"
                    style={{
                      borderColor: `${step.accent}55`,
                      color: step.accent,
                      boxShadow: `0 0 0 4px var(--bg), 0 0 18px ${step.accent}33`,
                    }}
                  >
                    {step.index}
                  </span>
                </div>

                {/* Body */}
                <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-5 transition-colors duration-300 hover:border-[color:var(--line-strong)] sm:p-6 md:p-7">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-display text-xl font-bold tracking-[-0.015em] text-[color:var(--ink)] sm:text-[1.4rem]">
                      {step.title}
                    </h3>
                    <span
                      className="font-mono text-[0.7rem] uppercase tracking-[0.16em]"
                      style={{ color: step.accent }}
                    >
                      Step {step.index}
                    </span>
                  </div>

                  <p className="mt-4 max-w-2xl text-[0.97rem] leading-[1.82] text-[color:var(--ink-muted)] sm:text-[1.02rem] sm:leading-[1.85]">
                    {step.body}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-2">
                    {step.artifacts.map(a => (
                      <li
                        key={a}
                        className="rounded-full border bg-[color:var(--bg-elev)] px-3 py-1 font-mono text-[0.7rem]"
                        style={{
                          borderColor: `${step.accent}33`,
                          color: step.accent,
                        }}
                      >
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
