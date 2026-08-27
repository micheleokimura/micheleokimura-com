import type { Metadata } from 'next'

import { pageMetadata } from '@/lib/schema'

import { BookFacts } from '@/components/BookFacts'
import {
  BuyLinks,
  CaseStudyLayout,
  CaseStudySection,
  Endorsements,
  GoldenThread,
  Prose,
  PullQuote,
  SiblingLinks,
  VoiceNote,
  type Endorsement,
} from '@/components/CaseStudyLayout'

// Story-behind-the-story case study for The Birth of Explicit Movement (2018).
//
// The passage under "The story behind the story" is Michele's own
// "INTRODUCTION: THE FIRST THREE YEARS" from the print edition, quoted in full
// and unedited apart from paragraph breaks for the web. Source of record:
// content/case-studies/origin-stories.md.
//
// Endorsement quotes are reused verbatim from the Author page. The Endorsements
// component supplies the surrounding curly quotes, so the strings here carry no
// outer quotation marks. Do not reword either the quotes or the attributions.

export const metadata: Metadata = pageMetadata({
  title: 'The Birth of Explicit Movement',
  description:
    'The story behind The Birth of Explicit Movement: three years of walking a road Michele Okimura could not see the end of, and the ministry that came of it.',
  path: '/projects/birth-of-explicit-movement',
  type: 'article',
  ogDescription:
    'The founding story of Explicit Movement, told by Michele Okimura in her own words.',
})

const DETAILS = [
  { label: 'Published', value: '2018' },
  { label: 'Subtitle', value: 'Discover Keys to Fulfilling Your Purpose' },
  { label: 'Publisher', value: 'Explicit Movement / Releasing Generations' },
  { label: 'Format', value: 'Paperback and e-book' },
] as const

const ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      'Michele is a remarkably gifted woman with an unbounded mother’s heart for the incredibly talented and passionate young people she draws into God’s Kingdom. This small book will bring huge encouragement to you, revealing that God is still intimately active in the world and in the hearts of humble and unlikely heroes like Michele.',
    source:
      'Glenn T. Stanton, Director of Global Family Formation Studies, Focus on the Family',
  },
  {
    quote:
      'Michele said, ‘Yes, Lord!’ and today she is leading the Explicit Movement that is bringing a message of sexual purity, and along with it hope and healing, to thousands of children and young people in the islands of Hawaii and beyond. You will be inspired and challenged to surrender your own life, just as Michele did, and follow the Lord into the purpose and destiny He has for you.',
    source:
      'Dr. Ed Silvoso, Founder and President of Harvest Evangelism and the International Transformation Network',
  },
  {
    quote:
      'Michele Okimura and her team minister healing and freedom to those in pain. If you have been abused or know anyone who has been a victim of abuse, and all of us do, you need to read this book that will give you hope.',
    source: 'Dr. Caroline Ward Oda, Ph.D.',
  },
]

export default function BirthOfExplicitMovementProject() {
  return (
    <CaseStudyLayout
      workSlug="birth-of-explicit-movement"
      eyebrow="Book · 2018"
      title="The Birth of Explicit Movement"
      lede={
        <p>
          The founding story of a ministry Michele never set out to start,
          written as testimony and as a reflection guide.
        </p>
      }
      contactHeading="Step out with increased abandon."
      contactBody={
        <p>
          Leave your name and email to hear when Michele releases something new,
          including the two <em>Brave Purpose</em> editions arriving in 2027.
        </p>
      }
    >
      <BookFacts
        title="The Birth of Explicit Movement"
        cover="/images/books/birth-of-explicit-movement-cover@2x.jpg"
        details={DETAILS}
      >
        <p>
          Michele&rsquo;s founding story told in full, with reflection sections
          that turn the account into a reader&rsquo;s own next step. The Speaker
          keynote &ldquo;Finding Your Brave Purpose&rdquo; is drawn from this
          book.
        </p>
      </BookFacts>

      <GoldenThread>
        In <em>The Birth of Explicit Movement</em> the thread runs through three
        years of obedience: healed hearts, transformed lives, and a woman saying
        yes to the next turn in the road before she could see what was around
        it. The restoration Michele received in <em>Dancing with Father</em> is
        the same restoration she is carrying here to other people&rsquo;s
        children.
      </GoldenThread>

      <CaseStudySection heading="The story behind the story" id="story">
        <Prose>
          <p>
            Welcome to the story about the birth of Explicit Movement, a
            surprising God idea! It is a unique story because it is unlike the
            birthing of many powerful and amazing ministries that were born out
            of a God-given passion or dream someone had and nurtured over time.
          </p>
          <p>
            Let me describe the unusual Explicit Movement journey in this way.
            His assignment usually involved taking a step in a certain
            direction. I would keep walking, even though I was clueless to where
            I was going. Then, unexpectedly, there would be a turn in the road.
            As I would make the turn, God would surprise me with what was behind
            the bend, and my response would often be, &ldquo;What Lord? You want
            to do that? No! I can&rsquo;t do that!&rdquo; Following my initial
            resistance, there was often a painful process of complete surrender
            of my will for His will - a walk of obedience. I would then honor
            and trust His authority and wisdom, holding tight to His hand. I
            continued walking, never knowing what would happen next!
            Supernatural miracles, divine appointments, amazing favor, miracles
            of healed hearts and transformed lives filled the path as I walked.
            This describes what the first three years were like!
          </p>
          <p>
            It is my hope that these testimonies will impart courage and
            strength to your heart to step out in faith and serve Him with
            increased abandon! May you encounter God. May the Holy Spirit speak
            to you encouraging messages from His heart to yours about your life
            and incredible purpose!
          </p>
          <p className="text-base text-neutral-600 italic">
            &ldquo;&hellip;for it is your Father&rsquo;s good pleasure to give
            you the kingdom.&rdquo; Luke 12:32 NKJV
          </p>
        </Prose>
        <VoiceNote>
          Michele&rsquo;s introduction, &ldquo;The First Three Years,&rdquo;
          quoted in full.
        </VoiceNote>
      </CaseStudySection>

      <PullQuote attribution="Michele Okimura">
        I continued walking, never knowing what would happen next!
      </PullQuote>

      <CaseStudySection heading="What the book is" id="what-it-is">
        <Prose>
          <p>
            <em>The Birth of Explicit Movement</em> tells the first three years
            of the ministry as testimony rather than strategy. Each chapter
            closes with reflection sections that turn Michele&rsquo;s account
            into a personal guide, so a reader can trace the same pattern of
            listening, resistance, surrender, and obedience in their own life.
            Her keynote &ldquo;Finding Your Brave Purpose&rdquo; comes straight
            out of this book.
          </p>
          <p className="text-base text-neutral-600">
            Explicit Movement equips parents, church leaders, and young people
            through events, courses, and resources on pornography addiction,
            sexual violence, and healthy relationships. The approach is
            compassionate and grace-filled, helping young people find hope and
            healing, know their value and identity in Christ, and walk in sexual
            integrity as they step into the fullness of who God created them to
            be.
          </p>
        </Prose>
      </CaseStudySection>

      <CaseStudySection heading="Endorsements" id="endorsements">
        <Endorsements items={ENDORSEMENTS} label="In their words" />
      </CaseStudySection>

      <CaseStudySection heading="Where to get it" id="where-to-get-it">
        <BuyLinks
          label="Available at"
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
      </CaseStudySection>

      <CaseStudySection heading="Also see" id="also-see">
        <SiblingLinks
          label="Elsewhere in Michele’s story"
          items={[
            {
              href: '/projects/dancing-with-father',
              title: 'Dancing with Father',
              audience:
                'Where the story begins. The healed memory behind everything that followed.',
            },
            {
              href: '/projects/brave-purpose-with-god',
              title: 'Brave Purpose with God',
              audience:
                'The 2027 book that turns this walk of obedience into a guide anyone can follow.',
            },
            {
              href: '/author',
              title: 'All books and curricula',
              audience: 'Michele’s full body of authored work.',
            },
          ]}
        />
      </CaseStudySection>
    </CaseStudyLayout>
  )
}
