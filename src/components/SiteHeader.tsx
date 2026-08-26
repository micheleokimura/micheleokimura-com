'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { ContactPopup } from '@/components/ContactPopup'
import { navItems, siteConfig } from '@/lib/site-config'

/**
 * Whether a nav item is the page you are on. An exact match, plus anything
 * nested underneath it, so /speaker stays lit while you are reading
 * /speaker/messages/how-to-hear-gods-voice. Home is exact-only, because every
 * path starts with "/" and it would otherwise light up everywhere.
 */
function isActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(`${href}/`)
}

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

/**
 * OVERLAY MODE ON THE HOME PAGE, AT EVERY WIDTH.
 *
 * Added for mobile on 2026-08-26 after Brett's iPhone review, and widened to
 * every breakpoint later the same day after he reviewed desktop: "the hero
 * treatment we defined for mobile now applies to EVERY breakpoint." So on `/`
 * the header stops being a bar and becomes furniture floating on the video: no
 * ground, no hairline, white wordmark, white nav, and a top-of-screen scrim
 * doing the legibility work. Every other route is the bar this file has always
 * drawn, unchanged.
 *
 * There is no `sm:` or `md:` reversion left in here. That is the point of the
 * change: one treatment, every screen. The only thing that still switches on
 * width is WHICH control you get, the full nav from md up or the hamburger
 * below it, and that breakpoint is inherited rather than new.
 *
 * It goes back to being a solid bar the moment the menu opens. The panel below
 * is an opaque sheet, and hanging it off a transparent bar leaves a stripe of
 * video showing between the two.
 *
 * WHITE TEXT ON MOVING PICTURE IS THE HARD PART, and the scrim numbers below
 * are where the honesty lives. Read the note on the scrim element.
 */
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

  // See the note above the component. `open` is in the condition on purpose.
  const floating = pathname === '/' && !open

  return (
    // Height, set 2026-08-23 on Michele's note that the bar was "too tall, too
    // much negative space above and below the nav". It was pt-6 / sm:pt-10 with
    // no bottom padding, which left the row floating in ~40px of air at the top
    // and nothing underneath. It is now a symmetric py-3 / sm:py-4, which lands
    // the bar at roughly 68px: an ordinary site-header height. `main` in
    // layout.tsx pads down to clear it, so re-measure that pt if this changes.
    // The bar takes an explicit band-1 ground and a navy hairline, so it reads
    // as its own strip rather than as type floating on the page. Same principle
    // as the section bands below it: mark the boundary, do not shout about it.
    // The hairline is doing most of the work, since band-1 is also the page
    // ground on most routes; what it separates the header from is whatever the
    // page opens with, which is a dark hero or banner on every route today.
    //
    // `absolute`, not `fixed`: this scrolls away, and `main` in layout.tsx pads
    // down to clear it, so an opaque background here never covers content.
    //
    // pt-[env(safe-area-inset-top)] pushes the row clear of the Dynamic Island.
    // It is on the header rather than on the row so that the header's own
    // ground, when it has one, still paints all the way up behind the status
    // bar; a bar that stopped below the island would read as a floating card.
    <header
      className={cn(
        'absolute top-0 right-0 left-0 z-40 border-b py-3 pt-[calc(0.75rem+env(safe-area-inset-top,0px))] sm:py-4 sm:pt-[calc(1rem+env(safe-area-inset-top,0px))]',
        floating
          ? 'border-transparent bg-transparent'
          : 'border-[var(--color-navy)]/8 bg-[var(--color-band-1)]',
      )}
    >
      {/* THE TOP SCRIM, and it is now carrying words rather than a logotype,
          which is why it got heavier when the nav moved onto it.

          A logotype is exempt from WCAG 1.4.3 and 1.4.11, so the first version
          of this was a legibility judgement at 40%. The nav is not exempt: it
          is 13 to 14px text, so it owes a measured 4.5:1 against the WORST
          frame in the clip, and the worst frame is a near-white audience shot
          at a relative luminance of 0.95.

          The arithmetic, composited in order (video, then the hero's flat 28%
          navy wash, then this):
            worst frame + wash          effective luminance 0.58
            white needs                 luminance <= 0.1833  (4.5:1)
            so this scrim needs         alpha >= 0.38 where the nav sits
            it delivers                 0.50 at y=34, 0.45 at y=68
            white on that               6.4:1 at the top of the row, 5.0:1 at
                                        the bottom of it
          Every label in the row clears AA against the brightest frame in the
          clip, which is the only frame worth designing for.

          HEIGHT IS 11rem PLUS THE NOTCH INSET, not a flat 11rem. The safe-area
          pad pushes the whole row down on a notched phone, so a fixed height
          would have the ramp fading out exactly where the row lands. Adding the
          inset moves the ramp down with it, and on anything reporting no inset
          this is the 176px it was drawn as.

          Six stops rather than two, because a two-stop linear ramp has a hard
          visual midpoint and reads as the bottom edge of a bar. These
          approximate an ease-out, so what you see is a vignette.

          If the video is ever regraded lighter, re-measure. If it is graded
          DARKER, this can come down, and it should: 0.52 at the very top is the
          most this can carry before it starts rebuilding the bar Brett asked to
          have removed.

          `pointer-events-none` matters: this box is taller than the header, so
          without it the scrim would swallow clicks on the top of the hero. */}
      {floating ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[calc(11rem+env(safe-area-inset-top,0px))] bg-[linear-gradient(to_bottom,rgba(0,0,0,0.52)_0%,rgba(0,0,0,0.50)_20%,rgba(0,0,0,0.44)_40%,rgba(0,0,0,0.28)_62%,rgba(0,0,0,0.12)_82%,rgba(0,0,0,0)_100%)]"
        />
      ) : null}

      {/* NOT <Container>, and the difference is load-bearing below lg.
          Container caps its contents at max-w-2xl (672px) until lg, which on a
          1000px tablet inset the whole header row by 164px on each side: the
          wordmark floated in from the left edge and the nav stopped well short
          of the right one. Brett's brief asks for the nav hard against the top
          right at every width, so the row takes the uncapped max-w-7xl gutter
          instead. At lg and up Container is already `lg:max-w-none`, so the
          desktop bar is byte-for-byte what it was; what changes is 720-1023px,
          where the row now spans the page the way it always looked like it
          should. The hero copy below uses this same wrapper, so the wordmark
          and the H1 share one left edge. */}
      <div className="mx-auto max-w-7xl gutter-x">
        {/* The nav takes `ml-auto` rather than the row taking `justify-between`.
            Michele read the old spacing as centered and disliked it; pushing
            the five labels to the right sits them against the Contact button
            and leaves the gap on the wordmark's side instead. */}
        <div className="flex items-center gap-4 lg:gap-6">
          <Link
            href="/"
            aria-label={`${siteConfig.brand} home`}
            className={cn(
              'shrink-0 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4',
              floating
                ? 'focus-visible:outline-white'
                : 'focus-visible:outline-neutral-950',
            )}
          >
            {/* One mark, not two. The white file is real artwork Michele
                supplied and the footer has been using it on navy since
                2026-08-24, so the overlay header takes the same asset rather
                than inventing a CSS-inverted copy of the black one.

                This used to render BOTH and hide one per breakpoint, because
                the overlay only existed below sm. It applies at every width
                now, so the breakpoint swap is gone and with it the second
                download. `priority`, because on this route it IS the header
                logo and it is above the fold. */}
            {floating ? <Logo invert priority /> : <Logo />}
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
              const active = isActive(pathname, item.href)
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
                    //
                    // OVER THE VIDEO the same rule holds and the colours flip:
                    // white for both states, and the CURRENT page is carried by
                    // weight plus the rule below it rather than by a second
                    // colour. Every label is solid white rather than white/85,
                    // because at the scrim this header runs, 85% white drops to
                    // 3.71:1 against the brightest frame while solid white
                    // holds 6.4:1. There is no room for a transparent ink here.
                    // Inactive labels are separated from the active one by
                    // weight, exactly as on the light bar.
                    floating
                      ? active
                        ? 'font-semibold text-white'
                        : 'font-medium text-white hover:text-white'
                      : active
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
                      floating
                        ? active
                          ? 'scale-x-100 bg-white'
                          : 'scale-x-0 bg-white/60 group-hover:scale-x-100'
                        : active
                          ? 'scale-x-100 bg-[var(--color-navy)]'
                          : 'scale-x-0 bg-[var(--color-navy)]/40 group-hover:scale-x-100',
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          {/* `ml-auto` below md, and only below md. Brett, reviewing on an
              iPhone 15 Pro: the menu button belongs top-right, which is where
              every phone user reaches for it. It was sitting immediately to
              the right of the wordmark, because nothing in the row claimed the
              free space once the nav collapsed.
              From md up the nav itself carries `ml-auto` and is what pushes
              this group right, so this margin has to switch OFF there: two
              `auto` margins in one flex row SPLIT the free space between them,
              which would open a gap between the nav and the Contact button and
              change the desktop bar. Hence md:ml-0. */}
          <div className="ml-auto flex shrink-0 items-center gap-3 md:ml-0">
            {/* The ONE contact CTA in the header. There used to be a second
                button beside it (the wait-list button, whose label had already
                been unified to "Contact"), so the header shipped two identical
                CTAs. The wait-list flow now lives inside the contact popup, so
                this is the only entry point.

                OUTLINE, NOT FILLED, changed 2026-08-23 on Michele's note that
                the button "looks off" against the header. Both were tried. The
                solid coral block was the only saturated thing left in the bar
                once the nav lost its coral highlighter, and at that size it
                read as the loudest element on the page rather than as one item
                in a row of six. The outline sits at the same weight as the nav
                labels, and the coral is not lost: it arrives on hover, which is
                where the palette says a CTA hover belongs.

                Measured: navy label on the band-1 bar is 14.0:1. The boundary
                is --color-field-border, the token that exists because WCAG
                holds a control's edge to 3:1 and a hairline of navy at low
                alpha does not get there. On hover the fill is --color-cta and
                the label switches to --color-cta-ink, which is white as of
                2026-08-26, for 4.63:1. The mobile panel keeps the filled
                treatment: it is a
                full-width block standing alone in a sheet, and an outline at
                that size reads as disabled. */}
            {/* OVER THE VIDEO the outline goes white. The boundary rule is
                the same one that put --color-field-border on the light bar:
                WCAG 1.4.11 holds a control's edge to 3:1, and white at 55%
                over the scrimmed frame clears that at every point in the clip
                while a hairline at 20% would not. The label is solid white for
                the same reason the nav labels are. Hover still lands on
                --color-cta, whose white label is 4.63:1, so the control behaves
                identically on both grounds and only the resting colours move. */}
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className={cn(
                'hidden items-center justify-center rounded-md px-4 py-2 text-sm font-semibold whitespace-nowrap transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none sm:inline-flex lg:px-5 lg:py-2.5',
                floating
                  ? 'text-white ring-1 ring-white/55 hover:bg-[var(--color-cta)] hover:ring-[var(--color-cta)] focus-visible:ring-white focus-visible:ring-offset-transparent'
                  : 'text-[var(--color-navy)] ring-1 ring-[var(--color-field-border)] hover:bg-[var(--color-cta)] hover:text-[var(--color-cta-ink)] hover:ring-[var(--color-cta)] focus-visible:ring-[var(--color-focus-outline)] focus-visible:ring-offset-2',
              )}
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
            {/* TAP TARGET. min-h-11 / min-w-11 is 44x44 CSS px, the iOS HIG
                floor. px-3 py-2 around a 24px line box was landing this at
                40px tall, which is a miss on the one control that every phone
                user has to hit.

                ON THE FLOATING HOME HEADER it takes a dark chip, because a
                navy label with a navy hairline is unreadable over video. The
                chip is black at 55%, and 55 is a measured number rather than
                a taste one: white text needs the composite behind it at or
                below a relative luminance of 0.183 to clear AA, and the worst
                frame in this clip is effectively white (0.95), so the alpha
                has to be at least 0.535 to hold in the WORST case. At 0.55 the
                label is 4.76:1 over a pure-white frame and better over every
                other one. 40%, which was the first sketch, lands at 2.85:1
                over those same frames.

                `rounded-md`, not a pill. Brett described this as a pill and
                the intent is the same thing: a small chip that separates the
                control from the picture. The sitewide no-pills rule and the
                `rounded-md` every other control on this site uses both win on
                the actual radius. */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav-panel"
              className={cn(
                'inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md px-3 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden',
                floating
                  ? 'bg-black/55 text-white ring-1 ring-white/25 backdrop-blur-[2px] hover:bg-black/70 focus-visible:outline-white'
                  : 'text-neutral-900 ring-1 ring-[var(--color-teal-20)] hover:bg-[var(--color-teal-05)] hover:ring-[var(--color-teal-30)] focus-visible:outline-[var(--color-brand-teal)]',
              )}
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
      </div>

      <div
        id="mobile-nav-panel"
        hidden={!open}
        className="md:hidden mt-3 border-t border-neutral-200 bg-white sm:mt-4"
      >
        <Container className="py-6">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href)
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
                className="inline-flex w-full items-center justify-center rounded-md bg-[var(--color-cta)] px-6 py-3 text-sm font-semibold text-[var(--color-cta-ink)] shadow-sm transition hover:bg-[var(--color-cta-hover)] focus-visible:ring-2 focus-visible:ring-[var(--color-focus-outline)] focus-visible:ring-offset-2 focus-visible:outline-none"
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
