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
  type Endorsement,
} from '@/components/CaseStudyLayout'
import { BraveSeriesCovers } from '@/components/BraveSeriesCovers'
import { Container } from '@/components/Container'
import { BRAVE_SERIES_TITLES } from '@/lib/brave-series-covers'
import { pageMetadata } from '@/lib/schema'

const braveTitle = BRAVE_SERIES_TITLES.find((t) => t.slug === 'brave-and-bold')!

export const metadata: Metadata = pageMetadata({
  title: 'Brave & Bold',
  description:
    'The Brave Series title for teen boys. Four volumes on courage, identity, healthy relationships, and protection from exploitation, in faith and non-faith editions.',
  path: '/projects/brave-series/brave-and-bold',
  type: 'article',
  ogDescription:
    'Four volumes for teen boys on courage, identity, and purpose.',
})

const DETAIL = [
  'Volumes 1 through 3 build identity, emotional health, self-worth, healthy relationships, and vision for your life.',
  'Volume 4 covers pornography, sexual violence, and sex trafficking in age-appropriate ways.',
  'Available in a faith edition and a non-faith edition, with facilitator guides for classroom and small-group use.',
  'Sold as single volumes and as a four-volume set.',
]

const ADOPTION = [
  'A large Presbyterian church on Oʻahu uses Brave & Bold alongside Brave & Beautiful to equip and train all of their adult leaders for leadership.',
  'Adopted by youth workers who wanted material that speaks to boys about worth and courage without talking down to them.',
  'Used by men well past their teenage years who found the material addressed things nobody had walked them through.',
]

const ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      'The Brave Series is a groundbreaking, survivor-informed resource that empowers youth with confidence, resilience, and the tools to safeguard themselves from exploitation. Its engaging, age-appropriate approach builds self-worth and inspires leadership, making it an essential prevention tool for protecting and uplifting the next generation.',
    source:
      'Rachel Fisher, National and International Anti-Trafficking Consultant, Nurse, and Survivor',
  },
]

export default function BraveAndBoldPage() {
  return (
    <CaseStudyLayout
      workSlug="brave-and-bold"
      eyebrow="Brave Series · For teen boys"
      title="Brave & Bold"
      lede={
        <p>
          The title for teen boys, built on the same four-volume structure as
          the rest of the series. It was set aside mid-production when the State
          of Hawaiʻi asked for a co-ed edition, then picked back up and finished
          in both faith and non-faith versions.
        </p>
      }
      contactHeading="Bring Brave & Bold to your boys."
      contactSource="project-brave-and-bold"
      contactBody={
        <p>
          Churches, schools, and youth organizations are running this with teen
          boys and with adult leaders. Tell Michele about your group and she
          will help you choose the right edition.
        </p>
      }
    >
      <CaseStudySection heading="The story behind it" id="story" className="mt-16 sm:mt-24">
        <Prose>
          <p>
            Brave &amp; Bold was well underway when the work was interrupted. In
            the fall of 2024 Michele presented the series to Hawaiʻi&rsquo;s
            Superintendent of Education, who wanted it rolled out statewide.
            Public schools do not separate boys and girls, so a co-ed edition
            had to come first. Brave &amp; Bold was paused and the team put
            everything into Brave Together.
          </p>
          <p>
            After Brave Together non-faith was finished in October 2025, the
            team went back and completed Brave &amp; Bold in faith and non-faith
            versions. The pause turned out to be worth it. The lessons written
            for the co-ed edition sharpened the whole series.
          </p>
          <p>
            The full account of the series is on the{' '}
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

      <Container className="mt-16 sm:mt-20">
        <BraveSeriesCovers
          titles={[braveTitle]}
          showTitleLabels={false}
        />
      </Container>

      <CaseStudySection heading="What is inside" id="structure">
        <FactList label="How the four volumes work" items={DETAIL} />
      </CaseStudySection>

      <GoldenThread>
        Boys are rarely handed language for their own worth. Brave &amp; Bold
        gives them three volumes of it before it asks them to be careful with
        anyone else&rsquo;s.
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
