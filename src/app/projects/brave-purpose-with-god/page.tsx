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

// Story-behind-the-story case study for Brave Purpose with God (faith, 2027).
//
// The story quotes Michele's typeset PREFACE in full, then the opening of her
// INTRODUCTION ("A Sacred Invitation") down to the treasure-chest line. The
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
  title: 'Brave Purpose with God',
  description:
    'The story behind Brave Purpose with God, Michele Okimura’s 2027 faith edition on discovering the dreams He planted in you and taking the next step of obedience.',
  alternates: { canonical: '/projects/brave-purpose-with-god' },
  openGraph: {
    type: 'article',
    title: `Brave Purpose with God | ${siteConfig.brand}`,
    description:
      'Decades of dreaming big with God, written into a guide for partnering with Him. Coming Spring 2027.',
    url: `${siteConfig.url}/projects/brave-purpose-with-god`,
  },
}

const DETAILS = [
  { label: 'Release', value: 'Spring 2027' },
  { label: 'Edition', value: 'Faith' },
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
      'There is a lack of practical tools that can assist young adults in discovering the direction that God wants their life to take. This book fills that void. Writing with a positive and uplifting tone, Michele provides practical advice on how to connect with one’s life purpose, no matter what adult life stage you are in.',
    source:
      'Ted Esler, President and CEO of Missio Nexus (the largest North American mission network)',
  },
  {
    quote:
      'Brave Purpose with God is a wonderful resource, helping us reflect on who we are, what we can achieve, and where to go from here. Listen for that divine voice of calm and clarity rising above the noise as we explore Brave Purpose with God together.',
    source:
      'Edwin Keh, CEO of HKRITA; former Senior Vice President and COO of Walmart Global Procurement; Faculty at the Wharton School of the University of Pennsylvania, and A3 Christian Ministry',
  },
  {
    quote:
      'Okimura masterfully connects the prophetic and the artistic with the dusty, everyday path we actually walk. Readers will come away not just encouraged but awakened as travelers ready to follow God’s clues toward the treasure He has prepared.',
    source:
      'Ted Vail, D.I.S., Senior Vice President of Mission, The Foursquare Church',
  },
]

export default function BravePurposeWithGodProject() {
  return (
    <CaseStudyLayout
      eyebrow="Book · Coming 2027"
      title="Brave Purpose with God"
      lede={
        <p>
          Decades of dreaming big with a God full of surprises, written down for
          anyone ready to partner with Him.
        </p>
      }
      contactHeading="The current is moving."
      contactSource="project-brave-purpose-with-god"
      contactBody={
        <p>
          Leave your name and email and Michele will let you know when{' '}
          <em>Brave Purpose with God</em> is ready.
        </p>
      }
    >
      <BookFacts
        title="Brave Purpose with God"
        badge="Coming Spring 2027"
        details={DETAILS}
      >
        <p>
          The 15-step Brave Purpose Framework in three movements, written for
          readers walking it with God. The companion non-faith edition is{' '}
          <em>Brave Purpose</em>.
        </p>
      </BookFacts>

      <GoldenThread>
        In <em>Brave Purpose with God</em> the thread is the Father waiting for
        you on the water. Michele calls a reader off the rock of the familiar
        and into the dreams He planted before they were born, treating even
        their deepest pains as clues on the way to the treasure He has prepared.
      </GoldenThread>

      <CaseStudySection heading="The story behind the story" id="story">
        <Prose>
          <p>Friend, welcome to a great adventure.</p>
          <p>
            The journey of dreaming big with God is a path I have walked for
            decades, and beautifully, it is the very road that has led me to
            you. As I have navigated the hills and valleys of pursuing the
            dreams He planted within me, discovering God&rsquo;s purposes along
            the way, I have been left with a gratitude deeper than words can
            express.
          </p>
          <p>
            Time and again, I have discovered that God had bigger dreams for my
            life than I could have ever conceived. He is a God full of
            surprises! Pursuing His heart has led to personal transformation,
            profound healing, and a life of miracles beyond my wildest
            imagination. It has been a walk into the kind of freedom that only a
            Heavenly Father can give.
          </p>
          <p>
            Every milestone I have reached, from the victories and mountain-top
            moments to the quiet, healing shifts of the soul, has been a
            preparation for this season: to see you embrace the sacred richness
            of the story God is writing through your life. My great passion is
            to walk beside you as you learn to partner with our Creator God,
            daring to dream with the same boldness that He used to craft the
            stars.
          </p>
          <p>
            As we navigate together, may the Holy Spirit lead you beyond the
            boundaries of any self-imposed limitations. We will step into the
            light of the Father&rsquo;s grace where you can walk in the
            breathtaking fullness of who you were always meant to be: thriving,
            unhindered, and alive with your God-given purpose.
          </p>
          <p>
            There is a spark within you that isn&rsquo;t just a wish. It is a
            divine whisper. Let&rsquo;s unlock your dreams and watch as your
            life becomes the masterpiece God intended it to be.
          </p>
          <p>
            May the glory of God be witnessed and experienced through you, and
            through the impact of your dreams.
          </p>
        </Prose>
        <VoiceNote>Michele&rsquo;s preface, quoted in full.</VoiceNote>

        <Prose>
          <p>
            Imagine, for a moment, that you are standing barefoot on a smooth,
            sun-warmed rock in the middle of a flowing river. The cool water
            swirls ankle-deep around you, and you can feel the gentle,
            persistent tug of the current. It is inviting you to let go, to
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
            call to experience deeper fulfillment, more radiant joy, and the
            abundant life that Jesus offers that makes your soul feel alive. And
            still, you may hesitate. It is uncomfortable, perhaps even
            frightening, to risk stepping off the solid ground of the
            &ldquo;known&rdquo; and into the flow of what could be.
          </p>
          <p>
            This winding river journey is, at its heart, a pursuit of the hidden
            treasure chest of dreams God has planted within you. That is the
            voice calling out to you from the water.
          </p>
        </Prose>
        <VoiceNote>
          The opening of Michele&rsquo;s introduction, &ldquo;A Sacred
          Invitation.&rdquo;
        </VoiceNote>
      </CaseStudySection>

      <PullQuote attribution="Michele Okimura">
        The map is in your hands, the river is deep, and the Father is already
        waiting for you upon the water.
      </PullQuote>

      <CaseStudySection heading="What the book is" id="what-it-is">
        <Prose>
          <p>
            <em>Brave Purpose with God</em> is a practical guide in three
            movements. Discovering the Dreamer Within is a reckoning of a
            reader&rsquo;s worth as a beloved child of God, dismantling the
            false beliefs that kept them small and naming the God-given dreams
            planted at the center of their purpose. From Dreamer to Builder
            treats imagination as a sacred blueprint and teaches the discipline
            of stewarding the three T&rsquo;s He has already placed in their
            hands: Time, Treasure, and Talents. Living Your Dream builds the
            courage to protect a vision when the temptation to quit is loudest,
            and helps a reader find the God-sent community that will champion
            their purpose when they cannot champion it themselves.
          </p>
          <p>
            Explorer&rsquo;s Notes and Treasure Summaries run through the book,
            written for partnership with the Holy Spirit and paced as a treasure
            hunt rather than a quick read. Michele writes it for the young adult
            in the season of the first breath, the mid-life reader on the
            sustained trek, and the senior stepping into a golden legacy, and
            she widens what &ldquo;big&rdquo; is allowed to mean along the way:
            a dream is measured by the depth of the obedience and the heart
            behind the action.
          </p>
          <p className="text-base text-neutral-600 italic">
            Same 15-step Brave Purpose Framework as the non-faith edition, with
            a companion workbook.
          </p>
        </Prose>
      </CaseStudySection>

      <CaseStudySection heading="Endorsements" id="endorsements">
        <Endorsements items={ENDORSEMENTS} label="Early praise" />
      </CaseStudySection>

      <CaseStudySection heading="Launch information" id="launch">
        <Prose>
          <p>
            <em>Brave Purpose with God</em> releases in Spring 2027 from Dream
            Big Publish / Ohana Style Publishing, in trade paperback and e-book
            with an audiobook planned, alongside a companion workbook.
          </p>
          <p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 font-display text-base font-semibold text-neutral-950 underline decoration-[var(--color-brand-orange)] decoration-2 underline-offset-4 transition hover:text-[var(--color-brand-orange-ink)]"
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
              href: '/projects/brave-purpose',
              title: 'Brave Purpose',
              audience:
                'The non-faith edition. Same framework, voiced without the faith framing.',
            },
            {
              href: '/projects/birth-of-explicit-movement',
              title: 'The Birth of Explicit Movement',
              audience:
                'The walk of obedience this framework was drawn from.',
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
