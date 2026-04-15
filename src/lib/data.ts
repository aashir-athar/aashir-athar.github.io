export const projects = [
    {
        id: 'xmind',
        title: 'xMind',
        subtitle: 'Open-Source Social Media Platform',
        emoji: '🧠',
        color: '#00f5ff',
        tagline: 'Twitter-like, but smarter — with AI-powered feed ranking',
        problem:
            'Social media feeds reward virality over value. xMind fixes this with an intelligent ranking engine that surfaces content based on genuine engagement, connection strength, and quality signals — not just raw engagement farming.',
        description:
            'A full-stack, open-source social media platform built solo from scratch — cross-platform mobile frontend in Expo + TypeScript, and a RESTful Node.js/MongoDB backend. Features a 50+ component design system, 60fps gesture animations, and enterprise-grade auth via Clerk.',
        highlights: [
            'AI-powered feed ranking (engagement 40%, recency 25%, social graph 20%, quality 15%)',
            'Enterprise auth: OAuth (Google, Apple, GitHub), MFA, JWT-secured endpoints',
            'Real-time hashtag trending detection + threaded comment system',
            '50+ component design system with 60fps Reanimated 3 animations',
            'Rate limiting, XSS protection, GDPR-compliant data portability',
            'Multi-entity global search: users, posts, hashtags',
        ],
        tech: ['React Native', 'Expo SDK 53', 'TypeScript', 'Express.js', 'MongoDB', 'Clerk Auth', 'Cloudinary', 'Reanimated 3'],
        github: 'https://github.com/aashir-athar/xmind-app',
        role: 'Solo Developer — Full-stack',
        type: 'Open Source',
    },
    {
        id: 'bludstack',
        title: 'BludStack',
        subtitle: 'Real-Time Blood Donor Matching',
        emoji: '🩸',
        color: '#ff4d6d',
        tagline: 'Connecting donors and recipients in minutes, not hours',
        problem:
            'Finding a compatible blood donor in an emergency is a life-or-death race against time. BludStack eliminates the chaos of phone-tree searching with geolocation-powered real-time matching that connects donors and recipients instantly.',
        description:
            'A civic-impact iOS application that matches blood donors with recipients in real time using geolocation and Firebase Firestore. The entire donor-request flow — registration, blood type filtering, location-based matching, and push notifications — was architected and built solo.',
        highlights: [
            'Geolocation-based real-time donor-recipient matching via Firebase Firestore',
            'Blood type compatibility filtering with instant results',
            'Push notification system for urgent donor requests',
            'Complete registration and donor-profile management flow',
            'Location-aware donor discovery within configurable radius',
        ],
        tech: ['React Native', 'Firebase Firestore', 'Geolocation API', 'Push Notifications', 'iOS', 'TypeScript'],
        github: 'https://github.com/aashir-athar/BludStack-RN',
        role: 'Solo Developer',
        type: 'Civic Tech',
    },
    {
        id: 'marketplace',
        title: 'Trade Ease',
        subtitle: 'Peer-to-Peer Marketplace App',
        emoji: '🛒',
        color: '#a78bfa',
        tagline: 'Buy. Sell. Chat. All in one seamless mobile experience.',
        problem:
            'P2P commerce on mobile is friction-heavy — scattered listings, unsafe transactions, and zero real-time communication between buyers and sellers. Trade Ease centralizes listings, secure auth, and live chat into a single polished app.',
        description:
            'A full-featured peer-to-peer marketplace with product listings, real-time buyer-seller chat, and complete transaction flows. Backed by Firebase and Node.js, with secure authentication, image uploads, and listing management all built and shipped solo.',
        highlights: [
            'Real-time buyer-seller chat powered by Firebase',
            'Product listing creation with multi-image upload via Cloudinary',
            'Secure user authentication with JWT sessions',
            'Search, filter, and category browsing for listings',
            'Full transactional flow: list → discover → chat → deal',
        ],
        tech: ['React Native', 'Node.js', 'Firebase', 'TypeScript', 'RESTful API', 'Image Upload'],
        github: 'https://github.com/aashir-athar/Market-Place-App',
        role: 'Solo Developer — Full-stack',
        type: 'Consumer App',
    },
]

export const skills = [
    { category: 'Core Mobile', items: ['React Native', 'Expo SDK 53', 'TypeScript', 'JavaScript (ES6+)'] },
    { category: 'State & Navigation', items: ['Redux Toolkit', 'Expo Router', 'React Navigation', 'Zustand'] },
    { category: 'Backend & Database', items: ['Firebase', 'Node.js', 'Express.js', 'MongoDB', 'SQLite', 'RESTful APIs'] },
    { category: 'Auth & Security', items: ['Clerk (OAuth / MFA)', 'Firebase Auth', 'JWT', 'Biometric Auth'] },
    { category: 'Animation & UI', items: ['Reanimated 3', 'Gesture Handler', 'Figma', 'Adobe XD', 'Material UI'] },
    { category: 'DevOps & Tools', items: ['Fastlane CI/CD', 'GitHub Actions', 'Sentry', 'Flipper', 'JIRA'] },
]

export const experience = [
    {
        role: 'React Native Developer',
        company: '3STechLabs',
        location: 'Remote (United States)',
        period: 'May 2024 – Present',
        current: true,
        achievements: [
            'Delivering complex production features including biometric authentication and real-time data syncing for cross-platform React Native apps',
            'UI/UX enhancements that increased user engagement by 20% within the first 2 months of release',
            'Diagnosed critical production bugs with Flipper + Sentry, improving app stability across both Android and iOS',
        ],
    },
    {
        role: 'Senior React Native Developer',
        company: 'AppGlide Technologies',
        location: 'Remote',
        period: 'June 2023 – April 2024',
        current: false,
        achievements: [
            'Architected and led development of 3 production-grade Expo apps serving 50,000+ active users',
            'Mentored 4 junior developers; cut team onboarding time by 40% through modular coding standards',
            'Designed CI/CD pipelines with Fastlane, reducing deployment errors by 90%',
            'Shipped MVPs within 6–8 weeks; achieved 35% reduction in app load time via lazy loading + nav refactoring',
        ],
    },
    {
        role: 'Junior React Native Developer',
        company: 'TechNova Solutions Inc.',
        location: 'Remote (United States)',
        period: 'Feb 2022 – April 2023',
        current: false,
        achievements: [
            'Improved overall app performance by 25% by reworking data-fetching with async Firebase caching',
            'Deployed multiple consumer apps to App Store and Google Play with zero post-launch crashes',
            'Contributed to Agile ceremonies; consistently delivered features ahead of schedule',
        ],
    },
    {
        role: 'UI/UX & Graphic Designer',
        company: 'W3 Technologies',
        location: 'Remote',
        period: 'Oct 2021 – March 2023',
        current: false,
        achievements: [
            'Translated business requirements into responsive Figma/Adobe XD mockups for mobile-first products',
            'Collaborated with React Native teams to maintain visual consistency across all mobile components',
        ],
    },
]