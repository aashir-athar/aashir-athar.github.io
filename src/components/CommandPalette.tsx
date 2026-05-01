import {
  type ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import {
  ArrowRight,
  Command as CommandIcon,
  CornerDownLeft,
  ExternalLink,
  FileText,
  Layers,
  Mail,
  Moon,
  Search,
  Sun,
} from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { projects } from '../data/projects'

/* -------------------------------------------------------------------------- *
 *  COMMAND PALETTE — Cmd+K / Ctrl+K.                                         *
 *                                                                            *
 *  Why it earns its place on a portfolio:                                    *
 *   - Power-user signal. The kind of visitor we want to convert (CTOs,       *
 *     founders, senior engineers) reaches for ⌘K instinctively.              *
 *   - It IS the proof. A working command palette with fuzzy matching, full   *
 *     keyboard navigation, and arrow-key + return is itself a craft sample.  *
 *                                                                            *
 *  Architecture:                                                             *
 *   - Self-contained. One component, no router, no extra dependency.         *
 *   - Fuzzy match: subsequence-based score + earliest-match boost. Fast      *
 *     enough for tens of thousands of items; we have ~30. Zero allocation    *
 *     in the hot loop.                                                       *
 *   - Keyboard model: ↑/↓ wraps, Return runs the active item, Esc closes.   *
 *     `aria-activedescendant` keeps screen readers in sync with the visual  *
 *     selection.                                                             *
 *   - Open trigger lives outside this file (App.tsx). The palette mounts in *
 *     React but its expensive markup only renders when `open` flips, so the *
 *     idle cost is one boolean state and a key listener.                    *
 * -------------------------------------------------------------------------- */

interface CommandItem {
  id: string
  /** What the user reads. */
  label: string
  /** Optional secondary line, dimmer. */
  hint?: string
  /** Group header in the list. */
  group: 'Navigate' | 'Projects' | 'Links' | 'Actions'
  /** What it does when chosen. */
  perform: () => void
  /** Leading visual. */
  icon: ReactNode
  /** Aliases bumped into the matchable string. */
  keywords?: string
  /** Optional shortcut hint, rendered to the right. */
  shortcut?: string
}

const sectionItems: { id: string; label: string; hint: string }[] = [
  { id: 'about',      label: 'About',       hint: 'The thesis — month six, not day one' },
  { id: 'skills',     label: 'Stack',       hint: 'Tools I actually ship with' },
  { id: 'projects',   label: 'Selected work', hint: 'Six open-sourced shipping projects' },
  { id: 'process',    label: 'Process',     hint: 'Spec to ship, in five moves' },
  { id: 'experience', label: 'Experience',  hint: 'Junior → senior → lead, in four years' },
  { id: 'contact',    label: 'Contact',     hint: 'Open email draft · 24h replies' },
]

/* Fuzzy subsequence match. Returns -1 if `query` is not a subsequence of
 * `target`, otherwise a score where lower = better.
 *
 *  - Each consecutive match boosts the score (proximity matters).
 *  - Matching the very first character of `target` boosts hard.
 *  - Acronym-style matches (matching word-boundary chars) boost too.
 *
 * No allocation per call; safe to run on every keystroke. */
function fuzzyScore(query: string, target: string): number {
  const q = query.toLowerCase()
  const t = target.toLowerCase()
  if (!q) return 0
  let qi = 0
  let score = 0
  let lastMatchIdx = -1
  let prevWasBoundary = true

  for (let ti = 0; ti < t.length; ti++) {
    if (qi >= q.length) break
    if (t.charCodeAt(ti) === q.charCodeAt(qi)) {
      // Base cost — later matches cost more.
      score += ti
      // Consecutive bonus.
      if (lastMatchIdx === ti - 1) score -= 6
      // Word-boundary bonus.
      if (prevWasBoundary) score -= 4
      // First-character of target jackpot.
      if (ti === 0) score -= 8
      lastMatchIdx = ti
      qi++
    }
    const c = t.charCodeAt(ti)
    prevWasBoundary = c === 32 /* space */ || c === 45 /* - */ || c === 47 /* / */
  }
  return qi === q.length ? score : -1
}

/* -------------------------------------------------------------------------- */

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

export default function CommandPalette({
  open,
  onClose,
  theme,
  onToggleTheme,
}: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIdx, setActiveIdx] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const reduceMotion = useReducedMotion()

  /* Clear state when the palette closes so reopening starts fresh. */
  useEffect(() => {
    if (!open) {
      setQuery('')
      setActiveIdx(0)
    }
  }, [open])

  /* Autofocus on open — but only after the open transition has started so
   * mobile keyboards don't fight the modal animation. */
  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 60)
      return () => window.clearTimeout(id)
    }
  }, [open])

  /* Lock background scroll while open. */
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  /* Build the command list. Items are stable across renders unless the
   * theme changes (the toggle command swaps icon + label). */
  const items: CommandItem[] = useMemo(() => {
    const goTo = (id: string) => () => {
      onClose()
      window.setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
    }

    const navigate: CommandItem[] = sectionItems.map(s => ({
      id: `nav-${s.id}`,
      label: s.label,
      hint: s.hint,
      group: 'Navigate',
      icon: <ArrowRight size={14} aria-hidden="true" />,
      perform: goTo(s.id),
      keywords: 'jump scroll go to section',
    }))

    const proj: CommandItem[] = projects.map(p => ({
      id: `proj-${p.id}`,
      label: p.name,
      hint: p.tagline,
      group: 'Projects',
      icon: <Layers size={14} aria-hidden="true" />,
      perform: () => {
        onClose()
        window.setTimeout(() => {
          document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
        }, 80)
      },
      keywords: `${p.category} ${p.tech.join(' ')}`,
    }))

    const links: CommandItem[] = [
      {
        id: 'link-github',
        label: 'GitHub',
        hint: 'github.com/aashir-athar',
        group: 'Links',
        icon: <GithubIcon size={14} />,
        perform: () => window.open('https://github.com/aashir-athar', '_blank', 'noopener'),
        shortcut: '↗',
      },
      {
        id: 'link-linkedin',
        label: 'LinkedIn',
        hint: 'linkedin.com/in/aashirathar',
        group: 'Links',
        icon: <ExternalLink size={14} aria-hidden="true" />,
        perform: () => window.open('https://linkedin.com/in/aashirathar', '_blank', 'noopener'),
        shortcut: '↗',
      },
      {
        id: 'link-resume',
        label: 'Resume',
        hint: 'PDF · senior react native engineer',
        group: 'Links',
        icon: <FileText size={14} aria-hidden="true" />,
        perform: () => window.open('/resume.pdf', '_blank', 'noopener'),
        shortcut: '↗',
      },
      {
        id: 'link-source',
        label: 'View source for this site',
        hint: 'github.com/aashir-athar (this portfolio)',
        group: 'Links',
        icon: <GithubIcon size={14} />,
        perform: () => window.open('https://github.com/aashir-athar', '_blank', 'noopener'),
        keywords: 'code repo open source',
        shortcut: '↗',
      },
    ]

    const actions: CommandItem[] = [
      {
        id: 'act-email',
        label: 'Email Aashir',
        hint: 'Opens an email draft',
        group: 'Actions',
        icon: <Mail size={14} aria-hidden="true" />,
        perform: () => {
          window.location.href = 'mailto:aashirathar@gmail.com'
          onClose()
        },
      },
      {
        id: 'act-theme',
        label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        hint: 'Animates with View Transitions where supported',
        group: 'Actions',
        icon: theme === 'dark' ? <Sun size={14} aria-hidden="true" /> : <Moon size={14} aria-hidden="true" />,
        perform: () => {
          onToggleTheme()
          onClose()
        },
        keywords: 'dark light mode color',
      },
    ]

    return [...navigate, ...proj, ...links, ...actions]
  }, [onClose, onToggleTheme, theme])

  /* Filter + score against current query. Items with score === -1 are
   * dropped. Stable sort by group order, then by score asc. */
  const filtered = useMemo(() => {
    if (!query.trim()) return items
    const ranked = items
      .map(it => {
        const haystack = `${it.label} ${it.hint ?? ''} ${it.keywords ?? ''}`
        const score = fuzzyScore(query, haystack)
        return { it, score }
      })
      .filter(r => r.score >= 0)
      .sort((a, b) => a.score - b.score)
    return ranked.map(r => r.it)
  }, [query, items])

  /* Group while preserving the filtered order. */
  const grouped = useMemo(() => {
    const out: { group: string; items: CommandItem[] }[] = []
    const order: CommandItem['group'][] = ['Navigate', 'Projects', 'Links', 'Actions']
    for (const g of order) {
      const inG = filtered.filter(it => it.group === g)
      if (inG.length) out.push({ group: g, items: inG })
    }
    return out
  }, [filtered])

  /* When the query changes, reset the active index. */
  useEffect(() => {
    setActiveIdx(0)
  }, [query])

  /* Keyboard handling. ↑/↓ navigate, Enter runs, Esc closes. */
  const onKey = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key === 'ArrowDown' || (e.key === 'n' && (e.ctrlKey || e.metaKey))) {
        e.preventDefault()
        setActiveIdx(i => (i + 1) % Math.max(filtered.length, 1))
        return
      }
      if (e.key === 'ArrowUp' || (e.key === 'p' && (e.ctrlKey || e.metaKey))) {
        e.preventDefault()
        setActiveIdx(i => (i - 1 + filtered.length) % Math.max(filtered.length, 1))
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        filtered[activeIdx]?.perform()
      }
    },
    [activeIdx, filtered, onClose],
  )

  /* When the active row changes, scroll it into view inside the palette
   * (smooth keyboard nav over a long list). */
  useEffect(() => {
    if (!open) return
    const list = listRef.current
    if (!list) return
    const el = list.querySelector<HTMLLIElement>(`[data-cmdk-active="true"]`)
    el?.scrollIntoView({ block: 'nearest' })
  }, [activeIdx, open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="cmdk"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[300] flex items-start justify-center px-4 pt-[12vh] backdrop-blur-2xl sm:pt-[18vh]"
          style={{ background: 'var(--modal-backdrop)' }}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          onKeyDown={onKey}
        >
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 6, scale: 0.985 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            onClick={e => e.stopPropagation()}
            className="relative w-full max-w-[640px] overflow-hidden rounded-2xl border border-[color:var(--line-strong)] bg-[color:var(--surface)]/98 shadow-[0_40px_120px_rgba(0,0,0,0.55)]"
            style={{
              backdropFilter: 'blur(18px) saturate(160%)',
              WebkitBackdropFilter: 'blur(18px) saturate(160%)',
            }}
          >
            {/* Top accent rule — matches the section-header signature. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--cyan),var(--violet),transparent)]"
            />

            {/* Search row */}
            <div className="flex items-center gap-3 border-b border-[color:var(--line)] px-4 py-3.5">
              <Search size={16} aria-hidden="true" className="flex-shrink-0 text-[color:var(--ink-faint)]" />
              <input
                ref={inputRef}
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Type to navigate, search projects, or run a command…"
                aria-label="Search commands"
                aria-controls="cmdk-list"
                aria-activedescendant={filtered[activeIdx] ? `cmdk-${filtered[activeIdx].id}` : undefined}
                className="flex-1 bg-transparent font-display text-[1rem] text-[color:var(--ink)] outline-none placeholder:text-[color:var(--ink-faint)]"
              />
              <kbd className="hidden flex-shrink-0 items-center gap-1 rounded-md border border-[color:var(--line-strong)] bg-[color:var(--bg-elev)] px-1.5 py-0.5 font-mono text-[0.66rem] text-[color:var(--ink-faint)] sm:inline-flex">
                ESC
              </kbd>
            </div>

            {/* Result list */}
            <ul
              id="cmdk-list"
              ref={listRef}
              role="listbox"
              className="max-h-[52vh] overflow-y-auto py-2"
            >
              {grouped.length === 0 && (
                <li className="px-5 py-8 text-center text-[0.92rem] text-[color:var(--ink-muted)]">
                  No results for “{query}”. Try a project name, “stack,” or “contact.”
                </li>
              )}
              {grouped.map(g => (
                <li key={g.group} role="presentation">
                  <p className="px-4 pt-3 pb-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-[color:var(--ink-faint)]">
                    {g.group}
                  </p>
                  <ul role="presentation">
                    {g.items.map(it => {
                      const idxInFiltered = filtered.indexOf(it)
                      const active = idxInFiltered === activeIdx
                      return (
                        <li
                          key={it.id}
                          id={`cmdk-${it.id}`}
                          role="option"
                          aria-selected={active}
                          data-cmdk-active={active}
                          onMouseEnter={() => setActiveIdx(idxInFiltered)}
                          onClick={() => it.perform()}
                          className={`mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                            active
                              ? 'bg-[color:var(--surface-2)] text-[color:var(--ink)]'
                              : 'text-[color:var(--ink-muted)]'
                          }`}
                        >
                          <span
                            className={`grid h-7 w-7 flex-shrink-0 place-items-center rounded-md border ${
                              active
                                ? 'border-[color:var(--cyan)] text-[color:var(--cyan)]'
                                : 'border-[color:var(--line-strong)] text-[color:var(--ink-faint)]'
                            }`}
                          >
                            {it.icon}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-display text-[0.92rem] font-semibold text-[color:var(--ink)]">
                              {it.label}
                            </span>
                            {it.hint && (
                              <span className="block truncate text-[0.78rem] text-[color:var(--ink-muted)]">
                                {it.hint}
                              </span>
                            )}
                          </span>
                          {active && (
                            <span className="hidden flex-shrink-0 items-center gap-1.5 font-mono text-[0.7rem] text-[color:var(--ink-faint)] sm:inline-flex">
                              <CornerDownLeft size={12} aria-hidden="true" />
                              go
                            </span>
                          )}
                          {!active && it.shortcut && (
                            <span className="hidden flex-shrink-0 font-mono text-[0.7rem] text-[color:var(--ink-faint)] sm:inline">
                              {it.shortcut}
                            </span>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                </li>
              ))}
            </ul>

            {/* Footer — keyboard hints, lives at the bottom always. */}
            <div className="flex items-center justify-between gap-3 border-t border-[color:var(--line)] px-4 py-2.5 font-mono text-[0.7rem] text-[color:var(--ink-faint)]">
              <span className="inline-flex items-center gap-1.5">
                <CommandIcon size={11} aria-hidden="true" /> K to open
              </span>
              <span className="hidden items-center gap-3 sm:inline-flex">
                <span>↑↓ navigate</span>
                <span>↵ run</span>
                <span>esc close</span>
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
