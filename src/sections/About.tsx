import { ArrowRight } from 'lucide-react'
import { Container, Section } from '../components/ui'
import { KineticText, Reveal } from '../components/Kinetic'
import { scrollToId } from '../lib/smoothScroll'

/* -------------------------------------------------------------------------- *
 *  ABOUT — the thesis. Single centered measure, no card, no columns. The      *
 *  display thesis is the visual centerpiece (high-contrast --ink); three      *
 *  Instrument-serif italic words carry the emphasis (no gradient text). A     *
 *  calm supporting paragraph and one link-underline CTA sit beneath it.       *
 * -------------------------------------------------------------------------- */

export default function About() {
  return (
    <Section id="about" aria-labelledby="about-thesis">
      <Container size="narrow" className="text-center">
        <Reveal>
          <span className="section-index text-[color:var(--accent-strong)]">The thesis</span>
        </Reveal>

        <KineticText
          as="h2"
          id="about-thesis"
          className="thesis mt-6 text-display text-[color:var(--ink)]"
        >
          {[
            'I build the whole stack, not one slice of it. The ',
            <span key="framework" className="serif-italic text-[color:var(--ink)]">framework</span>,
            ' underneath, the ',
            <span key="model" className="serif-italic text-[color:var(--ink)]">model</span>,
            ' inside, the design system around it, and the app on top. Everything here is solo and open-source: my idea, my design, my code. The part I care about most is the part most demos skip, whether it still works in ',
            <span key="month-six" className="serif-italic text-[color:var(--ink)]">month six</span>,
            '.',
          ]}
        </KineticText>

        <Reveal
          as="p"
          delay={0.1}
          className="mx-auto mt-8 max-w-[60ch] text-lede text-[color:var(--ink-muted)]"
        >
          Senior full-stack product engineer in Lahore, Pakistan. I work in TypeScript end to end:
          React and Next.js on the web, React Native on mobile, Node and Python underneath, with an
          AI workflow of custom-trained Claude agents that earns its seat.
        </Reveal>

        <Reveal delay={0.16} className="mt-9">
          <a
            href="#contact"
            data-cursor="target"
            onClick={e => {
              e.preventDefault()
              scrollToId('contact')
            }}
            className="link-underline group inline-flex min-h-[44px] items-center gap-2 font-display text-[color:var(--ink)]"
          >
            Start a conversation
            <ArrowRight
              size={18}
              strokeWidth={1.5}
              aria-hidden="true"
              className="text-[color:var(--accent-strong)] transition-transform duration-200 group-hover:translate-x-1"
            />
          </a>
        </Reveal>
      </Container>
    </Section>
  )
}
