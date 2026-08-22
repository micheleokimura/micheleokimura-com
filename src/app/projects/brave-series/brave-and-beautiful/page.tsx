import type { Metadata } from 'next'
import Link from 'next/link'

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
  type Endorsement,
} from '@/components/CaseStudyLayout'
import { Container } from '@/components/Container'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Brave & Beautiful',
  description:
    'The first title in the Brave Series, published in 2022 for teen girls. Four volumes on identity, worth, healthy relationships, and protection from exploitation.',
  alternates: { canonical: '/projects/brave-series/brave-and-beautiful' },
  openGraph: {
    type: 'article',
    title: `Brave & Beautiful | ${siteConfig.brand}`,
    description: 'Four volumes for teen girls on identity, worth, and protection.',
    url: `${siteConfig.url}/projects/brave-series/brave-and-beautiful`,
  },
}

const COVERS = [
  {
    src: '/images/brave-series/brave-and-beautiful-vol1-faith-digital.png',
    alt: 'Brave & Beautiful, Volume 1',
    caption: 'Volume 1',
  },
  {
    src: '/images/brave-series/brave-and-beautiful-vol2-faith-digital.png',
    alt: 'Brave & Beautiful, Volume 2',
    caption: 'Volume 2',
  },
  {
    src: '/images/brave-series/brave-and-beautiful-vol3-faith-digital.png',
    alt: 'Brave & Beautiful, Volume 3',
    caption: 'Volume 3',
  },
  {
    src: '/images/brave-series/brave-and-beautiful-vol4-faith-digital.png',
    alt: 'Brave & Beautiful, Volume 4',
    caption: 'Volume 4',
  },
]

const DETAIL = [
  'Volumes 1 through 3 build identity, emotional health, self-worth, healthy relationships, and vision for your life.',
  'Volume 4 covers pornography, sexual violence, and sex trafficking in age-appropriate ways.',
  'Available in a faith edition and a non-faith edition, with facilitator guides for classroom and small-group use.',
  'Sold as single volumes, as a four-volume set, and as a parent bundle with the facilitator guide.',
]

const ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      'This book has helped me not only to have a brighter mindset but to love myself and be confident in who I am and what I stand for. This book is so simple yet so empowering in every word and detail!',
    source: 'Malia Colburn, Teenage Girl',
  },
  {
    quote:
      'The Brave Series is a groundbreaking, survivor-informed resource that empowers youth with confidence, resilience, and the tools to safeguard themselves from exploitation. Its engaging, age-appropriate approach builds self-worth and inspires leadership, making it an essential prevention tool for protecting and uplifting the next generation.',
    source:
      'Rachel Fisher, National and International Anti-Trafficking Consultant, Nurse, and Survivor',
  },
]

export default function BraveAndBeautifulPage() {
  return (
    <CaseStudyLayout
      eyebrow="Brave Series · For teen girls"
      title="Brave & Beautiful"
      lede={
        <p>
          The first title in the Brave Series and the one the original vision
          described: a publication for teenage girls that would equip them to
          protect themselves. Published in the summer of 2022 after two and a
          half years of work.
        </p>
      }
      contactHeading="Bring Brave & Beautiful to your girls."
      contactSource="project-brave-and-beautiful"
      contactBody={
        <p>
          Schools, churches, and safe houses run this curriculum with teen
          girls. Tell Michele about your group and she will help you choose the
          right edition.
        </p>
      }
    >
      <PullQuote attribution="Trafficking survivor" className="mt-14 sm:mt-20">
        If I had this when I was in high school, I would have never gotten
        trafficked in the first place.
      </PullQuote>

      <CaseStudySection heading="The story behind it" id="story">
        <Prose>
          <p>
            In 2019 Michele took on anti-sex trafficking as a new area of work
            for Explicit Movement, and ran an island-wide Oʻahu awareness
            conference called LISN. About a month later she saw a publication in
            a vision, with one line clear on the cover: protect yourself from
            sex trafficking. Brave &amp; Beautiful is that publication.
          </p>
          <p>
            A year before it was published, leaders in 20 nations were already
            asking for it, having heard about it through the grapevine. It was
            built full color and beautiful on purpose. Every girl who receives
            it should be able to tell, from the object in her hands, that she is
            worth something of quality.
          </p>
          <p>
            The full account of the series, the vision, and the Hawaiʻi
            Department of Education approval is on the{' '}
            <Link
              href="/projects/brave-series"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-teal)] decoration-1 underline-offset-4 transition hover:decoration-2"
            >
              Brave Series hub
            </Link>
            .
          </p>
        </Prose>
      </CaseStudySection>

      <Container className="mt-16 sm:mt-20">
        <CoverGrid items={COVERS} label="The four volumes" />
      </Container>

      <CaseStudySection heading="What is inside" id="structure">
        <FactList label="How the four volumes work" items={DETAIL} />
        <Endorsements items={ENDORSEMENTS} label="What readers say" />
        <BuyLinks
          label="Buy at"
          links={[{ text: 'thebraveseries.com', href: 'https://thebraveseries.com' }]}
        />
      </CaseStudySection>

      <GoldenThread>
        Brave &amp; Beautiful spends three volumes on a girl&rsquo;s worth
        before it ever names the danger. That order is the point. A girl who
        knows what she is worth is far harder to take.
      </GoldenThread>
    </CaseStudyLayout>
  )
}
