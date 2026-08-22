'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

import { siteConfig } from '@/lib/site-config'

/**
 * Google Apps Script Web App endpoint.
 *
 * Michele deploys the script in `content/setup/contact-popup-google-apps-script.js`
 * as a Web App and pastes the resulting `/exec` URL here (or sets
 * NEXT_PUBLIC_CONTACT_SCRIPT_URL in Vercel, which wins over this constant).
 * Full walkthrough: `content/setup/contact-popup-setup.md`.
 */
const SCRIPT_URL_PLACEHOLDER = 'YOUR_APPS_SCRIPT_URL_HERE'
const SCRIPT_URL =
  process.env.NEXT_PUBLIC_CONTACT_SCRIPT_URL || SCRIPT_URL_PLACEHOLDER
/** False until Michele pastes the deployed URL in. Drives the mailto fallback. */
const CONFIGURED = Boolean(SCRIPT_URL) && SCRIPT_URL !== SCRIPT_URL_PLACEHOLDER

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
/** At least 7 digits once punctuation is stripped. Keeps international formats. */
const PHONE_DIGITS_RE = /\d/g

type Status = 'idle' | 'submitting' | 'done' | 'error'

/**
 * `value` is what lands in the sheet and the email subject; `label` is the
 * shorter text on the chip so all six options fit on a 375px screen without
 * scrolling.
 */
const CATEGORIES = [
  { value: 'Speaking engagement', label: 'Speaking engagement' },
  { value: 'Brave Purpose Author Method (coaching)', label: 'Author Method coaching' },
  { value: 'Nonprofit consulting', label: 'Nonprofit consulting' },
  { value: 'Media, interview, or podcast', label: 'Media or podcast' },
  { value: 'Bulk order or curriculum inquiry', label: 'Bulk or curriculum order' },
  { value: 'Something else', label: 'Something else' },
] as const

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

/**
 * Sitewide contact popup.
 *
 * Opened by the "Contact" button in `SiteHeader`, which owns the open/close
 * state. The whole page behind is dimmed and blurred so the form is the only
 * thing in focus, matching the pattern Brett pointed at on createchurchmedia.com.
 *
 * Layout is deliberately compact: on a 375px phone every control (heading, the
 * six category chips, all six fields, and Send) sits above the fold so nobody
 * has to scroll to submit. The dialog still carries a max-height overflow as a
 * safety valve for very small viewports or large browser text settings, so
 * content is never clipped outright.
 *
 * Accessibility is handled by hand, matching `JoinWaitListModal`: role="dialog"
 * + aria-modal, focus moved in on open and restored to the trigger on close, a
 * Tab focus trap, Escape and backdrop click to close, a real radio group inside
 * a fieldset (so arrow keys work), and a polite live region for errors.
 *
 * Submission posts JSON to a Google Apps Script Web App. The Content-Type is
 * text/plain on purpose: it is CORS-safelisted, so the browser skips the
 * preflight OPTIONS request that Apps Script cannot answer. The script reads
 * the raw body and parses it as JSON.
 */
export function ContactPopup({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)

  const [mounted, setMounted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [category, setCategory] = useState<string>(CATEGORIES[0].value)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [organization, setOrganization] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => setMounted(true), [])

  // Reset the form each time the popup is opened.
  useEffect(() => {
    if (!open) return
    setStatus('idle')
    setError(null)
    setCategory(CATEGORIES[0].value)
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
    setOrganization('')
    setMessage('')
  }, [open])

  // Focus management, Escape/Tab handling, and scroll lock while open.
  useEffect(() => {
    if (!open) return
    const trigger = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      const dialog = dialogRef.current
      // Land on the first text field so a keyboard user starts typing right
      // away; the category group already has a sensible default selected.
      const target =
        dialog?.querySelector<HTMLElement>('input[type="text"]:not([tabindex="-1"])') ??
        dialog?.querySelector<HTMLElement>('button')
      target?.focus()
    }, 20)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab') return
      const dialog = dialogRef.current
      if (!dialog) return
      // The honeypot input carries tabindex="-1", so it stays out of the cycle.
      const els = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]):not([tabindex="-1"]), textarea:not([disabled])',
        ),
      )
      if (!els.length) return
      const first = els[0]
      const last = els[els.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (e.shiftKey && active === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      } else if (active && !dialog.contains(active)) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.clearTimeout(focusTimer)
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      trigger?.focus?.()
    }
  }, [open, onClose])

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    // Honeypot: bots fill this, real people never see it.
    const honey = (
      event.currentTarget.elements.namedItem('company') as HTMLInputElement | null
    )?.value
    if (honey) {
      setStatus('done')
      return
    }

    const fn = firstName.trim()
    const ln = lastName.trim()
    const em = email.trim()
    const ph = phone.trim()

    if (!fn || !ln) {
      setError('Enter your first and last name.')
      return
    }
    if (!EMAIL_RE.test(em)) {
      setError('Enter a valid email address.')
      return
    }
    if ((ph.match(PHONE_DIGITS_RE) || []).length < 7) {
      setError('Enter a phone number Michele can reach you on.')
      return
    }

    setError(null)

    // Nothing to post to until the Apps Script URL is pasted in. Show the
    // fallback rather than firing a request that will never land.
    if (!CONFIGURED) {
      setStatus('error')
      return
    }

    setStatus('submitting')
    try {
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        // text/plain is CORS-safelisted, so no preflight. The Apps Script
        // parses the raw body as JSON.
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        redirect: 'follow',
        body: JSON.stringify({
          category,
          firstName: fn,
          lastName: ln,
          email: em,
          phone: ph,
          organization: organization.trim(),
          message: message.trim(),
          pageUrl: typeof window === 'undefined' ? '' : window.location.href,
        }),
      })
      if (!res.ok) throw new Error('request failed')
      setStatus('done')
    } catch {
      setStatus('error')
    }
  }

  if (!mounted || !open) return null

  const fieldClass =
    'w-full rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-[15px] text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-4 focus:ring-neutral-950/5 focus:outline-none disabled:opacity-60'

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[130] flex items-end justify-center bg-neutral-950/50 p-2 backdrop-blur-md sm:items-center sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.18 }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        data-lenis-prevent
        className="relative max-h-[calc(100dvh-1rem)] w-full max-w-[440px] overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-neutral-900/10 sm:max-h-[calc(100dvh-2rem)] sm:p-7"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <XIcon className="h-5 w-5" />
        </button>

        {status === 'done' ? (
          <div className="py-6">
            <h2
              id={titleId}
              className="font-display text-2xl font-semibold tracking-tight text-neutral-950"
            >
              Thank you.
            </h2>
            <p className="mt-3 text-base leading-7 text-neutral-600">
              Michele will be in touch soon.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex w-full items-center justify-center rounded-md bg-[var(--color-cta)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-cta-hover)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <h2
              id={titleId}
              className="font-display pr-10 text-xl font-semibold tracking-tight text-neutral-950 sm:text-2xl"
            >
              Get in touch
            </h2>

            <form onSubmit={onSubmit} noValidate className="mt-4">
              <fieldset>
                <legend className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                  What is this about?
                </legend>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {CATEGORIES.map((option) => {
                    const id = `${titleId}-cat-${option.value.replace(/\W+/g, '-')}`
                    const selected = category === option.value
                    return (
                      <div key={option.value}>
                        <input
                          id={id}
                          type="radio"
                          name="category"
                          value={option.value}
                          checked={selected}
                          onChange={() => setCategory(option.value)}
                          disabled={status === 'submitting'}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={id}
                          className={
                            selected
                              ? 'flex h-full cursor-pointer items-center rounded-lg border border-neutral-950 bg-neutral-950 px-3 py-2 text-[13px] leading-tight font-medium text-white transition peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-950 peer-focus-visible:ring-offset-2'
                              : 'flex h-full cursor-pointer items-center rounded-lg border border-neutral-300 bg-white px-3 py-2 text-[13px] leading-tight font-medium text-neutral-700 transition hover:border-neutral-500 hover:text-neutral-950 peer-focus-visible:ring-2 peer-focus-visible:ring-neutral-950 peer-focus-visible:ring-offset-2'
                          }
                        >
                          {option.label}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </fieldset>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor={`${titleId}-first`} className="sr-only">
                    First name
                  </label>
                  <input
                    id={`${titleId}-first`}
                    type="text"
                    name="firstName"
                    autoComplete="given-name"
                    placeholder="First name"
                    required
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value)
                      if (error) setError(null)
                    }}
                    disabled={status === 'submitting'}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor={`${titleId}-last`} className="sr-only">
                    Last name
                  </label>
                  <input
                    id={`${titleId}-last`}
                    type="text"
                    name="lastName"
                    autoComplete="family-name"
                    placeholder="Last name"
                    required
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value)
                      if (error) setError(null)
                    }}
                    disabled={status === 'submitting'}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label htmlFor={`${titleId}-email`} className="sr-only">
                  Email address
                </label>
                <input
                  id={`${titleId}-email`}
                  type="email"
                  name="email"
                  autoComplete="email"
                  inputMode="email"
                  placeholder="Email address"
                  required
                  aria-invalid={error ? true : undefined}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (error) setError(null)
                  }}
                  disabled={status === 'submitting'}
                  className={fieldClass}
                />
              </div>

              <div className="mt-2 grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor={`${titleId}-phone`} className="sr-only">
                    Phone number
                  </label>
                  <input
                    id={`${titleId}-phone`}
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="Phone"
                    required
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                      if (error) setError(null)
                    }}
                    disabled={status === 'submitting'}
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor={`${titleId}-org`} className="sr-only">
                    Organization (optional)
                  </label>
                  <input
                    id={`${titleId}-org`}
                    type="text"
                    name="organization"
                    autoComplete="organization"
                    placeholder="Organization"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    disabled={status === 'submitting'}
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="mt-2">
                <label htmlFor={`${titleId}-message`} className="sr-only">
                  How can Michele help?
                </label>
                <textarea
                  id={`${titleId}-message`}
                  name="message"
                  rows={2}
                  placeholder="How can Michele help?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === 'submitting'}
                  className={`${fieldClass} resize-none`}
                />
              </div>

              {/* Honeypot, hidden from real people. */}
              <div aria-hidden="true" className="hidden">
                <label>
                  Company
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="mt-3">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[var(--color-cta)] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--color-cta-hover)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Sending' : 'Send'}
                </button>
              </div>

              <div role="status" aria-live="polite">
                {error ? (
                  <p className="mt-2 text-sm text-neutral-700">{error}</p>
                ) : null}
                {status === 'error' ? (
                  <p className="mt-2 text-sm text-neutral-700">
                    Something went wrong. Please email{' '}
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-medium text-neutral-950 underline underline-offset-4"
                    >
                      {siteConfig.email}
                    </a>{' '}
                    directly.
                  </p>
                ) : null}
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>,
    document.body,
  )
}
