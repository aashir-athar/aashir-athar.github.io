import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { experience, education, certifications } from '../data/resume'
import { MapPin, ExternalLink, GraduationCap, Award } from 'lucide-react'

const companyColors: Record<string, string> = {
  '3STechLabs': '#06b6d4',
  'AppGlide Technologies': '#8b5cf6',
  'TechNova Solutions Inc.': '#10b981',
  'W3 Technologies': '#f59e0b',
}

export default function Experience() {
  const { ref, inView } = useInView()

  return (
    <section id="experience" style={{ padding: '120px 24px', position: 'relative' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
            background: 'var(--cyan-glow)',
            border: '1px solid var(--border-bright)',
            fontSize: '0.72rem', fontFamily: 'DM Mono, monospace',
            color: 'var(--cyan)', marginBottom: '20px',
          }}>
            04 / Experience & Education
          </div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800, lineHeight: 1.1,
          }}>
            3 years.{' '}
            <span style={{
              background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Shipped. Scaled. Led.
            </span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '48px',
          alignItems: 'start',
        }}
          ref={ref}
          className="block md:grid"
        >
          {/* Left: Timeline */}
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px',
            }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '8px',
                background: 'var(--cyan-glow)', border: '1px solid var(--border-bright)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ExternalLink size={13} color="var(--cyan)" />
              </div>
              <h3 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 700,
                fontSize: '0.9rem', color: 'var(--text-primary)',
                textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>Work Experience</h3>
            </div>

            <div style={{ position: 'relative', paddingLeft: '20px' }}>
              {/* Timeline line */}
              <div style={{
                position: 'absolute', left: '0', top: '10px',
                width: '1px', height: 'calc(100% - 20px)',
                background: 'linear-gradient(to bottom, var(--cyan), var(--violet), transparent)',
                opacity: 0.3,
              }} />

              {experience.map((exp, i) => {
                const color = companyColors[exp.company] ?? '#06b6d4'
                return (
                  <motion.div
                    key={`${exp.company}-${i}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    style={{
                      position: 'relative',
                      paddingBottom: i < experience.length - 1 ? '36px' : '0',
                    }}
                  >
                    {/* Timeline dot */}
                    <div style={{
                      position: 'absolute', left: '-24px', top: '4px',
                      width: '8px', height: '8px', borderRadius: '50%',
                      background: color,
                      boxShadow: `0 0 8px ${color}`,
                    }} />

                    <div style={{
                      padding: '20px 24px',
                      borderRadius: '14px',
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      transition: 'border-color 0.3s',
                    }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = `${color}44`}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'}
                    >
                      {/* Header row */}
                      <div style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px',
                        marginBottom: '4px',
                      }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <h4 style={{
                              fontFamily: 'Syne, sans-serif', fontWeight: 700,
                              fontSize: '1rem', color: 'var(--text-primary)',
                            }}>{exp.role}</h4>
                            {exp.current && (
                              <span style={{
                                padding: '2px 8px', borderRadius: '10px',
                                background: 'rgba(16,185,129,0.1)',
                                border: '1px solid rgba(16,185,129,0.25)',
                                fontSize: '0.65rem', fontFamily: 'DM Mono, monospace',
                                color: '#10b981',
                              }}>Current</span>
                            )}
                          </div>
                          <div style={{
                            fontSize: '0.85rem', color: color,
                            fontWeight: 600, fontFamily: 'DM Sans, sans-serif',
                          }}>{exp.company}</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{
                            fontSize: '0.72rem', fontFamily: 'DM Mono, monospace',
                            color: 'var(--text-muted)',
                          }}>{exp.period}</div>
                          <div style={{
                            fontSize: '0.72rem', color: 'var(--text-muted)',
                            display: 'flex', alignItems: 'center', gap: '4px',
                            justifyContent: 'flex-end', marginTop: '2px',
                          }}>
                            <MapPin size={10} />
                            {exp.location}
                          </div>
                        </div>
                      </div>

                      {/* Bullets */}
                      <ul style={{ listStyle: 'none', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {exp.bullets.map((b, bi) => (
                          <li key={bi} style={{
                            display: 'flex', gap: '8px', alignItems: 'flex-start',
                            fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6,
                          }}>
                            <span style={{
                              marginTop: '6px', flexShrink: 0,
                              width: '4px', height: '4px', borderRadius: '50%',
                              background: color,
                            }} />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Right: Education + Certs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '40px' }}
            className="mt-10 md:mt-0"
          >
            {/* Education */}
            <div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px',
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '8px',
                  background: 'var(--violet-glow)', border: '1px solid rgba(139,92,246,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <GraduationCap size={13} color="var(--violet)" />
                </div>
                <h3 style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: 700,
                  fontSize: '0.9rem', color: 'var(--text-primary)',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>Education</h3>
              </div>

              {education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.08 }}
                  style={{
                    padding: '18px 20px', borderRadius: '12px',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                  }}
                >
                  <div style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 700,
                    fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '4px',
                  }}>{edu.degree}</div>
                  <div style={{
                    fontSize: '0.8rem', color: 'var(--violet)',
                    fontWeight: 600, marginBottom: '4px',
                  }}>{edu.institution}</div>
                  <div style={{
                    fontSize: '0.72rem', fontFamily: 'DM Mono, monospace',
                    color: 'var(--text-muted)',
                  }}>{edu.period}</div>
                </motion.div>
              ))}
            </div>

            {/* Certifications */}
            <div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px',
              }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '8px',
                  background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Award size={13} color="#f59e0b" />
                </div>
                <h3 style={{
                  fontFamily: 'Syne, sans-serif', fontWeight: 700,
                  fontSize: '0.9rem', color: 'var(--text-primary)',
                  textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>Certifications</h3>
              </div>

              {certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                  style={{
                    padding: '16px 20px', borderRadius: '12px',
                    background: 'var(--surface)', border: '1px solid var(--border)',
                    marginBottom: i < certifications.length - 1 ? '12px' : '0',
                  }}
                >
                  <div style={{
                    fontFamily: 'DM Sans, sans-serif', fontWeight: 600,
                    fontSize: '0.82rem', color: 'var(--text-primary)', marginBottom: '4px',
                  }}>{cert.name}</div>
                  <div style={{
                    fontSize: '0.75rem', color: '#f59e0b', marginBottom: '4px',
                  }}>{cert.issuer}</div>
                  <div style={{
                    fontSize: '0.7rem', fontFamily: 'DM Mono, monospace',
                    color: 'var(--text-muted)',
                  }}>{cert.year}</div>
                </motion.div>
              ))}
            </div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{
                padding: '20px', borderRadius: '14px',
                background: 'linear-gradient(135deg, var(--cyan-glow), var(--violet-glow))',
                border: '1px solid var(--border-bright)',
              }}
            >
              <div style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 700,
                fontSize: '0.75rem', color: 'var(--cyan)',
                textTransform: 'uppercase', letterSpacing: '0.1em',
                marginBottom: '16px',
              }}>Career Highlights</div>
              {[
                { label: 'Users Served', value: '50K+' },
                { label: 'Crash Rate', value: '0 post-launch' },
                { label: 'Load Time ↓', value: '35%' },
                { label: 'Deployment errors ↓', value: '90%' },
              ].map(s => (
                <div key={s.label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '6px 0',
                  borderBottom: '1px solid var(--border)',
                }}>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.label}</span>
                  <span style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 700,
                    fontSize: '0.85rem', color: 'var(--text-primary)',
                  }}>{s.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
