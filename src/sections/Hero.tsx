import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Mail, Download } from 'lucide-react'
import PhoneMockup from '../components/PhoneMockup'
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons'

const ROLES = ['React Native Developer', 'Expo Specialist', 'Mobile Architect', 'TypeScript Engineer']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = ROLES[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200)
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 30)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setRoleIndex((roleIndex + 1) % ROLES.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, deleting, roleIndex])

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  }
  const item = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' as const } },
  }

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '80px',
      }}
    >
      {/* Grid background */}
      <div className="grid-bg" style={{
        position: 'absolute', inset: 0, zIndex: 0,
        maskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)',
      }} />

      {/* Ambient glow blobs */}
      <div style={{
        position: 'absolute', top: '20%', left: '10%',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', zIndex: 0,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '30%', right: '10%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
        filter: 'blur(60px)', zIndex: 0,
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        padding: '0 24px',
        width: '100%',
        position: 'relative', zIndex: 1,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1fr) auto',
        gap: '80px',
        alignItems: 'center',
      }}>
        {/* Left content */}
        <motion.div variants={container} initial="hidden" animate="show">
          {/* Status badge */}
          <motion.div variants={item} style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '100px',
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.25)',
            marginBottom: '28px',
          }}>
            <span style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 10px #10b981',
              animation: 'pulse-ring 2s ease-out infinite',
            }} />
            <span style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.75rem', color: '#10b981',
            }}>
              Open to remote opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(2.8rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: '16px',
              color: 'var(--text-primary)',
            }}
          >
            Aashir{' '}
            <span style={{
              background: 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Athar
            </span>
          </motion.h1>

          {/* Typewriter role */}
          <motion.div
            variants={item}
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              color: 'var(--text-secondary)',
              marginBottom: '24px',
              height: '2em',
              display: 'flex',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <span style={{ color: '#06b6d4' }}>&gt;</span>
            <span style={{ marginLeft: '8px' }}>{displayed}</span>
            <span className="animate-blink" style={{
              width: '2px', height: '1.2em',
              background: '#06b6d4', display: 'inline-block', marginLeft: '2px',
            }} />
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={item}
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              maxWidth: '520px',
              marginBottom: '36px',
            }}
          >
            3+ years building production-grade mobile apps serving{' '}
            <span style={{ color: 'var(--cyan)', fontWeight: 600 }}>50,000+ active users</span>.
            Specializing in React Native, Expo, and scalable mobile architecture across the US and Pakistan.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={item} style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '44px' }}>
            <motion.a
              href="#projects"
              onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                color: 'white', textDecoration: 'none',
                fontFamily: 'Syne, sans-serif', fontWeight: 700,
                fontSize: '0.9rem',
                boxShadow: '0 8px 32px rgba(6,182,212,0.25)',
              }}
            >
              Explore Projects
              <ArrowDown size={16} />
            </motion.a>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', borderRadius: '12px',
                background: 'var(--surface)',
                border: '1px solid var(--border-bright)',
                color: 'var(--text-primary)', textDecoration: 'none',
                fontFamily: 'Syne, sans-serif', fontWeight: 700,
                fontSize: '0.9rem',
              }}
            >
              <Download size={16} />
              Download Resume
            </motion.a>

            <motion.a
              href="#contact"
              onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', borderRadius: '12px',
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)', textDecoration: 'none',
                fontFamily: 'Syne, sans-serif', fontWeight: 600,
                fontSize: '0.9rem',
              }}
            >
              <Mail size={16} />
              Get in Touch
            </motion.a>
          </motion.div>

          {/* Social + stats row */}
          <motion.div variants={item} style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { href: 'https://github.com/aashir-athar', icon: <GithubIcon size={18} />, label: 'GitHub' },
                { href: 'https://linkedin.com/in/aashirathar', icon: <LinkedinIcon size={18} />, label: 'LinkedIn' },
                { href: 'mailto:aashirathar@gmail.com', icon: <Mail size={18} />, label: 'Email' },
              ].map(s => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.12, y: -2, color: 'var(--cyan)' }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', transition: 'color 0.2s',
                  }}
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>

            <div style={{ width: '1px', height: '24px', background: 'var(--border)' }} />

            {[
              { value: '3+', label: 'Years' },
              { value: '50K+', label: 'Users' },
              { value: '5+', label: 'Apps Shipped' },
            ].map(stat => (
              <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <span style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: 800,
                  fontSize: '1.1rem', color: 'var(--cyan)',
                }}>{stat.value}</span>
                <span style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.65rem', color: 'var(--text-muted)',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Phone Mockup — hidden on small screens */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: 'flex', justifyContent: 'center' }}
          className="hidden lg:flex"
        >
          <PhoneMockup accentColor="#06b6d4" />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: 'absolute', bottom: '32px', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          color: 'var(--text-muted)',
          zIndex: 1,
        }}
      >
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.1em' }}>SCROLL</span>
        <ArrowDown size={14} />
      </motion.div>
    </section>
  )
}
