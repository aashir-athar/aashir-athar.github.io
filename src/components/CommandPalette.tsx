import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from 'react'
import {
  ArrowRight,
  CornerDownLeft,
  ExternalLink,
  FileText,
  Layers,
  Moon,
  Search,
  Sun,
} from 'lucide-react'
import { GithubIcon } from './SocialIcons'
import { projects } from '../data/projects'
import { scrollToId } from '../lib/smoothScroll'
import { useModalA11y } from '../hooks/useModalA11y'

/* -------------------------------------------------------------------------- *
 *  COMMAND PALETTE (Cmd+K) — RESTRAINT ZONE.                                   *
 *                                                                             *
 *  Per the build contract, the palette is a no-motion device: it renders      *
 *  instantly when open (no AnimatePresence, no scale/slide). All the          *
 *  craft goes into keyboard ergonomics, fuzzy subsequence matching, and       *
 *  grouped results — never into animation.                                    *
 * -------------------------------------------------------------------------- */

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

type CommandGroup = 'Navigate' | 'Projects' | 'Links' | 'Actions'

interface Command {
  id: string
  group: CommandGroup
  label: string
  hint?: string
  icon: ReactNode
  /** Search corpus — label plus aliases, already lowercased. */
  keywords: string
  /** External destination (anchor); takes precedence over run(). */
  href?: string
  external?: boolean
  /** In-app action; runs then closes the palette. */
  run?: () => void
}

/* Fuzzy subsequence: do the query characters appear, in order, anywhere in
 * the target? Cheap, predictable, and forgiving of skipped letters. */
function subsequenceMatch(query: string, target: string): boolean {
  if (!query) return true
  let qi = 0
  for (let ti = 0; ti < target.length && qi < query.length; ti++) {
    if (target[ti] === query[qi]) qi++
  }
  return qi === query.length
}

const GROUP_ORDER: CommandGroup[] = ['Navigate', 'Projects', 'Links', 'Actions']
const ICON = 16

export default function CommandPalette({ open, onClose, theme, onToggleTheme }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const baseId = useId()

  /* Overlay a11y: scroll-lock, initial focus into the search input, Tab focus
   * trap, Escape-to-close, and focus-restore to the opener all live in the hook. */
  useModalA11y(open, panelRef, onClose, { initialFocus: 'first' })

  /* The full command set. Recomputed when the theme label/icon flips or the
   * bound callbacks change; contents are otherwise static. */
  const commands = useMemo<Command[]>(() => {
    const nav: Array<{ id: string; label: string; hint: string; keywords: string }> = [
      { id: 'about', label: 'About', hint: 'The thesis', keywords: 'about thesis intro' },
      { id: 'work', label: 'Work', hint: 'Project reel', keywords: 'work projects reel' },
      { id: 'stack', label: 'Stack', hint: 'Tools and frameworks', keywords: 'stack tools tech skills' },
      { id: 'process', label: 'Process', hint: 'How I build', keywords: 'process method workflow' },
      { id: 'experience', label: 'Experience', hint: 'Timeline', keywords: 'experience timeline history' },
      { id: 'contact', label: 'Contact', hint: 'Get in touch', keywords: 'contact email hire reach' },
    ]
    const navigate: Command[] = nav.map(n => ({
      id: `nav-${n.id}`,
      group: 'Navigate',
      label: n.label,
      hint: n.hint,
      icon: <ArrowRight size={ICON} strokeWidth={1.5} aria-hidden="true" />,
      keywords: n.keywords,
      run: () => scrollToId(n.id),
    }))

    const projectCommands: Command[] = projects.map(p => ({
      id: `project-${p.id}`,
      group: 'Projects',
      label: p.name,
      hint: p.platform,
      icon: <Layers size={ICON} strokeWidth={1.5} aria-hidden="true" />,
      keywords: `${p.name} ${p.platform} ${p.category} ${p.repo}`.toLowerCase(),
      run: () => scrollToId('work'),
    }))

    const links: Command[] = [
      {
        id: 'link-github',
        group: 'Links',
        label: 'GitHub',
        hint: 'github.com/aashir-athar',
        icon: <GithubIcon size={ICON} />,
        keywords: 'github code source repos aashir',
        href: 'https://github.com/aashir-athar',
        external: true,
      },
      {
        id: 'link-mindees',
        group: 'Links',
        label: 'mindees org',
        hint: 'github.com/mindees',
        icon: <GithubIcon size={ICON} />,
        keywords: 'mindees org organization framework github',
        href: 'https://github.com/mindees',
        external: true,
      },
      {
        id: 'link-linkedin',
        group: 'Links',
        label: 'LinkedIn',
        hint: 'linkedin.com/in/aashirathar',
        icon: <ExternalLink size={ICON} strokeWidth={1.5} aria-hidden="true" />,
        keywords: 'linkedin profile social network',
        href: 'https://linkedin.com/in/aashirathar',
        external: true,
      },
      {
        id: 'link-resume',
        group: 'Links',
        label: 'Resume',
        hint: 'Open PDF',
        icon: <FileText size={ICON} strokeWidth={1.5} aria-hidden="true" />,
        keywords: 'resume cv pdf download curriculum',
        href: '/resume.pdf',
        external: true,
      },
    ]

    const actions: Command[] = [
      {
        id: 'action-email',
        group: 'Actions',
        label: 'Email',
        hint: 'aashirathar@gmail.com',
        icon: <ArrowRight size={ICON} strokeWidth={1.5} aria-hidden="true" />,
        keywords: 'email mail contact hire message gmail',
        href: 'mailto:aashirathar@gmail.com',
      },
      {
        id: 'action-theme',
        group: 'Actions',
        label: theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme',
        hint: 'Toggle appearance',
        icon:
          theme === 'dark' ? (
            <Sun size={ICON} strokeWidth={1.5} aria-hidden="true" />
          ) : (
            <Moon size={ICON} strokeWidth={1.5} aria-hidden="true" />
          ),
        keywords: 'theme toggle dark light appearance mode color',
        run: onToggleTheme,
      },
    ]

    return [...navigate, ...projectCommands, ...links, ...actions]
  }, [theme, onToggleTheme])

  /* Filtered flat list (cursor math) + grouped view (render). */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return commands
    return commands.filter(
      c => subsequenceMatch(q, c.label.toLowerCase()) || subsequenceMatch(q, c.keywords),
    )
  }, [query, commands])

  const grouped = useMemo(
    () =>
      GROUP_ORDER.map(group => ({ group, items: results.filter(c => c.group === group) })).filter(
        g => g.items.length > 0,
      ),
    [results],
  )

  /* O(1) command -> flat-index lookup for the grouped render loop, instead of a
   * per-item results.indexOf scan (which made the render O(n^2)). */
  const indexOf = useMemo(() => new Map(results.map((c, i) => [c.id, i])), [results])

  /* Reset transient state on open; clamp the cursor when results shrink. */
  useEffect(() => {
    if (open) {
      setQuery('')
      setActive(0)
    }
  }, [open])

  useEffect(() => {
    setActive(a => (results.length === 0 ? 0 : Math.min(a, results.length - 1)))
  }, [results.length])

  /* Keep the active row in view as the cursor moves. */
  useEffect(() => {
    if (!open) return
    listRef.current?.querySelector<HTMLElement>('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active, open])

  if (!open) return null

  const runCommand = (command: Command) => {
    if (command.href) {
      if (command.external) window.open(command.href, '_blank', 'noopener,noreferrer')
      else window.location.href = command.href
      onClose()
      return
    }
    command.run?.()
    onClose()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (results.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive(a => (a + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive(a => (a - 1 + results.length) % results.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const command = results[active]
      if (command) runCommand(command)
    }
  }

  const optionId = (index: number) => `${baseId}-opt-${index}`

  return (
    <div
      className="fixed inset-0 z-[110] flex items-start justify-center px-4 pt-[14vh] backdrop-blur"
      style={{ background: 'var(--modal-backdrop)' }}
      role="presentation"
      onMouseDown={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        ref={panelRef}
        className="w-full max-w-[640px] overflow-hidden rounded-[var(--r-md)] border border-[color:var(--line-strong)] bg-[color:var(--surface)] shadow-[var(--shadow-md)]"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onKeyDown={onKeyDown}
      >
        {/* Search row */}
        <div className="flex items-center gap-3 border-b border-[color:var(--line)] px-4">
          <Search size={18} strokeWidth={1.5} aria-hidden="true" className="shrink-0 text-[color:var(--ink-faint)]" />
          <input
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value)
              setActive(0)
            }}
            placeholder="Search commands, projects, links..."
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-autocomplete="list"
            aria-controls={`${baseId}-list`}
            aria-activedescendant={results.length > 0 ? optionId(active) : undefined}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            className="h-14 w-full border-0 bg-transparent text-[color:var(--ink)] outline-none placeholder:text-[color:var(--ink-faint)]"
          />
        </div>

        {/* Results */}
        <ul
          ref={listRef}
          id={`${baseId}-list`}
          role="listbox"
          aria-label="Results"
          className="max-h-[min(52vh,420px)] overflow-y-auto py-2"
        >
          {grouped.length === 0 ? (
            <li className="px-4 py-8 text-center text-small text-[color:var(--ink-faint)]" role="presentation">
              No matches for <span className="font-mono text-[color:var(--ink-muted)]">{query}</span>
            </li>
          ) : (
            grouped.map(({ group, items }) => (
              <li key={group} role="presentation">
                <p className="eyebrow px-4 pb-1.5 pt-3">{group}</p>
                <ul role="presentation">
                  {items.map(command => {
                    const index = indexOf.get(command.id) ?? -1
                    const isActive = index === active
                    return (
                      <li key={command.id} role="presentation">
                        <button
                          type="button"
                          id={optionId(index)}
                          role="option"
                          aria-selected={isActive ? 'true' : 'false'}
                          data-active={isActive}
                          data-cursor="target"
                          onMouseMove={() => setActive(index)}
                          onClick={() => runCommand(command)}
                          className={`flex min-h-[44px] w-full items-center gap-3 px-3 py-2 text-left outline-none transition-colors duration-150 active:scale-[0.99] focus-visible:bg-[color:var(--surface-2)] ${
                            isActive ? 'bg-[color:var(--surface-2)]' : 'bg-transparent'
                          }`}
                        >
                          <span
                            className={`grid h-9 w-9 shrink-0 place-items-center rounded-[var(--r-sm)] border transition-colors duration-150 ${
                              isActive
                                ? 'border-[color:var(--accent)] text-[color:var(--accent-strong)]'
                                : 'border-[color:var(--line)] text-[color:var(--ink-muted)]'
                            }`}
                          >
                            {command.icon}
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-display text-[0.95rem] font-medium text-[color:var(--ink)]">
                              {command.label}
                            </span>
                            {command.hint && (
                              <span className="block truncate font-mono text-[color:var(--ink-faint)] text-[0.72rem]">
                                {command.hint}
                              </span>
                            )}
                          </span>
                          {command.external ? (
                            <ExternalLink
                              size={14}
                              strokeWidth={1.5}
                              aria-hidden="true"
                              className={`shrink-0 ${isActive ? 'text-[color:var(--accent-strong)]' : 'text-[color:var(--ink-faint)]'}`}
                            />
                          ) : (
                            <CornerDownLeft
                              size={14}
                              strokeWidth={1.5}
                              aria-hidden="true"
                              className={`shrink-0 text-[color:var(--accent-strong)] transition-opacity duration-150 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                            />
                          )}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </li>
            ))
          )}
        </ul>

        {/* Footer hints */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-[color:var(--line)] px-4 py-2.5 font-mono text-[color:var(--ink-faint)] text-[0.68rem]">
          <span className="inline-flex items-center gap-1.5">
            <kbd>↑</kbd>
            <kbd>↓</kbd>
            move
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd>↵</kbd>
            select
          </span>
          <span className="inline-flex items-center gap-1.5">
            <kbd>esc</kbd>
            close
          </span>
          <span className="ml-auto hidden sm:inline">
            {results.length} {results.length === 1 ? 'result' : 'results'}
          </span>
        </div>
      </div>
    </div>
  )
}
