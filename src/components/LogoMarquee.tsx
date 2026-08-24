import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { CLIENT_LOGOS, type ClientLogo } from '@/lib/client-logos'

/**
 * LogoMarquee — single-row, right-to-left auto-scroll below the home hero.
 * Reuses the .marquee-track / .marquee-band CSS from tailwind.css (defined
 * for OrgCarousel) but overrides the animation duration inline.
 *
 * Reworked 2026-08-23 on Michele's review: logos at 2x, full colour at rest
 * (they were grayscale and dimmed), and the drift slowed to half its former
 * pixel speed. See the notes at the tile and at the duration.
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
      <span className="text-center text-sm text-neutral-600 transition group-hover:text-neutral-900">
        {item.name}
      </span>
    </>
  )

  const className =
    'group flex w-72 shrink-0 flex-col items-center gap-3 px-6 sm:w-80'

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
      className="bg-[var(--color-band-3)] py-16 lg:py-24"
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
          {/* 192s, and the number is arithmetic rather than taste. Michele
              asked for the scroll to be ~50% slower. The tiles also doubled in
              width in the same pass, which on its own would have DOUBLED the
              pixel speed at an unchanged duration. So the old 48s has to be
              multiplied twice: x2 to absorb the wider track, then x2 again for
              the requested slowdown. The track travels 50% of its own width per
              cycle, so this is ~26 px/s against the old ~51 px/s. Re-derive
              this if the tile width changes again. */}
          <div
            className="marquee-track marquee-rtl"
            style={{ animationDuration: '192s' }}
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
