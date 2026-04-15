import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X } from 'lucide-react'
import { useWindowSize } from '../hooks/useWindowSize'

interface NavbarProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

const links = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const { isMobile } = useWindowSize()

  // Close menu when resizing to desktop
  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map(l => l.href.slice(1))
    const observer = new IntersectionObserver(
      entries => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }) },
      { threshold: 0.4 }
    )
    sections.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          background: scrolled
            ? theme === 'dark' ? 'rgba(6,9,16,0.88)' : 'rgba(245,247,255,0.88)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.2)' : 'none',
        }}
      >
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={e => { e.preventDefault(); handleNavClick('#hero') }}
          whileHover={{ scale: 1.04 }}
          style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '1.25rem',
            color: 'var(--text-primary)', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0,
          }}
        >
          <span style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.9rem', fontWeight: 800, color: 'white',
          }}>A</span>
          <span style={{ color: 'var(--text-primary)' }}>Aashir</span>
          <span style={{ color: 'var(--cyan)' }}>.</span>
        </motion.a>

        {/* Desktop nav links — only rendered when not mobile */}
        {!isMobile && (
          <ul style={{ display: 'flex', gap: '4px', listStyle: 'none', alignItems: 'center', margin: 0, padding: 0 }}>
            {links.map(l => (
              <li key={l.href}>
                <motion.a
                  href={l.href}
                  onClick={e => { e.preventDefault(); handleNavClick(l.href) }}
                  whileHover={{ color: 'var(--cyan)' }}
                  style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.875rem', fontWeight: 500,
                    padding: '6px 14px', borderRadius: '6px',
                    color: active === l.href.slice(1) ? 'var(--cyan)' : 'var(--text-secondary)',
                    textDecoration: 'none', transition: 'color 0.2s', position: 'relative',
                    display: 'block',
                  }}
                >
                  {l.label}
                  {active === l.href.slice(1) && (
                    <motion.span
                      layoutId="nav-dot"
                      style={{
                        position: 'absolute', bottom: '0px', left: '50%',
                        transform: 'translateX(-50%)',
                        width: '4px', height: '4px', borderRadius: '50%',
                        background: 'var(--cyan)',
                      }}
                    />
                  )}
                </motion.a>
              </li>
            ))}
          </ul>
        )}

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Theme toggle — always visible */}
          <motion.button
            onClick={onToggleTheme}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: '40px', height: '40px', borderRadius: '8px',
              border: '1px solid var(--border)', background: 'var(--surface)',
              color: 'var(--text-secondary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </motion.button>

          {/* Hire Me — desktop only */}
          {!isMobile && (
            <motion.a
              href="mailto:aashirathar@gmail.com"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                fontFamily: 'Syne, sans-serif', fontSize: '0.8rem', fontWeight: 700,
                padding: '8px 16px', borderRadius: '8px',
                background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                color: 'white', textDecoration: 'none', letterSpacing: '0.02em',
                display: 'flex', alignItems: 'center',
              }}
            >
              Hire Me
            </motion.a>
          )}

          {/* Hamburger — mobile only */}
          {isMobile && (
            <motion.button
              onClick={() => setMenuOpen(prev => !prev)}
              whileTap={{ scale: 0.9 }}
              style={{
                width: '40px', height: '40px', borderRadius: '8px',
                border: '1px solid var(--border)', background: 'var(--surface)',
                color: 'var(--text-secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          )}
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMenuOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 90,
              background: 'rgba(6,9,16,0.96)',
              backdropFilter: 'blur(24px)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: '8px',
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={e => { e.preventDefault(); handleNavClick(l.href) }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  fontFamily: 'Syne, sans-serif', fontSize: 'clamp(1.75rem, 8vw, 2.5rem)',
                  fontWeight: 700, color: 'var(--text-secondary)',
                  textDecoration: 'none', transition: 'color 0.2s', padding: '8px 24px',
                }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = 'var(--cyan)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)'}
              >
                {l.label}
              </motion.a>
            ))}

            <motion.a
              href="mailto:aashirathar@gmail.com"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: links.length * 0.06 }}
              style={{
                marginTop: '24px', fontFamily: 'Syne, sans-serif', fontWeight: 700,
                padding: '14px 40px', borderRadius: '12px',
                background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                color: 'white', textDecoration: 'none', fontSize: '1rem',
                display: 'inline-flex', alignItems: 'center',
              }}
            >
              Hire Me
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
