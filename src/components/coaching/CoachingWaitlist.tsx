'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

import { cn } from '@/lib/cn'
import { siteConfig } from '@/lib/site-config'

/**
 * Coaching wait-list capture.
 *
 * Deliberately separate from the sitewide `wait-list/` modal, which posts to
 * /api/wait-list. Per the Brett + Michele review the coaching wait list rides
 * the SAME Google Sheet + Apps Script pipeline as the contact popup, so Michele
 * reads one sheet. Every row from this form carries source="coaching-waitlist"
 * so she can filter wait-list entries out of general contact submissions.
 *
 * Payload keys mirror `ContactPopup` exactly so the rows land in the columns
 * the sheet already has. The optional "what's the book" answer rides in
 * `message`; `category` is pinned to the coaching option the popup already
 * offers. Content-Type is text/plain on purpose: it is CORS-safelisted, so the
 * browser skips the preflight OPTIONS that Apps Script cannot answer.
 */
const SCRIPT_URL_PLACEHOLDER = 'YOUR_APPS_SCRIPT_URL_HERE'
const SCRIPT_URL =
  process.env.NEXT_PUBLIC_CONTACT_SCRIPT_URL || SCRIPT_URL_PLACEHOLDER
/** False until Michele pastes the deployed URL in. Drives the mailto fallback. */
const CONFIGURED = Boolean(SCRIPT_URL) && SCRIPT_URL !== SCRIPT_URL_PLACEHOLDER

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

type Status = 'idle' | 'submitting' | 'done' | 'error'

type Ctx = { open: (source: string) => void }
const WaitlistCtx = createContext<Ctx | null>(null)

function useWaitlist(): Ctx {
  const ctx = useContext(WaitlistCtx)
  if (!ctx) {
    throw new Error('WaitlistButton must be rendered inside CoachingWaitlistProvider')
  }
  return ctx
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

export function CoachingWaitlistProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [source, setSource] = useState<string | null>(null)
  const open = useCallback((next: string) => setSource(next), [])
  const close = useCallback(() => setSource(null), [])
  const value = useMemo(() => ({ open }), [open])

  return (
    <WaitlistCtx.Provider value={value}>
      {children}
      <WaitlistModal source={source} onClose={close} />
    </WaitlistCtx.Provider>
  )
}

/**
 * The one call to action on this page. `tone="dark"` only shifts the focus-ring
 * offset so the ring stays visible on the dark panels.
 */
export function WaitlistButton({
  source,
  tone = 'light',
  className,
  children = 'Join the waitlist',
}: {
  source: string
  tone?: 'light' | 'dark'
  className?: string
  children?: React.ReactNode
}) {
  const { open } = useWaitlist()

  return (
    <button
      type="button"
      onClick={() => open(source)}
      className={cn(
        'group inline-flex items-center justify-center gap-1.5 rounded-md px-6 py-3.5 text-base font-semibold shadow-sm transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
        // Palette hook: see the COACHING PAGE PALETTE block in tailwind.css.
        'bg-[var(--color-coach-accent)] text-[var(--color-coach-accent-ink)] hover:bg-[var(--color-coach-accent-hover)]',
        tone === 'dark'
          ? 'focus-visible:ring-white focus-visible:ring-offset-[var(--color-coach-surface-dark)]'
          : 'focus-visible:ring-neutral-950 focus-visible:ring-offset-white',
        className,
      )}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      >
        &rarr;
      </span>
    </button>
  )
}

function WaitlistModal({
  source,
  onClose,
}: {
  source: string | null
  onClose: () => void
}) {
  const open = source !== null
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)

  const [mounted, setMounted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [book, setBook] = useState('')

  useEffect(() => setMounted(true), [])

  // Reset the form each time it is opened from a CTA.
  useEffect(() => {
    if (!open) return
    setStatus('idle')
    setError(null)
    setFirstName('')
    setLastName('')
    setEmail('')
    setBook('')
  }, [open])

  // Focus management, Escape/Tab handling, and scroll lock while open.
  useEffect(() => {
    if (!open) return
    const trigger = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusTimer = window.setTimeout(() => {
      const dialog = dialogRef.current
      const target =
        dialog?.querySelector<HTMLElement>('input:not([tabindex="-1"])') ??
        dialog?.querySelector<HTMLElement>('button')
      target?.focus()
    }, 20)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab') return
      const dialog = dialogRef.current
      if (!dialog) return
      // The honeypot carries tabindex="-1", so it stays out of the cycle.
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

    if (!fn || !ln) {
      setError('Enter your first and last name.')
      return
    }
    if (!EMAIL_RE.test(em)) {
      setError('Enter a valid email address.')
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
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        redirect: 'follow',
        body: JSON.stringify({
          // Same column shape as ContactPopup so rows line up in the sheet.
          category: 'Brave Purpose Author Method (coaching)',
          firstName: fn,
          lastName: ln,
          email: em,
          phone: '',
          organization: '',
          message: book.trim(),
          // The filter Michele sorts the sheet on.
          source: 'coaching-waitlist',
          // Which CTA on the page it came from.
          cta: source ?? '',
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
              You are on the list.
            </h2>
            <p className="mt-3 text-base leading-7 text-neutral-600">
              Michele will email you personally when the next group opens up.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex w-full items-center justify-center rounded-md bg-[var(--color-coach-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-coach-accent-ink)] shadow-sm transition hover:bg-[var(--color-coach-accent-hover)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-none"
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
              Join the waitlist
            </h2>
            <p className="mt-2 text-[15px] leading-6 text-neutral-600">
              Michele works with a small number of writers at a time. Leave your
              details and she will reach out personally.
            </p>

            <form onSubmit={onSubmit} noValidate className="mt-4">
              <div className="grid grid-cols-2 gap-2">
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

              <div className="mt-2">
                <label htmlFor={`${titleId}-book`} className="sr-only">
                  What is the book you want to write? (optional)
                </label>
                <textarea
                  id={`${titleId}-book`}
                  name="book"
                  rows={2}
                  placeholder="What is the book you want to write? (optional)"
                  value={book}
                  onChange={(e) => setBook(e.target.value)}
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
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[var(--color-coach-accent)] px-6 py-3 text-sm font-semibold text-[var(--color-coach-accent-ink)] shadow-sm transition hover:bg-[var(--color-coach-accent-hover)] focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Sending' : 'Join the waitlist'}
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
                      href={`mailto:${siteConfig.email}?subject=Brave%20Purpose%20Author%20Method%20waitlist`}
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
