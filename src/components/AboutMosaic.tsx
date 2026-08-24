import Image from 'next/image'

import { FadeIn } from '@/components/FadeIn'

/**
 * AboutMosaic - the "My Story" photo mosaic on /about.
 *
 * This is a rebuild of the mosaic on Michele's live WordPress site
 * (https://micheleokimura.com/about/), which she asked for by name on
 * 2026-08-23: "it's all one big mosaic together, and when the cursor hovers
 * over each picture, some verbiage appears."
 *
 * The crawl, the measurements, and the caption defects are documented in
 * `design-references/wordpress-about/`. In short, WordPress runs:
 *
 *   - one unbroken grid, repeat(3, 1fr) on desktop and 1 column on mobile
 *   - 20px gutters, every tile a 1:1 square
 *   - a full-tile scrim on hover, rgba(0,0,0,0.6), white centred text,
 *     opacity 0 -> 1 over 0.4s ease-in-out
 *
 * Three deliberate departures, all noted for Michele:
 *
 *   1. Two columns at `sm`. WordPress jumps 1 -> 3, which turns an iPad into
 *      three narrow strips inside this site's container.
 *   2. The scrim is navy rather than black, at 90%, with cream text on it.
 *      That is the house palette and it measures ~11:1. Black/0.6 was
 *      WordPress's own value, not a brand decision.
 *   3. Below `sm` the caption sits in an always-visible gradient band at the
 *      bottom of the tile instead of a hover scrim, because an opacity-only
 *      hover is unreachable on a touch screen. From `sm` up it is the
 *      WordPress full-tile behaviour.
 *
 * Caption copy is verbatim from WordPress. Runs of spaces are collapsed, one
 * duplicated paste artifact is repaired, and "Hawaii" is set with the ʻokina.
 * Nothing else is edited, including the defects listed in the reference README.
 * Do not "fix" 1955, "than than", or "our!" without asking Michele first.
 */

type Tile = { src: string; alt: string; caption: string }

const IMG_ROOT = '/images/about-timeline'

/** WordPress document order. Four WordPress tiles have no photo in this repo
 *  (Renaissance 2010/2011, the 2014 island-wide conference, Kingdom Kids
 *  Workshops 2019, ReThink Creativity 2020/2021) and are absent here rather
 *  than substituted. The closing present-day tile is the one addition. */
const TILES: Tile[] = [
  {
    src: `${IMG_ROOT}/about-1962-parents-grandma-01.jpg`,
    alt: 'Michele as a baby with her parents and grandmother in Honolulu, 1962.',
    caption: '1962: Born in Honolulu, Hawaiʻi.\n(My parents, grandma, and I)',
  },
  {
    src: `${IMG_ROOT}/about-1964-sisters-02.jpg`,
    alt: 'Michele with her two younger sisters.',
    caption: '1955: Oldest of two beautiful younger sisters.',
  },
  {
    src: `${IMG_ROOT}/about-1979-miss-teen-usa-03.jpg`,
    alt: 'Michele as a Miss Teen USA finalist, 1979.',
    caption: '1979: Miss Teen USA Finalist I didn’t win. But loved the experience!',
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
      '1993: More rivers of joy! Adopted our daughter Jessica…who happened to be 9 days older than than Aaron! My twin-like sweeties.',
  },
  {
    src: `${IMG_ROOT}/about-1997-lifespring-church-founded-09.jpg`,
    alt: 'Lifespring Church, founded by Michele and Rob in Honolulu, 1997.',
    caption:
      '1997: Rob and I founded Lifespring Church. I was unconventionally qualified to be a pastor by comedian Jim Carrey, but that is another story for another time.',
  },
  {
    src: `${IMG_ROOT}/about-2011-dancing-with-father-published-10.jpg`,
    alt: 'Dancing with Father, published 2011.',
    caption: '2011: Published Dancing with Father. Let’s heal hearts.',
  },
  {
    src: `${IMG_ROOT}/about-2015-explicit-nonprofit-12.jpg`,
    alt: 'Explicit Conferences become a nonprofit organization, 2015.',
    caption:
      '2015: Unexpected curve ball! Explicit Conferences grew into a non-profit organization. And we held our first middle school, young adult, and parent conferences AND repeated our! high school conference. How ever did we do 4 in one year?!!',
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
    caption: '2016: Asia here we come! Youth and Parent Conference in Singapore!',
  },
  {
    src: `${IMG_ROOT}/about-2018-pacrim-university-15.jpg`,
    alt: 'Michele teaching her first university course, 2018.',
    caption: '2018: Teaching my first University course.',
  },
  {
    src: `${IMG_ROOT}/about-2018-explicit-movement-books-16.jpg`,
    alt: 'The Birth of Explicit Movement and its 21-Day Journal, 2018.',
    // WordPress repeats "2018: Published " twice here. Paste artifact, repaired.
    caption:
      '2018: Published The Birth of Explicit Movement: Discover Keys to Fulfilling Your Purpose and the Explicit Movement 21-Day Journal.',
  },
  {
    src: `${IMG_ROOT}/about-2018-california-conference-17.jpg`,
    alt: 'The first California youth and parent conference, 2018.',
    caption: '2018: Hello SoCal! The first California Youth and Parent Conference.',
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
    caption:
      '2023: SURPRISE! Awarded the Hawaiʻi State’s 2023 ‘Outstanding Advocate for the Children and Youth in The State of Hawaiʻi Award’ by Mayor Blangiardi and Governor Green. Humbled greatly. I didn’t even know we were nominated!',
  },
  {
    src: `${IMG_ROOT}/about-2023-rg-10th-anniversary-20.jpg`,
    alt: 'Releasing Generations tenth anniversary, 2023.',
    caption:
      '2023: Happy 10th Birthday to our non- profit organization Releasing Generations. Overwhelmed with gratitude for the journey.',
  },
  {
    src: `${IMG_ROOT}/about-2023-2025-dream-big-journals-21.jpg`,
    alt: 'The Dream Big Journals curriculum, 2023 to 2025.',
    caption:
      '2023-2025: Published the Dream Big Journals curriculum. Versions created for Preschoolers through adults.',
  },
  {
    // Not on WordPress. Added so the grid closes on a full row of three and the
    // story lands in the present. Caption carried over from AboutTimeline.
    src: `${IMG_ROOT}/present-day-with-tree.jpg`,
    alt: 'Michele Okimura today, in Honolulu.',
    caption: 'Today. Honolulu.',
  },
]

function MosaicTile({ tile }: { tile: Tile }) {
  return (
    <li>
      {/* tabIndex so the caption is reachable by keyboard, since from sm up it
          is otherwise hover-only. group-focus-visible drives the same reveal.
          Focus ring follows the house pattern used on every card on the site. */}
      <figure
        tabIndex={0}
        className="group relative block aspect-square w-full overflow-hidden rounded-xl bg-[var(--color-navy-10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
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
            'bg-gradient-to-t from-[var(--color-navy)] via-[var(--color-navy)]/65 to-transparent',
            'sm:items-center sm:justify-center sm:bg-none sm:p-5 sm:text-center sm:text-base sm:leading-normal',
            'sm:bg-[var(--color-navy)]/90 sm:opacity-0 sm:transition-opacity sm:duration-[400ms] sm:ease-in-out',
            'sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100',
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
          A single FadeIn rather than a stagger: 21 staggered tiles would take
          two and a half seconds to finish arriving. */}
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
