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
 * Four deliberate departures:
 *
 *   1. Two columns at `sm`. WordPress jumps 1 -> 3, which turns an iPad into
 *      three narrow strips inside this site's container.
 *   2. The scrim is navy rather than black, at 70%. Navy is the house palette,
 *      and 70% leaves the photograph legible underneath the way the reference
 *      does. Michele's screenshot of the Renaissance tile is the check here:
 *      the poster type reads straight through the scrim. An opaque panel is
 *      wrong.
 *   3. Caption type is much larger than a caption would normally run: 20px on
 *      a phone, 24px at `sm`, 28px on a desktop tile, semibold, white, tight
 *      leading. Michele asked for this directly on 2026-08-26, because her
 *      audience skews older: "even if the words fill the little box, that
 *      would be fine with me because it disappears when the cursor goes off of
 *      the photo." Then a step larger again on 2026-08-27, alongside the body
 *      copy on /about, for the same reason. Her longest caption at 252
 *      characters still clears the tile at every breakpoint, so nothing clips
 *      and nothing needs an ellipsis, but there is much less slack now than
 *      there was at the 2026-08-26 sizes: the 2015 Explicit tile is the one to
 *      measure. Check it, and any caption longer than 252 characters, before
 *      shipping another bump.
 *   4. Below `sm` the caption sits in an always-visible gradient band at the
 *      bottom of the tile instead of a hover scrim, because an opacity-only
 *      hover is unreachable on a touch screen. From `sm` up it is the
 *      WordPress full-tile behaviour, revealed on hover, on tap, or on
 *      keyboard focus.
 *
 * CAPTIONS. Michele's own copy, confirmed twice: once from the WordPress crawl
 * in `design-references/wordpress-about/mosaic-tiles.json`, then again on
 * 2026-08-26 from the Word document she sent
 * ("Template for About Michele 2.docx"), whose 21-photo grid plus three loose
 * captions at the end match this list tile for tile.
 *
 * Her wording is verbatim except for these, all typography rather than
 * authorship:
 *
 *   - doubled spaces mid-sentence collapsed, since captions render with
 *     `whitespace-pre-line`
 *   - tile 8 "older than than Aaron" -> "older than Aaron"
 *   - tile 13 "repeated our! high school" -> "repeated our high school"
 *   - tile 17 "2018: Published  2018: Published The Birth of..." de-duplicated
 *   - tile 22 a literal tab collapsed to a space
 *   - tile 23 "non- profit" -> "non-profit"
 *   - "Hawaii" set as "Hawaiʻi" per DESIGN-RULES.md
 *
 * Two tiles Michele then rewrote herself on 2026-08-26, closing the last two
 * open questions:
 *
 *   - Tile 2 said "1955", which could not square with the 1962 birth year on
 *     tile 1. She confirmed the year is 1969.
 *   - Tile 22 is her own new wording. It opens "Our nonprofit was honored
 *     with", which keeps the 2023 award with the organisation rather than with
 *     her personally. See the recipient note in src/lib/credentials.ts, which
 *     says not to put her name alone back.
 *
 * All 24 photographs are present as of 2026-08-26. The last four arrived from
 * Michele directly, after the WordPress originals turned out to be
 * unrecoverable, and live in `/images/about` rather than
 * `/images/about-timeline` because they came from her rather than from the
 * timeline migration.
 */

type Tile = {
  src: string
  alt: string
  caption: string
}

const IMG_ROOT = '/images/about-timeline'
/** The four Michele sent on 2026-08-26 to close the gaps. */
const FROM_MICHELE = '/images/about'

/**
 * All 24 tiles in WordPress document order, which is also the order Michele
 * confirmed on 2026-08-26. At three columns that puts Renaissance immediately
 * left of the Dancing with Father book and the 2014 conference immediately
 * right of it, and it puts Kingdom Kids far left and ReThink Creativity in the
 * middle of the second-to-last row. Reordering this array moves those tiles,
 * so check the rows before changing it.
 */
const TILES: Tile[] = [
  {
    src: `${IMG_ROOT}/about-1962-parents-grandma-01.jpg`,
    alt: 'Michele as a baby with her parents and grandmother in Honolulu, 1962.',
    caption: '1962: Born in Honolulu, Hawaiʻi.\n(My parents, grandma, and I)',
  },
  {
    src: `${IMG_ROOT}/about-1964-sisters-02.jpg`,
    alt: 'Michele with her two younger sisters.',
    /* Was "1955", which contradicted the 1962 birth year on the tile above.
       Michele confirmed 1969 on 2026-08-26. */
    caption: '1969: Oldest of two beautiful younger sisters.',
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
      '1992: More rivers of joy! Adopted our daughter Jessica…who happened to be 9 days older than Aaron! My twin-like sweeties.',
  },
  {
    src: `${IMG_ROOT}/about-1997-lifespring-church-founded-09.jpg`,
    alt: 'Lifespring Church, founded by Michele and Rob in Honolulu, 1997.',
    caption:
      '1997: Rob and I founded Lifespring Church. I was unconventionally qualified to be a pastor by comedian Jim Carrey, but that is another story for another time.',
  },
  {
    /* Left of the Dancing with Father book, per Michele. */
    src: `${FROM_MICHELE}/renaissance-2010-2011.jpeg`,
    alt: 'Poster for Renaissance: a Journey to Creativity, July 2011.',
    caption:
      'Renaissance Conferences in 2010 and 2011: my first two arts conferences to release people into greater creativity!',
  },
  {
    src: `${IMG_ROOT}/about-2011-dancing-with-father-published-10.jpg`,
    alt: 'Dancing with Father, published 2011.',
    caption: '2011: Published Dancing with Father. Let’s heal hearts.',
  },
  {
    /* Right of the Dancing with Father book, per Michele. */
    src: `${FROM_MICHELE}/explicit-movement-2014.jpeg`,
    alt: 'Young people standing arm in arm at the 2014 Explicit conference.',
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
    /* Far left of the second-to-last row, per Michele. */
    src: `${FROM_MICHELE}/kingdom-kids-workshops.jpeg`,
    alt: 'Flyer for the Kingdom Kids Workshops led by Michele Okimura.',
    caption:
      '2019: Began launching equipping events for parents, teachers, and leaders in raising healthy and flourishing children and youth!',
  },
  {
    /* Middle of the second-to-last row, per Michele. */
    src: `${FROM_MICHELE}/rethink-creativity-2020-2021.jpeg`,
    alt: 'The ReThink Creativity logo.',
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
    /* Michele's rewrite, 2026-08-26, replacing both her WordPress wording and
       the interim fix that named Releasing Generations outright. "Our
       nonprofit" keeps the recipient correct, which is what credentials.ts
       asks for. Verbatim except for curly apostrophes and the ʻokina. */
    caption:
      '2023: SURPRISE!! Our nonprofit was honored with the Hawaiʻi State’s 2023 Outstanding Advocate for Children and Youth Award by the Governor and the City Mayor. So humbled. I didn’t even know we were nominated!',
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
            From sm up: the WordPress full-tile scrim, on hover, on tap, or on
            keyboard focus. */}
        <figcaption
          className={[
            'pointer-events-none absolute inset-0 flex flex-col justify-end p-4 whitespace-pre-line',
            'text-xl leading-tight font-semibold text-[var(--color-white)]',
            'bg-gradient-to-t from-[var(--color-navy)] via-[var(--color-navy)]/80 to-transparent',
            'sm:items-center sm:justify-center sm:p-5 sm:text-center sm:text-2xl lg:text-3xl',
            'sm:bg-none sm:bg-[var(--color-navy)]/70',
            'sm:opacity-0 sm:transition-opacity sm:duration-[400ms] sm:ease-in-out',
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
          {TILES.map((tile) => (
            <MosaicTile key={tile.src} tile={tile} />
          ))}
        </ul>
      </FadeIn>
    </section>
  )
}
