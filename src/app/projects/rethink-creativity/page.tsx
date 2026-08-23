import type { Metadata } from 'next'

import {
  CaseStudyLayout,
  CaseStudySection,
  FactList,
  GoldenThread,
  Prose,
  PullQuote,
  Recognition,
  StatGrid,
  VoiceNote,
} from '@/components/CaseStudyLayout'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { siteConfig } from '@/lib/site-config'

// Origin story is Michele's own account, condensed for the web. Four
// conferences to date: 2010 and 2011 in person, 2020 and 2021 online. The
// Zechariah 1:18-21 framing is hers and is quoted directly.

export const metadata: Metadata = {
  title: 'ReThink Creativity',
  description:
    'Four conferences taking apart the lie that some people are not creative, with speakers from HGTV, Hollywood, surgery, fashion, and government. Led by Michele Okimura since 2010.',
  alternates: { canonical: '/projects/rethink-creativity' },
  openGraph: {
    type: 'article',
    title: `ReThink Creativity | ${siteConfig.brand}`,
    description:
      'Taking apart the lie that some people are not creative.',
    url: `${siteConfig.url}/projects/rethink-creativity`,
  },
}

const CONFERENCE_STATS = [
  { value: '4', label: 'Conferences led, beginning in 2010' },
  { value: '20+', label: 'Workshops in a single conference program' },
  { value: '2020', label: 'Year it moved online and the reach widened' },
  { value: 'Global', label: 'Speaker roster by the 2021 program' },
]

const SPEAKER_FIELDS = [
  'HGTV names, including Jenny Marrs.',
  'Hollywood directors.',
  'Practicing surgeons from around the world, speaking on creativity in the medical field.',
  'Fashion designers, photographers, painters, and business owners.',
  'Government officials.',
]

const TIMELINE = [
  'The first in-person conference ran in 2010, with keynote speakers, main sessions, and about 20 workshops covering everything from photography to painting to creativity in business.',
  'It repeated in 2011, then went on the shelf for ten years as other priorities took the front.',
  'Planning began again in 2020. COVID moved the event online, which widened its reach rather than shrinking it.',
  'The 2021 program brought a national and global speaker team, with 20 workshops plus plenary sessions.',
]

export default function ReThinkCreativityPage() {
  return (
    <CaseStudyLayout
      eyebrow="Conference · 2010 to present"
      title="ReThink Creativity"
      lede={
        <p>
          A conference built to take apart one specific lie: that some people
          are creative and the rest are not. Michele has led four of them,
          gathering surgeons, firefighters, designers, pastors, and business
          owners around the same idea. Every person creates, and the ones who
          know it solve problems the rest of us cannot.
        </p>
      }
      contactHeading="Bring ReThink Creativity to your people."
      contactSource="project-rethink-creativity"
      contactBody={
        <p>
          Michele teaches this as a keynote, a workshop, and a full conference
          program. Tell her who you are gathering and what you want them to
          walk out believing.
        </p>
      }
    >
      <PullQuote attribution="Michele Okimura" className="mt-14 sm:mt-20">
        There is no such thing as &lsquo;not creative.&rsquo;
      </PullQuote>

      <CaseStudySection heading="Origin" id="origin">
        <Prose>
          <p>
            &ldquo;Back in 2010 and 2011, I was inspired by Bethel Church, which
            did a Supernatural Creativity conference. I have a natural passion
            for creativity myself and love activating people in creativity. I
            saw a lie that many people believe: that they are not creative. The
            truth is that every being is creative in their own unique way and in
            every sphere of influence. People often do not realize they need
            creativity in the medical field, as a firefighter, as a plumber. All
            of those are problem-solving. Creativity is inventing things, and it
            is also what we use to make dinner tonight from leftovers.
          </p>
          <p>
            I wanted to help people understand not only that they are creative
            in their identity, but that they are made in God&rsquo;s image, who
            is the most creative being in the universe. When you connect with
            God&rsquo;s supernatural, unlimited creativity, miracles happen.
          </p>
          <p>
            This is my passion. God uses creativity to make such a difference.
            We, as the body of Christ, should be leading creativity and
            innovation in the world, but oftentimes we are not. We need to take
            our place in connecting and partnering with God in his unlimited
            creativity to solve the world&rsquo;s problems.
          </p>
          <p>
            Creativity also brings inner healing. When you create something, you
            are putting yourself out there. There is a part of you in what you
            create. Realizing everyone has value in their creativity is what I
            have experienced, and I still love to do this to this day.&rdquo;
          </p>
        </Prose>
        <VoiceNote>In Michele&rsquo;s words.</VoiceNote>
      </CaseStudySection>

      <GoldenThread>
        Michele leads the ReThink Creativity conferences out of a conviction
        that creativity brings inner healing. When people believe their creative
        voice matters, they begin to believe their whole self matters.
      </GoldenThread>

      {/* The Zechariah frame is the biblical anchor Michele returns to, and it
          carries the argument of the whole conference, so it gets its own dark
          panel rather than sitting inside the origin prose. */}
      <Container className="mt-20 sm:mt-28">
        <FadeIn>
          <div className="-mx-6 rounded-4xl bg-neutral-950 surface-teal px-6 py-16 sm:mx-0 sm:py-20 md:px-12">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-xs font-semibold tracking-widest text-white/70 uppercase">
                The craftsmen
              </h2>
              <p className="mt-6 font-display text-2xl leading-10 text-white sm:text-3xl sm:leading-tight">
                In Zechariah 1:18-21, four horns scatter God&rsquo;s people. God
                does not call forth the priests. He does not call forth the
                warriors. He calls forth the craftsmen.
              </p>
              <figure className="mt-8 border-l-2 border-[var(--color-brand-terracotta)] pl-6">
                <blockquote className="text-lg leading-8 text-neutral-300 italic">
                  &ldquo;God uses our craftsmanship to dismantle the works of the
                  enemy. There&rsquo;s a powerful thing we need to tap into with
                  the Lord regarding that.&rdquo;
                </blockquote>
                <figcaption className="mt-3 text-sm font-medium text-white/70 not-italic">
                  Michele Okimura
                </figcaption>
              </figure>
            </div>
          </div>
        </FadeIn>
      </Container>

      <CaseStudySection heading="Four conferences" id="conferences">
        <StatGrid items={CONFERENCE_STATS} />
        <FactList label="How it unfolded" items={TIMELINE} />
      </CaseStudySection>

      <CaseStudySection heading="Who speaks" id="speakers">
        <Prose>
          <p>
            The speaker roster is deliberately wide, because the argument only
            lands if the room can see creativity working outside the fine arts.
            A surgeon and a fashion designer make the case better together than
            either makes it alone.
          </p>
        </Prose>
        <FactList label="Fields represented" items={SPEAKER_FIELDS} />
        <Recognition
          label="Why it is built this way"
          items={[
            'Creativity is problem-solving, so it belongs in medicine, emergency response, trades, business, and government as much as in painting and photography.',
            'Creating something puts a part of you into the world, which is why the conference consistently produces inner healing alongside new ideas.',
          ]}
        />
      </CaseStudySection>

      <PullQuote>
        We, as the body of Christ, should be leading creativity and innovation
        in the world.
      </PullQuote>
    </CaseStudyLayout>
  )
}
