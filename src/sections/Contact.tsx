import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CircleCheck } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '../components/SocialIcons'

const socials = [
  { icon: <GithubIcon size={18} />, label: 'GitHub', handle: 'aashir-athar', href: 'https://github.com/aashir-athar', color: '#f0f4ff' },
  { icon: <LinkedinIcon size={18} />, label: 'LinkedIn', handle: 'aashirathar', href: 'https://linkedin.com/in/aashirathar', color: '#0a66c2' },
  { icon: <Mail size={18} />, label: 'Email', handle: 'aashirathar@gmail.com', href: 'mailto:aashirathar@gmail.com', color: '#06b6d4' },
  { icon: <Phone size={18} />, label: 'Phone', handle: '+92 307 477 8889', href: 'tel:+923074778889', color: '#10b981' },
]

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    // Simulate form send — in production, wire to Formspree, EmailJS, or similar
    await new Promise(r => setTimeout(r, 1400))
    setSending(false)
    setSent(true)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSent(false), 5000)
  }

  return (
    <section id="contact" style={{ padding: '120px 24px 80px', position: 'relative' }}>
      {/* bg glow */}
      <div style={{
        position: 'absolute', top: '30%', right: '-100px',
        width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
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
            05 / Let's Talk
          </div>
          <h2 style={{
            fontFamily: 'Syne, sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800, lineHeight: 1.1,
          }}>
            Ready to build{' '}
            <span style={{
              background: 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              something great?
            </span>
          </h2>
          <p style={{
            color: 'var(--text-secondary)', marginTop: '12px',
            maxWidth: '440px', margin: '12px auto 0',
          }}>
            Open to remote roles, freelance projects, and consulting. Let's talk.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '48px',
          alignItems: 'start',
        }}
          className="block md:grid"
        >
          {/* Left: info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ marginBottom: '40px' }}
          >
            <div style={{
              padding: '28px',
              borderRadius: '20px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              marginBottom: '20px',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px',
              }}>
                <span style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: '#10b981', boxShadow: '0 0 10px #10b981',
                }} />
                <span style={{
                  fontFamily: 'DM Mono, monospace', fontSize: '0.72rem',
                  color: '#10b981',
                }}>Available for work</span>
              </div>

              <div style={{
                display: 'flex', gap: '10px', marginBottom: '16px',
                alignItems: 'center',
              }}>
                <MapPin size={14} color="var(--text-muted)" />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Lahore, Pakistan · Remote worldwide
                </span>
              </div>

              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                I'm particularly interested in startups building meaningful mobile experiences,
                senior/lead roles in React Native, and challenging technical problems in mobile architecture.
              </p>
            </div>

            {/* Socials */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {socials.map((s, i) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07 }}
                  whileHover={{ x: 4 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '14px 18px', borderRadius: '12px',
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                    color: 'var(--text-secondary)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = `${s.color}44`
                    el.style.boxShadow = `0 4px 20px ${s.color}15`
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor = 'var(--border)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  <div style={{ color: s.color }}>{s.icon}</div>
                  <div>
                    <div style={{
                      fontFamily: 'Syne, sans-serif', fontWeight: 700,
                      fontSize: '0.8rem', color: 'var(--text-primary)',
                    }}>{s.label}</div>
                    <div style={{
                      fontFamily: 'DM Mono, monospace', fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                    }}>{s.handle}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div style={{
              padding: '32px',
              borderRadius: '20px',
              background: 'var(--surface)',
              border: '1px solid var(--border)',
            }}>
              <h3 style={{
                fontFamily: 'Syne, sans-serif', fontWeight: 800,
                fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '24px',
              }}>Send a message</h3>

              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    justifyContent: 'center', padding: '40px 20px', textAlign: 'center',
                    gap: '16px',
                  }}
                >
                  <CircleCheck size={40} color="#10b981" />
                  <p style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 700,
                    fontSize: '1rem', color: 'var(--text-primary)',
                  }}>Message sent!</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    I'll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {[
                    { id: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@company.com' },
                  ].map(field => (
                    <div key={field.id}>
                      <label htmlFor={field.id} style={{
                        display: 'block', marginBottom: '6px',
                        fontSize: '0.78rem', fontFamily: 'DM Mono, monospace',
                        color: 'var(--text-muted)', textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                      }}>{field.label}</label>
                      <input
                        id={field.id}
                        type={field.type}
                        placeholder={field.placeholder}
                        required
                        value={formData[field.id as 'name' | 'email']}
                        onChange={e => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
                        style={{
                          width: '100%', padding: '12px 16px',
                          borderRadius: '10px',
                          background: 'var(--bg2)',
                          border: '1px solid var(--border)',
                          color: 'var(--text-primary)',
                          fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif',
                          outline: 'none',
                          transition: 'border-color 0.2s',
                        }}
                        onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--border-bright)'}
                        onBlur={e => (e.target as HTMLElement).style.borderColor = 'var(--border)'}
                      />
                    </div>
                  ))}

                  <div>
                    <label htmlFor="message" style={{
                      display: 'block', marginBottom: '6px',
                      fontSize: '0.78rem', fontFamily: 'DM Mono, monospace',
                      color: 'var(--text-muted)', textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}>Message</label>
                    <textarea
                      id="message"
                      placeholder="Tell me about your project, role, or just say hi..."
                      required
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      style={{
                        width: '100%', padding: '12px 16px',
                        borderRadius: '10px',
                        background: 'var(--bg2)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem', fontFamily: 'DM Sans, sans-serif',
                        outline: 'none', resize: 'vertical',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--border-bright)'}
                      onBlur={e => (e.target as HTMLElement).style.borderColor = 'var(--border)'}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={sending}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                      padding: '14px', borderRadius: '12px',
                      background: sending ? 'var(--surface2)' : 'linear-gradient(135deg, #06b6d4, #8b5cf6)',
                      border: 'none', color: 'white', cursor: sending ? 'not-allowed' : 'pointer',
                      fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: '0.9rem',
                      boxShadow: sending ? 'none' : '0 8px 24px rgba(6,182,212,0.25)',
                      transition: 'box-shadow 0.3s',
                    }}
                  >
                    {sending ? (
                      <span style={{ opacity: 0.7 }}>Sending...</span>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p style={{
                    fontSize: '0.72rem', color: 'var(--text-muted)',
                    textAlign: 'center', fontFamily: 'DM Mono, monospace',
                  }}>
                    Or email directly: aashirathar@gmail.com
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
