import type { Experience, Education, Certification, Skill } from '../types'

export const experience: Experience[] = [
  {
    role: 'React Native Developer',
    company: '3STechLabs',
    location: 'Remote — United States',
    period: 'May 2024 – Present',
    current: true,
    bullets: [
      'Delivering production-ready features including biometric authentication and real-time data syncing across cross-platform apps using Firebase and RESTful APIs.',
      'Spearheaded UI/UX enhancements that directly increased user engagement by 20% within two months of release.',
      'Diagnosed and resolved critical production bugs using Flipper and Sentry, reducing crash rates across both Android and iOS.',
    ],
  },
  {
    role: 'Senior React Native Developer',
    company: 'AppGlide Technologies',
    location: 'Remote',
    period: 'June 2023 – April 2024',
    bullets: [
      'Architected and led development of 3 production-grade React Native (Expo) apps collectively serving 50,000+ active users.',
      'Mentored 4 junior developers through code reviews and modular standards, cutting onboarding time by 40%.',
      'Designed CI/CD pipelines using Fastlane, reducing manual deployment errors by 90%.',
      'Shipped MVPs within 6–8 weeks by collaborating cross-functionally with product and design stakeholders.',
      'Achieved 35% reduction in app load time through lazy loading, image compression, and navigation refactoring.',
    ],
  },
  {
    role: 'Junior React Native Developer',
    company: 'TechNova Solutions Inc.',
    location: 'Remote — United States',
    period: 'February 2022 – April 2023',
    bullets: [
      'Improved overall app performance by 25% by reworking data-fetching and implementing async caching strategies with Firebase.',
      'Deployed multiple consumer-facing apps to the Apple App Store and Google Play with zero post-launch crashes.',
      'Contributed to Agile sprint planning, consistently delivering features ahead of schedule.',
    ],
  },
  {
    role: 'UI/UX & Graphic Designer (Part-Time)',
    company: 'W3 Technologies',
    location: 'Remote',
    period: 'October 2021 – March 2023',
    bullets: [
      'Translated business requirements into polished, responsive UI/UX mockups using Figma and Adobe XD.',
      'Maintained visual consistency across all mobile components in collaboration with React Native dev teams.',
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
  { name: 'Reanimated 3', level: 88, category: 'Mobile' },
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
