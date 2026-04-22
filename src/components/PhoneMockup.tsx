import { motion } from 'framer-motion'

interface PhoneMockupProps {
  accentColor?: string
}

const appScreens = [
  {
    bg: 'linear-gradient(160deg, #0c1f3d 0%, #060910 100%)',
    accent: '#06b6d4',
    label: 'xMind',
    sublabel: 'Social Feed',
    items: ['🔥 Trending', '💬 Replies', '✨ For You'],
    bar: 72,
  },
  {
    bg: 'linear-gradient(160deg, #1a0a14 0%, #060910 100%)',
    accent: '#f43f5e',
    label: 'BludStack',
    sublabel: 'Donor Map',
    items: ['🩸 2 donors nearby', '📍 0.8 km away', '🔔 Urgent: O+'],
    bar: 55,
  },
  {
    bg: 'linear-gradient(160deg, #071a12 0%, #060910 100%)',
    accent: '#10b981',
    label: 'Trade Ease',
    sublabel: 'Marketplace',
    items: ['📦 12 listings', '💬 3 messages', '⭐ 4.9 rating'],
    bar: 88,
  },
  {
    bg: 'linear-gradient(160deg, #1a2a0a 0%, #060910 100%)',
    accent: '#B6F24D',
    label: 'Fuelio',
    sublabel: 'Vehicle Stats',
    items: ['⛽ 14.2 km/L', '🔧 Oil due 500km', '💰 Rs 4,200 spent'],
    bar: 64,
  },
]

export default function PhoneMockup({ accentColor = '#06b6d4' }: PhoneMockupProps) {
  return (
    <div style={{ position: 'relative', width: '260px', height: '520px' }}>
      {/* Glow blob */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px', height: '200px',
        borderRadius: '50%',
        background: `radial-gradient(circle, ${accentColor}33, transparent 70%)`,
        filter: 'blur(40px)',
        zIndex: 0,
      }} />

      {/* Main phone */}
      <motion.div
        className="animate-float"
        style={{
          position: 'relative',
          zIndex: 2,
          width: '220px',
          height: '460px',
          borderRadius: '40px',
          background: 'linear-gradient(160deg, #1a2640 0%, #0c1120 100%)',
          border: '1.5px solid rgba(255,255,255,0.12)',
          boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)`,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
        }}
      >
        {/* Notch */}
        <div style={{
          position: 'absolute', top: '12px', left: '50%',
          transform: 'translateX(-50%)',
          width: '70px', height: '22px',
          borderRadius: '11px',
          background: '#060910',
          zIndex: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#1a2640' }} />
          <div style={{ width: '40px', height: '6px', borderRadius: '3px', background: '#1a2640' }} />
        </div>

        {/* Status bar */}
        <div style={{
          padding: '48px 18px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontSize: '9px', color: 'rgba(255,255,255,0.5)',
          fontFamily: 'DM Mono, monospace',
        }}>
          <span>9:41</span>
          <span>●●● 5G 100%</span>
        </div>

        {/* Cycling app screens */}
        <motion.div
          animate={{ y: [0, -140, -280, -280, -140, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          {appScreens.map((screen, i) => (
            <div key={i} style={{
              minHeight: '140px', padding: '12px 18px',
              background: screen.bg,
            }}>
              {/* App header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px',
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '8px',
                  background: `linear-gradient(135deg, ${screen.accent}, ${screen.accent}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '12px', fontWeight: 700, color: 'white',
                  fontFamily: 'Syne, sans-serif',
                }}>
                  {screen.label[0]}
                </div>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 700, color: 'white', fontFamily: 'Syne, sans-serif', lineHeight: 1.2 }}>{screen.label}</div>
                  <div style={{ fontSize: '8px', color: screen.accent, fontFamily: 'DM Mono, monospace' }}>{screen.sublabel}</div>
                </div>
              </div>

              {/* Stats bar */}
              <div style={{ marginBottom: '8px' }}>
                <div style={{
                  height: '3px', borderRadius: '2px',
                  background: 'rgba(255,255,255,0.08)',
                }}>
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${screen.bar}%` }}
                    transition={{ delay: 0.5 + i * 0.2, duration: 1 }}
                    style={{
                      height: '100%', borderRadius: '2px',
                      background: `linear-gradient(90deg, ${screen.accent}, ${screen.accent}88)`,
                    }}
                  />
                </div>
              </div>

              {/* List items */}
              {screen.items.map((item, j) => (
                <div key={j} style={{
                  fontSize: '9px', color: 'rgba(255,255,255,0.6)',
                  padding: '3px 0',
                  borderBottom: j < screen.items.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  fontFamily: 'DM Sans, sans-serif',
                }}>{item}</div>
              ))}
            </div>
          ))}
        </motion.div>

        {/* Home indicator */}
        <div style={{
          position: 'absolute', bottom: '8px', left: '50%',
          transform: 'translateX(-50%)',
          width: '60px', height: '4px', borderRadius: '2px',
          background: 'rgba(255,255,255,0.2)',
        }} />
      </motion.div>

      {/* Floating pills */}
      <motion.div
        animate={{ y: [-6, 6, -6], x: [3, -3, 3] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'absolute', top: '80px', right: '-20px', zIndex: 5,
          background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(139,92,246,0.15))',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(6,182,212,0.3)',
          borderRadius: '20px', padding: '6px 12px',
          fontSize: '10px', fontFamily: 'DM Mono, monospace',
          color: '#06b6d4', whiteSpace: 'nowrap',
        }}
      >
        ⚡ 60fps Animations
      </motion.div>

      <motion.div
        animate={{ y: [5, -5, 5], x: [-4, 4, -4] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        style={{
          position: 'absolute', bottom: '100px', left: '-30px', zIndex: 5,
          background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.15))',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: '20px', padding: '6px 12px',
          fontSize: '10px', fontFamily: 'DM Mono, monospace',
          color: '#10b981', whiteSpace: 'nowrap',
        }}
      >
        🛡️ Enterprise Auth
      </motion.div>

      <motion.div
        animate={{ y: [-8, 4, -8] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
        style={{
          position: 'absolute', bottom: '160px', right: '-24px', zIndex: 5,
          background: 'linear-gradient(135deg, rgba(244,63,94,0.15), rgba(139,92,246,0.15))',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(244,63,94,0.3)',
          borderRadius: '20px', padding: '6px 12px',
          fontSize: '10px', fontFamily: 'DM Mono, monospace',
          color: '#f43f5e', whiteSpace: 'nowrap',
        }}
      >
        📍 50K+ Users
      </motion.div>
    </div>
  )
}
