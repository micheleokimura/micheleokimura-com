'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

type Status = 'idle' | 'submitting' | 'done' | 'error'

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

/**
 * Shared wait-list modal. Rendered once by `WaitListProvider`; it opens when a
 * `source` is set (by any `JoinWaitListButton`) and closes on submit-success,
 * the X button, Escape, or a click on the backdrop.
 *
 * Built on plain React + framer-motion (Headless UI is not a dependency here).
 * Accessibility is handled manually: `role="dialog"` + `aria-modal`, a focus
 * trap, focus moved into the dialog on open, focus restored to the triggering
 * button on close, body scroll lock, and a polite live region for errors.
 */
export function JoinWaitListModal({
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
  const [churchDomain, setChurchDomain] = useState('')

  useEffect(() => setMounted(true), [])

  // Reset the form each time the modal is opened from a CTA.
  useEffect(() => {
    if (open) {
      setStatus('idle')
      setError(null)
      setFirstName('')
      setLastName('')
      setEmail('')
      setChurchDomain('')
    }
  }, [open])

  // Focus management, Escape/Tab handling, and scroll lock while open.
  useEffect(() => {
    if (!open) return
    const trigger = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => {
      const dialog = dialogRef.current
      // Prefer the first text field; fall back to the close button.
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
      const els = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
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

    // Honeypot: bots fill this, real users never see it.
    const honey = (
      event.currentTarget.elements.namedItem('company') as HTMLInputElement | null
    )?.value
    if (honey) {
      setStatus('done')
      return
    }

    const fn = firstName.trim()
    const ln = lastName.trim()
    const value = email.trim()
    if (!fn || !ln) {
      setError('Enter your first and last name.')
      return
    }
    if (!EMAIL_RE.test(value)) {
      setError('Enter a valid email address.')
      return
    }
    setError(null)
    setStatus('submitting')

    try {
      const res = await fetch('/api/wait-list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: fn,
          lastName: ln,
          email: value,
          churchDomain: churchDomain.trim(),
          source,
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
    'w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-950 transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-4 focus:ring-neutral-950/5 focus:outline-none disabled:opacity-60'

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[120] flex items-end justify-center bg-neutral-950/60 p-4 backdrop-blur-sm sm:items-center"
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
        className="relative w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-2xl ring-1 ring-neutral-900/10 sm:p-8"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 hover:text-neutral-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
            >
              <XIcon className="h-5 w-5" />
            </button>

            {status === 'done' ? (
              <div className="py-2">
                <h2
                  id={titleId}
                  className="font-display text-2xl font-semibold tracking-tight text-neutral-950"
                >
                  You&rsquo;re on the list.
                </h2>
                <p className="mt-4 text-base leading-7 text-neutral-600">
                  Emily will reach out by email when a spot opens. Keep an eye on
                  your inbox.
                </p>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex items-center justify-center rounded-md bg-[var(--color-cta)] px-6 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:bg-[var(--color-cta-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h2
                  id={titleId}
                  className="font-display text-2xl font-semibold tracking-tight text-neutral-950"
                >
                  Join the wait list
                </h2>
                <p className="mt-3 text-base leading-7 text-neutral-600">
                  Emily takes on a small number of new churches each quarter.
                  Drop your info and she&rsquo;ll reach out personally by email
                  when a spot opens.
                </p>

                <form onSubmit={onSubmit} noValidate className="mt-6">
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                  <div className="mt-4">
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

                  <div className="mt-4">
                    <label htmlFor={`${titleId}-domain`} className="sr-only">
                      Church website domain (optional)
                    </label>
                    <input
                      id={`${titleId}-domain`}
                      type="text"
                      name="churchDomain"
                      autoComplete="url"
                      placeholder="Church website domain (optional)"
                      value={churchDomain}
                      onChange={(e) => setChurchDomain(e.target.value)}
                      disabled={status === 'submitting'}
                      className={fieldClass}
                    />
                  </div>

                  {/* Honeypot, hidden from real users. */}
                  <div aria-hidden="true" className="hidden">
                    <label>
                      Company
                      <input
                        type="text"
                        name="company"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </label>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[var(--color-cta)] px-6 py-3 text-sm font-semibold text-neutral-950 shadow-sm transition hover:bg-[var(--color-cta-hover)] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
                    >
                      {status === 'submitting' ? 'Saving' : 'Save my spot'}
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>

                  <div role="status" aria-live="polite">
                    {error ? (
                      <p className="mt-3 text-sm text-neutral-700">{error}</p>
                    ) : null}
                    {status === 'error' ? (
                      <p className="mt-3 text-sm text-neutral-700">
                        Something went wrong. Please try again or email Emily
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
