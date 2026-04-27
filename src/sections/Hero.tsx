import { motion } from 'framer-motion'
import { ArrowRight, Mail, Download } from 'lucide-react'
import PhoneMockup from '../components/PhoneMockup'
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons'
import LocalTime from '../components/LocalTime'
import Marquee from '../components/Marquee'
import { Container } from '../components/ui'

const ease = [0.16, 1, 0.3, 1] as const

const stats = [
  { value: '50K+', label: 'Users in production' },
  { value: '4', label: 'Apps shipped' },
  { value: '0', label: 'Post-launch crashes' },
  { value: '↓ 35%', label: 'Cold-start time' },
]

const socials = [
  { href: 'https://github.com/aashir-athar', icon: <GithubIcon size={16} />, label: 'GitHub' },
  { href: 'https://linkedin.com/in/aashirathar', icon: <LinkedinIcon size={16} />, label: 'LinkedIn' },
  { href: 'mailto:aashirathar@gmail.com', icon: <Mail size={16} />, label: 'Email' },
]

const marqueeItems = [
  'React Native', 'Expo SDK 54', 'TypeScript', 'Reanimated 3',
  'Firebase', 'Supabase', 'Clerk Auth', 'Node · Express',
  'MongoDB', 'Fastlane CI/CD', 'GitHub Actions', 'Figma',
]

export default function Hero() {
  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24 pb-10 sm:pt-28 md:pt-32 md:pb-16"
    >
      {/* Background atmosphere */}
      <div
        aria-hidden="true"
        className="ambient-glow top-[-180px] left-1/2 h-[640px] w-[640px] -translate-x-1/2 bg-[radial-gradient(circle,rgba(6,182,212,0.14),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="ambient-glow bottom-[-120px] right-[-80px] hidden h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(139,92,246,0.18),transparent_70%)] md:block"
      />
      <div
        aria-hidden="true"
        className="grid-bg pointer-events-none absolute inset-0 opacity-[0.18] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
      />

      <Container className="relative z-[1]">
        {/* Top thin meta row — local time + status */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--line)] pb-5 sm:mb-10"
        >
          <LocalTime />
          <span className="inline-flex items-center gap-2 font-mono text-[0.72rem] tracking-[0.16em] text-[color:var(--ink-faint)] uppercase">
            <span
              aria-hidden="true"
              className="relative h-1.5 w-1.5 rounded-full bg-[color:var(--emerald)] shadow-[0_0_10px_var(--emerald)] before:absolute before:inset-0 before:animate-pulse-ring before:rounded-full before:bg-[color:var(--emerald)]"
            />
            Available · senior &amp; lead roles
          </span>
        </motion.div>

        {/* Main lockup */}
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-10 lg:gap-16">
          {/* LEFT — content. NOTE: H1 + lede render at full opacity from first
              paint (CSS-driven mask reveal animates transform only) so LCP
              fires immediately. Framer is used only for orchestrated UI bits. */}
          <div className="md:col-span-7">
            {/* Eyebrow — problem-aware hook */}
            <p className="font-mono text-[0.72rem] tracking-[0.18em] text-[color:var(--ink-faint)] uppercase">
              <span aria-hidden="true" className="text-[color:var(--cyan)]">[</span> Senior React
              Native engineer · est. 2022{' '}
              <span aria-hidden="true" className="text-[color:var(--cyan)]">]</span>
            </p>

            {/* Name — editorial mega type. NO opacity-from-0 — LCP-safe.
                leading-[1.02] gives the two lines actual breathing room and
                stops the descender on "Athar." from kissing the line above.
                `text-reveal-block` is the modifier that forces stacking. */}
            <h1
              className="mt-5 font-display font-bold leading-[1.02] tracking-[-0.045em] text-[color:var(--ink)]"
              style={{ fontSize: 'clamp(7.6rem, 9vw, 6.5rem)' }}
            >
              <span className="text-reveal text-reveal-block text-reveal-delay-1">
                Aashir{' '}
                <span className="gradient-text">
                  Athar<span className="serif-italic">.</span>
                </span>
              </span>
            </h1>

            {/* Lede — full opacity from first paint, transforms only via CSS. */}
            <p
              className="text-reveal text-reveal-block text-reveal-delay-3 mt-7 max-w-[38rem] text-[1.04rem] leading-[1.78] text-[color:var(--ink-muted)] sm:text-[1.14rem] sm:leading-[1.82]"
            >
              <span>
                I architect and ship cross-platform mobile apps that hold up at scale.
                Production React Native serving{' '}
                <strong className="text-[color:var(--ink)]">50,000+ users</strong>,{' '}
                <strong className="text-[color:var(--ink)]">zero post-launch crashes</strong>,
                and <strong className="text-[color:var(--ink)]">35% faster cold starts</strong>{' '}
                across the apps I've led.
              </span>
            </p>

            {/* CTAs — risk-reversal in microcopy */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.55, ease }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="#projects" onClick={handleScrollTo('projects')} className="btn-primary group">
                View selected work
                <ArrowRight
                  size={18}
                  aria-hidden="true"
                  className="transition-transform duration-500 [transition-timing-function:var(--ease-signature)] group-hover:translate-x-1"
                />
              </a>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Download size={16} aria-hidden="true" />
                Resume
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.7, ease }}
              className="mt-4 font-mono text-[0.72rem] tracking-[0.06em] text-[color:var(--ink-faint)] pt-6"
            >
              Replies within 24h · Remote-friendly · Lahore + US time overlap
            </motion.p>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.85, ease }}
              className="mt-6 flex items-center gap-3"
            >
              <span className="hidden font-mono text-[0.72rem] uppercase tracking-[0.16em] text-[color:var(--ink-faint)] sm:inline">
                Reach out
              </span>
              <span aria-hidden="true" className="hidden h-px w-8 bg-[color:var(--line-strong)] sm:inline-block" />
              <ul className="flex items-center gap-2">
                {socials.map(s => (
                  <li key={s.label}>
                    <motion.a
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      whileHover={{ y: -2 }}
                      className="grid h-11 w-11 place-items-center rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--ink-muted)] transition-colors hover:border-[color:var(--cyan)] hover:text-[color:var(--cyan)]"
                    >
                      {s.icon}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* RIGHT — phone mockup (decorative) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.3, ease }}
            className="hidden md:col-span-5 md:flex md:justify-center"
          >
            <div className="md:scale-[0.78] lg:scale-[0.95] xl:scale-[1.02]">
              <PhoneMockup />
            </div>
          </motion.div>
        </div>

        {/* Tech marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease }}
          className="mt-10 border-y border-[color:var(--line)] py-4 sm:mt-12"
          aria-label="Tech stack ticker"
        >
          <Marquee items={marqueeItems} speed={42} ariaLabel="Tech stack" />
        </motion.div>

        {/* Stats */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
          className="mt-7 grid grid-cols-2 gap-x-6 gap-y-7 sm:mt-9 sm:grid-cols-4 sm:gap-8"
        >
          {stats.map(s => (
            <div key={s.label} className="flex flex-col">
              <dt className="order-2 mt-2 text-[0.78rem] text-[color:var(--ink-faint)]">
                {s.label}
              </dt>
              <dd className="order-1 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] text-[color:var(--ink)] sm:text-[2.5rem]">
                {s.value}
              </dd>
            </div>
          ))}
        </motion.dl>
      </Container>
    </section>
  )
}
