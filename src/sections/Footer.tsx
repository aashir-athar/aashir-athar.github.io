import { ArrowUp } from 'lucide-react'
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon } from '../components/SocialIcons'
import { Container } from '../components/ui'
import LocalTime from '../components/LocalTime'
import { scrollToId, scrollToTop } from '../lib/smoothScroll'

/* -------------------------------------------------------------------------- *
 *  FOOTER — full-width mega-signature over --bg-elev (chrome, not a Section). *
 *                                                                             *
 *  The wordmark "Aashir Athar." sits at text-display scale and doubles as a   *
 *  back-to-top control. Below it: status, sitemap, and connect columns that   *
 *  stack on mobile, then a mono colophon row with tabular figures.            *
 *  No second hue, no gradient text — surname emphasis is Instrument italic.   *
 * -------------------------------------------------------------------------- */

const sitemap = [
  { id: 'about',      label: 'About' },
  { id: 'work',       label: 'Work' },
  { id: 'stack',      label: 'Stack' },
  { id: 'process',    label: 'Process' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact',    label: 'Contact' },
] as const

const connect = [
  { href: 'https://github.com/aashir-athar',     icon: <GithubIcon size={16} />,    label: 'GitHub · aashir-athar' },
  { href: 'https://github.com/mindees',          icon: <GithubIcon size={16} />,    label: 'GitHub · mindees (org)' },
  { href: 'https://linkedin.com/in/aashirathar', icon: <LinkedinIcon size={16} />,  label: 'LinkedIn' },
  { href: 'https://x.com/aashirathar',           icon: <XIcon size={14} />,         label: 'X' },
  { href: 'https://instagram.com/aashirathar',   icon: <InstagramIcon size={16} />, label: 'Instagram' },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      aria-label="Site footer"
      className="relative z-[1] border-t border-[color:var(--line)] bg-[color:var(--bg-elev)] pb-10 pt-[clamp(3.5rem,7vw,6rem)]"
    >
      <Container>
        {/* ---- Mega-signature — also the back-to-top control ---- */}
        <button
          type="button"
          data-cursor="target"
          onClick={scrollToTop}
          aria-label="Aashir Athar — back to top"
          className="group block w-full text-left font-display text-display font-bold tracking-[-0.035em] text-[color:var(--ink)] transition-[transform,opacity] duration-200 ease-[var(--ease-out)] active:scale-[0.985] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)]"
        >
          Aashir{' '}
          <span className="serif-italic text-[color:var(--ink)] transition-colors duration-200 group-hover:text-[color:var(--accent-strong)]">
            Athar
          </span>
          <span aria-hidden="true" className="serif-italic text-[color:var(--accent-strong)]">.</span>
        </button>

        <p className="mt-6 max-w-[60ch] text-body text-[color:var(--ink-muted)]">
          Senior full-stack product engineer. I build frameworks, LLMs, and the apps on top.
          All of it solo and open-source, with the repos public on GitHub.
        </p>

        {/* ---- Columns: Status · Sitemap · Connect (stack on mobile) ---- */}
        <div className="mt-12 grid gap-10 border-t border-[color:var(--line)] pt-10 sm:grid-cols-2 md:grid-cols-12 md:gap-10">
          {/* Status */}
          <div className="md:col-span-4">
            <p className="eyebrow">Status</p>
            <p className="mt-4 inline-flex items-center gap-2 text-small text-[color:var(--ink-muted)]">
              <span
                aria-hidden="true"
                className="relative h-1.5 w-1.5 rounded-full bg-[color:var(--ok)] before:absolute before:inset-0 before:animate-pulse-ring before:rounded-full before:bg-[color:var(--ok)]"
              />
              Open to full-time and freelance
            </p>
            <div className="mt-3">
              <LocalTime />
            </div>
          </div>

          {/* Sitemap */}
          <nav aria-label="Footer navigation" className="md:col-span-4">
            <p className="eyebrow">Sitemap</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {sitemap.map(l => (
                <li key={l.id}>
                  <a
                    href={`#${l.id}`}
                    data-cursor="target"
                    onClick={e => { e.preventDefault(); scrollToId(l.id) }}
                    className="link-underline inline-flex min-h-[44px] items-center text-small text-[color:var(--ink-muted)]"
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
                  data-cursor="target"
                  className="link-underline inline-flex min-h-[44px] items-center text-small text-[color:var(--ink-muted)]"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>

          {/* Connect */}
          <div className="md:col-span-4">
            <p className="eyebrow">Connect</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {connect.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="target"
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-11 w-11 place-items-center rounded-[var(--r-sm)] border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--ink-muted)] transition-[transform,border-color,color] duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:border-[color:var(--accent)] hover:text-[color:var(--accent-strong)] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
                >
                  {s.icon}
                </a>
              ))}
              <button
                type="button"
                onClick={scrollToTop}
                data-cursor="target"
                aria-label="Back to top"
                className="grid h-11 w-11 place-items-center rounded-[var(--r-sm)] border border-[color:var(--accent)] bg-[color:var(--accent-glow)] text-[color:var(--accent-strong)] transition-[transform,box-shadow] duration-200 ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--accent)]"
              >
                <ArrowUp size={16} strokeWidth={1.5} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* ---- Colophon — mono, tabular ---- */}
        <div className="mt-12 flex flex-col gap-3 border-t border-[color:var(--line)] pt-6 text-data tabular-nums text-[color:var(--ink-faint)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Aashir Athar. All rights reserved.</p>
          <p>
            Built with React 19 + Vite. Type: Bricolage Grotesque, Geist, Geist Mono, Instrument Serif.
          </p>
        </div>
      </Container>
    </footer>
  )
}
