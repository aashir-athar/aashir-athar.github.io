import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, Phone, MapPin, ArrowUpRight, CircleCheck, Copy, Send } from 'lucide-react'
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon, WhatsappIcon } from '../components/SocialIcons'
import { Container, Section, SectionHeader } from '../components/ui'
import LocalTime from '../components/LocalTime'

const ease = [0.16, 1, 0.3, 1] as const
const EMAIL = 'aashirathar@gmail.com'
const PHONE_PRIMARY = '+92 307 477 8889'
const PHONE_PRIMARY_TEL = '+923074778889'
const PHONE_SECONDARY = '+92 325 420 0010'
const PHONE_SECONDARY_TEL = '+923254200010'
/* WhatsApp shares the primary mobile number — wa.me requires no leading '+'. */
const WHATSAPP_WA_ME = PHONE_PRIMARY_TEL.replace(/^\+/, '')

const channels = [
  { icon: <GithubIcon size={16} />,    label: 'GitHub',         handle: 'aashir-athar',  href: 'https://github.com/aashir-athar',       color: 'var(--ink)' },
  { icon: <LinkedinIcon size={16} />,  label: 'LinkedIn',       handle: 'aashirathar',   href: 'https://linkedin.com/in/aashirathar',   color: '#0a66c2' },
  { icon: <XIcon size={14} />,         label: 'X',              handle: '@aashirathar',  href: 'https://x.com/aashirathar',              color: 'var(--ink)' },
  { icon: <InstagramIcon size={16} />, label: 'Instagram',      handle: '@aashirathar',  href: 'https://instagram.com/aashirathar',      color: '#e1306c' },
  { icon: <Mail size={16} />,          label: 'Email',          handle: EMAIL,           href: `mailto:${EMAIL}`,                        color: 'var(--cyan)' },
  { icon: <Phone size={16} />,         label: 'Mobile',         handle: PHONE_PRIMARY,   href: `tel:${PHONE_PRIMARY_TEL}`,               color: 'var(--emerald)' },
  { icon: <Phone size={16} />,         label: 'Mobile (alt)',   handle: PHONE_SECONDARY, href: `tel:${PHONE_SECONDARY_TEL}`,             color: 'var(--emerald)' },
  { icon: <WhatsappIcon size={16} />,  label: 'WhatsApp',       handle: PHONE_PRIMARY,   href: `https://wa.me/${WHATSAPP_WA_ME}`,        color: '#25d366' },
]

/* -------------------------------------------------------------------------- *
 *  CONTACT — single confident panel.                                          *
 *                                                                             *
 *  Two columns inside one rounded card:                                       *
 *   - Left: positioning + availability + channel list (now 7 channels).       *
 *   - Right: 3-field form. Submitting opens the user's mail app via mailto:   *
 *     so the "no backend, no tracking" promise holds.                         *
 * -------------------------------------------------------------------------- */

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [opened, setOpened] = useState(false)
  const [copied, setCopied] = useState(false)
  const reduceMotion = useReducedMotion()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Project inquiry from ${formData.name || 'a visitor'}`)
    const body = encodeURIComponent(
      `Hi Aashir,\n\n${formData.message}\n\n— ${formData.name}\n${formData.email}`,
    )
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`
    setOpened(true)
    window.setTimeout(() => setOpened(false), 6000)
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      /* clipboard unavailable — silent. */
    }
  }

  return (
    <Section id="contact" aria-labelledby="contact-heading">
      <Container>
        <SectionHeader
          index="06"
          eyebrow="Contact"
          accent="cyan"
          id="contact-heading"
          title={
            <>
              Got something to ship?{' '}
              <span className="serif-italic text-[color:var(--cyan)]">Let's</span>{' '}
              <span className="gradient-text">make it move.</span>
            </>
          }
          description="Open to senior and lead React Native roles, freelance engagements, and consulting on mobile architecture. Replies within 24 hours — usually faster. Pakistan-based, working US and EU time-zones."
        />

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease }}
          className="relative overflow-hidden rounded-3xl border border-[color:var(--line)] bg-[color:var(--surface)] shadow-[var(--shadow-card)]"
        >
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--cyan),var(--violet),transparent)]"
          />

          <div className="grid gap-0 md:grid-cols-12">
            {/* ===== LEFT — positioning + channels ===== */}
            <div className="border-b border-[color:var(--line)] p-6 sm:p-8 md:col-span-5 md:border-r md:border-b-0">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-[rgba(16,185,129,0.30)] bg-[rgba(16,185,129,0.10)] px-3 py-1 font-mono text-[0.72rem] text-[color:var(--emerald)]">
                  <span
                    aria-hidden="true"
                    className="relative h-1.5 w-1.5 rounded-full bg-[color:var(--emerald)] shadow-[0_0_8px_var(--emerald)]"
                  />
                  Currently available
                </span>
                <LocalTime />
              </div>

              <p className="mt-7 inline-flex items-center gap-2.5 text-[0.95rem] text-[color:var(--ink-muted)]">
                <MapPin size={14} aria-hidden="true" className="text-[color:var(--ink-faint)]" />
                Lahore, Pakistan · Remote worldwide
              </p>

              <p className="mt-5 max-w-md text-[0.97rem] leading-[1.78] text-[color:var(--ink-muted)]">
                <span className="font-semibold text-[color:var(--ink)]">Best fit:</span>{' '}
                teams building consumer mobile products at scale — where architecture and
                performance decide whether the product survives month six.
              </p>

              {/* Quick-copy email — primary contact */}
              <button
                type="button"
                onClick={copyEmail}
                aria-label="Copy email address to clipboard"
                className="group mt-7 flex min-h-[3rem] w-full items-center justify-between rounded-xl border border-[color:var(--line-bright)] bg-[color:var(--surface-2)] px-4 py-4 text-left text-[0.95rem] text-[color:var(--ink)] transition-colors hover:border-[color:var(--cyan)] focus-visible:border-[color:var(--cyan)]"
              >
                <span className="flex min-w-0 items-center gap-2.5">
                  <Mail size={15} className="text-[color:var(--cyan)]" aria-hidden="true" />
                  <span className="truncate">{EMAIL}</span>
                </span>
                <span
                  className={`flex flex-shrink-0 items-center gap-1.5 font-mono text-[0.72rem] ${
                    copied ? 'text-[color:var(--emerald)]' : 'text-[color:var(--ink-faint)]'
                  }`}
                >
                  {copied ? <CircleCheck size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
                  {copied ? 'Copied' : 'Copy'}
                </span>
              </button>

              {/* Channels list — 7 channels including X, Instagram, WhatsApp */}
              <ul className="mt-3 space-y-2">
                {channels.map((c, i) => (
                  <motion.li
                    key={c.label}
                    initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.04 * i, duration: 0.5, ease }}
                  >
                    <a
                      href={c.href}
                      target={c.href.startsWith('http') ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={`${c.label}: ${c.handle}`}
                      className="group flex min-h-[3rem] items-center justify-between rounded-xl border border-[color:var(--line)] bg-[color:var(--surface)] px-4 py-3 text-[color:var(--ink-muted)] no-underline transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[color:var(--line-strong)] focus-visible:border-[color:var(--cyan)]"
                    >
                      <span className="flex min-w-0 items-center gap-3.5">
                        <span style={{ color: c.color }} className="flex-shrink-0">{c.icon}</span>
                        <span className="min-w-0">
                          <span className="block font-display text-[0.85rem] font-semibold text-[color:var(--ink)]">
                            {c.label}
                          </span>
                          <span className="block truncate break-all font-mono text-[0.72rem] text-[color:var(--ink-faint)]">
                            {c.handle}
                          </span>
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        size={16}
                        className="flex-shrink-0 text-[color:var(--ink-faint)] transition-transform duration-500 [transition-timing-function:var(--ease-signature)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* ===== RIGHT — form ===== */}
            <div className="p-6 sm:p-8 md:col-span-7 md:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-display text-[1.4rem] font-bold tracking-[-0.02em] text-[color:var(--ink)] sm:text-[1.55rem]">
                  Send a message
                </h3>
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-[color:var(--ink-faint)]">
                  No backend · No tracking
                </span>
              </div>
              <p className="mt-2.5 text-[0.88rem] text-[color:var(--ink-muted)]">
                Submitting opens a draft in your email app. If your client is unusual,
                copy the address above and email me directly.
              </p>

              {opened ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-7 flex flex-col items-start gap-3 rounded-xl border border-[rgba(16,185,129,0.30)] bg-[rgba(16,185,129,0.06)] p-5"
                >
                  <CircleCheck size={26} className="text-[color:var(--emerald)]" aria-hidden="true" />
                  <p className="font-display text-base font-semibold text-[color:var(--ink)]">
                    Email draft opened.
                  </p>
                  <p className="text-[0.88rem] text-[color:var(--ink-muted)]">
                    If nothing happened, copy {EMAIL} above and email me directly.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                  {(['name', 'email'] as const).map(id => (
                    <label key={id} className="block">
                      <span className="font-mono text-[0.72rem] uppercase tracking-[0.10em] text-[color:var(--ink-muted)]">
                        {id === 'name' ? 'Your name' : 'Email address'}
                      </span>
                      <input
                        id={id}
                        type={id === 'email' ? 'email' : 'text'}
                        required
                        autoComplete={id === 'name' ? 'name' : 'email'}
                        placeholder={id === 'name' ? 'Jane Doe' : 'jane@company.com'}
                        value={formData[id]}
                        onChange={e => setFormData(prev => ({ ...prev, [id]: e.target.value }))}
                        className="mt-2 min-h-[3rem] w-full rounded-lg border border-[color:var(--line)] bg-[color:var(--bg-elev)] px-4 py-3 text-base text-[color:var(--ink)] outline-none transition-colors placeholder:text-[color:var(--ink-faint)] focus:border-[color:var(--cyan)]"
                      />
                    </label>
                  ))}

                  <label className="block">
                    <span className="font-mono text-[0.72rem] uppercase tracking-[0.10em] text-[color:var(--ink-muted)]">
                      Tell me about it
                    </span>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      placeholder="What you're building, the role, the timeline — or just say hello."
                      value={formData.message}
                      onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="mt-2 w-full resize-y rounded-lg border border-[color:var(--line)] bg-[color:var(--bg-elev)] px-4 py-3 text-base text-[color:var(--ink)] outline-none transition-colors placeholder:text-[color:var(--ink-faint)] focus:border-[color:var(--cyan)]"
                    />
                  </label>

                  <button type="submit" className="btn-primary group w-full sm:w-auto">
                    <Send size={16} aria-hidden="true" />
                    Open email draft
                  </button>

                  <p className="font-mono text-[0.72rem] text-[color:var(--ink-faint)]">
                    Replies typically within 24 hours.
                  </p>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
