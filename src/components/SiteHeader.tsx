'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { ContactPopup } from '@/components/ContactPopup'
import { navItems, siteConfig } from '@/lib/site-config'

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M2 6h20v2H2zM2 16h20v2H2z" />
    </svg>
  )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="m5.636 4.223 14.142 14.142-1.414 1.414L4.222 5.637z" />
      <path d="M4.222 18.363 18.364 4.22l1.414 1.414L5.636 19.777z" />
    </svg>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  // Sitewide contact popup. The header owns the state; the popup portals itself
  // to the body, so it is unaffected by the header's stacking context.
  const [contactOpen, setContactOpen] = useState(false)

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    // Height, set 2026-08-23 on Michele's note that the bar was "too tall, too
    // much negative space above and below the nav". It was pt-6 / sm:pt-10 with
    // no bottom padding, which left the row floating in ~40px of air at the top
    // and nothing underneath. It is now a symmetric py-3 / sm:py-4, which lands
    // the bar at roughly 68px: an ordinary site-header height. `main` in
    // layout.tsx pads down to clear it, so re-measure that pt if this changes.
    <header className="absolute top-0 right-0 left-0 z-40 py-3 sm:py-4">
      <Container>
        {/* The nav takes `ml-auto` rather than the row taking `justify-between`.
            Michele read the old spacing as centered and disliked it; pushing
            the five labels to the right sits them against the Contact button
            and leaves the gap on the wordmark's side instead. */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link
            href="/"
            aria-label={`${siteConfig.brand} home`}
            className="shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-950"
          >
            <Logo />
          </Link>

          {/* Five labels plus the wordmark and the CTA are a tight fit in the
              672px Container gives us at 768px, so between md and lg the nav
              runs at 13px with px-2 and a half-step gap. That lands the row at
              roughly 630px and leaves the rest as breathing room. It relaxes
              to 14px / px-4 at lg. Re-measure before adding a sixth item or a
              longer label; the budget is written out in DESIGN-RULES.md. */}
          <nav
            aria-label="Primary"
            className="ml-auto hidden items-center gap-0.5 md:flex lg:gap-1"
          >
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group relative isolate inline-flex items-center px-2 py-2 text-[13px] whitespace-nowrap transition lg:px-3 lg:text-sm',
                    // Active state, changed 2026-08-23. This used to be the
                    // opaque coral MarkerSwipe; Michele said the orange
                    // highlighter stripe "looks weird" and asked for a subtle
                    // navy underline or a bold label instead. It now carries
                    // BOTH, which is also the accessible answer: the weight
                    // change means the current page is not signalled by color
                    // alone (WCAG 1.4.1). Navy on the off-white ground is
                    // 13.7:1.
                    active
                      ? 'font-semibold text-[var(--color-navy)]'
                      : 'font-medium text-neutral-700 hover:text-[var(--color-navy)]',
                  )}
                  aria-current={active ? 'page' : undefined}
                  // Drop focus after a MOUSE click so the keyboard focus ring
                  // never lingers as a box around the active item once the page
                  // navigates. e.detail is 0 for keyboard (Enter) activation, so
                  // keyboard users keep their focus-visible ring for a11y.
                  onClick={(e) => {
                    if (e.detail !== 0) e.currentTarget.blur()
                  }}
                >
                  <span className="relative z-10">{item.label}</span>
                  {/* 2px navy rule, hugging the label rather than the whole
                      padded hit area, so it reads as an underline instead of a
                      tab. Hover previews it at 40% and grows it from the left;
                      the active one is already at full width. */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute inset-x-2 bottom-1 h-0.5 origin-left rounded-full transition-transform duration-[240ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] lg:inset-x-3',
                      active
                        ? 'scale-x-100 bg-[var(--color-navy)]'
                        : 'scale-x-0 bg-[var(--color-navy)]/40 group-hover:scale-x-100',
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="flex shrink-0 items-center gap-3">
            {/* The ONE contact CTA in the header. There used to be a second
                button beside it (the wait-list button, whose label had already
                been unified to "Contact"), so the header shipped two identical
                CTAs. The wait-list flow now lives inside the contact popup, so
                this is the only entry point and it carries the coral. */}
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="hidden items-center justify-center rounded-md bg-[var(--color-cta)] px-4 py-2 text-sm font-semibold whitespace-nowrap text-[var(--color-cta-ink)] shadow-sm transition hover:bg-[var(--color-cta-hover)] focus-visible:ring-2 focus-visible:ring-[var(--color-cta-ink)] focus-visible:ring-offset-2 focus-visible:outline-none sm:inline-flex lg:px-5 lg:py-2.5"
            >
              Contact
            </button>
            {/* Below md this is the only way to reach the nav, so it is a
                labelled button rather than a bare glyph. Michele and Brett
                reported "no header menu items" at a half-screen width: the
                nav was correctly collapsed, but a 20px hairline icon did not
                read as a menu. The word carries it. Cutting the nav from eight
                links to five also let the full nav come down from lg to md, so
                the half-screen case now shows real links rather than this. */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav-panel"
              className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-neutral-900 ring-1 ring-[var(--color-teal-20)] transition hover:bg-[var(--color-teal-05)] hover:ring-[var(--color-teal-30)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-teal)] md:hidden"
            >
              {open ? (
                <XIcon className="h-4 w-4" />
              ) : (
                <MenuIcon className="h-4 w-4" />
              )}
              <span>{open ? 'Close' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </Container>

      <div
        id="mobile-nav-panel"
        hidden={!open}
        className="md:hidden mt-3 border-t border-neutral-200 bg-white sm:mt-4"
      >
        <Container className="py-6">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'group relative isolate inline-flex items-center py-3 pr-4 pl-4 text-base transition',
                      // Same treatment as the desktop bar: bold navy label with
                      // a navy rule, never the coral stripe. Here the rule runs
                      // vertically down the left edge, because a horizontal
                      // underline in a stacked list reads as a divider between
                      // rows rather than as the current page.
                      active
                        ? 'font-semibold text-[var(--color-navy)]'
                        : 'font-medium text-neutral-700 hover:text-[var(--color-navy)]',
                    )}
                    aria-current={active ? 'page' : undefined}
                    onClick={(e) => {
                      if (e.detail !== 0) e.currentTarget.blur()
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute inset-y-1.5 left-0 w-0.5 rounded-full transition-opacity duration-200',
                        active
                          ? 'bg-[var(--color-navy)] opacity-100'
                          : 'bg-[var(--color-navy)]/40 opacity-0 group-hover:opacity-100',
                      )}
                    />
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                </li>
              )
            })}
            {/* Below sm the bar has no room for the CTA beside the logo and the
                Menu button, so Contact lives here instead. From sm up the bar
                carries it and this is hidden: exactly one Contact button is
                ever on screen. */}
            <li className="mt-3 sm:hidden">
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  setContactOpen(true)
                }}
                className="inline-flex w-full items-center justify-center rounded-md bg-[var(--color-cta)] px-6 py-3 text-sm font-semibold text-[var(--color-cta-ink)] shadow-sm transition hover:bg-[var(--color-cta-hover)] focus-visible:ring-2 focus-visible:ring-[var(--color-cta-ink)] focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                Contact
              </button>
            </li>
          </ul>
        </Container>
      </div>

      <ContactPopup open={contactOpen} onClose={() => setContactOpen(false)} />
    </header>
  )
}
