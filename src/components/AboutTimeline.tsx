import Image from 'next/image'
import type { ReactNode } from 'react'

import { FadeIn } from '@/components/FadeIn'
import { cn } from '@/lib/cn'

/**
 * AboutTimeline - a chronological photo timeline of Michele's life and work,
 * grouped into six eras. Each era block has a year eyebrow, a short headline,
 * a prose paragraph, and one to six photos from
 * `public/images/about-timeline/`.
 *
 * The prose is Michele's first-person voice, adapted from her longer draft at
 * website-dam/06-copywriting/pages/about.md. Voice rules apply: no em-dashes,
 * no AI-tell vocabulary, warm and unhurried. Facts confirmed against the
 * canonical dossier (michele-personal-context.md).
 *
 * Caption behavior (2026-08-22, Brett's request): captions are ALWAYS visible,
 * rendered as a dark gradient band across the bottom of each photo. They are
 * never hover-triggered, so they read the same on touch devices and on desktop.
 * The live WordPress site dims the whole tile with a flat rgba(0,0,0,0.6) panel;
 * a bottom band was chosen instead so each photo stays legible across 20 tiles.
 */

type Photo = { src: string; alt: string; caption?: string }

type Era = {
  years: string
  headline: string
  body: ReactNode
  photos: Photo[]
}

const IMG_ROOT = '/images/about-timeline'

const ERAS: Era[] = [
  {
    years: '1962 - 1979',
    headline: 'Where I started.',
    body: (
      <>
        <p>
          I was born in Honolulu in 1962, the oldest of three sisters, growing
          up in Kaimuki. Our home was safe on the outside. Inside my own head, I
          heard early and consistently that I did not measure up. I keep a
          memory close of a four-year-old girl hiding in a dark closet, feeling
          unloved and lost. That girl was me.
        </p>
        <p>
          By the time I graduated from Kalani High in 1979, I had made the Miss
          Teen USA finals (I did not win, and I loved the experience anyway).
          The woman who believed she had worth was still on her way.
        </p>
      </>
    ),
    photos: [
      {
        src: `${IMG_ROOT}/about-1962-parents-grandma-01.jpg`,
        alt: 'Michele as a baby with her parents and grandmother, 1962.',
        caption: '1962. With my parents and grandma.',
      },
      {
        src: `${IMG_ROOT}/about-1964-sisters-02.jpg`,
        alt: 'Michele with her two younger sisters, 1964.',
        caption: '1964. My sisters and me.',
      },
      {
        src: `${IMG_ROOT}/about-1979-high-school-graduation-04.jpg`,
        alt: 'Michele at her Kalani High School graduation, 1979.',
        caption: '1979. Kalani High graduation.',
      },
      {
        src: `${IMG_ROOT}/about-1979-miss-teen-usa-03.jpg`,
        alt: 'Michele as a Miss Teen USA finalist, 1979.',
        caption: '1979. Miss Teen USA finalist.',
      },
    ],
  },
  {
    years: '1984',
    headline: 'Vocation and love.',
    body: (
      <>
        <p>
          I finished a bachelor&rsquo;s in Elementary Education from the
          University of Hawai&lsquo;i at Manoa in 1984. That same year I married
          Rob Okimura, after a three-year courtship. He is still my best friend
          and the love of my life.
        </p>
        <p>
          What I know about how a person actually learns, I picked up in the
          fourteen years that followed, teaching in a classroom of eight-year-olds
          in the Hawai&lsquo;i public school system.
        </p>
      </>
    ),
    photos: [
      {
        src: `${IMG_ROOT}/about-1984-college-graduation-05.jpg`,
        alt: 'Michele at her UH Manoa graduation, 1984.',
        caption: '1984. UH Manoa graduation.',
      },
      {
        src: `${IMG_ROOT}/about-1984-wedding-rob-06.jpg`,
        alt: 'Michele and Rob Okimura on their wedding day, 1984.',
        caption: '1984. The day Rob and I married.',
      },
    ],
  },
  {
    years: '1991 - 1997',
    headline: 'Family, and a church planted.',
    body: (
      <>
        <p>
          Our son Aaron came in 1991. Our daughter Jessica followed in 1993.
          They are nine days apart on the calendar and two years apart in age,
          and I still call them my twin-like sweeties.
        </p>
        <p>
          In 1997 Rob and I helped plant the church in Honolulu that is now
          called Lifespring Church (originally Hope Chapel LifeSpring). I have
          served as a pastor there ever since, mostly walking with children and
          then teens, and I am still on staff today as a part-time pastor
          alongside our lead pastors Sean and Hitomi Nakamoto.
        </p>
      </>
    ),
    photos: [
      {
        src: `${IMG_ROOT}/about-1991-son-aaron-07.jpg`,
        alt: 'Michele holding her newborn son Aaron, 1991.',
        caption: '1991. Aaron.',
      },
      {
        src: `${IMG_ROOT}/about-1993-daughter-jessica-08.jpg`,
        alt: 'Michele holding her newborn daughter Jessica, 1993.',
        caption: '1993. Jessica.',
      },
      {
        src: `${IMG_ROOT}/about-1997-lifespring-church-founded-09.jpg`,
        alt: 'Hope Chapel LifeSpring church founded in Honolulu, 1997.',
        caption: '1997. Hope Chapel LifeSpring is born.',
      },
    ],
  },
  {
    years: '2011',
    headline: 'The first book.',
    body: (
      <>
        <p>
          I published <em>Dancing with Father</em> in 2011. A short, illustrated
          book of healing for women. I wrote it after a small group of new
          friends prayed over me one afternoon and I heard Father God inviting
          me to dance with Him in the dance of life.
        </p>
        <p>
          That book has ended up in the hands of women in Norway, Japan, and the
          Philippines. A stranger once told me it reached her the night she
          almost took her own life. She chose life instead.
        </p>
      </>
    ),
    photos: [
      {
        src: `${IMG_ROOT}/about-2011-dancing-with-father-published-10.jpg`,
        alt: 'Dancing with Father published, 2011.',
        caption: '2011. Dancing with Father.',
      },
    ],
  },
  {
    years: '2015 - 2018',
    headline: 'The nonprofit, and the movement went wide.',
    body: (
      <>
        <p>
          In 2015 Rob and I brought Releasing Generations into the world, the
          Christian nonprofit that has become the umbrella for everything after
          it. Three initiatives sit under it: Explicit Movement, Kingdom
          Families, and ReThink Creativity.
        </p>
        <p>
          From 2016 forward the work moved out past Hawai&lsquo;i, first to the
          Philippines and Singapore, then to conference stages in Southern
          California and university halls in the Pacific Rim. In 2018 I
          published <em>The Birth of Explicit Movement</em>, along with a
          21-day interactive journal. That book tells the founding story and
          lays out the framework we teach parents, pastors, and youth workers
          for talking with teens about sex, sexual integrity, and healing.
        </p>
      </>
    ),
    photos: [
      {
        src: `${IMG_ROOT}/about-2015-explicit-nonprofit-12.jpg`,
        alt: 'Releasing Generations nonprofit founded, 2015.',
        caption: '2015. Releasing Generations begins.',
      },
      {
        src: `${IMG_ROOT}/about-2016-philippines-conference-13.jpg`,
        alt: 'Michele speaking at a Philippines conference, 2016.',
        caption: '2016. Philippines.',
      },
      {
        src: `${IMG_ROOT}/about-2016-singapore-conference-14.jpg`,
        alt: 'Michele speaking at a Singapore conference, 2016.',
        caption: '2016. Singapore.',
      },
      {
        src: `${IMG_ROOT}/about-2018-pacrim-university-15.jpg`,
        alt: 'Michele at PacRim University, 2018.',
        caption: '2018. PacRim University.',
      },
      {
        src: `${IMG_ROOT}/about-2018-explicit-movement-books-16.jpg`,
        alt: 'Birth of Explicit Movement books, 2018.',
        caption: '2018. The Explicit Movement books.',
      },
      {
        src: `${IMG_ROOT}/about-2018-california-conference-17.jpg`,
        alt: 'Michele speaking at a Southern California conference, 2018.',
        caption: '2018. Southern California.',
      },
    ],
  },
  {
    years: '2022 - 2025',
    headline: 'Curriculum, honors, and the journals.',
    body: (
      <>
        <p>
          The Brave Series teen curriculum started shipping in 2022 with{' '}
          <em>Brave &amp; Beautiful</em>. In 2023 the State of Hawai&lsquo;i
          named Explicit Movement its Outstanding Advocate for Children and
          Youth. Governor Josh Green and Mayor Rick Blangiardi handed me that
          award at the 30th anniversary of Hawai&lsquo;i Children and Youth
          Day. I still cannot quite believe we were nominated.
        </p>
        <p>
          That same year, Releasing Generations turned ten. The Dream Big
          journal series (younger elementary, older elementary, and youth
          editions) rolled out through 2025.
        </p>
      </>
    ),
    photos: [
      {
        src: `${IMG_ROOT}/about-2022-brave-and-beautiful-published-18.jpg`,
        alt: 'Brave & Beautiful published, 2022.',
        caption: '2022. Brave & Beautiful.',
      },
      {
        src: `${IMG_ROOT}/about-2023-hawaii-outstanding-advocate-19.jpg`,
        alt: 'Michele receiving the Hawai‘i Outstanding Advocate award, 2023.',
        caption: '2023. Outstanding Advocate for Children and Youth of Hawai‘i.',
      },
      {
        src: `${IMG_ROOT}/about-2023-rg-10th-anniversary-20.jpg`,
        alt: 'Releasing Generations 10th anniversary, 2023.',
        caption: '2023. Ten years of Releasing Generations.',
      },
      {
        src: `${IMG_ROOT}/about-2023-2025-dream-big-journals-21.jpg`,
        alt: 'Dream Big journals, 2023 to 2025.',
        caption: '2023 to 2025. The Dream Big journals.',
      },
    ],
  },
]

function PhotoGrid({ photos }: { photos: Photo[] }) {
  const single = photos.length === 1
  const cols = single
    ? 'grid-cols-1'
    : photos.length === 2
      ? 'grid-cols-2'
      : 'grid-cols-2 sm:grid-cols-3'

  // A single photo would otherwise stretch the full column width.
  const sizes = single
    ? '(min-width: 1024px) 26rem, (min-width: 640px) 60vw, 90vw'
    : '(min-width: 1024px) 15rem, (min-width: 640px) 30vw, 45vw'

  return (
    <ul role="list" className={cn('grid gap-3 sm:gap-4', cols, single && 'max-w-sm')}>
      {photos.map((p) => (
        <li key={p.src}>
          <figure className="group relative overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-200">
            <span className="relative block aspect-[4/5] w-full bg-[color-mix(in_oklab,var(--color-brand-teal)_10%,white)]">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes={sizes}
                className="object-cover transition duration-500 group-hover:scale-[1.02]"
              />
            </span>

            {/* Always-visible caption band. No hover state, so touch devices
                read exactly what desktop reads. */}
            {p.caption && (
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/60 to-transparent px-3 pt-10 pb-3 text-xs leading-snug font-medium text-white sm:text-sm">
                {p.caption}
              </figcaption>
            )}
          </figure>
        </li>
      ))}
    </ul>
  )
}

function EraBlock({ era, index }: { era: Era; index: number }) {
  // Alternate photo side on desktop for visual rhythm; stack on mobile.
  const proseFirst = index % 2 === 0
  return (
    <FadeIn as="section" aria-label={`${era.years}: ${era.headline}`}>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
        <div className={cn('lg:col-span-5', !proseFirst && 'lg:order-last')}>
          <p className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-teal)] uppercase">
            {era.years}
          </p>
          <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
            {era.headline}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-8 text-neutral-700">
            {era.body}
          </div>
        </div>
        <div className="lg:col-span-7">
          <PhotoGrid photos={era.photos} />
        </div>
      </div>
    </FadeIn>
  )
}

export function AboutTimeline() {
  return (
    <div className="space-y-24 sm:space-y-32">
      {ERAS.map((era, i) => (
        <EraBlock key={era.years} era={era} index={i} />
      ))}
    </div>
  )
}
