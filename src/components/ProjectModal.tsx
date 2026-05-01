import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { X, ExternalLink, ArrowUpRight, Sparkles, CheckCircle2 } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { Project } from '../types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

/* -------------------------------------------------------------------------- *
 *  PROJECT CASE STUDY — full-screen editorial spread.                         *
 *                                                                             *
 *  RENDERED VIA PORTAL.                                                       *
 *  ProjectModal is invoked from inside <Projects />, which lives inside a    *
 *  <div className="cv-auto"> wrapper for off-screen paint skipping. That    *
 *  wrapper applies `content-visibility: auto`, which implies `contain:      *
 *  paint`. `contain: paint` establishes a NEW containing block for          *
 *  `position: fixed` descendants — meaning a fixed modal would anchor to    *
 *  the wrapper, not the viewport. Symptom: modal appears mid-page with     *
 *  empty space above and content below the fold.                            *
 *                                                                             *
 *  Solution: `createPortal(..., document.body)` renders the modal directly   *
 *  into <body>, escaping every ancestor's containing block. The fixed        *
 *  positioning is now relative to the viewport, as intended.                *
 *                                                                             *
 *  Layout architecture:                                                      *
 *   - Outer overlay  : fixed inset, items-start (anchored to top of         *
 *     viewport with a small breathing margin). Reading content reads        *
 *     better top-down than centered.                                         *
 *   - Panel          : capped at calc(100dvh - outer-padding), so it never  *
 *     exceeds the viewport. Internal scroll handles content longer than    *
 *     the panel.                                                             *
 *   - Close button   : `absolute` to the panel — stays anchored regardless  *
 *     of scroll position inside the modal body.                              *
 * -------------------------------------------------------------------------- */

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const reduceMotion = useReducedMotion()

  /* Body scroll lock + Esc-to-close. */
  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  /* SSR / pre-mount safety: createPortal needs a target. During SSR or the
   * very first render before <body> exists in some test envs, fall back to
   * inline render. In a normal browser this branch is never taken. */
  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          key="case-study"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
          onClick={onClose}
          /* Anchor to the TOP of the viewport with a small breathing margin.
             Why not items-center: tall reading content (case study with
             header + stats + description + capabilities) is hard to scan
             when centered — half the modal lands below the fold and the
             empty space above feels arbitrary. Reading content belongs at
             the top of the eye's path, with scroll-inside for the rest. */
          className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto p-3 backdrop-blur-2xl sm:p-5 md:p-6"
          style={{ background: 'var(--modal-backdrop)' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          {/* ===== Panel — anchored at top, grows up to (viewport - padding).
                   Total padding is `p-3` (24px) at xs, `p-5` (40px) at sm,
                   `p-6` (48px) at md, so max-h subtracts that to never
                   exceed the viewport. */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={e => e.stopPropagation()}
            className="relative flex max-h-[calc(100dvh-1.5rem)] w-full flex-col overflow-hidden rounded-2xl bg-[color:var(--bg-elev)] sm:max-h-[calc(100dvh-2.5rem)] sm:max-w-[960px] sm:rounded-3xl md:max-h-[calc(100dvh-3rem)]"
            style={{
              border: `1px solid ${project.accent}33`,
              boxShadow: `0 60px 140px rgba(0,0,0,0.6), 0 0 0 1px ${project.accent}1f`,
            }}
          >
            {/* Top accent rule — sits in the frame, above the scroll body. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 z-10 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${project.accent}, var(--violet), transparent)`,
              }}
            />

            {/* Floating close button — absolute to the panel, fixed in place
                regardless of scroll position. Stays clear of the title. */}
            <motion.button
              type="button"
              autoFocus
              whileHover={{ scale: 1.06, rotate: 90 }}
              whileTap={{ scale: 0.94 }}
              onClick={onClose}
              data-cursor="target"
              aria-label="Close case study"
              className="absolute right-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full border border-[color:var(--line-strong)] bg-[color:var(--surface)]/85 text-[color:var(--ink-muted)] backdrop-blur-md transition-colors hover:text-[color:var(--ink)] sm:right-5 sm:top-5"
            >
              <X size={16} aria-hidden="true" />
            </motion.button>

            {/* ===== Scroll body — the only overflow surface.                */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* HEADER — full-width, accent-tinted. `pt-14` reserves room
                  for the absolute-positioned close button without pushing
                  body content too far down on short viewports. */}
              <header
                className="relative px-5 pt-14 pb-8 sm:px-10 sm:pt-16 sm:pb-10 md:px-12"
                style={{
                  background: `radial-gradient(ellipse at top right, ${project.accentGlow} 0%, transparent 65%)`,
                }}
              >
                {/* Mega ghost mark — pushed back so it doesn't fight the
                    title for attention. Lives behind everything. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-4 select-none font-display text-[6.5rem] font-bold leading-[0.85] tracking-[-0.05em] opacity-[0.05] sm:right-8 sm:top-8 sm:text-[10rem]"
                  style={{ color: project.accent }}
                >
                  {project.name.slice(0, 2).toUpperCase()}
                </div>

                {/* Category pill */}
                <span
                  className="relative inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.7rem] tracking-[0.05em]"
                  style={{
                    background: project.accentGlow,
                    borderColor: `${project.accent}55`,
                    color: project.accent,
                  }}
                >
                  <Sparkles size={11} aria-hidden="true" /> {project.category}
                </span>

                {/* Project name */}
                <h2
                  id="case-study-title"
                  className="relative mt-4 max-w-[36rem] font-display font-bold leading-[1.02] tracking-[-0.03em] text-[color:var(--ink)]"
                  style={{ fontSize: 'clamp(1.6rem, 4.8vw, 2.8rem)' }}
                >
                  {project.name}
                  <span aria-hidden="true" className="serif-italic text-[color:var(--ink-muted)]">.</span>
                </h2>

                {/* Tagline */}
                <p
                  className="relative mt-3 max-w-[42rem] font-display text-[0.98rem] leading-[1.5] text-[color:var(--ink)] sm:text-[1.1rem]"
                  style={{ letterSpacing: '-0.012em' }}
                >
                  {project.tagline}
                </p>
              </header>

              {/* STATS BAND — compact band so the description appears
                  above the fold on most viewports. */}
              <div
                className="grid grid-cols-2 gap-px border-y border-[color:var(--line)] bg-[color:var(--line)] sm:grid-cols-4"
                role="list"
                aria-label="Project highlights"
              >
                {project.highlights.map(h => (
                  <div
                    key={h.label}
                    role="listitem"
                    className="flex flex-col bg-[color:var(--bg-elev)] p-4 sm:p-5"
                  >
                    <span
                      aria-hidden="true"
                      className="mb-2 h-px w-6 origin-left"
                      style={{ background: project.accent }}
                    />
                    <div
                      className="font-display text-[1.25rem] font-bold leading-tight tracking-[-0.02em] sm:text-[1.45rem]"
                      style={{ color: project.accent }}
                    >
                      {h.value}
                    </div>
                    <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-[color:var(--ink-faint)]">
                      {h.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* BODY — single column on mobile/tablet, 7/5 split on lg+. */}
              <div className="grid gap-8 p-5 sm:grid-cols-12 sm:gap-8 sm:p-8 md:p-10 lg:gap-10 lg:p-12">
                {/* Description column */}
                <div className="sm:col-span-12 lg:col-span-7">
                  <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[color:var(--ink-faint)]">
                    <span className="text-[color:var(--cyan)]">[</span> Overview <span className="text-[color:var(--cyan)]">]</span>
                  </p>
                  <p className="mt-4 text-[0.98rem] leading-[1.85] text-[color:var(--ink-muted)] sm:text-[1.02rem]">
                    {project.description}
                  </p>

                  <div className="mt-10">
                    <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[color:var(--ink-faint)]">
                      <span className="text-[color:var(--cyan)]">[</span> Capabilities <span className="text-[color:var(--cyan)]">]</span>
                    </p>
                    <ul className="mt-5 space-y-4">
                      {project.features.map((f, i) => (
                        <motion.li
                          key={i}
                          initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                          className="flex items-start gap-3 text-[0.94rem] leading-[1.78] text-[color:var(--ink-muted)] sm:text-[0.98rem]"
                        >
                          <CheckCircle2
                            size={16}
                            aria-hidden="true"
                            className="mt-1 flex-shrink-0"
                            style={{ color: project.accent }}
                          />
                          <span>{f}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Stack column */}
                <aside className="sm:col-span-12 lg:col-span-5">
                  <div className="lg:sticky lg:top-6">
                    <p className="font-mono text-[0.66rem] uppercase tracking-[0.18em] text-[color:var(--ink-faint)]">
                      <span className="text-[color:var(--cyan)]">[</span> Stack <span className="text-[color:var(--cyan)]">]</span>
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span
                          key={t}
                          className="rounded-md border bg-[color:var(--surface)] px-3 py-1.5 font-mono text-[0.74rem]"
                          style={{
                            borderColor: `${project.accent}33`,
                            color: project.accent,
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Repo link card */}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="target"
                      className="group mt-7 flex items-center justify-between rounded-2xl border bg-[color:var(--surface)] p-5 transition-[border-color,transform] duration-500 [transition-timing-function:var(--ease-signature)] hover:-translate-y-0.5"
                      style={{ borderColor: `${project.accent}33` }}
                    >
                      <span className="flex min-w-0 flex-1 items-center gap-3.5">
                        <span
                          className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg"
                          style={{ background: `linear-gradient(135deg, ${project.accent}, ${project.accent}88)` }}
                        >
                          <GithubIcon size={16} />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-display text-[0.92rem] font-semibold text-[color:var(--ink)]">
                            View source
                          </span>
                          <span className="block truncate font-mono text-[0.7rem] text-[color:var(--ink-faint)]">
                            {project.github.replace('https://', '')}
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight
                        size={16}
                        aria-hidden="true"
                        className="flex-shrink-0 text-[color:var(--ink-muted)] transition-transform duration-500 [transition-timing-function:var(--ease-signature)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>

                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="target"
                        className="group mt-3 flex items-center justify-between rounded-2xl border bg-[color:var(--surface)] p-5 transition-[border-color,transform] duration-500 [transition-timing-function:var(--ease-signature)] hover:-translate-y-0.5"
                        style={{ borderColor: `${project.accent}33` }}
                      >
                        <span className="flex min-w-0 flex-1 items-center gap-3.5">
                          <span
                            className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-lg"
                            style={{ background: project.accent }}
                          >
                            <ExternalLink size={16} className="text-[color:var(--bg)]" aria-hidden="true" />
                          </span>
                          <span className="min-w-0">
                            <span className="block font-display text-[0.92rem] font-semibold text-[color:var(--ink)]">
                              {project.demo.includes('npmjs.com') ? 'View on npm' : 'Live demo'}
                            </span>
                            <span className="block truncate font-mono text-[0.7rem] text-[color:var(--ink-faint)]">
                              {project.demo.replace('https://', '')}
                            </span>
                          </span>
                        </span>
                        <ArrowUpRight
                          size={16}
                          aria-hidden="true"
                          className="flex-shrink-0 text-[color:var(--ink-muted)] transition-transform duration-500 [transition-timing-function:var(--ease-signature)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        />
                      </a>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
