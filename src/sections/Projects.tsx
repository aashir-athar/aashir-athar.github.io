import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react'
import { GithubIcon } from '../components/SocialIcons'
import { projects } from '../data/projects'
import ProjectModal from '../components/ProjectModal'
import type { Project } from '../types'
import { Container, Section, SectionHeader } from '../components/ui'

const ease = [0.16, 1, 0.3, 1] as const

/* -------------------------------------------------------------------------- *
 *  PROJECTS — six open-source artifacts, each a real shipped thing.          *
 *                                                                            *
 *  Card design rationale:                                                    *
 *   - Header is a *full-bleed* tinted plate with the project monogram and    *
 *     a scribble-style number watermark. Hover lifts the plate and pushes    *
 *     the scribble forward — gives the grid kinetic rhythm without anyone    *
 *     having to interact.                                                    *
 *   - Artifact badge ("OPEN SOURCE", "PUBLISHED", "PRIVACY-FIRST") sits      *
 *     top-left. Specificity-as-credibility — each badge is *true* of the     *
 *     project, not branding.                                                 *
 *   - Highlights row is a 4-up metric strip. Numbers carry the weight, not   *
 *     copy. Each highlight is GPU-only on hover (transform-only).            *
 *                                                                            *
 *  All animation respects `prefers-reduced-motion`. The IO entry is the      *
 *  only Framer in the card; everything else is CSS-driven for predictability *
 *  and zero per-card render cost on a long grid.                             *
 * -------------------------------------------------------------------------- */

/* Artifact taxonomy — keyed by project.id so we can render a real badge
 * specific to what the artifact actually is. */
const artifacts: Record<string, { label: string; tone: 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose' | 'pink' }> = {
  'mindees-ai':      { label: 'IN DEVELOPMENT',  tone: 'amber' },
  'forest-sentry':   { label: 'WWF PAKISTAN',    tone: 'emerald' },
  xmind:             { label: 'OPEN SOURCE',     tone: 'cyan' },
  flowmoney:         { label: 'PRIVACY-FIRST',   tone: 'violet' },
  'expo-sms-reader': { label: 'PUBLISHED ON NPM', tone: 'amber' },
  bludstack:         { label: 'CIVIC IMPACT',    tone: 'rose' },
  'crypto-tracker':  { label: 'REAL-TIME',       tone: 'amber' },
  fuelio:            { label: '100% OFFLINE',    tone: 'amber' },
}

function ProjectCard({
  project,
  index,
  onOpen,
  reduceMotion,
}: {
  project: Project
  index: number
  onOpen: () => void
  reduceMotion: boolean
}) {
  const number = String(index + 1).padStart(2, '0')
  const artifact = artifacts[project.id]

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.06, ease }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      data-cursor="target"
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-[color:var(--line)] bg-[color:var(--surface)] shadow-[var(--shadow-card)] transition-[transform,border-color,box-shadow] duration-500 [transition-timing-function:var(--ease-signature)] hover:-translate-y-2 hover:border-[color:var(--line-strong)] hover:shadow-[var(--shadow-elev)] focus-visible:-translate-y-2 focus-visible:border-[color:var(--cyan)]"
      style={{ ['--accent' as string]: project.accent } as React.CSSProperties}
      aria-label={`${project.name} — open case study`}
    >
      {/* ---- Visual header plate ---- */}
      <div
        className="relative h-56 overflow-hidden sm:h-60"
        style={{
          background: `linear-gradient(155deg, ${project.accentGlow} 0%, var(--bg-elev) 100%)`,
        }}
      >
        {/* Top accent rule — full hairline */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          }}
        />

        {/* Mega ghost number — pushes forward on hover. */}
        <div
          aria-hidden="true"
          className="absolute right-4 bottom-0 select-none font-display text-[8rem] font-bold leading-[0.85] tracking-[-0.05em] opacity-[0.07] transition-[transform,opacity] duration-700 [transition-timing-function:var(--ease-signature)] group-hover:translate-y-[-4px] group-hover:opacity-[0.12] sm:text-[10rem]"
          style={{ color: project.accent }}
        >
          {number}
        </div>

        {/* Soft glow disc — one halo, GPU-only blur, scales on hover. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl transition-transform duration-1000 [transition-timing-function:var(--ease-signature)] group-hover:scale-110"
          style={{ background: project.accent + '40' }}
        />

        {/* Logo monogram */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="grid h-20 w-20 place-items-center rounded-2xl border-2 font-display text-[1.85rem] font-bold text-white shadow-[0_18px_44px_rgba(0,0,0,0.30)] transition-transform duration-700 [transition-timing-function:var(--ease-signature)] group-hover:scale-[1.06] group-hover:rotate-[-2deg] sm:h-24 sm:w-24"
            style={{
              background: `linear-gradient(135deg, ${project.accent}, ${project.accent}aa)`,
              borderColor: `${project.accent}55`,
            }}
          >
            {project.name[0]}
          </div>
        </div>

        {/* Top-left: index + artifact badge stack */}
        <div className="absolute top-4 left-4 flex flex-col gap-1.5">
          <span
            className="font-mono text-[0.7rem] tracking-[0.18em] text-[color:var(--ink-faint)]"
            aria-hidden="true"
          >
            PROJECT / {number}
          </span>
          {artifact && (
            <span
              className="project-pill inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[0.62rem] tracking-[0.12em] backdrop-blur-md"
              style={{ ['--pill-accent' as string]: project.accent } as React.CSSProperties}
            >
              {project.inDevelopment ? (
                <span
                  aria-hidden="true"
                  className="relative inline-flex h-1.5 w-1.5 rounded-full"
                  style={{ background: project.accent, boxShadow: `0 0 8px ${project.accent}` }}
                >
                  <span
                    className="absolute inset-0 animate-pulse-ring rounded-full"
                    style={{ background: project.accent }}
                  />
                </span>
              ) : (
                <Sparkles size={10} aria-hidden="true" />
              )}
              {artifact.label}
            </span>
          )}
        </div>

        {/* Top-right: GitHub jump. Uses theme-aware --card-overlay so the
            button reads as dark glass on dark theme and light glass on
            light theme, sitting on top of the card's accent-glow header. */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          aria-label={`${project.name} on GitHub`}
          className="absolute top-3.5 right-3.5 grid h-9 w-9 place-items-center rounded-lg border border-[color:var(--line)] text-[color:var(--ink-muted)] backdrop-blur-md transition-colors hover:text-[color:var(--ink)]"
          style={{ background: 'var(--card-overlay)' }}
        >
          <GithubIcon size={14} />
        </a>

        {/* Bottom-left: category pill. The `project-pill` class wires the
            pill bg + border + text color to theme-aware CSS rules in
            index.css. The dot stays accent-colored on both themes so
            project identity is intact. */}
        <span
          className="project-pill absolute bottom-3.5 left-4 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.66rem] backdrop-blur-md"
          style={{ ['--pill-accent' as string]: project.accent } as React.CSSProperties}
        >
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full"
            style={{ background: project.accent }}
          />
          {project.category}
        </span>
      </div>

      {/* ---- Body ---- */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-2xl font-bold leading-[1.12] tracking-[-0.02em] text-[color:var(--ink)] sm:text-[1.6rem]">
          {project.name}
          <span aria-hidden="true" className="serif-italic text-[color:var(--ink-muted)]">
            .
          </span>
        </h3>
        <p className="mt-4 text-[0.97rem] leading-[1.78] text-[color:var(--ink-muted)]">
          {project.tagline}
        </p>

        {/* Highlights — 2x2 on mobile, 4-up on desktop. Numbers do the work. */}
        <dl className="mt-5 grid grid-cols-2 gap-3 border-y border-[color:var(--line)] py-4 sm:grid-cols-4 sm:gap-2">
          {project.highlights.map(h => (
            <div key={h.label} className="flex flex-col">
              <dd
                className="font-display text-[0.95rem] font-bold leading-tight"
                style={{ color: project.accent }}
              >
                {h.value}
              </dd>
              <dt className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.10em] text-[color:var(--ink-faint)]">
                {h.label}
              </dt>
            </div>
          ))}
        </dl>

        {/* Tech chips */}
        <div className="mt-5 flex flex-1 flex-wrap items-end gap-1.5">
          {project.tech.slice(0, 6).map(t => (
            <span
              key={t}
              className="rounded-md border border-[color:var(--line)] bg-[color:var(--bg-elev)] px-2 py-0.5 font-mono text-[0.7rem] text-[color:var(--ink-faint)]"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 6 && (
            <span className="rounded-md border border-[color:var(--line)] bg-[color:var(--bg-elev)] px-2 py-0.5 font-mono text-[0.7rem] text-[color:var(--ink-faint)]">
              +{project.tech.length - 6}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-between">
          <span className="link-underline inline-block">
            <span className="inline-flex items-center gap-2 whitespace-nowrap font-semibold">
              Read&nbsp;case&nbsp;study
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </span>
          </span>

          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="link-underline inline-block"
            >
              <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-[0.82rem] text-[color:var(--ink-muted)]">
                <ExternalLink size={13} aria-hidden="true" />
                {project.demo.includes('npmjs.com') ? 'npm' : 'Live'}
              </span>
            </a>
          )}
        </div>
      </div>

      {/* Bottom hover rule — the signature accent draw-in. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-700 [transition-timing-function:var(--ease-signature)] group-hover:scale-x-100"
        style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
      />
    </motion.article>
  )
}

export default function Projects() {
  const [activeModal, setActiveModal] = useState<Project | null>(null)
  const reduceMotion = useReducedMotion() ?? false

  return (
    <Section id="projects" aria-labelledby="projects-heading">
      <Container>
        <SectionHeader
          index="03"
          eyebrow="Selected work"
          accent="emerald"
          id="projects-heading"
          title={
            <>
              Apps in{' '}
              <span className="text-[color:var(--cyan)]">production.</span>{' '}
              <span className="serif-italic text-[color:var(--ink-muted)]">One LLM</span> in flight.
            </>
          }
          description="Seven shipped open-source React Native apps plus a self-training LLM in active development — architected, built, and released end-to-end. Real problems, real constraints, real source on GitHub. Not folder-fillers engineered for screenshots."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.id}
              project={p}
              index={i}
              reduceMotion={reduceMotion}
              onOpen={() => setActiveModal(p)}
            />
          ))}
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, delay: 0.2 }}
          className="mt-14 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <a
            href="https://github.com/aashir-athar"
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline group inline-block items-center gap-2 font-display text-base font-semibold text-[color:var(--ink)]"
          >
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              See&nbsp;all&nbsp;repositories&nbsp;on&nbsp;GitHub
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1"
              />
            </span>
          </a>
        </motion.div>
      </Container>

      <ProjectModal project={activeModal} onClose={() => setActiveModal(null)} />
    </Section>
  )
}
