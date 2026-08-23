import type { Metadata } from 'next'
import Link from 'next/link'

import {
  BuyLinks,
  CaseStudyLayout,
  CaseStudySection,
  CoverTile,
  Endorsements,
  FactList,
  GoldenThread,
  Prose,
  PullQuote,
  VoiceNote,
  type Endorsement,
} from '@/components/CaseStudyLayout'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'

// The lesson book, told as its own case study. Distinct from
// /projects/kingdom-kids, which tells the story of the WORKSHOP the book grew
// out of. The two pages cross-link rather than repeat each other.
//
// The customer quote is verbatim from Michele and must stay that way.
import { pageMetadata } from '@/lib/schema'

export const metadata: Metadata = pageMetadata({
  title: 'Raising Kingdom Kids',
  description:
    'More than 100 proven lessons from ten years of active children’s and youth ministry, on identity in Christ, hearing God’s voice, raising children leaders, giving children a voice, and healing hearts.',
  path: '/projects/raising-kingdom-kids',
  type: 'article',
  ogDescription:
    'Over 100 lessons, every one of them taught in a real room before it was written down.',
})

const TOPICS = [
  'Identity in Christ. Who a child is before God, taught at a level a child can actually hold.',
  'Hearing God’s voice. How to recognize it, how to test it, how to respond to it.',
  'Raising children leaders. Handing real responsibility to young people and standing with them while they carry it.',
  'Giving children a voice. Making room for what children have to say to the whole body, not only to each other.',
  'Healing hearts. Prayer, honesty, and the slow work of restoration, held gently at every age.',
]

const REACH = [
  'More than 100 lessons, drawn from ten years of firsthand children’s ministry and youth ministry work.',
  'Written for children’s ministry leaders and parents, and adaptable well past that range. Many lessons carry across every age group, adults included.',
  'Used churchwide by adopting churches, not only in the children’s wing.',
  'The companion resource to the Kingdom Kids Workshop, taught today as Building a Kingdom Culture at Home and in Ministry.',
]

const ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      'We purchased your curriculum because it was so amazing! We absolutely love your curriculum! We actually use it churchwide at times. So much of the curriculum is easily taught to all ages.',
    source: 'Children’s ministry customer',
  },
]

export default function RaisingKingdomKidsPage() {
  return (
    <CaseStudyLayout
      workSlug="raising-kingdom-kids"
      eyebrow="Curriculum · 100+ lessons"
      title="Raising Kingdom Kids"
      lede={
        <p>
          A lesson book for equipping the next generation. Over 100 proven, true
          lessons Michele developed across ten years of active children&rsquo;s
          ministry and youth ministry, gathered into one resource for parents,
          children&rsquo;s ministry leaders, and anyone building a culture where
          young people are trusted with something real.
        </p>
      }
      contactHeading="Bring Raising Kingdom Kids to your church."
      contactBody={
        <p>
          Tell Michele about your church, school, or family team and what you
          are hoping to build. She teaches the companion workshop as a
          conference session, a full eight-hour training, and an e-course.
        </p>
      }
      contactSource="project-raising-kingdom-kids"
    >
      <Container className="mt-14 sm:mt-20">
        <FadeIn className="mx-auto max-w-[18rem] sm:max-w-xs">
          <CoverTile
            src="/images/books/kingdom-kids.webp"
            alt="Raising Kingdom Kids, a lesson book for equipping the next generation"
            sizes="(max-width: 640px) 60vw, 18rem"
          />
        </FadeIn>
      </Container>

      <PullQuote attribution="Michele Okimura" className="mt-14 sm:mt-20">
        There is no junior Holy Spirit.
      </PullQuote>

      <CaseStudySection heading="Origin" id="origin">
        <Prose>
          <p>
            Michele spent roughly ten years working directly with children and
            youth, first inside the church she and her husband Rob planted and
            then across the churches and schools that invited her in. Rob was
            the senior pastor and he gave her room to test what young people
            could actually carry. She used it.
          </p>
          <p>
            Every lesson in this book was taught in a real room with real kids
            before it was written down. Some worked the first time. Some were
            rebuilt three or four times before they landed. What survived that
            decade is what made it into the book, which is why the subtitle
            calls them proven and true rather than new.
          </p>
          <p>
            The traditional posture treats children&rsquo;s ministry as
            preparation, as though the real thing starts later. Michele came to
            believe something else: children can be equipped at their
            age-appropriate level, minister alongside adults using their gifts,
            and know from a young age that they are genuinely part of the body
            of Christ.
          </p>
        </Prose>
        <VoiceNote>Drawn from Michele&rsquo;s own account.</VoiceNote>
      </CaseStudySection>

      <GoldenThread>
        The book runs on the same conviction that runs through everything
        Michele builds: every person, starting with the youngest child in the
        room, is valuable, and worth activating.
      </GoldenThread>

      <CaseStudySection heading="What the lessons cover" id="topics">
        <Prose>
          <p>
            Five threads run through the collection. A leader can teach straight
            through the book or pull a single lesson for the week in front of
            them, and the lessons hold either way.
          </p>
        </Prose>
        <FactList label="The five threads" items={TOPICS} />
      </CaseStudySection>

      <CaseStudySection heading="How far it reaches" id="reach">
        <Prose>
          <p>
            The book was built for the children&rsquo;s wing, and churches kept
            reporting back that they were using it well outside it. Much of the
            material adapts to youth, to parents, and to whole-congregation
            teaching with very little rework, because the questions underneath
            it do not change with age. Who am I. Can I hear God. Does my voice
            matter here. Can this be healed.
          </p>
        </Prose>
        <FactList label="Where it has gone" items={REACH} />
        <Endorsements items={ENDORSEMENTS} label="What churches say" />
        <BuyLinks links={[{ text: 'micheleokimura.com/store' }]} />
        <Prose>
          <p>
            The lesson book is the companion resource to{' '}
            <Link
              href="/projects/kingdom-kids"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-terracotta)] decoration-1 underline-offset-4 transition hover:decoration-2"
            >
              the Kingdom Kids Workshop
            </Link>
            , where Michele trains the adults who will teach it.
          </p>
        </Prose>
      </CaseStudySection>
    </CaseStudyLayout>
  )
}
