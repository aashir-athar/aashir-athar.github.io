import type { Experience, Education, Certification, Skill } from '../types'

export const experience: Experience[] = [
  {
    role: 'React Native Engineer',
    company: '3STechLabs',
    location: 'Remote — United States',
    period: 'May 2024 – Present',
    current: true,
    bullets: [
      'Shipping production features across cross-platform apps — biometric auth, real-time data sync over Firebase and REST.',
      'Led the UX pass that lifted user engagement 20% within two months of release.',
      'Drove crash rates down on iOS and Android by instrumenting Flipper and Sentry into the standard debugging loop.',
    ],
  },
  {
    role: 'Senior React Native Developer',
    company: 'AppGlide Technologies',
    location: 'Remote',
    period: 'June 2023 – April 2024',
    bullets: [
      'Architected and led delivery of 3 production Expo apps now serving 50,000+ active users combined.',
      'Mentored 4 junior engineers; cut team onboarding time 40% by codifying modular standards into a working playbook.',
      'Built the Fastlane CI/CD pipelines that took manual deployment errors down by 90%.',
      'Shipped MVPs in 6–8 weeks by working directly with product and design instead of around them.',
      'Cut cold-start time 35% through lazy loading, image-pipeline tuning, and a navigation refactor.',
    ],
  },
  {
    role: 'Junior React Native Developer',
    company: 'TechNova Solutions Inc.',
    location: 'Remote — United States',
    period: 'February 2022 – April 2023',
    bullets: [
      'Rewrote the data-fetching layer with async Firebase caching, lifting overall app performance 25%.',
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

export const skills: Skill[] = [
  // Core
  { name: 'React Native', level: 97, category: 'Core' },
  { name: 'Expo SDK', level: 95, category: 'Core' },
  { name: 'TypeScript', level: 92, category: 'Core' },
  { name: 'JavaScript (ES6+)', level: 95, category: 'Core' },
  // Mobile
  { name: 'Reanimated 4', level: 88, category: 'Mobile' },
  { name: 'Push Notifications', level: 90, category: 'Mobile' },
  { name: 'Deep Linking', level: 85, category: 'Mobile' },
  { name: 'Biometric Auth', level: 87, category: 'Mobile' },
  // Backend & Data
  { name: 'Firebase', level: 92, category: 'Backend' },
  { name: 'Supabase', level: 85, category: 'Backend' },
  { name: 'Node.js / Express', level: 82, category: 'Backend' },
  { name: 'MongoDB', level: 80, category: 'Backend' },
  // Auth & Security
  { name: 'Clerk Auth', level: 90, category: 'Auth' },
  { name: 'JWT / OAuth', level: 88, category: 'Auth' },
  // DevOps
  { name: 'GitHub Actions', level: 83, category: 'DevOps' },
  { name: 'Fastlane CI/CD', level: 85, category: 'DevOps' },
  // Design
  { name: 'Figma', level: 88, category: 'Design' },
  { name: 'Pixel-Perfect UI', level: 92, category: 'Design' },
]
