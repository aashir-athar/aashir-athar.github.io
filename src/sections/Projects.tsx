import { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, ChevronRight, Layers } from 'lucide-react'
import { GithubIcon } from '../components/SocialIcons'
import { projects } from '../data/projects'
import ProjectModal from '../components/ProjectModal'
import type { Project } from '../types'

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '20px',
        background: 'var(--surface)',
        border: `1px solid ${hovered ? project.accent + '55' : 'var(--border)'}`,
        overflow: 'hidden',
        transition: 'border-color 0.3s, box-shadow 0.3s, transform 0.3s',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? `0 24px 60px ${project.accentGlow}, 0 0 0 1px ${project.accent}22` : '0 4px 20px rgba(0,0,0,0.2)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Top accent bar + phone visual */}
      <div style={{
        height: '200px',
        background: `linear-gradient(160deg, ${project.accentGlow} 0%, var(--bg2) 100%)`,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Top gradient line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
        }} />

        {/* Fake phone frames */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {[0.85, 1, 0.85].map((scale, i) => (
            <motion.div
              key={i}
              animate={hovered ? { y: [0, -4, 0] } : { y: 0 }}
              transition={{ duration: 2, delay: i * 0.15, repeat: hovered ? Infinity : 0 }}
              style={{
                width: '52px', height: '100px',
                borderRadius: '12px',
                background: `linear-gradient(160deg, #1a2640, #060910)`,
                border: `1px solid ${project.accent}33`,
                transform: `scale(${scale})`,
                boxShadow: i === 1 ? `0 8px 24px ${project.accentGlow}` : 'none',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '8px 4px 6px',
                overflow: 'hidden',
              }}
            >
              {/* Notch */}
              <div style={{ width: '18px', height: '5px', borderRadius: '3px', background: '#060910', marginBottom: '6px' }} />
              {/* Content lines */}
              {[100, 60, 80, 50, 70].map((w, j) => (
                <div key={j} style={{
                  width: `${w}%`, height: '4px', borderRadius: '2px',
                  background: j === 0 ? project.accent : `${project.accent}33`,
                  marginBottom: '4px',
                }} />
              ))}
              {/* Bottom bar */}
              <div style={{
                marginTop: 'auto', width: '20px', height: '3px',
                borderRadius: '2px', background: `${project.accent}55`,
              }} />
            </motion.div>
          ))}
        </div>

        {/* Category badge */}
        <div style={{
          position: 'absolute', top: '14px', left: '14px',
          padding: '4px 10px', borderRadius: '20px',
          background: `${project.accentGlow}`,
          border: `1px solid ${project.accent}33`,
          fontSize: '0.68rem', fontFamily: 'DM Mono, monospace',
          color: project.accent,
        }}>
          {project.category}
        </div>

        {/* GitHub quick link */}
        <motion.a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          onClick={e => e.stopPropagation()}
          style={{
            position: 'absolute', top: '14px', right: '14px',
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'rgba(6,9,16,0.7)',
            border: '1px solid var(--border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--text-secondary)', textDecoration: 'none',
          }}
        >
          <GithubIcon size={14} />
        </motion.a>
      </div>

      {/* Body */}
      <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800, fontSize: '1.4rem',
          color: 'var(--text-primary)', marginBottom: '6px',
        }}>{project.name}</h3>

        <p style={{
          fontSize: '0.85rem', color: 'var(--text-secondary)',
          marginBottom: '16px', lineHeight: 1.6,
        }}>{project.tagline}</p>

        {/* Features list */}
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '20px' }}>
          {project.features.slice(0, 3).map((f, i) => (
            <li key={i} style={{
              display: 'flex', gap: '8px', alignItems: 'flex-start',
              fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5,
            }}>
              <span style={{
                marginTop: '5px', flexShrink: 0,
                width: '5px', height: '5px', borderRadius: '50%',
                background: project.accent,
              }} />
              {f}
            </li>
          ))}
        </ul>

        {/* Tech badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px', flex: 1 }}>
          {project.tech.slice(0, 5).map(t => (
            <span key={t} style={{
              padding: '3px 8px', borderRadius: '5px',
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              fontSize: '0.68rem', fontFamily: 'DM Mono, monospace',
              color: 'var(--text-muted)',
            }}>{t}</span>
          ))}
          {project.tech.length > 5 && (
            <span style={{
              padding: '3px 8px', borderRadius: '5px',
              background: 'var(--bg2)',
              border: '1px solid var(--border)',
              fontSize: '0.68rem', fontFamily: 'DM Mono, monospace',
              color: 'var(--text-muted)',
            }}>+{project.tech.length - 5}</span>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <motion.button
            onClick={onOpen}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '11px', borderRadius: '10px',
              background: `linear-gradient(135deg, ${project.accent}, #8b5cf6)`,
              border: 'none', color: 'white', cursor: 'pointer',
              fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.8rem',
            }}
          >
            <Layers size={14} />
            View Case Study
          </motion.button>

          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.07 }}
            style={{
              width: '42px', height: '42px', borderRadius: '10px',
              background: 'var(--surface2)',
              border: `1px solid ${project.accent}33`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-secondary)', textDecoration: 'none',
            }}
          >
            <GithubIcon size={16} />
          </motion.a>

          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.07 }}
              style={{
                width: '42px', height: '42px', borderRadius: '10px',
                background: 'var(--surface2)',
                border: `1px solid ${project.accent}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--text-secondary)', textDecoration: 'none',
              }}
            >
              <ExternalLink size={16} />
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const [activeModal, setActiveModal] = useState<Project | null>(null)

  return (
    <section id="projects" style={{ padding: '120px 24px', position: 'relative' }}>
      {/* bg blob */}
      <div style={{
        position: 'absolute', bottom: '10%', left: '-100px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '4px 14px', borderRadius: '20px',
            background: 'var(--emerald-glow)',
            border: '1px solid rgba(16,185,129,0.3)',
            fontSize: '0.72rem', fontFamily: 'DM Mono, monospace',
            color: 'var(--emerald)', marginBottom: '20px',
          }}>
            03 / Featured Projects
          </div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800, lineHeight: 1.1,
          }}>
            Apps that ship.{' '}
            <span style={{
              background: 'linear-gradient(135deg, #10b981, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>Problems solved.</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)', marginTop: '12px',
            maxWidth: '500px', margin: '12px auto 0',
          }}>
            Production-grade React Native apps — open source, real users, real impact.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
        }}>
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={() => setActiveModal(project)}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ textAlign: 'center', marginTop: '56px' }}
        >
          <motion.a
            href="https://github.com/aashir-athar"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '14px 28px', borderRadius: '12px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)', textDecoration: 'none',
              fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.875rem',
            }}
          >
            <GithubIcon size={16} />
            See all projects on GitHub
            <ChevronRight size={16} />
          </motion.a>
        </motion.div>
      </div>

      <ProjectModal project={activeModal} onClose={() => setActiveModal(null)} />
    </section>
  )
}
