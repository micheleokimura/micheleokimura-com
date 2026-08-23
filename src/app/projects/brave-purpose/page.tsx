import type { Metadata } from 'next'
import Link from 'next/link'

import { BookFacts } from '@/components/BookFacts'
import {
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
import { siteConfig } from '@/lib/site-config'

// Story-behind-the-story case study for Brave Purpose (non-faith, 2027).
//
// The story quotes Michele's typeset PREFACE in full, then the opening of her
// INTRODUCTION ("A Profound Invitation") down to the treasure-chest line. The
// remaining introduction sections (the season map, the three movements, the
// pace of the trek, the Rhythm of Yes, and Redefining "Big") are trimmed here
// for page length; their substance is summarised under "What the book is."
// Source of record: content/case-studies/origin-stories.md.
//
// Endorsement quotes are reused verbatim from the Author page. The Endorsements
// component supplies the surrounding curly quotes, so the strings here carry no
// outer quotation marks. Do not reword either the quotes or the attributions.
//
// No cover art exists yet, so BookFacts renders its placeholder; drop the file
// in /public/images/books and pass `cover` when art lands.

export const metadata: Metadata = {
  title: 'Brave Purpose',
  description:
    'The story behind Brave Purpose, Michele Okimura’s 2027 non-faith guide to finding the dreams planted in you and building a life around them.',
  alternates: { canonical: '/projects/brave-purpose' },
  openGraph: {
    type: 'article',
    title: `Brave Purpose | ${siteConfig.brand}`,
    description:
      'Decades of walking the road of dreaming big, written into a practical guide. Coming Spring 2027.',
    url: `${siteConfig.url}/projects/brave-purpose`,
  },
}

const DETAILS = [
  { label: 'Release', value: 'Spring 2027' },
  { label: 'Edition', value: 'Non-faith' },
  { label: 'Publisher', value: 'Dream Big Publish / Ohana Style Publishing' },
  {
    label: 'Format',
    value: 'Trade paperback, e-book, audiobook (planned)',
  },
  { label: 'Companion', value: 'Workbook included' },
] as const

const ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      'Brave Purpose is a wonderful resource in the midst of all this, helping us reflect on our identity, our potential, and our direction. The intent is for us to find our true purpose and meaning, and to live the unique life we were inherently designed for.',
    source:
      'Edwin Keh, CEO of HKRITA; former Senior Vice President and COO of Walmart Global Procurement; Faculty at the Wharton School of the University of Pennsylvania',
  },
  {
    quote:
      'Brave Purpose is not simply a book, it is a sacred invitation. From the first page, you feel gently yet firmly called out of hiding and into the courageous work of becoming who you were always meant to be. This is the kind of book you don’t just read, you experience.',
    source: 'Gerald Teramae, Head of School, Island Pacific Academy',
  },
]

export default function BravePurposeProject() {
  return (
    <CaseStudyLayout
      eyebrow="Book · Coming 2027"
      title="Brave Purpose"
      lede={
        <p>
          Decades of walking the road of dreaming big, written down as a
          practical guide for anyone ready to step off the rock.
        </p>
      }
      contactHeading="The current is moving."
      contactSource="project-brave-purpose"
      contactBody={
        <p>
          Leave your name and email and Michele will let you know when{' '}
          <em>Brave Purpose</em> is ready.
        </p>
      }
    >
      <BookFacts
        title="Brave Purpose"
        badge="Coming Spring 2027"
        details={DETAILS}
      >
        <p>
          The 15-step Brave Purpose Framework in three movements, voiced without
          the faith framing. The companion faith edition is{' '}
          <em>Brave Purpose with God</em>.
        </p>
      </BookFacts>

      <GoldenThread>
        In <em>Brave Purpose</em> the thread becomes a map. Michele treats the
        pains a reader carries as clues rather than dead ends, and the dreams
        they buried as treasure worth digging for. The restoration is the method
        here: a person has to recover their own worth before they can build
        anything on top of it.
      </GoldenThread>

      <CaseStudySection heading="The story behind the story" id="story">
        <Prose>
          <p>Welcome to a great adventure.</p>
          <p>
            The journey of dreaming big is a path I have walked for decades, and
            beautifully, it is the very road that has led me to you. As I have
            navigated the hills and valleys of discovering my true north,
            pursuing the dreams rooted within me with intention and openness, I
            have been left with a gratitude deeper than words can express. It
            has been a journey of personal transformation, profound healing, and
            experiencing the miraculous potential of life. This journey has
            gifted me with the kind of freedom that only comes from being
            willing to explore and learn what is in my own heart and to take
            steps to live with purpose.
          </p>
          <p>
            Every milestone I have reached, from the hard-won victories to the
            quiet shifts of the soul, has led me to this desire: to see you
            embrace the power and richness of your own story. My passion and
            mission are to help you clear the path for you to realize the
            potential you carry and to dream with boldness. My heart is to help
            you navigate your way out of any shadows of self-doubt and the
            boundaries of external limitations so you can walk in the greater
            fullness of your true self.
          </p>
          <p>
            There is a profound spark within you that is a quiet, persistent
            voice of potential that is far more than just a fleeting wish. It is
            an inner calling, a blueprint of what you are truly capable of.
          </p>
          <p>
            You were meant to thrive, to live unhindered, vibrant, and deeply
            aligned with a sense of meaning. The dreams planted in your heart
            aren&rsquo;t accidental; they are there because you have something
            uniquely positive to offer this world. Together, let&rsquo;s unlock
            that treasure and watch as your life transforms into the masterpiece
            you were always meant to be.
          </p>
          <p>
            May the brilliance of your true potential be witnessed and
            experienced through you, and through the impact of your dreams.
          </p>
        </Prose>
        <VoiceNote>Michele&rsquo;s preface, quoted in full.</VoiceNote>

        <Prose>
          <p>
            Imagine, for a moment, that you are standing barefoot on a smooth,
            sun-warmed rock in the middle of a flowing river. The cool water
            swirls ankle-deep around you, and you can feel the gentle,
            persistent tug of flowing waters. It is inviting you to let go, to
            drift downstream into territory unknown, into a great adventure.
          </p>
          <p>
            Yet, there is something comforting about the safety of the rock. It
            feels stable. It is familiar. It is known. It is like the somewhat
            predictable life you have created, and you know every inch of its
            surface.
          </p>
          <p>
            But deeper than the comfort of where you stand, you feel it. A
            subtle, magnetic pull of a current toward something more. It is the
            call to experience deeper fulfillment, more radiant joy that makes
            your soul feel alive. And still, you may hesitate. It is
            uncomfortable, perhaps even frightening, to risk stepping off the
            solid ground of the &ldquo;known&rdquo; and into the flow of what
            could be.
          </p>
          <p>
            This winding river journey is, at its heart, a pursuit of the hidden
            treasure chest of dreams planted within you. That is the voice
            calling out to you from the water.
          </p>
        </Prose>
        <VoiceNote>
          The opening of Michele&rsquo;s introduction, &ldquo;A Profound
          Invitation.&rdquo;
        </VoiceNote>
      </CaseStudySection>

      <PullQuote attribution="Michele Okimura">
        You may feel like you aren&rsquo;t ready, but everything you need to
        begin is already within you.
      </PullQuote>

      <CaseStudySection heading="What the book is" id="what-it-is">
        <Prose>
          <p>
            <em>Brave Purpose</em> is a practical guide in three movements.
            Discovering the Dreamer Within is a reckoning of a reader&rsquo;s
            worth, dismantling the limiting beliefs that kept them small and
            naming the dreams at the center of their own experience. From
            Dreamer to Builder trades the shovel for drafting tools, using
            imagination as a blueprint and teaching the discipline of managing
            the three T&rsquo;s already in hand: Time, Treasure, and Talents.
            Achieving and Living Your Dream builds the resilience to protect a
            vision when the temptation to quit is loudest, and helps a reader
            find the community that will champion their purpose when they
            cannot champion it themselves.
          </p>
          <p>
            Explorer&rsquo;s Notes and Treasure Summaries run through the book
            so the reading turns into real steps, paced as a marathon of
            discovery rather than a sprint. Michele writes it for the young
            adult in the season of the first breath, the mid-life reader on the
            sustained trek, and the senior stepping into a golden legacy, and
            she widens what &ldquo;big&rdquo; is allowed to mean along the way:
            dreaming bigger sometimes means dreaming deeper rather than wider.
          </p>
          <p className="text-base text-neutral-600 italic">
            Same 15-step Brave Purpose Framework as the faith edition, with a
            companion workbook.
          </p>
        </Prose>
      </CaseStudySection>

      <CaseStudySection heading="Endorsements" id="endorsements">
        <Endorsements items={ENDORSEMENTS} label="Early praise" />
      </CaseStudySection>

      <CaseStudySection heading="Launch information" id="launch">
        <Prose>
          <p>
            <em>Brave Purpose</em> releases in Spring 2027 from Dream Big
            Publish / Ohana Style Publishing, in trade paperback and e-book with
            an audiobook planned, alongside a companion workbook.
          </p>
          <p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 font-display text-base font-semibold text-neutral-950 underline decoration-[var(--color-brand-terracotta)] decoration-2 underline-offset-4 transition hover:text-[var(--color-brand-terracotta-ink)]"
            >
              Contact Michele for release updates
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </p>
          <p className="text-sm text-neutral-500 italic">
            Launch email list coming soon.
          </p>
        </Prose>
      </CaseStudySection>

      <CaseStudySection heading="Also see" id="also-see">
        <SiblingLinks
          label="Elsewhere in Michele’s story"
          items={[
            {
              href: '/projects/brave-purpose-with-god',
              title: 'Brave Purpose with God',
              audience:
                'The faith edition. Same framework, written for readers walking it with God.',
            },
            {
              href: '/projects/birth-of-explicit-movement',
              title: 'The Birth of Explicit Movement',
              audience:
                'The lived version of this framework, years before it had a name.',
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
