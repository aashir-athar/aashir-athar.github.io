import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { Smartphone, Zap, Users, Code } from "lucide-react"

const pillars = [
  { icon: <Smartphone size={20} />, title: 'Mobile-First', body: 'Every line of code written with the mobile UX in mind — smooth, responsive, and intuitive on both iOS and Android.', accent: '#06b6d4' },
  { icon: <Zap size={20} />, title: 'Performance Obsessed', body: '35% faster load times, 60fps animations, and zero post-launch crashes — performance is a feature, not an afterthought.', accent: '#f59e0b' },
  { icon: <Users size={20} />, title: 'Team Leader', body: 'Mentored 4 junior developers and led cross-functional teams to ship MVPs within 6–8 weeks at AppGlide Technologies.', accent: '#8b5cf6' },
  { icon: <Code size={20} />, title: 'Full-Stack Capable', body: 'Backend in Node.js/Express, databases in MongoDB, Supabase & Firebase — I own the full stack when needed.', accent: '#10b981' },
]

function PillarCard({ p, i, inView }: { p: typeof pillars[0]; i: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
      whileHover={{ y: -4 }}
      className="pillar-card"
      style={{
        borderRadius: '16px',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        transition: 'border-color 0.3s',
        display: 'flex',
        flexDirection: 'column',
        // Height is controlled by the row wrapper via CSS, not here
      }}
    >
      <div style={{
        width: '40px', height: '40px', borderRadius: '10px',
        background: `${p.accent}18`, border: `1px solid ${p.accent}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: p.accent, marginBottom: '12px', flexShrink: 0,
      }}>
        {p.icon}
      </div>
      <h3 style={{
        fontFamily: 'Syne, sans-serif', fontWeight: 700,
        fontSize: '0.9rem', color: 'var(--text-primary)',
        marginBottom: '8px', flexShrink: 0,
      }}>{p.title}</h3>
      <p style={{
        fontSize: '0.78rem', color: 'var(--text-muted)',
        lineHeight: 1.7, flex: 1,
      }}>{p.body}</p>
    </motion.div>
  )
}

export default function About() {
  const { ref, inView } = useInView()

  return (
    <section id="about" style={{ position: 'relative' }}>
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '1px', height: '80px',
        background: 'linear-gradient(to bottom, transparent, var(--cyan), transparent)',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="about-grid" ref={ref}>

          {/* Left: Bio */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
            >
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '4px 14px', borderRadius: '20px',
                background: 'var(--cyan-glow)', border: '1px solid var(--border-bright)',
                fontSize: '0.72rem', fontFamily: 'DM Mono, monospace',
                color: 'var(--cyan)', marginBottom: '20px',
              }}>
                01 / About Me
              </div>
              <h2 style={{
                fontFamily: 'Syne, sans-serif',
                fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                fontWeight: 800, lineHeight: 1.1, marginBottom: '24px',
              }}>
                Building apps that{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}>people actually use.</span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                  I'm a Senior React Native developer based in Lahore, Pakistan, with over 3 years of experience
                  architecting and shipping cross-platform mobile applications. I've led development across teams
                  serving <strong style={{ color: 'var(--text-primary)' }}>50,000+ active users</strong> in the US and Pakistan.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                  My craft sits at the intersection of mobile engineering and product thinking — I care as much about
                  the smoothness of an animation as I do about the architecture that makes it possible. I've reduced
                  app load times by <strong style={{ color: 'var(--text-primary)' }}>35%</strong>, built CI/CD pipelines
                  that cut deployment errors by <strong style={{ color: 'var(--text-primary)' }}>90%</strong>, and
                  mentored junior developers into confident engineers.
                </p>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}>
                  When I'm not deep in Expo or wiring up Supabase, I'm building open-source tools that solve
                  real problems — from mindful social networking to real-time blood donor matching.
                </p>
              </div>
              <motion.a
                href="#contact"
                onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  marginTop: '28px', padding: '12px 24px', borderRadius: '10px',
                  border: '1px solid var(--border-bright)', color: 'var(--cyan)',
                  textDecoration: 'none', fontFamily: 'Syne, sans-serif',
                  fontWeight: 700, fontSize: '0.875rem', background: 'var(--cyan-glow)',
                }}
              >
                Let's work together →
              </motion.a>
            </motion.div>
          </div>

          {/* Right: Pillars — 2 rows × 2 cols, perfectly equal */}
          {/*
            Layout strategy:
            - Outer = flex column (2 rows)
            - Each row = flex row with 2 children, each exactly 50% - half-gap
            - No grid, no framer wrappers interfering with width calculation
            - Both cards in a row are same height via alignItems: stretch on the row
          */}
          <div className="pillars-outer">
            {/* Row 1 */}
            <div className="pillars-row">
              <PillarCard p={pillars[0]} i={0} inView={inView} />
              <PillarCard p={pillars[1]} i={1} inView={inView} />
            </div>
            {/* Row 2 */}
            <div className="pillars-row">
              <PillarCard p={pillars[2]} i={2} inView={inView} />
              <PillarCard p={pillars[3]} i={3} inView={inView} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
