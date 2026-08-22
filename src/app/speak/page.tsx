import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { Border } from '@/components/Border'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { JoinWaitListButton } from '@/components/wait-list/JoinWaitListButton'
import { siteConfig } from '@/lib/site-config'

export const metadata: Metadata = {
  title: 'Speaking',
  description:
    'Michele Okimura speaks at churches, conferences, and schools, and to small groups, leadership teams, and community organizations, on brave purpose, dreaming big, creativity, identity, and healing.',
  alternates: { canonical: '/speak' },
  openGraph: {
    type: 'website',
    title: `Speaking | ${siteConfig.brand}`,
    description:
      'Some messages do more than inspire. They give people permission to be brave.',
    url: `${siteConfig.url}/speak`,
  },
}

// Copy of record: site/content/speaker/speaker-page-copy.md (locked with Michele
// 2026-08-22). Endorser wording is verbatim and must not be edited, including
// any phrasing the house voice guide would otherwise avoid. Michele's own copy
// carries no em dashes, so venue lines and attributions are structured fields
// rather than dash-joined strings.

type Endorsement = {
  quote: string
  name: string
  role: string
}

type Topic = {
  number: string
  title: string
  /** One string for a single paragraph, an array when the topic runs longer. */
  body: string | string[]
  /** Shown when the message also travels without the faith framing. */
  nonFaith?: boolean
  /** Context the reader needs before the endorsements underneath a topic. */
  endorsementsNote?: string
  endorsements?: Endorsement[]
}

const TOPICS: Topic[] = [
  {
    number: '01',
    title: 'Finding Your Brave Purpose',
    body:
      'The leap from a God-given dream to a courageous "yes" can feel impossible. In her signature keynote, Michele shares the raw, true story of founding Releasing Generations: the initial fears, the false starts, and the exact moment she stopped talking about her calling and started walking in it. Audiences leave with a teachable, practical framework to finally step into their own brave purpose. Delivered at churches, conferences, and leadership events for over a decade.',
  },
  {
    number: '02',
    title: 'Dreaming Big With God',
    body:
      'God\'s vision for your life is beautifully larger than the one you are comfortable praying for. Perfect for audiences standing at the threshold of a new season, Michele explores how to surrender your fears, your history, and your "what-ifs" to God. Whether you are carrying a quiet dream or feeling a persistent nudge, this message expands your faith to embrace what is truly possible.',
    nonFaith: true,
    endorsements: [
      {
        quote:
          'Michele was able to rekindle and inspire the need and desire to reignite and inspire our Leadership Team that it is never too late to become a ‘dreamer’ and make a positive impact and difference in the world.',
        name: 'Gerald Teramae',
        role: 'Head of School, Island Pacific Academy',
      },
    ],
  },
  {
    number: '03',
    title: 'Activating Your Creativity',
    body:
      'You were purposefully created by the Creator to create. Moving far beyond traditional fine arts, Michele expands the definition of creativity to reach anyone who has ever felt unqualified. This message equips audiences to rise beyond their insecurities, giving them permission to bring their unique ideas, businesses, and extraordinary solutions into the light. She has led four Rethink Creativity conferences on this theme, activating people in every sphere of influence.',
    nonFaith: true,
  },
  {
    number: '04',
    title: 'Building a Kingdom Culture at Home and in Ministry',
    body:
      'How do we shape environments that foster a resilient, deep-rooted, fully alive faith in our children and youth? Drawing on decades of experience, Michele offers a highly interactive experience for parents and leaders. Through engaging stories and interactive activities, she helps you build homes and healing, positive spaces for the younger saints where the next generation experiences God as undeniably real, personal, and worthy of their entire lives. Taught at conferences, in an eight-hour workshop format, and inside an e-course.',
    endorsementsNote:
      'The endorsements below are from Michele\'s Kingdom Kids Workshops, the flagship workshop within this topic. Same content, previously offered under that title.',
    endorsements: [
      {
        quote:
          'The Kingdom Kids Workshop has been the single most powerful equipping workshop for the parents and children’s ministry workers in our church. It gave them practical tools, and it imparted a living and powerful love and excitement for God.',
        name: 'Cal Chinen',
        role: 'Senior Pastor, Moanalua Gardens Missionary Church, Honolulu',
      },
      {
        quote:
          'Our experience with Kingdom Kids was amazing. Michele’s ministry sparked and stirred the faith of our entire church. Her creative, innovative, inspired approach enabled our children and youth to experience biblical truths and the Lord Himself in a very powerful way.',
        name: 'Barry Deguchi',
        role: 'Lead Pastor, Catalyst Christian Community, Long Beach, CA',
      },
      {
        quote:
          'Her creative and visually-exciting presentations have challenged us and our students to directly download from the Father Heart of God. We are now seeing children as young as five praying bold and encouraging words over other children and even their teachers. Our entire campus culture has changed. Our school will never be the same.',
        name: 'Rebecca Furuhashi',
        role: 'Principal, Christian Academy',
      },
    ],
  },
  {
    number: '05',
    title: 'Heart Wide Open: Building a Strong Connection with Your Child',
    body:
      'Your child\'s heart has a door, and you hold the key. In this transformative workshop, Michele equips parents to become the safe haven their children run toward. Through real-life storytelling, you will gain practical keys to validate feelings, speak unique love languages, turn everyday interactions into lasting deposits of trust, and more.',
  },
  {
    number: '06',
    title:
      'Identity, Healing, and Walking in the Fullness of Who God Made You with Brave Purpose',
    body:
      'A message Michele is often invited to bring in women\'s ministry settings and churches. She walks women through the truth of their identity in Christ, and the healing God offers for the trauma, wounds, and hindrances that quietly hold them back from walking in confidence and joy. Rooted in her own journey and years of ministering to women in faith communities.',
  },
  {
    number: '07',
    title: 'How to Hear God\'s Voice',
    body: [
      'For children, youth, and adults ready to grow their two-way relationship with God. Beyond the ways most Christians know God speaks (through Scripture, sermons, music), Michele opens the door to the other ways God is already speaking: through a thought, a vision, a picture, a circumstance. This workshop teaches discernment, builds faith through testimony, and gives every participant practical activities to practice hearing God\'s voice in real time.',
      'Michele also unpacks the invitation of 1 Corinthians 14:1 ("eagerly desire spiritual gifts, especially the gift of prophecy"), helping listeners grow the prophetic in their homes, their churches, and the encouragement they bring to others.',
      'Delivered for children, teens, families, ministry teams, and pastors. Watching people realize "I can hear God\'s voice" is what keeps Michele coming back to this one.',
    ],
    endorsements: [
      {
        quote:
          'She just did a session at Native Camp in Montana and it was excellent, the most impactful session of the whole camp. We had 19 FMI workers there. Every person had an experience of how to prophesy over each other. Simple, practical, and powerful. I saw it all personally. Now many children in our church prophesy and unashamedly pray for healing, all because of Michele.',
        name: 'Pastor Kihāpiʻilani Pimental',
        role: 'Worker Supervisor, Foursquare Missions International',
      },
    ],
  },
]

type Engagement = {
  event: string
  where: string
  /** Format note, e.g. a workshop rather than a keynote. */
  format?: string
}

const ENGAGEMENTS: Engagement[] = [
  { event: 'Arise Native American Leaders Camp', where: 'Montana, August 2026' },
  { event: 'Hawaii Baptist Academy', where: 'Hawai\'i, January 2026' },
  { event: 'Women of Influence National Conference', where: 'Florida, September 2025' },
  {
    event: 'National Conference on School Leadership (NASSP)',
    where: 'Washington, July 2025',
    format: 'Workshop',
  },
  { event: 'Hawai\'i State Dream Expo', where: 'Hawai\'i, May 2025' },
  {
    event: 'Missionary Church Denomination, Hawai\'i Regional Conference',
    where: 'March 2025',
  },
  { event: 'Hanalani Schools', where: 'Hawai\'i, January 2025' },
  { event: 'Kamehameha Schools', where: 'Hawai\'i, January 2025' },
  {
    event: 'Catholic Schools Educators Annual Conference',
    where: 'Hawai\'i, February 2024',
    format: 'Keynote and workshop',
  },
  {
    event: 'Foursquare Denomination, Hawai\'i District Leader\'s Conference',
    where: 'October 2023',
  },
  { event: 'Missio Nexus Mission Leaders Conference', where: 'Florida, September 2023' },
  { event: 'Transform Our World Global Conference', where: 'October 2022' },
]

function NonFaithNote() {
  return (
    <p className="mt-5 inline-flex rounded-full bg-neutral-100 px-4 py-1.5 text-sm text-neutral-600">
      Also available in a non-faith framing for schools, workplaces, and public
      events.
    </p>
  )
}

function Endorsements({
  note,
  items,
}: {
  note?: string
  items: Endorsement[]
}) {
  return (
    <div className="mt-8">
      {note && <p className="text-sm italic text-neutral-500">{note}</p>}
      <div className={note ? 'mt-6 space-y-8' : 'space-y-8'}>
        {items.map((item) => (
          <figure
            key={item.name}
            className="border-l-2 border-[var(--color-cta)] pl-6"
          >
            <blockquote className="text-base leading-7 text-neutral-700 italic">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-3 text-sm text-neutral-500">
              <span className="font-semibold text-neutral-950">
                {item.name}
              </span>
              <span className="block">{item.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}

export default function SpeakPage() {
  return (
    <>
      <PageIntro eyebrow="Speaking" title="Some messages do more than inspire.">
        <p className="font-display text-2xl font-medium tracking-tight text-neutral-950 sm:text-3xl">
          They give people permission to be brave.
        </p>
        <p className="mt-6">
          Michele Okimura speaks at churches, conferences, and schools, and to
          small groups, leadership teams, and community organizations. Whether
          you are gathering a crowd or an intimate team, she brings messages that
          build brave purpose in homes, workplaces, ministries, and teams, and
          help people find the courage to dream big and make a difference.
        </p>
      </PageIntro>

      <section aria-label="Topics">
        <SectionIntro
          eyebrow="Topics"
          title="Topics I speak on."
          className="mt-16 sm:mt-24"
        >
          <p>
            Michele&rsquo;s signature messages are below. As a pastor, teacher,
            and public speaker, she can also tailor a talk to your
            group&rsquo;s specific theme, season, or need.
          </p>
        </SectionIntro>

        <Container className="mt-16 sm:mt-20">
          <FadeInStagger faster>
            <ol role="list" className="space-y-16 sm:space-y-20">
              {TOPICS.map((topic) => (
                <FadeIn as="li" key={topic.number}>
                  <Border className="pt-10">
                    <div className="lg:grid lg:grid-cols-[6rem_1fr] lg:gap-10">
                      <p
                        aria-hidden="true"
                        className="font-display text-4xl font-semibold tracking-tight text-[var(--color-cta)]"
                      >
                        {topic.number}
                      </p>
                      <div className="mt-4 lg:mt-0">
                        <h3 className="font-display text-2xl font-semibold tracking-tight text-balance text-neutral-950 sm:text-3xl">
                          {topic.title}
                        </h3>
                        {(Array.isArray(topic.body)
                          ? topic.body
                          : [topic.body]
                        ).map((paragraph) => (
                          <p
                            key={paragraph}
                            className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600"
                          >
                            {paragraph}
                          </p>
                        ))}
                        {topic.nonFaith && <NonFaithNote />}
                        {topic.endorsements && (
                          <div className="max-w-3xl">
                            <Endorsements
                              note={topic.endorsementsNote}
                              items={topic.endorsements}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </Border>
                </FadeIn>
              ))}
            </ol>
          </FadeInStagger>
        </Container>
      </section>

      <section aria-label="Where Michele has spoken">
        <SectionIntro
          eyebrow="Where I have spoken"
          title="Recent stages."
          className="mt-24 sm:mt-32"
          smaller
        />

        <Container className="mt-10 sm:mt-12">
          <FadeIn>
            <ul
              role="list"
              className="divide-y divide-neutral-200 border-t border-neutral-200"
            >
              {ENGAGEMENTS.map((item) => (
                <li
                  key={`${item.event}-${item.where}`}
                  className="flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                >
                  <span className="font-display text-base font-semibold text-neutral-950">
                    {item.event}
                  </span>
                  <span className="shrink-0 text-sm text-neutral-500 sm:text-right">
                    {item.where}
                    {item.format && (
                      <span className="mt-1 block text-xs tracking-wider text-neutral-400 uppercase">
                        {item.format}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-3xl text-base leading-7 text-neutral-500 italic">
              Michele has also spoken at churches across Hawai&lsquo;i, the
              mainland U.S., Canada, Japan, the Philippines, and Singapore in her
              decades of ministry.
            </p>
          </FadeIn>
        </Container>
      </section>

      <section aria-labelledby="press-kit-heading">
        <Container className="mt-24 sm:mt-32">
          <FadeIn>
            <div className="rounded-3xl bg-neutral-50 p-8 ring-1 ring-inset ring-neutral-900/5 sm:p-10">
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <h2
                    id="press-kit-heading"
                    className="font-display text-2xl font-semibold tracking-tight text-neutral-950"
                  >
                    Press kit
                  </h2>
                  <p className="mt-4 text-base leading-7 text-neutral-600">
                    For event organizers and media: download Michele&rsquo;s
                    press kit for bio in three lengths, high-resolution
                    headshots, full topic descriptions, past speaking
                    engagements, full endorsements, and booking details.
                  </p>
                </div>

                {/* The PDF is still being assembled. Rendered as a disabled
                    panel rather than a link so the page never points at a 404. */}
                <div className="shrink-0">
                  <div
                    aria-disabled="true"
                    className="inline-flex flex-col items-start gap-1 rounded-md border border-dashed border-neutral-300 bg-white px-6 py-3"
                  >
                    <span className="text-sm font-semibold text-neutral-500">
                      Download the Press Kit (PDF)
                    </span>
                    <span className="text-xs font-medium tracking-wider text-neutral-400 uppercase">
                      Coming soon
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn className="-mx-6 rounded-4xl bg-neutral-950 px-6 py-20 sm:mx-0 sm:py-24 md:px-12">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-3xl font-medium tracking-tight text-balance text-white sm:text-4xl">
              Book Michele.
            </h2>
            <p className="mt-6 max-w-2xl text-xl text-neutral-300">
              Ready to bring Michele to your church, school, conference, or team?
              Tell her about your event and she will reach out personally.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <JoinWaitListButton source="speak-page">
                Ask about a date
              </JoinWaitListButton>
              <Link
                href={`mailto:${siteConfig.email}?subject=Speaking%20inquiry`}
                className="text-base font-semibold text-white underline decoration-[var(--color-cta)] underline-offset-4 hover:decoration-2"
              >
                {siteConfig.email}
              </Link>
            </div>

            <Border className="mt-16 pt-10" invert>
              <dl className="grid grid-cols-1 gap-x-10 gap-y-8 text-sm sm:grid-cols-2">
                <div>
                  <dt className="font-display font-semibold tracking-wider text-white/70 uppercase">
                    Audiences
                  </dt>
                  <dd className="mt-3 text-white">
                    Churches, conferences, schools, leadership teams, community
                    organizations
                  </dd>
                </div>
                <div>
                  <dt className="font-display font-semibold tracking-wider text-white/70 uppercase">
                    Based in
                  </dt>
                  <dd className="mt-3 text-white">
                    {siteConfig.city}, {siteConfig.state}
                  </dd>
                </div>
              </dl>
            </Border>
          </div>
        </FadeIn>
      </Container>
    </>
  )
}
