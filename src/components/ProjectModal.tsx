import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Sparkles } from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { useEffect } from 'react'
import type { Project } from '../types'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
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

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-end justify-center bg-[rgba(6,8,15,0.88)] backdrop-blur-2xl sm:items-center sm:p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={e => e.stopPropagation()}
            className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-3xl bg-[color:var(--surface)] sm:max-h-[88dvh] sm:max-w-[720px] sm:rounded-3xl"
            style={{
              border: `1px solid ${project.accent}44`,
              boxShadow: `0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px ${project.accent}22`,
            }}
          >
            {/* Top accent rule */}
            <div
              className="h-1 sm:rounded-t-3xl"
              style={{ background: `linear-gradient(90deg, ${project.accent}, var(--violet))` }}
            />

            {/* Close */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.08, rotate: 90 }}
              whileTap={{ scale: 0.92 }}
              onClick={onClose}
              aria-label="Close case study"
              className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-[color:var(--line)] bg-[color:var(--surface-2)] text-[color:var(--ink-muted)] transition-colors hover:text-[color:var(--ink)]"
            >
              <X size={16} aria-hidden="true" />
            </motion.button>

            <div className="p-5 sm:p-7 md:p-9">
              {/* Title block */}
              <div className="mb-6">
                <span
                  className="mb-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[0.7rem] tracking-[0.05em]"
                  style={{
                    background: project.accentGlow,
                    borderColor: `${project.accent}40`,
                    color: project.accent,
                  }}
                >
                  <Sparkles size={11} aria-hidden="true" /> {project.category}
                </span>
                <h2
                  id="modal-title"
                  className="font-display text-[clamp(1.65rem,4.5vw,2.4rem)] font-bold leading-[1.05] tracking-[-0.025em] text-[color:var(--ink)]"
                >
                  {project.name}
                </h2>
                <p className="mt-3 text-[0.95rem] leading-[1.75] text-[color:var(--ink-muted)] sm:text-[1rem]">
                  {project.description}
                </p>
              </div>

              {/* Highlights */}
              <div className="mb-7 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
                {project.highlights.map(h => (
                  <div
                    key={h.label}
                    className="rounded-xl border bg-[color:var(--bg-elev)] px-3 py-3.5 text-center"
                    style={{ borderColor: `${project.accent}25` }}
                  >
                    <div
                      className="font-display text-[1rem] font-bold tracking-[-0.01em]"
                      style={{ color: project.accent }}
                    >
                      {h.value}
                    </div>
                    <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.10em] text-[color:var(--ink-faint)]">
                      {h.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mb-7">
                <h3 className="mb-4 font-display text-[0.85rem] font-semibold uppercase tracking-[0.10em] text-[color:var(--ink)]">
                  What's inside
                </h3>
                <ul className="space-y-3">
                  {project.features.map((f, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                      className="flex items-start gap-3 text-[0.92rem] leading-[1.7] text-[color:var(--ink-muted)]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                        style={{
                          background: project.accent,
                          boxShadow: `0 0 8px ${project.accent}`,
                        }}
                      />
                      {f}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tech */}
              <div className="mb-7">
                <h3 className="mb-3 font-display text-[0.85rem] font-semibold uppercase tracking-[0.10em] text-[color:var(--ink)]">
                  Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span
                      key={t}
                      className="rounded-md border border-[color:var(--line)] bg-[color:var(--bg-elev)] px-3 py-1 font-mono text-[0.72rem] text-[color:var(--ink-muted)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex min-w-[160px] flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3.5 font-display text-sm font-semibold text-white"
                  style={{
                    background: `linear-gradient(135deg, ${project.accent}, var(--violet))`,
                  }}
                >
                  <GithubIcon size={16} /> View on GitHub
                </motion.a>
                {project.demo && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex min-w-[160px] flex-1 items-center justify-center gap-2 rounded-xl border bg-[color:var(--surface-2)] px-4 py-3.5 font-display text-sm font-semibold"
                    style={{
                      borderColor: `${project.accent}55`,
                      color: project.accent,
                    }}
                  >
                    <ExternalLink size={16} aria-hidden="true" />{' '}
                    {project.demo.includes('npmjs.com') ? 'View on npm' : 'Live demo'}
                  </motion.a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
