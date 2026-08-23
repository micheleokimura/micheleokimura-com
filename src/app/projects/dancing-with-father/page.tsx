import type { Metadata } from 'next'

import { pageMetadata } from '@/lib/schema'

import { BookFacts } from '@/components/BookFacts'
import {
  BuyLinks,
  CaseStudyLayout,
  CaseStudySection,
  Endorsements,
  FactList,
  GoldenThread,
  Prose,
  PullQuote,
  SiblingLinks,
  VoiceNote,
  type Endorsement,
} from '@/components/CaseStudyLayout'

// Story-behind-the-story case study for Dancing with Father (2011).
//
// The passage under "The story behind the story" is Michele's own INTRODUCTION
// from the print edition, quoted in full and unedited apart from paragraph
// breaks for the web. Source of record:
// content/case-studies/origin-stories.md.
//
// Endorsement quotes are reused verbatim from the Author page. The Endorsements
// component supplies the surrounding curly quotes, so the strings here carry no
// outer quotation marks. Do not reword either the quotes or the attributions.

export const metadata: Metadata = pageMetadata({
  title: 'Dancing with Father',
  description:
    'The story behind Dancing with Father: a senior prom night, a harsh word, and the healing encounter sixteen years later that Michele Okimura wrote into a poem.',
  path: '/projects/dancing-with-father',
  type: 'article',
  ogDescription:
    'The story behind Michele Okimura’s 2011 illustrated poem of healing and identity.',
})

const DETAILS = [
  { label: 'Published', value: '2011' },
  { label: 'Publisher', value: 'Xulon Press' },
  { label: 'Format', value: 'Paperback and audiobook' },
  { label: 'Illustrator', value: 'Danielle Iranon' },
  { label: 'ISBN', value: '978-1613792711' },
] as const

const READER_IMPACT = [
  'A woman in her darkest moment saw the book on her dining table, a gift from a friend. She picked it up, was met by God as she read, and instead of what she had planned, went to church the next morning. She later found Michele at a conference to tell her the book had saved her life.',
  'A woman driving cross-country to escape abuse played the audiobook on repeat for hours. Tears and healing came, mile after mile, page after page.',
  'The book has reached readers around the world, including as far as Norway and the Philippines.',
] as const

const ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      'Michele Okimura has touched a topic that is discussed very little. She invites the reader to share her tragedy and triumph by capturing that experience in Dancing with Father. This poem can be an instrument to bridge the gap in the healing process for others who have had a difficult journey through their youth.',
    source:
      'Gary and Norma Smalley, President and Founder, Smalley Relationship Center',
  },
  {
    quote:
      'Just as David wrote his Psalms, so has Michele found a voice for deeper longings of God. This is truly a soul’s cry that rings victorious. I believe Michele has found a voice for so many.',
    source:
      'Dr. Wayne Cordeiro, Founding Pastor, New Hope Christian Fellowship, Honolulu',
  },
  {
    quote:
      'When I read Dancing with the Father my heart was deeply touched. I know this deeply artistic, poetic work will touch many deeply.',
    source:
      'Patricia King, President and Founder of Extreme Prophetic Ministries',
  },
]

export default function DancingWithFatherProject() {
  return (
    <CaseStudyLayout
      workSlug="dancing-with-father"
      eyebrow="Book · 2011"
      title="Dancing with Father"
      lede={
        <p>
          A poem written out of one healed memory, and the book readers keep on
          the nightstand for years.
        </p>
      }
      contactHeading="Come dance with the One who joys over you."
      contactSource="project-dancing-with-father"
      contactBody={
        <p>
          Leave your name and email to hear when Michele releases something new,
          including the two <em>Brave Purpose</em> editions arriving in 2027.
        </p>
      }
    >
      <BookFacts
        title="Dancing with Father"
        cover="/images/books/dancing-with-father-cover@2x.jpg"
        details={DETAILS}
      >
        <p>
          An illustrated poetic book of healing, written for anyone who walked a
          difficult road through youth and still carries what was said to them
          there.
        </p>
      </BookFacts>

      <GoldenThread>
        In <em>Dancing with Father</em> the thread is a single wounded memory
        made whole: a teenage girl told she looked funny on her prom night, and
        the Father who answered sixteen years later by asking her to dance.
        Everything Michele has built since starts here, with the conviction that
        a heart can be given a new defining moment.
      </GoldenThread>

      <CaseStudySection heading="The story behind the story" id="story">
        <Prose>
          <p>
            I remember the incident as if it happened just yesterday. There I
            was, adorned in a beautiful white gown that mom had sewn for my
            Senior Prom. Like any typical teenage girl thrilled to be all
            dressed up and made up for such a distinctive occasion, I stood
            waiting in our living room with eager anticipation for my date to
            arrive. Feeling such joy and delight, the words came rolling off my
            tongue, &ldquo;How do I look?&rdquo;
          </p>
          <p>
            The abrupt response hit me, taking my breath away as I gasped for
            air. &ldquo;You look funny&rdquo; instantly shot back at me in a
            critical and angry stare. The harsh retort only reinforced the
            message I had been receiving for years and what I already had come
            to believe about myself. That brief scene became a defining moment
            for me because in its brevity, it described a reality I lived in.
          </p>
          <p>
            Sixteen years later, my husband and I attended a wonderful,
            week-long Christian conference that taught us how to facilitate
            God&rsquo;s healing to wounded souls. During lunch on the last day
            of the conference, the painful memory of my Senior Prom night came
            back to me. It caught me by surprise because I hadn&rsquo;t thought
            about the incident for a long time.
          </p>
          <p>
            After lunch, we met in our assigned small groups as we had every day
            of the conference. Since this was our last meeting together, we took
            turns being prayed for by the rest of the group. I didn&rsquo;t tell
            them about the memory of my senior prom night, but as they prayed,
            one woman said she immediately had a vision of me in a white dress.
            Then another woman said that she also immediately saw a vision of me
            in a white dress while at a dance. A third woman excitedly shared
            that she too had a vision of me in a white dress, and that Father
            God wanted to dance with me.
          </p>
          <p>
            Needless to say, I wept as I heard the Lord speak healing words to
            my heart regarding this painful memory. This was His new, defining
            moment for me.
          </p>
          <p>
            Shortly after that wondrous encounter with Him, I was inspired to
            write <em>Dancing with Father</em>. The poem is a vision of my dance
            with Father God and a tribute to Him that testifies of how He healed
            me and gave me a new identity. My hope and prayer is that you also
            will be drawn into a personal encounter with Father God as you hear
            Him speak His transforming love to you.
          </p>
          <p>
            All glory to Him who imparts a crown of beauty instead of ashes, the
            oil of joy instead of mourning and the garment of praise instead of
            a spirit of despair!
          </p>
        </Prose>
        <VoiceNote>
          Michele&rsquo;s introduction to Dancing with Father, quoted in full.
        </VoiceNote>
      </CaseStudySection>

      <PullQuote attribution="Michele Okimura">
        This was His new, defining moment for me.
      </PullQuote>

      <CaseStudySection heading="What the book is" id="what-it-is">
        <Prose>
          <p>
            <em>Dancing with Father</em> is a short illustrated book of poetry
            and reflection, carried by Danielle Iranon&rsquo;s painted artwork.
            It reads in one sitting and gives a reader who has been spoken over
            harshly a way to hear a different voice. Michele wrote it so that
            anyone walking the road she walked would know they are seen,
            pursued, and loved by God as Father.
          </p>
          <p className="text-base text-neutral-600 italic">
            Also available as an audiobook, produced in radio-drama style.
          </p>
        </Prose>
        <FactList items={READER_IMPACT} label="Reader impact" />
      </CaseStudySection>

      <CaseStudySection heading="Endorsements" id="endorsements">
        <Endorsements items={ENDORSEMENTS} label="In their words" />
      </CaseStudySection>

      <CaseStudySection heading="Where to get it" id="where-to-get-it">
        <BuyLinks
          label="Available at"
          links={[
            {
              text: 'Amazon (paperback)',
              href: 'https://www.amazon.com/Dancing-Father-Michele-Okimura/dp/1613792719',
            },
            { text: 'micheleokimura.com/store (book, audiobook)' },
          ]}
        />
      </CaseStudySection>

      <CaseStudySection heading="Also see" id="also-see">
        <SiblingLinks
          label="Next in Michele’s story"
          items={[
            {
              href: '/projects/birth-of-explicit-movement',
              title: 'The Birth of Explicit Movement',
              audience:
                'The healing in this poem became the ministry in that book.',
            },
            {
              href: '/projects/brave-purpose-with-god',
              title: 'Brave Purpose with God',
              audience:
                'The 2027 book that turns the same road into a guide anyone can follow.',
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
