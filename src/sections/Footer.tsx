import { motion } from 'framer-motion'
import { Mail, Heart } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      padding: '48px 24px 32px',
      borderTop: '1px solid var(--border)',
      position: 'relative', zIndex: 1,
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '20px', marginBottom: '32px',
        }}>
          {/* Logo */}
          <div style={{
            fontFamily: 'Syne, sans-serif', fontWeight: 800,
            fontSize: '1.1rem', color: 'var(--text-primary)',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span style={{
              width: '28px', height: '28px', borderRadius: '7px',
              background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8rem', fontWeight: 800, color: 'white',
            }}>A</span>
            Aashir Athar
          </div>

          {/* Nav links */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {['About', 'Skills', 'Projects', 'Experience', 'Contact'].map(link => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={e => {
                  e.preventDefault()
                  document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
                }}
                whileHover={{ color: 'var(--cyan)' }}
                style={{
                  fontSize: '0.82rem', color: 'var(--text-muted)',
                  textDecoration: 'none', transition: 'color 0.2s',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { href: 'https://github.com/aashir-athar', icon: <GithubIcon size={16} />, label: 'GitHub' },
              { href: 'https://linkedin.com/in/aashirathar', icon: <LinkedinIcon size={16} />, label: 'LinkedIn' },
              { href: 'mailto:aashirathar@gmail.com', icon: <Mail size={16} />, label: 'Email' },
            ].map(s => (
              <motion.a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                whileHover={{ scale: 1.12, color: 'var(--cyan)' }}
                style={{
                  width: '36px', height: '36px', borderRadius: '9px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border)',
        }}>
          <p style={{
            fontSize: '0.75rem', color: 'var(--text-muted)',
            fontFamily: 'DM Mono, monospace',
          }}>
            © {year} Aashir Athar. All rights reserved.
          </p>
          <p style={{
            fontSize: '0.75rem', color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', gap: '5px',
            fontFamily: 'DM Mono, monospace',
          }}>
            Built with <Heart size={12} color="#f43f5e" fill="#f43f5e" /> React Native vibes, React on web.
          </p>
          <p style={{
            fontSize: '0.75rem', color: 'var(--text-muted)',
            fontFamily: 'DM Mono, monospace',
          }}>
            Lahore, Pakistan 🇵🇰
          </p>
        </div>
      </div>
    </footer>
  )
}
