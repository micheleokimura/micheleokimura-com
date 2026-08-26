'use client'

import { useState } from 'react'

import { ContactPopup, type ContactInterest } from '@/components/ContactPopup'

/**
 * An UNSTYLED click surface that opens the sitewide contact popup.
 *
 * ContactTrigger is the styled sibling: it paints a coral CTA button and is the
 * right thing for a page's "Get in touch" call to action. This one carries no
 * appearance of its own, so a caller can hand it the same className it would
 * have given a <Link> and get identical layout with a popup instead of a
 * navigation. The home LogoMarquee uses it for the organizations that have no
 * case study yet, so those tiles still take a cursor and answer a click.
 *
 * Like ContactTrigger, each instance owns its own state, and ContactPopup
 * renders nothing while closed, so a band with several of these costs nothing
 * until one is opened.
 */
export function ContactSurface({
  interest,
  className,
  ariaLabel,
  children,
}: {
  interest?: ContactInterest
  className?: string
  ariaLabel?: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={ariaLabel}
        aria-haspopup="dialog"
        className={className}
      >
        {children}
      </button>

      <ContactPopup
        open={open}
        onClose={() => setOpen(false)}
        preSelectedInterest={interest}
      />
    </>
  )
}
