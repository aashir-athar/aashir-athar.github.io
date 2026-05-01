import { useEffect, useRef } from 'react'

/* -------------------------------------------------------------------------- *
 *  MAGNETIC CURSOR — two-layer pointer.                                       *
 *                                                                             *
 *  Inner dot follows the real cursor 1:1 (transform every move). Outer ring   *
 *  lerps behind on a critically-damped spring, and *snaps* to any element     *
 *  that declares `data-cursor="target"` — its bounding box is read on enter,  *
 *  and the ring centers on the box and grows to wrap it.                      *
 *                                                                             *
 *  Why two layers: the dot communicates exact pointer position (precision).   *
 *  The ring communicates *target* — what the click will affect (intent). When *
 *  hovering a button the ring wraps the button; when free-roaming the ring    *
 *  is just a 32px halo. Subtle but signature.                                 *
 *                                                                             *
 *  Performance:                                                                *
 *   - One `requestAnimationFrame` loop, transforms only.                      *
 *   - Listeners attach at `document` level, capture phase, passive.           *
 *   - Spawns nothing on touch / coarse pointer / reduced motion (CSS hides    *
 *     the elements outright; JS still skips its work).                        *
 *   - Skip layout reads in the rAF loop — bounding box is read only when a    *
 *     new target is entered (input event, not a tick).                        *
 * -------------------------------------------------------------------------- */

interface SnapBox {
  x: number
  y: number
  w: number
  h: number
}

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my

    /* When the ring is snapped to an element, we lerp toward that element's
     * center instead of the cursor center. The CSS class `is-snapped`
     * controls the size; transform here controls position. */
    let snap: SnapBox | null = null
    let pressed = false

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
      // Dot snaps to the cursor immediately — no smoothing.
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
    }

    /* Pointer-over: walk the event composedPath to find the closest element
     * declaring itself a cursor target. We do this once per `pointerover`
     * (delegated), not per move. */
    const onOver = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.('[data-cursor="target"]')
      if (t instanceof HTMLElement) {
        const r = t.getBoundingClientRect()
        snap = { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height }
        ring.classList.add('is-snapped')
      } else if (snap) {
        snap = null
        ring.classList.remove('is-snapped')
      }
    }

    /* Recompute snap on scroll/resize while a target is engaged — bounding
     * box drifts otherwise. We re-query the element under the pointer. */
    const refreshSnap = () => {
      const el = document.elementFromPoint(mx, my)
      const t = el?.closest?.('[data-cursor="target"]')
      if (t instanceof HTMLElement) {
        const r = t.getBoundingClientRect()
        snap = { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height }
      } else {
        snap = null
        ring.classList.remove('is-snapped')
      }
    }

    const onDown = () => {
      pressed = true
      ring.classList.add('is-pressed')
    }
    const onUp = () => {
      pressed = false
      ring.classList.remove('is-pressed')
    }
    const onLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }
    const onEnter = () => {
      dot.style.opacity = '1'
      ring.style.opacity = '1'
    }

    /* The render loop. ~one transform per frame; no layout read. */
    let rafId = 0
    const tick = () => {
      const target = snap ?? { x: mx, y: my }
      // Critically-damped lerp.
      const k = 0.18
      rx += (target.x - rx) * k
      ry += (target.y - ry) * k
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      rafId = window.requestAnimationFrame(tick)
    }

    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerover', onOver, { passive: true })
    document.addEventListener('pointerdown', onDown, { passive: true })
    document.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('pointerleave', onLeave, { passive: true })
    document.addEventListener('pointerenter', onEnter, { passive: true })
    window.addEventListener('scroll', refreshSnap, { passive: true })
    window.addEventListener('resize', refreshSnap, { passive: true })
    rafId = window.requestAnimationFrame(tick)

    /* Suppress press flag — make sure the ring never sticks pressed. */
    void pressed

    return () => {
      window.cancelAnimationFrame(rafId)
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
      window.removeEventListener('scroll', refreshSnap)
      window.removeEventListener('resize', refreshSnap)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  )
}
