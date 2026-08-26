import type { Metadata } from 'next'

import { pageMetadata } from '@/lib/schema'

import {
  CaseStudyLayout,
  CaseStudySection,
  CoverGrid,
  Endorsements,
  FactList,
  GoldenThread,
  Prose,
  PullQuote,
  StatGrid,
  VoiceNote,
  type Endorsement,
} from '@/components/CaseStudyLayout'
import { SquareButton } from '@/components/AuthorBookParts'
import { Container } from '@/components/Container'
import { getSquareLink } from '@/data/square-store-links'

// Vision statement is Michele's own words. The four classroom quotes are
// verbatim and are the same set carried on /author; edit both together.

export const metadata: Metadata = pageMetadata({
  title: 'The Dream Big Journals',
  description:
    'A multi-age journal curriculum in four editions, faith and non-faith, with companion teacher guides. Piloted with fourth-grade students at Kamehameha Schools, Hawaiʻi.',
  path: '/projects/dream-big-journals',
  type: 'article',
  ogDescription:
    'A journal curriculum for dreamers from preschool to grandparent.',
})

const EDITIONS = [
  {
    label: 'Preschool & Kindergarten',
    journal: '/images/journals/dream-big-with-god-journal-preschool@2x.jpg',
    guide: '/images/journals/dream-big-with-god-teacher-guide-preschool@2x.jpg',
  },
  {
    label: 'Younger Elementary, grades 1-2',
    journal: '/images/journals/dream-big-with-god-journal-younger-elementary@2x.jpg',
    guide: '/images/journals/dream-big-with-god-teacher-guide-younger-elementary@2x.jpg',
  },
  {
    label: 'Older Elementary, grades 3-5',
    journal: '/images/journals/dream-big-with-god-journal-older-elementary@2x.jpg',
    guide: '/images/journals/dream-big-with-god-teacher-guide-older-elementary@2x.jpg',
  },
  {
    label: 'Youth & Adults',
    journal: '/images/journals/dream-big-with-god-journal-youth-and-adults@2x.jpg',
    guide: '/images/journals/dream-big-with-god-teacher-guide-youth-and-adults@2x.jpg',
  },
]

const STRUCTURE = [
  { value: '4', label: 'Age editions, from preschool through adult' },
  { value: '2', label: 'Versions of each: faith and non-faith' },
  { value: '4', label: 'Companion teacher guides, one per age bracket' },
  { value: 'Age 4+', label: 'The youngest reader it is written for' },
]

const DETAIL = [
  'Preschool and Kindergarten, Younger Elementary (grades 1-2), Older Elementary (grades 3-5), and Youth and Adults, titled “Keys to Unlock Your Dreams.”',
  'Every age edition ships in a faith version and a non-faith version, so a public classroom and a church small group can run the same curriculum.',
  'Companion teacher guides support classroom and small-group use across all four age brackets.',
  'As children work through the pages, parents and teachers discover what is alive in their kids’ hearts and gain the language to nurture those dreams.',
]

const REACH = [
  'Piloted with fourth-grade students at Kamehameha Schools, Hawaiʻi.',
  'Used by the leadership team at Island Pacific Academy to revisit their own dreams and aspirations.',
  'Seniors in their twilight years have used the adult edition to reignite vision for their season of life.',
]

const ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      'I dream bigger. It helped change my fixed mindset, and now I can be more creative and grow my confidence.',
    source: 'Fourth-grade student',
  },
  {
    quote:
      'It helped me to grow and find myself and my interests by reflecting on the past and planning for the future.',
    source: 'Fourth-grade student',
  },
  {
    quote: 'The teacher guide was gold. Love the extensions.',
    source: 'Teacher',
  },
  {
    quote:
      'The Dream Big Journal booklet provided an excellent resource to allow our Leadership Team to revisit our ‘dreams and aspirations’ in a safe and nurturing environment through the guidance and support of Michele Okimura.',
    source: 'Gerald Teramae, Head of School, Island Pacific Academy',
  },
]

/**
 * One label for both buttons on this page, so the CTA at the top and the one
 * under the eight covers cannot drift apart. It read "Buy on Square" under the
 * covers until 2026-08-26, when Michele asked for the shop button to name the
 * product rather than the host it happens to sit on.
 */
const SHOP_LABEL = 'Shop Dream Big Journals'

export default function DreamBigJournalsPage() {
  // One Square collection for the whole curriculum. Every age bracket is a
  // dropdown variant of one product over there, so there is a single honest
  // destination for all eight covers above the button. See the long note in
  // src/data/square-store-links.ts.
  const squareHref = getSquareLink('dream-big-journal-curriculum')

  return (
    <CaseStudyLayout
      workSlug="dream-big-journal-curriculum"
      eyebrow="Curriculum · Ages 4 to adult"
      title="The Dream Big Journals"
      lede={
        <p>
          A journal curriculum in four age editions, each in a faith and a
          non-faith version, each with a companion teacher guide. Written on the
          belief that a four-year-old and a grandparent need the same thing:
          permission to want something, and someone nearby who takes it
          seriously.
        </p>
      }
      heroCta={
        squareHref ? (
          <SquareButton
            href={squareHref}
            forTitle="the Dream Big Journals"
            size="page"
            label={SHOP_LABEL}
          />
        ) : null
      }
      contactHeading="Bring the Dream Big Journals to your classroom."
      contactSource="project-dream-big-journals"
      contactBody={
        <p>
          Schools, churches, and families are running these across every age
          bracket. Tell Michele who you are working with and she will point you
          to the right edition.
        </p>
      }
    >
      <PullQuote attribution="Michele Okimura" className="mt-14 sm:mt-20">
        I can be the change. I can make a difference in this world. I can make
        this world a better place with my gifts, my talents, and my vision.
      </PullQuote>

      <CaseStudySection heading="The why" id="why">
        <Prose>
          <p>
            &ldquo;I want to reach all children, youth, and adults with this
            because I firmly have a big why in my heart: everybody needs to
            learn how to dream big and have vision for their lives. How
            wonderful it would be if we can not only teach and empower kids to
            dream big for their lives, but also teach them how to nurture those
            dreams as parents, teachers, community leaders, and adults who are
            mentoring and raising the children. Adults who are mentoring and
            raising the children also need to be big dreamers themselves, to be
            models that the children and youth can observe.
          </p>
          <p>
            That&rsquo;s why the Dream Big Journal is for all ages, and we all
            need to become families, churches, and communities that support each
            other&rsquo;s dreams.
          </p>
          <p>
            This is the big why: we need to make the world a better place and to
            make a difference in how much we empower and instill that sense of
            &lsquo;I can be the change. I can make a difference in this world. I
            can make this world a better place with my gifts, my talents, and my
            vision.&rsquo; These are the things that I believe we need to not
            only equip people with, but also nurture and foster.&rdquo;
          </p>
        </Prose>
        <VoiceNote>In Michele&rsquo;s words.</VoiceNote>
      </CaseStudySection>

      <GoldenThread>
        If you don&rsquo;t believe your dreams are valuable, you won&rsquo;t
        build them. Michele built the Dream Big Journals to teach every reader,
        from age four to a grandparent, that their vision matters.
      </GoldenThread>

      <CaseStudySection heading="What is inside" id="structure">
        <StatGrid items={STRUCTURE} />
        <FactList label="How the curriculum is built" items={DETAIL} />
      </CaseStudySection>

      <Container className="mt-16 sm:mt-20">
        <CoverGrid
          label="The four journal editions"
          items={EDITIONS.map((edition) => ({
            src: edition.journal,
            alt: `Dream Big with God Journal, ${edition.label}`,
            caption: edition.label,
          }))}
        />
        <CoverGrid
          label="Companion teacher guides"
          items={EDITIONS.map((edition) => ({
            src: edition.guide,
            alt: `Dream Big with God Teacher Guide, ${edition.label}`,
            caption: edition.label,
          }))}
        />

        {/* Directly under the eight covers, which is where a reader who has
            just looked at them is. Nothing renders when there is no live
            listing rather than a button that 404s. */}
        {squareHref ? (
          <div className="mt-10 flex justify-center">
            <SquareButton
              href={squareHref}
              forTitle="the Dream Big Journals"
              size="page"
              label={SHOP_LABEL}
            />
          </div>
        ) : null}
      </Container>

      <CaseStudySection heading="In classrooms" id="reach">
        <FactList label="Where it has been used" items={REACH} />
        <Endorsements items={ENDORSEMENTS} label="Voices from the classroom" />
        {/* The old "Where to get it: micheleokimura.com/store" line was plain
            text pointing at a route this site does not have. The Square button
            under the covers is the one purchase route on this page now. */}
      </CaseStudySection>

      <PullQuote>
        Let&rsquo;s become a community of dreamers where we don&rsquo;t compete
        but instead celebrate and support one another.
      </PullQuote>
    </CaseStudyLayout>
  )
}
