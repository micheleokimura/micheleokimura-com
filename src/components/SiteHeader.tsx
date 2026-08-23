'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { MarkerSwipe } from '@/components/MarkerSwipe'
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
    <header className="absolute top-0 right-0 left-0 z-40 pt-6 sm:pt-10">
      <Container>
        <div className="flex items-center justify-between gap-6">
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
            className="hidden items-center gap-0.5 md:flex lg:gap-2"
          >
            {navItems.map((item) => {
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'group relative isolate inline-flex items-center px-2 py-2 text-[13px] font-medium whitespace-nowrap transition lg:px-4 lg:text-sm',
                    // The marker swipe is opaque coral, so any label sitting
                    // on it must be coral-ink: navy #1F2744 on coral is
                    // 4.43:1 and misses AA, coral-ink is 4.75:1.
                    active
                      ? 'text-[var(--color-cta-ink)]'
                      : 'text-neutral-700 hover:text-[var(--color-cta-ink)]',
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
                  <MarkerSwipe
                    className={cn(
                      active
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0 transition-[transform,opacity] duration-[280ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-x-100 group-hover:opacity-70',
                    )}
                  />
                  <span className="relative z-10">{item.label}</span>
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
        className="md:hidden mt-6 border-t border-neutral-200 bg-white"
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
                      'group relative isolate inline-flex items-center px-4 py-3 text-base font-medium transition',
                      active
                        ? 'text-[var(--color-cta-ink)]'
                        : 'text-neutral-700 hover:text-[var(--color-cta-ink)]',
                    )}
                    aria-current={active ? 'page' : undefined}
                    onClick={(e) => {
                      if (e.detail !== 0) e.currentTarget.blur()
                    }}
                  >
                    <MarkerSwipe
                      className={cn(
                        active
                          ? 'opacity-100'
                          : 'opacity-0 transition-opacity duration-200 group-hover:opacity-60',
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
