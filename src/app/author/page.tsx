import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { BannerHero } from '@/components/BannerHero'
import { ContactBlock } from '@/components/ContactBlock'
import { siteConfig } from '@/lib/site-config'
import {
  GOLDEN_THREAD_CULMINATION,
  GOLDEN_THREAD_LINE,
  projectStudies,
} from '@/lib/projects'

// Author page, rendered 2026-08-22 from the locked copy at
// content/author/author-page-copy.md. Endorser quotes are verbatim and must
// stay that way; edit the markdown and this file together.
//
// Covers currently in the repo: The Birth of Explicit Movement, the Explicit
// Movement 21-Day Journal, the eight Dream Big with God journals and teacher
// guides, plus one non-faith Dream Big journal, and now the Brave Series
// (Brave & Beautiful Vol. 1 Faith Journey cover, extracted 2026-08-23).
// Dancing with Father and both Brave Purpose editions still render a
// placeholder tile until art lands; drop the file in /public/images/books
// and set `cover`.

export const metadata: Metadata = {
  title: 'Author',
  description:
    'Books, journals, and curricula by Michele Okimura. Two published trade books, a 21-day interactive journal, the multi-age Dream Big journals in faith and non-faith editions, the 24-volume Brave Series, and Brave Purpose coming 2027.',
  alternates: { canonical: '/author' },
  openGraph: {
    type: 'website',
    title: `Author | ${siteConfig.brand}`,
    description:
      'Books, journals, and curricula for dreamers of every age.',
    url: `${siteConfig.url}/author`,
  },
}

type Endorsement = { quote: string; source: string }

type AvailableLink = { text: string; href?: string }

/* ---------------------------------------------------------------- pieces */

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-sm font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
      {children}
    </h2>
  )
}

/**
 * Cover tile. Ratios across the supplied art run from 2:3 to about 3:4, so the
 * tile holds a fixed 3:4 box and contains the image inside it. No cropping, no
 * distortion, and a missing cover falls back to a titled placeholder rather
 * than a broken tile.
 */
function Cover({
  src,
  alt,
  sizes,
  caption,
}: {
  src?: string
  alt: string
  sizes: string
  caption?: string
}) {
  return (
    <figure>
      {src ? (
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-neutral-900/5">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className="object-contain"
          />
        </div>
      ) : (
        <div className="flex aspect-[3/4] w-full flex-col items-center justify-center rounded-2xl bg-neutral-50 p-6 text-center border border-dashed border-neutral-300">
          <span className="font-display text-lg leading-tight font-semibold tracking-tight text-neutral-500">
            {alt}
          </span>
          <span className="mt-3 text-xs tracking-widest text-neutral-400 uppercase">
            Cover coming soon
          </span>
        </div>
      )}
      {caption ? (
        <figcaption className="mt-3 text-center text-sm leading-6 text-neutral-600">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

function Endorsements({
  items,
  label = 'What readers say',
}: {
  items: Endorsement[]
  label?: string
}) {
  return (
    <div className="mt-10">
      <h4 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
        {label}
      </h4>
      <div className="mt-5 space-y-6">
        {items.map((item, i) => (
          <figure
            key={`${item.source}-${i}`}
            className="border-l-2 border-[var(--color-brand-terracotta)] pl-5"
          >
            <blockquote className="text-base leading-7 text-neutral-700 italic">
              {item.quote}
            </blockquote>
            <figcaption className="mt-2 text-sm font-medium text-neutral-500 not-italic">
              {item.source}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

/**
 * "Available at" row. External storefronts open in a new tab. The
 * micheleokimura.com/store destination is printed as text until the store
 * route ships; swap in a Link then.
 */
function AvailableAt({
  label = 'Available at',
  links,
}: {
  label?: string
  links: AvailableLink[]
}) {
  return (
    <p className="mt-8 text-sm leading-7 text-neutral-600">
      <span className="font-display font-semibold tracking-widest text-neutral-500 uppercase">
        {label}
      </span>{' '}
      {links.map((link, i) => (
        <span key={link.text}>
          {i > 0 ? <span className="text-neutral-300"> &middot; </span> : null}
          {link.href ? (
            <a
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-terracotta)] decoration-1 underline-offset-4 transition hover:decoration-2"
            >
              {link.text}
            </a>
          ) : (
            <span className="font-medium text-neutral-950">{link.text}</span>
          )}
        </span>
      ))}
    </p>
  )
}

/** Two-column work layout: cover on the left at lg+, stacked on mobile. */
function Work({
  cover,
  children,
}: {
  cover: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <FadeIn className="grid grid-cols-1 gap-10 lg:grid-cols-[20rem_1fr] lg:gap-16">
      <div className="mx-auto w-full max-w-[16rem] lg:mx-0 lg:max-w-none">
        {cover}
      </div>
      <div>{children}</div>
    </FadeIn>
  )
}

function WorkTitle({
  title,
  meta,
}: {
  title: string
  meta?: string
}) {
  return (
    <>
      <h3 className="font-display text-3xl leading-tight font-medium tracking-tight text-neutral-950 sm:text-4xl">
        {title}
      </h3>
      {meta ? (
        <p className="mt-3 text-sm tracking-wide text-neutral-500 italic">
          {meta}
        </p>
      ) : null}
    </>
  )
}

function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 space-y-5 text-lg leading-8 text-neutral-700">
      {children}
    </div>
  )
}

/**
 * Link from a work on this page to its full case study under /projects. This
 * page is the shelf; the case study is the story behind the item on it.
 */
function ReadTheStory({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-8">
      <Link
        href={href}
        className="group inline-flex items-center gap-2 font-display text-base font-semibold text-neutral-950 underline decoration-[var(--color-brand-terracotta)] decoration-2 underline-offset-4 transition hover:text-[var(--color-brand-terracotta-ink)]"
      >
        Read the story of {label}
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  )
}

/* ------------------------------------------------------------------ copy */

const EXPLICIT_MOVEMENT_ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      '“Michele is a remarkably gifted woman with an unbounded mother’s heart for the incredibly talented and passionate young people she draws into God’s Kingdom. This small book will bring huge encouragement to you, revealing that God is still intimately active in the world and in the hearts of humble and unlikely heroes like Michele.”',
    source:
      'Glenn T. Stanton, Director of Global Family Formation Studies, Focus on the Family',
  },
  {
    quote:
      '“Michele said, ‘Yes, Lord!’ and today she is leading the Explicit Movement that is bringing a message of sexual purity, and along with it hope and healing, to thousands of children and young people in the islands of Hawaii and beyond. You will be inspired and challenged to surrender your own life, just as Michele did, and follow the Lord into the purpose and destiny He has for you.”',
    source:
      'Dr. Ed Silvoso, Founder and President of Harvest Evangelism and the International Transformation Network',
  },
  {
    quote:
      '“Michele Okimura and her team minister healing and freedom to those in pain. If you have been abused or know anyone who has been a victim of abuse, and all of us do, you need to read this book that will give you hope.”',
    source: 'Dr. Caroline Ward Oda, Ph.D.',
  },
]

const DANCING_ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      '“Michele Okimura has touched a topic that is discussed very little. She invites the reader to share her tragedy and triumph by capturing that experience in Dancing with Father. This poem can be an instrument to bridge the gap in the healing process for others who have had a difficult journey through their youth.”',
    source:
      'Gary and Norma Smalley, President and Founder, Smalley Relationship Center',
  },
  {
    quote:
      '“Just as David wrote his Psalms, so has Michele found a voice for deeper longings of God. This is truly a soul’s cry that rings victorious. I believe Michele has found a voice for so many.”',
    source:
      'Dr. Wayne Cordeiro, Founding Pastor, New Hope Christian Fellowship, Honolulu',
  },
  {
    quote:
      '“When I read Dancing with the Father my heart was deeply touched. I know this deeply artistic, poetic work will touch many deeply.”',
    source:
      'Patricia King, President and Founder of Extreme Prophetic Ministries',
  },
]

const DANCING_READER_IMPACT = [
  'A woman in her darkest moment saw the book on her dining table, a gift from a friend. She picked it up, was met by God as she read, and instead of what she had planned, went to church the next morning. She later found Michele at a conference to tell her the book had saved her life.',
  'A woman driving cross-country to escape abuse played the audiobook on repeat for hours. Tears and healing came, mile after mile, page after page.',
  'The book has reached readers around the world, including as far as Norway and the Philippines.',
]

const DREAM_BIG_ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      '“I dream bigger. It helped change my fixed mindset, and now I can be more creative and grow my confidence.”',
    source: 'Fourth-grade student',
  },
  {
    quote:
      '“It helped me to grow and find myself and my interests by reflecting on the past and planning for the future.”',
    source: 'Fourth-grade student',
  },
  {
    quote: '“The teacher guide was gold. Love the extensions.”',
    source: 'Teacher',
  },
  {
    quote:
      '“The Dream Big Journal booklet provided an excellent resource to allow our Leadership Team to revisit our ‘dreams and aspirations’ in a safe and nurturing environment through the guidance and support of Michele Okimura.”',
    source: 'Gerald Teramae, Head of School, Island Pacific Academy',
  },
]

const DREAM_BIG_EDITIONS = [
  {
    label: 'Preschool & Kindergarten',
    journal: '/images/journals/dream-big-with-god-journal-preschool@2x.jpg',
    guide: '/images/journals/dream-big-with-god-teacher-guide-preschool@2x.jpg',
  },
  {
    label: 'Younger Elementary, grades 1-2',
    journal:
      '/images/journals/dream-big-with-god-journal-younger-elementary@2x.jpg',
    guide:
      '/images/journals/dream-big-with-god-teacher-guide-younger-elementary@2x.jpg',
  },
  {
    label: 'Older Elementary, grades 3-5',
    journal:
      '/images/journals/dream-big-with-god-journal-older-elementary@2x.jpg',
    guide:
      '/images/journals/dream-big-with-god-teacher-guide-older-elementary@2x.jpg',
  },
  {
    label: 'Youth & Adults, “Keys to Unlock Your Dreams”',
    journal:
      '/images/journals/dream-big-with-god-journal-youth-and-adults@2x.jpg',
    guide:
      '/images/journals/dream-big-with-god-teacher-guide-youth-and-adults@2x.jpg',
  },
]

const BRAVE_RECOGNITION = [
  'Brave Together (non-faith version) vetted and approved by the Hawai‘i State Department of Education for use in secondary public schools, 2026',
  '2023 Outstanding Advocate for the Children and Youth of Hawai‘i, awarded to Releasing Generations by Hawai‘i’s Governor and Honolulu’s Mayor for the development of the Brave Series',
]

const BRAVE_TITLES = [
  { title: 'Brave & Beautiful', audience: 'for teen girls' },
  { title: 'Brave & Bold', audience: 'for teen boys' },
  { title: 'Brave Together', audience: 'for co-ed audiences' },
]

const BRAVE_ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      '“The Brave Series is a groundbreaking, survivor-informed resource that empowers youth with confidence, resilience, and the tools to safeguard themselves from exploitation. Its engaging, age-appropriate approach builds self-worth and inspires leadership, making it an essential prevention tool for protecting and uplifting the next generation.”',
    source:
      'Rachel Fisher, National and International Anti-Trafficking Consultant, Nurse, and Survivor',
  },
  {
    quote:
      '“When first introduced to the materials, I found them breathtaking and unlike anything I had seen. The Brave Series equips young people with the tools to navigate challenges, make informed decisions, and step confidently into their potential by addressing critical topics like self-worth, healthy relationships, and personal responsibility.”',
    source:
      'Phyllis Unebasami, Retired Hawai‘i Deputy Superintendent of the Department of Education',
  },
  {
    quote:
      '“This book has helped me not only to have a brighter mindset but to love myself and be confident in who I am and what I stand for. This book is so simple yet so empowering in every word and detail!”',
    source: 'Malia Colburn, Teenage Girl',
  },
]

const BRAVE_PURPOSE_FAITH_ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      '“There is a lack of practical tools that can assist young adults in discovering the direction that God wants their life to take. This book fills that void. Writing with a positive and uplifting tone, Michele provides practical advice on how to connect with one’s life purpose, no matter what adult life stage you are in.”',
    source:
      'Ted Esler, President and CEO of Missio Nexus (the largest North American mission network)',
  },
  {
    quote:
      '“Brave Purpose with God is a wonderful resource, helping us reflect on who we are, what we can achieve, and where to go from here. Listen for that divine voice of calm and clarity rising above the noise as we explore Brave Purpose with God together.”',
    source:
      'Edwin Keh, CEO of HKRITA; former Senior Vice President and COO of Walmart Global Procurement; Faculty at the Wharton School of the University of Pennsylvania, and A3 Christian Ministry',
  },
  {
    quote:
      '“Okimura masterfully connects the prophetic and the artistic with the dusty, everyday path we actually walk. Readers will come away not just encouraged but awakened as travelers ready to follow God’s clues toward the treasure He has prepared.”',
    source:
      'Ted Vail, D.I.S., Senior Vice President of Mission, The Foursquare Church',
  },
]

const BRAVE_PURPOSE_SECULAR_ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      '“Brave Purpose is a wonderful resource in the midst of all this, helping us reflect on our identity, our potential, and our direction. The intent is for us to find our true purpose and meaning, and to live the unique life we were inherently designed for.”',
    source:
      'Edwin Keh, CEO of HKRITA; former Senior Vice President and COO of Walmart Global Procurement; Faculty at the Wharton School of the University of Pennsylvania',
  },
  {
    quote:
      '“Brave Purpose is not simply a book, it is a sacred invitation. From the first page, you feel gently yet firmly called out of hiding and into the courageous work of becoming who you were always meant to be. This is the kind of book you don’t just read, you experience.”',
    source: 'Gerald Teramae, Head of School, Island Pacific Academy',
  },
]

/**
 * Programs that have a case study but no titled entry on the shelf above. Card
 * copy is read from the project registry so these and the /projects index never
 * drift apart.
 */
const OTHER_PROJECTS = projectStudies.filter((project) =>
  ['kingdom-kids', 'rethink-creativity'].includes(project.slug),
)

const COVER_SIZES_MAIN = '(max-width: 1024px) 16rem, 20rem'
const COVER_SIZES_GRID = '(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 15rem'

/* ------------------------------------------------------------------ page */

export default function AuthorPage() {
  return (
    <>
      <BannerHero
        eyebrow="Author"
        title="Books, Journals, and Curricula for Dreamers of Every Age"
      />

      {/* The intro paragraph that used to sit inside the tall hero. It reads as
          the lead now, on cream, straight under the banner. */}
      <Container className="mt-12 sm:mt-16">
        <FadeIn>
          <p className="max-w-3xl text-xl leading-9 text-neutral-600">
            From published books to a 24-volume teen curriculum to multi-age
            journals in both faith and non-faith editions, Michele&rsquo;s body
            of work walks readers through the practice of dreaming big and
            stepping into brave purpose. Whether you&rsquo;re a preschooler with
            a first dream, an adult moving into a new season, or a leader
            shaping the next generation, there&rsquo;s a doorway here for you.
          </p>
        </FadeIn>
      </Container>

      {/* The golden thread, stated once at the top so the works below read as
          one body of work rather than a catalogue. Wording is single-sourced
          from src/lib/projects.ts, which every case study also quotes. */}
      <Container className="mt-10 sm:mt-12">
        <FadeIn>
          <p className="max-w-3xl border-l-2 border-[var(--color-brand-terracotta)] pl-6 font-display text-xl leading-9 text-neutral-800 italic sm:text-2xl sm:leading-10">
            {GOLDEN_THREAD_LINE}
          </p>
          <figure className="mt-8 max-w-3xl">
            <blockquote className="text-base leading-7 text-neutral-700 italic">
              &ldquo;{GOLDEN_THREAD_CULMINATION}&rdquo;
            </blockquote>
            <figcaption className="mt-2 text-sm font-medium text-neutral-500 not-italic">
              Michele Okimura
            </figcaption>
          </figure>
          <p className="mt-8 max-w-3xl text-base leading-7 text-neutral-600">
            Every title here has a story behind it. You can read them all on the{' '}
            <Link
              href="/projects"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-terracotta)] decoration-1 underline-offset-4 transition hover:decoration-2"
            >
              projects page
            </Link>
            .
          </p>
        </FadeIn>
      </Container>

      {/* ------------------------------------------------ published books */}
      <section aria-labelledby="published-books">
        <Container className="mt-16 sm:mt-24">
          <FadeIn>
            <SectionHeading>
              <span id="published-books">Published books</span>
            </SectionHeading>
          </FadeIn>

          <div className="mt-10 space-y-20 sm:mt-12 sm:space-y-28">
            {/* The Birth of Explicit Movement */}
            <Work
              cover={
                <Cover
                  src="/images/books/birth-of-explicit-movement-cover@2x.jpg"
                  alt="The Birth of Explicit Movement"
                  sizes={COVER_SIZES_MAIN}
                />
              }
            >
              <WorkTitle
                title="The Birth of Explicit Movement: Discover Keys to Fulfilling Your Purpose"
                meta="Published 2018"
              />
              <Prose>
                <p>
                  Michele&rsquo;s founding story, told in full. Written as both
                  testimony and reflection guide, this is the personal account
                  behind Explicit Movement. Each chapter closes with reflection
                  sections that turn her story into a personal guide for readers
                  learning to hear God&rsquo;s voice and take their own steps of
                  obedience. The Speaker keynote &ldquo;Finding Your Brave
                  Purpose&rdquo; is drawn from this book.
                </p>
              </Prose>

              <div className="mt-8 rounded-3xl bg-neutral-50 p-6 sm:p-8">
                <h4 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                  About Explicit Movement
                </h4>
                <p className="mt-4 text-base leading-7 text-neutral-700">
                  Explicit Movement equips parents, church leaders, and young
                  people themselves through events, courses, and resources on
                  topics such as pornography addiction, sexual violence, and
                  healthy relationships. With a compassionate, grace-filled
                  approach rooted in God&rsquo;s truth, the ministry helps young
                  people find hope and healing, know their value and identity in
                  Christ, and walk in sexual integrity as they step into the
                  fullness of who God created them to be.
                </p>
              </div>

              <Endorsements items={EXPLICIT_MOVEMENT_ENDORSEMENTS} />
              <AvailableAt
                links={[
                  {
                    text: 'explicitmovement.org',
                    href: 'https://explicitmovement.org',
                  },
                  {
                    text: 'releasinggenerations.org',
                    href: 'https://releasinggenerations.org',
                  },
                ]}
              />
              <ReadTheStory
                href="/projects/birth-of-explicit-movement"
                label="The Birth of Explicit Movement"
              />
            </Work>

            {/* Dancing with Father */}
            <Work
              cover={
                <Cover alt="Dancing with Father" sizes={COVER_SIZES_MAIN} />
              }
            >
              <WorkTitle title="Dancing with Father" meta="Published 2011" />
              <Prose>
                <p>
                  A book of poetry, reflection, and beautiful painted
                  illustrations. Michele wrote it out of her own difficult
                  journey through youth, as a way for anyone else walking a
                  similar path to know they are seen, pursued, and loved by God
                  as Father. Short enough to read in one sitting. The kind of
                  book readers keep close and return to again and again. Come
                  dance with the One who joys over you with singing.
                </p>
                <p className="text-base text-neutral-600 italic">
                  Also available as an audiobook, produced in radio-drama style.
                </p>
              </Prose>

              <Endorsements items={DANCING_ENDORSEMENTS} />

              <div className="mt-10">
                <h4 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                  Reader impact
                </h4>
                <p className="mt-2 text-sm text-neutral-500 italic">
                  From testimonies Michele has received.
                </p>
                <ul
                  role="list"
                  className="mt-5 space-y-4 border-t border-neutral-200 pt-5"
                >
                  {DANCING_READER_IMPACT.map((story) => (
                    <li key={story} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-teal)]"
                      />
                      <span className="text-base leading-7 text-neutral-700">
                        {story}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <AvailableAt
                links={[
                  { text: 'micheleokimura.com/store (book, audiobook)' },
                ]}
              />
              <ReadTheStory
                href="/projects/dancing-with-father"
                label="Dancing with Father"
              />
            </Work>
          </div>
        </Container>
      </section>

      {/* ----------------------------------------- journals and curricula */}
      <section aria-labelledby="journals-curricula">
        <Container className="mt-24 sm:mt-32">
          <FadeIn>
            <SectionHeading>
              <span id="journals-curricula">Journals &amp; curricula</span>
            </SectionHeading>
          </FadeIn>

          <div className="mt-10 space-y-20 sm:mt-12 sm:space-y-28">
            {/* 21-Day Interactive Journal */}
            <Work
              cover={
                <Cover
                  src="/images/books/explicit-movement-21-day-journal-cover@2x.jpg"
                  alt="The Explicit Movement 21-Day Interactive Journal"
                  sizes={COVER_SIZES_MAIN}
                />
              }
            >
              <WorkTitle
                title="The Explicit Movement 21-Day Interactive Journal"
                meta="Published 2018"
              />
              <Prose>
                <p>
                  A three-week guided journey for readers ready to sit with the
                  questions that shape identity, healing, and purpose. Each day
                  pairs a reflection prompt with space to write, drawing from
                  the truths that anchor the Explicit Movement teaching: your
                  value, your identity in Christ, and the life God has invited
                  you into. Designed for individual or small-group use. Written
                  by the Explicit Movement team, together with friends and
                  family of the movement. Michele served as{' '}
                  <strong className="font-semibold text-neutral-950">
                    Director and Contributing Author
                  </strong>
                  .
                </p>
              </Prose>
              <AvailableAt
                links={[
                  {
                    text: 'explicitmovement.org',
                    href: 'https://explicitmovement.org',
                  },
                  {
                    text: 'releasinggenerations.org (book and e-book)',
                    href: 'https://releasinggenerations.org',
                  },
                ]}
              />
            </Work>

            {/* Dream Big with God Journals (faith) */}
            <Work
              cover={
                <Cover
                  src="/images/journals/dream-big-with-god-journal-youth-and-adults@2x.jpg"
                  alt="Dream Big with God Journal, Youth & Adults edition"
                  sizes={COVER_SIZES_MAIN}
                />
              }
            >
              <WorkTitle
                title="Dream Big with God Journals"
                meta="Faith edition · Published 2023-2025 · Sole author: Michele Okimura"
              />
              <Prose>
                <p>
                  A multi-age curriculum designed to walk readers through the
                  practice of dreaming big with God, in shorter, age-appropriate
                  journals that meet each reader where they are. As children
                  work through the pages, parents and teachers discover
                  what&rsquo;s alive in their kids&rsquo; hearts and gain the
                  language to nurture those dreams before the world quiets them.
                  Many of the adult callings we eventually walk in were first
                  planted in us as children.
                </p>
                <p>
                  In a world that too often teaches us to shrink our vision,
                  these journals do the opposite. Seniors in their twilight
                  years have used them to reignite vision for their season of
                  life with great joy and excitement. How wonderful it would be
                  to raise a generation of dreamers of all ages who would impact
                  the world we live in for good.
                </p>
                <p className="text-base text-neutral-600 italic">
                  Piloted with fourth-grade students at Kamehameha Schools,
                  Hawai&lsquo;i.
                </p>
              </Prose>

              <p className="mt-8 text-base leading-7 text-neutral-700">
                <strong className="font-semibold text-neutral-950">
                  Available in four editions:
                </strong>{' '}
                Preschool &amp; Kindergarten, Younger Elementary (grades 1-2),
                Older Elementary (grades 3-5), Youth &amp; Adults
                (&ldquo;Keys to Unlock Your Dreams&rdquo;).{' '}
                <strong className="font-semibold text-neutral-950">
                  Companion teacher guides
                </strong>{' '}
                for classroom and small-group use in all four editions.
              </p>

              <Endorsements
                items={DREAM_BIG_ENDORSEMENTS}
                label="Voices from the classroom"
              />
              <AvailableAt links={[{ text: 'micheleokimura.com/store' }]} />
              <ReadTheStory
                href="/projects/dream-big-journals"
                label="the Dream Big Journals"
              />
            </Work>
          </div>

          {/* Full-width cover gallery: four journals over four teacher guides. */}
          <div className="mt-16 sm:mt-20">
            <FadeIn>
              <h4 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                The four editions
              </h4>
            </FadeIn>
            <FadeInStagger faster className="mt-6">
              <ul
                role="list"
                className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8"
              >
                {DREAM_BIG_EDITIONS.map((edition) => (
                  <FadeIn as="li" key={edition.label} scaleIn>
                    <Cover
                      src={edition.journal}
                      alt={`Dream Big with God Journal, ${edition.label}`}
                      sizes={COVER_SIZES_GRID}
                      caption={edition.label}
                    />
                  </FadeIn>
                ))}
              </ul>
            </FadeInStagger>

            <FadeIn className="mt-12">
              <h4 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                Companion teacher guides
              </h4>
            </FadeIn>
            <FadeInStagger faster className="mt-6">
              <ul
                role="list"
                className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8"
              >
                {DREAM_BIG_EDITIONS.map((edition) => (
                  <FadeIn as="li" key={edition.label} scaleIn>
                    <Cover
                      src={edition.guide}
                      alt={`Dream Big with God Teacher Guide, ${edition.label}`}
                      sizes={COVER_SIZES_GRID}
                      caption={edition.label}
                    />
                  </FadeIn>
                ))}
              </ul>
            </FadeInStagger>
          </div>

          {/* Dream Big Journals (non-faith) */}
          <div className="mt-20 sm:mt-28">
            <Work
              cover={
                <Cover
                  src="/images/journals/dream-big-journal-youth-and-adults@2x.jpg"
                  alt="Dream Big Journal, Youth & Adults edition"
                  sizes={COVER_SIZES_MAIN}
                />
              }
            >
              <WorkTitle
                title="Dream Big Journals"
                meta="Non-faith edition · Published 2023-2025 · Sole author: Michele Okimura"
              />
              <Prose>
                <p>
                  Same curriculum, same age brackets, God language removed.
                  Available in four editions plus companion teacher guides.
                </p>
              </Prose>
              <AvailableAt links={[{ text: 'micheleokimura.com/store' }]} />
            </Work>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------- Brave Series */}
      <section aria-labelledby="brave-series">
        <Container className="mt-24 sm:mt-32">
          <FadeIn>
            <SectionHeading>
              <span id="brave-series">
                Directed as Chief Editor, Creative Director &amp; Contributing
                Author
              </span>
            </SectionHeading>
          </FadeIn>

          <div className="mt-10 sm:mt-12">
            <Work
              cover={
                <Cover
                  src="/images/brave-series/brave-and-beautiful-vol1-faith-journey@2x.jpg"
                  alt="Brave & Beautiful, Volume 1 (Faith Journey edition)"
                  sizes={COVER_SIZES_MAIN}
                />
              }
            >
              <WorkTitle title="The Brave Series" />
              <p className="mt-4 font-display text-xl leading-8 text-neutral-800 italic sm:text-2xl">
                Every page is a work of art. Just as every child is.
              </p>
              <Prose>
                <p>
                  The Brave Series is a three-title youth curriculum that
                  develops emotional health, builds self-worth and healthy
                  relationships, imparts wisdom for life and leadership, and
                  empowers readers to protect themselves from exploitation. A
                  powerful preventative resource, available in both faith and
                  non-faith editions. Michele led the series as{' '}
                  <strong className="font-semibold text-neutral-950">
                    Chief Editor, Creative Director, and Contributing Author
                  </strong>
                  . Twenty-four volumes in all: three titles, four-volume sets
                  each, faith and non-faith editions.
                </p>
              </Prose>

              {/* Recognition callout. The hex mirrors --color-brand-terracotta; an opacity
                  modifier on a var() color is not reliable across Tailwind
                  versions, so the literal is used here. */}
              <div className="mt-8 rounded-3xl bg-[var(--color-teal-05)] p-6 ring-1 ring-[var(--color-teal-20)] sm:p-8">
                <h4 className="font-display text-xs font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
                  Recognition
                </h4>
                <ul role="list" className="mt-5 space-y-4">
                  {BRAVE_RECOGNITION.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brand-teal)]"
                      />
                      <span className="text-base leading-7 text-neutral-800">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10">
                <h4 className="font-display text-xs font-semibold tracking-widest text-neutral-500 uppercase">
                  Titles
                </h4>
                <ul
                  role="list"
                  className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3"
                >
                  {BRAVE_TITLES.map((item) => (
                    <li
                      key={item.title}
                      className="rounded-2xl border border-neutral-200 bg-white p-5"
                    >
                      <p className="font-display text-lg font-semibold tracking-tight text-neutral-950">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-neutral-600">
                        {item.audience}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <Prose>
                <p>
                  While written for youth, the Brave Series has been adopted by
                  church leaders for leadership development, and by women and
                  men of all ages, from young adults to seniors, who have found
                  their own healing, empowerment, and vision inside the
                  material.
                </p>
                <p className="text-base text-neutral-600 italic">
                  Brave Together Faith edition shipping in the next month; all
                  other volumes available now.
                </p>
              </Prose>

              <Endorsements items={BRAVE_ENDORSEMENTS} />
              <AvailableAt
                label="Buy at"
                links={[
                  {
                    text: 'thebraveseries.com',
                    href: 'https://thebraveseries.com',
                  },
                ]}
              />
              <ReadTheStory
                href="/projects/brave-series"
                label="the Brave Series"
              />
            </Work>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------- coming 2027 */}
      <section aria-labelledby="coming-2027" className="mt-24 sm:mt-32">
        <div className="bg-neutral-50 py-20 sm:py-28">
          <Container>
            <FadeIn className="mx-auto max-w-3xl text-center">
              <SectionHeading>
                <span id="coming-2027">Coming 2027</span>
              </SectionHeading>
              <p className="mt-6 font-display text-xl leading-9 text-neutral-800 italic sm:text-2xl sm:leading-10">
                Brave Purpose is Michele&rsquo;s forthcoming book, releasing in
                two editions: one faith, one non-faith. Both share the same core
                message: you were made to step off the rock and into the current
                of the life you were designed for. Each edition is voiced for
                its audience.
              </p>
            </FadeIn>

            <div className="mt-16 space-y-20 sm:mt-20 sm:space-y-28">
              {/* Brave Purpose with God */}
              <Work
                cover={
                  <Cover
                    alt="Brave Purpose with God"
                    sizes={COVER_SIZES_MAIN}
                  />
                }
              >
                <span className="font-display block text-xs font-semibold tracking-[0.22em] text-[var(--color-brand-terracotta-ink)] uppercase sm:text-sm">
                  Targeted Spring 2027
                </span>
                <div className="mt-4">
                  <WorkTitle title="Brave Purpose with God" meta="Faith edition" />
                </div>
                <Prose>
                  <p>
                    For anyone longing to dream big with God. Michele lays out
                    the Brave Purpose Framework: 15 steps in three movements
                    (Uncover, Recover, Ignite) that walk readers through
                    discovering the God-breathed dreams He has planted within
                    them, dealing with the fears and voices that have held them
                    back, and taking real next steps of obedience. Written for
                    the young adult finding first footing, the middle-aged
                    reader navigating the sustained trek, and the senior
                    stepping into a golden legacy. Includes a companion
                    workbook.
                  </p>
                </Prose>
                <Endorsements
                  items={BRAVE_PURPOSE_FAITH_ENDORSEMENTS}
                  label="Early praise"
                />
                <ReadTheStory
                  href="/projects/brave-purpose-with-god"
                  label="Brave Purpose with God"
                />
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 font-display text-base font-semibold text-neutral-950 underline decoration-[var(--color-brand-terracotta)] decoration-2 underline-offset-4 transition hover:text-[var(--color-brand-terracotta-ink)]"
                  >
                    Contact Michele for release updates
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                  <p className="mt-2 text-sm text-neutral-500 italic">
                    Launch email list coming soon.
                  </p>
                </div>
              </Work>

              {/* Brave Purpose */}
              <Work
                cover={<Cover alt="Brave Purpose" sizes={COVER_SIZES_MAIN} />}
              >
                <span className="font-display block text-xs font-semibold tracking-[0.22em] text-[var(--color-brand-terracotta-ink)] uppercase sm:text-sm">
                  Releasing 2027
                </span>
                <div className="mt-4">
                  <WorkTitle title="Brave Purpose" meta="Non-faith edition" />
                </div>
                <Prose>
                  <p>
                    For anyone ready to dream big and step into the life they
                    were designed for. Same 15-step Brave Purpose Framework,
                    same three movements, voiced without the faith framing.
                    Includes a companion workbook.
                  </p>
                </Prose>
                <Endorsements
                  items={BRAVE_PURPOSE_SECULAR_ENDORSEMENTS}
                  label="Early praise"
                />
                <ReadTheStory
                  href="/projects/brave-purpose"
                  label="Brave Purpose"
                />
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 font-display text-base font-semibold text-neutral-950 underline decoration-[var(--color-brand-terracotta)] decoration-2 underline-offset-4 transition hover:text-[var(--color-brand-terracotta-ink)]"
                  >
                    Contact Michele for release updates
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                  <p className="mt-2 text-sm text-neutral-500 italic">
                    Launch email list coming soon.
                  </p>
                </div>
              </Work>
            </div>
          </Container>
        </div>
      </section>

      {/* ------------------------------------------------- other projects */}
      {/* Kingdom Kids and ReThink Creativity are programs rather than titles,
          so they have no shelf entry above. They belong to the same body of
          work, so they get cards here and a route into the full index. */}
      <section aria-labelledby="other-projects">
        <Container className="mt-24 sm:mt-32">
          <FadeIn>
            <SectionHeading>
              <span id="other-projects">Also built by Michele</span>
            </SectionHeading>
          </FadeIn>
          <FadeInStagger faster className="mt-8">
            <ul
              role="list"
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {OTHER_PROJECTS.map((project) => (
                <FadeIn as="li" key={project.href} scaleIn>
                  <Link
                    href={project.href}
                    className="group flex h-full flex-col rounded-3xl bg-white p-8 ring-1 ring-neutral-900/5 transition hover:shadow-lg hover:ring-neutral-900/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
                  >
                    <span className="text-xs font-semibold tracking-widest text-[var(--color-brand-terracotta-ink)] uppercase">
                      {project.kicker}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-neutral-950">
                      {project.title}
                    </h3>
                    <p className="mt-4 flex-1 text-base leading-7 text-neutral-600">
                      {project.blurb}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-950">
                      Read the story
                      <span aria-hidden="true">&rarr;</span>
                    </span>
                  </Link>
                </FadeIn>
              ))}

              <FadeIn as="li" scaleIn>
                <Link
                  href="/projects"
                  className="group flex h-full flex-col justify-between rounded-3xl bg-[var(--color-brand-teal)] p-8 transition hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-cream)]"
                >
                  <div>
                    <span className="text-xs font-semibold tracking-widest text-white/70 uppercase">
                      All projects
                    </span>
                    <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-white">
                      Every story in one place
                    </h3>
                    <p className="mt-4 text-base leading-7 text-neutral-300">
                      The origin, the making, and the reach of each book,
                      curriculum, and program.
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white">
                    Browse the projects
                    <span aria-hidden="true">&rarr;</span>
                  </span>
                </Link>
              </FadeIn>
            </ul>
          </FadeInStagger>
        </Container>
      </section>

      {/* ---------------------------------------------- closing invitation */}
      <Container className="mt-24 sm:mt-32">
        <FadeIn className="mx-auto max-w-4xl text-center">
          <blockquote className="font-display text-3xl leading-tight font-medium text-balance text-neutral-950 italic sm:text-4xl sm:leading-tight">
            Let&rsquo;s become a community of dreamers where we don&rsquo;t
            compete but instead celebrate and support one another.
          </blockquote>
        </FadeIn>
      </Container>

      <ContactBlock heading="Stay close to the next release." source="author">
        <p>
          Brave Purpose arrives in 2027 in both editions. Leave your name and
          email and Michele will let you know when it is ready.
        </p>
      </ContactBlock>
    </>
  )
}
