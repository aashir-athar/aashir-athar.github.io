import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { skills } from '../data/resume'

const categories = ['Core', 'Mobile', 'Backend', 'Auth', 'DevOps', 'Design']

const categoryColors: Record<string, string> = {
  Core: '#06b6d4',
  Mobile: '#8b5cf6',
  Backend: '#10b981',
  Auth: '#f59e0b',
  DevOps: '#f43f5e',
  Design: '#ec4899',
}

const techBadges = [
  { name: 'React Native', color: '#06b6d4', emoji: '📱' },
  { name: 'Expo', color: '#8b5cf6', emoji: '⚡' },
  { name: 'TypeScript', color: '#3178c6', emoji: '🔷' },
  { name: 'Firebase', color: '#f59e0b', emoji: '🔥' },
  { name: 'Supabase', color: '#10b981', emoji: '⚙️' },
  { name: 'Node.js', color: '#68a063', emoji: '🟢' },
  { name: 'MongoDB', color: '#4ea94b', emoji: '🍃' },
  { name: 'Clerk', color: '#7c3aed', emoji: '🔐' },
  { name: 'Fastlane', color: '#f43f5e', emoji: '🚀' },
  { name: 'Figma', color: '#ec4899', emoji: '🎨' },
  { name: 'Git', color: '#f05133', emoji: '📦' },
  { name: 'Reanimated 3', color: '#06b6d4', emoji: '🌀' },
]

export default function Skills() {
  const { ref, inView } = useInView()

  const grouped = categories.map(cat => ({
    category: cat,
    skills: skills.filter(s => s.category === cat),
    color: categoryColors[cat] ?? '#06b6d4',
  }))

  return (
    <section id="skills" style={{ padding: '120px 24px', position: 'relative' }}>
      {/* bg accent */}
      <div style={{
        position: 'absolute', top: '50%', right: '-100px',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '72px' }}
        >
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '4px 14px', borderRadius: '20px',
            background: 'var(--violet-glow)',
            border: '1px solid rgba(139,92,246,0.3)',
            fontSize: '0.72rem', fontFamily: 'DM Mono, monospace',
            color: 'var(--violet)', marginBottom: '20px',
          }}>
            02 / Skills & Tech
          </div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800, lineHeight: 1.1,
          }}>
            Tools of the{' '}
            <span style={{
              background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>trade.</span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)', marginTop: '12px',
            maxWidth: '480px', margin: '12px auto 0',
          }}>
            3+ years deep in the React Native ecosystem. Here's what I use to ship.
          </p>
        </motion.div>

        {/* Skill categories with bars */}
        <div ref={ref} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginBottom: '64px',
        }}>
          {grouped.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: gi * 0.08 }}
              style={{
                padding: '24px',
                borderRadius: '16px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px',
              }}>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: group.color,
                  boxShadow: `0 0 8px ${group.color}`,
                }} />
                <h3 style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700, fontSize: '0.875rem',
                  color: 'var(--text-primary)',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>{group.category}</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      marginBottom: '6px',
                    }}>
                      <span style={{
                        fontSize: '0.825rem',
                        color: 'var(--text-secondary)',
                        fontFamily: 'DM Sans, sans-serif',
                      }}>{skill.name}</span>
                      <span style={{
                        fontSize: '0.75rem',
                        fontFamily: 'DM Mono, monospace',
                        color: group.color,
                      }}>{skill.level}%</span>
                    </div>
                    <div style={{
                      height: '4px', borderRadius: '2px',
                      background: 'rgba(255,255,255,0.06)',
                      overflow: 'hidden',
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1.2, delay: gi * 0.08 + si * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                          height: '100%', borderRadius: '2px',
                          background: `linear-gradient(90deg, ${group.color}, ${group.color}88)`,
                          boxShadow: `0 0 10px ${group.color}55`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tech badge cloud */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p style={{
            textAlign: 'center',
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.7rem',
            color: 'var(--text-muted)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            marginBottom: '20px',
          }}>
            Full Tech Arsenal
          </p>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: '10px',
            justifyContent: 'center',
          }}>
            {techBadges.map((badge, i) => (
              <motion.div
                key={badge.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                whileHover={{ y: -4, scale: 1.06 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  padding: '8px 14px', borderRadius: '10px',
                  background: 'var(--surface)',
                  border: `1px solid ${badge.color}30`,
                  fontSize: '0.8rem',
                  color: 'var(--text-secondary)',
                  cursor: 'default',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = `${badge.color}66`
                  el.style.boxShadow = `0 4px 20px ${badge.color}20`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.borderColor = `${badge.color}30`
                  el.style.boxShadow = 'none'
                }}
              >
                <span>{badge.emoji}</span>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.75rem' }}>{badge.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
