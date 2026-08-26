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
 * CAPTIONS, 2026-08-26. Michele asked for the hover verbiage to be live: "when
 * the cursor hovers over each photo, there should be words that appear in a
 * transparent way but pop." Her own WordPress copy is now wired in for all 24
 * tiles, from `design-references/wordpress-about/mosaic-tiles.json`. This
 * replaces the interim state where every caption but Renaissance was blank.
 *
 * Her wording is verbatim except for these, all of which are typography rather
 * than authorship:
 *
 *   - doubled spaces mid-sentence collapsed (tiles 3, 7, 12, 14, 15, 21, 22,
 *     24), since captions render with `whitespace-pre-line`
 *   - tile 8 "older than than Aaron" -> "older than Aaron"
 *   - tile 13 "repeated our! high school" -> "repeated our high school"
 *   - tile 17 "2018: Published  2018: Published The Birth of..." de-duplicated
 *   - tile 22 a literal tab collapsed to a space
 *   - tile 23 "non- profit" -> "non-profit"
 *   - "Hawaii" set as "Hawaiʻi" per DESIGN-RULES.md
 *
 * Two things are NOT verbatim and are flagged for Michele:
 *
 *   - Tile 2 still says "1955", which cannot be right when tile 1 says she was
 *     born in 1962. Left as she wrote it; she rules on the year.
 *   - Tile 22 now names Releasing Generations as the award recipient. The
 *     WordPress caption reads as though the award were Michele's personally,
 *     and it is the organisation's. See the recipient note in
 *     src/lib/credentials.ts, which says not to put her name alone back.
 *
 * FOUR PHOTOS ARE STILL MISSING. They were on the WordPress install and are
 * not in this repo, not in Brett's master folder, not in Michele's Drive or
 * Dropbox, and not in Canva. micheleokimura.com now serves this Next.js app,
 * so /wp-content/uploads/ 403s, and the Wayback Machine holds no snapshot of
 * any of the four. Their tiles render the caption over a tinted panel with a
 * "Photo to come" label, so the story still reads and the gap is obvious.
 * Filenames are in the reference README under "Photos that exist on WordPress
 * but not in this repo".
 */

type Tile = {
  /** Omitted where the photo is missing. See the four flagged below. */
  src?: string
  alt: string
  caption: string
}

const IMG_ROOT = '/images/about-timeline'

/** All 24 tiles in WordPress document order. */
const TILES: Tile[] = [
  {
    src: `${IMG_ROOT}/about-1962-parents-grandma-01.jpg`,
    alt: 'Michele as a baby with her parents and grandmother in Honolulu, 1962.',
    caption: '1962: Born in Honolulu, Hawaiʻi.\n(My parents, grandma, and I)',
  },
  {
    src: `${IMG_ROOT}/about-1964-sisters-02.jpg`,
    alt: 'Michele with her two younger sisters.',
    /* "1955" is Michele's own wording and contradicts the 1962 birth year on
       the tile above. Left for her to rule on. */
    caption: '1955: Oldest of two beautiful younger sisters.',
  },
  {
    src: `${IMG_ROOT}/about-1979-miss-teen-usa-03.jpg`,
    alt: 'Michele as a Miss Teen USA finalist, 1979.',
    caption:
      '1979: Miss Teen USA Finalist I didn’t win. But loved the experience!',
  },
  {
    src: `${IMG_ROOT}/about-1979-high-school-graduation-04.jpg`,
    alt: 'Michele at her high school graduation, 1979.',
    caption: '1979: Graduated from high school',
  },
  {
    src: `${IMG_ROOT}/about-1984-college-graduation-05.jpg`,
    alt: 'Michele at her college graduation, 1984.',
    caption:
      '1984: Graduated from college with a bachelor’s degree in Elementary Education.',
  },
  {
    src: `${IMG_ROOT}/about-1984-wedding-rob-06.jpg`,
    alt: 'Michele and Rob on their wedding day, 1984.',
    caption:
      '1984: Married Rob after dating for three years. The love of my life and best friend.',
  },
  {
    src: `${IMG_ROOT}/about-1991-son-aaron-07.jpg`,
    alt: 'Michele with her newborn son Aaron, 1991.',
    caption: '1991: Overflowing joy! Adopted our son Aaron.',
  },
  {
    src: `${IMG_ROOT}/about-1993-daughter-jessica-08.jpg`,
    alt: 'Michele with her newborn daughter Jessica, 1993.',
    caption:
      '1993: More rivers of joy! Adopted our daughter Jessica…who happened to be 9 days older than Aaron! My twin-like sweeties.',
  },
  {
    src: `${IMG_ROOT}/about-1997-lifespring-church-founded-09.jpg`,
    alt: 'Lifespring Church, founded by Michele and Rob in Honolulu, 1997.',
    caption:
      '1997: Rob and I founded Lifespring Church. I was unconventionally qualified to be a pastor by comedian Jim Carrey, but that is another story for another time.',
  },
  {
    /* MISSING PHOTO. WordPress: Renaissance-2010-and-2011-scaled.jpeg */
    alt: 'Renaissance conference flyer, 2011.',
    caption:
      'Renaissance Conferences in 2010 and 2011: my first two arts conferences to release people into greater creativity!',
  },
  {
    src: `${IMG_ROOT}/about-2011-dancing-with-father-published-10.jpg`,
    alt: 'Dancing with Father, published 2011.',
    caption: '2011: Published Dancing with Father. Let’s heal hearts.',
  },
  {
    /* MISSING PHOTO. WordPress: 11-2014-EX-conference-.jpeg */
    alt: 'The first island-wide youth and parent conference, 2014.',
    caption:
      '2014: Our first island-wide youth and parent conference. Little did I know then that it would grow into a movement.',
  },
  {
    src: `${IMG_ROOT}/about-2015-explicit-nonprofit-12.jpg`,
    alt: 'Explicit Conferences become a nonprofit organization, 2015.',
    caption:
      '2015: Unexpected curve ball! Explicit Conferences grew into a non-profit organization. And we held our first middle school, young adult, and parent conferences AND repeated our high school conference. How ever did we do 4 in one year?!!',
  },
  {
    src: `${IMG_ROOT}/about-2016-philippines-conference-13.jpg`,
    alt: 'Conference in the Philippines, 2016.',
    caption:
      '2016: Another shocker… going global! Philippines Conferences in Manila and Baguio.',
  },
  {
    src: `${IMG_ROOT}/about-2016-singapore-conference-14.jpg`,
    alt: 'Youth and parent conference in Singapore, 2016.',
    caption:
      '2016: Asia here we come! Youth and Parent Conference in Singapore!',
  },
  {
    src: `${IMG_ROOT}/about-2018-pacrim-university-15.jpg`,
    alt: 'Michele teaching her first university course, 2018.',
    caption: '2018: Teaching my first University course.',
  },
  {
    src: `${IMG_ROOT}/about-2018-explicit-movement-books-16.jpg`,
    alt: 'The Birth of Explicit Movement and its 21-Day Journal, 2018.',
    caption:
      '2018: Published The Birth of Explicit Movement: Discover Keys to Fulfilling Your Purpose and the Explicit Movement 21-Day Journal.',
  },
  {
    src: `${IMG_ROOT}/about-2018-california-conference-17.jpg`,
    alt: 'The first California youth and parent conference, 2018.',
    caption:
      '2018: Hello SoCal! The first California Youth and Parent Conference.',
  },
  {
    /* MISSING PHOTO. WordPress: Kingdom-Kids-Workshops.jpeg */
    alt: 'Kingdom Kids equipping workshops, 2019.',
    caption:
      '2019: Began launching equipping events for parents, teachers, and leaders in raising healthy and flourishing children and youth!',
  },
  {
    /* MISSING PHOTO. WordPress: ReThink-Creativity-2020-and-2021-scaled.jpeg */
    alt: 'ReThink Creativity online conferences, 2020 and 2021.',
    caption:
      'MY GREAT JOY! Online Creativity Conferences in 2020 and 2021, hosting global speakers!',
  },
  {
    src: `${IMG_ROOT}/about-2022-brave-and-beautiful-published-18.jpg`,
    alt: 'The Brave & Beautiful curriculum, published 2022.',
    caption:
      '2022: Published the Brave & Beautiful Curriculum. Empowering teen girls and women with confidence, purpose, and tools to protect themselves from exploitation.',
  },
  {
    src: `${IMG_ROOT}/about-2023-hawaii-outstanding-advocate-19.jpg`,
    alt: 'Michele receiving the Outstanding Advocate award, 2023.',
    /* Recipient is the organisation. See the header note and credentials.ts. */
    caption:
      '2023: SURPRISE! Releasing Generations was awarded the State of Hawaiʻi’s 2023 ‘Outstanding Advocate for the Children and Youth in The State of Hawaiʻi Award’ by Mayor Blangiardi and Governor Green. Humbled greatly. I didn’t even know we were nominated!',
  },
  {
    src: `${IMG_ROOT}/about-2023-rg-10th-anniversary-20.jpg`,
    alt: 'Releasing Generations tenth anniversary, 2023.',
    caption:
      '2023: Happy 10th Birthday to our non-profit organization Releasing Generations. Overwhelmed with gratitude for the journey.',
  },
  {
    src: `${IMG_ROOT}/about-2023-2025-dream-big-journals-21.jpg`,
    alt: 'The Dream Big Journals curriculum, 2023 to 2025.',
    caption:
      '2023-2025: Published the Dream Big Journals curriculum. Versions created for Preschoolers through adults.',
  },
]

function MosaicTile({ tile }: { tile: Tile }) {
  /* A tile with no photograph shows its caption outright, so there is nothing
     to reveal and nothing to focus. Only photographed tiles are tab stops. */
  if (!tile.src) {
    return (
      <li>
        <div className="flex aspect-square w-full flex-col justify-end gap-3 bg-[var(--color-navy-10)] p-4 sm:items-center sm:justify-center sm:p-5 sm:text-center">
          <span className="font-display text-[0.6875rem] font-semibold tracking-[0.22em] text-neutral-500 uppercase">
            Photo to come
          </span>
          <p className="text-sm leading-snug whitespace-pre-line text-neutral-700 sm:text-base sm:leading-normal">
            {tile.caption}
          </p>
        </div>
      </li>
    )
  }

  return (
    <li>
      <figure
        tabIndex={0}
        className="group relative block aspect-square w-full overflow-hidden bg-[var(--color-navy-10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
      >
        <Image
          src={tile.src}
          alt={tile.alt}
          fill
          sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />

        {/* Below sm: a bottom gradient band, always visible, because an
            opacity-only hover cannot be reached on a touch screen.
            From sm up: the WordPress full-tile scrim on hover or focus. */}
        <figcaption
          className={[
            'pointer-events-none absolute inset-0 flex flex-col justify-end whitespace-pre-line p-4 text-sm leading-snug text-[var(--color-cream)]',
            'bg-gradient-to-t from-[var(--color-navy)] via-[var(--color-navy)]/70 to-transparent',
            'sm:items-center sm:justify-center sm:bg-none sm:p-5 sm:text-base sm:leading-normal sm:text-center',
            'sm:bg-[var(--color-navy)]/75 sm:opacity-0 sm:transition-opacity sm:duration-[400ms] sm:ease-in-out',
            'sm:group-hover:opacity-100 sm:group-focus:opacity-100 sm:group-focus-visible:opacity-100',
            'sm:motion-reduce:transition-none',
          ].join(' ')}
        >
          {tile.caption}
        </figcaption>
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
