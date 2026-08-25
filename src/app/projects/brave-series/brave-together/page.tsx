import type { Metadata } from 'next'
import Link from 'next/link'

import {
  BuyLinks,
  CaseStudyLayout,
  CaseStudySection,
  Endorsements,
  FactList,
  GoldenThread,
  Prose,
  PullQuote,
  Recognition,
  type Endorsement,
} from '@/components/CaseStudyLayout'
import { BraveSeriesCovers } from '@/components/BraveSeriesCovers'
import { Container } from '@/components/Container'

// The DOE review is the headline of this page. Keep the claim narrow: what the
// Hawai‘i Department of Education reviewed and approved is the Hawai‘i Brave
// Together three-article booklet, for the state's Sexual Violence Prevention
// Initiative. It is not a statewide approval of the curriculum for schools.
import { BRAVE_SERIES_TITLES } from '@/lib/brave-series-covers'
import { pageMetadata } from '@/lib/schema'

const braveTitle = BRAVE_SERIES_TITLES.find((t) => t.slug === 'brave-together')!

export const metadata: Metadata = pageMetadata({
  title: 'Brave Together',
  description:
    'The co-ed Brave Series title. The Hawaiʻi Brave Together three-article booklet was reviewed and approved by the Hawaiʻi Department of Education for the state’s Sexual Violence Prevention Initiative. Teacher lessons by Phyllis Unebasami.',
  path: '/projects/brave-series/brave-together',
  type: 'article',
  ogDescription:
    'The co-ed edition behind the booklet the Hawaiʻi Department of Education reviewed and approved.',
})

const RECOGNITION = [
  'The Hawaiʻi Brave Together three-article booklet was reviewed and approved by the Hawaiʻi Department of Education for the state’s Sexual Violence Prevention Initiative.',
  'Teacher lessons written by Phyllis Unebasami, retired Hawaiʻi Deputy Superintendent of the Department of Education and a leading curriculum designer in the state',
  '2023 Outstanding Advocate for the Children and Youth of Hawaiʻi, awarded to Releasing Generations by Hawaiʻi’s Governor and Honolulu’s Mayor for the development of the Brave Series',
]

const DETAIL = [
  'Written for co-ed classrooms, because public schools do not separate boys and girls.',
  'Volumes 1 through 3 build identity, emotional health, self-worth, healthy relationships, and vision for your life.',
  'Volume 4 covers pornography, sexual violence, and sex trafficking in age-appropriate ways.',
  'More than 80 lessons with slide decks, in a faith edition and a non-faith edition. The non-faith edition is the one behind the booklet the Department of Education reviewed and approved.',
]

const ADOPTION = [
  'The Hawaiʻi Brave Together three-article booklet was reviewed and approved by the Hawaiʻi Department of Education for the state’s Sexual Violence Prevention Initiative.',
  'Piloted in the Philippines, at a South Carolina Christian school, and at a Native American reservation school.',
  'Used by safe houses that rehabilitate and restore trafficked victims, as a resource for healing and restoration with traumatized youth and adults.',
]

const ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      'When first introduced to the materials, I found them breathtaking and unlike anything I had seen. The Brave Series equips young people with the tools to navigate challenges, make informed decisions, and step confidently into their potential by addressing critical topics like self-worth, healthy relationships, and personal responsibility.',
    source:
      'Phyllis Unebasami, Retired Hawaiʻi Deputy Superintendent of the Department of Education',
  },
  {
    quote:
      'The Brave Series is a groundbreaking, survivor-informed resource that empowers youth with confidence, resilience, and the tools to safeguard themselves from exploitation. Its engaging, age-appropriate approach builds self-worth and inspires leadership, making it an essential prevention tool for protecting and uplifting the next generation.',
    source:
      'Rachel Fisher, National and International Anti-Trafficking Consultant, Nurse, and Survivor',
  },
]

export default function BraveTogetherPage() {
  return (
    <CaseStudyLayout
      workSlug="brave-together"
      eyebrow="Brave Series · Co-ed"
      title="Brave Together"
      lede={
        <p>
          The co-ed edition. The Hawaiʻi Brave Together three-article booklet
          was reviewed and approved by the Hawaiʻi Department of Education for
          the state&rsquo;s Sexual Violence Prevention Initiative. It exists
          because a retired Deputy Superintendent believed every public school
          student in the state needed this material, and public schools do not
          separate boys and girls.
        </p>
      }
      contactHeading="Bring Brave Together to your school."
      contactSource="project-brave-together"
      contactBody={
        <p>
          The Hawaiʻi Brave Together three-article booklet was reviewed and
          approved by the Hawaiʻi Department of Education for the state&rsquo;s
          Sexual Violence Prevention Initiative, and the curriculum is being
          piloted internationally. Tell Michele about your school or district
          and she will walk you through it.
        </p>
      }
    >
      <PullQuote className="mt-14 sm:mt-20">
        She said she believed the entire state of Hawaiʻi public schools needed
        this.
      </PullQuote>

      <CaseStudySection heading="How it happened" id="story">
        <Prose>
          <p>
            &ldquo;We were unexpectedly interrupted in the fall of 2024. I met
            the former retired Deputy Superintendent of the Hawaiʻi Department
            of Education. She said she believed the entire state of Hawaiʻi
            public schools needed this. I got to present it to the current
            Superintendent Hayashi. After my presentation, he said he wanted to
            roll it out statewide. But public schools don&rsquo;t separate boys
            and girls, so we needed a co-ed version. We paused Brave &amp; Bold
            and put the gas pedal on Brave Together.
          </p>
          <p>
            For a whole year Phyllis Unebasami joined our team and wrote all of
            the teacher lessons for the Brave Together co-ed version. She is a
            top curriculum designer in our state, and a wonderful Christian
            woman. The Hawaiʻi Brave Together three-article booklet was reviewed
            and approved by the Hawaiʻi Department of Education for the
            state&rsquo;s Sexual Violence Prevention Initiative.&rdquo;
          </p>
        </Prose>
        <Recognition items={RECOGNITION} />
      </CaseStudySection>

      <Container className="mt-16 sm:mt-20">
        <BraveSeriesCovers
          titles={[braveTitle]}
          showTitleLabels={false}
        />
      </Container>

      <CaseStudySection heading="What is inside" id="structure">
        <FactList label="How the four volumes work" items={DETAIL} />
        <Prose>
          <p>
            The full account of the series, from the 2019 assignment through the
            vision and the two and a half years of production, is on the{' '}
            <Link
              href="/projects/brave-series"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-terracotta)] decoration-1 underline-offset-4 transition hover:decoration-2"
            >
              Brave Series hub
            </Link>
            .
          </p>
        </Prose>
      </CaseStudySection>

      <GoldenThread>
        A public school cannot teach faith, but it can teach a student that they
        are worth protecting. Brave Together carries the same conviction into a
        classroom that could not have received it any other way.
      </GoldenThread>

      <CaseStudySection heading="Where it is being used" id="adoption">
        <FactList label="In the field" items={ADOPTION} />
        <Endorsements items={ENDORSEMENTS} label="What people say" />
        <BuyLinks
          label="Buy at"
          links={[{ text: 'thebraveseries.com', href: 'https://thebraveseries.com' }]}
        />
      </CaseStudySection>
    </CaseStudyLayout>
  )
}
