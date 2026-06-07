import type { Experience, Education, Certification, Skill } from '../types'

export const experience: Experience[] = [
  {
    role: 'Senior Full-Stack / React Native Engineer',
    company: '3STechLabs',
    location: 'Remote, United States',
    period: 'May 2024 – Present',
    current: true,
    bullets: [
      'Ship production features across cross-platform React Native apps: biometric auth, real-time sync over Firebase and REST.',
      'Led the UX pass that lifted user engagement 20% within two months of release.',
      'Drove iOS and Android crash rates down by wiring Sentry into the standard debugging loop, so regressions were caught before users felt them.',
    ],
  },
  {
    role: 'Senior React Native Developer',
    company: 'AppGlide Technologies',
    location: 'Remote',
    period: 'June 2023 – April 2024',
    bullets: [
      'Architected and led delivery of 3 production Expo apps now serving 50,000+ active users combined.',
      'Mentored 4 junior engineers; cut team onboarding 40% by codifying modular standards into a working playbook.',
      'Built the Fastlane CI/CD pipelines that took manual deployment errors down by 90%.',
      'Shipped MVPs in 6–8 weeks by working directly with product and design, not around them.',
      'Cut cold-start time 35% through lazy loading, image-pipeline tuning, and a navigation refactor.',
    ],
  },
  {
    role: 'React Native Developer',
    company: 'TechNova Solutions Inc.',
    location: 'Remote, United States',
    period: 'February 2022 – April 2023',
    bullets: [
      'Rewrote the data-fetching layer with async Firebase caching, which lifted overall app performance 25%.',
      'Released multiple consumer apps to the App Store and Google Play with zero post-launch crashes.',
      'Pulled my weight in Agile ceremonies and shipped features ahead of sprint commitments.',
    ],
  },
  {
    role: 'UI/UX & Graphic Designer (Part-Time)',
    company: 'W3 Technologies',
    location: 'Remote',
    period: 'October 2021 – March 2023',
    bullets: [
      'Turned product requirements into responsive Figma and Adobe XD mockups for mobile-first surfaces.',
      'Held visual consistency across the mobile component library in lockstep with the engineering team.',
    ],
  },
]

export const education: Education[] = [
  {
    degree: 'BSc Software Engineering',
    institution: 'Riphah International University',
    period: '2016 – 2021',
  },
]

export const certifications: Certification[] = [
  {
    name: 'Mobile App Development (React Native)',
    issuer: 'Azad Chaiwala Institute',
    year: '2023 – 2024',
  },
  {
    name: 'Software Engineering Fundamentals',
    issuer: 'Riphah International University',
    year: '2021',
  },
]

/* Skills — grouped to mirror the <Stack /> bento. Verified against the actual
 * stack used across the shipped open-source projects. `level` is unused in the
 * UI; kept for type back-compat. */
export const skills: Skill[] = [
  // Core engineering — every commit touches these.
  { name: 'TypeScript (strict)', category: 'Core' },
  { name: 'JavaScript (ES2024)', category: 'Core' },
  { name: 'React 19', category: 'Core' },
  { name: 'Node.js', category: 'Core' },
  { name: 'Python', category: 'Core' },

  // Web — Next.js + React + the kinetic layer.
  { name: 'Next.js 16', category: 'Web' },
  { name: 'React (Vite)', category: 'Web' },
  { name: 'Tailwind v4', category: 'Web' },
  { name: 'App Router / RSC', category: 'Web' },
  { name: 'Framer Motion', category: 'Web' },
  { name: 'Three.js / R3F', category: 'Web' },

  // Mobile — native bridges, animation, distribution.
  { name: 'React Native', category: 'Mobile' },
  { name: 'Expo SDK 56', category: 'Mobile' },
  { name: 'Reanimated 4', category: 'Mobile' },
  { name: 'Expo Router', category: 'Mobile' },
  { name: 'New Architecture', category: 'Mobile' },
  { name: 'FlashList v2', category: 'Mobile' },
  { name: 'Unistyles v3', category: 'Mobile' },
  { name: 'TFLite (on-device AI)', category: 'Mobile' },

  // Backend & data — realtime, persistence, REST + RPC.
  { name: 'Express', category: 'Backend' },
  { name: 'Supabase + PostGIS', category: 'Backend' },
  { name: 'MongoDB Atlas', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Backend' },
  { name: 'Prisma + SQLite', category: 'Backend' },
  { name: 'Firebase', category: 'Backend' },
  { name: 'TanStack Query', category: 'Backend' },
  { name: 'Zustand', category: 'Backend' },

  // AI / ML — from training loops to inference.
  { name: 'Transformers (MoE/MLA)', category: 'AI' },
  { name: 'RAG (LanceDB)', category: 'AI' },
  { name: 'PyTorch', category: 'AI' },
  { name: 'transformers.js', category: 'AI' },
  { name: 'RLHF (GRPO / DPO)', category: 'AI' },
  { name: 'Groq / Ollama', category: 'AI' },
  { name: 'Custom Claude agents', category: 'AI' },
  { name: 'Prompt engineering', category: 'AI' },

  // Systems & tooling — the deep end.
  { name: 'Compilers', category: 'Systems' },
  { name: 'Signals reactivity', category: 'Systems' },
  { name: 'CRDTs', category: 'Systems' },
  { name: 'Signed OTA', category: 'Systems' },
  { name: 'Monorepos', category: 'Systems' },
  { name: 'GitHub Actions', category: 'Systems' },
  { name: 'EAS Build', category: 'Systems' },
  { name: 'Vercel', category: 'Systems' },

  // Design & craft.
  { name: 'Figma', category: 'Design' },
  { name: 'Pixel-perfect UI', category: 'Design' },
  { name: 'Motion design', category: 'Design' },
  { name: 'Accessibility (AA+)', category: 'Design' },
  { name: 'Brand systems', category: 'Design' },
]
