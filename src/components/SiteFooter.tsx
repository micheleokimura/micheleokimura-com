import Link from 'next/link'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { PodcastSeriesJsonLd } from '@/components/JsonLd'
import { footerColumns, siteConfig } from '@/lib/site-config'

/**
 * Site footer: a full-bleed navy surface carrying a four-column nav
 * (wordmark + tagline + socials / Explore / Community / More from Michele).
 *
 * It used to open with a newsletter block above those columns. Michele cut it
 * on 2026-08-23, along with the podcast platform row, her email address, and
 * the 988 crisis-line notice. See the comments at each removal site.
 *
 * It is dark on purpose. The footer is the one place the brand gets to fill
 * the whole viewport width, which is why the rest of the site can stay cream
 * and quiet. Everything in here is cream text on --color-navy, measured at
 * 12.46:1. Column headings and the wordmark's accent dot are pale teal
 * (--color-teal-on-dark) at 10.53:1.
 *
 * This is also where the pages cut from the header nav live. The header is
 * capped at four links plus Contact; Explore and Community below carry the
 * rest, so nothing became unreachable.
 */

const headingClass =
  'font-display text-xs font-semibold tracking-[0.22em] uppercase text-[var(--color-teal-on-dark)]'

const linkClass =
  'text-[var(--color-cream)]/75 transition hover:text-[var(--color-cream)] hover:underline underline-offset-4 decoration-[var(--color-teal-on-dark)]'

/**
 * Socials. Substack and YouTube were added on Michele's 2026-08-23 review.
 * Entries whose `href` is null are filtered out below rather than rendered as
 * dead icons, so the two placeholders in site-config stay invisible until she
 * supplies the handles. See the note on `siteConfig.socials`.
 */
const socials = [
  {
    href: siteConfig.socials.linkedin,
    label: 'Michele on LinkedIn',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    href: siteConfig.socials.instagram,
    label: 'Michele on Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    href: siteConfig.socials.facebook,
    label: 'Michele on Facebook',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z',
  },
  {
    href: siteConfig.socials.substack,
    label: 'Michele on Substack',
    path: 'M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z',
  },
  {
    href: siteConfig.socials.youtube,
    label: 'Michele on YouTube',
    path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z',
  },
].filter((item): item is { href: string; label: string; path: string } =>
  Boolean(item.href),
)

function MicIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} aria-hidden="true" {...props}>
      <rect x="9" y="2" width="6" height="11" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0" strokeLinecap="round" />
      <path d="M12 18v4M8.5 22h7" strokeLinecap="round" />
    </svg>
  )
}

export function SiteFooter() {
  const podcast = siteConfig.podcast

  return (
    <footer className="mt-24 w-full bg-[var(--color-navy)] sm:mt-32 lg:mt-40" data-surface="dark">
      {/* The podcast lives in the footer, so its structured data travels with
          it and ships on every page instead of only the home page. */}
      <PodcastSeriesJsonLd
        name={podcast.name}
        url={podcast.url}
        publisher={podcast.publisher}
        description={podcast.description}
        inLanguage={podcast.inLanguage}
      />

      <Container>
        <FadeIn>
          {/* The "Stay in touch" newsletter block that used to sit here (the
              "Michele takes a small number of coaching clients and speaking
              dates each year" headline and its wait-list button) was removed on
              2026-08-23 at Michele's instruction. The footer opens straight on
              the columns now. Contact still has a route in the Community
              column and a button in the header. */}

          {/* -------------------------------------------- four columns */}
          {/* Order: brand + socials, Explore, Community, More from Michele. */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-14 sm:py-16 lg:grid-cols-4">
            {/* Wordmark, tagline, location, socials. Cream on navy. */}
            <div className="col-span-2 lg:col-span-1">
              <Link href="/" aria-label={`${siteConfig.brand} home`} className="inline-block">
                <span className="font-display text-xl font-semibold tracking-tight whitespace-nowrap text-[var(--color-cream)]">
                  Michele Okimura
                  <span className="text-[var(--color-teal-on-dark)]">.</span>
                </span>
              </Link>
              <p className="mt-5 max-w-xs text-sm leading-6 text-[var(--color-cream)]/75">
                Speaker, author, and coach. Helping people turn their hardest
                stories into the purpose they were carrying all along.
              </p>
              <p className="mt-5 text-sm text-[var(--color-cream)]/60">
                {siteConfig.city}, {siteConfig.state}
              </p>
              <div className="mt-6 flex gap-4">
                {socials.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="text-[var(--color-cream)]/60 transition hover:text-[var(--color-cream)]"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d={item.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {footerColumns.map((column) => (
              <nav key={column.heading} aria-label={`${column.heading} navigation`}>
                <h2 className={headingClass}>{column.heading}</h2>
                <ul className="mt-6 space-y-3 text-sm">
                  {column.links.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href} className={linkClass}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            {/* More from Michele. Two entries and nothing else, per Michele
                2026-08-23. Three things came out of this column in that pass:
                the "In a moment with Brett K. Moore" co-host line under the
                podcast title, the Spotify / Apple / RSS row beneath it, and her
                michele@micheleokimura.com address, which she had asked to have
                removed once before. The podcast's own page carries the platform
                links, and the JSON-LD block at the top of this footer still
                ships the full podcast metadata on every page. */}
            <div className="col-span-2 lg:col-span-1">
              <h2 className={headingClass}>More from Michele</h2>

              <a
                href={podcast.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-6 flex items-center gap-3"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-cream)]/10 text-[var(--color-cream)] transition group-hover:bg-[var(--color-cta)] group-hover:text-[var(--color-cta-ink)]">
                  <MicIcon className="h-4 w-4" />
                </span>
                <span className="font-display text-base font-semibold text-[var(--color-cream)] decoration-[var(--color-teal-on-dark)] underline-offset-4 group-hover:underline">
                  {podcast.name}
                </span>
              </a>

              <ul className="mt-5 space-y-3 text-sm">
                <li>
                  {/* There is no press-kit page. The press kit is a section on
                      the speaker page, so this anchors to its heading id. */}
                  <Link href="/speaker#press-kit-heading" className={linkClass}>
                    Press kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* ------------------------------------------------ bottom bar */}
          <div className="border-t border-[var(--color-cream)]/15 pt-8 pb-12">
            <p className="text-sm text-[var(--color-cream)]/60">
              &copy; {siteConfig.brand} {new Date().getFullYear()}. All rights
              reserved.
            </p>

            {/* The 988 Suicide & Crisis Lifeline block that used to sit here was
                removed on 2026-08-23. Michele had asked for it twice. It is
                recorded here so the next person to think "this site talks about
                trauma, it should carry a crisis line" knows the omission is her
                decision and not an oversight, and takes it back to her rather
                than re-adding it. */}
          </div>
        </FadeIn>
      </Container>
    </footer>
  )
}
