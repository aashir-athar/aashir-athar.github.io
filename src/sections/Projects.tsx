import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { GithubIcon } from '../components/SocialIcons'
import { projects } from '../data/projects'
import ProjectModal from '../components/ProjectModal'
import type { Project } from '../types'
import { Container, Section, SectionHeader } from '../components/ui'

const ease = [0.16, 1, 0.3, 1] as const

function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: () => void
}) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.07, ease }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
      className="group relative flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-[color:var(--line)] bg-[color:var(--surface)] shadow-[var(--shadow-card)] transition-[transform,border-color,box-shadow] duration-500 [transition-timing-function:var(--ease-signature)] hover:-translate-y-2 hover:border-[color:var(--line-strong)] hover:shadow-[var(--shadow-elev)] focus-visible:-translate-y-2 focus-visible:border-[color:var(--cyan)]"
      aria-label={`${project.name} — open case study`}
    >
      {/* Visual header */}
      <div
        className="relative h-52 overflow-hidden sm:h-56"
        style={{
          background: `linear-gradient(155deg, ${project.accentGlow} 0%, var(--bg-elev) 100%)`,
        }}
      >
        {/* Top accent rule */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          }}
        />

        {/* Faint number behind logo */}
        <div
          aria-hidden="true"
          className="absolute right-5 bottom-2 font-display text-[6.5rem] font-bold leading-none tracking-[-0.05em] opacity-[0.07] sm:text-[8rem]"
          style={{ color: project.accent }}
        >
          {number}
        </div>

        {/* Logo monogram */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="grid h-20 w-20 place-items-center rounded-2xl border-2 font-display text-[1.85rem] font-bold text-white shadow-[0_12px_36px_rgba(0,0,0,0.25)] transition-transform duration-700 [transition-timing-function:var(--ease-signature)] group-hover:scale-105 sm:h-24 sm:w-24"
            style={{
              background: `linear-gradient(135deg, ${project.accent}, ${project.accent}aa)`,
              borderColor: `${project.accent}55`,
            }}
          >
            {project.name[0]}
          </div>
        </div>

        {/* Top-left index */}
        <span
          className="absolute top-4 left-4 font-mono text-[0.7rem] tracking-[0.18em] text-[color:var(--ink-faint)]"
          aria-hidden="true"
        >
          PROJECT / {number}
        </span>

        {/* Top-right GitHub */}
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={e => e.stopPropagation()}
          aria-label={`${project.name} on GitHub`}
          className="absolute top-3.5 right-3.5 grid h-9 w-9 place-items-center rounded-lg border border-[color:var(--line)] bg-[rgba(6,8,15,0.55)] text-[color:var(--ink-muted)] backdrop-blur-md transition-colors hover:text-[color:var(--ink)]"
        >
          <GithubIcon size={14} />
        </a>

        {/* Category pill */}
        <span
          className="absolute bottom-3.5 left-4 inline-flex items-center gap-1.5 rounded-full border bg-[rgba(6,8,15,0.55)] px-2.5 py-1 font-mono text-[0.66rem] backdrop-blur-md"
          style={{
            color: project.accent,
            borderColor: `${project.accent}40`,
          }}
        >
          <span
            aria-hidden="true"
            className="h-1 w-1 rounded-full"
            style={{ background: project.accent }}
          />
          {project.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <h3 className="font-display text-2xl font-bold leading-[1.15] tracking-[-0.02em] text-[color:var(--ink)] sm:text-[1.55rem]">
          {project.name}
        </h3>
        <p className="mt-4 text-[0.97rem] leading-[1.78] text-[color:var(--ink-muted)]">
          {project.tagline}
        </p>

        {/* Highlights — quick stats row */}
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

        {/* Tech */}
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
                Live
              </span>
            </a>
          )}
        </div>
      </div>

      {/* Hover rule at bottom */}
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
              <span className="serif-italic text-[color:var(--ink-muted)]">Not</span> portfolio briefs.
            </>
          }
          description="Four open-sourced React Native apps — architected, built, and shipped end-to-end. Each one solves a real problem under real constraints, not a folder filler engineered to look good in screenshots."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} onOpen={() => setActiveModal(p)} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
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
