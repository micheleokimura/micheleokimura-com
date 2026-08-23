'use client'

import { useState } from 'react'

import { cn } from '@/lib/cn'
import { ContactPopup, type ContactInterest } from '@/components/ContactPopup'

/**
 * A page CTA that opens the sitewide contact popup with one interest already
 * ticked. This is what replaced the standalone coaching wait-list form: the
 * coaching page's "Join the waitlist" buttons are ContactTriggers carrying
 * interest="coaching", so every inquiry lands in the same inbox and sheet.
 *
 * Each trigger owns its own popup state. The popup renders nothing at all when
 * closed, so a page with two CTAs carries no extra weight.
 *
 * `tone="dark"` only shifts the focus-ring offset so the ring stays visible on
 * the teal panels.
 */
export function ContactTrigger({
  interest,
  tone = 'light',
  withArrow = true,
  className,
  children,
}: {
  interest?: ContactInterest
  tone?: 'light' | 'dark'
  withArrow?: boolean
  className?: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          'group inline-flex items-center justify-center gap-1.5 rounded-md px-6 py-3.5 text-base font-semibold shadow-sm transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none',
          'bg-[var(--color-cta)] text-[var(--color-cta-ink)] hover:bg-[var(--color-cta-hover)]',
          tone === 'dark'
            ? 'focus-visible:ring-white focus-visible:ring-offset-[var(--color-brand-teal-deep)]'
            : 'focus-visible:ring-neutral-950 focus-visible:ring-offset-white',
          className,
        )}
      >
        <span>{children}</span>
        {withArrow ? (
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          >
            &rarr;
          </span>
        ) : null}
      </button>

      <ContactPopup
        open={open}
        onClose={() => setOpen(false)}
        preSelectedInterest={interest}
      />
    </>
  )
}
