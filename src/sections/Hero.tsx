import { lazy, Suspense, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Mail, Download, ArrowDown } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons'
import LocalTime from '../components/LocalTime'
import Marquee from '../components/Marquee'
import { Container } from '../components/ui'

/*  HeroAmbient bundles three.js (~200 kB gzipped). It is *not* required for
 *  hero rendering — the CSS gradient layer underneath looks complete on its
 *  own. We lazy-load the shader after first paint and only mount it when:
 *   1. viewport is >= md (desktop / tablet), and
 *   2. user has not requested reduced motion.                              */
const HeroAmbient = lazy(() => import('../components/HeroAmbient'))

const ease = [0.16, 1, 0.3, 1] as const

const stats = [
  { value: '0', label: 'Post-launch crashes' },
  { value: '50K+', label: 'Users in production' },
  { value: '↓ 35%', label: 'Cold-start time' },
  { value: '6', label: 'Open-sourced apps' },
]

const socials = [
  { href: 'https://github.com/aashir-athar',          icon: <GithubIcon size={16} />, label: 'GitHub' },
  { href: 'https://linkedin.com/in/aashirathar',      icon: <LinkedinIcon size={16} />, label: 'LinkedIn' },
  { href: 'mailto:aashirathar@gmail.com',             icon: <Mail size={16} />,        label: 'Email' },
]

const marqueeItems = [
  'React Native', 'Expo SDK 54', 'TypeScript', 'Reanimated 4',
  'Firebase', 'Supabase', 'Clerk Auth', 'Node · Express',
  'MongoDB', 'Fastlane CI/CD', 'GitHub Actions', 'Figma',
]

/* Heuristic gate for the shader — we want it on big screens with capable
 * GPUs and motion-allowed users. We probe matchMedia at mount only; this
 * does not re-evaluate on resize because hero state is settled by then. */
function useShaderEligible(): boolean {
  const reduceMotion = useReducedMotion()
  const [eligible, setEligible] = useState(false)
  useEffect(() => {
    if (reduceMotion) {
      setEligible(false)
      return
    }
    if (typeof window === 'undefined' || !window.matchMedia) return
    const mq = window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)')
    setEligible(mq.matches)
  }, [reduceMotion])
  return eligible
}

export default function Hero() {
  const handleScrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const shaderOn = useShaderEligible()

  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative isolate flex min-h-[100dvh] items-center overflow-hidden pt-24 pb-12 sm:pt-28 md:pt-32 md:pb-20"
    >
      {/* ---- Layer 0: CSS atmosphere — always painted, LCP-safe.
             Glow opacities are CSS variables (`--hero-glow-cyan` /
             `--hero-glow-violet`) so dark theme keeps its rich tints
             while light theme falls back to a far subtler wash. The
             WebGL shader sits on top via mix-blend, never *replacing*
             the CSS layer. ---- */}
      <div
        aria-hidden="true"
        className="ambient-glow top-[-220px] left-1/2 h-[720px] w-[720px] -translate-x-1/2"
        style={{
          background:
            'radial-gradient(circle, var(--hero-glow-cyan), transparent 65%)',
        }}
      />
      <div
        aria-hidden="true"
        className="ambient-glow bottom-[-180px] right-[-120px] hidden h-[520px] w-[520px] md:block"
        style={{
          background:
            'radial-gradient(circle, var(--hero-glow-violet), transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="grid-bg pointer-events-none absolute inset-0 z-0 opacity-[0.18] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]"
      />

      {/* ---- Layer 1: WebGL shader (lazy, eligible-only, dark-theme-only).
             Sits between the CSS layer and the content. The .hero-shader-
             layer class lets the [data-theme="light"] CSS rule hide it
             entirely on light theme, where its dark-calibrated cyan/violet
             flow adds nothing useful. ---- */}
      {shaderOn && (
        <Suspense fallback={null}>
          <div
            className="hero-shader-layer pointer-events-none absolute inset-0 z-0 opacity-70 mix-blend-screen [mask-image:radial-gradient(ellipse_at_center,#000_55%,transparent_85%)]"
            aria-hidden="true"
          >
            <HeroAmbient />
          </div>
        </Suspense>
      )}

      <Container className="relative z-[1]">
        {/* Top meta — local time + availability. Same as before, polished. */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-[color:var(--line)] pb-5 sm:mb-12"
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

        {/* ---- Hero lockup. Single editorial axis — no sidebar, no phone.
                The H1 + lede are the focal point. Everything below is the
                proof tape. -------------------------------------------- */}
        <div className="relative mx-auto max-w-[1100px]">
          {/* Eyebrow */}
          <p className="font-mono text-[0.72rem] tracking-[0.18em] text-[color:var(--ink-faint)] uppercase">
            <span aria-hidden="true" className="text-[color:var(--cyan)]">[</span> Senior React
            Native engineer · est. 2022{' '}
            <span aria-hidden="true" className="text-[color:var(--cyan)]">]</span>
          </p>

          {/* Editorial mega-name. Char-by-char kerning reveal — each
              character lifts and settles its own letter-spacing as it
              lands. We split the wordmark client-side so the H1 in the DOM
              is still semantically "Aashir Athar." for SEO + screen
              readers; the visual chars are decorative spans. */}
          <h1
            aria-label="Aashir Athar"
            className="hero-name mt-6 font-display font-bold leading-[0.96] tracking-[-0.045em] text-[color:var(--ink)]"
          >
            <span aria-hidden="true">
              {'Aashir '.split('').map((c, i) => (
                <span
                  key={`a-${i}`}
                  className="char"
                  style={{ animationDelay: `${0.06 * i}s` }}
                >
                  {c}
                </span>
              ))}
              <span className="gradient-text">
                {'Athar'.split('').map((c, i) => (
                  <span
                    key={`b-${i}`}
                    className="char"
                    style={{ animationDelay: `${0.06 * (7 + i)}s` }}
                  >
                    {c}
                  </span>
                ))}
                <span
                  className="char serif-italic"
                  style={{ animationDelay: `${0.06 * 12}s` }}
                >
                  .
                </span>
              </span>
            </span>
          </h1>

          {/* Lede — the actual promise. Half-width on desktop, full on mobile. */}
          <p className="text-reveal text-reveal-block text-reveal-delay-3 mt-8 max-w-[42rem] text-[1.06rem] leading-[1.78] text-[color:var(--ink-muted)] sm:text-[1.18rem] sm:leading-[1.82]">
            <span>
              I architect and ship cross-platform mobile apps that hold up{' '}
              <span className="serif-italic text-[color:var(--ink)]">six months after launch</span>
              {' '}— not just on demo day. Production React Native trusted by{' '}
              <strong className="text-[color:var(--ink)]">50,000+ users</strong>, with{' '}
              <strong className="text-[color:var(--ink)]">zero post-launch crashes</strong>{' '}
              and <strong className="text-[color:var(--ink)]">35% faster cold starts</strong>{' '}
              across the apps I've led.
            </span>
          </p>

          {/* Primary + secondary CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.55, ease }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              onClick={handleScrollTo('projects')}
              className="btn-primary group"
            >
              Read case studies
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

          {/* Risk-reversal microcopy */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.7, ease }}
            className="mt-5 pt-8 font-mono text-[0.72rem] tracking-[0.06em] text-[color:var(--ink-faint)]"
          >
            Replies within 24h · Remote-friendly · Lahore + US time overlap
          </motion.p>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.85, ease }}
            className="mt-7 flex items-center gap-3"
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
                    className="grid h-11 w-11 place-items-center rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)]/80 text-[color:var(--ink-muted)] backdrop-blur-md transition-colors hover:border-[color:var(--cyan)] hover:text-[color:var(--cyan)]"
                  >
                    {s.icon}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* ---- Tech ticker — recency signal, not a tech list ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6, ease }}
          className="mt-14 border-y border-[color:var(--line)] py-4 sm:mt-16"
          aria-label="Currently shipping with"
        >
          <div className="flex items-center gap-4">
            <span className="hidden flex-shrink-0 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[color:var(--ink-faint)] sm:inline">
              Currently shipping with
              <span aria-hidden="true" className="ml-3 inline-block h-px w-6 align-middle bg-[color:var(--line-strong)]" />
            </span>
            <div className="min-w-0 flex-1">
              <Marquee items={marqueeItems} speed={42} ariaLabel="Tech stack" />
            </div>
          </div>
        </motion.div>

        {/* ---- Stats — proof tape. Loss-aversion lead (0 crashes first). ---- */}
        <motion.dl
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease }}
          className="mt-9 grid grid-cols-2 gap-x-6 gap-y-7 sm:mt-11 sm:grid-cols-4 sm:gap-8"
        >
          {stats.map((s, i) => (
            <div key={s.label} className="flex flex-col">
              <span
                aria-hidden="true"
                className="mb-3 h-px w-8 origin-left animate-[draw-line_0.9s_var(--ease-signature)_both]"
                style={{
                  animationDelay: `${0.8 + i * 0.08}s`,
                  background:
                    'linear-gradient(90deg, var(--gold), transparent)',
                }}
              />
              <dt className="order-2 mt-2 text-[0.78rem] text-[color:var(--ink-faint)]">
                {s.label}
              </dt>
              {/* Stat value renders in --gold. Color psychology: yellow/gold
                  carries achievement + attention. These numbers are the
                  most credibility-loaded thing on the page — gold makes
                  them lock the reader's eye instantly. */}
              <dd
                className="order-1 font-display text-[2rem] font-bold leading-none tracking-[-0.03em] sm:text-[2.5rem]"
                style={{ color: 'var(--gold)' }}
              >
                {s.value}
              </dd>
            </div>
          ))}
        </motion.dl>

        {/* Scroll cue — gentle, single-axis, signals "more below." */}
        <motion.a
          href="#about"
          onClick={handleScrollTo('about')}
          aria-label="Scroll to about section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.4, ease }}
          className="group mt-14 inline-flex items-center gap-2 font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[color:var(--ink-faint)] sm:mt-16"
        >
          <span>Scroll</span>
          <span
            aria-hidden="true"
            className="grid h-7 w-7 place-items-center rounded-full border border-[color:var(--line-strong)] transition-colors group-hover:border-[color:var(--cyan)] group-hover:text-[color:var(--cyan)]"
          >
            <ArrowDown size={12} className="animate-[float_2.4s_ease-in-out_infinite]" />
          </span>
        </motion.a>
      </Container>
    </section>
  )
}
