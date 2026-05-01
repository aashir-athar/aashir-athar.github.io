import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import { useTheme } from './hooks/useTheme'
import Navbar from './components/NavBar'
import ScrollProgress from './components/ScrollProgress'
import MagneticCursor from './components/MagneticCursor'
import ChapterRail from './components/ChapterRail'
import PullQuote from './components/PullQuote'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Projects from './sections/Projects'
import Process from './sections/Process'
import Experience from './sections/Experience'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

/*  Cmd+K palette is the second-largest interactive surface on this page.
 *  We lazy-load it so it only enters the bundle when the user actually
 *  invokes it (or when prefetched after idle). The keystroke listener
 *  itself is tiny and lives in App. */
const CommandPalette = lazy(() => import('./components/CommandPalette'))

/* Section order is deliberate. The hero sets the thesis; pull-quotes
 * between sections punctuate it so the page reads as a single editorial
 * argument rather than a stack of cards.
 *
 * Why `cv-auto` is applied to non-hero sections: the hero is always
 * painted (LCP). Everything below is offscreen at first paint —
 * `content-visibility: auto` lets the browser skip layout + paint of
 * those subtrees until they approach the viewport. Real first-paint
 * savings on a long single-page site like this. */
export default function App() {
  const { theme, toggle, setOrigin } = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)

  /* Global Cmd+K / Ctrl+K. Also '/' on its own when not in an input — the
   * GitHub / Linear / Stripe convention. Keep this listener tiny and
   * passive. */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey
      if (meta && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen(o => !o)
        return
      }
      if (e.key === '/' && !paletteOpen) {
        const t = e.target as HTMLElement | null
        const isField =
          t?.tagName === 'INPUT' ||
          t?.tagName === 'TEXTAREA' ||
          (t?.isContentEditable ?? false)
        if (!isField) {
          e.preventDefault()
          setPaletteOpen(true)
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [paletteOpen])

  /* Idle-prefetch the palette chunk after first paint so the first ⌘K
   * doesn't pay the network cost of fetching it. Falls back to a
   * setTimeout where requestIdleCallback isn't supported (Safari). */
  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number
    }
    const prefetch = () => {
      void import('./components/CommandPalette')
    }
    const id = w.requestIdleCallback
      ? w.requestIdleCallback(prefetch)
      : window.setTimeout(prefetch, 1500)
    return () => {
      if (typeof id === 'number') window.clearTimeout(id)
    }
  }, [])

  /* Theme toggle entry point — passes the click coordinate through to the
   * View Transitions clip-circle origin. */
  const handleThemeToggle = useCallback(
    (e?: React.MouseEvent) => {
      if (e && typeof e.clientX === 'number') {
        setOrigin(e.clientX, e.clientY)
      }
      toggle()
    },
    [setOrigin, toggle],
  )

  return (
    <>
      <MagneticCursor />
      <ScrollProgress />
      <ChapterRail />
      <Navbar
        theme={theme}
        onToggleTheme={handleThemeToggle}
        onOpenPalette={() => setPaletteOpen(true)}
      />
      <main id="main">
        <Hero />

        <PullQuote kicker="The thesis">
          Anyone can build a demo. <span className="accent">Few can build something</span> that survives <span className="accent">month&nbsp;six.</span>
        </PullQuote>

        <div className="cv-auto"><About /></div>

        <PullQuote kicker="The stack">
          The tools matter <span className="accent">less than</span> what you ship with them.
        </PullQuote>

        <div className="cv-auto"><Skills /></div>

        <PullQuote kicker="The receipts">
          Six open-source apps. <span className="accent">Real source.</span> Real users. Real load.
        </PullQuote>

        <div className="cv-auto"><Projects /></div>

        <PullQuote kicker="The rhythm">
          From spec to ship — <span className="accent">no surprises</span> in the middle.
        </PullQuote>

        <div className="cv-auto"><Process /></div>

        <PullQuote kicker="The arc">
          Junior to senior in three years. <span className="accent">Lead</span> in the fourth.
        </PullQuote>

        <div className="cv-auto"><Experience /></div>

        <PullQuote kicker="Last word">
          If your app needs to <span className="accent">still be running</span> in&nbsp;Q3 — let's talk.
        </PullQuote>

        <div className="cv-auto"><Contact /></div>
      </main>
      <Footer />

      {/* Suspense fallback is null — palette is invisible until invoked.
          The Cmd+K key listener above sets paletteOpen=true, which
          triggers the chunk download (or completes the prefetched one). */}
      <Suspense fallback={null}>
        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          theme={theme}
          onToggleTheme={() => handleThemeToggle()}
        />
      </Suspense>
    </>
  )
}
