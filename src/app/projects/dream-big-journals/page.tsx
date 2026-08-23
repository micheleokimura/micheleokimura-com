import type { Metadata } from 'next'

import { pageMetadata } from '@/lib/schema'

import {
  BuyLinks,
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
import { Container } from '@/components/Container'

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

export default function DreamBigJournalsPage() {
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
      </Container>

      <CaseStudySection heading="In classrooms" id="reach">
        <FactList label="Where it has been used" items={REACH} />
        <Endorsements items={ENDORSEMENTS} label="Voices from the classroom" />
        <BuyLinks links={[{ text: 'micheleokimura.com/store' }]} />
      </CaseStudySection>

      <PullQuote>
        Let&rsquo;s become a community of dreamers where we don&rsquo;t compete
        but instead celebrate and support one another.
      </PullQuote>
    </CaseStudyLayout>
  )
}
