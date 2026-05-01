import { Mail, ArrowUp } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons'
import { Container } from '../components/ui'
import LocalTime from '../components/LocalTime'

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Stack', href: '#skills' },
  { label: 'Work', href: '#projects' },
  { label: 'Process', href: '#process' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { href: 'https://github.com/aashir-athar', icon: <GithubIcon size={15} />, label: 'GitHub' },
  { href: 'https://linkedin.com/in/aashirathar', icon: <LinkedinIcon size={15} />, label: 'LinkedIn' },
  { href: 'mailto:aashirathar@gmail.com', icon: <Mail size={15} />, label: 'Email' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="relative z-[1] mt-16 border-t border-[color:var(--line)] py-14 sm:mt-20 md:mt-24 md:py-16">
      <Container>
        {/* Mega name as editorial signature */}
        <div className="mb-12 border-b border-[color:var(--line)] pb-10">
          <a
            href="#hero"
            onClick={e => {
              e.preventDefault()
              scrollTop()
            }}
            className="block font-display font-bold leading-[0.9] tracking-[-0.04em] text-[color:var(--ink)] no-underline transition-opacity hover:opacity-90"
            style={{ fontSize: 'clamp(2.5rem, 14vw, 9rem)' }}
            aria-label="Aashir Athar — back to top"
          >
            Aashir <span className="gradient-text">Athar.</span>
          </a>
          <p className="mt-4 max-w-xl text-[0.95rem] leading-[1.65] text-[color:var(--ink-muted)]">
            Senior React Native engineer. Production mobile apps that hold up six months past
            launch — for cross-platform teams that ship to real users.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-12 md:items-start md:gap-10">
          {/* Brand status */}
          <div className="md:col-span-5">
            <p className="eyebrow">Status</p>
            <p className="mt-4 inline-flex items-center gap-2 font-mono text-[0.78rem] text-[color:var(--emerald)]">
              <span
                aria-hidden="true"
                className="relative h-1.5 w-1.5 animate-pulse-ring rounded-full bg-[color:var(--emerald)] shadow-[0_0_8px_var(--emerald)]"
              />
              Available for senior &amp; lead roles
            </p>
            <div className="mt-3">
              <LocalTime />
            </div>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer" className="md:col-span-4">
            <p className="eyebrow">Sitemap</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {footerLinks.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={e => {
                      e.preventDefault()
                      document.querySelector(l.href)?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="link-underline text-[0.92rem] text-[color:var(--ink-muted)]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-[0.92rem] text-[color:var(--ink-muted)]"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>

          {/* Channels */}
          <div className="md:col-span-3">
            <p className="eyebrow">Connect</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--ink-muted)] transition-colors hover:border-[color:var(--cyan)] hover:text-[color:var(--cyan)]"
                >
                  {s.icon}
                </a>
              ))}
              <button
                type="button"
                onClick={scrollTop}
                aria-label="Back to top"
                className="ml-1 grid h-9 w-9 place-items-center rounded-lg border border-[color:var(--line-bright)] bg-[color:var(--cyan-glow)] text-[color:var(--cyan)] transition-transform [transition-timing-function:var(--ease-signature)] hover:-translate-y-1"
              >
                <ArrowUp size={15} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-[color:var(--line)] pt-6 font-mono text-[0.72rem] text-[color:var(--ink-faint)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Aashir Athar. All rights reserved.</p>
          <p>Designed &amp; built by Aashir Athar</p>
        </div>
      </Container>
    </footer>
  )
}
