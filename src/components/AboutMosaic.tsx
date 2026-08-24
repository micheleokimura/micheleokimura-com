import Image from 'next/image'

import { FadeIn } from '@/components/FadeIn'

/**
 * AboutMosaic - the "My Story" photo mosaic on /about.
 *
 * A rebuild of the mosaic on Michele's live WordPress site
 * (https://micheleokimura.com/about/), which she asked for by name on
 * 2026-08-23: "it's all one big mosaic together, and when the cursor hovers
 * over each picture, some verbiage appears."
 *
 * The crawl, the measurements, Michele's own screenshots, and the caption
 * defect list are in `design-references/wordpress-about/`. WordPress runs:
 *
 *   - one unbroken grid, repeat(3, 1fr) on desktop and 1 column on mobile
 *   - 20px gutters, every tile a 1:1 square, corner radius 0
 *   - a full-tile scrim on hover, rgba(0,0,0,0.6), white centred text,
 *     opacity 0 -> 1 over 0.4s ease-in-out
 *
 * Three deliberate departures:
 *
 *   1. Two columns at `sm`. WordPress jumps 1 -> 3, which turns an iPad into
 *      three narrow strips inside this site's container.
 *   2. The scrim is navy rather than black, at 75%, with cream text on it.
 *      Navy is the house palette. 75% is the lightest alpha that still holds
 *      cream at 5.3:1 over a white photo, which is the worst case, and it
 *      leaves the photograph legible underneath the way the reference does.
 *      Michele's screenshot of the Renaissance tile is the check here: the
 *      poster type reads straight through the scrim. An opaque panel is wrong.
 *   3. Below `sm` the caption sits in an always-visible gradient band at the
 *      bottom of the tile instead of a hover scrim, because an opacity-only
 *      hover is unreachable on a touch screen. From `sm` up it is the
 *      WordPress full-tile behaviour.
 *
 * CAPTIONS ARE INTENTIONALLY BLANK, by direction on 2026-08-23. Only the
 * Renaissance tile carries copy. Every other tile waits on Michele to send
 * caption text. A tile with an empty caption renders no overlay at all, so
 * hovering it does nothing.
 *
 * The verbatim WordPress caption for all 24 tiles was extracted on the same
 * day and is preserved in `design-references/wordpress-about/mosaic-tiles.json`
 * if her copy is ever wanted back. Note that copy carries known defects: a
 * "1955" date on the sisters tile, "than than", "our!", and "non- profit".
 */

type Tile = {
  /** Omitted where the photo has not been migrated into the repo yet. */
  src?: string
  alt: string
  /** Blank until Michele sends per-tile copy. Blank means no hover overlay. */
  caption: string
}

const IMG_ROOT = '/images/about-timeline'

/**
 * All 24 tiles in WordPress document order.
 *
 * Twenty are wired to photos already in the repo, migrated in commit df736e0.
 * Four have no asset here and render a placeholder square. Those four are
 * licensed originals on the WordPress install and are being migrated properly
 * in a separate task, so they are deliberately NOT pulled from the live URL.
 * Their filenames and URLs are in the reference JSON.
 */
const TILES: Tile[] = [
  {
    src: `${IMG_ROOT}/about-1962-parents-grandma-01.jpg`,
    alt: 'Michele as a baby with her parents and grandmother in Honolulu, 1962.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-1964-sisters-02.jpg`,
    alt: 'Michele with her two younger sisters.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-1979-miss-teen-usa-03.jpg`,
    alt: 'Michele as a Miss Teen USA finalist, 1979.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-1979-high-school-graduation-04.jpg`,
    alt: 'Michele at her high school graduation, 1979.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-1984-college-graduation-05.jpg`,
    alt: 'Michele at her college graduation, 1984.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-1984-wedding-rob-06.jpg`,
    alt: 'Michele and Rob on their wedding day, 1984.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-1991-son-aaron-07.jpg`,
    alt: 'Michele with her newborn son Aaron, 1991.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-1993-daughter-jessica-08.jpg`,
    alt: 'Michele with her newborn daughter Jessica, 1993.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-1997-lifespring-church-founded-09.jpg`,
    alt: 'Lifespring Church, founded by Michele and Rob in Honolulu, 1997.',
    caption: '',
  },
  {
    /* TODO: Renaissance conference flyer, 2011. Needs Michele to upload.
       On WordPress as Renaissance-2010-and-2011-scaled.jpeg. This is the one
       tile whose caption copy is confirmed. */
    alt: 'Renaissance conference flyer, 2011.',
    caption:
      'Renaissance Conferences in 2010 and 2011: my first two arts conferences to release people into greater creativity!',
  },
  {
    src: `${IMG_ROOT}/about-2011-dancing-with-father-published-10.jpg`,
    alt: 'Dancing with Father, published 2011.',
    caption: '',
  },
  {
    /* TODO: 2014 island-wide youth and parent conference, the prayer circle
       photo. Needs Michele to upload. On WordPress as 11-2014-EX-conference-.jpeg */
    alt: 'The first island-wide youth and parent conference, 2014.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-2015-explicit-nonprofit-12.jpg`,
    alt: 'Explicit Conferences become a nonprofit organization, 2015.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-2016-philippines-conference-13.jpg`,
    alt: 'Conference in the Philippines, 2016.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-2016-singapore-conference-14.jpg`,
    alt: 'Youth and parent conference in Singapore, 2016.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-2018-pacrim-university-15.jpg`,
    alt: 'Michele teaching her first university course, 2018.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-2018-explicit-movement-books-16.jpg`,
    alt: 'The Birth of Explicit Movement and its 21-Day Journal, 2018.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-2018-california-conference-17.jpg`,
    alt: 'The first California youth and parent conference, 2018.',
    caption: '',
  },
  {
    /* TODO: Kingdom Kids workshops, 2019. Needs Michele to upload.
       On WordPress as Kingdom-Kids-Workshops.jpeg */
    alt: 'Kingdom Kids equipping workshops, 2019.',
    caption: '',
  },
  {
    /* TODO: ReThink Creativity online conferences, 2020 and 2021. Needs Michele
       to upload. On WordPress as ReThink-Creativity-2020-and-2021-scaled.jpeg */
    alt: 'ReThink Creativity online conferences, 2020 and 2021.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-2022-brave-and-beautiful-published-18.jpg`,
    alt: 'The Brave & Beautiful curriculum, published 2022.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-2023-hawaii-outstanding-advocate-19.jpg`,
    alt: 'Michele receiving the Outstanding Advocate award, 2023.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-2023-rg-10th-anniversary-20.jpg`,
    alt: 'Releasing Generations tenth anniversary, 2023.',
    caption: '',
  },
  {
    src: `${IMG_ROOT}/about-2023-2025-dream-big-journals-21.jpg`,
    alt: 'The Dream Big Journals curriculum, 2023 to 2025.',
    caption: '',
  },
]

function MosaicTile({ tile }: { tile: Tile }) {
  const hasCaption = tile.caption.trim().length > 0

  return (
    <li>
      {/* Only a tile that actually has a caption is focusable. Putting 24 empty
          tab stops in the middle of the page would be worse than useless. */}
      <figure
        tabIndex={hasCaption ? 0 : undefined}
        className="group relative block aspect-square w-full overflow-hidden bg-[var(--color-navy-10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
      >
        {tile.src ? (
          <Image
            src={tile.src}
            alt={tile.alt}
            fill
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center p-4">
            <span className="font-display text-xs font-semibold tracking-[0.22em] text-neutral-500 uppercase">
              Photo to come
            </span>
          </div>
        )}

        {hasCaption && (
          /* Below sm: a bottom gradient band, always visible, because an
             opacity-only hover cannot be reached on a touch screen.
             From sm up: the WordPress full-tile scrim on hover or focus. */
          <figcaption
            className={[
              'pointer-events-none absolute inset-0 flex flex-col justify-end whitespace-pre-line p-4 text-sm leading-snug text-[var(--color-cream)]',
              'bg-gradient-to-t from-[var(--color-navy)] via-[var(--color-navy)]/65 to-transparent',
              'sm:items-center sm:justify-center sm:bg-none sm:p-5 sm:text-center sm:text-base sm:leading-normal',
              'sm:bg-[var(--color-navy)]/75 sm:opacity-0 sm:transition-opacity sm:duration-[400ms] sm:ease-in-out',
              'sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100',
              'sm:motion-reduce:transition-none',
            ].join(' ')}
          >
            {tile.caption}
          </figcaption>
        )}
      </figure>
    </li>
  )
}

export function AboutMosaic() {
  return (
    <section aria-labelledby="my-story">
      <FadeIn>
        <h2
          id="my-story"
          className="font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl"
        >
          My Story
        </h2>
      </FadeIn>

      {/* One unbroken grid. 20px gutters and square tiles, per WordPress.
          A single FadeIn rather than a stagger: 24 staggered tiles would take
          nearly three seconds to finish arriving. */}
      <FadeIn className="mt-10">
        <ul
          role="list"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {TILES.map((tile, i) => (
            <MosaicTile key={tile.src ?? `placeholder-${i}`} tile={tile} />
          ))}
        </ul>
      </FadeIn>
    </section>
  )
}
