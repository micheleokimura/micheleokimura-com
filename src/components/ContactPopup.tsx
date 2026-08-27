'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

import { siteConfig } from '@/lib/site-config'

/**
 * Where the form posts. A route in this same app, so no CORS and no third
 * party to keep alive. It emails Michele through Resend.
 *
 * This used to be a Google Apps Script Web App URL read from
 * NEXT_PUBLIC_CONTACT_SCRIPT_URL, with a placeholder fallback. When that env
 * var went missing the form short-circuited to the error state before it ever
 * made a request, which is how "Something went wrong" showed up on every
 * submission.
 */
const ENDPOINT = '/api/contact-message'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

/** How long the confirmation sits before the popup closes itself. */
const DONE_AUTOCLOSE_MS = 4000

type Status = 'idle' | 'submitting' | 'done' | 'error'

export type ContactInterest = 'coaching' | 'speaking' | 'other'

/**
 * `value` is what rides in the `interests` array on the payload; `label` is
 * what the reader sees. Three options only, per the Brett + Michele review:
 * the old six-way category grid asked people to classify themselves before
 * they had said anything.
 */
const INTERESTS: { value: ContactInterest; label: string }[] = [
  { value: 'coaching', label: 'Coaching' },
  { value: 'speaking', label: 'Speaking' },
  { value: 'other', label: 'Other / general inquiry' },
]

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

/**
 * A ready-to-send email holding everything the person just typed.
 *
 * The send can fail for reasons the reader cannot do anything about: the mail
 * key missing from the deployment, Resend down, a phone that dropped off wifi
 * mid-submit. Before this, that meant a bare "something went wrong" and a
 * plain address, so the story someone had just written out was theirs to type
 * again somewhere else. Most people simply leave. This hands their own words
 * back to them in a message that is already addressed and already filled in.
 */
function mailtoFallback(fields: {
  interests: ContactInterest[]
  story: string
  firstName: string
  lastName: string
  email: string
  phone: string
}): string {
  const name = [fields.firstName.trim(), fields.lastName.trim()]
    .filter(Boolean)
    .join(' ')
  const labels = fields.interests
    .map((value) => INTERESTS.find((option) => option.value === value)?.label ?? value)
    .join(', ')
  const subject = name ? `Website inquiry from ${name}` : 'Website inquiry'
  const body = [
    `Name: ${name || '(not provided)'}`,
    `Email: ${fields.email.trim() || '(not provided)'}`,
    `Phone: ${fields.phone.trim() || '(not provided)'}`,
    `Interested in: ${labels || '(not provided)'}`,
    '',
    'Message:',
    fields.story.trim() || '(none provided)',
  ].join('\n')
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`
}

/**
 * Sitewide contact popup.
 *
 * One form for every inquiry on the site. The header's "Contact" button opens
 * it plain; page CTAs open it through `ContactTrigger` with an interest already
 * ticked (the coaching page's "Join the waitlist" buttons pass "coaching").
 * It replaced the separate coaching wait-list form, so there is now a single
 * inbox and a single sheet.
 *
 * Fields, in order: what are you interested in (multi-select, at least one),
 * an optional place to tell the story, then first name, last name, email, and
 * phone. Everything but the story is required. The phone is checked for
 * content only, so international and informal formats both pass.
 *
 * Accessibility is handled by hand, matching `JoinWaitListModal`: role="dialog"
 * + aria-modal, focus moved in on open and restored to the trigger on close, a
 * Tab focus trap, Escape and backdrop click to close, real checkboxes inside a
 * fieldset, and a polite live region for errors.
 *
 * Submission posts JSON to `/api/contact-message`, a route in this same app
 * that emails Michele through Resend. Same origin, so there is no preflight to
 * work around and nothing outside Vercel to keep running.
 */
export function ContactPopup({
  open,
  onClose,
  preSelectedInterest,
}: {
  open: boolean
  onClose: () => void
  /** Ticked by default when the popup opens. Set by page-level CTAs. */
  preSelectedInterest?: ContactInterest
}) {
  const titleId = useId()
  const descId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)

  const [mounted, setMounted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [interests, setInterests] = useState<ContactInterest[]>(
    preSelectedInterest ? [preSelectedInterest] : [],
  )
  const [story, setStory] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => setMounted(true), [])

  // Reset the form each time the popup is opened.
  useEffect(() => {
    if (!open) return
    setStatus('idle')
    setError(null)
    setInterests(preSelectedInterest ? [preSelectedInterest] : [])
    setStory('')
    setFirstName('')
    setLastName('')
    setEmail('')
    setPhone('')
  }, [open, preSelectedInterest])

  // Close the popup a few seconds after a successful send. Held in a ref so a
  // parent that passes an inline arrow for onClose does not restart the timer.
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  }, [onClose])
  useEffect(() => {
    if (status !== 'done') return
    const timer = window.setTimeout(() => onCloseRef.current(), DONE_AUTOCLOSE_MS)
    return () => window.clearTimeout(timer)
  }, [status])

  // Focus management, Escape/Tab handling, and scroll lock while open.
  useEffect(() => {
    if (!open) return
    const trigger = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      const dialog = dialogRef.current
      // Land on the first interest checkbox, which is where the form starts.
      const target =
        dialog?.querySelector<HTMLElement>('input[type="checkbox"]') ??
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

  function toggleInterest(value: ContactInterest) {
    setInterests((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value],
    )
    if (error) setError(null)
  }

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

    if (!interests.length) {
      setError('Pick at least one thing you are interested in.')
      return
    }
    if (!fn || !ln) {
      setError('Enter your first and last name.')
      return
    }
    if (!EMAIL_RE.test(em)) {
      setError('Enter a valid email address.')
      return
    }
    if (!ph) {
      setError('Enter a phone number Michele can reach you on.')
      return
    }

    setError(null)

    setStatus('submitting')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'contact',
          interests,
          story: story.trim(),
          first_name: fn,
          last_name: ln,
          email: em,
          phone: ph,
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

  // 16px ON MOBILE, 15px from sm up. iOS Safari zooms the whole page in when
  // you focus an input whose computed font-size is under 16px, and there is no
  // way back out of that zoom except pinching. The field was a flat 15px, so
  // every text box in this form did it. The sm step keeps the desktop
  // rendering byte-for-byte what it was.
  const fieldClass =
    'w-full rounded-lg border border-[var(--color-field-border)] bg-white px-3 py-2.5 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-4 focus:ring-neutral-950/5 focus:outline-none disabled:opacity-60 sm:text-[15px]'

  return createPortal(
    /* pb clears the home indicator. This is a BOTTOM SHEET below sm, so with
       viewport-fit=cover its bottom edge is now the physical bottom of the
       screen and the submit button was landing under the indicator. */
    <motion.div
      className="fixed inset-0 z-[130] flex items-end justify-center bg-neutral-950/50 p-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] backdrop-blur-md sm:items-center sm:p-4"
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
        aria-describedby={status === 'done' ? undefined : descId}
        data-lenis-prevent
        className="relative max-h-[calc(100dvh-1rem-env(safe-area-inset-bottom,0px))] w-full max-w-[440px] overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-neutral-900/10 sm:max-h-[calc(100dvh-2rem)] sm:p-7"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-1.5 right-1.5 inline-flex h-11 w-11 items-center justify-center rounded-md text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-none"
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
                className="inline-flex w-full items-center justify-center rounded-md bg-[var(--color-cta)] px-6 py-3 text-sm font-semibold text-[var(--color-cta-ink)] shadow-sm transition hover:bg-[var(--color-cta-hover)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-none"
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
            <p id={descId} className="mt-2 text-[15px] leading-6 text-neutral-600">
              Send Michele a note and she will get back to you.
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-5">
              <fieldset>
                <legend className="text-xs font-semibold tracking-wider text-neutral-500 uppercase">
                  What are you interested in?
                </legend>
                <div className="mt-3 space-y-2.5">
                  {INTERESTS.map((option) => {
                    const id = `${titleId}-interest-${option.value}`
                    return (
                      // min-h-11 on the row and a stretched label give the
                      // whole line a 44px tap target. It was a 16px box beside
                      // a 24px line, so the only reliable way to tick one of
                      // these on a phone was to hit the box itself.
                      <div
                        key={option.value}
                        className="flex min-h-11 items-stretch gap-3"
                      >
                        <input
                          id={id}
                          type="checkbox"
                          name="interests"
                          value={option.value}
                          checked={interests.includes(option.value)}
                          onChange={() => toggleInterest(option.value)}
                          disabled={status === 'submitting'}
                          className="h-5 w-5 flex-none self-center accent-[var(--color-cta)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-none"
                        />
                        <label
                          htmlFor={id}
                          className="flex flex-auto cursor-pointer items-center text-[15px] leading-6 font-medium text-neutral-700 select-none"
                        >
                          {option.label}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </fieldset>

              <div className="mt-5">
                <label
                  htmlFor={`${titleId}-story`}
                  className="block text-xs font-semibold tracking-wider text-neutral-500 uppercase"
                >
                  Share a bit of your story
                </label>
                <textarea
                  id={`${titleId}-story`}
                  name="story"
                  rows={4}
                  placeholder="Optional. Tell Michele whatever you would like her to know."
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  disabled={status === 'submitting'}
                  className={`${fieldClass} mt-2 resize-none`}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor={`${titleId}-first`} className="sr-only">
                    First name
                  </label>
                  <input
                    id={`${titleId}-first`}
                    type="text"
                    name="first_name"
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
                    name="last_name"
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

              <div className="mt-2">
                <label htmlFor={`${titleId}-phone`} className="sr-only">
                  Phone number
                </label>
                <input
                  id={`${titleId}-phone`}
                  type="tel"
                  name="phone"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="Phone number"
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

              {/* Honeypot, hidden from real people. */}
              <div aria-hidden="true" className="hidden">
                <label>
                  Company
                  <input type="text" name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <div className="mt-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[var(--color-cta)] px-6 py-3 text-sm font-semibold text-[var(--color-cta-ink)] shadow-sm transition hover:bg-[var(--color-cta-hover)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60"
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
                    That did not send. Nothing you typed is lost:{' '}
                    <a
                      href={mailtoFallback({
                        interests,
                        story,
                        firstName,
                        lastName,
                        email,
                        phone,
                      })}
                      className="font-medium text-neutral-950 underline underline-offset-4"
                    >
                      open it in your email app
                    </a>{' '}
                    and it will arrive as a message to {siteConfig.email}.
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
