import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { experience, education, certifications } from '../data/resume'
import { MapPin, GraduationCap, Award } from 'lucide-react'
import { Container, Section, SectionHeader } from '../components/ui'

const ease = [0.16, 1, 0.3, 1] as const

/* Company accents are CSS var refs so they auto-theme across modes. */
const companyColors: Record<string, string> = {
  '3STechLabs': 'var(--cyan)',
  'AppGlide Technologies': 'var(--violet)',
  'TechNova Solutions Inc.': 'var(--emerald)',
  'W3 Technologies': 'var(--amber)',
}

export default function Experience() {
  const { ref, inView } = useInView()

  return (
    <Section id="experience" aria-labelledby="experience-heading">
      <Container>
        <SectionHeader
          index="05"
          eyebrow="Experience"
          accent="cyan"
          id="experience-heading"
          title={
            <>
              Four years —{' '}
              <span className="serif-italic text-[color:var(--cyan)]">architected,</span>{' '}
              <span className="gradient-text">shipped, led.</span>
            </>
          }
          description="Junior to senior in three years, lead in the fourth — production React Native across US and Pakistan teams since 2022. The summary above; the receipts, in chronological order, below."
        />

        <div ref={ref} className="grid gap-12 md:grid-cols-12 md:gap-12 lg:gap-16">
          {/* Timeline */}
          <div className="md:col-span-8">
            <ol className="relative space-y-7 pl-7">
              <span
                aria-hidden="true"
                className="absolute top-2 bottom-2 left-0 w-px bg-[linear-gradient(to_bottom,var(--cyan),var(--violet),transparent)] opacity-50"
              />
              {experience.map((exp, i) => {
                const color = companyColors[exp.company] ?? 'var(--cyan)'
                return (
                  <motion.li
                    key={`${exp.company}-${i}`}
                    initial={{ opacity: 0, x: -16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.08, ease }}
                    className="relative"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -left-[30px] top-3 h-2.5 w-2.5 rounded-full ring-4 ring-[color:var(--bg)]"
                      style={{ background: color, boxShadow: `0 0 12px ${color}` }}
                    />
                    <article className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow-card)] transition-[border-color] duration-300 hover:border-[color:var(--line-strong)] sm:p-6 md:p-7">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-[1.1rem] font-bold tracking-[-0.015em] text-[color:var(--ink)] sm:text-[1.2rem]">
                              {exp.role}
                            </h3>
                            {exp.current && (
                              <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(16,185,129,0.30)] bg-[rgba(16,185,129,0.10)] px-2 py-0.5 text-[0.65rem] font-medium text-[color:var(--emerald)]">
                                <span
                                  aria-hidden="true"
                                  className="h-1 w-1 rounded-full bg-[color:var(--emerald)] shadow-[0_0_6px_var(--emerald)]"
                                />
                                Current
                              </span>
                            )}
                          </div>
                          <div
                            className="mt-1.5 font-display text-[0.95rem] font-medium"
                            style={{ color }}
                          >
                            {exp.company}
                          </div>
                        </div>
                        <div className="flex flex-shrink-0 flex-col items-end text-right">
                          <span className="whitespace-nowrap font-mono text-[0.72rem] tracking-[0.05em] text-[color:var(--ink-faint)]">
                            {exp.period}
                          </span>
                          <span className="mt-0.5 flex items-center gap-1 font-mono text-[0.72rem] text-[color:var(--ink-faint)]">
                            <MapPin size={11} aria-hidden="true" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      <ul className="mt-6 space-y-3.5">
                        {exp.bullets.map((b, bi) => (
                          <li
                            key={bi}
                            className="flex items-start gap-3 text-[0.95rem] leading-[1.8] text-[color:var(--ink-muted)]"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full"
                              style={{ background: color }}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </motion.li>
                )
              })}
            </ol>
          </div>

          {/* Sidebar — education + certs */}
          <aside className="md:col-span-4 space-y-8">
            <div>
              <div className="mb-4 flex items-center gap-2.5">
                <div className="grid h-7 w-7 place-items-center rounded-lg border border-[rgba(167,139,250,0.30)] bg-[color:var(--violet-glow)]">
                  <GraduationCap size={13} className="text-[color:var(--violet)]" />
                </div>
                <h3 className="font-display text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink)]">
                  Education
                </h3>
              </div>
              <div className="space-y-3">
                {education.map((edu, i) => (
                  <motion.article
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                    className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow-card)]"
                  >
                    <div className="font-display text-[0.95rem] font-semibold text-[color:var(--ink)]">
                      {edu.degree}
                    </div>
                    <div className="mt-1 text-[0.85rem] text-[color:var(--violet)]">
                      {edu.institution}
                    </div>
                    <div className="mt-1 font-mono text-[0.72rem] text-[color:var(--ink-faint)]">
                      {edu.period}
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center gap-2.5">
                <div className="grid h-7 w-7 place-items-center rounded-lg border border-[rgba(245,158,11,0.30)] bg-[rgba(245,158,11,0.10)]">
                  <Award size={13} className="text-[color:var(--amber)]" />
                </div>
                <h3 className="font-display text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-[color:var(--ink)]">
                  Certifications
                </h3>
              </div>
              <div className="space-y-3">
                {certifications.map((cert, i) => (
                  <motion.article
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                    className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-5 shadow-[var(--shadow-card)]"
                  >
                    <div className="font-display text-[0.95rem] font-semibold text-[color:var(--ink)]">
                      {cert.name}
                    </div>
                    <div className="mt-1 text-[0.85rem] text-[color:var(--amber)]">{cert.issuer}</div>
                    <div className="mt-1 font-mono text-[0.72rem] text-[color:var(--ink-faint)]">{cert.year}</div>
                  </motion.article>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </Section>
  )
}
