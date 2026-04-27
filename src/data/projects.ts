import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'xmind',
    name: 'xMind',
    tagline: 'Open-source social platform — weighted feed ranking, enterprise auth, 50+ component design system.',
    description:
      'A full-stack, open-source social network architected from the ground up. Weighted-signal feed ranking instead of pure engagement farming, multi-provider OAuth with Clerk, a 50+ component design system at a stable 60fps, and GDPR-compliant data handling across iOS and Android.',
    features: [
      'AI feed ranking: engagement (40%) + recency decay (25%) + social strength (20%) + quality score (15%)',
      'Enterprise auth via Clerk — multi-provider OAuth (Google, Apple, GitHub), MFA, JWT-secured endpoints',
      '50+ component design system with React Native Reanimated 3, haptic feedback, adaptive layouts',
      'Global multi-entity search, real-time hashtag trending, threaded comments, smart notification center',
      'Rate limiting, XSS protection, end-to-end encryption, full GDPR compliance + data portability',
    ],
    tech: ['React Native', 'Expo SDK 53', 'TypeScript', 'Express.js', 'MongoDB', 'Clerk Auth', 'Cloudinary', 'Reanimated 3'],
    github: 'https://github.com/aashir-athar/xmind-app',
    accent: '#06b6d4',
    accentGlow: 'rgba(6,182,212,0.2)',
    category: 'Social Platform',
    highlights: [
      { label: 'Components Built', value: '50+' },
      { label: 'Auth Providers', value: '3 OAuth' },
      { label: 'Animation FPS', value: '60fps' },
      { label: 'Type', value: 'Open Source' },
    ],
  },
  {
    id: 'bludstack',
    name: 'BludStack',
    tagline: 'Geo-fenced blood-donor matching with ring-by-ring notifications and urgency-based expiry.',
    description:
      'A civic-impact mobile platform that connects blood donors with recipients in real time. Donor matching expands ring-by-ring across geographic distance, requests carry urgency-based expiry, and donations enforce a 90-day cooldown. Built on Expo SDK 54 with Supabase as the realtime backend, plus live maps and in-app chat.',
    features: [
      'Geo-fenced donor matching with ring-by-ring notification propagation based on proximity',
      'Urgency-based request expiry system with real-time Supabase backend',
      'Live maps via React Native Maps, in-app chat, blood type filtering',
      '90-day donation cooldown logic with smart eligibility tracking',
      'Full donor registration → request → match → confirmation flow',
    ],
    tech: ['React Native', 'Expo SDK 54', 'TypeScript', 'Supabase', 'React Native Maps', 'Expo Notifications', 'Firebase'],
    github: 'https://github.com/aashir-athar/BludStack-RN',
    accent: '#f43f5e',
    accentGlow: 'rgba(244,63,94,0.2)',
    category: 'Civic Impact App',
    highlights: [
      { label: 'Matching System', value: 'Geo-fenced' },
      { label: 'Cooldown Logic', value: '90-day' },
      { label: 'Notifications', value: 'Ring-by-ring' },
      { label: 'Backend', value: 'Supabase' },
    ],
  },
  {
    id: 'tradeease',
    name: 'Trade Ease',
    tagline: 'Peer-to-peer marketplace with real-time chat, secure auth, and the full listing-to-deal flow.',
    description:
      'A peer-to-peer marketplace covering the full transactional loop — listing creation, inventory management, search, and real-time buyer-seller chat. Backed by Firebase Firestore for sync and Node.js services for the heavy lifting, with secure session management and image uploads built in.',
    features: [
      'Full P2P marketplace flow: listing creation, browsing, product management',
      'Real-time Firebase database sync across all listings and transactions',
      'Firebase Auth with secure session management and image upload support',
      'In-app messaging between buyers and sellers',
      'Intuitive add/remove/update product management interface',
    ],
    tech: ['React Native', 'TypeScript', 'Firebase Auth', 'Firebase Firestore', 'Node.js', 'Expo'],
    github: 'https://github.com/aashir-athar/Market-Place-App',
    accent: '#10b981',
    accentGlow: 'rgba(16,185,129,0.2)',
    category: 'Marketplace App',
    highlights: [
      { label: 'Real-time DB', value: 'Firebase' },
      { label: 'Auth', value: 'Firebase Auth' },
      { label: 'Architecture', value: 'P2P' },
      { label: 'Backend', value: 'Node.js' },
    ],
  },
  {
    id: 'fuelio',
    name: 'Fuelio',
    tagline: 'Offline-first vehicle tracker — statistically correct fuel-economy algorithm, zero cloud, zero ads.',
    description:
      'A 100% offline, privacy-first vehicle management app. Fuel efficiency is computed using the full-tank-window method — the only statistically correct approach, and the same one used by professional fleet software. Service history across 9 categories, analytics for cost-per-km and monthly spend, multi-currency and multi-unit support. All on-device, no network requests, one-tap data wipe.',
    features: [
      'Full-tank-window fuel algorithm — the only statistically correct efficiency method, matching professional fleet software',
      '9 service types with auto-calculated next-due mileage and home-screen reminder cards',
      'Analytics dashboard: avg/best/worst efficiency, cost-per-km, monthly spend bar chart, efficiency line chart with time filters',
      '100% offline — all data in AsyncStorage, zero network requests, one-tap full data wipe',
      'Multi-unit support: km/mi, L/gal, 7 currencies (USD, EUR, GBP, PKR, AED, SAR, INR), system/light/dark theme',
    ],
    tech: ['React Native', 'Expo SDK 54', 'TypeScript', 'Expo Router', 'Reanimated 4', 'Zustand', 'AsyncStorage', 'Expo Haptics'],
    github: 'https://github.com/aashir-athar/fuelio',
    accent: '#B6F24D',
    accentGlow: 'rgba(182,242,77,0.2)',
    category: 'Utility App',
    highlights: [
      { label: 'Storage', value: '100% Offline' },
      { label: 'Service Types', value: '9' },
      { label: 'Fuel Types', value: '5' },
      { label: 'Architecture', value: 'New Arch' },
    ],
  },
]