import type { Experience, Education, Certification, Skill } from '../types'

export const experience: Experience[] = [
  {
    role: 'React Native Engineer',
    company: '3STechLabs',
    location: 'Remote — United States',
    period: 'May 2024 – Present',
    current: true,
    bullets: [
      'Shipping production features across cross-platform React Native apps — biometric auth, real-time sync over Firebase and REST.',
      'Led the UX pass that lifted user engagement 20% within two months of release.',
      'Drove iOS and Android crash rates down by wiring Flipper and Sentry into the standard debugging loop — regressions caught before users felt them.',
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
      'Shipped MVPs in 6–8 weeks by working directly with product and design — not around them.',
      'Cut cold-start time 35% through lazy loading, image-pipeline tuning, and a navigation refactor.',
    ],
  },
  {
    role: 'Junior React Native Developer',
    company: 'TechNova Solutions Inc.',
    location: 'Remote — United States',
    period: 'February 2022 – April 2023',
    bullets: [
      'Rewrote the data-fetching layer with async Firebase caching — lifted overall app performance 25%.',
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
      'Held visual consistency across the mobile component library in lockstep with the React Native team.',
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

/* Skills list — verified against the actual stack used in every shipped
 * project. Categories map 1:1 to the bento groups in <Skills />. The
 * `level` field is no longer rendered but kept for back-compat with
 * the type. */
export const skills: Skill[] = [
  // Core engineering — daily drivers, every commit touches these.
  { name: 'React Native', level: 97, category: 'Core' },
  { name: 'Expo SDK 54', level: 95, category: 'Core' },
  { name: 'TypeScript (strict)', level: 92, category: 'Core' },
  { name: 'JavaScript (ES2024)', level: 95, category: 'Core' },
  { name: 'React 19', level: 92, category: 'Core' },

  // Web stack — Next.js + React.js + Vite. This portfolio is the proof.
  { name: 'Next.js 16',     level: 90, category: 'Web' },
  { name: 'React.js (Vite)', level: 92, category: 'Web' },
  { name: 'Tailwind v4',    level: 92, category: 'Web' },
  { name: 'App Router / RSC', level: 86, category: 'Web' },
  { name: 'Framer Motion',  level: 88, category: 'Web' },
  { name: 'Three.js / WebGL', level: 78, category: 'Web' },

  // Mobile platform — native bridges, animation, distribution.
  { name: 'Reanimated 4', level: 90, category: 'Mobile' },
  { name: 'New Architecture', level: 88, category: 'Mobile' },
  { name: 'Expo Router 6', level: 90, category: 'Mobile' },
  { name: 'FlashList', level: 87, category: 'Mobile' },
  { name: 'Skia', level: 82, category: 'Mobile' },
  { name: 'Push Notifications', level: 90, category: 'Mobile' },
  { name: 'Deep Linking', level: 85, category: 'Mobile' },
  { name: 'Biometric Auth', level: 87, category: 'Mobile' },
  { name: 'TFLite (on-device AI)', level: 80, category: 'Mobile' },

  // Backend & data — realtime, persistence, REST + RPC.
  { name: 'Supabase + PostGIS', level: 90, category: 'Backend' },
  { name: 'Firebase', level: 92, category: 'Backend' },
  { name: 'Node.js / Express', level: 85, category: 'Backend' },
  { name: 'MongoDB Atlas', level: 82, category: 'Backend' },
  { name: 'TanStack Query', level: 88, category: 'Backend' },
  { name: 'Zustand', level: 90, category: 'Backend' },
  { name: 'SQLite (WAL)', level: 84, category: 'Backend' },

  // Auth & security — identity, sessions, hardening.
  { name: 'Clerk Auth', level: 90, category: 'Auth' },
  { name: 'JWT / OAuth 2', level: 88, category: 'Auth' },
  { name: 'Row-Level Security', level: 86, category: 'Auth' },

  // Release & DevOps — pipelines that don't break at 2 a.m.
  { name: 'Fastlane CI/CD', level: 88, category: 'DevOps' },
  { name: 'GitHub Actions', level: 85, category: 'DevOps' },
  { name: 'EAS Build', level: 85, category: 'DevOps' },
  { name: 'Sentry + Flipper', level: 82, category: 'DevOps' },

  // AI workflow — senior pair-programmer, not a magic button.
  { name: 'Claude (custom-trained)', level: 95, category: 'AI' },
  { name: 'ChatGPT (ideation)',       level: 92, category: 'AI' },
  { name: 'Grok (research)',          level: 88, category: 'AI' },
  { name: 'Nano Banana (image gen)',  level: 86, category: 'AI' },
  { name: 'Veo (video gen)',          level: 82, category: 'AI' },
  { name: 'ElevenLabs (voice)',       level: 84, category: 'AI' },
  { name: 'Custom skills + agents',   level: 90, category: 'AI' },
  { name: 'Prompt engineering',       level: 90, category: 'AI' },

  // Design & creative — pixel discipline, motion, polish that ships.
  { name: 'Figma',              level: 92, category: 'Design' },
  { name: 'Pixel-perfect UI',   level: 92, category: 'Design' },
  { name: 'Motion design',      level: 86, category: 'Design' },
  { name: 'Accessibility (AA+)', level: 88, category: 'Design' },
  { name: 'Adobe Photoshop',    level: 85, category: 'Design' },
  { name: 'After Effects',      level: 80, category: 'Design' },
  { name: 'Premiere Pro',       level: 78, category: 'Design' },
  { name: 'CapCut',             level: 85, category: 'Design' },
]
