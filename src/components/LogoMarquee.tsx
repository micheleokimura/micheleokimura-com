import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { CLIENT_LOGOS, type ClientLogo } from '@/lib/client-logos'

/**
 * LogoMarquee — single-row, right-to-left auto-scroll below the home hero.
 * Reuses the .marquee-track / .marquee-band CSS from tailwind.css (defined
 * for OrgCarousel) but overrides the animation duration inline: that shared
 * class runs a slow 135s two-row cycle, while this single row of 17 logos
 * wants a snappier pass.
 *
 * Three tile shapes come out of the registry:
 *  - a logo that links to a case study,
 *  - a logo with no case study yet, rendered as plain non-clickable art,
 *  - a text tile, used for Kamehameha Schools, whose mark is trademarked and
 *    is not reproduced here.
 */
function LogoArt({ item }: { item: ClientLogo }) {
  if (!item.logo) {
    return (
      <span className="font-display px-1 text-center text-sm leading-tight font-semibold tracking-[0.14em] text-neutral-500 uppercase transition duration-300 group-hover:text-[var(--color-brand-teal)]">
        {item.name}
      </span>
    )
  }

  return (
    <Image
      src={item.logo}
      alt={item.name}
      fill
      sizes="160px"
      className={[
        'object-contain opacity-60 transition duration-300 group-hover:opacity-100',
        // Inverted art is monochrome to begin with, so it keeps no grayscale
        // pass; the other logos desaturate and come back to colour on hover.
        item.invert ? 'invert' : 'grayscale group-hover:grayscale-0',
        item.matte ? 'mix-blend-multiply' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    />
  )
}

function LogoTile({ item }: { item: ClientLogo }) {
  const inner = (
    <>
      <span className="relative flex h-12 w-full items-center justify-center">
        <LogoArt item={item} />
      </span>
      <span className="text-center text-xs text-neutral-500 transition group-hover:text-neutral-800">
        {item.name}
      </span>
    </>
  )

  const className =
    'group flex w-36 shrink-0 flex-col items-center gap-2 px-4 sm:w-40'

  if (!item.href) {
    return (
      <div className={className} aria-label={item.name}>
        {inner}
      </div>
    )
  }

  return (
    <Link
      href={item.href}
      aria-label={`Read the ${item.name} story`}
      className={className}
    >
      {inner}
    </Link>
  )
}

export function LogoMarquee() {
  if (CLIENT_LOGOS.length === 0) return null

  const items = [...CLIENT_LOGOS, ...CLIENT_LOGOS]

  return (
    <section
      aria-label="Organizations Michele has worked with"
      className="bg-[var(--color-cream)] py-16 lg:py-24"
    >
      <Container>
        <FadeIn>
          <h2 className="text-center font-display text-3xl font-medium tracking-tight text-[var(--color-brand-teal)] sm:text-4xl">
            Organizations I&rsquo;ve worked with.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-neutral-600">
            Hover to pause, click any logo for the story.
          </p>
        </FadeIn>
      </Container>

      <FadeIn>
        <div className="marquee-band mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div
            className="marquee-track marquee-rtl"
            style={{ animationDuration: '48s' }}
          >
            {items.map((item, i) => (
              <LogoTile key={`${item.slug}-${i}`} item={item} />
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  )
}
