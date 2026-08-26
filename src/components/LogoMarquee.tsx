import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { ContactSurface } from '@/components/ContactSurface'
import { FadeIn } from '@/components/FadeIn'
import { CLIENT_LOGOS, type ClientLogo } from '@/lib/client-logos'

/**
 * LogoMarquee — single-row, right-to-left auto-scroll below the home hero.
 * Reuses the .marquee-track / .marquee-band CSS from tailwind.css (defined
 * for OrgCarousel) but overrides the animation duration inline.
 *
 * Reworked 2026-08-23 on Michele's review: logos at 2x and full colour at rest
 * (they were grayscale and dimmed). The drift was halved in the same pass and
 * then taken back up on 2026-08-25. See the notes at the tile and the duration.
 *
 * Every tile is clickable as of 2026-08-25. The art is either a logo image or,
 * for Kamehameha Schools, a text wordmark, since their mark is trademarked and
 * is not reproduced here. The click goes one of two places: to the case study
 * when the registry has an `href`, or to the sitewide contact popup when it
 * does not. Nothing renders as inert art any more. See client-logos.ts.
 */
function LogoArt({ item }: { item: ClientLogo }) {
  if (!item.logo) {
    return (
      <span className="font-display px-1 text-center text-base leading-tight font-semibold tracking-[0.14em] text-neutral-700 uppercase transition duration-300 group-hover:text-[var(--color-brand-teal)]">
        {item.name}
      </span>
    )
  }

  return (
    <Image
      src={item.logo}
      alt={item.name}
      fill
      sizes="320px"
      className={[
        // FULL COLOUR AT REST, per Michele 2026-08-23. These logos used to sit
        // at opacity-60 with a grayscale pass and only came back to colour on
        // hover, which on a touch screen meant never. They are her clients'
        // actual marks and she wants them seen as they are. Do not reintroduce
        // `grayscale` or an opacity dim here.
        'object-contain transition duration-300',
        // `invert` art still has to flip: those files ship white-on-transparent
        // and would otherwise be invisible on a light band. That is a
        // legibility fix, not a desaturation, so it stays.
        item.invert ? 'invert' : '',
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
      {/* 2x the old tile, per Michele 2026-08-23: the art box went h-12 -> h-24
          and the tile w-36/sm:w-40 -> w-72/sm:w-80. The name under it steps up
          with it so the caption does not look orphaned beside a logo twice its
          old size. */}
      <span className="relative flex h-24 w-full items-center justify-center">
        <LogoArt item={item} />
      </span>
      {/* text-sm -> text-base, per Michele 2026-08-25. At 2x tile width the
          caption was legible only if you went looking for it; one step up
          reads at a glance without competing with the logo above it. */}
      <span className="text-center text-base text-neutral-600 transition group-hover:text-neutral-900">
        {item.name}
      </span>
    </>
  )

  const base = 'group flex w-72 shrink-0 flex-col items-center gap-3 px-6 sm:w-80'
  // A <Link> gets a pointer from the user agent; a <button> does not, because
  // Tailwind's preflight resets it to cursor:default. Michele reported exactly
  // that symptom on the three contact tiles, so state it rather than inherit it.
  const className = `${base} cursor-pointer`

  if (item.href) {
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

  // No case study yet. Rather than a dead tile, open the contact popup so the
  // click still goes somewhere and the interest lands in Michele's inbox.
  if (item.contact) {
    return (
      <ContactSurface
        interest="speaking"
        ariaLabel={`Ask Michele about her work with ${item.name}`}
        className={className}
      >
        {inner}
      </ContactSurface>
    )
  }

  // Neither an href nor `contact`. No entry is in this state today; the branch
  // exists so a future tile can opt out of being clickable at all.
  return (
    <div className={base} aria-label={item.name}>
      {inner}
    </div>
  )
}

export function LogoMarquee() {
  if (CLIENT_LOGOS.length === 0) return null

  const items = [...CLIENT_LOGOS, ...CLIENT_LOGOS]

  return (
    <section
      aria-label="Organizations Michele has worked with"
      className="bg-[var(--color-band-2)] py-20 sm:py-24 lg:py-28"
    >
      <Container>
        <FadeIn>
          <h2 className="text-center font-display text-3xl font-medium tracking-tight text-[var(--color-brand-teal)] sm:text-4xl">
            Organizations I&rsquo;ve worked with.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base text-neutral-600">
            Hover to pause, click any logo to learn more.
          </p>
        </FadeIn>
      </Container>

      <FadeIn>
        <div className="marquee-band mt-12 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          {/* 144s: halfway back from Brett's slowdown, per Michele 2026-08-25.
              She wants it faster than the current crawl and slower than it was
              before he asked.

              The history, so the midpoint is arithmetic rather than taste:
                36s  original build
                48s  first slowdown (c970bdb)
                192s Brett's slowdown (8c11587), which in the SAME commit also
                     doubled the tile width, w-36/sm:w-40 -> w-72/sm:w-80

              That last commit is why the raw numbers do not compare. Doubling
              the tile width doubles the track length, so holding pixel speed
              constant already required going 48s -> 96s. Only the second
              doubling, 96s -> 192s, was the slowdown Brett asked for. So the
              pre-slowdown speed expressed in today's geometry is 96s, and the
              midpoint is (96 + 192) / 2 = 144s.

              The track travels 50% of its own width per cycle, which puts this
              at ~35 px/s, between the old ~51 and the current ~26. Taking the
              naive midpoint of the raw numbers, (48 + 192) / 2 = 120s, would
              land at ~42 px/s and undo about three quarters of the slowdown.
              Re-derive this if the tile width changes again. */}
          <div
            className="marquee-track marquee-rtl"
            style={{ animationDuration: '144s' }}
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
