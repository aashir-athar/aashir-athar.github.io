import type { Project } from '../types'

/* -------------------------------------------------------------------------- *
 *  PROJECTS — seven shipped open-source React Native apps + one in flight.   *
 *                                                                            *
 *  Ordering — 2026 hiring-signal weight, strongest first:                    *
 *    01 Mindees AI                — self-training LLM in TypeScript          *
 *                                   (in development) — DeepSeek-V3-class     *
 *                                   architecture, 5-min self-train loop      *
 *    02 Forest Sentry             — on-device TFLite AI + WWF Pakistan       *
 *    03 xMind                     — flagship social platform, deterministic  *
 *                                   feed ranker, 120fps design system        *
 *    04 FlowMoney                 — privacy-first fintech, SMS auto-ingest,  *
 *                                   trilingual incl. Urdu RTL, Groq AI       *
 *    05 expo-transaction-sms-reader — published npm + Expo native module,    *
 *                                   60+ banks across PK / IN / BD / GCC      *
 *    06 BludStack                 — real-time civic impact, atomic Supabase  *
 *                                   RPCs, ring-by-ring escalation            *
 *    07 Crypto Price Tracker      — sub-second real-time tracker, 500+ pairs *
 *    08 Fuelio                    — offline-first utility, full-tank algo    *
 *                                                                            *
 *  Each entry is verified against the latest GitHub README.                  *
 * -------------------------------------------------------------------------- */

export const projects: Project[] = [
  {
    id: 'mindees-ai',
    name: 'Mindees AI',
    tagline: 'Self-training open-source LLM in TypeScript — DeepSeek-V3-class architecture, gradient-descent every 5 minutes, free to deploy.',
    description:
      'A free, open-source language model that genuinely trains itself every five minutes on its own conversations — not a vendor wrapper, an actual self-improving neural net. The decoder-only transformer is implemented end-to-end in TypeScript with a DeepSeek-V3-class architecture (Mixture of Experts, Multi-head Latent Attention, Multi-Token Prediction), GRPO + DPO + constitutional self-critique, 23 persistent state tensors (mood, user model, relationship, curiosity gap, …) all auditable on a dashboard. LanceDB holds vector memory, Transformers.js runs local classifiers, a 7-deep free-tier fallback chain (Groq + Gemini) handles inference, and 17 connectors (calculator, code-exec, web search, GitHub, arXiv, Wikipedia, …) make it genuinely useful. Single-click Vercel deploy, zero API keys required.',
    features: [
      'Self-training every 5 minutes via AdamW gradient step + eval-gated rollback; metrics in JSONL audit log, regression triggers LoRA checkpoint restore',
      '23 persistent state tensors — mood, user model, relationship, drift fingerprint, theory of mind, sentiment arc — all live and auditable',
      'DeepSeek-V3-class architecture: MoE top-K routing, MLA, MTP, GQA, RoPE, RMSNorm, SwiGLU, speculative decoding, Int8 KV-cache quantization',
      '7-deep free-tier LLM fallback chain (Groq Llama 3.3 70B → 3.1 8B → Gemma2 9B → Gemini 2.5/2.0 Flash) — zero paid API keys required',
      '17 built-in connectors: calculator, code-exec, file-read, web-search, GitHub, Stack Overflow, arXiv, Reddit, HackerNews, dictionary, weather, …',
    ],
    tech: ['TypeScript strict', 'Next.js 16', 'React 19', 'Tailwind v4', 'PyTorch 2.7+', 'LanceDB', 'Transformers.js', 'Vercel Hobby'],
    github: 'https://github.com/aashir-athar/mindeesai',
    accent: '#6366f1',
    accentGlow: 'rgba(99,102,241,0.22)',
    category: 'Self-training LLM',
    inDevelopment: true,
    highlights: [
      { label: 'Architecture', value: 'DeepSeek-V3 class' },
      { label: 'Self-train cadence', value: 'Every 5 min' },
      { label: 'State tensors', value: '23 persistent' },
      { label: 'API keys needed', value: 'Zero' },
    ],
  },
  {
    id: 'forest-sentry',
    name: 'Forest Sentry',
    tagline: 'Offline-first field instrument for forest rangers — on-device TFLite leaf-health AI, GPS tree registry, PostGIS zones.',
    description:
      'A conservation field instrument built with WWF Pakistan. Rangers and researchers capture tree observations and leaf photos in remote forests without connectivity — the app classifies leaf health on-device with a 244 KB PlantVillage MobileNet TFLite model in under a second, logs illegal-logging incidents with GPS and timestamps, and monitors protected zones via PostGIS polygons. Data queues to a local SQLite source-of-truth and drains to Supabase the moment signal returns. An active-learning loop lets operators correct verdicts in the field — corrections retrain MobileNetV2 and ship improved models OTA without an app-store release.',
    features: [
      'On-device TFLite leaf-health classifier — 39 PlantVillage classes folded into a 4-bucket verdict, <1s inference',
      'Offline-first by design: SQLite WAL + expo-file-system, idempotent sync engine drains to Supabase on reconnect',
      'Active-learning loop — operator corrections retrain MobileNetV2, models promote OTA via Supabase, no store release',
      'PostGIS zone monitoring with real-time polygon containment; multi-tree trend projection rendered with Skia',
      'Email-OTP auth, RLS role gating (ranger / researcher), CSV + GeoJSON export, full a11y, TypeScript strict + noUncheckedIndexedAccess',
    ],
    tech: ['React Native 0.81.5', 'Expo SDK 54', 'TypeScript strict', 'react-native-fast-tflite', 'expo-sqlite', 'Supabase + PostGIS', 'Reanimated 4', 'Skia'],
    github: 'https://github.com/aashir-athar/forest-sentry',
    accent: '#22c55e',
    accentGlow: 'rgba(34,197,94,0.2)',
    category: 'Conservation Field Instrument',
    highlights: [
      { label: 'Model Size', value: '244 KB' },
      { label: 'Inference', value: '<1s on-device' },
      { label: 'Connectivity', value: 'Offline-first' },
      { label: 'Partner', value: 'WWF Pakistan' },
    ],
  },
  {
    id: 'xmind',
    name: 'xMind',
    tagline: 'Open-source React Native social platform — deterministic feed ranking, token-driven design system, 120fps animations.',
    description:
      'A full-stack, open-source social network built end-to-end in React Native. The feed is a layered scorer — TF-IDF cosine relevance, exposure decay, MMR diversity rerank, chronological-blend filler, and a per-author cap — deterministic by design, with zero Math.random(). Auth runs through Clerk on mobile with a server-side bridge syncing to MongoDB Atlas, and the UI is a token-driven primitive set (Surface, Text, Button, …) animated by Reanimated 4 worklets at 120fps.',
    features: [
      'Deterministic feed ranker: TF-IDF cosine relevance + exposure decay + MMR diversity + chrono-blend filler + per-author cap',
      'Clerk Expo auth with social sign-in; server-side bridge syncs profile to MongoDB Atlas with row-level guardrails',
      'Token-driven primitive design system — Surface, Text, Button, layouts — 60+ components, all on Reanimated 4 worklets',
      'Global multi-entity search, hashtag trending, threaded comments, real-time notifications, image pipeline via Cloudinary',
      'Rate limiting, XSS hardening, JWT-secured endpoints, and a privacy-respecting data-export path — production-grade defaults',
    ],
    tech: ['React Native 0.81.5', 'Expo SDK 54', 'TypeScript', 'Express.js', 'MongoDB Atlas', 'Clerk Auth', 'Reanimated 4', 'Cloudinary'],
    github: 'https://github.com/aashir-athar/xmind-app',
    accent: '#06b6d4',
    accentGlow: 'rgba(6,182,212,0.2)',
    category: 'Social Platform',
    highlights: [
      { label: 'Feed Ranker', value: 'Deterministic' },
      { label: 'Animation FPS', value: '120fps' },
      { label: 'Auth Provider', value: 'Clerk' },
      { label: 'License', value: 'MIT' },
    ],
  },
  {
    id: 'flowmoney',
    name: 'FlowMoney',
    tagline: 'Privacy-first Pakistani fintech — SMS auto-ingest, on-device ledger, Groq-powered money assistant, fully trilingual.',
    description:
      'A 100% on-device personal finance app for Pakistani users that turns bank-SMS alerts into a structured ledger automatically — no manual entry, no backend, no data leaving the phone. It recognises 30+ Pakistani banks and wallets (HBL, UBL, MCB, Meezan, EasyPaisa, JazzCash, NayaPay, SadaPay), runs a Groq-powered conversational money assistant grounded in local spending data, and ships in three languages including full Urdu RTL. Tuned end-to-end for the 2GB-RAM Android phones most Pakistani users actually carry.',
    features: [
      'Always-on SMS auto-ingest via expo-transaction-sms-reader with confidence-scored parsing — zero manual entry',
      'Background reconciliation through expo-background-fetch so transactions are captured even when the app is force-quit',
      'Groq llama-3.3-70b money assistant grounded in real spending data — privacy-safe summaries, never raw transactions',
      'Subscription detection, behavioural insights, category breakdowns, and multi-layer dedup for dual-SIM retries',
      'Trilingual UI (English · Urdu RTL · Hindi), 2026-era floating Liquid Glass tab bar, tuned for 2GB-RAM Android',
    ],
    tech: ['React Native 0.81', 'Expo SDK 54', 'TypeScript', 'expo-router v6', 'Zustand', 'Reanimated 4', 'AsyncStorage', 'Groq AI'],
    github: 'https://github.com/aashir-athar/FlowMoney',
    accent: '#8b5cf6',
    accentGlow: 'rgba(139,92,246,0.2)',
    category: 'Fintech App',
    highlights: [
      { label: 'Architecture', value: '100% On-Device' },
      { label: 'Banks Supported', value: '30+ PK' },
      { label: 'Languages', value: '3 + RTL' },
      { label: 'AI Assistant', value: 'Groq 70B' },
    ],
  },
  {
    id: 'expo-sms-reader',
    name: 'expo-transaction-sms-reader',
    tagline: 'Published npm package + Expo native module — parses banking SMS into typed transactions across PK, IN, BD, GCC.',
    description:
      'A published npm package and Expo SDK 54 native module that turns raw banking SMS into properly typed transaction objects. Goes well beyond simple SMS access — it handles UPI / IMPS / NEFT / RTGS / ATM / POS / wallet flows, recognises 60+ banks and wallets across Pakistan, India, Bangladesh, and the GCC, disambiguates "Rs" to PKR / INR / LKR / NPR by sender code, and uses a runtime-registered BroadcastReceiver to sidestep Google Play\'s default-SMS-handler policy.',
    features: [
      'Smart classifier (TRANSACTION / OTP / PROMOTIONAL / OTHER) with transparent ~500 LOC TypeScript heuristics',
      '60+ banks and wallets recognised across PK / IN / BD / GCC, with currency disambiguation by sender code',
      'Runtime-registered BroadcastReceiver — avoids Google Play\'s default-handler-only review policy',
      'Reference-counted listeners, OTP autofill, custom parser registration, and aggregation utilities',
      'Cross-platform stubs so iOS and web builds compile cleanly; zero runtime dependencies',
    ],
    tech: ['TypeScript', 'Kotlin', 'Expo Modules API', 'Expo SDK 54', 'New Architecture', 'Android SDK 24+', 'npm'],
    github: 'https://github.com/aashir-athar/expo-transaction-sms-reader',
    demo: 'https://www.npmjs.com/package/expo-transaction-sms-reader',
    accent: '#f97316',
    accentGlow: 'rgba(249,115,22,0.2)',
    category: 'Open-source npm Package',
    highlights: [
      { label: 'Distribution', value: 'Published on npm' },
      { label: 'Banks Parsed', value: '60+' },
      { label: 'Regions', value: 'PK / IN / BD / GCC' },
      { label: 'License', value: 'MIT' },
    ],
  },
  {
    id: 'bludstack',
    name: 'BludStack',
    tagline: 'Real-time blood donation network — expanding geo-fenced rings, atomic donor matching, 90-day cooldown enforced.',
    description:
      'A civic-impact mobile platform that connects blood recipients with eligible donors in real time. Notifications expand in rings — 1 km, 5 km, 15 km, 30 km, 50 km, then nationwide — until N donors accept. Accept / complete operations run through atomic Supabase RPCs so a 5-unit request requires exactly five distinct donors, never four-and-a-half. Mandatory 90-day cooldowns are server-enforced, recipient phone numbers stay hidden behind row-level security until commitment, and killed-state push delivery is tuned per Android OEM (Xiaomi, OnePlus, Realme battery-saver quirks documented).',
    features: [
      'Ring escalation: 1 / 5 / 15 / 30 / 50 km, then nationwide — propagating until N donors accept',
      'Atomic Supabase RPC (accept_blood_request) — no race conditions, no half-fulfilled states',
      '90-day donation cooldown server-enforced; all 8 blood types with full universal-donor/recipient matrix',
      'Live maps, in-app chat, urgency-based request expiry, real-time presence over Supabase channels',
      'Killed-state push delivery via Expo Push with per-OEM Android tuning for Xiaomi / OnePlus / Realme',
    ],
    tech: ['React Native 0.81.5', 'Expo SDK 54', 'TypeScript', 'Supabase (Postgres + RLS)', 'Node.js 20', 'Express', 'react-native-maps'],
    github: 'https://github.com/aashir-athar/BludStack-RN',
    accent: '#f43f5e',
    accentGlow: 'rgba(244,63,94,0.2)',
    category: 'Civic Impact App',
    highlights: [
      { label: 'Ring Tiers', value: '1–50 km + national' },
      { label: 'Cooldown', value: '90 days' },
      { label: 'Operations', value: 'Atomic RPCs' },
      { label: 'License', value: 'MIT' },
    ],
  },
  {
    id: 'crypto-tracker',
    name: 'Crypto Price Tracker',
    tagline: 'Sub-second real-time tracker for USDT-perpetual traders — momentum boards, paper portfolio, threshold alerts.',
    description:
      'A precision instrument for retail traders who watch USDT-perpetual futures on Bitget. It streams hundreds of trading pairs with sub-second tick updates, ranks gainers across three momentum boards (1-minute, 1-hour, funding rate) as ticks arrive, and includes a paper-trading portfolio with live unrealized P/L per position and book-wide. Reanimated 4 worklets run the price-flash on the UI thread, FlashList holds the long lists at 60fps, and AsyncStorage-persisted TanStack Query gives cold starts that open with last-known prices.',
    features: [
      'Sub-second ticker stream across 500+ Bitget USDT-perpetual pairs with per-cell flash on every update',
      'Three momentum boards (1m / 1h / funding rate) recomputed as ticks arrive, ranked by % change',
      'Paper portfolio — entry price + quantity, live per-position and book-wide unrealized P/L',
      'Threshold alerts: 24h percent move + short-window percent + configurable window length, dedup-aware',
      'AsyncStorage-persisted TanStack Query cache — cold starts open with last-known prices, no spinners',
    ],
    tech: ['React Native 0.81.5', 'Expo SDK 54', 'TypeScript strict', 'Expo Router 6', 'Zustand', 'TanStack Query', 'Reanimated 4', 'FlashList'],
    github: 'https://github.com/aashir-athar/Crypto-Price-Tracker',
    accent: '#fbbf24',
    accentGlow: 'rgba(251,191,36,0.2)',
    category: 'Trading Tool',
    highlights: [
      { label: 'Pairs Tracked', value: '500+' },
      { label: 'Refresh', value: '1s + flash' },
      { label: 'Cold Start', value: '<1.5s' },
      { label: 'Lists', value: 'FlashList 60fps' },
    ],
  },
  {
    id: 'fuelio',
    name: 'Fuelio',
    tagline: 'Offline-first vehicle management — statistically correct fuel-economy algorithm, zero cloud, zero ads, zero tracking.',
    description:
      'A 100% offline, privacy-first vehicle management app. Fuel efficiency is computed using the full-tank-window method — the only statistically correct approach, and the same one used by professional fleet software. Service history spans 9 categories, analytics surface cost-per-km and monthly spend, and the app supports multi-currency and multi-unit. All data lives on-device, no network requests are made, and a one-tap wipe clears everything.',
    features: [
      'Full-tank-window fuel-economy algorithm — the only statistically correct method, matching professional fleet software',
      '9 service types with auto-calculated next-due mileage and home-screen reminder cards',
      'Analytics dashboard: avg/best/worst efficiency, cost-per-km, monthly spend bars, efficiency line chart with time filters',
      '100% offline — all data in AsyncStorage, zero network requests, one-tap full-data wipe',
      'Multi-unit (km/mi · L/gal), 7 currencies (USD, EUR, GBP, PKR, AED, SAR, INR), system / light / dark theme',
    ],
    tech: ['React Native', 'Expo SDK 54', 'TypeScript', 'Expo Router', 'Reanimated 4', 'Zustand', 'AsyncStorage', 'Expo Haptics'],
    github: 'https://github.com/aashir-athar/fuelio',
    accent: '#B6F24D',
    accentGlow: 'rgba(182,242,77,0.2)',
    category: 'Utility App',
    highlights: [
      { label: 'Storage', value: '100% Offline' },
      { label: 'Service Types', value: '9' },
      { label: 'Currencies', value: '7' },
      { label: 'Architecture', value: 'New Arch' },
    ],
  },
]
