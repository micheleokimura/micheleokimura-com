import type { Metadata } from 'next'
import Link from 'next/link'

import {
  CaseStudyLayout,
  CaseStudySection,
  Endorsements,
  FactList,
  GoldenThread,
  Prose,
  PullQuote,
  VoiceNote,
  type Endorsement,
} from '@/components/CaseStudyLayout'
import { siteConfig } from '@/lib/site-config'

// Origin story is Michele's own account, condensed for the web. The three
// endorsements are verbatim from the Kingdom Kids Workshop endorsements docx and
// were signed off by Michele on 2026-08-21; they also appear on /speak under
// "Building a Kingdom Culture at Home and in Ministry", which is this workshop
// under its current title. Source: content/speaker/full-endorsements.md.

export const metadata: Metadata = {
  title: 'The Kingdom Kids Workshop',
  description:
    'Ten years of testing what children can actually carry, distilled into the workshop that changed how churches see the youngest people in the room. First taught in 2008.',
  alternates: { canonical: '/projects/kingdom-kids' },
  openGraph: {
    type: 'article',
    title: `The Kingdom Kids Workshop | ${siteConfig.brand}`,
    description:
      'The workshop that changed how churches see the youngest people in the room.',
    url: `${siteConfig.url}/projects/kingdom-kids`,
  },
}

const ENDORSEMENTS: Endorsement[] = [
  {
    quote:
      'The Kingdom Kids Workshop has been the single most powerful equipping workshop for the parents and children’s ministry workers in our church. It gave them practical tools, and it imparted a living and powerful love and excitement for God.',
    source: 'Cal Chinen, Senior Pastor, Moanalua Gardens Missionary Church, Honolulu',
  },
  {
    quote:
      'Our experience with Kingdom Kids was amazing. Michele’s ministry sparked and stirred the faith of our entire church. Her creative, innovative, inspired approach enabled our children and youth to experience biblical truths and the Lord Himself in a very powerful way.',
    source: 'Barry Deguchi, Lead Pastor, Catalyst Christian Community, Long Beach, CA',
  },
  {
    quote:
      'Her creative and visually-exciting presentations have challenged us and our students to directly download from the Father Heart of God. We are now seeing children as young as five praying bold and encouraging words over other children and even their teachers. Our entire campus culture has changed. Our school will never be the same.',
    source: 'Rebecca Furuhashi, Principal, Christian Academy',
  },
]

const WHAT_IT_TEACHES = [
  'How to teach children to hear God’s voice for themselves, at their own age-appropriate level.',
  'How to equip children to pray for physical healing rather than waiting until they are adults.',
  'How to build intergenerational ministry, where children serve alongside adults instead of being separated from them.',
  'How to give children real responsibility so their gifts are activated and practiced, and their faith becomes their own.',
]

const REACH = [
  'First taught in 2008, then refined across ten years of firsthand work with children and youth.',
  'Adopted by churches and Christian schools across Hawaiʻi and the mainland, including Moanalua Gardens Missionary Church in Honolulu and Catalyst Christian Community in Long Beach, California.',
  'Taught today as a conference session, an eight-hour workshop, and an e-course, under the title Building a Kingdom Culture at Home and in Ministry.',
  'The Raising Kingdom Kids Lesson Book, with more than 100 lessons, is the companion resource for parents and children’s ministry leaders.',
]

export default function KingdomKidsPage() {
  return (
    <CaseStudyLayout
      eyebrow="Workshop · Since 2008"
      title="The Kingdom Kids Workshop"
      lede={
        <p>
          Ten years of testing what children can actually carry, distilled into
          a workshop for parents and church leaders. Its premise is simple and
          it changes rooms: children are not the church of tomorrow, they are
          able ministers today.
        </p>
      }
      contactHeading="Bring the Kingdom Kids Workshop to your church."
      contactSource="project-kingdom-kids"
      contactBody={
        <p>
          Michele teaches this as a conference session, a full eight-hour
          workshop, and an e-course. Tell her about your church or school and
          what you are hoping to build.
        </p>
      }
    >
      <PullQuote attribution="Michele Okimura" className="mt-14 sm:mt-20">
        There is no junior Holy Spirit.
      </PullQuote>

      <CaseStudySection heading="Origin" id="origin">
        <Prose>
          <p>
            &ldquo;I did my first Kingdom Kids Workshop in 2008. At the time I
            was going to conferences about equipping children&rsquo;s ministers
            in raising the next generation. I began learning about teaching kids
            things traditional curriculums did not include: how to hear
            God&rsquo;s voice, how to pray for physical healing, how to equip
            children to minister alongside adults. It&rsquo;s intergenerational
            ministry as opposed to always separating the children.
          </p>
          <p>
            The traditional mindset is &lsquo;let&rsquo;s have children&rsquo;s
            ministry and youth ministry, and when they grow up they will be
            powerful ministers.&rsquo; My mindset changed. I began to really
            believe that children can be equipped at their age-appropriate level
            and minister alongside adults using their gifts, and be made to feel
            like they truly are part of the body of Christ and valued from a
            young child. Children can hear the voice of God as they are learning
            alongside adults. There is no junior Holy Spirit.
          </p>
          <p>
            My husband Rob was a senior pastor, and he trusted me. He gave me
            the green light and go-ahead to try to teach the kids and push the
            limits of what children can actually learn and operate in. I
            literally took ten years of trying different lessons and seeing what
            the kids can be equipped in and released in. The workshop is a
            summary of those ten years of working with children and youth
            firsthand.
          </p>
          <p>
            We want to make sure that the children and youth are growing up in a
            culture in a church where they are valued and that their gifts can
            be activated and practiced so that their faith is real. That was my
            why for having the workshop to equip the body of Christ in that.
            Transformation has happened.&rdquo;
          </p>
        </Prose>
        <VoiceNote>In Michele&rsquo;s words.</VoiceNote>
      </CaseStudySection>

      <GoldenThread>
        Michele built the Kingdom Kids Workshop out of the same conviction that
        runs through everything she creates: every person, from the youngest
        child, is valuable and worth activating.
      </GoldenThread>

      <CaseStudySection heading="What it teaches" id="what-it-teaches">
        <Prose>
          <p>
            The workshop is built for the adults in the room. Parents,
            children&rsquo;s ministry workers, and school leaders leave with
            lessons they can run the following week, and with a changed sense of
            what the children in their care are capable of carrying.
          </p>
        </Prose>
        <FactList label="Inside the workshop" items={WHAT_IT_TEACHES} />
      </CaseStudySection>

      <PullQuote>
        Where they are valued and their gifts can be activated and practiced so
        that their faith is real.
      </PullQuote>

      <CaseStudySection heading="Reach" id="reach">
        <FactList label="Where it has gone" items={REACH} />
        <Endorsements items={ENDORSEMENTS} label="What leaders say" />
        <Prose>
          <p>
            The workshop is offered today under the title{' '}
            <Link
              href="/speak"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-teal)] decoration-1 underline-offset-4 transition hover:decoration-2"
            >
              Building a Kingdom Culture at Home and in Ministry
            </Link>
            . The content is the same. Its companion lesson book is{' '}
            <Link
              href="/works/raising-kingdom-kids"
              className="font-medium text-neutral-950 underline decoration-[var(--color-brand-teal)] decoration-1 underline-offset-4 transition hover:decoration-2"
            >
              Raising Kingdom Kids
            </Link>
            .
          </p>
        </Prose>
      </CaseStudySection>
    </CaseStudyLayout>
  )
}
