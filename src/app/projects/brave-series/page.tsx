import type { Metadata } from 'next'

import { pageMetadata } from '@/lib/schema'

import {
  CaseStudyLayout,
  CaseStudySection,
  Endorsements,
  FactList,
  GoldenThread,
  Prose,
  PullQuote,
  Recognition,
  SiblingLinks,
  StatGrid,
  VoiceNote,
  BuyLinks,
  type Endorsement,
} from '@/components/CaseStudyLayout'
import { BraveSeriesCovers } from '@/components/BraveSeriesCovers'
import { Container } from '@/components/Container'
import { SquareButton } from '@/components/AuthorBookParts'
import { BRAVE_SERIES_STORE_URL } from '@/data/square-store-links'

// Origin story is Michele's own account, condensed for the web. Endorsements are
// verbatim and are the same set carried on /author; edit both together.
// Recognition lines match BRAVE_RECOGNITION in src/app/author/page.tsx.

export const metadata: Metadata = pageMetadata({
  title: 'The Brave Series',
  description:
    'A 24-volume youth curriculum on identity, worth, and protection from exploitation. The Hawaiʻi Brave Together three-article booklet was reviewed and approved by the Hawaiʻi Department of Education for the state’s Sexual Violence Prevention Initiative.',
  path: '/projects/brave-series',
  type: 'article',
  ogDescription:
    'Twenty-four volumes on identity, worth, and protection from exploitation.',
})

const RECOGNITION = [
  'The Hawaiʻi Brave Together three-article booklet was reviewed and approved by the Hawaiʻi Department of Education for the state’s Sexual Violence Prevention Initiative.',
  '2023 Outstanding Advocate for the Children and Youth of Hawaiʻi, awarded to Releasing Generations by Hawaiʻi’s Governor and Honolulu’s Mayor for the development of the Brave Series',
]

const STRUCTURE = [
  { value: '3', label: 'Titles: Brave & Beautiful, Brave & Bold, Brave Together' },
  { value: '4', label: 'Volumes in each title’s set' },
  { value: '24', label: 'Volumes in all, across faith and non-faith editions' },
  { value: '75/25', label: 'Social-emotional learning to exploitation prevention' },
]

const CURRICULUM_DETAIL = [
  'Three quarters of the material is social-emotional learning: identity, emotional health, self-worth, healthy relationships, and vision for your life.',
  'Volume 4 of each set covers pornography, sexual violence, and sex trafficking in age-appropriate ways.',
  'Every title ships in a faith edition and a non-faith edition, so a public school and a church can run the same curriculum.',
  'Facilitator guides accompany the student volumes, with teacher lessons written for classroom use.',
]

const ADOPTION = [
  'Currently piloted in the Philippines, at a South Carolina Christian school, and at a Native American reservation school.',
  'A large Presbyterian church on Oʻahu uses Brave & Bold and Brave & Beautiful to equip and train all of their adult leaders for leadership.',
  'Safe houses that rehabilitate and restore trafficked victims are using it as a resource to bring healing and restoration to traumatized youth and adults.',
  'Adopted by church leaders for leadership development, and by women and men from young adults to seniors who found their own healing and vision inside the material.',
]

const TITLES = [
  {
    href: '/projects/brave-series/brave-and-beautiful',
    title: 'Brave & Beautiful',
    audience: 'For teen girls. The first title published, in 2022.',
  },
  {
    href: '/projects/brave-series/brave-and-bold',
    title: 'Brave & Bold',
    audience: 'For teen boys. Paused for Brave Together, then finished.',
  },
  {
    href: '/projects/brave-series/brave-together',
    title: 'Brave Together',
    audience: 'Co-ed. The edition behind the booklet the Hawaiʻi Department of Education approved.',
  },
]

const ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      'The Brave Series is a groundbreaking, survivor-informed resource that empowers youth with confidence, resilience, and the tools to safeguard themselves from exploitation. Its engaging, age-appropriate approach builds self-worth and inspires leadership, making it an essential prevention tool for protecting and uplifting the next generation.',
    source:
      'Rachel Fisher, National and International Anti-Trafficking Consultant, Nurse, and Survivor',
  },
  {
    quote:
      'When first introduced to the materials, I found them breathtaking and unlike anything I had seen. The Brave Series equips young people with the tools to navigate challenges, make informed decisions, and step confidently into their potential by addressing critical topics like self-worth, healthy relationships, and personal responsibility.',
    source:
      'Phyllis Unebasami, Retired Hawaiʻi Deputy Superintendent of the Department of Education',
  },
  {
    quote:
      'This book has helped me not only to have a brighter mindset but to love myself and be confident in who I am and what I stand for. This book is so simple yet so empowering in every word and detail!',
    source: 'Malia Colburn, Teenage Girl',
  },
]

// The one purchase route for all twenty-four volumes, at the top of the page as
// of 2026-08-26. The quiet BuyLinks row further down names the same storefront
// and stays where it is: that row is a fact about where the series sells, sat
// inside the reach section, and this is the call to action.
export default function BraveSeriesPage() {
  return (
    <CaseStudyLayout
      eyebrow="Curriculum · 24 volumes"
      title="The Brave Series"
      lede={
        <p>
          Three titles, four volumes each, in faith and non-faith editions.
          Built to develop emotional health, build self-worth and healthy
          relationships, and give young people the tools to protect themselves
          from exploitation. It started with a vision in a shower and ended up in
          front of the Hawaiʻi Department of Education.
        </p>
      }
      heroCta={
        <SquareButton
          href={BRAVE_SERIES_STORE_URL}
          size="page"
          label="Shop the Brave Series"
        />
      }
      contactHeading="Bring the Brave Series to your school or organization."
      contactBody={
        <p>
          Schools, churches, safe houses, and youth organizations are running
          this curriculum now. Tell Michele about your setting and she will help
          you find the right title and edition.
        </p>
      }
    >
      <PullQuote attribution="Trafficking survivor" className="mt-14 sm:mt-20">
        If I had this when I was in high school, I would have never gotten
        trafficked in the first place.
      </PullQuote>

      {/* Twelve covers, one per volume, Faith and Classic alternating across
          each row. The full 24-edition set is deliberately not shown. */}
      <Container className="mt-16 sm:mt-20">
        <BraveSeriesCovers />
      </Container>

      <CaseStudySection heading="The assignment" id="assignment">
        <Prose>
          <p>
            &ldquo;Explicit Movement, my nonprofit, covers many different topics
            about sexual integrity for youth and equipping parents and church
            leaders on guiding young people. In 2019, the Lord spoke to my
            heart: this is the year I want you to add anti-sex trafficking to
            what you cover.
          </p>
          <p>
            We did an island-wide Oʻahu conference called LISN, an awareness and
            prevention event about sex trafficking happening with our local kids
            in Hawaiʻi. About 500 people came from the community. It was free.
            At the time, 99 percent of pastors I talked to had no clue this was
            happening to our own local kids. Parents didn&rsquo;t know either.
            There was a myth that trafficking victims were coming into Hawaiʻi
            from other nations. The truth was it was happening here, to their
            own children and youth.&rdquo;
          </p>
        </Prose>
        <VoiceNote>In Michele&rsquo;s words.</VoiceNote>
      </CaseStudySection>

      <CaseStudySection heading="The vision" id="vision">
        <Prose>
          <p>
            &ldquo;About a month after the conference, I was in the shower and a
            vision started to appear before my eyes. It was a publication. The
            title was blurry, but the subtitle was clear: &lsquo;Protect
            yourself from sex trafficking.&rsquo; I saw pages open like a
            magazine, with graphics and articles.
          </p>
          <p>
            I had a conversation with God. I said, &lsquo;What is this
            you&rsquo;re showing me?&rsquo; He said, &lsquo;This is a
            publication for teenage girls to empower them and equip them on how
            to protect themselves from being trafficked.&rsquo; My response was,
            &lsquo;That is brilliant, you are so smart. I don&rsquo;t know if
            there&rsquo;s anything like that.&rsquo; Then He spoke back:
            &lsquo;Michele, I want you to do a secular version and a Christian
            version. If you do it with excellence, it&rsquo;s going to go
            global.&rsquo; I was excited, but under my breath said I
            didn&rsquo;t know about the global part. I knew it was an assignment
            in my heart.&rdquo;
          </p>
        </Prose>
      </CaseStudySection>

      <CaseStudySection heading="Going global before publication" id="global">
        <Prose>
          <p>
            &ldquo;My team and I worked on the project for about two and a half
            years. We published Brave &amp; Beautiful for teen girls in the
            summer of 2022. The interesting thing: one year before it was
            published, I started getting emails and texts from leaders in 20
            nations. Cambodia. Africa. South America. Asia. They said things
            like, &lsquo;I heard about this publication, we want it for our
            nation.&rsquo; I said, &lsquo;How did you hear about it?&rsquo;
            Through the grapevine. My second comment: &lsquo;We&rsquo;re not
            done yet.&rsquo; Their response: &lsquo;We already know we want it.
            Can we translate it now, whatever you have so far?&rsquo;
          </p>
          <p>
            A royal lord from UK Parliament contacted me because he wanted it
            for the UK. Miraculous things started happening. God was showing me
            that I really did hear from Him in the shower, because He was the
            one making it go global.&rdquo;
          </p>
        </Prose>
      </CaseStudySection>

      <CaseStudySection heading="Why it is beautiful" id="excellence">
        <Prose>
          <p>
            &ldquo;The reason it is full color, beautiful, and creative is
            because God put a qualification on it that it needed to be
            excellence and quality. Every child or person who gets it needs to
            believe they are worthy of something quality. It felt right to honor
            them that way.&rdquo;
          </p>
        </Prose>
      </CaseStudySection>

      <GoldenThread>
        Behind the trafficking prevention curriculum is the same conviction
        Michele has held for years: when someone knows their worth, they
        don&rsquo;t hand it away. The Brave Series is restoration and prevention
        in the same book.
      </GoldenThread>

      <CaseStudySection heading="The interruption" id="doe">
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
            state&rsquo;s Sexual Violence Prevention Initiative.
          </p>
          <p>
            After finishing Brave Together non-faith in October 2025, we went
            back and finished Brave &amp; Bold in faith and non-faith versions.
            We are done now. Just the last Brave Together Faith volumes 3 and 4
            shipping in the next month, and then everything is
            available.&rdquo;
          </p>
        </Prose>
        <Recognition items={RECOGNITION} />
      </CaseStudySection>

      <CaseStudySection heading="What is inside" id="structure">
        <StatGrid items={STRUCTURE} />
        <FactList label="How the curriculum is built" items={CURRICULUM_DETAIL} />
      </CaseStudySection>

      <CaseStudySection heading="The three titles" id="titles">
        <SiblingLinks label="Read each story" items={TITLES} />
      </CaseStudySection>

      <CaseStudySection heading="Where it is being used" id="adoption">
        <FactList label="In the field" items={ADOPTION} />
        <Endorsements items={ENDORSEMENTS} label="What people say" />
        <BuyLinks
          label="Buy at"
          links={[{ text: 'thebraveseries.com', href: 'https://thebraveseries.com' }]}
        />
      </CaseStudySection>

      <PullQuote>
        Every page is a work of art. Just as every child is.
      </PullQuote>
    </CaseStudyLayout>
  )
}
