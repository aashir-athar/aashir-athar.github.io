import { motion } from 'framer-motion'
import { ArrowRight, Layers, Gauge, Users, Server } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import { Container, Section, SectionHeader } from '../components/ui'

const ease = [0.16, 1, 0.3, 1] as const

/* Accents are CSS var refs so they auto-theme. Inline alpha-blending uses
 * color-mix() in srgb instead of hex alpha (which CSS-var values can't
 * carry). Keeps the four-color rhythm (cyan/amber/violet/emerald) but
 * each shade is theme-correct. */
const principles = [
  {
    icon: <Layers size={18} aria-hidden="true" />,
    title: 'Architecture-first',
    body: 'Mobile codebases that hold up past their second year. Modular, typed, predictable — the next engineer can read it without a Slack thread.',
    accent: 'var(--cyan)',
  },
  {
    icon: <Gauge size={18} aria-hidden="true" />,
    title: 'Performance is design',
    body: '60fps interactions, 35% faster cold starts, and zero post-launch crashes across the apps I\'ve led. Speed is the feature users feel first.',
    accent: 'var(--amber)',
  },
  {
    icon: <Users size={18} aria-hidden="true" />,
    title: 'Cross-functional lead',
    body: 'Mentored 4 engineers and shipped MVPs in 6–8 weeks by working directly with product and design — not around them.',
    accent: 'var(--violet)',
  },
  {
    icon: <Server size={18} aria-hidden="true" />,
    title: 'Full-stack range',
    body: 'Node, Express, MongoDB, Supabase, Firebase, Clerk Auth. I own the stack when the team needs me to.',
    accent: 'var(--emerald)',
  },
]

const proofStats = [
  { value: '50K+', label: 'Active users served' },
  { value: '0', label: 'Post-launch crashes' },
  { value: '↓ 35%', label: 'Cold-start time' },
  { value: '↓ 90%', label: 'Deployment errors' },
]

export default function About() {
  const { ref, inView } = useInView()

  return (
    <Section id="about" aria-labelledby="about-heading">
      <Container>
        <SectionHeader
          index="01"
          eyebrow="About"
          accent="cyan"
          id="about-heading"
          title={
            <>
              Most mobile apps don't break on day one — they break in{' '}
              <span className="serif-italic text-[color:var(--cyan)]">month six.</span>{' '}
              <span className="gradient-text">That's where I work.</span>
            </>
          }
          description="Senior React Native developer based in Lahore, Pakistan. Four years across US and Pakistan teams — architecture decisions, performance budgets, and release pipelines that decide whether a cross-platform mobile product survives its second quarter."
        />

        <div ref={ref} className="grid gap-12 md:grid-cols-12 md:gap-12 lg:gap-16">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="md:col-span-7 space-y-5 text-[color:var(--ink-muted)]"
          >
            <p className="text-[1.05rem] leading-[1.78] sm:text-[1.14rem] sm:leading-[1.85]">
              Four years. Production React Native apps shipped to{' '}
              <strong className="text-[color:var(--ink)]">50,000+ users</strong> on App Store
              and Google Play — under real load, real reviews, and real 3G in markets you
              don't get to opt out of.
            </p>
            <p className="text-[1.02rem] leading-[1.78] sm:text-[1.08rem] sm:leading-[1.8]">
              My focus is the part of mobile that never makes it into the demo:{' '}
              <span className="serif-italic text-[color:var(--ink)]">architecture decisions
                made on day one, performance budgets enforced before launch, and release
                pipelines that don't break at 2&nbsp;a.m.</span> I've cut cold-start times by{' '}
              <strong className="text-[color:var(--ink)]">35%</strong>, dropped manual
              deployment errors{' '}
              <strong className="text-[color:var(--ink)]">90%</strong> with Fastlane CI/CD,
              and shipped to production with zero post-launch crashes.
            </p>
            <p className="text-[1.02rem] leading-[1.78] sm:text-[1.08rem] sm:leading-[1.8]">
              Outside client work, I open-source the tools I wish I'd had — seven shipping
              projects and counting. A privacy-first Pakistani fintech, an on-device leaf-health
              AI built with WWF Pakistan, a real-time blood-donor matching network, a
              sub-second crypto tracker, an offline-first vehicle ledger, and a published
              Expo native module for parsing banking SMS. Staying sharp means staying shipping.
            </p>
            <p className="text-[1.02rem] leading-[1.78] sm:text-[1.08rem] sm:leading-[1.8]">
              Eighth in flight: <strong className="text-[color:var(--ink)]">Mindees AI</strong> — a
              self-training open-source LLM I'm building in TypeScript with a
              <span className="serif-italic text-[color:var(--ink)]"> DeepSeek-V3-class architecture</span>,
              gradient-descent every five minutes, and zero paid API keys. I'm not a passenger on
              the AI wave — I'm shipping in it.
            </p>
            <p className="text-[1.02rem] leading-[1.78] sm:text-[1.08rem] sm:leading-[1.8]">
              How that ships fast: senior-dev defaults applied to everything I touch — typed
              boundaries, predictable state, performance budgets enforced on{' '}
              <strong className="text-[color:var(--ink)]">2 GB-RAM Android phones</strong>, not
              just an M-series Mac. Paired with an AI workflow that earns its seat:
              custom-trained Claude with my own skills and agents for the code itself, ChatGPT
              for polishing ideas, Grok for grounded research, Nano Banana for icons and
              imagery, Veo for motion, ElevenLabs for voice. The output is a senior engineer's
              throughput at a senior engineer's quality bar — without the hype tax.
            </p>
            <div className="pt-4">
              <a
                href="#contact"
                onClick={e => {
                  e.preventDefault()
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="link-underline group inline-block"
              >
                <span className="inline-flex items-center gap-2 font-display text-base font-semibold text-[color:var(--ink)] sm:text-lg">
                  Start&nbsp;a&nbsp;conversation
                  <ArrowRight
                    size={18}
                    aria-hidden="true"
                    className="transition-transform duration-500 group-hover:translate-x-1"
                  />
                </span>
              </a>
            </div>
          </motion.div>

          {/* Proof stats */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="md:col-span-5"
          >
            <div className="rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-6 shadow-[var(--shadow-card)] sm:p-7">
              <div className="flex items-center justify-between">
                <p className="eyebrow">In production</p>
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-[color:var(--emerald)] shadow-[0_0_10px_var(--emerald)]"
                />
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-7">
                {proofStats.map(s => (
                  <div key={s.label} className="flex flex-col">
                    <dt className="order-2 mt-1.5 text-[0.78rem] text-[color:var(--ink-faint)]">
                      {s.label}
                    </dt>
                    <dd
                      className="order-1 font-display text-[1.85rem] font-bold leading-none tracking-[-0.02em] sm:text-[2rem]"
                      style={{ color: 'var(--gold)' }}
                    >
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 border-t border-[color:var(--line)] pt-5 text-[0.82rem] leading-[1.65] text-[color:var(--ink-faint)]">
                Numbers from production releases — App Store + Google Play, multi-quarter.
              </div>
            </div>
          </motion.div>
        </div>

        {/* Principles */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {principles.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.06, ease }}
              className="group relative h-full overflow-hidden rounded-2xl border border-[color:var(--line)] bg-[color:var(--surface)] p-7 shadow-[var(--shadow-card)] transition-[transform,border-color] duration-500 [transition-timing-function:var(--ease-signature)] hover:-translate-y-1 sm:p-8 gap-3 flex flex-col"
              style={{ ['--accent' as string]: p.accent } as React.CSSProperties}
            >
              {/* Accent rule */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-700 [transition-timing-function:var(--ease-signature)] group-hover:scale-x-100"
                style={{ background: `linear-gradient(90deg, transparent, ${p.accent}, transparent)` }}
              />
              <div
                className="grid h-10 w-10 place-items-center rounded-lg border"
                style={{
                  background: `color-mix(in srgb, ${p.accent} 8%, transparent)`,
                  borderColor: `color-mix(in srgb, ${p.accent} 20%, transparent)`,
                  color: p.accent,
                }}
              >
                {p.icon}
              </div>
              <h3 className="mt-6 font-display text-[1.1rem] font-semibold leading-[1.3] tracking-[-0.012em] text-[color:var(--ink)] sm:text-[1.15rem]">
                {p.title}
              </h3>
              <p className="mt-3.5 text-[0.95rem] leading-[1.78] text-[color:var(--ink-muted)] sm:text-[0.97rem]">
                {p.body}
              </p>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  )
}
