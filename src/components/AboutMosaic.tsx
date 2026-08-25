import Image from 'next/image'

import { FadeIn } from '@/components/FadeIn'

/**
 * AboutMosaic - the "My Story" photo mosaic on /about.
 *
 * A 1-to-1 mirror of the mosaic on Michele's live WordPress site
 * (https://micheleokimura.com/about/), rebuilt 2026-08-25 on Brett's
 * walkthrough. His instruction, quoting Michele: "That's the exact
 * copywriting that we want. That's the exact photos that we want."
 *
 * The crawl is in `design-references/wordpress-about-full/`. WordPress runs:
 *
 *   - one unbroken grid, repeat(3, 1fr) on desktop and 1 column on mobile
 *   - 20px gutters, every tile a 1:1 square, corner radius 0
 *   - a full-tile scrim on hover, rgba(0,0,0,0.6), white centred text,
 *     opacity 0 -> 1 over 0.4s ease-in-out
 *
 * Three deliberate departures, all held over from the first pass:
 *
 *   1. Two columns at `sm`. WordPress jumps 1 -> 3, which turns an iPad into
 *      three narrow strips inside this site's container.
 *   2. The scrim is navy rather than black, at 78%, with cream text on it.
 *      Navy is the house palette. That alpha is the lightest that still holds
 *      cream at better than 5:1 over a white photo, which is the worst case,
 *      and it leaves the photograph legible underneath the way the reference
 *      does. Michele's screenshot of the Renaissance tile is the check here:
 *      the poster type reads straight through the scrim. An opaque panel is
 *      the wrong reading of the reference.
 *   3. Below `sm` the caption sits in an always-visible band at the bottom of
 *      the tile instead of a hover scrim, because an opacity-only hover is
 *      unreachable on a touch screen. From `sm` up it is the WordPress
 *      full-tile behaviour.
 *
 * EVERY TILE CARRIES ITS CAPTION. This is the fix Brett asked for. The
 * previous pass shipped `caption: ''` on 23 of the 24 tiles by a direction
 * that has since been superseded, and because a blank caption renders no
 * overlay at all, hovering did nothing anywhere except the Renaissance tile.
 * The captions below are verbatim from WordPress. The ONLY edits made are the
 * two the house rules require: "Hawaii" -> "Hawai\u02bbi", and a literal tab
 * inside tile 22 collapsed to a space because it cannot render. Known defects
 * in Michele's source copy are therefore PRESERVED on purpose, so she can rule
 * on each one rather than have it quietly corrected:
 *
 *   tile  2  "1955:" on the sisters tile, though Michele was born in 1962
 *   tile  8  "older than than Aaron", doubled word
 *   tile 13  "repeated our! high school conference", stray exclamation mark
 *   tile 17  "2018: Published  2018: Published ...", duplicated clause
 *   tile 23  "our non- profit organization", stray space in the hyphenation
 *
 * Double spaces mid-sentence survive in the source strings on tiles 2, 3, 7,
 * 8, 11, 15, 16, 17, 21, 22, and 24. They collapse at render: `white-space:
 * pre-line` keeps newlines and collapses runs of spaces, which is exactly what
 * is wanted, since tile 1 needs its line break.
 */

type Tile = {
  src: string
  alt: string
  /** Verbatim WordPress caption. Shown on hover from `sm` up. */
  caption: string
  /** The WordPress filename this came from, for tracing back to the crawl. */
  wpFile: string
}

const IMG_ROOT = '/images/about/wordpress-mirror'

/** All 24 tiles, in WordPress document order. */
const TILES: Tile[] = [
  {
    src: `${IMG_ROOT}/01-1962-born-honolulu.jpeg`,
    alt: 'Michele as a baby in Honolulu with her parents and grandmother, 1962.',
    caption:
      '1962: Born in Honolulu, Hawaiʻi.\n(My parents, grandma, and I)',
    wpFile: '1-mom-and-dad-scaled.jpeg',
  },
  {
    src: `${IMG_ROOT}/02-sisters.jpeg`,
    alt: 'Michele with her two younger sisters.',
    caption:
      '1955: Oldest of two beautiful younger sisters.',
    wpFile: '2-sisters--scaled.jpeg',
  },
  {
    src: `${IMG_ROOT}/03-1979-miss-teen-usa.jpeg`,
    alt: 'Michele as a Miss Teen USA finalist, 1979.',
    caption:
      '1979:  Miss Teen USA Finalist I didn’t win. But loved the experience!',
    wpFile: '3-MIss-Teen-USA-scaled.jpeg',
  },
  {
    src: `${IMG_ROOT}/04-1979-high-school-graduation.jpeg`,
    alt: 'Michele at her high school graduation, 1979.',
    caption:
      '1979: Graduated from high school',
    wpFile: '4-HS-Graduation-scaled.jpeg',
  },
  {
    src: `${IMG_ROOT}/05-1984-college-graduation.jpeg`,
    alt: 'Michele at her University of Hawaiʻi graduation, 1984.',
    caption:
      '1984: Graduated from college with a bachelor’s degree in Elementary Education.',
    wpFile: '5-UH-graduation.jpeg',
  },
  {
    src: `${IMG_ROOT}/06-1984-wedding-rob.jpeg`,
    alt: 'Michele and Rob on their wedding day, 1984.',
    caption:
      '1984: Married Rob after dating for three years. The love of my life and best friend.',
    wpFile: '6-wedding-scaled.jpeg',
  },
  {
    src: `${IMG_ROOT}/07-1991-son-aaron.jpeg`,
    alt: 'Michele with her son Aaron, adopted in 1991.',
    caption:
      '1991:  Overflowing joy! Adopted our son Aaron.',
    wpFile: '7-Aaron-scaled.jpeg',
  },
  {
    src: `${IMG_ROOT}/08-1993-daughter-jessica.jpeg`,
    alt: 'Michele with her daughter Jessica, adopted in 1993.',
    caption:
      '1993: More rivers of joy!  Adopted our daughter Jessica…who happened to be 9 days older than than Aaron! My twin-like sweeties.',
    wpFile: '8-Jessica-joned--scaled.jpeg',
  },
  {
    src: `${IMG_ROOT}/09-1997-lifespring-church.png`,
    alt: 'Lifespring Church, founded by Michele and Rob in Honolulu, 1997.',
    caption:
      '1997: Rob and I founded Lifespring Church. I was unconventionally qualified to be a pastor by comedian Jim Carrey, but that is another story for another time.',
    wpFile: '9-LIfespring-Church.png',
  },
  {
    src: `${IMG_ROOT}/10-renaissance-conferences.jpeg`,
    alt: 'Poster for the Renaissance creativity conferences, 2010 and 2011.',
    caption:
      'Renaissance Conferences in 2010 and 2011: my first two arts conferences to release people into greater creativity!',
    wpFile: 'Renaissance-2010-and-2011-scaled.jpeg',
  },
  {
    src: `${IMG_ROOT}/11-2011-dancing-with-father.jpeg`,
    alt: 'Dancing with Father, published 2011.',
    caption:
      '2011: Published Dancing with Father. Let’s heal  hearts.',
    wpFile: '10-Dancing-with-Father-scaled.jpeg',
  },
  {
    src: `${IMG_ROOT}/12-2014-first-islandwide-conference.jpeg`,
    alt: 'The first island-wide youth and parent conference, 2014.',
    caption:
      '2014: Our first island-wide youth and parent conference. Little did I know then that it would grow into a movement.',
    wpFile: '11-2014-EX-conference-.jpeg',
  },
  {
    src: `${IMG_ROOT}/13-2015-middle-school-conference.jpeg`,
    alt: 'The first middle school conference, 2015.',
    caption:
      '2015: Unexpected curve ball! Explicit Conferences grew into a non-profit organization. And we held our first middle school, young adult, and parent conferences AND repeated our! high school conference. How ever did we do 4 in one year?!!',
    wpFile: '12-Middle-School-Conf.jpeg',
  },
  {
    src: `${IMG_ROOT}/14-2016-philippines.jpeg`,
    alt: 'Conference in the Philippines, Manila and Baguio, 2016.',
    caption:
      '2016: Another shocker… going global! Philippines Conferences in Manila and Baguio.',
    wpFile: '13-Philippines.jpeg',
  },
  {
    src: `${IMG_ROOT}/15-2016-singapore.jpeg`,
    alt: 'Youth and parent conference in Singapore, 2016.',
    caption:
      '2016: Asia here we come!  Youth and Parent Conference in Singapore!',
    wpFile: '14-Singapore.jpeg',
  },
  {
    src: `${IMG_ROOT}/16-2018-university-course.png`,
    alt: 'Michele teaching her first university course, 2018.',
    caption:
      '2018: Teaching my first  University course.',
    wpFile: '15-PACRIM.png',
  },
  {
    src: `${IMG_ROOT}/17-2018-explicit-movement-books.jpeg`,
    alt: 'The Birth of Explicit Movement and the Explicit Movement 21-Day Journal, 2018.',
    caption:
      '2018: Published  2018: Published The Birth of Explicit Movement:  Discover Keys to Fulfilling Your Purpose and  the Explicit Movement 21-Day Journal.',
    wpFile: '16-EX-books-scaled.jpeg',
  },
  {
    src: `${IMG_ROOT}/18-2018-socal-conference.jpeg`,
    alt: 'The first California youth and parent conference, 2018.',
    caption:
      '2018: Hello SoCal! The first California Youth and Parent Conference.',
    wpFile: '17-SoCal-scaled.jpeg',
  },
  {
    src: `${IMG_ROOT}/19-2019-kingdom-kids-workshops.jpeg`,
    alt: 'Kingdom Kids equipping workshops for parents, teachers, and leaders, 2019.',
    caption:
      '2019: Began launching equipping events for parents, teachers, and leaders in raising healthy and flourishing children and youth!',
    wpFile: 'Kingdom-Kids-Workshops.jpeg',
  },
  {
    src: `${IMG_ROOT}/20-rethink-creativity-conferences.jpeg`,
    alt: 'ReThink Creativity online conferences, 2020 and 2021.',
    caption:
      'MY GREAT JOY! Online Creativity Conferences in 2020 and 2021, hosting global speakers!',
    wpFile: 'ReThink-Creativity-2020-and-2021-scaled.jpeg',
  },
  {
    src: `${IMG_ROOT}/21-2022-brave-and-beautiful.jpeg`,
    alt: 'The Brave & Beautiful curriculum, published 2022.',
    caption:
      '2022: Published the Brave & Beautiful Curriculum. Empowering teen girls and women with confidence, purpose, and tools to  protect themselves from exploitation.',
    wpFile: '18-B-and-Beautiful-.jpeg',
  },
  {
    src: `${IMG_ROOT}/22-2023-outstanding-advocate-award.jpeg`,
    alt: 'Michele receiving the Outstanding Advocate for Children and Youth award, 2023.',
    caption:
      '2023: SURPRISE! Awarded the Hawaiʻi State’s 2023 ‘Outstanding Advocate for the Children and Youth in The State of Hawaiʻi Award’ by Mayor Blangiardi and Governor Green. Humbled greatly.  I didn’t even know we were nominated!',
    wpFile: '19-award.jpeg',
  },
  {
    src: `${IMG_ROOT}/23-2023-rg-10th-anniversary.jpeg`,
    alt: 'Releasing Generations tenth anniversary, 2023.',
    caption:
      '2023: Happy 10th Birthday to our non- profit organization Releasing Generations. Overwhelmed with gratitude for the journey.',
    wpFile: '20-10th-Annniversary-scaled.jpeg',
  },
  {
    src: `${IMG_ROOT}/24-dream-big-journals.jpeg`,
    alt: 'The Dream Big Journals curriculum, 2023 to 2025.',
    caption:
      '2023-2025: Published the Dream Big Journals curriculum. Versions created for Preschoolers  through adults.',
    wpFile: '21-dream-books-scaled.jpeg',
  },
]

function MosaicTile({ tile }: { tile: Tile }) {
  return (
    <li>
      {/* `group` is on the figure, and the figure is the hover target, so the
          whole square reveals the caption rather than just the text box.
          `tabIndex` makes it reachable by keyboard, which is the only way the
          caption is available to someone not using a mouse on desktop. */}
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

        {/* Below sm: a solid band pinned to the bottom, always visible, because
            an opacity-only hover cannot be reached on a touch screen.
            From sm up: the WordPress full-tile scrim, revealed on hover or
            keyboard focus.

            The scrim colour is written as a literal rgba rather than
            `bg-[var(--color-navy)]/78`. The opacity modifier on an arbitrary
            CSS variable compiles to a color-mix() that has to resolve the
            variable at paint time, and a literal cannot fail. This overlay is
            the thing that was reported broken, so it is worth being blunt
            about. --color-navy is #1F2744. */}
        <figcaption
          className={[
            'pointer-events-none absolute inset-0 flex flex-col justify-end p-4',
            'text-sm leading-snug whitespace-pre-line text-[var(--color-cream)]',
            'bg-gradient-to-t from-[rgba(31,39,68,0.92)] via-[rgba(31,39,68,0.62)] to-transparent',
            'sm:items-center sm:justify-center sm:p-5 sm:text-center sm:text-base sm:leading-normal',
            'sm:bg-[rgba(31,39,68,0.78)] sm:bg-none',
            'sm:opacity-0 sm:transition-opacity sm:duration-[400ms] sm:ease-in-out',
            'sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100',
            'motion-reduce:transition-none',
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
        {/* Hover is not discoverable on its own, and on this page the captions
            ARE the content. One quiet line is cheaper than 24 visible bands. */}
        <p className="mt-3 text-base text-neutral-600 sm:hidden">
          Michele&rsquo;s story, year by year.
        </p>
        <p className="mt-3 hidden text-base text-neutral-600 sm:block">
          Hover over any photo to read the story behind it.
        </p>
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
            <MosaicTile key={tile.wpFile} tile={tile} />
          ))}
        </ul>
      </FadeIn>
    </section>
  )
}
