import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'xmind',
    name: 'xMind',
    tagline: 'Open-source social platform built for mindful networking.',
    description:
      'A full-stack, Twitter-like social media platform architected from the ground up as an open-source project. Features AI-powered feed ranking, enterprise-grade auth via Clerk, a 50+ component design system with 60fps animations, and GDPR-compliant data handling across iOS and Android.',
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
    tagline: 'Real-time blood donation — Uber, but for saving lives.',
    description:
      'A life-saving civic-impact mobile platform that connects blood donors with recipients using geo-fenced matching, ring-by-ring push notifications, and urgency-based expiry logic. Built with Expo SDK 54 and Supabase, featuring live maps, in-app chat, and a 90-day donation cooldown system.',
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
    tagline: 'P2P marketplace — list, trade, and transact in real time.',
    description:
      'A full-featured peer-to-peer marketplace app where users can list products, browse listings, manage inventory, and chat with buyers/sellers — all in real time. Backed by Firebase and Node.js with secure auth, image uploads, and seamless trading flows.',
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
]
