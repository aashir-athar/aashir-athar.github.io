import { motion, useReducedMotion } from 'framer-motion'

interface PhoneMockupProps {
  accentColor?: string
}

const appScreens = [
  {
    bg: 'linear-gradient(160deg, #0c1f3d 0%, #060910 100%)',
    accent: '#06b6d4',
    label: 'xMind',
    sublabel: 'Social Feed',
    items: ['Trending', 'Replies', 'For You'],
    bar: 72,
  },
  {
    bg: 'linear-gradient(160deg, #1a0a14 0%, #060910 100%)',
    accent: '#f43f5e',
    label: 'BludStack',
    sublabel: 'Donor Map',
    items: ['2 donors nearby', '0.8 km away', 'Urgent: O+'],
    bar: 55,
  },
  {
    bg: 'linear-gradient(160deg, #071a12 0%, #060910 100%)',
    accent: '#10b981',
    label: 'Trade Ease',
    sublabel: 'Marketplace',
    items: ['12 listings', '3 messages', '4.9 rating'],
    bar: 88,
  },
  {
    bg: 'linear-gradient(160deg, #1a2a0a 0%, #060910 100%)',
    accent: '#B6F24D',
    label: 'Fuelio',
    sublabel: 'Vehicle Stats',
    items: ['14.2 km/L', 'Oil due 500km', 'Rs 4,200 spent'],
    bar: 64,
  },
] as const

const SCREEN_HEIGHT = 140
const TOTAL_OFFSETS = appScreens.map((_, i) => -SCREEN_HEIGHT * i)

export default function PhoneMockup({ accentColor = '#06b6d4' }: PhoneMockupProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative h-[520px] w-[260px]">
      {/* Glow blob */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          width: 200,
          height: 200,
          background: `radial-gradient(circle, ${accentColor}33, transparent 70%)`,
        }}
      />

      {/* Phone body */}
      <motion.div
        className={`relative z-[2] mx-auto flex h-[460px] w-[220px] flex-col overflow-hidden rounded-[40px] border-[1.5px] border-white/10 bg-[linear-gradient(160deg,#1a2640_0%,#0c1120_100%)] shadow-[0_32px_80px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] ${
          reduceMotion ? '' : 'animate-float'
        }`}
      >
        {/* Notch */}
        <div className="absolute top-3 left-1/2 z-10 flex h-[22px] w-[70px] -translate-x-1/2 items-center justify-center gap-1.5 rounded-[11px] bg-[#060910]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#1a2640]" />
          <span className="h-1.5 w-10 rounded-[3px] bg-[#1a2640]" />
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-[18px] pt-12 font-mono text-[9px] text-white/50">
          <span>9:41</span>
          <span>●●● 5G 100%</span>
        </div>

        {/* Cycling app screens */}
        <motion.div
          animate={
            reduceMotion
              ? {}
              : { y: [TOTAL_OFFSETS[0], TOTAL_OFFSETS[1], TOTAL_OFFSETS[2], TOTAL_OFFSETS[3], TOTAL_OFFSETS[2], TOTAL_OFFSETS[1], TOTAL_OFFSETS[0]] }
          }
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col"
        >
          {appScreens.map((screen, i) => (
            <div
              key={i}
              className="px-[18px] py-3"
              style={{ minHeight: SCREEN_HEIGHT, background: screen.bg }}
            >
              {/* App header */}
              <div className="mb-2.5 flex items-center gap-2">
                <div
                  className="grid h-7 w-7 place-items-center rounded-lg font-display text-xs font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${screen.accent}, ${screen.accent}88)` }}
                >
                  {screen.label[0]}
                </div>
                <div>
                  <div className="font-display text-[11px] font-bold leading-tight text-white">
                    {screen.label}
                  </div>
                  <div className="font-mono text-[8px]" style={{ color: screen.accent }}>
                    {screen.sublabel}
                  </div>
                </div>
              </div>

              {/* Stats bar */}
              <div className="mb-2 h-[3px] rounded-[2px] bg-white/10">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${screen.bar}%` }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
                  className="h-full rounded-[2px]"
                  style={{ background: `linear-gradient(90deg, ${screen.accent}, ${screen.accent}88)` }}
                />
              </div>

              {/* List */}
              {screen.items.map((item, j) => (
                <div
                  key={j}
                  className="border-b border-white/[0.06] py-1 font-body text-[9px] text-white/60 last:border-b-0"
                >
                  {item}
                </div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 h-1 w-[60px] -translate-x-1/2 rounded-[2px] bg-white/20" />
      </motion.div>

      {/* Floating pills */}
      {[
        {
          text: '60fps Animations',
          color: '#06b6d4',
          gradient: 'rgba(6,182,212,0.18), rgba(139,92,246,0.18)',
          y: [-6, 6, -6] as const,
          x: [3, -3, 3] as const,
          duration: 4,
          delay: 0,
          position: 'top-[80px] right-[-20px]',
        },
        {
          text: 'Enterprise Auth',
          color: '#10b981',
          gradient: 'rgba(16,185,129,0.18), rgba(6,182,212,0.18)',
          y: [5, -5, 5] as const,
          x: [-4, 4, -4] as const,
          duration: 5,
          delay: 1,
          position: 'bottom-[100px] left-[-30px]',
        },
        {
          text: '50K+ Users',
          color: '#f43f5e',
          gradient: 'rgba(244,63,94,0.18), rgba(139,92,246,0.18)',
          y: [-8, 4, -8] as const,
          x: [0, 0, 0] as const,
          duration: 3.5,
          delay: 0.5,
          position: 'bottom-[160px] right-[-24px]',
        },
      ].map(p => (
        <motion.div
          key={p.text}
          animate={reduceMotion ? {} : { y: [...p.y], x: [...p.x] }}
          transition={{ duration: p.duration, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          className={`absolute z-[5] rounded-full border px-3 py-1.5 font-mono text-[10px] whitespace-nowrap backdrop-blur-md ${p.position}`}
          style={{
            background: `linear-gradient(135deg, ${p.gradient})`,
            borderColor: `${p.color}55`,
            color: p.color,
          }}
        >
          {p.text}
        </motion.div>
      ))}
    </div>
  )
}
