import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Zap } from 'lucide-react'
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
    return () => { document.body.style.overflow = '' }
  }, [project])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(6,9,16,0.88)',
            backdropFilter: 'blur(16px)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            padding: '0',
          }}
          // On sm+, center it
          className="modal-overlay"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 40 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 40 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={e => e.stopPropagation()}
            className="modal-container"
            style={{
              background: 'var(--surface)',
              border: `1px solid ${project.accent}44`,
              position: 'relative',
              boxShadow: `0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}22`,
            }}
          >
            {/* Header gradient bar */}
            <div style={{ height: '4px', background: `linear-gradient(90deg, ${project.accent}, #8b5cf6)`, borderRadius: '0' }} className="modal-bar" />

            {/* Close button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose}
              style={{ position: 'absolute', top: '16px', right: '16px', width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--border)', background: 'var(--surface2)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
            >
              <X size={16} />
            </motion.button>

            <div style={{ padding: '24px' }}>
              {/* Title block */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '20px', background: `${project.accentGlow}`, border: `1px solid ${project.accent}33`, fontSize: '0.75rem', fontFamily: 'DM Mono, monospace', color: project.accent, marginBottom: '12px' }}>
                  <Zap size={10} />{project.category}
                </div>
                <h2 style={{ fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px' }}>{project.name}</h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>{project.description}</p>
              </div>

              {/* Stats row — 2×2 on mobile, 4-col on sm+ */}
              <div className="modal-stats" style={{ marginBottom: '24px' }}>
                {project.highlights.map((h, i) => (
                  <div key={i} style={{ padding: '14px 10px', borderRadius: '12px', background: 'var(--bg2)', border: `1px solid ${project.accent}22`, textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1rem', color: project.accent, marginBottom: '4px' }}>{h.value}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'DM Mono, monospace' }}>{h.label}</div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Key Features</h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
                  {project.features.map((f, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      <span style={{ marginTop: '4px', flexShrink: 0, width: '6px', height: '6px', borderRadius: '50%', background: project.accent, boxShadow: `0 0 8px ${project.accent}` }} />{f}
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Tech stack */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontFamily: 'Syne, sans-serif', fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Tech Stack</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.tech.map(t => (<span key={t} style={{ padding: '4px 12px', borderRadius: '6px', background: 'var(--bg2)', border: '1px solid var(--border)', fontSize: '0.75rem', fontFamily: 'DM Mono, monospace', color: 'var(--text-secondary)' }}>{t}</span>))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <motion.a href={project.github} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} style={{ flex: 1, minWidth: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', borderRadius: '12px', background: `linear-gradient(135deg, ${project.accent}, #8b5cf6)`, color: 'white', textDecoration: 'none', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.875rem' }}>
                  <GithubIcon size={16} /> View on GitHub
                </motion.a>
                {project.demo && (
                  <motion.a href={project.demo} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} style={{ flex: 1, minWidth: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', borderRadius: '12px', background: 'var(--surface2)', border: `1px solid ${project.accent}44`, color: project.accent, textDecoration: 'none', fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.875rem' }}>
                    <ExternalLink size={16} /> Live Demo
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
