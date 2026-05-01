import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Menu, X, Command, Search } from 'lucide-react'
import { useWindowSize } from '../hooks/useWindowSize'

interface NavbarProps {
  theme: 'dark' | 'light'
  onToggleTheme: (e?: React.MouseEvent) => void
  onOpenPalette: () => void
}

const links = [
  { href: '#about',      label: 'About',      index: '01' },
  { href: '#skills',     label: 'Stack',      index: '02' },
  { href: '#projects',   label: 'Work',       index: '03' },
  { href: '#process',    label: 'Process',    index: '04' },
  { href: '#experience', label: 'Experience', index: '05' },
  { href: '#contact',    label: 'Contact',    index: '06' },
] as const

/* -------------------------------------------------------------------------- *
 *  NAV — fixed editorial header with active section indicator + Cmd+K hint.  *
 *                                                                            *
 *  New in this pass:                                                          *
 *   - Search/⌘K affordance to the right of the desktop nav. Surfaces the    *
 *     existence of the command palette without forcing visitors to discover *
 *     the keystroke.                                                         *
 *   - Theme toggle now accepts the click event so the View Transitions      *
 *     reveal originates from the button, not the page center.                *
 *   - Active section indicator uses Framer's `layoutId` for the micro-        *
 *     transition between dot positions — single render at the moment of      *
 *     change, no per-frame layout work.                                      *
 *                                                                             *
 *  All interactive elements declare `data-cursor="target"` so the magnetic   *
 *  cursor snaps to them on hover.                                             *
 * -------------------------------------------------------------------------- */

export default function Navbar({ theme, onToggleTheme, onOpenPalette }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('')
  const { isMobile } = useWindowSize()

  useEffect(() => {
    if (!isMobile) setMenuOpen(false)
  }, [isMobile])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sectionIds = links.map(l => l.href.slice(1))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { threshold: 0.4 },
    )
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  /* Detect macOS to show ⌘K vs Ctrl+K. */
  const isMac =
    typeof navigator !== 'undefined' &&
    /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform || navigator.userAgent || '')

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={[
          'fixed inset-x-0 top-0 z-50 h-16 transition-[background,border-color,box-shadow] duration-300',
          scrolled
            ? 'border-b border-[color:var(--line)] bg-[color:var(--bg)]/85 shadow-[0_4px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl backdrop-saturate-150'
            : 'border-b border-transparent',
        ].join(' ')}
      >
        <div className="mx-auto flex h-full w-full max-w-[1320px] items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10">
          {/* Logo — references /favicon.svg directly so the navbar mark and
              the browser-tab favicon are always identical. drop-shadow filter
              follows the SVG's rounded silhouette (a normal box-shadow would
              clip square around the bounding box). */}
          <motion.a
            href="#hero"
            data-cursor="target"
            onClick={e => {
              e.preventDefault()
              handleNavClick('#hero')
            }}
            whileHover={{ scale: 1.04 }}
            className="group flex flex-shrink-0 items-center gap-2.5 font-display text-[1.05rem] font-bold tracking-[-0.02em] text-[color:var(--ink)] no-underline"
            aria-label="Aashir Athar — go to top"
          >
            <img
              src="/favicon.svg"
              alt=""
              aria-hidden="true"
              width={32}
              height={32}
              loading="eager"
              decoding="async"
              className="h-8 w-8 flex-shrink-0"
              style={{ filter: 'drop-shadow(0 4px 14px rgba(34,211,238,0.35))' }}
            />
            <span>Aashir</span>
            <span className="text-[color:var(--cyan)]">.</span>
          </motion.a>

          {/* Desktop links */}
          {!isMobile && (
            <ul className="flex items-center gap-1" role="menubar">
              {links.map(l => {
                const isActive = active === l.href.slice(1)
                return (
                  <li key={l.href} role="none">
                    <motion.a
                      href={l.href}
                      data-cursor="target"
                      role="menuitem"
                      onClick={e => {
                        e.preventDefault()
                        handleNavClick(l.href)
                      }}
                      className={`relative block rounded-md px-3 py-2 font-body text-[0.88rem] font-medium transition-colors ${
                        isActive
                          ? 'text-[color:var(--cyan)]'
                          : 'text-[color:var(--ink-muted)] hover:text-[color:var(--ink)]'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className="mr-1.5 font-mono text-[0.65rem] tracking-[0.10em] text-[color:var(--ink-faint)]"
                      >
                        {l.index}
                      </span>
                      {l.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          aria-hidden="true"
                          className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[color:var(--cyan)]"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </motion.a>
                  </li>
                )
              })}
            </ul>
          )}

          {/* Right controls */}
          <div className="flex items-center gap-2">
            {/* ⌘K affordance — surfaces the palette to the user. */}
            {!isMobile && (
              <motion.button
                type="button"
                onClick={onOpenPalette}
                data-cursor="target"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                aria-label="Open command palette"
                title="Open command palette"
                className="hidden h-10 items-center gap-2 rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] pl-3 pr-1.5 text-[color:var(--ink-muted)] transition-colors hover:border-[color:var(--line-strong)] hover:text-[color:var(--ink)] sm:inline-flex"
              >
                <Search size={14} aria-hidden="true" />
                <span className="font-mono text-[0.7rem] tracking-[0.05em]">Search</span>
                <kbd className="ml-1 inline-flex items-center gap-0.5 rounded-md border border-[color:var(--line-strong)] bg-[color:var(--bg-elev)] px-1.5 py-0.5 font-mono text-[0.62rem] text-[color:var(--ink-faint)]">
                  {isMac ? <Command size={9} aria-hidden="true" /> : 'Ctrl '}K
                </kbd>
              </motion.button>
            )}

            <motion.button
              type="button"
              onClick={e => onToggleTheme(e)}
              data-cursor="target"
              whileHover={{ scale: 1.08, rotate: 15 }}
              whileTap={{ scale: 0.92 }}
              className="grid h-10 w-10 place-items-center rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--ink-muted)] transition-colors hover:text-[color:var(--ink)]"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>

            {!isMobile && (
              <motion.a
                href="mailto:aashirathar@gmail.com"
                data-cursor="target"
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-[linear-gradient(135deg,var(--cyan),var(--violet))] px-4 font-display text-[0.8rem] font-bold tracking-wide text-white shadow-[0_4px_16px_rgba(34,211,238,0.35)]"
              >
                Hire me
                <span aria-hidden="true">→</span>
              </motion.a>
            )}

            {isMobile && (
              <>
                <motion.button
                  type="button"
                  onClick={onOpenPalette}
                  data-cursor="target"
                  whileTap={{ scale: 0.92 }}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--ink-muted)]"
                  aria-label="Open command palette"
                >
                  <Search size={16} />
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => setMenuOpen(prev => !prev)}
                  data-cursor="target"
                  whileTap={{ scale: 0.92 }}
                  className="grid h-10 w-10 place-items-center rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] text-[color:var(--ink-muted)]"
                  aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                  aria-expanded={menuOpen}
                  aria-controls="mobile-menu"
                >
                  {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.button>
              </>
            )}
          </div>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-1 bg-[color:var(--bg)]/95 backdrop-blur-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={e => {
                  e.preventDefault()
                  handleNavClick(l.href)
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ delay: i * 0.06 }}
                className="flex items-baseline gap-3 px-6 py-2.5 no-underline transition-colors"
              >
                <span className="font-mono text-[0.72rem] tracking-[0.18em] text-[color:var(--ink-faint)]">
                  {l.index}
                </span>
                <span className="font-display text-[2.2rem] font-bold tracking-[-0.02em] text-[color:var(--ink-muted)] hover:text-[color:var(--cyan)]">
                  {l.label}
                </span>
              </motion.a>
            ))}
            <motion.a
              href="mailto:aashirathar@gmail.com"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: links.length * 0.06 }}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,var(--cyan),var(--violet))] px-10 py-3.5 font-display font-bold text-white shadow-[0_8px_28px_rgba(34,211,238,0.30)]"
            >
              Hire me <span aria-hidden="true">→</span>
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
