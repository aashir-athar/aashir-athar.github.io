export interface ProcessStep {
  id: string
  index: string
  title: string
  body: string
  artifacts: string[]
  accent: string
}

/* Step accents are CSS variable references so they auto-theme between
 * dark and light modes. Each var has both a dark-friendly and light-
 * friendly shade defined in index.css. Components consuming `accent`
 * use color-mix() for opacity (e.g. 33% borders) instead of hex alpha,
 * which CSS-var values can't carry. */
export const processSteps: ProcessStep[] = [
  {
    id: 'discover',
    index: '01',
    title: 'Discover',
    body:
      'Before code, the question. I sit with product, design, and ops to find the actual problem — the one users feel, not the one the brief describes. Constraints get surfaced early so they shape the architecture, not the bug list.',
    artifacts: ['Stakeholder interviews', 'Constraint map', 'Risk register'],
    accent: 'var(--cyan)',
  },
  {
    id: 'architect',
    index: '02',
    title: 'Architect',
    body:
      'A modular React Native foundation with typed boundaries, predictable state, and a release pipeline that holds up six months in. Decisions get written down — every team I leave keeps shipping without me.',
    artifacts: ['ADR / decision log', 'Performance budget', 'Module map'],
    accent: 'var(--violet)',
  },
  {
    id: 'build',
    index: '03',
    title: 'Build',
    body:
      'Vertical slices over horizontal layers. The first PR is something users can touch — auth, feed, booking — not a folder of utils. We ship daily, review weekly, refactor on the third pass.',
    artifacts: ['Vertical slice MVP', 'Component library', 'Test harness'],
    accent: 'var(--emerald)',
  },
  {
    id: 'ship',
    index: '04',
    title: 'Ship',
    body:
      'Fastlane + GitHub Actions, env-aware builds, signed releases, automated metadata. Deployments that used to take a day take ten minutes — and stop failing the way they used to.',
    artifacts: ['CI/CD pipeline', 'Crash + perf telemetry', 'Release playbook'],
    accent: 'var(--amber)',
  },
  {
    id: 'measure',
    index: '05',
    title: 'Measure',
    body:
      'Cold-start, frame drops, crash-free sessions, retention. Numbers I can defend in a roadmap meeting. If something regresses, the dashboard tells us before users do — and before the next sprint.',
    artifacts: ['LCP / FCP budgets', 'Crash-free %', 'Engagement deltas'],
    accent: 'var(--rose)',
  },
]
